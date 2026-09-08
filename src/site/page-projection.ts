import type { BuildIntent } from "./build-intent";
import { createPublicReleaseProjection } from "./public-release";
import {
  createReviewProjection,
  type EntryRecordLike,
  type CollectionRecordLike,
  type ReviewProjection,
} from "./review-projection";

export function createPageProjection<
  TEntry extends EntryRecordLike,
  TCollection extends CollectionRecordLike,
>(
  input: { entries: readonly TEntry[]; collections: readonly TCollection[] },
  intent: BuildIntent,
): ReviewProjection<TEntry, TCollection> {
  if (intent === "review") return createReviewProjection(input);
  const projection = createPublicReleaseProjection(input);
  return {
    ...projection,
    publishedEntries: projection.entries,
    publishedCollections: projection.collections,
  };
}
