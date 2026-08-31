import { describe, expect, it } from "vitest";

import {
  ReleaseArtifactError,
  createReleaseArtifacts,
} from "../../src/site/release-artifacts";
import { PublicReleaseError } from "../../src/site/public-release";
import { createPublicSite } from "../../src/site/public-site";
import {
  makeCollectionData,
  makeEntryData,
  makeEntryRecord,
  makeRecord,
} from "../content/fixtures";

const fixtureOrigin = "https://mythic-china-fixture.vercel.app";
const site = createPublicSite(fixtureOrigin);
const fixedStaticPages = [
  { path: "/" },
  { path: "/explore/" },
  { path: "/collections/" },
  { path: "/about/" },
] as const;

function makePublishedEntry(input: {
  id: string;
  publishedAt: string;
  summary?: string | null;
  title?: string;
  updatedAt?: string | null;
}) {
  return makeEntryRecord(
    makeEntryData({
      entryId: input.id,
      slug: input.id,
      title: input.title ?? input.id,
      nameZh: null,
      pinyin: null,
      summary:
        input.summary === undefined
          ? `Summary for ${input.id}.`
          : input.summary,
      publishedAt: input.publishedAt,
      updatedAt: input.updatedAt ?? null,
      status: "published",
    }),
  );
}

function makePublishedCollection(id: string, entryIds: string[]) {
  return makeRecord(
    id,
    "collections",
    makeCollectionData({
      collectionId: id,
      slug: id,
      title: id,
      titleZh: null,
      pinyin: null,
      featuredEntryId: entryIds[0] ?? null,
      entryIds,
      heroAssetId: `asset-${id}-hero`,
      status: "published",
    }),
  );
}

describe("public release artifacts", () => {
  it("emits deterministic published-only Sitemap and RSS output", () => {
    const draftEntry = makeEntryRecord(
      makeEntryData({
        entryId: "draft-entry",
        slug: "draft-entry",
        title: "Draft Entry",
        nameZh: null,
        pinyin: null,
      }),
    );
    const artifacts = createReleaseArtifacts(site, {
      entries: [
        makePublishedEntry({
          id: "entry-old",
          publishedAt: "2026-08-28",
        }),
        draftEntry,
        makePublishedEntry({
          id: "entry-new",
          publishedAt: "2026-08-30",
          updatedAt: "2026-08-31",
        }),
      ],
      collections: [
        makePublishedCollection("collection-one", ["entry-new", "entry-old"]),
      ],
      staticPages: [
        { path: "/about/", updatedAt: "2026-08-30" },
        { path: "/collections/" },
        { path: "/" },
        { path: "/explore/" },
      ],
      feedDescription: "Published Mythic China entries.",
    });

    expect(artifacts.sitemap).toContain(
      `<loc>${fixtureOrigin}/explore/entry-new/</loc>\n    <lastmod>2026-08-31</lastmod>`,
    );
    expect(artifacts.sitemap).toContain(
      `<loc>${fixtureOrigin}/explore/entry-old/</loc>\n    <lastmod>2026-08-28</lastmod>`,
    );
    expect(artifacts.sitemap).not.toContain("draft-entry");
    const sitemapLocations = [
      ...artifacts.sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu),
    ].map((match) => match[1]);
    expect(sitemapLocations).toEqual([
      `${fixtureOrigin}/`,
      `${fixtureOrigin}/explore/`,
      `${fixtureOrigin}/collections/`,
      `${fixtureOrigin}/about/`,
      `${fixtureOrigin}/explore/entry-new/`,
      `${fixtureOrigin}/explore/entry-old/`,
      `${fixtureOrigin}/collections/collection-one/`,
    ]);
    expect(artifacts.rss).not.toContain("draft-entry");
    const rssLinks = [...artifacts.rss.matchAll(/<link>([^<]+)<\/link>/gu)].map(
      (match) => match[1],
    );
    expect(rssLinks).toEqual([
      `${fixtureOrigin}/`,
      `${fixtureOrigin}/explore/entry-new/`,
      `${fixtureOrigin}/explore/entry-old/`,
    ]);
    expect(artifacts.rss.match(/<item>/gu)).toHaveLength(2);
    expect(artifacts.rss).toContain(
      "<pubDate>Sun, 30 Aug 2026 00:00:00 GMT</pubDate>",
    );
    expect(artifacts.rss).not.toContain("lastBuildDate");
  });

  it("uses Entry ID as the deterministic RSS tie-break for one date", () => {
    const artifacts = createReleaseArtifacts(site, {
      entries: [
        makePublishedEntry({
          id: "entry-b",
          publishedAt: "2026-08-30",
        }),
        makePublishedEntry({
          id: "entry-a",
          publishedAt: "2026-08-30",
        }),
      ],
      collections: [
        makePublishedCollection("collection-one", ["entry-a", "entry-b"]),
      ],
      staticPages: fixedStaticPages,
      feedDescription: "Published entries.",
    });
    const itemLinks = [
      ...artifacts.rss.matchAll(
        /<item>[\s\S]*?<link>([^<]+)<\/link>[\s\S]*?<\/item>/gu,
      ),
    ].map((match) => match[1]);

    expect(itemLinks).toEqual([
      `${fixtureOrigin}/explore/entry-a/`,
      `${fixtureOrigin}/explore/entry-b/`,
    ]);
  });

  it("escapes XML text and links without changing the source records", () => {
    const entry = makePublishedEntry({
      id: "entry-one",
      publishedAt: "2026-08-30",
      title: "Story & Source <One>",
      summary: 'A "quoted" summary & source note with an emoji 🧭.',
    });
    const artifacts = createReleaseArtifacts(site, {
      entries: [entry],
      collections: [makePublishedCollection("collection-one", ["entry-one"])],
      staticPages: fixedStaticPages,
      feedDescription: "Stories & sources.",
    });

    expect(artifacts.rss).toContain("Story &amp; Source &lt;One&gt;");
    expect(artifacts.rss).toContain(
      "A &quot;quoted&quot; summary &amp; source note with an emoji",
    );
    expect(artifacts.rss).toContain("🧭");
    expect(entry.data.title).toBe("Story & Source <One>");
  });

  it("fails closed instead of emitting artifacts for an empty public inventory", () => {
    expect(() =>
      createReleaseArtifacts(site, {
        entries: [],
        collections: [],
        staticPages: fixedStaticPages,
        feedDescription: "Published entries.",
      }),
    ).toThrow(PublicReleaseError);
  });

  it("rejects missing RSS summaries and duplicate Sitemap URLs", () => {
    const entry = makePublishedEntry({
      id: "entry-one",
      publishedAt: "2026-08-30",
      summary: null,
    });
    const collection = makePublishedCollection("collection-one", ["entry-one"]);

    expect(() =>
      createReleaseArtifacts(site, {
        entries: [entry],
        collections: [collection],
        staticPages: fixedStaticPages,
        feedDescription: "Published entries.",
      }),
    ).toThrow(ReleaseArtifactError);
    expect(() =>
      createReleaseArtifacts(site, {
        entries: [
          makePublishedEntry({
            id: "entry-one",
            publishedAt: "2026-08-30",
          }),
        ],
        collections: [collection],
        staticPages: [...fixedStaticPages, { path: "/" }],
        feedDescription: "Published entries.",
      }),
    ).toThrow(ReleaseArtifactError);
  });

  it.each([
    {
      staticPages: [...fixedStaticPages, { path: "/draft/" }],
      feedDescription: "Published entries.",
    },
    {
      staticPages: [
        { path: "/" },
        { path: "/explore/" },
        { path: "/collections/" },
        { path: "/about/", updatedAt: "2026-02-30" },
      ],
      feedDescription: "Published entries.",
    },
    {
      staticPages: fixedStaticPages,
      feedDescription: " Published entries.",
    },
    {
      staticPages: fixedStaticPages,
      feedDescription: "Published\u0000entries.",
    },
    {
      staticPages: fixedStaticPages,
      feedDescription: "Published\ud800entries.",
    },
  ])("rejects an invalid static or XML artifact input: %o", (input) => {
    expect(() =>
      createReleaseArtifacts(site, {
        entries: [
          makePublishedEntry({
            id: "entry-one",
            publishedAt: "2026-08-30",
          }),
        ],
        collections: [makePublishedCollection("collection-one", ["entry-one"])],
        ...input,
      }),
    ).toThrow(ReleaseArtifactError);
  });

  it("rejects a Sitemap that omits any fixed static page", () => {
    expect(() =>
      createReleaseArtifacts(site, {
        entries: [
          makePublishedEntry({
            id: "entry-one",
            publishedAt: "2026-08-30",
          }),
        ],
        collections: [makePublishedCollection("collection-one", ["entry-one"])],
        staticPages: [{ path: "/" }],
        feedDescription: "Published entries.",
      }),
    ).toThrow(ReleaseArtifactError);
  });

  it.each([
    { publishedAt: "2026-02-30", updatedAt: null },
    { publishedAt: "2026-08-30", updatedAt: "not-a-date" },
  ])("rejects an invalid Entry date pair: %o", (dates) => {
    expect(() =>
      createReleaseArtifacts(site, {
        entries: [
          makePublishedEntry({
            id: "entry-one",
            ...dates,
          }),
        ],
        collections: [makePublishedCollection("collection-one", ["entry-one"])],
        staticPages: fixedStaticPages,
        feedDescription: "Published entries.",
      }),
    ).toThrow(ReleaseArtifactError);
  });

  it("rejects an updatedAt that predates publication", () => {
    expect(() =>
      createReleaseArtifacts(site, {
        entries: [
          makePublishedEntry({
            id: "entry-one",
            publishedAt: "2026-08-30",
            updatedAt: "2026-08-29",
          }),
        ],
        collections: [makePublishedCollection("collection-one", ["entry-one"])],
        staticPages: fixedStaticPages,
        feedDescription: "Published entries.",
      }),
    ).toThrow(ReleaseArtifactError);
  });
});
