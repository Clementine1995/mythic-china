import { describe, expect, it } from "vitest";

import {
  createReviewProjection,
  getReviewCollectionEntries,
  getReviewFeaturedEntry,
  getReviewHomeSlice,
  getReviewIndexPreview,
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
  it("includes every non-archived state in direct review routes", () => {
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

    const publishedCollection = makeRecord(
      "published-collection",
      "collections",
      makeCollectionData({
        collectionId: "published-collection",
        slug: "published-collection",
        title: "Published Collection",
        titleZh: null,
        pinyin: null,
        featuredEntryId: null,
        entryIds: [],
        status: "published",
      }),
    );
    const projection = createReviewProjection({
      entries,
      collections: [publishedCollection],
    });

    expect(projection.entries.map((entry) => entry.data.status)).toEqual(
      statuses.slice(0, -1),
    );
    expect(projection.publishedEntries.map((entry) => entry.id)).toEqual([
      "entry-5",
    ]);
    expect(
      projection.publishedCollections.map((collection) => collection.id),
    ).toEqual(["published-collection"]);
  });

  it("preserves the review error contract for an invalid published date", () => {
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
    let caughtError: unknown;

    try {
      createReviewProjection({ entries: [entry], collections: [] });
    } catch (error) {
      caughtError = error;
    }

    expect(caughtError).toBeInstanceOf(ReviewProjectionError);
    expect(caughtError).toMatchObject({ code: "invalid-published-date" });
  });

  it("requires the fixed Home slice and preserves Collection.entryIds order", () => {
    const graph = makeDraftGraph();
    const projection = createReviewProjection(graph);
    const slice = getReviewHomeSlice(projection);
    const preview = getReviewIndexPreview(projection);

    expect(slice.collection.id).toBe("chinese-underworld");
    expect(slice.entry.id).toBe("zhong-kui");
    expect(preview.collection.id).toBe("chinese-underworld");
    expect(preview.entries.map((entry) => entry.id)).toEqual([
      "chinese-underworld-guide",
      "zhong-kui",
    ]);
  });

  it("keeps unrelated review records out of the fixed index preview", () => {
    const graph = makeDraftGraph();
    const unrelatedEntry = makeEntryRecord(
      makeEntryData({
        entryId: "unrelated-draft",
        slug: "unrelated-draft",
        title: "Unrelated draft",
        nameZh: null,
        pinyin: null,
      }),
    );
    const projection = createReviewProjection({
      entries: [...graph.entries, unrelatedEntry],
      collections: graph.collections,
    });

    expect(
      getReviewIndexPreview(projection).entries.map((entry) => entry.id),
    ).toEqual(["chinese-underworld-guide", "zhong-kui"]);
  });

  it("rejects a published record from the not-published index preview", () => {
    const graph = makeDraftGraph();
    const projections = [
      createReviewProjection({
        entries: graph.entries,
        collections: graph.collections.map((collection) => ({
          ...collection,
          data: { ...collection.data, status: "published" as const },
        })),
      }),
      createReviewProjection({
        entries: graph.entries.map((entry) =>
          entry.id === "zhong-kui"
            ? {
                ...entry,
                data: {
                  ...entry.data,
                  status: "published" as const,
                  publishedAt: "2026-09-01",
                },
              }
            : entry,
        ),
        collections: graph.collections,
      }),
    ];

    for (const projection of projections) {
      let caughtError: unknown;
      try {
        getReviewIndexPreview(projection);
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError).toBeInstanceOf(ReviewProjectionError);
      expect(caughtError).toMatchObject({
        code: "ineligible-index-preview",
      });
    }
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
