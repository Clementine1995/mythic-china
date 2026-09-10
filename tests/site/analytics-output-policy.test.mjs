import { describe, expect, it } from "vitest";
import { Buffer } from "node:buffer";
import { assertAnalyticsBootstrapExecution } from "../../scripts/verify-analytics-bootstrap.mjs";
import {
  analyticsScriptHref,
  assertAnalyticsScriptBytes,
  assertAnalyticsConfiguration,
} from "../../scripts/analytics-output-policy.mjs";
import {
  assertPublicHtmlResourcePolicy,
  assertReviewHtmlResourcePolicy,
} from "../../scripts/review-output-policy.mjs";
const script = `<script type="module" src="${analyticsScriptHref}"></script>`;
const html = (content, intent = "public") =>
  `<!doctype html><html><head><meta name="robots" content="${intent === "public" ? "index, follow" : "noindex, nofollow"}">${content}</head><body></body></html>`;
const origin = "https://mythic-china-beta.vercel.app";
const config = {
  buildIntent: "public",
  isEnabled: true,
  origin,
  endpoint: "https://mythic-china.goatcounter.com/count",
  publicPaths: ["/", "/explore/painted-skin/"],
  entryPaths: ["/explore/painted-skin/"],
};
describe("analytics artifact boundary", () => {
  it("detects work deferred to a microtask while analytics is disabled", async () => {
    await expect(
      assertAnalyticsBootstrapExecution(
        'Promise.resolve().then(() => window.addEventListener("click", () => {}));',
        config,
      ),
    ).rejects.toThrow("performed work");
  });
  it("allows only the exact empty local module in public head", () => {
    expect(
      assertPublicHtmlResourcePolicy(html(script), "index.html"),
    ).toContainEqual(
      expect.objectContaining({ pathname: analyticsScriptHref }),
    );
    for (const value of [
      script.replace("></script>", ">alert(1)</script>"),
      script.replace('type="module"', 'type="text/javascript"'),
      script.replace('type="module"', 'type="module" onload="alert(1)"'),
      script.replace('type="module"', 'type="module" defer'),
      script.replace(analyticsScriptHref, "/_astro/other.js"),
      script.replace(analyticsScriptHref, analyticsScriptHref + "?extra"),
      script.replace(analyticsScriptHref, "https://another.invalid/script.js"),
    ])
      expect(() =>
        assertPublicHtmlResourcePolicy(html(value), "index.html"),
      ).toThrow();
    expect(() =>
      assertPublicHtmlResourcePolicy(
        html("").replace("</body>", script + "</body>"),
        "index.html",
      ),
    ).toThrow();
  });
  it("does not allow the approved public script or metadata in review", () => {
    for (const value of [
      script,
      '<meta name="mythic-china-analytics" content="{}">',
    ])
      expect(() =>
        assertReviewHtmlResourcePolicy(html(value, "review"), "index.html"),
      ).toThrow();
  });
  it("rejects modified script bytes", () => {
    expect(() => assertAnalyticsScriptBytes(Buffer.from("alert(1)"))).toThrow(
      /reviewed bytes/,
    );
  });
  it("requires enabled configuration with exact origin, account and complete paths", () => {
    expect(() =>
      assertAnalyticsConfiguration(config, origin, config.publicPaths),
    ).not.toThrow();
    for (const mutated of [
      { ...config, isEnabled: false },
      { ...config, isEnabled: "false" },
      { ...config, extra: true },
      { ...config, origin: "https://preview.vercel.app" },
      { ...config, endpoint: "https://another.goatcounter.com/count" },
      { ...config, publicPaths: ["/"] },
      { ...config, entryPaths: [] },
      { ...config, publicPaths: [...config.publicPaths, "/"] },
    ])
      expect(() =>
        assertAnalyticsConfiguration(mutated, origin, config.publicPaths),
      ).toThrow();
  });
});
