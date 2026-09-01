import type {
  CollectionData,
  ContentStatus,
  EntryData,
} from "../content/content-schemas";
import {
  createReleaseProjection,
  ReleaseProjectionError,
} from "./release-projection";

// Review-only vertical slice; a future public Home must choose independently.
export const reviewHomeCollectionId = "chinese-underworld";
export const reviewHomeEntryId = "zhong-kui";

export interface EntryRecordLike {
  id: string;
  data: EntryData;
  body?: string;
}

export interface CollectionRecordLike {
  id: string;
  data: CollectionData;
}

export interface ReviewProjection<
  TEntry extends EntryRecordLike,
  TCollection extends CollectionRecordLike,
> {
  entries: TEntry[];
  collections: TCollection[];
  publishedEntries: TEntry[];
  publishedCollections: TCollection[];
}

export interface ReviewIndexPreview<
  TEntry extends EntryRecordLike,
  TCollection extends CollectionRecordLike,
> {
  collection: TCollection;
  entries: TEntry[];
}

export class ReviewProjectionError extends Error {
  readonly code:
    | "missing-home-collection"
    | "missing-home-entry"
    | "invalid-home-membership"
    | "ineligible-index-preview"
    | "missing-collection-entry"
    | "missing-featured-entry"
    | "invalid-published-date";

  constructor(code: ReviewProjectionError["code"], message: string) {
    super(message);
    this.name = "ReviewProjectionError";
    this.code = code;
  }
}

function isReviewVisible(status: ContentStatus): boolean {
  return status !== "archived";
}

export function createReviewProjection<
  TEntry extends EntryRecordLike,
  TCollection extends CollectionRecordLike,
>(input: {
  entries: readonly TEntry[];
  collections: readonly TCollection[];
}): ReviewProjection<TEntry, TCollection> {
  // Direct review routes include non-archived work; global indexes stay published-only.
  const entries = input.entries.filter((entry) =>
    isReviewVisible(entry.data.status),
  );
  const collections = input.collections.filter((collection) =>
    isReviewVisible(collection.data.status),
  );
  try {
    const releaseProjection = createReleaseProjection(input);

    return {
      entries,
      collections,
      publishedEntries: releaseProjection.entries,
      publishedCollections: releaseProjection.collections,
    };
  } catch (error) {
    if (error instanceof ReleaseProjectionError) {
      throw new ReviewProjectionError(error.code, error.message);
    }
    throw error;
  }
}

export function getReviewHomeSlice<
  TEntry extends EntryRecordLike,
  TCollection extends CollectionRecordLike,
>(
  projection: ReviewProjection<TEntry, TCollection>,
): {
  collection: TCollection;
  entry: TEntry;
} {
  const collection = projection.collections.find(
    (candidate) => candidate.id === reviewHomeCollectionId,
  );
  if (collection === undefined) {
    throw new ReviewProjectionError(
      "missing-home-collection",
      `Review Home requires Collection ${reviewHomeCollectionId}.`,
    );
  }
  const entry = projection.entries.find(
    (candidate) => candidate.id === reviewHomeEntryId,
  );
  if (entry === undefined) {
    throw new ReviewProjectionError(
      "missing-home-entry",
      `Review Home requires Entry ${reviewHomeEntryId}.`,
    );
  }
  if (
    !collection.data.entryIds.includes(entry.id) ||
    collection.data.featuredEntryId !== entry.id
  ) {
    throw new ReviewProjectionError(
      "invalid-home-membership",
      `${entry.id} must be the featured member of ${collection.id}.`,
    );
  }
  return { collection, entry };
}

export function getReviewCollectionEntries<TEntry extends EntryRecordLike>(
  entryIds: readonly string[],
  entries: readonly TEntry[],
): TEntry[] {
  // Mapping preserves the curator-authored order and fails instead of hiding gaps.
  const entriesById = new Map(entries.map((entry) => [entry.id, entry]));
  return entryIds.map((entryId) => {
    const entry = entriesById.get(entryId);
    if (entry === undefined) {
      throw new ReviewProjectionError(
        "missing-collection-entry",
        `Review Collection links to unavailable Entry ${entryId}.`,
      );
    }
    return entry;
  });
}

export function getReviewIndexPreview<
  TEntry extends EntryRecordLike,
  TCollection extends CollectionRecordLike,
>(
  projection: ReviewProjection<TEntry, TCollection>,
): ReviewIndexPreview<TEntry, TCollection> {
  const { collection } = getReviewHomeSlice(projection);
  const entries = getReviewCollectionEntries(
    collection.data.entryIds,
    projection.entries,
  );

  if (
    collection.data.status === "published" ||
    entries.some((entry) => entry.data.status === "published")
  ) {
    throw new ReviewProjectionError(
      "ineligible-index-preview",
      "Review index previews must contain only not-published records.",
    );
  }

  return { collection, entries };
}

export function getReviewFeaturedEntry<TEntry extends EntryRecordLike>(
  featuredEntryId: string | null,
  entries: readonly TEntry[],
): TEntry | null {
  if (featuredEntryId === null) return null;
  const entry = entries.find((candidate) => candidate.id === featuredEntryId);
  if (entry === undefined) {
    throw new ReviewProjectionError(
      "missing-featured-entry",
      `Review Collection links to unavailable Featured Entry ${featuredEntryId}.`,
    );
  }
  return entry;
}
