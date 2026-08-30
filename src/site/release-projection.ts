import type { CollectionData, EntryData } from "../content/content-schemas";

interface ReleaseEntryRecordLike {
  id: string;
  data: EntryData;
}

interface ReleaseCollectionRecordLike {
  id: string;
  data: CollectionData;
}

export interface ReleaseProjection<
  TEntry extends ReleaseEntryRecordLike,
  TCollection extends ReleaseCollectionRecordLike,
> {
  entries: TEntry[];
  collections: TCollection[];
}

export class ReleaseProjectionError extends Error {
  readonly code: "invalid-published-date";

  constructor(code: ReleaseProjectionError["code"], message: string) {
    super(message);
    this.name = "ReleaseProjectionError";
    this.code = code;
  }
}

function requirePublishedDate(entry: ReleaseEntryRecordLike): string {
  const publishedAt = entry.data.publishedAt;
  if (publishedAt === null) {
    throw new ReleaseProjectionError(
      "invalid-published-date",
      `Published Entry ${entry.id} is missing publishedAt.`,
    );
  }
  return publishedAt;
}

export function createReleaseProjection<
  TEntry extends ReleaseEntryRecordLike,
  TCollection extends ReleaseCollectionRecordLike,
>(input: {
  entries: readonly TEntry[];
  collections: readonly TCollection[];
}): ReleaseProjection<TEntry, TCollection> {
  const entries = input.entries
    .filter((entry) => entry.data.status === "published")
    .map((entry) => {
      requirePublishedDate(entry);
      return entry;
    })
    .sort((left, right) => {
      const dateOrder = requirePublishedDate(right).localeCompare(
        requirePublishedDate(left),
        "en",
      );
      return dateOrder !== 0
        ? dateOrder
        : left.id.localeCompare(right.id, "en");
    });
  const collections = input.collections
    .filter((collection) => collection.data.status === "published")
    .sort((left, right) => {
      const titleOrder = left.data.title.localeCompare(right.data.title, "en");
      return titleOrder !== 0
        ? titleOrder
        : left.id.localeCompare(right.id, "en");
    });

  return { entries, collections };
}
