import { describe, expect, it } from "vitest";

import {
  createReleaseProjection,
  ReleaseProjectionError,
} from "../../src/site/release-projection";
import {
  makeCollectionData,
  makeEntryData,
  makeEntryRecord,
  makeRecord,
} from "../content/fixtures";

describe("release content projection", () => {
  it("returns an empty projection for an empty graph", () => {
    expect(createReleaseProjection({ entries: [], collections: [] })).toEqual({
      entries: [],
      collections: [],
    });
  });

  it("keeps only the single published record from all content states", () => {
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
    const collections = statuses.map((status, index) => {
      const id = `collection-${index + 1}`;
      return makeRecord(
        id,
        "collections",
        makeCollectionData({
          collectionId: id,
          slug: id,
          title: `Collection ${index + 1}`,
          titleZh: null,
          pinyin: null,
          featuredEntryId: null,
          entryIds: [],
          status,
        }),
      );
    });

    const projection = createReleaseProjection({ entries, collections });

    expect(projection.entries.map((entry) => entry.id)).toEqual(["entry-5"]);
    expect(projection.collections.map((collection) => collection.id)).toEqual([
      "collection-5",
    ]);
  });

  it("sorts multiple published Entries and Collections deterministically", () => {
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
          title: "Same Collection",
          titleZh: null,
          pinyin: null,
          featuredEntryId: null,
          entryIds: [],
          status: "published",
        }),
      ),
      makeRecord(
        "collection-c",
        "collections",
        makeCollectionData({
          collectionId: "collection-c",
          slug: "collection-c",
          title: "Later Collection",
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
          title: "Same Collection",
          titleZh: null,
          pinyin: null,
          featuredEntryId: null,
          entryIds: [],
          status: "published",
        }),
      ),
    ];

    const projection = createReleaseProjection({ entries, collections });

    expect(projection.entries.map((entry) => entry.id)).toEqual([
      "entry-a",
      "entry-c",
      "entry-b",
    ]);
    expect(projection.collections.map((collection) => collection.id)).toEqual([
      "collection-c",
      "collection-a",
      "collection-b",
    ]);
  });

  it("rejects a published Entry without a publication date", () => {
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
      createReleaseProjection({ entries: [entry], collections: [] }),
    ).toThrow(ReleaseProjectionError);
  });
});
