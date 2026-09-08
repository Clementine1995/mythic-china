import { describe, expect, it } from "vitest";
import { createPageProjection } from "../../src/site/page-projection";
import {
  createPublicAssembly,
  getPublicHomeSlice,
} from "../../src/site/public-assembly";
import {
  approvedSiteOrigin,
  createConfiguredPublicSite,
  createPublicSite,
} from "../../src/site/public-site";
import {
  makeCollectionData,
  makeEntryData,
  makeEntryRecord,
  makeRecord,
} from "../content/fixtures";

const site = createPublicSite("https://mythic-china-fixture.vercel.app");
function fixture() {
  return {
    entries: [
      makeEntryRecord(
        makeEntryData({
          entryId: "zhong-kui",
          slug: "zhong-kui",
          title: "Zhong Kui",
          summary: "A sourced story.",
          publishedAt: "2026-09-10",
          updatedAt: null,
          status: "published",
        }),
      ),
      makeEntryRecord(
        makeEntryData({
          entryId: "draft-story",
          slug: "draft-story",
          status: "draft",
        }),
      ),
    ],
    collections: [
      makeRecord(
        "chinese-underworld",
        "collections",
        makeCollectionData({
          collectionId: "chinese-underworld",
          slug: "chinese-underworld",
          title: "Chinese Underworld",
          description: "A curated path.",
          entryIds: ["zhong-kui"],
          featuredEntryId: "zhong-kui",
          status: "published",
        }),
      ),
      makeRecord(
        "liaozhai",
        "collections",
        makeCollectionData({
          collectionId: "liaozhai",
          slug: "liaozhai",
          title: "Strange Tales from Liaozhai",
          description: "A second curated path.",
          entryIds: ["zhong-kui"],
          featuredEntryId: "zhong-kui",
          status: "published",
        }),
      ),
    ],
  };
}
describe("local public assembly", () => {
  it("uses published routes and builds one consistent metadata/XML inventory", () => {
    const input = fixture();
    const assembly = createPublicAssembly(site, input);
    expect(createPageProjection(input, "review").entries).toHaveLength(2);
    expect(
      createPageProjection(input, "public").entries.map(({ id }) => id),
    ).toEqual(["zhong-kui"]);
    expect(assembly.metadata).toHaveLength(8);
    expect(assembly.sitemap.match(/<url>/gu)).toHaveLength(8);
    expect(assembly.rss.match(/<item>/gu)).toHaveLength(1);
    expect(
      JSON.stringify(assembly.metadata) + assembly.sitemap + assembly.rss,
    ).not.toMatch(/draft-story|type-specimen|review\//u);
    expect(assembly.home.entry.id).toBe("zhong-kui");
    expect(assembly.home.collections.map(({ id }) => id)).toEqual([
      "chinese-underworld",
      "liaozhai",
    ]);
  });
  it.each([
    "missing",
    "unpublished",
    "wrong-featured",
    "missing-liaozhai",
    "unpublished-liaozhai",
  ])("rejects an ineligible public Home: %s", (reason) => {
    const input = fixture();
    if (reason === "missing") input.entries = [];
    if (reason === "unpublished") input.entries[0]!.data.status = "ready";
    if (reason === "wrong-featured")
      input.collections[0]!.data.featuredEntryId = "draft-story";
    if (reason === "missing-liaozhai") input.collections.pop();
    if (reason === "unpublished-liaozhai")
      input.collections[1]!.data.status = "ready";
    expect(() => getPublicHomeSlice(input)).toThrow();
    expect(() => createPublicAssembly(site, input)).toThrow();
  });
  it("rejects a Collection member omitted from the public projection", () => {
    const input = fixture();
    input.collections[0]!.data.entryIds.push("draft-story");
    expect(() => createPublicAssembly(site, input)).toThrow(
      /unavailable Entry/u,
    );
  });
  it("rejects missing and duplicate metadata before pages are rendered", () => {
    const input = fixture();
    input.entries[0]!.data.summary = null;
    expect(() => createPublicAssembly(site, input)).toThrow(/summary/u);
    input.entries[0]!.data.summary = "A sourced story.";
    input.entries.push(
      makeEntryRecord({
        ...input.entries[0]!.data,
        entryId: "another",
        slug: "another",
      }),
    );
    expect(() => createPublicAssembly(site, input)).toThrow(/unique/u);
  });
  it("binds runtime configuration to the confirmed production hostname", () => {
    expect(createConfiguredPublicSite(approvedSiteOrigin).origin).toBe(
      approvedSiteOrigin,
    );
    for (const origin of [
      undefined,
      "",
      "https://project-scu6m.vercel.app",
      "https://mythic-china-preview-123.vercel.app",
      "http://mythic-china-beta.vercel.app",
    ])
      expect(() => createConfiguredPublicSite(origin)).toThrow();
  });
});
