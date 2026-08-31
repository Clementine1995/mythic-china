import type { CollectionData, EntryData } from "../content/content-schemas";
import { createPublicReleaseProjection } from "./public-release";
import { createPublicUrl, type PublicSite } from "./public-site";

interface ReleaseArtifactEntryRecordLike {
  id: string;
  data: EntryData;
}

interface ReleaseArtifactCollectionRecordLike {
  id: string;
  data: CollectionData;
}

export interface StaticSitemapPage {
  path: string;
  updatedAt?: string | null;
}

export interface ReleaseArtifacts {
  rss: string;
  sitemap: string;
}

export class ReleaseArtifactError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReleaseArtifactError";
  }
}

function escapeXml(value: string): string {
  for (const character of value) {
    const codePoint = character.codePointAt(0);
    const isAllowed =
      codePoint !== undefined &&
      (codePoint === 0x09 ||
        codePoint === 0x0a ||
        codePoint === 0x0d ||
        (codePoint >= 0x20 && codePoint <= 0xd7ff) ||
        (codePoint >= 0xe000 && codePoint <= 0xfffd) ||
        (codePoint >= 0x10000 && codePoint <= 0x10ffff));
    if (!isAllowed) {
      throw new ReleaseArtifactError(
        "Release XML contains a character forbidden by XML 1.0.",
      );
    }
  }
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

const staticPageOrder = ["/", "/explore/", "/collections/", "/about/"] as const;

function requireStaticPagePath(path: string): string {
  if (!(staticPageOrder as readonly string[]).includes(path)) {
    throw new ReleaseArtifactError(
      `Sitemap static page is outside the fixed public route set: ${path}`,
    );
  }
  return path;
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
  );
}

function requireIsoDate(value: string, label: string): void {
  if (!isIsoDate(value)) {
    throw new ReleaseArtifactError(`${label} must be a real ISO date.`);
  }
}

function requireText(value: string, label: string): void {
  if (value.trim() === "" || value.trim() !== value) {
    throw new ReleaseArtifactError(
      `${label} must be non-empty without surrounding whitespace.`,
    );
  }
}

function sitemapUrl(location: string, lastmod?: string | null): string {
  return [
    "  <url>",
    `    <loc>${escapeXml(location)}</loc>`,
    ...(lastmod === undefined || lastmod === null
      ? []
      : [`    <lastmod>${escapeXml(lastmod)}</lastmod>`]),
    "  </url>",
  ].join("\n");
}

export function createReleaseArtifacts<
  TEntry extends ReleaseArtifactEntryRecordLike,
  TCollection extends ReleaseArtifactCollectionRecordLike,
>(
  site: PublicSite,
  input: {
    entries: readonly TEntry[];
    collections: readonly TCollection[];
    staticPages: readonly StaticSitemapPage[];
    feedDescription: string;
  },
): ReleaseArtifacts {
  requireText(input.feedDescription, "RSS description");
  const projection = createPublicReleaseProjection(input);
  const staticLocations = input.staticPages
    .map((page) => {
      const path = requireStaticPagePath(page.path);
      if (page.updatedAt !== undefined && page.updatedAt !== null) {
        requireIsoDate(page.updatedAt, `Sitemap lastmod for ${path}`);
      }
      return {
        path,
        location: createPublicUrl(site, path),
        lastmod: page.updatedAt,
      };
    })
    .sort(
      (left, right) =>
        staticPageOrder.indexOf(left.path as (typeof staticPageOrder)[number]) -
        staticPageOrder.indexOf(right.path as (typeof staticPageOrder)[number]),
    );
  if (
    staticLocations.length !== staticPageOrder.length ||
    staticPageOrder.some((path, index) => staticLocations[index]?.path !== path)
  ) {
    throw new ReleaseArtifactError(
      "Sitemap must include each fixed public static page exactly once.",
    );
  }
  const entryLocations = projection.entries.map((entry) => {
    const publishedAt = entry.data.publishedAt;
    if (publishedAt === null) {
      throw new ReleaseArtifactError(
        `Published Entry ${entry.id} requires publishedAt.`,
      );
    }
    requireIsoDate(publishedAt, `Published date for ${entry.id}`);
    if (entry.data.updatedAt !== null) {
      requireIsoDate(entry.data.updatedAt, `Updated date for ${entry.id}`);
      if (entry.data.updatedAt < publishedAt) {
        throw new ReleaseArtifactError(
          `Updated date for ${entry.id} cannot precede its publication date.`,
        );
      }
    }
    return {
      location: createPublicUrl(site, `/explore/${entry.data.slug}/`),
      lastmod: entry.data.updatedAt ?? publishedAt,
    };
  });
  const collectionLocations = projection.collections.map((collection) => ({
    location: createPublicUrl(site, `/collections/${collection.data.slug}/`),
    lastmod: null,
  }));
  const allLocations = [
    ...staticLocations,
    ...entryLocations,
    ...collectionLocations,
  ];
  const seenLocations = new Set<string>();
  for (const { location } of allLocations) {
    if (seenLocations.has(location)) {
      throw new ReleaseArtifactError(`Duplicate Sitemap URL: ${location}`);
    }
    seenLocations.add(location);
  }

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allLocations.map(({ location, lastmod }) =>
      sitemapUrl(location, lastmod),
    ),
    "</urlset>",
    "",
  ].join("\n");

  const items = projection.entries.map((entry) => {
    const description = entry.data.summary;
    const publishedAt = entry.data.publishedAt;
    if (description === null || publishedAt === null) {
      throw new ReleaseArtifactError(
        `Published Entry ${entry.id} requires summary and publishedAt for RSS.`,
      );
    }
    requireText(entry.data.title, `RSS title for ${entry.id}`);
    requireText(description, `RSS description for ${entry.id}`);
    requireIsoDate(publishedAt, `RSS publication date for ${entry.id}`);
    const link = createPublicUrl(site, `/explore/${entry.data.slug}/`);
    const publicationDate = new Date(
      `${publishedAt}T00:00:00.000Z`,
    ).toUTCString();
    return [
      "    <item>",
      `      <title>${escapeXml(entry.data.title)}</title>`,
      `      <description>${escapeXml(description)}</description>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
      `      <pubDate>${publicationDate}</pubDate>`,
      "    </item>",
    ].join("\n");
  });
  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml(site.name)}</title>`,
    `    <link>${escapeXml(site.rootUrl)}</link>`,
    `    <description>${escapeXml(input.feedDescription)}</description>`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return { rss, sitemap };
}
