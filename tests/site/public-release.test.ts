import { describe, expect, it } from "vitest";

import {
  claimSchema,
  collectionSchema,
  entrySchema,
  sourceSchema,
} from "../../src/content/content-schemas";
import { validateContentGraph } from "../../src/content/validate-content-graph";
import {
  createPublicReleaseProjection,
  PublicReleaseError,
} from "../../src/site/public-release";
import {
  makeCollectionData,
  makeClaimData,
  makeEntryData,
  makeEntryRecord,
  makeRecord,
  makeSourceData,
} from "../content/fixtures";

const eightyWordSummary = Array.from(
  { length: 80 },
  (_, index) => `word${index + 1}`,
).join(" ");

function makePublishedEntry(id: string, publishedAt: string) {
  return makeEntryRecord(
    makeEntryData({
      entryId: id,
      slug: id,
      title: `Published ${id}`,
      nameZh: null,
      pinyin: null,
      summary: `Summary for ${id}.`,
      publishedAt,
      status: "published",
    }),
  );
}

function makePublishedCollection(
  id: string,
  title = `Published ${id}`,
  entryIds: string[] = ["entry-one"],
) {
  return makeRecord(
    id,
    "collections",
    makeCollectionData({
      collectionId: id,
      slug: id,
      title,
      titleZh: null,
      pinyin: null,
      featuredEntryId: entryIds[0] ?? null,
      entryIds,
      heroAssetId: `asset-${id}-hero`,
      status: "published",
    }),
  );
}

describe("public release gate", () => {
  it("fails when no published Entry is available", () => {
    let caughtError: unknown;
    try {
      createPublicReleaseProjection({
        entries: [],
        collections: [makePublishedCollection("collection-one")],
      });
    } catch (error) {
      caughtError = error;
    }

    expect(caughtError).toBeInstanceOf(PublicReleaseError);
    expect(caughtError).toMatchObject({ code: "missing-published-entry" });
  });

  it("fails when no published Collection is available", () => {
    let caughtError: unknown;
    try {
      createPublicReleaseProjection({
        entries: [makePublishedEntry("entry-one", "2026-08-30")],
        collections: [],
      });
    } catch (error) {
      caughtError = error;
    }

    expect(caughtError).toBeInstanceOf(PublicReleaseError);
    expect(caughtError).toMatchObject({ code: "missing-published-collection" });
  });

  it("keeps only published records and preserves release ordering", () => {
    const draftEntry = makeEntryRecord(
      makeEntryData({
        entryId: "draft-entry",
        slug: "draft-entry",
        title: "Draft Entry",
        nameZh: null,
        pinyin: null,
      }),
    );
    const projection = createPublicReleaseProjection({
      entries: [
        makePublishedEntry("entry-b", "2026-08-29"),
        draftEntry,
        makePublishedEntry("entry-a", "2026-08-30"),
      ],
      collections: [
        makePublishedCollection("collection-b", "Zeta", ["entry-a", "entry-b"]),
        makePublishedCollection("collection-a", "Alpha", [
          "entry-a",
          "entry-b",
        ]),
      ],
    });

    expect(projection.entries.map((entry) => entry.id)).toEqual([
      "entry-a",
      "entry-b",
    ]);
    expect(projection.collections.map((collection) => collection.id)).toEqual([
      "collection-a",
      "collection-b",
    ]);
  });

  it("accepts a public projection produced by parsed schemas and the content graph gate", () => {
    const source = sourceSchema.parse(makeSourceData());
    const claim = claimSchema.parse(
      makeClaimData({
        entryId: "entry-one",
        sourceLinks: [
          {
            sourceId: source.sourceId,
            role: "primary",
            locator: "bounded locator",
            note: "Supports only this bounded fixture statement.",
          },
        ],
      }),
    );
    const entry = entrySchema.parse(
      makeEntryData({
        entryId: "entry-one",
        slug: "entry-one",
        title: "Entry One",
        nameZh: null,
        pinyin: null,
        traditionType: "folklore",
        opening: ["A bounded editorial opening."],
        summary: eightyWordSummary,
        sourceIds: [source.sourceId],
        claimIds: [claim.claimId],
        heroAssetId: "asset-entry-one-hero",
        publishedAt: "2026-08-30",
        lastFactCheckedAt: "2026-08-30",
        status: "published",
      }),
    );
    const collection = collectionSchema.parse(
      makeCollectionData({
        collectionId: "collection-one",
        slug: "collection-one",
        title: "Collection One",
        titleZh: null,
        pinyin: null,
        featuredEntryId: entry.entryId,
        entryIds: [entry.entryId],
        heroAssetId: "asset-collection-one-hero",
        status: "published",
      }),
    );
    const graph = validateContentGraph({
      entries: [
        makeEntryRecord(entry, { body: "Complete published fixture body." }),
      ],
      collections: [
        makeRecord(collection.collectionId, "collections", collection),
      ],
      sources: [makeRecord(source.sourceId, "sources", source)],
      claims: [makeRecord(claim.claimId, "claims", claim)],
      terminology: [],
    });

    expect(createPublicReleaseProjection(graph)).toMatchObject({
      entries: [{ id: "entry-one" }],
      collections: [{ id: "collection-one" }],
    });
  });
});
