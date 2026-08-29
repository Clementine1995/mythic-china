import { basename, extname, posix, win32 } from "node:path";

import {
  contentIdFromEntryPath,
  contentIdPattern,
} from "../content/content-id";
import type { ContentStatus } from "../content/content-schemas";
import type {
  ContentGraph,
  ContentGraphRecord,
} from "../content/validate-content-graph";
import type {
  ImageMetadataRegistry,
  RepositoryImageMetadata,
} from "./load-image-metadata-registry";
import { maximumRepositoryImageBytes } from "./load-image-metadata-registry";
import type {
  AssetManifestData,
  RenditionUsage,
  VisualBriefData,
  VisualProductionRecordData,
} from "./visual-asset-schemas";
import type { VisualRecordInventoryIssue } from "./load-visual-record-inventory";

export interface VisualGraphRecord<TData> {
  id: string;
  filePath?: string;
  data: TData;
}

export interface VisualAssetGraph {
  content: ContentGraph;
  visualBriefs: readonly VisualGraphRecord<VisualBriefData>[];
  assets: readonly VisualGraphRecord<AssetManifestData>[];
  productionRecords: readonly VisualGraphRecord<VisualProductionRecordData>[];
  imageRegistry: ImageMetadataRegistry;
  recordInventoryIssues?: readonly VisualRecordInventoryIssue[];
}

export type VisualGraphObjectType =
  | "visual-brief"
  | "asset-manifest"
  | "production-record"
  | "asset-file"
  | "visual-inventory"
  | "entry"
  | "collection";

export interface VisualGraphIssue {
  code: string;
  objectType: VisualGraphObjectType;
  objectId: string;
  path: string;
  message: string;
}

export class VisualAssetGraphValidationError extends Error {
  readonly issues: readonly VisualGraphIssue[];

  constructor(issues: readonly VisualGraphIssue[]) {
    const sortedIssues = [...issues].sort(compareIssues);
    const detail = sortedIssues
      .map(
        (issue) =>
          `- [${issue.code}] ${issue.objectType}:${issue.objectId} ${issue.path}: ${issue.message}`,
      )
      .join("\n");

    super(
      `Visual asset graph validation failed with ${issues.length} issue(s):\n${detail}`,
    );
    this.name = "VisualAssetGraphValidationError";
    this.issues = Object.freeze(sortedIssues);
  }
}

type AddIssue = (issue: VisualGraphIssue) => void;
type ManifestRecord = VisualGraphRecord<AssetManifestData>;
type BriefRecord = VisualGraphRecord<VisualBriefData>;
type ProductionRecord = VisualGraphRecord<VisualProductionRecordData>;

const activeContentStatuses = new Set<ContentStatus>([
  "draft",
  "editorial-review",
  "visual-review",
  "ready",
  "published",
]);
const zhongKuiProductionRoles = new Set(["hero", "lead", "og", "social"]);
const forbiddenImageExtensions = new Set([
  ".bin",
  ".ckpt",
  ".gguf",
  ".onnx",
  ".pt",
  ".pth",
  ".safetensors",
]);

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function compareIssues(
  left: VisualGraphIssue,
  right: VisualGraphIssue,
): number {
  return compareStrings(
    [left.objectType, left.objectId, left.path, left.code, left.message].join(
      "\u0000",
    ),
    [
      right.objectType,
      right.objectId,
      right.path,
      right.code,
      right.message,
    ].join("\u0000"),
  );
}

function normalizedFilePath(filePath: string | undefined): string {
  return filePath?.replaceAll("\\", "/") ?? "";
}

function sortedVisualRecords<TData>(
  records: readonly VisualGraphRecord<TData>[],
  getDeclaredId: (data: TData) => string,
): VisualGraphRecord<TData>[] {
  return [...records].sort(
    (left, right) =>
      compareStrings(left.id, right.id) ||
      compareStrings(
        normalizedFilePath(left.filePath),
        normalizedFilePath(right.filePath),
      ) ||
      compareStrings(getDeclaredId(left.data), getDeclaredId(right.data)),
  );
}

function indexVersionRecords<TData>(options: {
  records: readonly VisualGraphRecord<TData>[];
  objectType: "visual-brief" | "asset-manifest" | "production-record";
  getDeclaredId: (data: TData) => string;
  declaredIdPath: string;
  addIssue: AddIssue;
}): Map<string, VisualGraphRecord<TData>> {
  const { records, objectType, getDeclaredId, declaredIdPath, addIssue } =
    options;
  const recordsById = new Map<string, VisualGraphRecord<TData>>();

  for (const record of records) {
    const declaredId = getDeclaredId(record.data);
    const objectId = record.id || "<missing-id>";

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
        message: `Loader ID ${record.id} occurs more than once.`,
      });
    } else {
      recordsById.set(record.id, record);
    }

    if (record.id !== declaredId) {
      addIssue({
        code: "loader-record-id-mismatch",
        objectType,
        objectId,
        path: declaredIdPath,
        message: `Loader ID ${record.id} does not match declared ID ${declaredId}.`,
      });
    }

    if (!record.filePath) {
      addIssue({
        code: "missing-file-path",
        objectType,
        objectId,
        path: "filePath",
        message:
          "Glob-loaded visual records must retain their source file path.",
      });
      continue;
    }

    try {
      const fileId = contentIdFromEntryPath(basename(record.filePath), ".yml");
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
        code: "invalid-visual-filename",
        objectType,
        objectId,
        path: "filePath",
        message:
          error instanceof Error ? error.message : "Invalid visual filename.",
      });
    }
  }

  return recordsById;
}

function indexContentRecords<TData>(
  records: readonly ContentGraphRecord<TData>[],
  getId: (data: TData) => string,
): Map<string, ContentGraphRecord<TData>> {
  return new Map(records.map((record) => [getId(record.data), record]));
}

function normalizeRealFormat(format: string): string {
  return format === "jpg" ? "jpeg" : format;
}

function sameStringSet(
  left: readonly string[],
  right: readonly string[],
): boolean {
  return [...left].sort().join("|") === [...right].sort().join("|");
}

function sameBuildPlan(
  left: AssetManifestData["repositoryRenditions"][number]["buildPlan"],
  right: VisualBriefData["targetSlots"][number]["canvas"][number]["buildPlan"],
): boolean {
  return (
    left.mode === right.mode &&
    left.allowUpscale === right.allowUpscale &&
    sameStringSet(left.formats, right.formats) &&
    left.candidateWidths.join("|") === right.candidateWidths.join("|")
  );
}

function sameMasterRendition(
  left: VisualProductionRecordData["renditions"][number]["master"],
  right: AssetManifestData["masterRenditions"][number],
): boolean {
  return (
    left.logicalUri === right.logicalUri &&
    left.usage === right.usage &&
    left.widthPx === right.widthPx &&
    left.heightPx === right.heightPx &&
    left.sha256 === right.sha256
  );
}

function isCanonicalRepositoryPath(path: string): boolean {
  if (
    path.includes("\\") ||
    posix.isAbsolute(path) ||
    win32.isAbsolute(path) ||
    path.includes(":")
  ) {
    return false;
  }

  return (
    path.startsWith("src/assets/images/") &&
    posix.normalize(path) === path &&
    !path.split("/").includes("..")
  );
}

function validateRepositoryFile(options: {
  manifest: ManifestRecord;
  rendition: AssetManifestData["repositoryRenditions"][number];
  renditionIndex: number;
  metadata: RepositoryImageMetadata | undefined;
  addIssue: AddIssue;
}): void {
  const { manifest, rendition, renditionIndex, metadata, addIssue } = options;
  const pathPrefix = `data.repositoryRenditions[${renditionIndex}]`;
  const objectId = manifest.id;

  if (!isCanonicalRepositoryPath(rendition.path)) {
    addIssue({
      code: "invalid-repository-image-path",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.path`,
      message: `${rendition.path} must be a canonical path under src/assets/images/.`,
    });
    return;
  }

  const expectedFilename = `${manifest.data.ownerId}-${manifest.data.role}-${manifest.data.slotId}-v${manifest.data.version}-${rendition.usage}-${rendition.widthPx}w.${rendition.format}`;
  if (posix.basename(rendition.path) !== expectedFilename) {
    addIssue({
      code: "repository-image-filename-mismatch",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.path`,
      message: `Repository source filename must be ${expectedFilename}.`,
    });
  }

  const declaredExtension = extname(rendition.path).slice(1).toLowerCase();
  if (declaredExtension !== rendition.format) {
    addIssue({
      code: "repository-image-extension-mismatch",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.format`,
      message: `Declared format ${rendition.format} does not match .${declaredExtension}.`,
    });
  }

  if (!metadata) {
    addIssue({
      code: "missing-repository-image",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.path`,
      message: `Repository image ${rendition.path} does not exist.`,
    });
    return;
  }

  if (metadata.sizeBytes > maximumRepositoryImageBytes) {
    addIssue({
      code: "repository-image-too-large",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.path`,
      message: `${rendition.path} is ${metadata.sizeBytes} bytes; maximum is ${maximumRepositoryImageBytes}.`,
    });
  }
  if (metadata.forbiddenSignature !== null) {
    addIssue({
      code: "forbidden-image-signature",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.path`,
      message: `${rendition.path} contains a forbidden ${metadata.forbiddenSignature}.`,
    });
  }
  if (metadata.metadataError !== null) {
    addIssue({
      code: "unreadable-repository-image",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.path`,
      message: metadata.metadataError,
    });
  }
  if (metadata.widthPx !== rendition.widthPx) {
    addIssue({
      code: "repository-image-width-mismatch",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.widthPx`,
      message: `Declared width ${rendition.widthPx} does not match ${metadata.widthPx}.`,
    });
  }
  if (metadata.heightPx !== rendition.heightPx) {
    addIssue({
      code: "repository-image-height-mismatch",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.heightPx`,
      message: `Declared height ${rendition.heightPx} does not match ${metadata.heightPx}.`,
    });
  }
  if (metadata.sha256 !== rendition.sha256) {
    addIssue({
      code: "repository-image-hash-mismatch",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.sha256`,
      message: `Declared SHA-256 does not match ${rendition.path}.`,
    });
  }
  if (
    metadata.format !== null &&
    normalizeRealFormat(metadata.format) !==
      normalizeRealFormat(rendition.format)
  ) {
    addIssue({
      code: "repository-image-format-mismatch",
      objectType: "asset-manifest",
      objectId,
      path: `${pathPrefix}.format`,
      message: `Declared format ${rendition.format} does not match detected ${metadata.format}.`,
    });
  }
}

function validateHeroReference(options: {
  ownerType: "entry" | "collection";
  ownerId: string;
  status: ContentStatus;
  heroAssetId: string | null;
  manifestsByAssetId: ReadonlyMap<string, readonly ManifestRecord[]>;
  addIssue: AddIssue;
}): void {
  const {
    ownerType,
    ownerId,
    status,
    heroAssetId,
    manifestsByAssetId,
    addIssue,
  } = options;
  if (heroAssetId === null) return;

  const objectType = ownerType;
  const records = manifestsByAssetId.get(heroAssetId) ?? [];
  if (records.length === 0) {
    addIssue({
      code: "dangling-hero-asset",
      objectType,
      objectId: ownerId,
      path: "data.heroAssetId",
      message: `Hero asset ${heroAssetId} does not exist.`,
    });
    return;
  }

  const identityMatches = records.every(
    (record) =>
      record.data.ownerType === ownerType &&
      record.data.ownerId === ownerId &&
      record.data.role === "hero" &&
      record.data.slotId === "primary",
  );
  if (!identityMatches) {
    addIssue({
      code: "hero-asset-owner-slot-mismatch",
      objectType,
      objectId: ownerId,
      path: "data.heroAssetId",
      message: `Hero asset ${heroAssetId} must belong to this ${ownerType} at hero/primary.`,
    });
  }

  if (status === "archived") {
    if (
      !records.some((record) => {
        const languageStatus = record.data.reviews.language.status;
        return (
          (record.data.status === "approved" ||
            record.data.status === "archived") &&
          record.data.briefId !== null &&
          record.data.accessibilityMode !== null &&
          record.data.masterRenditions.length > 0 &&
          record.data.repositoryRenditions.length > 0 &&
          record.data.publicationRights.status === "approved" &&
          record.data.production !== null &&
          record.data.credit !== null &&
          record.data.reviews.cultural.status === "approved" &&
          record.data.reviews.rights.status === "approved" &&
          record.data.reviews.visual.status === "approved" &&
          record.data.reviews.accessibility.status === "approved" &&
          (languageStatus === "approved" || languageStatus === "not-applicable")
        );
      })
    ) {
      addIssue({
        code: "missing-archived-hero-history",
        objectType,
        objectId: ownerId,
        path: "data.heroAssetId",
        message: `Archived content requires approved or archived history for ${heroAssetId}.`,
      });
    }
    return;
  }

  if (!activeContentStatuses.has(status)) return;
  const current = records.filter((record) => record.data.isCurrent);
  if (current.length !== 1) {
    addIssue({
      code:
        current.length === 0
          ? "missing-current-hero"
          : "duplicate-current-hero",
      objectType,
      objectId: ownerId,
      path: "data.heroAssetId",
      message: `Hero asset ${heroAssetId} resolves to ${current.length} current versions; expected exactly one.`,
    });
    return;
  }

  const currentStatus = current[0]?.data.status;
  if (currentStatus === "archived") {
    addIssue({
      code: "archived-current-hero",
      objectType,
      objectId: ownerId,
      path: "data.heroAssetId",
      message: `Current Hero ${heroAssetId} cannot be archived.`,
    });
  }
  if (
    status === "visual-review" &&
    currentStatus !== "in-review" &&
    currentStatus !== "approved"
  ) {
    addIssue({
      code: "visual-review-hero-status",
      objectType,
      objectId: ownerId,
      path: "data.heroAssetId",
      message: `Visual-review content requires an in-review or approved current Hero, not ${currentStatus}.`,
    });
  }
  if (
    (status === "ready" || status === "published") &&
    currentStatus !== "approved"
  ) {
    addIssue({
      code: "ready-hero-status",
      objectType,
      objectId: ownerId,
      path: "data.heroAssetId",
      message: `${status} content requires an approved current Hero.`,
    });
  }
}

export function validateVisualAssetGraph(
  graph: VisualAssetGraph,
): VisualAssetGraph {
  const issues: VisualGraphIssue[] = [];
  const addIssue: AddIssue = (issue) => issues.push(issue);
  if (graph.imageRegistry.rootError !== null) {
    addIssue({
      code: "invalid-repository-image-root",
      objectType: "asset-file",
      objectId: graph.imageRegistry.rootDirectory,
      path: "rootDirectory",
      message: graph.imageRegistry.rootError,
    });
  }
  for (const issue of graph.recordInventoryIssues ?? []) {
    addIssue({
      code: "invalid-visual-record-inventory",
      objectType: "visual-inventory",
      objectId: issue.path,
      path: "path",
      message: issue.message,
    });
  }
  const visualBriefs = sortedVisualRecords(
    graph.visualBriefs,
    (data) => data.briefId,
  ) as BriefRecord[];
  const assets = sortedVisualRecords(
    graph.assets,
    (data) => data.manifestId,
  ) as ManifestRecord[];
  const productionRecords = sortedVisualRecords(
    graph.productionRecords,
    (data) => data.productionRecordId,
  ) as ProductionRecord[];

  const briefsById = indexVersionRecords({
    records: visualBriefs,
    objectType: "visual-brief",
    getDeclaredId: (data) => data.briefId,
    declaredIdPath: "data.briefId",
    addIssue,
  });
  const manifestsById = indexVersionRecords({
    records: assets,
    objectType: "asset-manifest",
    getDeclaredId: (data) => data.manifestId,
    declaredIdPath: "data.manifestId",
    addIssue,
  });
  indexVersionRecords({
    records: productionRecords,
    objectType: "production-record",
    getDeclaredId: (data) => data.productionRecordId,
    declaredIdPath: "data.productionRecordId",
    addIssue,
  });

  const productionRecordsByPath = new Map<string, ProductionRecord>();
  for (const record of productionRecords) {
    const expectedPath = `visual/production-records/${record.id}.yml`;
    const actualPath = normalizedFilePath(record.filePath);
    if (actualPath !== expectedPath) {
      addIssue({
        code: "production-record-path-mismatch",
        objectType: "production-record",
        objectId: record.id,
        path: "filePath",
        message: `Production record ${record.id} must be stored at ${expectedPath}.`,
      });
    }
    if (actualPath) productionRecordsByPath.set(actualPath, record);
  }

  const entriesById = indexContentRecords(
    graph.content.entries,
    (data) => data.entryId,
  );
  const collectionsById = indexContentRecords(
    graph.content.collections,
    (data) => data.collectionId,
  );
  const sourcesById = indexContentRecords(
    graph.content.sources,
    (data) => data.sourceId,
  );
  const claimsById = indexContentRecords(
    graph.content.claims,
    (data) => data.claimId,
  );
  const stableContentIds = new Set([
    ...graph.content.entries.map((record) => record.data.entryId),
    ...graph.content.collections.map((record) => record.data.collectionId),
    ...graph.content.sources.map((record) => record.data.sourceId),
    ...graph.content.claims.map((record) => record.data.claimId),
    ...graph.content.terminology.map((record) => record.data.termId),
  ]);

  for (const record of productionRecords) {
    const brief = briefsById.get(record.data.briefId);
    if (!brief) {
      addIssue({
        code: "dangling-production-brief",
        objectType: "production-record",
        objectId: record.id,
        path: "data.briefId",
        message: `Production brief ${record.data.briefId} does not exist.`,
      });
    } else if (brief.data.status !== "approved") {
      addIssue({
        code: "unapproved-production-brief",
        objectType: "production-record",
        objectId: record.id,
        path: "data.briefId",
        message: "Production records require an approved brief.",
      });
    }
  }

  for (const brief of visualBriefs) {
    const { data } = brief;
    let ownerExists = false;
    if (data.ownerType === "entry") ownerExists = entriesById.has(data.ownerId);
    if (data.ownerType === "collection") {
      ownerExists = collectionsById.has(data.ownerId);
    }
    if (data.ownerType === "global")
      ownerExists = data.ownerId === "site-shell";
    if (!ownerExists) {
      addIssue({
        code: "dangling-brief-owner",
        objectType: "visual-brief",
        objectId: brief.id,
        path: "data.ownerId",
        message: `Brief owner ${data.ownerType}:${data.ownerId} does not exist or is not allowed.`,
      });
    }

    if (
      data.ownerType === "global" &&
      data.visualElements.verified.length > 0
    ) {
      addIssue({
        code: "factual-global-brief",
        objectType: "visual-brief",
        objectId: brief.id,
        path: "data.visualElements.verified",
        message: "M3 global briefs cannot contain factual verified elements.",
      });
    }

    for (const [
      elementIndex,
      element,
    ] of data.visualElements.verified.entries()) {
      for (const [claimIndex, claimId] of element.claimIds.entries()) {
        const path = `data.visualElements.verified[${elementIndex}].claimIds[${claimIndex}]`;
        const claim = claimsById.get(claimId);
        if (!claim) {
          addIssue({
            code: "dangling-visual-claim",
            objectType: "visual-brief",
            objectId: brief.id,
            path,
            message: `Verified visual Claim ${claimId} does not exist.`,
          });
          continue;
        }
        if (claim.data.certainty !== "verified") {
          addIssue({
            code: "unverified-visual-claim",
            objectType: "visual-brief",
            objectId: brief.id,
            path,
            message: `Visual Claim ${claimId} must have certainty verified.`,
          });
        }

        const claimOwner = entriesById.get(claim.data.entryId);
        const ownerIsAllowed =
          (data.ownerType === "entry" && claim.data.entryId === data.ownerId) ||
          (data.ownerType === "collection" &&
            collectionsById
              .get(data.ownerId)
              ?.data.entryIds.includes(claim.data.entryId));
        if (!ownerIsAllowed) {
          addIssue({
            code: "visual-claim-owner-mismatch",
            objectType: "visual-brief",
            objectId: brief.id,
            path,
            message: `Claim ${claimId} is outside brief owner ${data.ownerType}:${data.ownerId}.`,
          });
        }
        if (!claimOwner?.data.claimIds.includes(claimId)) {
          addIssue({
            code: "unlisted-visual-claim",
            objectType: "visual-brief",
            objectId: brief.id,
            path,
            message: `Claim ${claimId} must be listed by its owning Entry.`,
          });
        }

        claim.data.sourceLinks.forEach((link, sourceIndex) => {
          if (!sourcesById.has(link.sourceId)) {
            addIssue({
              code: "dangling-visual-claim-source",
              objectType: "visual-brief",
              objectId: brief.id,
              path: `${path}.sourceLinks[${sourceIndex}].sourceId`,
              message: `Visual Claim Source ${link.sourceId} does not exist.`,
            });
          }
          if (!claimOwner?.data.sourceIds.includes(link.sourceId)) {
            addIssue({
              code: "unlisted-visual-claim-source",
              objectType: "visual-brief",
              objectId: brief.id,
              path: `${path}.sourceLinks[${sourceIndex}].sourceId`,
              message: `Visual Claim Source ${link.sourceId} must be listed by Entry ${claim.data.entryId}.`,
            });
          }
        });
      }
    }
  }

  const briefFamilies = new Map<string, BriefRecord[]>();
  for (const brief of visualBriefs) {
    const familyKey = `${brief.data.ownerType}/${brief.data.ownerId}/${brief.data.purpose}`;
    const family = briefFamilies.get(familyKey) ?? [];
    family.push(brief);
    briefFamilies.set(familyKey, family);
  }
  for (const [familyKey, records] of briefFamilies) {
    const versions = new Map<number, BriefRecord[]>();
    for (const record of records) {
      const matching = versions.get(record.data.version) ?? [];
      matching.push(record);
      versions.set(record.data.version, matching);
    }
    for (const [version, matching] of versions) {
      if (matching.length > 1) {
        matching.slice(1).forEach((record) =>
          addIssue({
            code: "duplicate-brief-version",
            objectType: "visual-brief",
            objectId: record.id,
            path: "data.version",
            message: `Brief family ${familyKey} has ${matching.length} version ${version} records.`,
          }),
        );
      }
    }
    const maxVersion = Math.max(...versions.keys());
    for (let version = 1; version <= maxVersion; version += 1) {
      if (!versions.has(version)) {
        addIssue({
          code: "missing-brief-version-history",
          objectType: "visual-brief",
          objectId: familyKey,
          path: "data.version",
          message: `Brief family ${familyKey} is missing version ${version} before version ${maxVersion}.`,
        });
      }
    }
  }

  const manifestsByAssetId = new Map<string, ManifestRecord[]>();
  const manifestsBySlot = new Map<string, ManifestRecord[]>();
  const assetIdentity = new Map<string, string>();
  const referencedRepositoryPaths = new Map<string, ManifestRecord[]>();

  for (const manifest of assets) {
    const { data } = manifest;
    const slotKey = `${data.ownerType}/${data.ownerId}/${data.role}/${data.slotId}`;
    const descriptor = slotKey;
    const records = manifestsByAssetId.get(data.assetId) ?? [];
    records.push(manifest);
    manifestsByAssetId.set(data.assetId, records);
    const slotRecords = manifestsBySlot.get(slotKey) ?? [];
    slotRecords.push(manifest);
    manifestsBySlot.set(slotKey, slotRecords);

    if (stableContentIds.has(data.assetId)) {
      addIssue({
        code: "asset-content-id-conflict",
        objectType: "asset-manifest",
        objectId: manifest.id,
        path: "data.assetId",
        message: `Logical Asset ID ${data.assetId} conflicts with a content stable ID.`,
      });
    }
    const existingDescriptor = assetIdentity.get(data.assetId);
    if (existingDescriptor && existingDescriptor !== descriptor) {
      addIssue({
        code: "asset-identity-conflict",
        objectType: "asset-manifest",
        objectId: manifest.id,
        path: "data.assetId",
        message: `Asset ${data.assetId} is already bound to ${existingDescriptor}.`,
      });
    } else {
      assetIdentity.set(data.assetId, descriptor);
    }

    let ownerExists = false;
    if (data.ownerType === "entry") ownerExists = entriesById.has(data.ownerId);
    if (data.ownerType === "collection") {
      ownerExists = collectionsById.has(data.ownerId);
    }
    if (data.ownerType === "global")
      ownerExists = data.ownerId === "site-shell";
    if (!ownerExists) {
      addIssue({
        code: "dangling-asset-owner",
        objectType: "asset-manifest",
        objectId: manifest.id,
        path: "data.ownerId",
        message: `Asset owner ${data.ownerType}:${data.ownerId} does not exist or is not allowed.`,
      });
    }

    const brief = data.briefId ? briefsById.get(data.briefId) : undefined;
    if (data.briefId !== null && !brief) {
      addIssue({
        code: "dangling-asset-brief",
        objectType: "asset-manifest",
        objectId: manifest.id,
        path: "data.briefId",
        message: `Visual brief ${data.briefId} does not exist.`,
      });
    }
    if (
      (data.status === "in-review" || data.status === "approved") &&
      brief?.data.status !== "approved"
    ) {
      addIssue({
        code: "unapproved-asset-brief",
        objectType: "asset-manifest",
        objectId: manifest.id,
        path: "data.briefId",
        message: `${data.status} manifests require an approved brief.`,
      });
    }
    if (
      data.status === "archived" &&
      brief &&
      brief.data.status !== "approved" &&
      brief.data.status !== "archived"
    ) {
      addIssue({
        code: "invalid-archived-asset-brief",
        objectType: "asset-manifest",
        objectId: manifest.id,
        path: "data.briefId",
        message:
          "Archived manifests must retain approved-lineage brief history.",
      });
    }

    if (brief) {
      if (
        brief.data.ownerType !== data.ownerType ||
        brief.data.ownerId !== data.ownerId
      ) {
        addIssue({
          code: "asset-brief-owner-mismatch",
          objectType: "asset-manifest",
          objectId: manifest.id,
          path: "data.briefId",
          message: `Manifest and brief owner identities must match.`,
        });
      }

      const targets = brief.data.targetSlots.filter(
        (target) => target.role === data.role && target.slotId === data.slotId,
      );
      if (targets.length !== 1) {
        addIssue({
          code:
            targets.length === 0
              ? "missing-brief-target"
              : "duplicate-brief-target",
          objectType: "asset-manifest",
          objectId: manifest.id,
          path: "data.briefId",
          message: `Brief resolves ${targets.length} targets for ${data.role}/${data.slotId}; expected one.`,
        });
      }
      const target = targets[0];
      if (target) {
        const selectedUsages = new Set<RenditionUsage>([
          ...data.masterRenditions.map((rendition) => rendition.usage),
          ...data.repositoryRenditions.map((rendition) => rendition.usage),
        ]);
        const allowedUsages = new Set<RenditionUsage>([
          ...target.requiredUsages,
          ...target.optionalUsages,
        ]);
        selectedUsages.forEach((usage) => {
          if (!allowedUsages.has(usage)) {
            addIssue({
              code: "asset-brief-usage-mismatch",
              objectType: "asset-manifest",
              objectId: manifest.id,
              path: "data.repositoryRenditions",
              message: `Usage ${usage} is outside brief target ${data.role}/${data.slotId}.`,
            });
          }
        });

        for (const [field, renditions] of [
          ["masterRenditions", data.masterRenditions],
          ["repositoryRenditions", data.repositoryRenditions],
        ] as const) {
          for (const [index, rendition] of renditions.entries()) {
            const canvas = target.canvas.find(
              (candidate) => candidate.usage === rendition.usage,
            );
            if (!canvas) {
              addIssue({
                code: "missing-brief-canvas",
                objectType: "asset-manifest",
                objectId: manifest.id,
                path: `data.${field}[${index}].usage`,
                message: `Brief has no canvas contract for ${rendition.usage}.`,
              });
              continue;
            }
            if (
              rendition.widthPx !== canvas.widthPx ||
              rendition.heightPx !== canvas.heightPx
            ) {
              addIssue({
                code: "asset-brief-canvas-mismatch",
                objectType: "asset-manifest",
                objectId: manifest.id,
                path: `data.${field}[${index}]`,
                message: `${rendition.usage} must match brief canvas ${canvas.widthPx}x${canvas.heightPx}.`,
              });
            }
            if (
              field === "repositoryRenditions" &&
              "buildPlan" in rendition &&
              !sameBuildPlan(rendition.buildPlan, canvas.buildPlan)
            ) {
              addIssue({
                code: "asset-brief-build-plan-mismatch",
                objectType: "asset-manifest",
                objectId: manifest.id,
                path: `data.${field}[${index}].buildPlan`,
                message: `${rendition.usage} buildPlan must match the approved brief.`,
              });
            }
          }
        }
      }

      const elementKindById = new Map<
        string,
        "verified" | "inferred" | "invented"
      >();
      for (const kind of ["verified", "inferred", "invented"] as const) {
        brief.data.visualElements[kind].forEach((element) =>
          elementKindById.set(element.elementId, kind),
        );
      }
      data.visualElementIds.forEach((elementId, index) => {
        if (!elementKindById.has(elementId)) {
          addIssue({
            code: "dangling-asset-visual-element",
            objectType: "asset-manifest",
            objectId: manifest.id,
            path: `data.visualElementIds[${index}]`,
            message: `Visual element ${elementId} is not in brief ${brief.id}.`,
          });
        }
      });
      const selectedKinds = data.visualElementIds
        .map((elementId) => elementKindById.get(elementId))
        .filter((kind): kind is "verified" | "inferred" | "invented" =>
          Boolean(kind),
        );
      const requiresVerified =
        data.accessibilityMode === "informative" ||
        (data.ownerId === "zhong-kui" &&
          zhongKuiProductionRoles.has(data.role));
      if (requiresVerified && !selectedKinds.includes("verified")) {
        addIssue({
          code: "missing-verified-visual-element",
          objectType: "asset-manifest",
          objectId: manifest.id,
          path: "data.visualElementIds",
          message:
            "Informative and Zhong Kui package assets require a verified visual element.",
        });
      }
      if (
        data.accessibilityMode === "decorative" &&
        (selectedKinds.length === 0 ||
          selectedKinds.some((kind) => kind !== "invented"))
      ) {
        addIssue({
          code: "invalid-decorative-visual-elements",
          objectType: "asset-manifest",
          objectId: manifest.id,
          path: "data.visualElementIds",
          message:
            "Decorative assets must select one or more invented elements and nothing else.",
        });
      }
      if (
        data.ownerType === "global" &&
        (data.accessibilityMode !== "decorative" ||
          selectedKinds.length === 0 ||
          selectedKinds.some((kind) => kind !== "invented"))
      ) {
        addIssue({
          code: "factual-global-asset",
          objectType: "asset-manifest",
          objectId: manifest.id,
          path: "data.visualElementIds",
          message: "M3 global assets must be decorative and invented-only.",
        });
      }

      const referencesById = new Map(
        brief.data.referenceAssets.map((reference) => [
          reference.referenceId,
          reference,
        ]),
      );
      data.referenceAssetIds.forEach((referenceId, index) => {
        const reference = referencesById.get(referenceId);
        if (!reference) {
          addIssue({
            code: "dangling-asset-reference",
            objectType: "asset-manifest",
            objectId: manifest.id,
            path: `data.referenceAssetIds[${index}]`,
            message: `Reference ${referenceId} is not in brief ${brief.id}.`,
          });
        } else if (
          (data.status === "in-review" || data.status === "approved") &&
          reference.rightsStatus === "unknown"
        ) {
          addIssue({
            code: "nonproduction-asset-reference",
            objectType: "asset-manifest",
            objectId: manifest.id,
            path: `data.referenceAssetIds[${index}]`,
            message: `Unknown-rights reference ${referenceId} cannot be selected by a production manifest.`,
          });
        }
      });
    }

    if (data.production !== null) {
      const productionRecord = productionRecordsByPath.get(
        data.production.recordPath,
      );
      if (!productionRecord) {
        addIssue({
          code: "dangling-production-record",
          objectType: "asset-manifest",
          objectId: manifest.id,
          path: "data.production.recordPath",
          message: `Production record ${data.production.recordPath} does not exist.`,
        });
      } else {
        if (productionRecord.data.briefId !== data.briefId) {
          addIssue({
            code: "production-record-brief-mismatch",
            objectType: "asset-manifest",
            objectId: manifest.id,
            path: "data.production.recordPath",
            message: "Production record and manifest brief IDs must match.",
          });
        }
        if (productionRecord.data.method !== data.production.method) {
          addIssue({
            code: "production-record-method-mismatch",
            objectType: "asset-manifest",
            objectId: manifest.id,
            path: "data.production.method",
            message: "Production record and manifest methods must match.",
          });
        }
        if (productionRecord.data.tool !== data.production.tool) {
          addIssue({
            code: "production-record-tool-mismatch",
            objectType: "asset-manifest",
            objectId: manifest.id,
            path: "data.production.tool",
            message: "Production record and manifest tools must match.",
          });
        }

        const recordedRenditions = productionRecord.data.renditions.filter(
          (rendition) => rendition.manifestId === data.manifestId,
        );
        const mastersMatch =
          recordedRenditions.length === data.masterRenditions.length &&
          data.masterRenditions.every((master) =>
            recordedRenditions.some(
              (rendition) =>
                rendition.usage === master.usage &&
                sameMasterRendition(rendition.master, master),
            ),
          );
        if (!mastersMatch) {
          addIssue({
            code: "production-record-master-mismatch",
            objectType: "asset-manifest",
            objectId: manifest.id,
            path: "data.masterRenditions",
            message:
              "Production record master tuples must exactly match the manifest.",
          });
        }
      }
    }

    data.repositoryRenditions.forEach((rendition, index) => {
      const pathRecords = referencedRepositoryPaths.get(rendition.path) ?? [];
      pathRecords.push(manifest);
      referencedRepositoryPaths.set(rendition.path, pathRecords);
      validateRepositoryFile({
        manifest,
        rendition,
        renditionIndex: index,
        metadata: graph.imageRegistry.files.get(rendition.path),
        addIssue,
      });
    });
  }

  for (const record of productionRecords) {
    const expectedPath = `visual/production-records/${record.id}.yml`;
    record.data.renditions.forEach((rendition, index) => {
      const manifest = manifestsById.get(rendition.manifestId);
      if (!manifest) {
        addIssue({
          code: "dangling-production-manifest",
          objectType: "production-record",
          objectId: record.id,
          path: `data.renditions[${index}].manifestId`,
          message: `Production manifest ${rendition.manifestId} does not exist.`,
        });
      } else if (manifest.data.production?.recordPath !== expectedPath) {
        addIssue({
          code: "production-record-backlink-mismatch",
          objectType: "production-record",
          objectId: record.id,
          path: `data.renditions[${index}].manifestId`,
          message: `Manifest ${rendition.manifestId} does not point back to ${expectedPath}.`,
        });
      }
    });
  }

  for (const [assetId, records] of manifestsByAssetId) {
    const versions = new Map<number, ManifestRecord[]>();
    for (const record of records) {
      const matching = versions.get(record.data.version) ?? [];
      matching.push(record);
      versions.set(record.data.version, matching);
    }
    for (const [version, matching] of versions) {
      if (matching.length > 1) {
        matching.slice(1).forEach((record) =>
          addIssue({
            code: "duplicate-asset-version",
            objectType: "asset-manifest",
            objectId: record.id,
            path: "data.version",
            message: `Asset ${assetId} has ${matching.length} version ${version} records.`,
          }),
        );
      }
    }
    const maxVersion = Math.max(...versions.keys());
    for (let version = 1; version <= maxVersion; version += 1) {
      if (!versions.has(version)) {
        addIssue({
          code: "missing-asset-version-history",
          objectType: "asset-manifest",
          objectId: assetId,
          path: "data.version",
          message: `Asset ${assetId} is missing version ${version} before version ${maxVersion}.`,
        });
      }
    }
    const current = records.filter((record) => record.data.isCurrent);
    if (current.length > 1) {
      current.slice(1).forEach((record) =>
        addIssue({
          code: "duplicate-current-asset",
          objectType: "asset-manifest",
          objectId: record.id,
          path: "data.isCurrent",
          message: `Asset ${assetId} has more than one current version.`,
        }),
      );
    }
    current.forEach((record) => {
      if (record.data.status === "archived") {
        addIssue({
          code: "archived-current-asset",
          objectType: "asset-manifest",
          objectId: record.id,
          path: "data.isCurrent",
          message: "Archived manifests cannot be current.",
        });
      }
    });
  }

  for (const [slotKey, records] of manifestsBySlot) {
    const current = records.filter((record) => record.data.isCurrent);
    if (current.length > 1) {
      current.slice(1).forEach((record) =>
        addIssue({
          code: "duplicate-current-slot",
          objectType: "asset-manifest",
          objectId: record.id,
          path: "data.isCurrent",
          message: `Owner slot ${slotKey} has more than one current manifest.`,
        }),
      );
    }
  }

  for (const [path, records] of referencedRepositoryPaths) {
    if (records.length > 1) {
      records.slice(1).forEach((record) =>
        addIssue({
          code: "duplicate-repository-image-reference",
          objectType: "asset-manifest",
          objectId: record.id,
          path: "data.repositoryRenditions",
          message: `Repository source ${path} is referenced more than once.`,
        }),
      );
    }
  }

  for (const metadata of [...graph.imageRegistry.files.values()].sort(
    (left, right) => compareStrings(left.path, right.path),
  )) {
    const extension = extname(metadata.path).toLowerCase();
    if (forbiddenImageExtensions.has(extension)) {
      addIssue({
        code: "forbidden-image-extension",
        objectType: "asset-file",
        objectId: metadata.path,
        path: "path",
        message: `${extension} files cannot enter src/assets/images/.`,
      });
    }
    if (metadata.forbiddenSignature !== null) {
      addIssue({
        code: "forbidden-image-signature",
        objectType: "asset-file",
        objectId: metadata.path,
        path: "path",
        message: `${metadata.path} contains a forbidden ${metadata.forbiddenSignature}.`,
      });
    }
    if (!referencedRepositoryPaths.has(metadata.path)) {
      addIssue({
        code: "orphan-repository-image",
        objectType: "asset-file",
        objectId: metadata.path,
        path: "path",
        message:
          "Every repository image must be referenced by exactly one manifest rendition.",
      });
    }
  }

  for (const entry of graph.content.entries) {
    validateHeroReference({
      ownerType: "entry",
      ownerId: entry.data.entryId,
      status: entry.data.status,
      heroAssetId: entry.data.heroAssetId,
      manifestsByAssetId,
      addIssue,
    });
  }
  for (const collection of graph.content.collections) {
    validateHeroReference({
      ownerType: "collection",
      ownerId: collection.data.collectionId,
      status: collection.data.status,
      heroAssetId: collection.data.heroAssetId,
      manifestsByAssetId,
      addIssue,
    });
  }

  if (issues.length > 0) {
    throw new VisualAssetGraphValidationError(issues);
  }

  return {
    ...graph,
    visualBriefs,
    assets,
  };
}
