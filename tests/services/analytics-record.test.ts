import { describe, expect, it } from "vitest";
import { normalizeAnalyticsPageview } from "../../src/services/analytics-record";

const site = { origin: "https://mythic-china-beta.vercel.app" };
const valid = {
  pageUrl: `${site.origin}/explore/painted-skin/?email=private#secret`,
  referrer: "https://private.example/inbox?token=secret",
};

describe("analytics pageviews", () => {
  it("keeps only the same-site HTTPS origin and path", () => {
    expect(normalizeAnalyticsPageview(valid, site)).toEqual({
      success: true,
      data: {
        envelope: {
          url: `${site.origin}/explore/painted-skin/`,
          referrer: null,
        },
      },
    });
    expect(
      normalizeAnalyticsPageview({ ...valid, referrer: null }, site).success,
    ).toBe(true);
  });

  it.each([
    null,
    [],
    {},
    { pageUrl: valid.pageUrl },
    { ...valid, referrer: 3 },
    { ...valid, event: { name: "pageview" } },
    { ...valid, properties: { email: "private" } },
    { ...valid, pageUrl: ` ${site.origin}/` },
    { ...valid, pageUrl: "not-a-url" },
    { ...valid, pageUrl: "http://mythic-china-beta.vercel.app/" },
    { ...valid, pageUrl: "https://preview.vercel.app/" },
    { ...valid, pageUrl: "https://user:secret@mythic-china-beta.vercel.app/" },
  ])("rejects invalid or extra input without echoing it: %j", (input) => {
    expect(normalizeAnalyticsPageview(input, site)).toEqual({ success: false });
  });
});
