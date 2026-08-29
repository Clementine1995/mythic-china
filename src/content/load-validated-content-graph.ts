import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";

import { validateContentGraph } from "./validate-content-graph";
import {
  loadImageMetadataRegistry,
  type ImageMetadataRegistry,
} from "../visual/load-image-metadata-registry";
import { validateVisualAssetGraph } from "../visual/validate-visual-asset-graph";
import { loadVisualRecordInventory } from "../visual/load-visual-record-inventory";

export interface LoadedContentGraph {
  entries: CollectionEntry<"entries">[];
  collections: CollectionEntry<"collections">[];
  sources: CollectionEntry<"sources">[];
  claims: CollectionEntry<"claims">[];
  terminology: CollectionEntry<"terminology">[];
  visualBriefs: CollectionEntry<"visualBriefs">[];
  assets: CollectionEntry<"assets">[];
  productionRecords: CollectionEntry<"productionRecords">[];
  imageRegistry: ImageMetadataRegistry;
}

function compareEntryIds<TCollection extends CollectionKey>(
  left: CollectionEntry<TCollection>,
  right: CollectionEntry<TCollection>,
): number {
  return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
}

export async function loadValidatedContentGraph(): Promise<LoadedContentGraph> {
  const [
    entries,
    collections,
    sources,
    claims,
    terminology,
    visualBriefs,
    assets,
    productionRecords,
    imageRegistry,
    recordInventoryIssues,
  ] = await Promise.all([
    getCollection("entries"),
    getCollection("collections"),
    getCollection("sources"),
    getCollection("claims"),
    getCollection("terminology"),
    getCollection("visualBriefs"),
    getCollection("assets"),
    getCollection("productionRecords"),
    loadImageMetadataRegistry(),
    loadVisualRecordInventory(),
  ]);

  const content = validateContentGraph({
    entries,
    collections,
    sources,
    claims,
    terminology,
  });

  validateVisualAssetGraph({
    content,
    visualBriefs,
    assets,
    productionRecords,
    imageRegistry,
    recordInventoryIssues,
  });

  return {
    entries: [...entries].sort(compareEntryIds),
    collections: [...collections].sort(compareEntryIds),
    sources: [...sources].sort(compareEntryIds),
    claims: [...claims].sort(compareEntryIds),
    terminology: [...terminology].sort(compareEntryIds),
    visualBriefs: [...visualBriefs].sort(compareEntryIds),
    assets: [...assets].sort(compareEntryIds),
    productionRecords: [...productionRecords].sort(compareEntryIds),
    imageRegistry,
  };
}
