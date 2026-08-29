import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { contentIdFromEntryPath } from "./content/content-id";
import {
  claimSchema,
  collectionSchema,
  entrySchema,
  sourceSchema,
  terminologySchema,
} from "./content/content-schemas";
import {
  assetManifestSchema,
  visualBriefSchema,
  visualProductionRecordSchema,
} from "./visual/visual-asset-schemas";

const entries = defineCollection({
  loader: glob({
    base: "./src/content/entries",
    pattern: "**/*.md",
    retainBody: true,
    generateId: ({ entry }) => contentIdFromEntryPath(entry, ".md"),
  }),
  schema: entrySchema,
});

const curatedCollections = defineCollection({
  loader: glob({
    base: "./src/content/collections",
    pattern: "**/*.yml",
    generateId: ({ entry }) => contentIdFromEntryPath(entry, ".yml"),
  }),
  schema: collectionSchema,
});

const sources = defineCollection({
  loader: glob({
    base: "./src/content/sources",
    pattern: "**/*.yml",
    generateId: ({ entry }) => contentIdFromEntryPath(entry, ".yml"),
  }),
  schema: sourceSchema,
});

const claims = defineCollection({
  loader: glob({
    base: "./src/content/claims",
    pattern: "**/*.yml",
    generateId: ({ entry }) => contentIdFromEntryPath(entry, ".yml"),
  }),
  schema: claimSchema,
});

const terminology = defineCollection({
  loader: glob({
    base: "./src/content/terminology",
    pattern: "**/*.yml",
    generateId: ({ entry }) => contentIdFromEntryPath(entry, ".yml"),
  }),
  schema: terminologySchema,
});

const visualBriefs = defineCollection({
  loader: glob({
    base: "./visual/briefs",
    pattern: "**/*.yml",
    generateId: ({ entry }) => contentIdFromEntryPath(entry, ".yml"),
  }),
  schema: visualBriefSchema,
});

const assets = defineCollection({
  loader: glob({
    base: "./visual/manifests",
    pattern: "**/*.yml",
    generateId: ({ entry }) => contentIdFromEntryPath(entry, ".yml"),
  }),
  schema: assetManifestSchema,
});

const productionRecords = defineCollection({
  loader: glob({
    base: "./visual/production-records",
    pattern: "**/*.yml",
    generateId: ({ entry }) => contentIdFromEntryPath(entry, ".yml"),
  }),
  schema: visualProductionRecordSchema,
});

export const collections = {
  entries,
  collections: curatedCollections,
  sources,
  claims,
  terminology,
  visualBriefs,
  assets,
  productionRecords,
};
