import type { ContentGraph } from "../../src/content/validate-content-graph";
import type {
  ImageMetadataRegistry,
  RepositoryImageMetadata,
} from "../../src/visual/load-image-metadata-registry";
import type {
  AssetManifestData,
  VisualBriefData,
  VisualProductionRecordData,
} from "../../src/visual/visual-asset-schemas";
import type { VisualGraphRecord } from "../../src/visual/validate-visual-asset-graph";
import {
  makeClaimData,
  makeDraftGraph,
  makeRecord,
  makeSourceData,
} from "../content/fixtures";

export const fixtureSha256 = "a".repeat(64);
export const fixtureApprovalTime = "2026-08-28T07:36:04Z";

function approvedReview(): AssetManifestData["reviews"]["cultural"] {
  return {
    status: "approved",
    reviewedBy: "Fixture reviewer",
    reviewedAt: fixtureApprovalTime,
    notes: "Synthetic review record for validation tests only.",
  };
}

function pendingReview(): AssetManifestData["reviews"]["cultural"] {
  return {
    status: "pending",
    reviewedBy: null,
    reviewedAt: null,
    notes: null,
  };
}

export function makeApprovedBriefData(
  overrides: Partial<VisualBriefData> = {},
): VisualBriefData {
  return {
    briefId: "brief-zhong-kui-visual-package-v1",
    version: 1,
    status: "approved",
    ownerType: "entry",
    ownerId: "zhong-kui",
    purpose: "visual-package",
    approvedBy: "Fixture project owner",
    approvedAt: fixtureApprovalTime,
    notes: "Synthetic approved brief for validation tests only.",
    primaryReferenceFamily: "Bounded museum-object fixture family",
    period: "Fixture period",
    region: "China",
    medium: "Synthetic digital illustration fixture",
    culturalContext: ["Fixture context remains bounded to its Claims."],
    targetSlots: [
      {
        role: "hero",
        slotId: "primary",
        requiredUsages: ["hero-desktop", "hero-mobile"],
        optionalUsages: [],
        canvas: [
          {
            usage: "hero-desktop",
            widthPx: 3200,
            heightPx: 1800,
            compositionGoal: "Synthetic desktop composition.",
            safeArea: "Synthetic desktop safe area.",
            focalPointGoal: { x: 0.4, y: 0.5 },
            buildPlan: {
              mode: "responsive",
              formats: ["avif", "webp"],
              candidateWidths: [640, 960, 1440, 1920],
              allowUpscale: false,
            },
          },
          {
            usage: "hero-mobile",
            widthPx: 1600,
            heightPx: 2000,
            compositionGoal: "Synthetic mobile composition.",
            safeArea: "Synthetic mobile safe area.",
            focalPointGoal: { x: 0.5, y: 0.45 },
            buildPlan: {
              mode: "responsive",
              formats: ["avif", "webp"],
              candidateWidths: [640, 960, 1440],
              allowUpscale: false,
            },
          },
        ],
      },
    ],
    visualElements: {
      verified: [
        {
          elementId: "verified-figure",
          statement: "The fixture figure is supported by a bounded Claim.",
          claimIds: ["claim-one"],
        },
      ],
      inferred: [
        {
          elementId: "inferred-space",
          statement: "The fixture uses an editorial spatial inference.",
          rationale:
            "The synthetic space is not asserted as a historical fact.",
        },
      ],
      invented: [
        {
          elementId: "invented-light",
          statement: "The fixture lighting is newly invented.",
        },
      ],
    },
    referenceAssets: [
      {
        referenceId: "reference-one",
        url: "https://example.org/object",
        organization: "Fixture Museum",
        creator: "Fixture creator",
        rightsStatus: "public-domain",
        rightsUrl: "https://example.org/rights",
        licenseOrPermissionId: "cc0-1.0",
        notes: "Synthetic reference record; not production research.",
      },
    ],
    composition: {
      continuity: "Keep the synthetic identity consistent.",
      hierarchy: "Keep the synthetic figure primary.",
      colorDirection: "Use a bounded fixture palette.",
      lightingDirection: "Use one synthetic light direction.",
      textPolicy: "Render no text into the fixture image.",
    },
    excludedMotifs: ["Protected brands and pseudo-Chinese writing"],
    openDecisions: [],
    ...overrides,
  };
}

export function makeDraftManifestData(
  overrides: Partial<AssetManifestData> = {},
): AssetManifestData {
  return {
    assetId: "asset-zhong-kui-hero-primary",
    manifestId: "asset-zhong-kui-hero-primary-v1",
    ownerType: "entry",
    ownerId: "zhong-kui",
    role: "hero",
    slotId: "primary",
    version: 1,
    status: "draft",
    isCurrent: false,
    briefId: null,
    accessibilityMode: null,
    masterRenditions: [],
    repositoryRenditions: [],
    referenceAssetIds: [],
    publicationRights: {
      status: "pending",
      basis: null,
      rightsHolder: null,
      licenseOrPermissionId: null,
      rightsUrl: null,
      notes: null,
    },
    visualElementIds: [],
    production: null,
    humanEdits: [],
    reviews: {
      cultural: pendingReview(),
      rights: pendingReview(),
      visual: pendingReview(),
      accessibility: pendingReview(),
      language: pendingReview(),
    },
    alt: null,
    caption: null,
    credit: null,
    aiDisclosure: null,
    ...overrides,
  };
}

export function makeApprovedHeroManifestData(
  overrides: Partial<AssetManifestData> = {},
): AssetManifestData {
  return {
    ...makeDraftManifestData(),
    status: "approved",
    isCurrent: true,
    briefId: "brief-zhong-kui-visual-package-v1",
    accessibilityMode: "informative",
    masterRenditions: [
      {
        logicalUri: "visual-production://zhong-kui/hero/desktop/v1",
        usage: "hero-desktop",
        widthPx: 3200,
        heightPx: 1800,
        sha256: fixtureSha256,
      },
      {
        logicalUri: "visual-production://zhong-kui/hero/mobile/v1",
        usage: "hero-mobile",
        widthPx: 1600,
        heightPx: 2000,
        sha256: fixtureSha256,
      },
    ],
    repositoryRenditions: [
      {
        usage: "hero-desktop",
        path: "src/assets/images/zhong-kui-hero-primary-v1-hero-desktop-3200w.png",
        format: "png",
        widthPx: 3200,
        heightPx: 1800,
        sha256: fixtureSha256,
        focalPoint: { x: 0.4, y: 0.5 },
        buildPlan: {
          mode: "responsive",
          formats: ["avif", "webp"],
          candidateWidths: [640, 960, 1440, 1920],
          allowUpscale: false,
        },
      },
      {
        usage: "hero-mobile",
        path: "src/assets/images/zhong-kui-hero-primary-v1-hero-mobile-1600w.png",
        format: "png",
        widthPx: 1600,
        heightPx: 2000,
        sha256: fixtureSha256,
        focalPoint: { x: 0.5, y: 0.45 },
        buildPlan: {
          mode: "responsive",
          formats: ["avif", "webp"],
          candidateWidths: [640, 960, 1440],
          allowUpscale: false,
        },
      },
    ],
    referenceAssetIds: ["reference-one"],
    publicationRights: {
      status: "approved",
      basis: "in-house-original",
      rightsHolder: "Fixture studio",
      licenseOrPermissionId: null,
      rightsUrl: null,
      notes: "Synthetic publication-rights approval for tests only.",
    },
    visualElementIds: ["verified-figure", "invented-light"],
    production: {
      method: "in-house-original",
      tool: null,
      recordPath: "visual/production-records/production-fixture-v1.yml",
      workflow: null,
    },
    humanEdits: ["Synthetic crop review."],
    reviews: {
      cultural: approvedReview(),
      rights: approvedReview(),
      visual: approvedReview(),
      accessibility: approvedReview(),
      language: approvedReview(),
    },
    alt: "A bounded synthetic depiction of Zhong Kui for validation tests.",
    caption: "Synthetic fixture caption tied to a verified Claim.",
    credit: "Synthetic fixture image; not a production asset.",
    aiDisclosure: null,
    ...overrides,
  };
}

export function makeVisualContentGraph(
  heroAssetId: string | null = null,
): ContentGraph {
  const graph = makeDraftGraph();
  const entry = graph.entries.find((record) => record.id === "zhong-kui");
  if (!entry) throw new Error("Missing Zhong Kui fixture Entry.");
  const source = makeSourceData();
  const claim = makeClaimData();
  entry.data.sourceIds = [source.sourceId];
  entry.data.claimIds = [claim.claimId];
  entry.data.heroAssetId = heroAssetId;
  graph.sources = [makeRecord(source.sourceId, "sources", source)];
  graph.claims = [makeRecord(claim.claimId, "claims", claim)];
  return graph;
}

export function makeBriefRecord(
  data: VisualBriefData = makeApprovedBriefData(),
  overrides: Partial<VisualGraphRecord<VisualBriefData>> = {},
): VisualGraphRecord<VisualBriefData> {
  return {
    id: data.briefId,
    filePath: `visual/briefs/${data.briefId}.yml`,
    data,
    ...overrides,
  };
}

export function makeManifestRecord(
  data: AssetManifestData = makeApprovedHeroManifestData(),
  overrides: Partial<VisualGraphRecord<AssetManifestData>> = {},
): VisualGraphRecord<AssetManifestData> {
  return {
    id: data.manifestId,
    filePath: `visual/manifests/${data.manifestId}.yml`,
    data,
    ...overrides,
  };
}

export function makeProductionRecordData(
  manifests: readonly AssetManifestData[] = [makeApprovedHeroManifestData()],
  overrides: Partial<VisualProductionRecordData> = {},
): VisualProductionRecordData {
  const firstProduction = manifests[0]?.production;
  const method = firstProduction?.method ?? "in-house-original";
  const isAiAssisted = method === "ai-assisted";

  return {
    productionRecordId: "production-fixture-v1",
    briefId: manifests[0]?.briefId ?? "brief-zhong-kui-visual-package-v1",
    method,
    tool: firstProduction?.tool ?? null,
    modelId: null,
    modelNotes: isAiAssisted
      ? "Synthetic fixture model metadata was not exposed."
      : null,
    termsUrl: isAiAssisted ? "https://example.org/fixture-terms" : null,
    rightsNotes: "Synthetic production rights notes for tests only.",
    recordedAt: fixtureApprovalTime,
    renditions: manifests.flatMap((manifest) =>
      manifest.masterRenditions.map((master) => ({
        manifestId: manifest.manifestId,
        usage: master.usage,
        prompt: isAiAssisted ? "Synthetic AI prompt for tests only." : null,
        receivedAt: fixtureApprovalTime,
        inputImages: [],
        rawOutput: {
          format: "png" as const,
          widthPx: master.widthPx,
          heightPx: master.heightPx,
          sha256: master.sha256,
        },
        master: { ...master },
        processing: {
          tool: "Synthetic fixture processor",
          version: null,
          operations: ["No-op fixture processing."],
        },
        verifiedAt: fixtureApprovalTime,
      })),
    ),
    notes: "Synthetic production record; no real assets or tools were used.",
    ...overrides,
  };
}

export function makeProductionRecord(
  data: VisualProductionRecordData = makeProductionRecordData(),
  overrides: Partial<VisualGraphRecord<VisualProductionRecordData>> = {},
): VisualGraphRecord<VisualProductionRecordData> {
  return {
    id: data.productionRecordId,
    filePath: `visual/production-records/${data.productionRecordId}.yml`,
    data,
    ...overrides,
  };
}

function makeImageMetadata(
  path: string,
  widthPx: number,
  heightPx: number,
): RepositoryImageMetadata {
  return {
    path,
    absolutePath: `C:/fixture/${path.split("/").at(-1)}`,
    extension: ".png",
    sizeBytes: 1024,
    sha256: fixtureSha256,
    widthPx,
    heightPx,
    format: "png",
    metadataError: null,
    forbiddenSignature: null,
  };
}

export function makeImageRegistry(): ImageMetadataRegistry {
  const desktopPath =
    "src/assets/images/zhong-kui-hero-primary-v1-hero-desktop-3200w.png";
  const mobilePath =
    "src/assets/images/zhong-kui-hero-primary-v1-hero-mobile-1600w.png";

  return {
    rootDirectory: "C:/fixture/src/assets/images",
    rootError: null,
    files: new Map([
      [desktopPath, makeImageMetadata(desktopPath, 3200, 1800)],
      [mobilePath, makeImageMetadata(mobilePath, 1600, 2000)],
    ]),
  };
}

export function makeEmptyImageRegistry(): ImageMetadataRegistry {
  return {
    rootDirectory: "C:/fixture/src/assets/images",
    rootError: null,
    files: new Map(),
  };
}
