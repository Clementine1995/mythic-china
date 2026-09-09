import { describe, expect, it } from "vitest";
import {
  createConfiguredPublicSite,
  approvedSiteOrigin,
} from "../../src/site/public-site";
import {
  createPublicAnalyticsConfiguration,
  analyticsSiteOrigin,
  parseAnalyticsConfiguration,
} from "../../src/site/analytics-configuration";

const pages = [
  { kind: "home", path: "/" },
  { kind: "entry", path: "/explore/painted-skin/" },
  { kind: "collection", path: "/collections/liaozhai/" },
];
const configuration = () =>
  createPublicAnalyticsConfiguration(
    createConfiguredPublicSite(approvedSiteOrigin),
    pages,
  );

describe("public analytics configuration", () => {
  it("pins the client identity to the approved site and copies published assembly paths while disabled", () => {
    expect(analyticsSiteOrigin).toBe(approvedSiteOrigin);
    const value = configuration();
    expect(value.isEnabled).toBe(false);
    expect(value.publicPaths).toEqual(pages.map((page) => page.path));
    expect(value.entryPaths).toEqual(["/explore/painted-skin/"]);
    expect(parseAnalyticsConfiguration(value)).toEqual(value);
    expect(() =>
      createPublicAnalyticsConfiguration(
        { origin: "https://preview.vercel.app" } as ReturnType<
          typeof createConfiguredPublicSite
        >,
        pages,
      ),
    ).toThrow();
  });
  it.each([
    null,
    [],
    {},
    { ...configuration(), email: "private" },
    { ...configuration(), isEnabled: "true" },
    { ...configuration(), isEnabled: 1 },
    { ...configuration(), buildIntent: "review" },
    { ...configuration(), origin: "https://preview.vercel.app" },
    { ...configuration(), endpoint: "https://another.goatcounter.com/count" },
    { ...configuration(), publicPaths: "/" },
    { ...configuration(), entryPaths: [null] },
  ])("rejects malformed or unapproved configuration %#", (input) => {
    expect(parseAnalyticsConfiguration(input)).toBeNull();
  });
});
