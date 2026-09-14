import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import process from "node:process";
import { setImmediate } from "node:timers/promises";
import { fileURLToPath, URL, URLSearchParams } from "node:url";
import vm from "node:vm";
import { analyticsScriptHref } from "./analytics-output-policy.mjs";
import { assertAnalyticsBootstrapExecution } from "./verify-analytics-bootstrap.mjs";

const { queueMicrotask } = globalThis;

// Execute reviewed source bytes without host import, networking, storage or services.
export function assertRumBootstrapExecution(
  modules,
  analyticsConfiguration,
  rumConfiguration,
) {
  const result = spawnSync(
    process.execPath,
    [
      "--experimental-vm-modules",
      fileURLToPath(import.meta.url),
      "--verify-rum",
    ],
    {
      input: JSON.stringify({
        modules: Object.fromEntries(
          Object.entries(modules).map(([href, bytes]) => [
            href,
            bytes.toString("utf8"),
          ]),
        ),
        analyticsConfiguration,
        rumConfiguration,
      }),
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 1024 * 1024,
    },
  );
  assert.equal(
    result.status,
    0,
    `RUM artifact execution failed: ${result.error?.message ?? result.stderr}`,
  );
  return JSON.parse(result.stdout);
}

async function verify({ modules, analyticsConfiguration, rumConfiguration }) {
  const origin = analyticsConfiguration.origin;
  async function execute(globals, onImport = () => {}) {
    const context = vm.createContext(globals, {
      codeGeneration: { strings: false, wasm: false },
    });
    const cache = new Map();
    const imports = [];
    const violations = [];
    async function resolve(specifier, parent) {
      if (!/^\.\/[a-zA-Z0-9_.-]+\.js$/u.test(specifier)) {
        violations.push(specifier);
        throw new Error("Non-local module import.");
      }
      const href = new URL(
        specifier,
        `https://artifact.invalid${parent.identifier}`,
      ).pathname;
      if (!Object.hasOwn(modules, href)) {
        violations.push(href);
        throw new Error("Unlisted module import.");
      }
      return load(href);
    }
    async function load(href) {
      if (cache.has(href)) return cache.get(href);
      const module = new vm.SourceTextModule(modules[href], {
        context,
        identifier: href,
        initializeImportMeta: (meta) => {
          meta.url = `https://artifact.invalid${href}`;
        },
        importModuleDynamically: async (specifier, parent) => {
          imports.push(specifier);
          onImport();
          const dependency = await resolve(specifier, parent);
          if (dependency.status === "linked")
            await dependency.evaluate({ timeout: 1000 });
          return dependency;
        },
      });
      cache.set(href, module);
      await module.link(resolve);
      return module;
    }
    const entry = await load(analyticsScriptHref);
    await entry.evaluate({ timeout: 1000 });
    await setImmediate();
    assert.deepEqual(
      violations,
      [],
      "Artifact attempted an unapproved import.",
    );
    return imports;
  }

  await assertAnalyticsBootstrapExecution(
    modules[analyticsScriptHref],
    analyticsConfiguration,
    async (_code, globals) => {
      const imports = await execute(globals);
      assert.equal(
        imports.length,
        0,
        "Missing RUM metadata must prevent dynamic loading.",
      );
    },
  );

  let scenarios = 0;
  async function fixture({
    suffix = "",
    href = origin + "/about/" + suffix,
    atMs = rumConfiguration.startAtMs,
    webdriver = false,
    doNotTrack,
    globalPrivacyControl,
    status = 204,
    reject = false,
    config = rumConfiguration,
    copies = 1,
    misplaced = false,
    duringImport,
  } = {}) {
    scenarios++;
    const calls = [];
    const violations = [];
    const observers = [];
    const timers = new Map();
    let timerId = 0;
    let uuid = 0;
    const forbidden = (name) => {
      violations.push(name);
      throw new Error(`Forbidden artifact capability: ${name}`);
    };
    const eventTarget = () => {
      const listeners = new Map();
      return {
        addEventListener(type, callback) {
          if (!listeners.has(type)) listeners.set(type, new Set());
          listeners.get(type).add(callback);
        },
        removeEventListener(type, callback) {
          listeners.get(type)?.delete(callback);
        },
        dispatchEvent(event) {
          for (const callback of [...(listeners.get(event.type) ?? [])])
            callback(event);
          return !event.defaultPrevented;
        },
      };
    };
    const head = { appendChild: () => forbidden("resource injection") };
    const meta = (value) => ({
      parentNode: head,
      getAttribute: (name) =>
        name === "content" ? JSON.stringify(value) : null,
    });
    const rumNode = meta(config);
    if (misplaced) rumNode.parentNode = {};
    if (typeof config === "string") rumNode.getAttribute = () => config;
    const document = {
      ...eventTarget(),
      head,
      visibilityState: "visible",
      prerendering: false,
      createElement: (tag) =>
        tag === "link"
          ? { relList: { supports: () => false } }
          : forbidden("element creation"),
      querySelectorAll: (selector) =>
        selector === 'meta[name="mythic-china-analytics"]'
          ? [meta(analyticsConfiguration)]
          : selector === 'meta[name="mythic-china-rum"]'
            ? Array.from({ length: copies }, () => rumNode)
            : [],
      querySelector: (selector) =>
        selector === 'section.entry-prose[aria-label="Story"]'
          ? { getBoundingClientRect: () => ({ top: 0, bottom: 800 }) }
          : null,
    };
    Object.defineProperty(document, "cookie", {
      get: () => forbidden("cookie read"),
      set: () => {
        forbidden("cookie write");
      },
    });
    const performance = {
      timeOrigin: rumConfiguration.startAtMs,
      now: () => 5000,
      getEntriesByType: (type) =>
        type === "navigation"
          ? [
              {
                responseStart: 1,
                activationStart: 0,
                type: "navigate",
                name: origin + "/private",
                navigationId: "private-id",
              },
            ]
          : [],
    };
    class Observer {
      static supportedEntryTypes = [
        "paint",
        "largest-contentful-paint",
        "layout-shift",
      ];
      types = new Set();
      constructor(callback) {
        this.callback = callback;
        observers.push(this);
      }
      observe({ type }) {
        this.types.add(type);
      }
      disconnect() {
        this.types.clear();
      }
      takeRecords() {
        return [];
      }
    }
    class Clock extends Date {
      static now() {
        return atMs;
      }
    }
    class Event {
      constructor(type) {
        this.type = type;
        this.defaultPrevented = false;
      }
      preventDefault() {
        this.defaultPrevented = true;
      }
    }
    const fetch = (target, options) => {
      if (
        ![analyticsConfiguration.endpoint, rumConfiguration.endpoint].some(
          (endpoint) =>
            target === endpoint || target.startsWith(endpoint + "?"),
        )
      )
        return forbidden("network destination");
      calls.push({ target, options: JSON.parse(JSON.stringify(options)) });
      return target === rumConfiguration.endpoint
        ? reject
          ? Promise.reject(new Error("offline failure"))
          : Promise.resolve({ status })
        : Promise.resolve({ status: 200 });
    };
    const window = {
      ...eventTarget(),
      document,
      location: new URL(href),
      navigator: {
        webdriver,
        doNotTrack,
        globalPrivacyControl,
        sendBeacon: () => forbidden("beacon"),
      },
      performance,
      innerHeight: 600,
      fetch,
      crypto: {
        randomUUID: () =>
          `12345678-1234-4234-8234-${String(++uuid).padStart(12, "0")}`,
      },
      setInterval(callback) {
        timers.set(++timerId, callback);
        return timerId;
      },
      clearInterval(id) {
        timers.delete(id);
      },
    };
    const globals = {
      window,
      document,
      navigator: window.navigator,
      performance,
      fetch,
      URL,
      URLSearchParams,
      Date: Clock,
      Event,
      PerformanceObserver: Observer,
      queueMicrotask,
      addEventListener: window.addEventListener,
      removeEventListener: window.removeEventListener,
      setTimeout: window.setInterval,
      clearTimeout: window.clearInterval,
      requestAnimationFrame: (callback) =>
        window.setInterval(() => callback(5000)),
      XMLHttpRequest: function () {
        forbidden("XHR");
      },
      WebSocket: function () {
        forbidden("WebSocket");
      },
    };
    for (const name of ["localStorage", "sessionStorage", "indexedDB"])
      for (const target of [globals, window])
        Object.defineProperty(target, name, { get: () => forbidden(name) });
    const imports = await execute(globals, () => duringImport?.(window));
    const emit = async (type, data) => {
      for (const observer of [...observers])
        if (observer.types.has(type))
          observer.callback({
            getEntries: () => [{ entryType: type, ...data }],
          });
      await setImmediate();
    };
    const hidden = async () => {
      document.visibilityState = "hidden";
      const event = {
        type: "visibilitychange",
        timeStamp: 5000,
        isTrusted: true,
      };
      document.dispatchEvent(event);
      window.dispatchEvent(event);
      await setImmediate();
    };
    await emit("paint", { name: "first-contentful-paint", startTime: 500 });
    await emit("largest-contentful-paint", {
      startTime: 2000,
      url: "private-resource",
    });
    await emit("layout-shift", {
      startTime: 1000,
      value: 0.15,
      hadRecentInput: false,
      sources: ["private-dom"],
    });
    await hidden();
    assert.deepEqual(violations, []);
    const rumCalls = () =>
      calls.filter((call) => call.target === rumConfiguration.endpoint);
    for (const call of rumCalls()) {
      const body = JSON.parse(call.options.body);
      assert.deepEqual(Object.keys(body).sort(), [
        "measurementId",
        "name",
        "sequence",
        "value",
      ]);
      assert.match(
        body.measurementId,
        /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/u,
      );
      assert(!call.options.body.includes("private"));
      assert.deepEqual(
        { ...call.options, body: undefined },
        {
          method: "POST",
          mode: "cors",
          credentials: "omit",
          referrerPolicy: "no-referrer",
          redirect: "error",
          keepalive: true,
          headers: { "Content-Type": "application/json" },
          body: undefined,
        },
      );
    }
    return {
      calls,
      imports,
      observers,
      rumCalls,
      window,
      document,
      violations,
      emit,
      hidden,
    };
  }

  const enabled = await fixture();
  assert.deepEqual(
    enabled
      .rumCalls()
      .map((call) => JSON.parse(call.options.body).name)
      .sort(),
    ["CLS", "LCP"],
  );
  assert.equal(enabled.imports.length, 1);
  assert.equal(enabled.calls.length, 3, "GoatCounter and RUM must coexist.");
  for (const options of [
    { suffix: "?rum=off" },
    { suffix: "#rum=off" },
    { suffix: "?rum=on&rum=off" },
    { atMs: rumConfiguration.startAtMs - 1 },
    { atMs: rumConfiguration.endAtMs },
    { copies: 0 },
    { copies: 2 },
    { misplaced: true },
    { config: "{" },
    {
      config: {
        ...rumConfiguration,
        endpoint: "https://other.workers.dev/vitals",
      },
    },
    { config: { ...rumConfiguration, extra: "private" } },
  ]) {
    const result = await fixture(options);
    assert.equal(
      result.rumCalls().length +
        result.imports.length +
        result.observers.length,
      0,
      "Inactive RUM performed work.",
    );
    assert.equal(
      result.calls.length,
      1,
      "RUM exclusion must not disable GoatCounter.",
    );
  }
  for (const options of [
    { webdriver: true },
    { doNotTrack: "1" },
    { globalPrivacyControl: true },
    { href: "https://preview.vercel.app/about/" },
    { href: "http://localhost:4321/about/" },
    { href: origin + "/unknown/" },
    { suffix: "?rum=off&analytics=off" },
  ]) {
    const result = await fixture(options);
    assert.equal(
      result.calls.length + result.imports.length + result.observers.length,
      0,
    );
  }
  const rumOnly = await fixture({ suffix: "?analytics=off" });
  assert.equal(rumOnly.calls.length, 2);
  assert.equal(rumOnly.rumCalls().length, 2);
  const interrupted = await fixture({
    duringImport: (window) => {
      window.location.hash = "rum=off";
    },
  });
  assert.equal(interrupted.imports.length, 1);
  assert.equal(interrupted.rumCalls().length + interrupted.observers.length, 0);
  for (const options of [{ status: 429 }, { status: 503 }, { reject: true }]) {
    const result = await fixture(options);
    const count = result.rumCalls().length;
    assert(count > 0);
    await result.emit("layout-shift", {
      startTime: 1200,
      value: 0.1,
      hadRecentInput: false,
    });
    await result.hidden();
    assert.equal(
      result.rumCalls().length,
      count,
      "Failed RUM transport must stop subsequent measurements.",
    );
    assert.equal(
      result.calls.filter((call) => call.target !== rumConfiguration.endpoint)
        .length,
      1,
    );
  }
  return {
    scenarios,
    executedModules: Object.keys(modules).length,
    realNetworkCalls: 0,
  };
}

if (process.argv[2] === "--verify-rum") {
  const result = await verify(JSON.parse(readFileSync(0, "utf8")));
  process.stdout.write(JSON.stringify(result));
}
