import { describe, expect, it, vi } from "vitest";
import { analyticsEventNames } from "../../src/services/analytics-record";
import {
  GoatCounterAnalyticsAdapter,
  type GoatCounterConfiguration,
} from "../../src/services/goatcounter-analytics";

const origin = "https://mythic-china-beta.vercel.app";
const endpoint = "https://mythic-china.goatcounter.com/count";
const path = "/explore/painted-skin/";
const configuration: GoatCounterConfiguration = {
  origin,
  endpoint,
  publicPaths: ["/", "/about/", path],
  entryPaths: [path],
};
const page = {
  pageUrl: `${origin}${path}?email=private#secret`,
  referrer: "https://private.example/secret",
};

describe("GoatCounter minimal request adapter", () => {
  it("encodes only a page path or one of three source-article events", async () => {
    const transport = vi.fn(async () => ({ status: 200 }));
    const adapter = new GoatCounterAnalyticsAdapter(configuration, transport);
    for (const publicPath of configuration.publicPaths)
      await adapter.pageview({
        ...page,
        pageUrl: `${origin}${publicPath}?private=value#private`,
      });
    for (const name of analyticsEventNames)
      await adapter.record({ ...page, event: { name } });
    expect(transport).toHaveBeenCalledTimes(6);
    const expected = [
      ...configuration.publicPaths.map((p) => [p, "false"]),
      ...analyticsEventNames.map((name) => [`${name}:${path}`, "true"]),
    ];
    transport.mock.calls.forEach((args, index) => {
      const [url, options] = args as unknown as [string, RequestInit];
      const parsed = new URL(url);
      expect(`${parsed.origin}${parsed.pathname}`).toBe(endpoint);
      expect([...parsed.searchParams]).toEqual([
        ["p", expected[index][0]],
        ["e", expected[index][1]],
      ]);
      expect(parsed.hash).toBe("");
      expect(options).toEqual({
        method: "GET",
        mode: "cors",
        credentials: "omit",
        referrer: "",
        referrerPolicy: "no-referrer",
        cache: "no-store",
        keepalive: true,
        redirect: "error",
      });
      const request = new Request(url, options);
      expect(request.credentials).toBe("omit");
      expect(request.referrer).toBe("");
      expect(request.redirect).toBe("error");
      expect(request.cache).toBe("no-store");
      expect(request.body).toBeNull();
    });
  });

  it("requires published membership in addition to path shape", async () => {
    const transport = vi.fn(async () => ({ status: 200 }));
    const adapter = new GoatCounterAnalyticsAdapter(configuration, transport);
    for (const invalid of [
      "/review/type-specimen/",
      "/explore/unpublished/",
      "/explore/painted-skin",
      "/other/",
    ]) {
      expect(
        await adapter.pageview({ ...page, pageUrl: origin + invalid }),
      ).toEqual({ status: "validation-error" });
      expect(
        await adapter.record({
          ...page,
          pageUrl: origin + invalid,
          event: { name: "related_story_click" },
        }),
      ).toEqual({ status: "validation-error" });
    }
    expect(
      await adapter.record({
        ...page,
        pageUrl: `${origin}/about/`,
        event: { name: "related_story_click" },
      }),
    ).toEqual({ status: "validation-error" });
    expect(
      await adapter.record({
        ...page,
        event: { name: "related_story_click", targetId: "secret" },
      }),
    ).toEqual({ status: "validation-error" });
    expect(await adapter.pageview({ ...page, email: "private" })).toEqual({
      status: "validation-error",
    });
    expect(transport).not.toHaveBeenCalled();
  });

  it.each([0, 200, 204, 302, 429, 500])(
    "never claims a response proves recording: %i",
    async (status) => {
      const transport = vi.fn(async () => ({ status }));
      const result = await new GoatCounterAnalyticsAdapter(
        configuration,
        transport,
      ).pageview(page);
      expect(result).toEqual(
        status === 429
          ? { status: "rate-limited", retryAfterSeconds: null }
          : status >= 400
            ? { status: "unavailable" }
            : { status: "unknown", reason: "unknown-result" },
      );
      expect(transport).toHaveBeenCalledTimes(1);
    },
  );

  it("redacts network failures and never retries or uses another transport", async () => {
    const transport = vi.fn(async () => {
      throw new Error("private input");
    });
    const adapter = new GoatCounterAnalyticsAdapter(configuration, transport);
    expect(await adapter.pageview(page)).toEqual({
      status: "unknown",
      reason: "unknown-result",
    });
    expect(transport).toHaveBeenCalledTimes(1);
  });

  it.each([
    { endpoint: "https://mythic-china.goatcounter.com/count?token=private" },
    { endpoint: "https://mythic-china.goatcounter.com/count#secret" },
    { endpoint: "https://goatcounter.com/count" },
    { endpoint: "https://mythic-china.goatcounter.com.other.example/count" },
    { endpoint: "https://user:pass@mythic-china.goatcounter.com/count" },
    { endpoint: "https://mythic-china.goatcounter.com/api/v0/count" },
    { origin: origin + "/" },
    { origin: "http://localhost:4321" },
    { publicPaths: ["/", "/"] },
    { publicPaths: ["/?email=private"] },
    { publicPaths: ["//elsewhere/"] },
    { entryPaths: ["/about/"] },
    { entryPaths: ["/explore/unpublished/"] },
  ])("rejects an invalid collection boundary: %j", (override) => {
    const transport = vi.fn(async () => ({ status: 200 }));
    expect(
      () =>
        new GoatCounterAnalyticsAdapter(
          { ...configuration, ...override },
          transport,
        ),
    ).toThrow();
    expect(transport).not.toHaveBeenCalled();
  });

  it("copies path membership so later input mutations cannot broaden collection", async () => {
    const publicPaths = [...configuration.publicPaths];
    const entryPaths = [...configuration.entryPaths];
    const transport = vi.fn(async () => ({ status: 200 }));
    const adapter = new GoatCounterAnalyticsAdapter(
      { ...configuration, publicPaths, entryPaths },
      transport,
    );
    publicPaths.push("/explore/unpublished/");
    entryPaths.push("/explore/unpublished/");
    expect(
      await adapter.pageview({
        ...page,
        pageUrl: origin + "/explore/unpublished/",
      }),
    ).toEqual({ status: "validation-error" });
    expect(transport).not.toHaveBeenCalled();
  });
});
