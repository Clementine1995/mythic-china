import type { EntryData } from "../content/content-schemas";
import { contentIdPattern } from "../content/content-id";
import {
  createPublicUrl,
  type PublicIdentityNode,
  type PublicSite,
} from "./public-site";

interface BaseSeoPageDescriptor {
  path: string;
  title: string;
  description: string;
}

export interface SeoCollectionItem {
  id: string;
  data: Pick<EntryData, "entryId" | "slug" | "status">;
}

export type SeoPageDescriptor =
  | (BaseSeoPageDescriptor & {
      kind: "home" | "explore" | "collections" | "about";
    })
  | (BaseSeoPageDescriptor & {
      kind: "collection";
      entryIds: readonly string[];
      items: readonly SeoCollectionItem[];
    })
  | (BaseSeoPageDescriptor & {
      kind: "entry";
      publishedAt: string;
      updatedAt: string | null;
    });

export interface PublicSeoMetadata {
  canonical: string;
  description: string;
  documentTitle: string;
  openGraph: {
    description: string;
    siteName: string;
    title: string;
    type: "article" | "website";
    url: string;
  };
  robots: "index, follow";
  structuredData: Record<string, unknown>;
}

export class SeoMetadataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SeoMetadataError";
  }
}

function requireText(value: string, label: string): void {
  const hasControlCharacter = [...value].some((character) => {
    const codePoint = character.codePointAt(0);
    return codePoint !== undefined && (codePoint <= 0x1f || codePoint === 0x7f);
  });
  if (value.trim() === "" || value.trim() !== value || hasControlCharacter) {
    throw new SeoMetadataError(
      `Public ${label} must be non-empty without surrounding whitespace or control characters.`,
    );
  }
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
    throw new SeoMetadataError(`Public ${label} must be a real ISO date.`);
  }
}

function isDynamicPagePath(
  path: string,
  prefix: "/explore/" | "/collections/",
): boolean {
  if (!path.startsWith(prefix) || !path.endsWith("/")) return false;
  const slug = path.slice(prefix.length, -1);
  return contentIdPattern.test(slug);
}

function descriptorPathMatches(descriptor: SeoPageDescriptor): boolean {
  switch (descriptor.kind) {
    case "home":
      return descriptor.path === "/";
    case "explore":
      return descriptor.path === "/explore/";
    case "collections":
      return descriptor.path === "/collections/";
    case "about":
      return descriptor.path === "/about/";
    case "entry":
      return isDynamicPagePath(descriptor.path, "/explore/");
    case "collection":
      return isDynamicPagePath(descriptor.path, "/collections/");
  }
}

function createCanonical(
  site: PublicSite,
  descriptor: SeoPageDescriptor,
): string {
  if (!descriptorPathMatches(descriptor)) {
    throw new SeoMetadataError(
      `Public ${descriptor.kind} path does not match its route contract: ${descriptor.path}`,
    );
  }
  return createPublicUrl(site, descriptor.path);
}

function createEntryUrl(site: PublicSite, path: string): string {
  if (!isDynamicPagePath(path, "/explore/")) {
    throw new SeoMetadataError(
      `Collection ItemList target must be an Entry route: ${path}`,
    );
  }
  return createPublicUrl(site, path);
}

function createCollectionItemList(
  site: PublicSite,
  entryIds: readonly string[],
  items: readonly SeoCollectionItem[],
): Record<string, unknown>[] {
  if (items.length === 0 || entryIds.length !== items.length) {
    throw new SeoMetadataError(
      "Public Collection ItemList must contain the Collection entryIds in editorial order.",
    );
  }
  const seenIds = new Set<string>();
  return items.map((item, index) => {
    if (
      item.id !== item.data.entryId ||
      item.id !== entryIds[index] ||
      item.data.status !== "published" ||
      seenIds.has(item.id)
    ) {
      throw new SeoMetadataError(
        `Collection ItemList requires unique published Entry records: ${item.id}`,
      );
    }
    seenIds.add(item.id);
    return {
      "@type": "ListItem",
      position: index + 1,
      url: createEntryUrl(site, `/explore/${item.data.slug}/`),
    };
  });
}

function identityNode(identity: PublicIdentityNode): Record<string, string> {
  return {
    "@id": identity.id,
    "@type": identity.type,
    name: identity.name,
    url: identity.url,
  };
}

function createStructuredData(
  site: PublicSite,
  descriptor: SeoPageDescriptor,
  canonical: string,
): Record<string, unknown> {
  const common = {
    "@context": "https://schema.org",
    url: canonical,
    name: descriptor.title,
    description: descriptor.description,
    inLanguage: "en",
  };

  if (descriptor.kind === "home") {
    return {
      ...common,
      "@type": "WebSite",
      "@id": `${canonical}#website`,
      publisher: identityNode(site.publisher),
    };
  }
  if (descriptor.kind === "entry") {
    return {
      ...common,
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: descriptor.title,
      datePublished: descriptor.publishedAt,
      ...(descriptor.updatedAt === null
        ? {}
        : { dateModified: descriptor.updatedAt }),
      mainEntityOfPage: canonical,
      author: identityNode(site.author),
      publisher: identityNode(site.publisher),
    };
  }
  if (descriptor.kind === "about") {
    return {
      ...common,
      "@type": "AboutPage",
      "@id": `${canonical}#about-page`,
      about: [identityNode(site.publisher), identityNode(site.author)],
      publisher: identityNode(site.publisher),
    };
  }

  const itemList =
    descriptor.kind === "collection"
      ? {
          "@type": "ItemList",
          itemListElement: createCollectionItemList(
            site,
            descriptor.entryIds,
            descriptor.items,
          ),
        }
      : undefined;
  return {
    ...common,
    "@type": "CollectionPage",
    "@id": `${canonical}#collection-page`,
    ...(itemList === undefined ? {} : { mainEntity: itemList }),
    publisher: identityNode(site.publisher),
  };
}

export function createPublicSeoMetadata(
  site: PublicSite,
  descriptor: SeoPageDescriptor,
): PublicSeoMetadata {
  requireText(descriptor.title, "title");
  requireText(descriptor.description, "description");
  if (descriptor.kind === "entry") {
    requireIsoDate(descriptor.publishedAt, "publication date");
    if (descriptor.updatedAt !== null) {
      requireIsoDate(descriptor.updatedAt, "modified date");
      if (descriptor.updatedAt < descriptor.publishedAt) {
        throw new SeoMetadataError(
          "Public modified date cannot precede the publication date.",
        );
      }
    }
  }
  const canonical = createCanonical(site, descriptor);
  const documentTitle =
    descriptor.title === site.name
      ? site.name
      : `${descriptor.title} | ${site.name}`;

  return {
    canonical,
    description: descriptor.description,
    documentTitle,
    openGraph: {
      description: descriptor.description,
      siteName: site.name,
      title: descriptor.title,
      type: descriptor.kind === "entry" ? "article" : "website",
      url: canonical,
    },
    robots: "index, follow",
    structuredData: createStructuredData(site, descriptor, canonical),
  };
}

export function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

export function assertUniquePublicSeoMetadata(
  metadata: readonly PublicSeoMetadata[],
): void {
  for (const field of ["canonical", "documentTitle", "description"] as const) {
    const seen = new Set<string>();
    for (const page of metadata) {
      if (seen.has(page[field])) {
        throw new SeoMetadataError(
          `Public pages must have unique ${field}: ${page[field]}`,
        );
      }
      seen.add(page[field]);
    }
  }
}
