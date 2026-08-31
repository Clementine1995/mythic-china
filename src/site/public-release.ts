import type { CollectionData, EntryData } from "../content/content-schemas";
import {
  createReleaseProjection,
  type ReleaseProjection,
} from "./release-projection";

interface PublicEntryRecordLike {
  id: string;
  data: EntryData;
}

interface PublicCollectionRecordLike {
  id: string;
  data: CollectionData;
}

export class PublicReleaseError extends Error {
  readonly code: "missing-published-entry" | "missing-published-collection";

  constructor(code: PublicReleaseError["code"], message: string) {
    super(message);
    this.name = "PublicReleaseError";
    this.code = code;
  }
}

export function createPublicReleaseProjection<
  TEntry extends PublicEntryRecordLike,
  TCollection extends PublicCollectionRecordLike,
>(input: {
  entries: readonly TEntry[];
  collections: readonly TCollection[];
}): ReleaseProjection<TEntry, TCollection> {
  const projection = createReleaseProjection(input);
  if (projection.entries.length === 0) {
    throw new PublicReleaseError(
      "missing-published-entry",
      "Public output requires at least one published Entry.",
    );
  }
  if (projection.collections.length === 0) {
    throw new PublicReleaseError(
      "missing-published-collection",
      "Public output requires at least one published Collection.",
    );
  }
  return projection;
}
