import { describe, expect, it } from "vitest";
import { analyticsScriptHref } from "../../scripts/analytics-output-policy.mjs";
import { createPublicSite } from "../../src/site/public-site.ts";
import {
  createPublicSeoMetadata,
  serializeJsonLd,
} from "../../src/site/seo.ts";
import { createReleaseArtifacts } from "../../src/site/release-artifacts.ts";
import {
  makeEntryData,
  makeEntryRecord,
  makeCollectionData,
  makeRecord,
} from "../content/fixtures.ts";
import {
  assertPublicInventory,
  assertPublicDocument,
  assertPublicDiscoveryFiles,
  publicPagePaths,
  publicOutputPath,
  publicCollectionMembers,
} from "../../scripts/public-output-policy.mjs";
import { assertReviewHtmlResourcePolicy } from "../../scripts/review-output-policy.mjs";

const origin = "https://mythic-china-beta.vercel.app";
const analyticsConfiguration = {
  buildIntent: "public",
  isEnabled: true,
  origin,
  endpoint: "https://mythic-china.goatcounter.com/count",
  publicPaths: [...publicPagePaths],
  entryPaths: publicPagePaths.filter(
    (path) => path.startsWith("/explore/") && path !== "/explore/",
  ),
};
const analyticsHtml = `<meta name="mythic-china-analytics" content='${JSON.stringify(analyticsConfiguration)}'><script type="module" src="${analyticsScriptHref}"></script>`;
const site = createPublicSite(origin);
function homeHtml() {
  const metadata = createPublicSeoMetadata(site, {
    kind: "home",
    path: "/",
    title: "Mythic China",
    description: "Stories and sources.",
  });
  return `<!doctype html><html lang="en"><head><title>Mythic China</title><meta name="description" content="Stories and sources."><meta name="robots" content="index, follow"><link rel="canonical" href="${origin}/"><link rel="alternate" type="application/rss+xml" title="Mythic China" href="/rss.xml"><meta property="og:title" content="Mythic China"><meta property="og:description" content="Stories and sources."><meta property="og:type" content="website"><meta property="og:url" content="${origin}/"><meta property="og:site_name" content="Mythic China"><script type="application/ld+json">${serializeJsonLd(metadata.structuredData)}</script>${analyticsHtml}</head><body><h1>Chinese myths, carefully told.</h1></body></html>`;
}
describe("public output safety", () => {
  it("accepts validated discovery metadata but keeps the review policy strict", () => {
    expect(assertPublicDocument(homeHtml(), "/", origin).canonical).toBe(
      `${origin}/`,
    );
    expect(() =>
      assertReviewHtmlResourcePolicy(homeHtml(), "index.html"),
    ).toThrow();
    const review =
      '<!doctype html><html><head><meta name="robots" content="noindex, nofollow"></head><body></body></html>';
    expect(() =>
      assertReviewHtmlResourcePolicy(review, "index.html"),
    ).not.toThrow();
    for (const addition of [
      '<script type="application/ld+json">{}</script>',
      '<link rel="canonical" href="https://host.invalid/">',
      '<meta property="og:title" content="Title">',
    ])
      expect(() =>
        assertReviewHtmlResourcePolicy(
          review.replace("</head>", `${addition}</head>`),
          "index.html",
        ),
      ).toThrow();
  });
  it.each([
    ["missing analytics", (html) => html.replace(analyticsHtml, "")],
    [
      "duplicate analytics",
      (html) => html.replace(analyticsHtml, analyticsHtml + analyticsHtml),
    ],
    [
      "unexpected disabled analytics",
      (html) => html.replace('"isEnabled":true', '"isEnabled":false'),
    ],
    [
      "uppercase extra canonical",
      (html) =>
        html.replace(
          "</head>",
          '<link rel="CANONICAL" href="https://other.invalid/"></head>',
        ),
    ],
    [
      "uppercase extra feed",
      (html) =>
        html.replace(
          "</head>",
          '<link rel="ALTERNATE" href="https://other.invalid/feed"></head>',
        ),
    ],
    [
      "uppercase extra OG",
      (html) =>
        html.replace(
          "</head>",
          '<meta property="OG:TITLE" content="Other"></head>',
        ),
    ],
    [
      "uppercase extra description",
      (html) =>
        html.replace(
          "</head>",
          '<meta name="DESCRIPTION" content="Other"></head>',
        ),
    ],
    [
      "executable script",
      (html) => html.replace("</head>", "<script>alert(1)</script></head>"),
    ],
    [
      "JSON-LD src",
      (html) =>
        html.replace(
          'type="application/ld+json"',
          'type="application/ld+json" src="/payload.js"',
        ),
    ],
    [
      "JSON-LD handler",
      (html) =>
        html.replace(
          'type="application/ld+json"',
          'type="application/ld+json" onload="alert(1)"',
        ),
    ],
    [
      "duplicate JSON-LD",
      (html) =>
        html.replace(
          "</head>",
          '<script type="application/ld+json">{}</script></head>',
        ),
    ],
    [
      "wrong canonical",
      (html) =>
        html.replace(
          `rel="canonical" href="${origin}/"`,
          'rel="canonical" href="https://another.vercel.app/"',
        ),
    ],
    [
      "wrong OG identity",
      (html) =>
        html.replace(
          `property="og:url" content="${origin}/"`,
          'property="og:url" content="https://another.vercel.app/"',
        ),
    ],
    [
      "wrong publisher",
      (html) =>
        html.replace(
          '"name":"Mythic China","url"',
          '"name":"Someone else","url"',
        ),
    ],
    ["noindex", (html) => html.replace("index, follow", "noindex, nofollow")],
    [
      "duplicate robots",
      (html) =>
        html.replace(
          "</head>",
          '<meta name="robots" content="noindex"></head>',
        ),
    ],
    [
      "remote resource",
      (html) =>
        html.replace(
          "</body>",
          '<img src="https://remote.invalid/image.webp"></body>',
        ),
    ],
    [
      "form",
      (html) =>
        html.replace("</body>", '<form action="/subscribe"></form></body>'),
    ],
    [
      "event handler",
      (html) => html.replace("<h1>", '<h1 onclick="alert(1)">'),
    ],
    [
      "unsafe canonical attribute",
      (html) =>
        html.replace(
          'rel="canonical"',
          'rel="canonical" style="background:url(https://remote.invalid/pixel)"',
        ),
    ],
    [
      "review material",
      (html) =>
        html.replace(
          "</body>",
          '<a href="/review/type-specimen/">Sample</a></body>',
        ),
    ],
    [
      "duplicate attribute",
      (html) =>
        html.replace('rel="canonical"', 'rel="canonical" rel="stylesheet"'),
    ],
  ])("rejects %s", (_label, mutate) => {
    expect(() =>
      assertPublicDocument(mutate(homeHtml()), "/", origin),
    ).toThrow();
  });
  it("requires exact page and artifact inventories", () => {
    const files = [
      ...publicPagePaths.map(publicOutputPath),
      "rss.xml",
      "sitemap.xml",
      "robots.txt",
      "_astro/site.css",
      analyticsScriptHref.slice(1),
    ];
    expect(() => assertPublicInventory(files)).not.toThrow();
    for (const extra of [
      "review/type-specimen/index.html",
      "_astro/script.js",
      "extra.xml",
      ".env",
    ])
      expect(() => assertPublicInventory([...files, extra])).toThrow();
    expect(() => assertPublicInventory(files.slice(1))).toThrow();
  });
  it("checks discovery files against rendered identities and rejects additions or URL/date drift", () => {
    const entryPaths = publicPagePaths.filter(
      (path) => path.startsWith("/explore/") && path !== "/explore/",
    );
    const entries = entryPaths.map((path) => {
      const id = path.split("/")[2];
      return makeEntryRecord(
        makeEntryData({
          entryId: id,
          slug: id,
          title: `Title ${id}`,
          summary: `Summary ${id}`,
          status: "published",
          publishedAt: "2026-09-10",
          updatedAt: null,
        }),
      );
    });
    const collections = Object.entries(publicCollectionMembers).map(
      ([path, ids]) => {
        const id = path.split("/")[2];
        return makeRecord(
          id,
          "collections",
          makeCollectionData({
            collectionId: id,
            slug: id,
            title: `Collection ${id}`,
            entryIds: ids,
            featuredEntryId: ids[0],
            status: "published",
          }),
        );
      },
    );
    const pages = publicPagePaths.map((path) => {
      const entry = entries.find(
        (item) => path === `/explore/${item.data.slug}/`,
      );
      const collection = collections.find(
        (item) => path === `/collections/${item.data.slug}/`,
      );
      return {
        path,
        canonical: `${origin}${path}`,
        title: entry?.data.title ?? collection?.data.title ?? path,
        description: entry?.data.summary ?? "Site description",
        publishedAt: entry?.data.publishedAt,
        updatedAt: undefined,
      };
    });
    const artifacts = {
      ...createReleaseArtifacts(site, {
        entries,
        collections,
        staticPages: publicPagePaths.slice(0, 5).map((path) => ({ path })),
        feedDescription: "Site description",
      }),
      robots: `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
    };
    expect(() =>
      assertPublicDiscoveryFiles(artifacts, pages, origin),
    ).not.toThrow();
    expect(() =>
      assertPublicDiscoveryFiles(
        {
          ...artifacts,
          sitemap: artifacts.sitemap.replace(
            "</urlset>",
            "<url><loc>https://wrong.invalid/</loc></url></urlset>",
          ),
        },
        pages,
        origin,
      ),
    ).toThrow();
    expect(() =>
      assertPublicDiscoveryFiles(
        {
          ...artifacts,
          rss: artifacts.rss.replace("10 Sep 2026", "11 Sep 2026"),
        },
        pages,
        origin,
      ),
    ).toThrow();
    expect(() =>
      assertPublicDiscoveryFiles(
        { ...artifacts, robots: "User-agent: *\nDisallow: /\n" },
        pages,
        origin,
      ),
    ).toThrow();
  });
});
