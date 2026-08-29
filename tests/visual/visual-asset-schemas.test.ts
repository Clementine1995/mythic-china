import { describe, expect, it } from "vitest";

import {
  assetManifestSchema,
  visualBriefSchema,
  visualProductionRecordSchema,
} from "../../src/visual/visual-asset-schemas";
import {
  fixtureApprovalTime,
  makeApprovedBriefData,
  makeApprovedHeroManifestData,
  makeDraftManifestData,
  makeProductionRecordData,
} from "./fixtures";

describe("visual asset schemas", () => {
  it("accepts an approved brief and both draft and approved manifests", () => {
    expect(visualBriefSchema.parse(makeApprovedBriefData()).status).toBe(
      "approved",
    );
    expect(assetManifestSchema.parse(makeDraftManifestData()).status).toBe(
      "draft",
    );
    expect(
      assetManifestSchema.parse(makeApprovedHeroManifestData()).status,
    ).toBe("approved");
    expect(
      assetManifestSchema.parse(
        makeApprovedHeroManifestData({
          status: "archived",
          isCurrent: false,
        }),
      ).status,
    ).toBe("archived");
  });

  it("keeps approval identity, time, and reference rights explicit", () => {
    const approved = makeApprovedBriefData();
    expect(
      visualBriefSchema.safeParse({ ...approved, approvedBy: null }).success,
    ).toBe(false);
    expect(
      visualBriefSchema.safeParse({
        ...approved,
        approvedAt: "2026-08-28T15:36:04+08:00",
      }).success,
    ).toBe(false);
    expect(
      visualBriefSchema.safeParse({
        ...approved,
        approvedAt: new Date(fixtureApprovalTime),
      }).success,
    ).toBe(false);
    expect(
      visualBriefSchema.safeParse({
        ...approved,
        approvedAt: "2026-02-31T07:36:04Z",
      }).success,
    ).toBe(false);

    const inReview = makeApprovedBriefData({
      status: "in-review",
      approvedBy: null,
      approvedAt: null,
    });
    expect(visualBriefSchema.safeParse(inReview).success).toBe(true);
    expect(
      visualBriefSchema.safeParse({
        ...inReview,
        approvedBy: "Premature approver",
      }).success,
    ).toBe(false);

    expect(
      visualBriefSchema.safeParse({
        ...approved,
        referenceAssets: approved.referenceAssets.map((reference) => ({
          ...reference,
          rightsStatus: "unknown",
          rightsUrl: null,
        })),
      }).success,
    ).toBe(false);
  });

  it("enforces brief identity, role usage, responsive output, and no upscale", () => {
    const brief = makeApprovedBriefData();
    expect(
      visualBriefSchema.safeParse({ ...brief, briefId: "brief-wrong-v1" })
        .success,
    ).toBe(false);

    const target = brief.targetSlots[0];
    const desktop = target?.canvas[0];
    if (!target || !desktop) throw new Error("Missing visual fixture target.");

    expect(
      visualBriefSchema.safeParse({
        ...brief,
        targetSlots: [
          {
            ...target,
            requiredUsages: ["article-lead"],
          },
        ],
      }).success,
    ).toBe(false);
    expect(
      visualBriefSchema.safeParse({
        ...brief,
        targetSlots: [
          {
            ...target,
            canvas: [
              {
                ...desktop,
                buildPlan: {
                  ...desktop.buildPlan,
                  formats: ["webp"],
                  allowUpscale: true,
                },
              },
              target.canvas[1],
            ],
          },
        ],
      }).success,
    ).toBe(false);
  });

  it("enforces manifest production, accessibility, rights, and review gates", () => {
    const approved = makeApprovedHeroManifestData();
    expect(
      assetManifestSchema.safeParse({
        ...approved,
        isCurrent: true,
        status: "archived",
      }).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse(
        makeDraftManifestData({ status: "archived", isCurrent: false }),
      ).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse({
        ...approved,
        status: "in-review",
        publicationRights: {
          status: "pending",
          basis: null,
          rightsHolder: null,
          licenseOrPermissionId: null,
          rightsUrl: null,
          notes: null,
        },
      }).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse({ ...approved, alt: "" }).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse({ ...approved, caption: null }).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse({
        ...approved,
        publicationRights: {
          ...approved.publicationRights,
          status: "pending",
        },
      }).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse({
        ...approved,
        production: {
          method: "in-house-original",
          tool: "Comfy UI",
          recordPath: "visual/production-records/production-fixture-v1.yml",
          workflow: null,
        },
      }).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse({
        ...approved,
        production: {
          method: "in-house-original",
          tool: null,
          recordPath: "visual/production-records/production-fixture-v1.yml",
          workflow: {
            workflowId: "workflow-one",
            path: "visual/workflows/workflow-one.json",
            sha256: "c".repeat(64),
            modelRegistryIds: ["model-one"],
          },
        },
      }).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse(
        makeDraftManifestData({
          visualElementIds: ["invented-light"],
        }),
      ).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse({
        ...approved,
        reviews: {
          ...approved.reviews,
          cultural: {
            status: "pending",
            reviewedBy: null,
            reviewedAt: null,
            notes: null,
          },
        },
      }).success,
    ).toBe(false);

    expect(
      assetManifestSchema.safeParse({
        ...approved,
        production: {
          method: "ai-assisted",
          tool: null,
          recordPath: "visual/production-records/production-fixture-v1.yml",
          workflow: null,
        },
        aiDisclosure: null,
      }).success,
    ).toBe(false);
  });

  it("validates traceable production records and AI prompt conditions", () => {
    const aiManifest = makeApprovedHeroManifestData({
      production: {
        method: "ai-assisted",
        tool: "OpenAI built-in ImageGen",
        recordPath: "visual/production-records/production-fixture-v1.yml",
        workflow: null,
      },
      aiDisclosure: "Synthetic AI-assisted fixture disclosure.",
    });
    const record = makeProductionRecordData([aiManifest]);
    expect(visualProductionRecordSchema.parse(record).method).toBe(
      "ai-assisted",
    );
    expect(
      visualProductionRecordSchema.safeParse({
        ...record,
        renditions: record.renditions.map((rendition) => ({
          ...rendition,
          prompt: null,
        })),
      }).success,
    ).toBe(false);
    expect(
      visualProductionRecordSchema.safeParse({
        ...record,
        renditions: [record.renditions[0]!, record.renditions[0]!],
      }).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse({
        ...aiManifest,
        production: {
          ...aiManifest.production!,
          recordPath: "visual/production-records/nested/record.yml",
        },
      }).success,
    ).toBe(false);
  });

  it("rejects duplicate or invalid rendition contracts and unknown fields", () => {
    const approved = makeApprovedHeroManifestData();
    const firstRendition = approved.repositoryRenditions[0];
    if (!firstRendition) throw new Error("Missing repository rendition.");

    expect(
      assetManifestSchema.safeParse({
        ...approved,
        repositoryRenditions: [firstRendition, firstRendition],
      }).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse({
        ...approved,
        repositoryRenditions: [
          {
            ...firstRendition,
            buildPlan: {
              ...firstRendition.buildPlan,
              candidateWidths: [640, 960, 3200],
            },
          },
          approved.repositoryRenditions[1],
        ],
      }).success,
    ).toBe(false);
    expect(
      assetManifestSchema.safeParse({ ...approved, latest: true }).success,
    ).toBe(false);
  });
});
