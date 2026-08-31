import { describe, expect, it } from "vitest";

import {
  createPublicSite,
  createPublicUrl,
  PublicSiteConfigurationError,
} from "../../src/site/public-site";

const fixtureOrigin = "https://mythic-china-fixture.vercel.app";

describe("public site identity", () => {
  it("normalizes one explicit HTTPS origin and exposes confirmed identities", () => {
    const site = createPublicSite(`${fixtureOrigin}/`);

    expect(site).toEqual({
      origin: fixtureOrigin,
      rootUrl: `${fixtureOrigin}/`,
      name: "Mythic China",
      publisher: {
        id: `${fixtureOrigin}/about/#publisher`,
        name: "Mythic China",
        type: "Organization",
        url: `${fixtureOrigin}/about/`,
      },
      author: {
        id: `${fixtureOrigin}/about/#editorial`,
        name: "Mythic China Editorial",
        type: "Organization",
        url: `${fixtureOrigin}/about/`,
      },
    });
    expect(createPublicUrl(site, "/explore/zhong-kui/")).toBe(
      `${fixtureOrigin}/explore/zhong-kui/`,
    );
  });

  it.each([
    undefined,
    "",
    ` ${fixtureOrigin}`,
    "http://mythic-china-fixture.vercel.app",
    `${fixtureOrigin}:443`,
    `${fixtureOrigin}:8443`,
    `${fixtureOrigin}/./`,
    `${fixtureOrigin}/a/../`,
    `${fixtureOrigin}/%2e/`,
    `${fixtureOrigin}/preview/`,
    `${fixtureOrigin}/?deployment=preview`,
    `${fixtureOrigin}/#preview`,
    "https://user:secret@mythic-china-fixture.vercel.app",
    "https://localhost",
    "https://localhost.",
    "https://preview.local",
    "https://production",
    "https://127.0.0.1",
    "https://[::1]",
    "https://example.com",
    "https://preview.example.com",
    "https://placeholder.invalid",
    "https://mythic-\tchina-fixture.vercel.app",
    "https://mythic-\nchina-fixture.vercel.app",
  ])("rejects a missing, placeholder, or non-origin value: %s", (value) => {
    expect(() => createPublicSite(value)).toThrow(PublicSiteConfigurationError);
  });

  it("rejects paths that escape or normalize away from their input", () => {
    const site = createPublicSite(fixtureOrigin);

    for (const path of [
      "//other.example.org/",
      "/explore/../about/",
      "/explore/%2e%2e/about/",
      "/explore\\entry/",
      "/about/?preview=1",
    ]) {
      expect(() => createPublicUrl(site, path)).toThrow(
        PublicSiteConfigurationError,
      );
    }
  });
});
