import { contentIdFromEntryPath, contentIdPattern } from "./content-id";
import type {
  ClaimData,
  CollectionData,
  ContentStatus,
  EntryData,
  SourceData,
  TerminologyData,
} from "./content-schemas";

export type ContentObjectType =
  | "entry"
  | "collection"
  | "source"
  | "claim"
  | "terminology";

export interface ContentGraphRecord<TData> {
  id: string;
  filePath?: string;
  data: TData;
}

export interface ContentGraphEntryRecord extends ContentGraphRecord<EntryData> {
  body?: string;
}

export interface ContentGraph {
  entries: readonly ContentGraphEntryRecord[];
  collections: readonly ContentGraphRecord<CollectionData>[];
  sources: readonly ContentGraphRecord<SourceData>[];
  claims: readonly ContentGraphRecord<ClaimData>[];
  terminology: readonly ContentGraphRecord<TerminologyData>[];
}

export interface ContentGraphIssue {
  code: string;
  objectType: ContentObjectType;
  objectId: string;
  path: string;
  message: string;
}

export class ContentGraphValidationError extends Error {
  readonly issues: readonly ContentGraphIssue[];

  constructor(issues: readonly ContentGraphIssue[]) {
    const sortedIssues = [...issues].sort(compareIssues);
    const detail = sortedIssues
      .map(
        (issue) =>
          `- [${issue.code}] ${issue.objectType}:${issue.objectId} ${issue.path}: ${issue.message}`,
      )
      .join("\n");

    super(
      `Content graph validation failed with ${issues.length} issue(s):\n${detail}`,
    );
    this.name = "ContentGraphValidationError";
    this.issues = Object.freeze(sortedIssues);
  }
}

type AddIssue = (issue: ContentGraphIssue) => void;

// Archived records retain the same evidence obligations as publication-ready work.
const statusesRequiringReadyEvidence = new Set<ContentStatus>([
  "ready",
  "published",
  "archived",
]);

const declaredIdPaths = {
  entry: "data.entryId",
  collection: "data.collectionId",
  source: "data.sourceId",
  claim: "data.claimId",
  terminology: "data.termId",
} as const satisfies Record<ContentObjectType, string>;

type SourceRole = ClaimData["sourceLinks"][number]["role"];
type SourceType = SourceData["sourceType"];

const expectedSourceRoleByType = {
  "primary-text": "primary",
  translation: "translation",
  scholarship: "scholarship",
  "museum-or-library": "object-record",
  "official-site": "reference",
  "fieldwork-or-community-archive": "fieldwork",
  "reference-website": "reference",
  "modern-adaptation": "adaptation",
} as const satisfies Record<SourceType, SourceRole>;

const historicalEvidenceRoles = new Set<SourceRole>([
  "primary",
  "scholarship",
  "translation",
  "object-record",
  "fieldwork",
]);

const modernReceptionEvidenceRoles = new Set<SourceRole>([
  "scholarship",
  "object-record",
  "fieldwork",
  "adaptation",
  "reference",
]);

function compareIssues(
  left: ContentGraphIssue,
  right: ContentGraphIssue,
): number {
  const leftKey = [
    left.objectType,
    left.objectId,
    left.path,
    left.code,
    left.message,
  ].join("\u0000");
  const rightKey = [
    right.objectType,
    right.objectId,
    right.path,
    right.code,
    right.message,
  ].join("\u0000");

  return leftKey < rightKey ? -1 : leftKey > rightKey ? 1 : 0;
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function normalizedFilePath(filePath: string | undefined): string {
  return filePath?.replaceAll("\\", "/") ?? "";
}

function sortedRecordCopy<TRecord extends ContentGraphRecord<unknown>>(
  records: readonly TRecord[],
  getDeclaredId: (record: TRecord) => string,
): TRecord[] {
  return [...records].sort(
    (left, right) =>
      compareStrings(left.id, right.id) ||
      compareStrings(
        normalizedFilePath(left.filePath),
        normalizedFilePath(right.filePath),
      ) ||
      compareStrings(getDeclaredId(left), getDeclaredId(right)),
  );
}

function filenameFromPath(filePath: string): string {
  return filePath.replaceAll("\\", "/").split("/").at(-1) ?? "";
}

function hasVisibleEditorialBody(body: string | undefined): boolean {
  // Leading editorial comments are scaffolding, not reader-visible prose.
  let remaining = body?.trim() ?? "";

  while (remaining.startsWith("<!--")) {
    const commentEnd = remaining.indexOf("-->");
    if (commentEnd === -1) {
      return false;
    }

    remaining = remaining.slice(commentEnd + 3).trimStart();
  }

  return remaining.length > 0;
}

function indexRecords<TData>(options: {
  records: readonly ContentGraphRecord<TData>[];
  objectType: ContentObjectType;
  extension: ".md" | ".yml";
  getDeclaredId: (data: TData) => string;
  globalIds: Map<string, { objectType: ContentObjectType; objectId: string }>;
  addIssue: AddIssue;
}): Map<string, ContentGraphRecord<TData>> {
  const { records, objectType, extension, getDeclaredId, globalIds, addIssue } =
    options;
  const recordsById = new Map<string, ContentGraphRecord<TData>>();

  for (const record of records) {
    const objectId = record.id || "<missing-id>";
    const declaredId = getDeclaredId(record.data);

    if (!contentIdPattern.test(record.id)) {
      addIssue({
        code: "invalid-loader-id",
        objectType,
        objectId,
        path: "id",
        message: `Loader ID is not lowercase kebab-case: ${record.id}`,
      });
    }

    if (recordsById.has(record.id)) {
      addIssue({
        code: "duplicate-loader-id",
        objectType,
        objectId,
        path: "id",
        message: `Loader ID ${record.id} occurs more than once in this collection.`,
      });
    } else {
      recordsById.set(record.id, record);
    }

    if (record.id !== declaredId) {
      addIssue({
        code: "loader-record-id-mismatch",
        objectType,
        objectId,
        path: declaredIdPaths[objectType],
        message: `Loader ID ${record.id} does not match declared ID ${declaredId}.`,
      });
    }

    if (!record.filePath) {
      addIssue({
        code: "missing-file-path",
        objectType,
        objectId,
        path: "filePath",
        message: "Glob-loaded records must retain their source file path.",
      });
    } else {
      try {
        const fileId = contentIdFromEntryPath(
          filenameFromPath(record.filePath),
          extension,
        );

        if (fileId !== record.id || fileId !== declaredId) {
          addIssue({
            code: "file-record-id-mismatch",
            objectType,
            objectId,
            path: "filePath",
            message: `Filename ID ${fileId}, loader ID ${record.id}, and declared ID ${declaredId} must match.`,
          });
        }
      } catch (error) {
        addIssue({
          code: "invalid-content-filename",
          objectType,
          objectId,
          path: "filePath",
          message:
            error instanceof Error
              ? error.message
              : "Invalid content filename.",
        });
      }
    }

    const existingGlobalId = globalIds.get(declaredId);
    if (existingGlobalId) {
      addIssue({
        code: "duplicate-global-id",
        objectType,
        objectId,
        path: declaredIdPaths[objectType],
        message: `Declared ID ${declaredId} is already used by ${existingGlobalId.objectType}:${existingGlobalId.objectId}.`,
      });
    } else {
      globalIds.set(declaredId, { objectType, objectId });
    }
  }

  return recordsById;
}

function findDuplicates(values: readonly string[]): Array<{
  value: string;
  index: number;
}> {
  const seen = new Set<string>();
  const duplicates: Array<{ value: string; index: number }> = [];

  values.forEach((value, index) => {
    if (seen.has(value)) {
      duplicates.push({ value, index });
    }
    seen.add(value);
  });

  return duplicates;
}

export function isCollectionEntryStatusAllowed(
  collectionStatus: ContentStatus,
  entryStatus: ContentStatus,
): boolean {
  // Ready, published and archived Collections impose stricter Entry status limits.
  if (collectionStatus === "archived") {
    return entryStatus === "published" || entryStatus === "archived";
  }

  if (entryStatus === "archived") {
    return false;
  }

  if (collectionStatus === "published") {
    return entryStatus === "published";
  }

  if (collectionStatus === "ready") {
    return entryStatus === "ready" || entryStatus === "published";
  }

  return true;
}

export function validateContentGraph(graph: ContentGraph): ContentGraph {
  const issues: ContentGraphIssue[] = [];
  const addIssue: AddIssue = (issue) => issues.push(issue);
  const globalIds = new Map<
    string,
    { objectType: ContentObjectType; objectId: string }
  >();
  // Stable ordering keeps validation output independent from loader order.
  const orderedGraph = {
    entries: sortedRecordCopy(graph.entries, (entry) => entry.data.entryId),
    collections: sortedRecordCopy(
      graph.collections,
      (collection) => collection.data.collectionId,
    ),
    sources: sortedRecordCopy(graph.sources, (source) => source.data.sourceId),
    claims: sortedRecordCopy(graph.claims, (claim) => claim.data.claimId),
    terminology: sortedRecordCopy(
      graph.terminology,
      (term) => term.data.termId,
    ),
  } satisfies ContentGraph;

  const entriesById = indexRecords({
    records: orderedGraph.entries,
    objectType: "entry",
    extension: ".md",
    getDeclaredId: (entry) => entry.entryId,
    globalIds,
    addIssue,
  }) as Map<string, ContentGraphEntryRecord>;
  indexRecords({
    records: orderedGraph.collections,
    objectType: "collection",
    extension: ".yml",
    getDeclaredId: (collection) => collection.collectionId,
    globalIds,
    addIssue,
  });
  const sourcesById = indexRecords({
    records: orderedGraph.sources,
    objectType: "source",
    extension: ".yml",
    getDeclaredId: (source) => source.sourceId,
    globalIds,
    addIssue,
  });
  const claimsById = indexRecords({
    records: orderedGraph.claims,
    objectType: "claim",
    extension: ".yml",
    getDeclaredId: (claim) => claim.claimId,
    globalIds,
    addIssue,
  });
  const terminologyById = indexRecords({
    records: orderedGraph.terminology,
    objectType: "terminology",
    extension: ".yml",
    getDeclaredId: (term) => term.termId,
    globalIds,
    addIssue,
  });

  const slugs = new Map<
    string,
    { objectType: "entry" | "collection"; id: string }
  >();
  for (const record of [...orderedGraph.entries, ...orderedGraph.collections]) {
    const objectType = "entryId" in record.data ? "entry" : "collection";
    const existingSlug = slugs.get(record.data.slug);
    if (existingSlug) {
      addIssue({
        code: "duplicate-global-slug",
        objectType,
        objectId: record.id,
        path: "data.slug",
        message: `Slug ${record.data.slug} is already used by ${existingSlug.objectType}:${existingSlug.id}.`,
      });
    } else {
      slugs.set(record.data.slug, { objectType, id: record.id });
    }
  }

  for (const entry of orderedGraph.entries) {
    const objectId = entry.id;

    entry.data.sourceIds.forEach((sourceId, index) => {
      if (!sourcesById.has(sourceId)) {
        addIssue({
          code: "dangling-source",
          objectType: "entry",
          objectId,
          path: `data.sourceIds[${index}]`,
          message: `Source ${sourceId} does not exist.`,
        });
      }
    });

    entry.data.claimIds.forEach((claimId, index) => {
      const claim = claimsById.get(claimId);
      if (!claim) {
        addIssue({
          code: "dangling-claim",
          objectType: "entry",
          objectId,
          path: `data.claimIds[${index}]`,
          message: `Claim ${claimId} does not exist.`,
        });
        return;
      }

      if (claim.data.entryId !== entry.id) {
        addIssue({
          code: "claim-owner-mismatch",
          objectType: "entry",
          objectId,
          path: `data.claimIds[${index}]`,
          message: `Claim ${claimId} belongs to Entry ${claim.data.entryId}.`,
        });
      }

      if (
        statusesRequiringReadyEvidence.has(entry.data.status) &&
        claim.data.certainty === "provisional"
      ) {
        addIssue({
          code: "provisional-ready-claim",
          objectType: "entry",
          objectId,
          path: `data.claimIds[${index}]`,
          message: `Ready content cannot publish provisional Claim ${claimId}.`,
        });
      }

      if (statusesRequiringReadyEvidence.has(entry.data.status)) {
        claim.data.sourceLinks.forEach((link, sourceIndex) => {
          if (!entry.data.sourceIds.includes(link.sourceId)) {
            addIssue({
              code: "unlisted-claim-source",
              objectType: "entry",
              objectId,
              path: `data.claimIds[${index}].sourceLinks[${sourceIndex}].sourceId`,
              message: `Claim Source ${link.sourceId} must appear in the ready Entry sourceIds bibliography.`,
            });
          }
        });
      }
    });

    entry.data.terminologyRecordIds.forEach((termId, index) => {
      const term = terminologyById.get(termId);
      if (!term) {
        addIssue({
          code: "dangling-terminology",
          objectType: "entry",
          objectId,
          path: `data.terminologyRecordIds[${index}]`,
          message: `Terminology record ${termId} does not exist.`,
        });
        return;
      }

      if (term.data.entryId !== entry.id) {
        addIssue({
          code: "terminology-owner-mismatch",
          objectType: "entry",
          objectId,
          path: `data.terminologyRecordIds[${index}]`,
          message: `Terminology record ${termId} belongs to Entry ${term.data.entryId}.`,
        });
      }

      if (
        statusesRequiringReadyEvidence.has(entry.data.status) &&
        term.data.reviewStatus !== "bilingual-approved"
      ) {
        addIssue({
          code: "unapproved-ready-terminology",
          objectType: "entry",
          objectId,
          path: `data.terminologyRecordIds[${index}]`,
          message: `Ready content requires bilingual approval for ${termId}.`,
        });
      }

      if (statusesRequiringReadyEvidence.has(entry.data.status)) {
        term.data.sourceIds.forEach((sourceId, sourceIndex) => {
          if (!entry.data.sourceIds.includes(sourceId)) {
            addIssue({
              code: "unlisted-terminology-source",
              objectType: "entry",
              objectId,
              path: `data.terminologyRecordIds[${index}].sourceIds[${sourceIndex}]`,
              message: `Terminology Source ${sourceId} must appear in the ready Entry sourceIds bibliography.`,
            });
          }
        });
      }
    });

    entry.data.relatedEntryIds.forEach((relatedId, index) => {
      const relatedEntry = entriesById.get(relatedId);
      if (!relatedEntry) {
        addIssue({
          code: "dangling-related-entry",
          objectType: "entry",
          objectId,
          path: `data.relatedEntryIds[${index}]`,
          message: `Related Entry ${relatedId} does not exist.`,
        });
      } else if (
        (entry.data.status === "published" &&
          relatedEntry.data.status !== "published") ||
        (entry.data.status === "archived" &&
          relatedEntry.data.status !== "published" &&
          relatedEntry.data.status !== "archived")
      ) {
        addIssue({
          code: "published-related-entry-status",
          objectType: "entry",
          objectId,
          path: `data.relatedEntryIds[${index}]`,
          message: `${entry.data.status} Entry cannot reference ${relatedEntry.data.status} Entry ${relatedId} under published-lineage rules.`,
        });
      }
    });

    const earliestSourceId = entry.data.earliestKnownSourceId;
    const earliestClaimId = entry.data.earliestKnownClaimId;

    if (earliestSourceId !== null || earliestClaimId !== null) {
      if (earliestSourceId === null || earliestClaimId === null) {
        addIssue({
          code: "incomplete-earliest-evidence-pair",
          objectType: "entry",
          objectId,
          path:
            earliestSourceId === null
              ? "data.earliestKnownSourceId"
              : "data.earliestKnownClaimId",
          message:
            "Earliest-known Source and Claim IDs must be provided together.",
        });
      } else {
        const earliestSource = sourcesById.get(earliestSourceId);
        const earliestClaim = claimsById.get(earliestClaimId);
        const sourceIsListed = entry.data.sourceIds.includes(earliestSourceId);
        const claimIsListed = entry.data.claimIds.includes(earliestClaimId);

        if (!earliestSource) {
          addIssue({
            code: "dangling-earliest-source",
            objectType: "entry",
            objectId,
            path: "data.earliestKnownSourceId",
            message: `Earliest-known Source ${earliestSourceId} does not exist.`,
          });
        }

        if (!sourceIsListed) {
          addIssue({
            code: "unlisted-earliest-source",
            objectType: "entry",
            objectId,
            path: "data.earliestKnownSourceId",
            message: `Earliest-known Source ${earliestSourceId} must also appear in sourceIds.`,
          });
        }

        if (!earliestClaim) {
          addIssue({
            code: "dangling-earliest-claim",
            objectType: "entry",
            objectId,
            path: "data.earliestKnownClaimId",
            message: `Earliest-known Claim ${earliestClaimId} does not exist.`,
          });
        }

        if (!claimIsListed) {
          addIssue({
            code: "unlisted-earliest-claim",
            objectType: "entry",
            objectId,
            path: "data.earliestKnownClaimId",
            message: `Earliest-known Claim ${earliestClaimId} must also appear in claimIds.`,
          });
        }

        if (
          earliestClaim &&
          earliestClaim.data.entryId !== entry.data.entryId
        ) {
          addIssue({
            code: "earliest-claim-owner-mismatch",
            objectType: "entry",
            objectId,
            path: "data.earliestKnownClaimId",
            message: `Earliest-known Claim ${earliestClaimId} belongs to Entry ${earliestClaim.data.entryId}.`,
          });
        }

        const claimIsEligible =
          earliestClaim !== undefined &&
          earliestClaim.data.entryId === entry.data.entryId &&
          earliestClaim.data.claimType === "historical" &&
          earliestClaim.data.evidenceContext === "historical-tradition" &&
          earliestClaim.data.certainty === "verified";

        if (earliestClaim && !claimIsEligible) {
          addIssue({
            code: "invalid-earliest-claim",
            objectType: "entry",
            objectId,
            path: "data.earliestKnownClaimId",
            message: `Earliest-known Claim ${earliestClaimId} must be an owned, verified historical Claim in the historical-tradition evidence context.`,
          });
        }

        if (
          earliestSource &&
          sourceIsListed &&
          earliestClaim &&
          claimIsListed &&
          claimIsEligible
        ) {
          const hasPrimaryLocator = earliestClaim.data.sourceLinks.some(
            (link) =>
              link.sourceId === earliestSourceId &&
              ((link.role === "primary" &&
                earliestSource.data.sourceType === "primary-text") ||
                (link.role === "object-record" &&
                  earliestSource.data.sourceType === "museum-or-library") ||
                (link.role === "fieldwork" &&
                  earliestSource.data.sourceType ===
                    "fieldwork-or-community-archive")),
          );
          const hasIndependentScholarship = earliestClaim.data.sourceLinks.some(
            (link) =>
              link.sourceId !== earliestSourceId &&
              link.role === "scholarship" &&
              sourcesById.get(link.sourceId)?.data.sourceType ===
                "scholarship" &&
              entry.data.sourceIds.includes(link.sourceId),
          );

          if (!hasPrimaryLocator || !hasIndependentScholarship) {
            addIssue({
              code: "unsupported-earliest-source",
              objectType: "entry",
              objectId,
              path: "data.earliestKnownSourceId",
              message:
                "The selected earliest-known Claim requires a matching primary-text/primary, museum-or-library/object-record, or fieldwork-or-community-archive/fieldwork locator and a separate listed scholarship Source.",
            });
          }
        }
      }
    }

    if (entry.data.status !== "draft" && !hasVisibleEditorialBody(entry.body)) {
      addIssue({
        code: "missing-editorial-body",
        objectType: "entry",
        objectId,
        path: "body",
        message:
          "Editorial review and later active states require Markdown body content.",
      });
    }
  }

  for (const collection of orderedGraph.collections) {
    const objectId = collection.id;

    for (const duplicate of findDuplicates(collection.data.entryIds)) {
      addIssue({
        code: "duplicate-collection-member",
        objectType: "collection",
        objectId,
        path: `data.entryIds[${duplicate.index}]`,
        message: `Entry ${duplicate.value} appears more than once.`,
      });
    }

    collection.data.entryIds.forEach((entryId, index) => {
      const entry = entriesById.get(entryId);
      if (!entry) {
        addIssue({
          code: "dangling-collection-entry",
          objectType: "collection",
          objectId,
          path: `data.entryIds[${index}]`,
          message: `Entry ${entryId} does not exist.`,
        });
        return;
      }

      if (
        !isCollectionEntryStatusAllowed(
          collection.data.status,
          entry.data.status,
        )
      ) {
        addIssue({
          code: "collection-entry-status",
          objectType: "collection",
          objectId,
          path: `data.entryIds[${index}]`,
          message: `${collection.data.status} Collection cannot reference ${entry.data.status} Entry ${entryId}.`,
        });
      }
    });

    if (collection.data.featuredEntryId !== null) {
      if (!entriesById.has(collection.data.featuredEntryId)) {
        addIssue({
          code: "dangling-featured-entry",
          objectType: "collection",
          objectId,
          path: "data.featuredEntryId",
          message: `Featured Entry ${collection.data.featuredEntryId} does not exist.`,
        });
      }

      if (!collection.data.entryIds.includes(collection.data.featuredEntryId)) {
        addIssue({
          code: "featured-entry-not-member",
          objectType: "collection",
          objectId,
          path: "data.featuredEntryId",
          message: "Featured Entry must also appear in entryIds.",
        });
      }
    }
  }

  for (const claim of orderedGraph.claims) {
    const ownerEntry = entriesById.get(claim.data.entryId);
    if (!ownerEntry) {
      addIssue({
        code: "dangling-claim-owner",
        objectType: "claim",
        objectId: claim.id,
        path: "data.entryId",
        message: `Owning Entry ${claim.data.entryId} does not exist.`,
      });
    }

    let hasQualifiedEvidence = false;

    claim.data.sourceLinks.forEach((link, index) => {
      const source = sourcesById.get(link.sourceId);

      if (!source) {
        addIssue({
          code: "dangling-claim-source",
          objectType: "claim",
          objectId: claim.id,
          path: `data.sourceLinks[${index}].sourceId`,
          message: `Source ${link.sourceId} does not exist.`,
        });
        return;
      }

      const expectedRole = expectedSourceRoleByType[source.data.sourceType];
      if (link.role !== expectedRole) {
        addIssue({
          code: "source-role-mismatch",
          objectType: "claim",
          objectId: claim.id,
          path: `data.sourceLinks[${index}].role`,
          message: `Source ${link.sourceId} of type ${source.data.sourceType} must use the ${expectedRole} evidence role, not ${link.role}.`,
        });
        return;
      }

      const qualifiedRoles =
        claim.data.evidenceContext === "historical-tradition"
          ? historicalEvidenceRoles
          : modernReceptionEvidenceRoles;
      hasQualifiedEvidence ||= qualifiedRoles.has(link.role);
    });

    if (claim.data.certainty !== "provisional" && !hasQualifiedEvidence) {
      const isHistorical =
        claim.data.evidenceContext === "historical-tradition";
      addIssue({
        code: isHistorical
          ? "historical-evidence-insufficient"
          : "modern-reception-evidence-insufficient",
        objectType: "claim",
        objectId: claim.id,
        path: "data.sourceLinks",
        message: isHistorical
          ? "Verified or disputed historical-tradition Claims need primary, scholarship, translation, object-record, or fieldwork evidence; adaptation and reference links are supplementary only."
          : "Verified or disputed modern-reception Claims need scholarship, object-record, fieldwork, adaptation, or reference evidence.",
      });
    }
  }

  for (const term of orderedGraph.terminology) {
    const ownerEntry = entriesById.get(term.data.entryId);
    if (!ownerEntry) {
      addIssue({
        code: "dangling-terminology-owner",
        objectType: "terminology",
        objectId: term.id,
        path: "data.entryId",
        message: `Owning Entry ${term.data.entryId} does not exist.`,
      });
    }

    term.data.sourceIds.forEach((sourceId, index) => {
      if (!sourcesById.has(sourceId)) {
        addIssue({
          code: "dangling-terminology-source",
          objectType: "terminology",
          objectId: term.id,
          path: `data.sourceIds[${index}]`,
          message: `Source ${sourceId} does not exist.`,
        });
      }
    });
  }

  if (issues.length > 0) {
    throw new ContentGraphValidationError(issues);
  }

  return orderedGraph;
}
