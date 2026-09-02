import { describe, expect, it } from "vitest";

import { createPublicSite } from "../../src/site/public-site";
import {
  assertUniquePublicSeoMetadata,
  createPublicSeoMetadata,
  SeoMetadataError,
  serializeJsonLd,
  type SeoPageDescriptor,
} from "../../src/site/seo";

const fixtureOrigin = "https://mythic-china-fixture.vercel.app";
const site = createPublicSite(fixtureOrigin);

describe("public SEO metadata", () => {
  it.each<[SeoPageDescriptor, string]>([
    [
      {
        kind: "home",
        path: "/",
        title: "Mythic China",
        description: "A source-led cultural publication.",
      },
      "WebSite",
    ],
    [
      {
        kind: "explore",
        path: "/explore/",
        title: "Explore",
        description: "Browse published stories.",
      },
      "CollectionPage",
    ],
    [
      {
        kind: "collections",
        path: "/collections/",
        title: "Collections",
        description: "Browse published reading paths.",
      },
      "CollectionPage",
    ],
    [
      {
        kind: "about",
        path: "/about/",
        title: "About",
        description: "Read the editorial method.",
      },
      "AboutPage",
    ],
  ])("builds consistent %s metadata", (descriptor, schemaType) => {
    const metadata = createPublicSeoMetadata(site, descriptor);

    expect(metadata.canonical).toBe(
      `${fixtureOrigin}${descriptor.path === "/" ? "/" : descriptor.path}`,
    );
    expect(metadata.documentTitle).toBe(
      descriptor.title === "Mythic China"
        ? "Mythic China"
        : `${descriptor.title} | Mythic China`,
    );
    expect(metadata.description).toBe(descriptor.description);
    expect(metadata.robots).toBe("index, follow");
    expect(metadata.openGraph).toEqual({
      description: descriptor.description,
      siteName: "Mythic China",
      title: descriptor.title,
      type: "website",
      url: metadata.canonical,
    });
    expect(metadata.openGraph).not.toHaveProperty("image");
    expect(metadata.structuredData).toMatchObject({
      "@context": "https://schema.org",
      "@type": schemaType,
      url: metadata.canonical,
      name: descriptor.title,
      description: descriptor.description,
    });
  });

  it("builds an Article with the visible editorial and publisher identities", () => {
    const metadata = createPublicSeoMetadata(site, {
      kind: "entry",
      path: "/explore/entry-one/",
      title: "Entry One",
      description: "A complete public summary.",
      publishedAt: "2026-08-29",
      updatedAt: "2026-08-30",
    });

    expect(metadata.openGraph.type).toBe("article");
    expect(metadata.structuredData).toMatchObject({
      "@type": "Article",
      headline: "Entry One",
      datePublished: "2026-08-29",
      dateModified: "2026-08-30",
      mainEntityOfPage: `${fixtureOrigin}/explore/entry-one/`,
      author: {
        "@id": `${fixtureOrigin}/about/#editorial`,
        "@type": "Organization",
        name: "Mythic China Editorial",
      },
      publisher: {
        "@id": `${fixtureOrigin}/about/#publisher`,
        "@type": "Organization",
        name: "Mythic China",
      },
    });
  });

  it("keeps Collection ItemList order and absolute published member URLs", () => {
    const metadata = createPublicSeoMetadata(site, {
      kind: "collection",
      path: "/collections/collection-one/",
      title: "Collection One",
      description: "A complete reading path.",
      entryIds: ["entry-b", "entry-a"],
      items: [
        {
          id: "entry-b",
          data: {
            entryId: "entry-b",
            slug: "entry-b",
            status: "published",
          },
        },
        {
          id: "entry-a",
          data: {
            entryId: "entry-a",
            slug: "entry-a",
            status: "published",
          },
        },
      ],
    });

    expect(metadata.structuredData).toMatchObject({
      "@type": "CollectionPage",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            url: `${fixtureOrigin}/explore/entry-b/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            url: `${fixtureOrigin}/explore/entry-a/`,
          },
        ],
      },
    });
  });

  it.each<SeoPageDescriptor>([
    {
      kind: "home",
      path: "/explore/",
      title: "Mythic China",
      description: "A source-led cultural publication.",
    },
    {
      kind: "entry",
      path: "/about/",
      title: "Entry One",
      description: "A complete public summary.",
      publishedAt: "2026-08-30",
      updatedAt: null,
    },
    {
      kind: "about",
      path: "/review/type-specimen/",
      title: "Type specimen",
      description: "Review-only font validation.",
    },
    {
      kind: "collection",
      path: "/collections/../about/",
      title: "Collection One",
      description: "A complete reading path.",
      entryIds: [],
      items: [],
    },
  ])("rejects a page kind/path mismatch: %o", (descriptor) => {
    expect(() => createPublicSeoMetadata(site, descriptor)).toThrow(
      SeoMetadataError,
    );
  });

  it("rejects empty, duplicate, mismatched, or unpublished Collection items", () => {
    const base = {
      kind: "collection" as const,
      path: "/collections/collection-one/",
      title: "Collection One",
      description: "A complete reading path.",
      entryIds: ["entry-one"],
    };
    const published = {
      id: "entry-one",
      data: {
        entryId: "entry-one",
        slug: "entry-one",
        status: "published" as const,
      },
    };

    for (const items of [
      [],
      [published, published],
      [{ ...published, id: "other-entry" }],
      [{ ...published, data: { ...published.data, status: "draft" as const } }],
    ]) {
      expect(() => createPublicSeoMetadata(site, { ...base, items })).toThrow(
        SeoMetadataError,
      );
    }

    expect(() =>
      createPublicSeoMetadata(site, {
        ...base,
        entryIds: ["other-entry"],
        items: [published],
      }),
    ).toThrow(SeoMetadataError);
  });

  it("serializes JSON-LD without an executable closing-script sequence", () => {
    const structuredData = {
      value: "</script><script>alert(1)</script>\u2028\u2029",
    };
    const serialized = serializeJsonLd(structuredData);

    expect(serialized).not.toContain("<");
    expect(serialized).not.toContain("\u2028");
    expect(serialized).not.toContain("\u2029");
    expect(JSON.parse(serialized)).toEqual(structuredData);
  });

  it.each([
    { path: "/explore", title: "Explore", description: "Description" },
    { path: "explore/", title: "Explore", description: "Description" },
    { path: "/explore/?draft=1", title: "Explore", description: "Description" },
    { path: "/explore/", title: " ", description: "Description" },
    { path: "/explore/", title: " Explore", description: "Description" },
    { path: "/explore/", title: "Explore", description: "Line one\nLine two" },
    { path: "/explore/", title: "Explore", description: "" },
  ])("rejects incomplete or non-canonical public metadata: %o", (input) => {
    expect(() =>
      createPublicSeoMetadata(site, { kind: "explore", ...input }),
    ).toThrow(SeoMetadataError);
  });

  it.each([
    { publishedAt: "2026-02-30", updatedAt: null },
    { publishedAt: "not-a-date", updatedAt: null },
    { publishedAt: "2026-08-30", updatedAt: "not-a-date" },
  ])("rejects an invalid Article date pair: %o", (dates) => {
    expect(() =>
      createPublicSeoMetadata(site, {
        kind: "entry",
        path: "/explore/entry-one/",
        title: "Entry One",
        description: "A complete public summary.",
        ...dates,
      }),
    ).toThrow(SeoMetadataError);
  });

  it("rejects a modified date that predates publication", () => {
    expect(() =>
      createPublicSeoMetadata(site, {
        kind: "entry",
        path: "/explore/entry-one/",
        title: "Entry One",
        description: "A complete public summary.",
        publishedAt: "2026-08-30",
        updatedAt: "2026-08-29",
      }),
    ).toThrow(SeoMetadataError);
  });

  it("rejects duplicate canonical, title, or description across public pages", () => {
    const home = createPublicSeoMetadata(site, {
      kind: "home",
      path: "/",
      title: "Mythic China",
      description: "A source-led cultural publication.",
    });
    const explore = createPublicSeoMetadata(site, {
      kind: "explore",
      path: "/explore/",
      title: "Explore",
      description: "Browse published stories.",
    });
    const collections = createPublicSeoMetadata(site, {
      kind: "collections",
      path: "/collections/",
      title: "Collections",
      description: "Browse published reading paths.",
    });

    expect(() => assertUniquePublicSeoMetadata([home, home])).toThrow(
      SeoMetadataError,
    );
    expect(() =>
      assertUniquePublicSeoMetadata([
        home,
        { ...explore, documentTitle: home.documentTitle },
      ]),
    ).toThrow(SeoMetadataError);
    expect(() =>
      assertUniquePublicSeoMetadata([
        explore,
        { ...collections, description: explore.description },
      ]),
    ).toThrow(SeoMetadataError);
  });
});
