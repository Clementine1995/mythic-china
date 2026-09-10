import { afterEach, describe, expect, it, vi } from "vitest";
import {
  collectRum,
  type RumMetric,
  type RumObservers,
} from "../../src/rum/collector";
import { initializeRum } from "../../src/rum/bootstrap";
import {
  canCollectRum,
  createRumConfiguration,
  parseRumConfiguration,
  rumDeployment,
} from "../../src/rum/configuration";
import {
  parseRumMeasurement,
  rumOrigin,
  rumWindowMs,
  type RumMeasurement,
} from "../../src/rum/contract";

const startAtMs = Date.UTC(2026, 8, 11);
const deployment = {
  endpoint: "https://rum-fixture.example.workers.dev/vitals",
  startAtMs,
  endAtMs: startAtMs + rumWindowMs,
};
const configuration = createRumConfiguration(
  "public",
  ["/", "/about/"],
  deployment,
)!;
const id = "12345678-1234-4234-8234-123456789abc";
function callbacks() {
  const handlers: Record<string, (metric: RumMetric) => void> = {};
  const observers: RumObservers = {
    onLCP: vi.fn((cb) => {
      handlers.LCP = cb;
    }),
    onINP: vi.fn((cb) => {
      handlers.INP = cb;
    }),
    onCLS: vi.fn((cb) => {
      handlers.CLS = cb;
    }),
  };
  return { observers, handlers };
}

afterEach(() => {
  vi.useRealTimers();
});

describe("RUM collection", () => {
  it("ships unconfigured and creates no review configuration", () => {
    expect(rumDeployment).toBeNull();
    expect(createRumConfiguration("public", ["/"])).toBeNull();
    expect(createRumConfiguration("review", ["/"], deployment)).toBeNull();
    expect(() =>
      createRumConfiguration("public", ["/"], {
        ...deployment,
        startAtMs: startAtMs + 1,
      }),
    ).toThrow();
    expect(
      parseRumConfiguration(
        { ...configuration, endpoint: "https://other.workers.dev/vitals" },
        deployment,
      ),
    ).toBeNull();
    expect(
      parseRumConfiguration({ ...configuration, extra: "private" }, deployment),
    ).toBeNull();
  });

  it("rejects malformed and expanded measurements without converting missing metrics to zero", () => {
    const valid = { name: "CLS", value: 0, measurementId: id, sequence: 1 };
    expect(parseRumMeasurement(valid)).toEqual(valid);
    for (const input of [
      null,
      [],
      { ...valid, name: "FCP" },
      { ...valid, value: NaN },
      { ...valid, value: Infinity },
      { ...valid, value: -1 },
      { ...valid, sequence: 0 },
      { ...valid, sequence: 1.5 },
      { ...valid, sequence: Number.MAX_SAFE_INTEGER + 1 },
      { ...valid, measurementId: "timestamp-id" },
      { ...valid, value: "0" },
      { ...valid, url: "/private" },
      { name: "INP" },
    ])
      expect(parseRumMeasurement(input)).toBeNull();
  });

  it("sends only four copied fields, deduplicates callbacks, accepts lower updates and resets BFCache instances", () => {
    const { observers, handlers } = callbacks();
    const sent: RumMeasurement[] = [];
    const randomId = vi
      .fn()
      .mockReturnValueOnce(id)
      .mockReturnValueOnce("12345678-1234-4234-8234-123456789abd");
    collectRum({
      observers,
      randomId,
      canSend: () => true,
      send: (value) => sent.push(value),
    });
    const metric = {
      name: "INP",
      id: "v6-timestamp-private",
      value: 300,
      entries: [{ url: "private" }],
      navigationId: "secret",
    };
    handlers.INP(metric);
    handlers.INP(metric);
    metric.value = 200;
    handlers.INP(metric);
    handlers.INP({ name: "INP", id: "bfcache-new-instance", value: 250 });
    expect(sent).toEqual([
      { name: "INP", value: 300, measurementId: id, sequence: 1 },
      { name: "INP", value: 200, measurementId: id, sequence: 2 },
      {
        name: "INP",
        value: 250,
        measurementId: "12345678-1234-4234-8234-123456789abd",
        sequence: 1,
      },
    ]);
    expect(randomId).toHaveBeenCalledTimes(2);
    expect(sent.some((item) => item.name === "LCP")).toBe(false);
  });

  it.each([
    "http://localhost:4321/",
    "https://preview.vercel.app/",
    rumOrigin + "/unknown/",
    rumOrigin + "/?rum=off",
    rumOrigin + "/#rum=off",
    rumOrigin + "/?rum=on&rum=off",
  ])("excludes %s", (href) => {
    expect(
      canCollectRum(configuration, {
        href,
        isAutomated: false,
        hasPrivacyPreference: false,
        atMs: startAtMs,
      }),
    ).toBe(false);
  });

  it("includes start, excludes end and honors privacy and automation", () => {
    const context = {
      href: rumOrigin + "/?query=never-sent#fragment",
      atMs: startAtMs,
      isAutomated: false,
      hasPrivacyPreference: false,
    };
    expect(canCollectRum(configuration, context)).toBe(true);
    for (const difference of [
      { atMs: startAtMs - 1 },
      { atMs: deployment.endAtMs },
      { isAutomated: true },
      { hasPrivacyPreference: true },
    ])
      expect(canCollectRum(configuration, { ...context, ...difference })).toBe(
        false,
      );
  });
});

function browserFixture(
  config: unknown = configuration,
  href = rumOrigin + "/",
) {
  const head = {};
  const node = { parentNode: head, getAttribute: () => JSON.stringify(config) };
  const document = {
    head,
    querySelectorAll: vi.fn(() => [node]),
  } as unknown as Document;
  const view = {
    location: { href },
    navigator: {
      webdriver: false,
      doNotTrack: null,
      globalPrivacyControl: false,
    },
    crypto: { randomUUID: () => id },
    fetch: vi.fn().mockResolvedValue({ status: 204 }),
  };
  const { observers, handlers } = callbacks();
  const load = vi.fn().mockResolvedValue(observers);
  return { document, view, load, handlers, observers };
}

describe("RUM bootstrap", () => {
  it("disables callbacks already registered when a later observer fails", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(startAtMs + 1000);
    const fixture = browserFixture();
    vi.mocked(fixture.observers.onINP).mockImplementation(() => {
      throw new Error("unsupported observer");
    });
    await initializeRum(
      fixture.view as unknown as Window,
      fixture.document,
      deployment,
      fixture.load,
    );
    fixture.handlers.LCP({ name: "LCP", id: "library-id", value: 1234 });
    expect(fixture.view.fetch).not.toHaveBeenCalled();
  });

  it("stops sending after a quota refusal without retrying", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(startAtMs + 1000);
    const fixture = browserFixture();
    fixture.view.fetch.mockResolvedValue({ status: 429 });
    await initializeRum(
      fixture.view as unknown as Window,
      fixture.document,
      deployment,
      fixture.load,
    );
    fixture.handlers.INP({ name: "INP", id: "library-id", value: 200 });
    await Promise.resolve();
    fixture.handlers.INP({ name: "INP", id: "library-id", value: 100 });
    expect(fixture.view.fetch).toHaveBeenCalledTimes(1);
  });

  it("does no loading, observing or transport for disabled, malformed, preview, automation and maintenance visits", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(startAtMs + 1000);
    for (const scenario of [
      "off",
      "malformed",
      "preview",
      "automated",
      "maintenance",
      "dnt",
      "gpc",
      "duplicate",
      "misplaced",
    ]) {
      const fixture = browserFixture();
      if (scenario === "malformed")
        vi.mocked(fixture.document.querySelectorAll).mockReturnValue([
          { parentNode: fixture.document.head, getAttribute: () => "{" },
        ] as unknown as NodeListOf<Element>);
      if (scenario === "preview")
        fixture.view.location.href = "https://preview.vercel.app/";
      if (scenario === "automated") fixture.view.navigator.webdriver = true;
      if (scenario === "maintenance") fixture.view.location.href += "?rum=off";
      if (scenario === "dnt")
        Object.assign(fixture.view.navigator, { doNotTrack: "1" });
      if (scenario === "gpc")
        fixture.view.navigator.globalPrivacyControl = true;
      if (scenario === "duplicate")
        vi.mocked(fixture.document.querySelectorAll).mockReturnValue([
          {},
          {},
        ] as unknown as NodeListOf<Element>);
      if (scenario === "misplaced")
        vi.mocked(fixture.document.querySelectorAll).mockReturnValue([
          { parentNode: {} },
        ] as unknown as NodeListOf<Element>);
      await initializeRum(
        fixture.view as unknown as Window,
        fixture.document,
        scenario === "off" ? null : deployment,
        fixture.load,
      );
      await Promise.resolve();
      expect(fixture.load, scenario).not.toHaveBeenCalled();
      expect(fixture.view.fetch, scenario).not.toHaveBeenCalled();
    }
  });

  it("initializes once and uses a credential-free, referrer-free transport with no retries", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(startAtMs + 1000);
    const fixture = browserFixture();
    const init = () =>
      initializeRum(
        fixture.view as unknown as Window,
        fixture.document,
        deployment,
        fixture.load,
      );
    await Promise.all([init(), init()]);
    expect(fixture.load).toHaveBeenCalledTimes(1);
    for (const observer of Object.values(fixture.observers))
      expect(observer).toHaveBeenCalledTimes(1);
    fixture.handlers.LCP({ name: "LCP", id: "library-id", value: 1234 });
    expect(fixture.view.fetch).toHaveBeenCalledWith(deployment.endpoint, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      redirect: "error",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "LCP",
        value: 1234,
        measurementId: id,
        sequence: 1,
      }),
    });
    fixture.view.fetch.mockRejectedValue(new Error("private transport detail"));
    fixture.handlers.LCP({ name: "LCP", id: "library-id", value: 1240 });
    await Promise.resolve();
    fixture.handlers.LCP({ name: "LCP", id: "library-id", value: 1250 });
    expect(fixture.view.fetch).toHaveBeenCalledTimes(2);
  });

  it("rechecks maintenance after asynchronous loading and before every callback", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(startAtMs + 1000);
    const fixture = browserFixture();
    fixture.load.mockImplementation(async () => {
      fixture.view.location.href += "#rum=off";
      return fixture.observers;
    });
    await initializeRum(
      fixture.view as unknown as Window,
      fixture.document,
      deployment,
      fixture.load,
    );
    expect(fixture.observers.onLCP).not.toHaveBeenCalled();
    const active = browserFixture();
    await initializeRum(
      active.view as unknown as Window,
      active.document,
      deployment,
      active.load,
    );
    active.view.location.href += "#rum=off";
    active.handlers.CLS({ name: "CLS", id: "library", value: 0 });
    expect(active.view.fetch).not.toHaveBeenCalled();
  });

  it("contains a failed library load without retrying or failing reading", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(startAtMs + 1000);
    const fixture = browserFixture();
    fixture.load.mockRejectedValue(new Error("blocked script"));
    await expect(
      initializeRum(
        fixture.view as unknown as Window,
        fixture.document,
        deployment,
        fixture.load,
      ),
    ).resolves.toBeUndefined();
    expect(fixture.view.fetch).not.toHaveBeenCalled();
  });
});
