import { describe, expect, it } from "vitest";

import {
  createReviewProjection,
  getReviewCollectionEntries,
  getReviewFeaturedEntry,
  getReviewHomeSlice,
  ReviewProjectionError,
} from "../../src/site/review-projection";
import {
  makeCollectionData,
  makeDraftGraph,
  makeEntryData,
  makeEntryRecord,
  makeRecord,
} from "../content/fixtures";

describe("M4 review content projection", () => {
  it("includes every non-archived state while index lists stay published-only", () => {
    const statuses = [
      "draft",
      "editorial-review",
      "visual-review",
      "ready",
      "published",
      "archived",
    ] as const;
    const entries = statuses.map((status, index) => {
      const id = `entry-${index + 1}`;
      return makeEntryRecord(
        makeEntryData({
          entryId: id,
          slug: id,
          title: `Entry ${index + 1}`,
          nameZh: null,
          pinyin: null,
          status,
          publishedAt: status === "published" ? "2026-08-29" : null,
        }),
      );
    });

    const projection = createReviewProjection({ entries, collections: [] });

    expect(projection.entries.map((entry) => entry.data.status)).toEqual(
      statuses.slice(0, -1),
    );
    expect(
      projection.publishedEntries.map((entry) => entry.data.status),
    ).toEqual(["published"]);
  });

  it("keeps published index ordering deterministic", () => {
    const entries = [
      makeEntryRecord(
        makeEntryData({
          entryId: "entry-b",
          slug: "entry-b",
          title: "Entry B",
          nameZh: null,
          pinyin: null,
          status: "published",
          publishedAt: "2026-08-28",
        }),
      ),
      makeEntryRecord(
        makeEntryData({
          entryId: "entry-a",
          slug: "entry-a",
          title: "Entry A",
          nameZh: null,
          pinyin: null,
          status: "published",
          publishedAt: "2026-08-29",
        }),
      ),
      makeEntryRecord(
        makeEntryData({
          entryId: "entry-c",
          slug: "entry-c",
          title: "Entry C",
          nameZh: null,
          pinyin: null,
          status: "published",
          publishedAt: "2026-08-29",
        }),
      ),
    ];
    const collections = [
      makeRecord(
        "collection-b",
        "collections",
        makeCollectionData({
          collectionId: "collection-b",
          slug: "collection-b",
          title: "B Collection",
          titleZh: null,
          pinyin: null,
          featuredEntryId: null,
          entryIds: [],
          status: "published",
        }),
      ),
      makeRecord(
        "collection-a",
        "collections",
        makeCollectionData({
          collectionId: "collection-a",
          slug: "collection-a",
          title: "A Collection",
          titleZh: null,
          pinyin: null,
          featuredEntryId: null,
          entryIds: [],
          status: "published",
        }),
      ),
    ];

    const projection = createReviewProjection({ entries, collections });

    expect(projection.publishedEntries.map((entry) => entry.id)).toEqual([
      "entry-a",
      "entry-c",
      "entry-b",
    ]);
    expect(
      projection.publishedCollections.map((collection) => collection.id),
    ).toEqual(["collection-a", "collection-b"]);
  });

  it("rejects even one published Entry without a publication date", () => {
    const entry = makeEntryRecord(
      makeEntryData({
        entryId: "published-without-date",
        slug: "published-without-date",
        title: "Published without date",
        nameZh: null,
        pinyin: null,
        status: "published",
        publishedAt: null,
      }),
    );

    expect(() =>
      createReviewProjection({ entries: [entry], collections: [] }),
    ).toThrow(ReviewProjectionError);
  });

  it("requires the fixed Home slice and preserves Collection.entryIds order", () => {
    const graph = makeDraftGraph();
    const projection = createReviewProjection(graph);
    const slice = getReviewHomeSlice(projection);
    const entries = getReviewCollectionEntries(
      slice.collection.data.entryIds,
      projection.entries,
    );

    expect(slice.collection.id).toBe("chinese-underworld");
    expect(slice.entry.id).toBe("zhong-kui");
    expect(entries.map((entry) => entry.id)).toEqual([
      "chinese-underworld-guide",
      "zhong-kui",
    ]);
  });

  it("fails instead of hiding a missing Home or Collection target", () => {
    const graph = makeDraftGraph();
    const projection = createReviewProjection({
      entries: graph.entries.filter((entry) => entry.id !== "zhong-kui"),
      collections: graph.collections,
    });

    expect(() => getReviewHomeSlice(projection)).toThrow(ReviewProjectionError);
    expect(() =>
      getReviewCollectionEntries(
        ["chinese-underworld-guide", "missing-entry"],
        projection.entries,
      ),
    ).toThrow(ReviewProjectionError);
  });

  it("keeps an optional Featured Entry explicit and fails on a missing target", () => {
    const projection = createReviewProjection(makeDraftGraph());

    expect(getReviewFeaturedEntry(null, projection.entries)).toBeNull();
    expect(getReviewFeaturedEntry("zhong-kui", projection.entries)?.id).toBe(
      "zhong-kui",
    );
    expect(() =>
      getReviewFeaturedEntry("missing-entry", projection.entries),
    ).toThrow(ReviewProjectionError);
  });
});
