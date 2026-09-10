import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assertPublicHtmlResourcePolicy,
  assertReviewHtmlResourcePolicy,
} from "../../scripts/review-output-policy.mjs";

describe("RUM output activation boundary", () => {
  it("blocks a configured or executable RUM artifact until its production review", () => {
    for (const intent of ["review", "public"]) {
      const policy =
        intent === "review"
          ? assertReviewHtmlResourcePolicy
          : assertPublicHtmlResourcePolicy;
      for (const extra of [
        '<meta name="mythic-china-rum" content="{}">',
        '<script type="module" src="/_astro/rum.js"></script>',
        '<script src="https://static.cloudflareinsights.com/beacon.min.js"></script>',
      ]) {
        const html = `<!doctype html><html><head><meta name="robots" content="${intent === "review" ? "noindex, nofollow" : "index, follow"}">${extra}</head><body></body></html>`;
        expect(() => policy(html, "index.html")).toThrow();
      }
    }
  });

  it("keeps data storage, attribution and additional vitals outside the browser boundary", () => {
    const read = (path: string) =>
      readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
    for (const path of [
      "src/rum/bootstrap.ts",
      "src/rum/collector.ts",
      "src/rum/web-vitals.ts",
    ])
      expect(read(path)).not.toMatch(
        /\b(?:localStorage|sessionStorage|indexedDB|sendBeacon|onFCP|onTTFB|reportAllChanges|reportSoftNavs)\b|web-vitals\/attribution/u,
      );
    expect(read("src/rum/bootstrap.ts")).toContain('import("./web-vitals.ts")');
    expect(read("src/rum/web-vitals.ts")).toContain('from "web-vitals"');
    expect(read("workers/rum/worker.ts")).not.toMatch(
      /console\.|request\.headers\.(?:entries|forEach)|request\.cf|request\.clone/u,
    );
  });
});
