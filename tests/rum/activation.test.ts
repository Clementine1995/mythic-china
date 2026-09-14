import { describe, expect, it } from "vitest";
import { createRumWindowSql } from "../../scripts/prepare-rum-window.mjs";
import {
  assertRumConfiguration,
  scriptImports,
  rumRelease,
} from "../../scripts/rum-output-policy.mjs";
import { createRumDatabase } from "./sqlite-fixture";

describe("RUM activation boundaries", () => {
  it("opens the prepared future window once and preserves existing windows", () => {
    const fixture = createRumDatabase(rumRelease.startAtMs - 1000);
    try {
      const sql = createRumWindowSql(rumRelease, fixture.clock.atMs);
      fixture.sqlite.exec(sql);
      fixture.sqlite.exec(sql);
      const rows = fixture.sqlite.prepare("SELECT * FROM rum_windows").all();
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({
        start_at_ms: rumRelease.startAtMs,
        end_at_ms: rumRelease.endAtMs,
        last_maintenance_at_ms: fixture.clock.atMs,
        invalid_reason: null,
        snapshot_json: null,
      });
      expect(
        fixture.sqlite
          .prepare("SELECT COUNT(*) AS n FROM rum_measurements")
          .get()?.n,
      ).toBe(0);
    } finally {
      fixture.sqlite.close();
    }
  });
  it("rejects preparation and execution after the start time", () => {
    expect(() => createRumWindowSql(rumRelease, rumRelease.startAtMs)).toThrow(
      /future/,
    );
    const sql = createRumWindowSql(rumRelease, rumRelease.startAtMs - 1000);
    const fixture = createRumDatabase(rumRelease.startAtMs);
    try {
      fixture.sqlite.exec(sql);
      expect(
        fixture.sqlite.prepare("SELECT COUNT(*) AS n FROM rum_windows").get()
          ?.n,
      ).toBe(0);
    } finally {
      fixture.sqlite.close();
    }
  });
  it("keeps endpoint, dates and complete published paths bound together", () => {
    const value = {
      ...rumRelease,
      buildIntent: "public",
      publicPaths: ["/", "/about/"],
    };
    expect(() =>
      assertRumConfiguration(value, value.publicPaths),
    ).not.toThrow();
    for (const mutation of [
      { endpoint: "https://other.workers.dev/vitals" },
      { startAtMs: rumRelease.startAtMs + 1 },
      { endAtMs: rumRelease.endAtMs + 86400000 },
      { buildIntent: "review" },
      { publicPaths: ["/"] },
      { publicPaths: ["/", "/"] },
      { extra: true },
    ])
      expect(() =>
        assertRumConfiguration({ ...value, ...mutation }, value.publicPaths),
      ).toThrow();
  });
  it("parses module dependencies without accepting computed or remote imports", () => {
    expect(
      scriptImports(
        '/* import("https://ignored.invalid/a.js") */ import("./vitals.js");',
      ),
    ).toEqual([{ kind: "dynamic", specifier: "./vitals.js" }]);
    for (const source of [
      "import(location.href)",
      'import("https://host.invalid/vitals.js")',
      'import("../vitals.js")',
      'export * from "node:fs"',
      'import("./vitals.js", { with: { type: "json" } })',
    ])
      expect(() => scriptImports(source)).toThrow();
  });
});
