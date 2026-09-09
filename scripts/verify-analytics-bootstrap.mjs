import assert from "node:assert/strict";
import { Script } from "node:vm";
import { URL, URLSearchParams } from "node:url";
import { setImmediate } from "node:timers/promises";

// This executes the unmodified reviewed bundle. The context has only a Fake fetch;
// it provides neither host networking nor browser/service startup.
export async function assertAnalyticsBootstrapExecution(code, configuration) {
  const script = new Script(code, {
    filename: "reviewed-analytics-bootstrap.js",
  });
  function fixture({
    config = configuration,
    url = configuration.origin + "/about/?private=discard#discard",
    webdriver = false,
    copies = 1,
    fail = false,
    misplaced = false,
  } = {}) {
    const calls = [];
    const listeners = new Map();
    const timers = new Map();
    let atMs = 0;
    const head = {};
    const node = {
      parentNode: misplaced ? {} : head,
      getAttribute: (name) =>
        name === "content"
          ? typeof config === "string"
            ? config
            : JSON.stringify(config)
          : null,
    };
    const document = {
      head,
      visibilityState: "visible",
      querySelectorAll: (selector) =>
        selector === 'meta[name="mythic-china-analytics"]'
          ? Array.from({ length: copies }, () => node)
          : [],
      querySelector: (selector) =>
        selector === 'section.entry-prose[aria-label="Story"]'
          ? { getBoundingClientRect: () => ({ top: 0, bottom: 800 }) }
          : null,
      addEventListener: (type, callback) =>
        listeners.set("document:" + type, callback),
      removeEventListener: (type) => listeners.delete("document:" + type),
    };
    const window = {
      location: new URL(url),
      navigator: { webdriver },
      innerHeight: 600,
      performance: { now: () => atMs },
      setInterval: (callback) => {
        timers.set(1, callback);
        return 1;
      },
      clearInterval: (id) => timers.delete(id),
      addEventListener: (type, callback) =>
        listeners.set("window:" + type, callback),
      removeEventListener: (type) => listeners.delete("window:" + type),
      fetch: (target, options) => {
        calls.push({
          url: target,
          options: JSON.parse(JSON.stringify(options)),
        });
        return fail
          ? Promise.reject(new Error("offline transport failure"))
          : Promise.resolve({ status: 200 });
      },
    };
    script.runInNewContext(
      { window, document, URL, URLSearchParams },
      { timeout: 1000, contextCodeGeneration: { strings: false, wasm: false } },
    );
    return {
      calls,
      listeners,
      timers,
      advance: () => {
        atMs = 15000;
        for (const callback of [...timers.values()]) callback();
      },
      activate: (type = "click", extra = {}) =>
        listeners.get("document:" + type)?.({
          type,
          button: type === "click" ? 0 : 1,
          isTrusted: true,
          defaultPrevented: false,
          target: {
            closest: (selector) =>
              selector === 'nav[aria-labelledby="related-heading"] a[href]'
                ? {
                    getAttribute: (name) =>
                      name === "href" ? "/explore/fighting-cricket/" : null,
                    hasAttribute: () => false,
                  }
                : null,
          },
          ...extra,
        }),
    };
  }
  const enabled = { ...configuration, isEnabled: true };
  const inactive = [
    {},
    { config: enabled, copies: 0 },
    { config: enabled, copies: 2 },
    { config: "{" },
    { config: enabled, misplaced: true },
    { config: { ...enabled, isEnabled: "true" } },
    { config: { ...enabled, extra: true } },
    {
      config: { ...enabled, endpoint: "https://another.goatcounter.com/count" },
    },
    { config: { ...enabled, buildIntent: "review" } },
    {
      config: { ...enabled, origin: "https://preview.vercel.app" },
      url: "https://preview.vercel.app/about/",
    },
    ...[
      "http://localhost:4321/about/",
      "https://preview.vercel.app/about/",
      configuration.origin + "/review/type-specimen/",
      configuration.origin + "/explore/unpublished/",
    ].map((url) => ({ config: enabled, url })),
    { config: enabled, webdriver: true },
  ];
  for (const options of inactive) {
    const result = fixture(options);
    await setImmediate();
    assert.equal(
      result.calls.length + result.listeners.size + result.timers.size,
      0,
      "Inactive or invalid artifact fixture performed work.",
    );
  }
  function checkRequests(calls) {
    for (const call of calls) {
      const url = new URL(call.url);
      assert.equal(url.origin + url.pathname, configuration.endpoint);
      assert.deepEqual([...url.searchParams.keys()].sort(), ["e", "p"]);
      assert.deepEqual(call.options, {
        method: "GET",
        mode: "cors",
        credentials: "omit",
        referrer: "",
        referrerPolicy: "no-referrer",
        cache: "no-store",
        keepalive: true,
        redirect: "error",
      });
      assert(!call.url.includes("private"));
    }
  }
  for (const path of configuration.publicPaths) {
    const f = fixture({
      config: enabled,
      url: configuration.origin + path + "?private=discard#discard",
    });
    await setImmediate();
    assert.equal(f.calls.length, 1);
    assert.equal(new URL(f.calls[0].url).searchParams.get("p"), path);
    assert.equal(new URL(f.calls[0].url).searchParams.get("e"), "false");
    checkRequests(f.calls);
  }
  const entryPath = "/explore/painted-skin/";
  const entry = fixture({
    config: enabled,
    url: configuration.origin + entryPath,
  });
  entry.advance();
  entry.activate();
  entry.activate("auxclick");
  entry.activate("click", { defaultPrevented: true });
  await setImmediate();
  assert.deepEqual(
    entry.calls.map(({ url }) => new URL(url).searchParams.get("p")),
    [
      entryPath,
      "article_session_qualified:" + entryPath,
      "article_depth_75:" + entryPath,
      "related_story_click:" + entryPath,
      "related_story_click:" + entryPath,
    ],
  );
  assert.equal(entry.timers.size, 0);
  checkRequests(entry.calls);
  const failed = fixture({ config: enabled, fail: true });
  await setImmediate();
  assert.equal(failed.calls.length, 1, "Transport failure must not retry.");
}
