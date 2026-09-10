import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  rumDayMs,
  rumOrigin,
  rumWindowMs,
  type RumMeasurement,
} from "../../src/rum/contract";
import worker, { receiveRum } from "../../workers/rum/worker";
import {
  invalidateRumWindow,
  latestRumWindow,
  maintainRum,
  openRumWindow,
  readRumReport,
  recordRumMeasurement,
  type RumDatabase,
} from "../../workers/rum/store";
import { createRumDatabase } from "./sqlite-fixture";

const startAtMs = Date.UTC(2026, 8, 11);
const endAtMs = startAtMs + rumWindowMs;
const measurement: RumMeasurement = {
  name: "LCP",
  value: 2000,
  measurementId: "12345678-1234-4234-8234-123456789abc",
  sequence: 1,
};
let fixture: ReturnType<typeof createRumDatabase>;

beforeEach(async () => {
  fixture = createRumDatabase(startAtMs - 1000);
  await openRumWindow(fixture.db, startAtMs, fixture.clock.atMs);
  fixture.clock.atMs = startAtMs;
});
afterEach(() => fixture.sqlite.close());

function request(
  body: unknown = measurement,
  headers: Record<string, string> = {},
  url = "https://rum-fixture.example.workers.dev/vitals",
) {
  return new Request(url, {
    method: "POST",
    headers: {
      Origin: rumOrigin,
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
function rows() {
  return fixture.sqlite.prepare("SELECT * FROM rum_measurements").all();
}
function receive(input = request(), db = fixture.db) {
  return receiveRum(input, { RUM_ENABLED: "true", DB: db }, fixture.clock.atMs);
}

async function finishWindow() {
  // Valid maintenance coverage through cutoff, independent of sample counts.
  fixture.sqlite
    .prepare("UPDATE rum_windows SET last_maintenance_at_ms = ?")
    .run(endAtMs - 3_600_000);
  fixture.clock.atMs = endAtMs;
  await maintainRum(fixture.db, true);
}

describe("RUM receiver", () => {
  it("accepts only the exact origin, endpoint, method and minimal JSON", async () => {
    expect((await receive()).status).toBe(204);
    expect(rows()).toHaveLength(1);
    expect(Object.keys(rows()[0]).sort()).toEqual([
      "first_received_at_ms",
      "last_received_at_ms",
      "measurement_id",
      "name",
      "sequence",
      "value",
      "window_start_at_ms",
    ]);
    for (const [input, status] of [
      [request(measurement, { Origin: "https://preview.vercel.app" }), 403],
      [request(measurement, { Origin: "null" }), 403],
      [request(measurement, { "Content-Type": "text/plain" }), 415],
      [request({ ...measurement, email: "synthetic@example.test" }), 400],
      [request({ ...measurement, sequence: -1 }), 400],
      [
        request(
          measurement,
          {},
          "https://rum-fixture.example.workers.dev/vitals?private=1",
        ),
        404,
      ],
      [
        new Request("https://rum-fixture.example.workers.dev/vitals", {
          headers: { Origin: rumOrigin },
        }),
        405,
      ],
    ] as const)
      expect((await receive(input)).status).toBe(status);
    expect(rows()).toHaveLength(1);
  });

  it("does no database work when disabled or unbound", async () => {
    const trap: RumDatabase = {
      prepare() {
        throw new Error("Unexpected database access");
      },
      batch() {
        throw new Error("Unexpected database access");
      },
    };
    for (const env of [
      {},
      { DB: trap },
      { RUM_ENABLED: "false", DB: trap },
      { RUM_ENABLED: "true" },
    ])
      expect((await receiveRum(request(), env)).status).toBe(503);
    expect(rows()).toHaveLength(0);
  });

  it("bounds both declared and streamed bytes and rejects invalid encoding", async () => {
    expect(
      (await receive(request(measurement, { "Content-Length": "10000" })))
        .status,
    ).toBe(413);
    expect(
      (await receive(request({ ...measurement, extra: "x".repeat(1000) })))
        .status,
    ).toBe(400);
    const invalid = new Request(
      "https://rum-fixture.example.workers.dev/vitals",
      {
        method: "POST",
        headers: { Origin: rumOrigin, "Content-Type": "application/json" },
        body: new Uint8Array([255]),
      },
    );
    expect((await receive(invalid)).status).toBe(400);
    expect(rows()).toHaveLength(0);
  });

  it("uses restrictive CORS and no cache without accepting a preflight as data", async () => {
    const preflight = new Request(
      "https://rum-fixture.example.workers.dev/vitals",
      {
        method: "OPTIONS",
        headers: {
          Origin: rumOrigin,
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "content-type",
        },
      },
    );
    const response = await receive(preflight);
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(rumOrigin);
    expect(response.headers.get("Access-Control-Allow-Credentials")).toBeNull();
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(rows()).toHaveLength(0);
  });

  it("updates only newer sequences, including lower values, without changing the first receive time", async () => {
    await receive();
    fixture.clock.atMs += 5000;
    await receive(request({ ...measurement, sequence: 3, value: 1500 }));
    await receive(request({ ...measurement, sequence: 2, value: 9000 }));
    await receive(request({ ...measurement, sequence: 3, value: 8000 }));
    expect(rows()).toHaveLength(1);
    expect(rows()[0]).toMatchObject({
      sequence: 3,
      value: 1500,
      first_received_at_ms: startAtMs,
      last_received_at_ms: startAtMs + 5000,
    });
    await receive(
      request({
        ...measurement,
        measurementId: "12345678-1234-4234-8234-123456789abd",
      }),
    );
    expect(rows()).toHaveLength(2);
  });

  it("excludes requests outside the window and writes queued across the database cutoff", async () => {
    fixture.clock.atMs = startAtMs - 1;
    expect((await receive()).status).toBe(503);
    fixture.clock.atMs = startAtMs;
    await receive();
    fixture.clock.atMs = endAtMs;
    expect((await receive()).status).toBe(503);
    // The Worker thinks the request began before cutoff; the SQL clock is already at end.
    await receiveRum(
      request({ ...measurement, sequence: 2, value: 9999 }),
      { RUM_ENABLED: "true", DB: fixture.db },
      endAtMs - 1000,
    );
    expect(rows()[0].value).toBe(2000);
  });

  it("redacts storage errors and makes a known failed window incomplete", async () => {
    const broken: RumDatabase = {
      ...fixture.db,
      prepare(sql) {
        if (sql.startsWith("INSERT INTO rum_measurements"))
          throw new Error("private SQL and credentials");
        return fixture.db.prepare(sql);
      },
    };
    const response = await receive(request(), broken);
    expect(response.status).toBe(503);
    expect(await response.text()).toBe("");
    expect((await latestRumWindow(fixture.db))?.invalid_reason).toBe(
      "storage-failure",
    );
    expect((await receive()).status).toBe(503);
  });
});

describe("RUM fixed-window statistics and retention", () => {
  it.each([
    [49, null],
    [50, 38],
    [51, 39],
    [100, 75],
  ])("reports exact nearest-rank p75 for n=%i", async (n, expected) => {
    for (let index = 1; index <= n; index++) {
      await recordRumMeasurement(fixture.db, startAtMs, {
        ...measurement,
        value: index,
        measurementId: `12345678-1234-4234-8234-${String(index).padStart(12, "0")}`,
      });
    }
    await finishWindow();
    const report = await readRumReport(fixture.db, startAtMs);
    expect(report?.metrics).toContainEqual({ name: "LCP", n, p75: expected });
    expect(report?.metrics).toContainEqual({ name: "INP", n: 0, p75: null });
    expect(report?.status).toBe("INCONCLUSIVE_INSUFFICIENT_TRAFFIC");
  });

  it("requires operational review even with enough measurements for every metric", async () => {
    for (const name of ["LCP", "INP", "CLS"] as const)
      for (let i = 0; i < 50; i++)
        await recordRumMeasurement(fixture.db, startAtMs, {
          ...measurement,
          name,
          value: 0,
          measurementId: `12345678-1234-4234-8234-${String(i).padStart(12, "0")}`,
        });
    await finishWindow();
    expect((await readRumReport(fixture.db, startAtMs))?.status).toBe(
      "REQUIRES_OPERATIONAL_REVIEW",
    );
  });

  it("keeps cutoff snapshots immutable across updates, repeated maintenance and deletion", async () => {
    await receive();
    await finishWindow();
    const original = await latestRumWindow(fixture.db);
    await recordRumMeasurement(fixture.db, startAtMs, {
      ...measurement,
      sequence: 3,
      value: 9000,
    });
    await Promise.all([maintainRum(fixture.db, true)]);
    fixture.clock.atMs = startAtMs + 30 * rumDayMs;
    await maintainRum(fixture.db, false);
    expect(rows()).toHaveLength(0);
    expect((await latestRumWindow(fixture.db))?.snapshot_json).toBe(
      original?.snapshot_json,
    );
    await invalidateRumWindow(fixture.db, startAtMs, "operational-incident");
    expect((await readRumReport(fixture.db, startAtMs))?.status).toBe(
      "INCOMPLETE",
    );
    expect((await latestRumWindow(fixture.db))?.snapshot_json).toBe(
      original?.snapshot_json,
    );
  });

  it("cannot reopen, overlap or reset an invalid window", async () => {
    await expect(
      openRumWindow(fixture.db, startAtMs + 1, startAtMs - 1000),
    ).rejects.toThrow();
    await expect(
      openRumWindow(fixture.db, startAtMs, startAtMs),
    ).rejects.toThrow();
    await invalidateRumWindow(fixture.db, startAtMs, "operational-incident");
    await expect(
      openRumWindow(fixture.db, startAtMs + rumDayMs, startAtMs),
    ).rejects.toThrow();
    await expect(
      openRumWindow(fixture.db, startAtMs, startAtMs - 1000),
    ).rejects.toThrow();
    expect((await latestRumWindow(fixture.db))?.invalid_reason).toBe(
      "operational-incident",
    );
  });

  it("detects maintenance gaps that cross the cutoff", async () => {
    fixture.sqlite
      .prepare("UPDATE rum_windows SET last_maintenance_at_ms = ?")
      .run(endAtMs - 3 * 3_600_000);
    fixture.clock.atMs = endAtMs + 1000;
    await maintainRum(fixture.db, true);
    expect((await readRumReport(fixture.db, startAtMs))?.invalidReason).toBe(
      "maintenance-gap",
    );
  });

  it("does not treat a paused window or a retention-expired restart as complete", async () => {
    await receive();
    await maintainRum(fixture.db, false);
    expect((await readRumReport(fixture.db, startAtMs))?.invalidReason).toBe(
      "collection-paused",
    );
    fixture.sqlite
      .prepare("UPDATE rum_windows SET invalid_reason = NULL")
      .run();
    fixture.clock.atMs = startAtMs + 31 * rumDayMs;
    await maintainRum(fixture.db, false);
    expect(rows()).toHaveLength(0);
    expect((await readRumReport(fixture.db, startAtMs))?.invalidReason).toBe(
      "retention-expired",
    );
  });

  it("rolls back a failed cleanup and records a redacted maintenance failure", async () => {
    await receive();
    fixture.clock.atMs = endAtMs;
    fixture.sqlite.exec(
      "CREATE TRIGGER fail_cleanup BEFORE DELETE ON rum_measurements BEGIN SELECT RAISE(ABORT, 'private failure'); END",
    );
    fixture.clock.atMs = startAtMs + 31 * rumDayMs;
    await expect(
      worker.scheduled({}, { DB: fixture.db, RUM_ENABLED: "false" }),
    ).rejects.toThrow("RUM maintenance failed.");
    expect(rows()).toHaveLength(1);
    const window = await latestRumWindow(fixture.db);
    expect(window?.snapshot_json).toBeNull();
    expect(window?.invalid_reason).toBe("maintenance-failure");
  });
});
