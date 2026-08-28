import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";

import { validateContentGraph } from "./validate-content-graph";

export interface LoadedContentGraph {
  entries: CollectionEntry<"entries">[];
  collections: CollectionEntry<"collections">[];
  sources: CollectionEntry<"sources">[];
  claims: CollectionEntry<"claims">[];
  terminology: CollectionEntry<"terminology">[];
}

function compareEntryIds<TCollection extends CollectionKey>(
  left: CollectionEntry<TCollection>,
  right: CollectionEntry<TCollection>,
): number {
  return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
}

export async function loadValidatedContentGraph(): Promise<LoadedContentGraph> {
  const [entries, collections, sources, claims, terminology] =
    await Promise.all([
      getCollection("entries"),
      getCollection("collections"),
      getCollection("sources"),
      getCollection("claims"),
      getCollection("terminology"),
    ]);

  validateContentGraph({
    entries,
    collections,
    sources,
    claims,
    terminology,
  });

  return {
    entries: [...entries].sort(compareEntryIds),
    collections: [...collections].sort(compareEntryIds),
    sources: [...sources].sort(compareEntryIds),
    claims: [...claims].sort(compareEntryIds),
    terminology: [...terminology].sort(compareEntryIds),
  };
}
