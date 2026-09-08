import { createPublicReleaseProjection } from "./public-release";
import { createReleaseArtifacts } from "./release-artifacts";
import {
  assertUniquePublicSeoMetadata,
  createPublicSeoMetadata,
  type SeoPageDescriptor,
} from "./seo";
import type { PublicSite } from "./public-site";
import type {
  EntryRecordLike,
  CollectionRecordLike,
} from "./review-projection";

export const staticPublicPages = [
  {
    kind: "home",
    path: "/",
    title: "Mythic China",
    description:
      "An English-language cultural publication for Chinese myths, legends, traditions, and their sources.",
  },
  {
    kind: "explore",
    path: "/explore/",
    title: "Explore",
    description: "Browse published Mythic China stories and cultural guides.",
  },
  {
    kind: "collections",
    path: "/collections/",
    title: "Collections",
    description: "Explore curated Mythic China reading paths.",
  },
  {
    kind: "about",
    path: "/about/",
    title: "About",
    description: "The scope and editorial method behind Mythic China.",
  },
  {
    kind: "privacy",
    path: "/privacy/",
    title: "Privacy",
    description:
      "How Mythic China handles personal information and planned reader services.",
  },
] as const satisfies readonly SeoPageDescriptor[];

export function getPublicHomeSlice<
  TEntry extends EntryRecordLike,
  TCollection extends CollectionRecordLike,
>(projection: {
  entries: readonly TEntry[];
  collections: readonly TCollection[];
}) {
  // An explicit public editorial choice; never borrow the review draft exception.
  const collection = projection.collections.find(
    (item) => item.id === "chinese-underworld",
  );
  const entry = projection.entries.find((item) => item.id === "zhong-kui");
  const liaozhai = projection.collections.find(
    (item) => item.id === "liaozhai",
  );
  if (
    !collection ||
    !entry ||
    !liaozhai ||
    liaozhai.data.status !== "published" ||
    collection.data.status !== "published" ||
    entry.data.status !== "published" ||
    !collection.data.entryIds.includes(entry.id) ||
    collection.data.featuredEntryId !== entry.id
  ) {
    throw new Error(
      "Public Home requires published Chinese Underworld with Zhong Kui as its featured member, and published Liaozhai.",
    );
  }
  return { collection, entry, collections: [collection, liaozhai] };
}

export function createPublicAssembly<
  TEntry extends EntryRecordLike,
  TCollection extends CollectionRecordLike,
>(
  site: PublicSite,
  input: { entries: readonly TEntry[]; collections: readonly TCollection[] },
) {
  const projection = createPublicReleaseProjection(input);
  const home = getPublicHomeSlice(projection);
  const entriesById = new Map(
    projection.entries.map((entry) => [entry.id, entry]),
  );
  const descriptors: SeoPageDescriptor[] = [
    ...staticPublicPages,
    ...projection.entries.map((entry): SeoPageDescriptor => {
      if (entry.data.summary === null || entry.data.publishedAt === null) {
        throw new Error(
          `Public Entry ${entry.id} requires summary and publishedAt.`,
        );
      }
      return {
        kind: "entry",
        path: `/explore/${entry.data.slug}/`,
        title: entry.data.title,
        description: entry.data.summary,
        publishedAt: entry.data.publishedAt,
        updatedAt: entry.data.updatedAt,
      };
    }),
    ...projection.collections.map(
      (collection): SeoPageDescriptor => ({
        kind: "collection",
        path: `/collections/${collection.data.slug}/`,
        title: collection.data.title,
        description: collection.data.description,
        entryIds: collection.data.entryIds,
        items: collection.data.entryIds.map((id) => {
          const entry = entriesById.get(id);
          if (!entry)
            throw new Error(
              `Public Collection ${collection.id} links to unavailable Entry ${id}.`,
            );
          return entry;
        }),
      }),
    ),
  ];
  const metadata = descriptors.map((descriptor) =>
    createPublicSeoMetadata(site, descriptor),
  );
  assertUniquePublicSeoMetadata(metadata);
  const artifacts = createReleaseArtifacts(site, {
    ...projection,
    staticPages: staticPublicPages,
    feedDescription: staticPublicPages[0].description,
  });
  return {
    site,
    projection,
    home,
    descriptors,
    metadata,
    ...artifacts,
    robots: `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`,
  };
}
