import { describe, expect, it } from "vitest";

import { maximumRepositoryImageBytes } from "../../src/visual/load-image-metadata-registry";
import {
  VisualAssetGraphValidationError,
  validateVisualAssetGraph,
  type VisualAssetGraph,
  type VisualGraphIssue,
} from "../../src/visual/validate-visual-asset-graph";
import {
  makeApprovedBriefData,
  makeApprovedHeroManifestData,
  makeBriefRecord,
  makeDraftManifestData,
  makeEmptyImageRegistry,
  makeImageRegistry,
  makeManifestRecord,
  makeProductionRecord,
  makeProductionRecordData,
  makeVisualContentGraph,
} from "./fixtures";

function issuesFrom(graph: VisualAssetGraph): readonly VisualGraphIssue[] {
  try {
    validateVisualAssetGraph(graph);
  } catch (error) {
    if (error instanceof VisualAssetGraphValidationError) return error.issues;
    throw error;
  }
  throw new Error("Expected visual graph validation to fail.");
}

function issueCodes(graph: VisualAssetGraph): string[] {
  return issuesFrom(graph).map((issue) => issue.code);
}

function makeGraph(
  overrides: Partial<VisualAssetGraph> = {},
): VisualAssetGraph {
  const assets = overrides.assets ?? [];
  const productionRecords =
    overrides.productionRecords ??
    (assets.some((record) => record.data.production !== null)
      ? [
          makeProductionRecord(
            makeProductionRecordData(assets.map((record) => record.data)),
          ),
        ]
      : []);
  return {
    content: makeVisualContentGraph(),
    visualBriefs: [makeBriefRecord()],
    assets,
    productionRecords,
    imageRegistry: makeEmptyImageRegistry(),
    ...overrides,
  };
}

describe("validateVisualAssetGraph", () => {
  it("accepts an approved real-shape brief before production assets exist", () => {
    const result = validateVisualAssetGraph(makeGraph());
    expect(result.visualBriefs.map((record) => record.id)).toEqual([
      "brief-zhong-kui-visual-package-v1",
    ]);
    expect(result.assets).toEqual([]);
    expect(result.productionRecords).toEqual([]);
  });

  it("accepts a complete current Hero with matching evidence and files", () => {
    const manifest = makeManifestRecord();
    const graph = makeGraph({
      content: makeVisualContentGraph(manifest.data.assetId),
      assets: [manifest],
      imageRegistry: makeImageRegistry(),
    });

    expect(() => validateVisualAssetGraph(graph)).not.toThrow();
  });

  it("requires production records and exact bidirectional master lineage", () => {
    const manifest = makeManifestRecord();
    const base = {
      content: makeVisualContentGraph(manifest.data.assetId),
      assets: [manifest],
      imageRegistry: makeImageRegistry(),
    };

    expect(issueCodes(makeGraph({ ...base, productionRecords: [] }))).toContain(
      "dangling-production-record",
    );

    const mismatchedRecord = makeProductionRecordData([manifest.data], {
      tool: "Wrong fixture tool",
      renditions: makeProductionRecordData([manifest.data]).renditions.map(
        (rendition) => ({
          ...rendition,
          master: { ...rendition.master, sha256: "b".repeat(64) },
        }),
      ),
    });
    expect(
      issueCodes(
        makeGraph({
          ...base,
          productionRecords: [makeProductionRecord(mismatchedRecord)],
        }),
      ),
    ).toEqual(
      expect.arrayContaining([
        "production-record-tool-mismatch",
        "production-record-master-mismatch",
      ]),
    );

    const danglingRecord = makeProductionRecord();
    expect(
      issueCodes(makeGraph({ productionRecords: [danglingRecord] })),
    ).toContain("dangling-production-manifest");
  });

  it("rejects a fake Hero string even while the Entry remains draft", () => {
    const graph = makeGraph({
      content: makeVisualContentGraph("asset-zhong-kui-hero-fake"),
    });

    expect(issueCodes(graph)).toContain("dangling-hero-asset");
  });

  it("enforces Hero owner/slot, current, and content status matrices", () => {
    const approved = makeManifestRecord();
    const noCurrent = makeManifestRecord(
      makeApprovedHeroManifestData({ isCurrent: false }),
    );
    expect(
      issueCodes(
        makeGraph({
          content: makeVisualContentGraph(noCurrent.data.assetId),
          assets: [noCurrent],
          imageRegistry: makeImageRegistry(),
        }),
      ),
    ).toContain("missing-current-hero");

    const wrongRole = makeManifestRecord(
      makeApprovedHeroManifestData({ role: "lead" }),
    );
    expect(
      issueCodes(
        makeGraph({
          content: makeVisualContentGraph(wrongRole.data.assetId),
          assets: [wrongRole],
          imageRegistry: makeImageRegistry(),
        }),
      ),
    ).toContain("hero-asset-owner-slot-mismatch");

    const visualReviewContent = makeVisualContentGraph(approved.data.assetId);
    const visualEntry = visualReviewContent.entries.find(
      (record) => record.id === "zhong-kui",
    );
    if (!visualEntry) throw new Error("Missing visual-review fixture Entry.");
    visualEntry.data.status = "visual-review";
    const draftCurrent = makeManifestRecord(
      makeDraftManifestData({ isCurrent: true }),
    );
    expect(
      issueCodes(
        makeGraph({
          content: visualReviewContent,
          assets: [draftCurrent],
        }),
      ),
    ).toContain("visual-review-hero-status");

    const readyContent = makeVisualContentGraph(approved.data.assetId);
    const readyEntry = readyContent.entries.find(
      (record) => record.id === "zhong-kui",
    );
    if (!readyEntry) throw new Error("Missing ready fixture Entry.");
    readyEntry.data.status = "ready";
    const inReview = makeManifestRecord(
      makeApprovedHeroManifestData({ status: "in-review" }),
    );
    expect(
      issueCodes(
        makeGraph({
          content: readyContent,
          assets: [inReview],
          imageRegistry: makeImageRegistry(),
        }),
      ),
    ).toContain("ready-hero-status");

    const archivedContent = makeVisualContentGraph(approved.data.assetId);
    const archivedEntry = archivedContent.entries.find(
      (record) => record.id === "zhong-kui",
    );
    if (!archivedEntry) throw new Error("Missing archived fixture Entry.");
    archivedEntry.data.status = "archived";
    const emptyArchived = makeManifestRecord(
      makeDraftManifestData({ status: "archived", isCurrent: false }),
    );
    expect(
      issueCodes(
        makeGraph({ content: archivedContent, assets: [emptyArchived] }),
      ),
    ).toContain("missing-archived-hero-history");
  });

  it("accepts a draft Collection Hero with a real matching current asset", () => {
    const content = makeVisualContentGraph();
    const collection = content.collections.find(
      (record) => record.id === "chinese-underworld",
    );
    if (!collection) throw new Error("Missing Collection fixture.");
    const manifest = makeDraftManifestData({
      assetId: "asset-chinese-underworld-hero-primary",
      manifestId: "asset-chinese-underworld-hero-primary-v1",
      ownerType: "collection",
      ownerId: "chinese-underworld",
      isCurrent: true,
    });
    collection.data.heroAssetId = manifest.assetId;

    expect(() =>
      validateVisualAssetGraph(
        makeGraph({
          content,
          assets: [makeManifestRecord(manifest)],
        }),
      ),
    ).not.toThrow();
  });

  it("checks version record identity and keeps logical asset versions distinct", () => {
    const mismatched = makeBriefRecord(makeApprovedBriefData(), {
      id: "brief-loader-mismatch-v1",
      filePath: "visual/briefs/brief-file-mismatch-v1.yml",
    });
    expect(issueCodes(makeGraph({ visualBriefs: [mismatched] }))).toEqual(
      expect.arrayContaining([
        "loader-record-id-mismatch",
        "file-record-id-mismatch",
      ]),
    );

    const versionOne = makeManifestRecord(
      makeDraftManifestData({ isCurrent: false }),
    );
    const versionTwoData = makeDraftManifestData({
      manifestId: "asset-zhong-kui-hero-primary-v2",
      version: 2,
      isCurrent: false,
    });
    expect(() =>
      validateVisualAssetGraph(
        makeGraph({
          assets: [makeManifestRecord(versionTwoData), versionOne],
        }),
      ),
    ).not.toThrow();
  });

  it("requires approved briefs and closed Claim/Source ownership", () => {
    const unapproved = makeApprovedBriefData({
      status: "in-review",
      approvedBy: null,
      approvedAt: null,
    });
    const manifest = makeManifestRecord();
    expect(
      issueCodes(
        makeGraph({
          visualBriefs: [makeBriefRecord(unapproved)],
          assets: [manifest],
          imageRegistry: makeImageRegistry(),
        }),
      ),
    ).toContain("unapproved-asset-brief");

    const content = makeVisualContentGraph();
    const entry = content.entries.find((record) => record.id === "zhong-kui");
    if (!entry) throw new Error("Missing Zhong Kui fixture Entry.");
    entry.data.sourceIds = [];
    expect(issueCodes(makeGraph({ content }))).toContain(
      "unlisted-visual-claim-source",
    );
  });

  it("requires brief history to begin at v1 and retains research-only traceability", () => {
    const versionTwo = makeApprovedBriefData({
      briefId: "brief-zhong-kui-visual-package-v2",
      version: 2,
    });
    expect(
      issueCodes(makeGraph({ visualBriefs: [makeBriefRecord(versionTwo)] })),
    ).toContain("missing-brief-version-history");

    const brief = makeApprovedBriefData({
      referenceAssets: makeApprovedBriefData().referenceAssets.map(
        (reference) => ({
          ...reference,
          rightsStatus: "research-only" as const,
          licenseOrPermissionId: null,
        }),
      ),
    });
    const manifest = makeManifestRecord();
    expect(() =>
      validateVisualAssetGraph(
        makeGraph({
          content: makeVisualContentGraph(manifest.data.assetId),
          visualBriefs: [makeBriefRecord(brief)],
          assets: [manifest],
          imageRegistry: makeImageRegistry(),
        }),
      ),
    ).not.toThrow();
  });

  it("rejects element/reference escape and duplicate current versions", () => {
    const approved = makeApprovedHeroManifestData({
      visualElementIds: ["outside-brief"],
      referenceAssetIds: ["outside-reference"],
    });
    const invalidGraph = makeGraph({
      assets: [makeManifestRecord(approved)],
      imageRegistry: makeImageRegistry(),
    });
    expect(issueCodes(invalidGraph)).toEqual(
      expect.arrayContaining([
        "dangling-asset-visual-element",
        "dangling-asset-reference",
        "missing-verified-visual-element",
      ]),
    );

    const versionOne = makeManifestRecord();
    const versionTwo = makeManifestRecord(
      makeDraftManifestData({
        manifestId: "asset-zhong-kui-hero-primary-v2",
        version: 2,
        isCurrent: true,
      }),
    );
    const duplicateGraph = makeGraph({
      content: makeVisualContentGraph(versionOne.data.assetId),
      assets: [versionTwo, versionOne],
      imageRegistry: makeImageRegistry(),
    });
    expect(issueCodes(duplicateGraph)).toEqual(
      expect.arrayContaining([
        "duplicate-current-asset",
        "duplicate-current-slot",
        "duplicate-current-hero",
      ]),
    );
  });

  it("validates repository paths, metadata, hashes, and orphan inventory", () => {
    const approved = makeApprovedHeroManifestData();
    const first = approved.repositoryRenditions[0];
    if (!first) throw new Error("Missing repository rendition fixture.");
    const escaped = makeApprovedHeroManifestData({
      repositoryRenditions: [
        { ...first, path: "src/assets/images/../escape.png" },
        approved.repositoryRenditions[1]!,
      ],
    });
    expect(
      issueCodes(
        makeGraph({
          assets: [makeManifestRecord(escaped)],
          imageRegistry: makeImageRegistry(),
        }),
      ),
    ).toContain("invalid-repository-image-path");

    const registry = makeImageRegistry();
    const files = new Map(registry.files);
    const firstMetadata = files.get(first.path);
    if (!firstMetadata) throw new Error("Missing image metadata fixture.");
    files.set(first.path, { ...firstMetadata, sha256: "b".repeat(64) });
    files.set("src/assets/images/orphan.png", {
      ...firstMetadata,
      path: "src/assets/images/orphan.png",
    });
    const metadataGraph = makeGraph({
      assets: [makeManifestRecord(approved)],
      imageRegistry: { ...registry, files },
    });
    expect(issueCodes(metadataGraph)).toEqual(
      expect.arrayContaining([
        "repository-image-hash-mismatch",
        "orphan-repository-image",
      ]),
    );
  });

  it("fails closed on missing or deceptive repository image metadata", () => {
    const approved = makeApprovedHeroManifestData();
    const first = approved.repositoryRenditions[0];
    if (!first) throw new Error("Missing repository rendition fixture.");

    const missingRegistry = makeImageRegistry();
    const missingFiles = new Map(missingRegistry.files);
    missingFiles.delete(first.path);
    expect(
      issueCodes(
        makeGraph({
          assets: [makeManifestRecord(approved)],
          imageRegistry: { ...missingRegistry, files: missingFiles },
        }),
      ),
    ).toContain("missing-repository-image");

    const deceptiveRegistry = makeImageRegistry();
    const deceptiveFiles = new Map(deceptiveRegistry.files);
    const firstMetadata = deceptiveFiles.get(first.path);
    if (!firstMetadata) throw new Error("Missing image metadata fixture.");
    deceptiveFiles.set(first.path, {
      ...firstMetadata,
      sizeBytes: maximumRepositoryImageBytes + 1,
      sha256: "b".repeat(64),
      widthPx: 1,
      heightPx: 2,
      format: "webp",
      metadataError: "Synthetic decoder failure.",
      forbiddenSignature: "pickle/model payload",
    });
    expect(
      issueCodes(
        makeGraph({
          assets: [makeManifestRecord(approved)],
          imageRegistry: { ...deceptiveRegistry, files: deceptiveFiles },
        }),
      ),
    ).toEqual(
      expect.arrayContaining([
        "repository-image-too-large",
        "forbidden-image-signature",
        "unreadable-repository-image",
        "repository-image-width-mismatch",
        "repository-image-height-mismatch",
        "repository-image-hash-mismatch",
        "repository-image-format-mismatch",
      ]),
    );

    const renamedPath = "src/assets/images/untracked-name.png";
    const renamedManifest = makeApprovedHeroManifestData({
      repositoryRenditions: [
        { ...first, path: renamedPath },
        approved.repositoryRenditions[1]!,
      ],
    });
    const renamedRegistry = makeImageRegistry();
    const renamedFiles = new Map(renamedRegistry.files);
    renamedFiles.delete(first.path);
    renamedFiles.set(renamedPath, {
      ...firstMetadata,
      path: renamedPath,
    });
    expect(
      issueCodes(
        makeGraph({
          assets: [makeManifestRecord(renamedManifest)],
          imageRegistry: { ...renamedRegistry, files: renamedFiles },
        }),
      ),
    ).toContain("repository-image-filename-mismatch");
  });

  it("sorts aggregated issues deterministically", () => {
    const first = makeManifestRecord(
      makeDraftManifestData({
        manifestId: "asset-zhong-kui-hero-primary-v2",
        version: 2,
        isCurrent: true,
      }),
    );
    const second = makeManifestRecord(
      makeDraftManifestData({ isCurrent: true }),
    );
    const forward = issuesFrom(makeGraph({ assets: [first, second] }));
    const reverse = issuesFrom(makeGraph({ assets: [second, first] }));

    expect(reverse).toStrictEqual(forward);
    const keys = forward.map((issue) =>
      [issue.objectType, issue.objectId, issue.path, issue.code].join("|"),
    );
    expect(keys).toEqual([...keys].sort());
  });
});
