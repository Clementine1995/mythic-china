import { describe, expect, it } from "vitest";

import {
  claimSchema,
  collectionSchema,
  entrySchema,
  sourceSchema,
  terminologySchema,
} from "../../src/content/content-schemas";
import {
  makeClaimData,
  makeCollectionData,
  makeEntryData,
  makeSourceData,
  makeTerminologyData,
} from "./fixtures";

const eightyWordSummary = Array.from(
  { length: 80 },
  (_, index) => `word${index + 1}`,
).join(" ");

describe("content schemas", () => {
  it("accepts all five minimal valid record shapes", () => {
    expect(entrySchema.parse(makeEntryData()).status).toBe("draft");
    expect(collectionSchema.parse(makeCollectionData()).status).toBe("draft");
    expect(sourceSchema.parse(makeSourceData()).sourceType).toBe(
      "primary-text",
    );
    expect(claimSchema.parse(makeClaimData()).certainty).toBe("verified");
    expect(terminologySchema.parse(makeTerminologyData()).reviewStatus).toBe(
      "draft",
    );
  });

  it("requires draft keys to be explicit instead of applying defaults", () => {
    const missingSummary: Partial<ReturnType<typeof makeEntryData>> = {
      ...makeEntryData(),
    };
    delete missingSummary.summary;

    expect(entrySchema.safeParse(missingSummary).success).toBe(false);
    expect(entrySchema.safeParse(makeEntryData()).success).toBe(true);
  });

  it("requires explicit evidence context and paired earliest-known pointers", () => {
    const missingContext: Partial<ReturnType<typeof makeClaimData>> = {
      ...makeClaimData(),
    };
    delete missingContext.evidenceContext;

    expect(claimSchema.safeParse(missingContext).success).toBe(false);
    expect(
      claimSchema.safeParse({
        ...makeClaimData(),
        evidenceContext: "unbounded",
      }).success,
    ).toBe(false);
    expect(
      claimSchema.safeParse({
        ...makeClaimData(),
        sourceLinks: [
          {
            sourceId: "official-source",
            role: "reference",
            locator: "page section",
            note: "Supports a bounded modern-reception statement.",
          },
        ],
      }).success,
    ).toBe(true);

    expect(
      entrySchema.safeParse(
        makeEntryData({ earliestKnownSourceId: "source-one" }),
      ).success,
    ).toBe(false);
    expect(
      entrySchema.safeParse(
        makeEntryData({ earliestKnownClaimId: "claim-one" }),
      ).success,
    ).toBe(false);
    expect(
      entrySchema.safeParse(
        makeEntryData({
          earliestKnownSourceId: "source-one",
          earliestKnownClaimId: "claim-one",
        }),
      ).success,
    ).toBe(true);
  });

  it("rejects unknown fields and one-sided Chinese identity", () => {
    expect(
      entrySchema.safeParse({ ...makeEntryData(), collectionIds: [] }).success,
    ).toBe(false);
    expect(entrySchema.safeParse(makeEntryData({ pinyin: null })).success).toBe(
      false,
    );
  });

  it("enforces editorial-review requirements without inventing draft facts", () => {
    const validEditorial = makeEntryData({
      traditionType: "folklore",
      opening: ["A bounded editorial opening."],
      summary: eightyWordSummary,
      sourceIds: ["source-one"],
      status: "editorial-review",
    });

    expect(entrySchema.safeParse(validEditorial).success).toBe(true);
    expect(
      entrySchema.safeParse({ ...validEditorial, traditionType: null }).success,
    ).toBe(false);
    expect(
      entrySchema.safeParse({ ...validEditorial, opening: [] }).success,
    ).toBe(false);
    expect(
      entrySchema.safeParse({ ...validEditorial, summary: "too short" })
        .success,
    ).toBe(false);
    expect(
      entrySchema.safeParse({ ...validEditorial, sourceIds: [] }).success,
    ).toBe(false);
  });

  it("enforces visual, ready, and published record gates", () => {
    const visual = makeEntryData({
      traditionType: "folklore",
      opening: ["A bounded editorial opening."],
      summary: eightyWordSummary,
      sourceIds: ["source-one"],
      heroAssetId: "asset-one",
      status: "visual-review",
    });
    const ready = {
      ...visual,
      claimIds: ["claim-one"],
      lastFactCheckedAt: "2026-08-27",
      status: "ready" as const,
    };

    expect(
      entrySchema.safeParse({ ...visual, heroAssetId: null }).success,
    ).toBe(false);
    expect(entrySchema.safeParse(ready).success).toBe(true);
    expect(
      entrySchema.safeParse({ ...ready, lastFactCheckedAt: null }).success,
    ).toBe(false);
    expect(entrySchema.safeParse({ ...ready, claimIds: [] }).success).toBe(
      false,
    );
    expect(
      entrySchema.safeParse({ ...ready, status: "published" }).success,
    ).toBe(false);
    expect(
      entrySchema.safeParse({
        ...ready,
        status: "published",
        publishedAt: "2026-08-27",
      }).success,
    ).toBe(true);
  });

  it("validates Collection identity pairs, membership, duplicates, and assets", () => {
    expect(
      collectionSchema.safeParse(makeCollectionData({ pinyin: null })).success,
    ).toBe(false);
    expect(
      collectionSchema.safeParse(
        makeCollectionData({ entryIds: ["zhong-kui", "zhong-kui"] }),
      ).success,
    ).toBe(false);
    expect(
      collectionSchema.safeParse(
        makeCollectionData({ featuredEntryId: "not-a-member" }),
      ).success,
    ).toBe(false);
    expect(
      collectionSchema.safeParse(
        makeCollectionData({ status: "visual-review", heroAssetId: null }),
      ).success,
    ).toBe(false);
    expect(
      collectionSchema.safeParse(
        makeCollectionData({ entryIds: [], featuredEntryId: null }),
      ).success,
    ).toBe(true);
    expect(
      collectionSchema.safeParse(
        makeCollectionData({
          status: "ready",
          entryIds: [],
          featuredEntryId: null,
          heroAssetId: "asset-collection-hero",
        }),
      ).success,
    ).toBe(false);
    expect(
      collectionSchema.safeParse(
        makeCollectionData({
          status: "ready",
          entryIds: ["zhong-kui"],
          featuredEntryId: "zhong-kui",
          heroAssetId: "asset-collection-hero",
        }),
      ).success,
    ).toBe(true);
  });

  it("keeps Source types closed and traceable", () => {
    expect(sourceSchema.safeParse(makeSourceData()).success).toBe(true);
    expect(
      sourceSchema.safeParse(
        makeSourceData({
          publicationOrEdition: null,
          editionBasisOrObjectId: null,
        }),
      ).success,
    ).toBe(false);
    expect(
      sourceSchema.safeParse(
        makeSourceData({
          sourceType: "official-site",
          url: "https://example.org/source",
          authorOrOrganization: "Example institution",
          accessedAt: "2026-08-27",
        }),
      ).success,
    ).toBe(true);
    expect(
      sourceSchema.safeParse(
        makeSourceData({
          sourceType: "official-site",
          url: "https://example.org/source",
        }),
      ).success,
    ).toBe(false);
    expect(
      sourceSchema.safeParse({
        ...makeSourceData(),
        sourceType: "social-media",
      }).success,
    ).toBe(false);
    expect(
      sourceSchema.safeParse(
        makeSourceData({
          sourceType: "scholarship",
          authorOrOrganization: "Example Scholar",
          publicationYear: 2024,
        }),
      ).success,
    ).toBe(true);
    expect(
      sourceSchema.safeParse(
        makeSourceData({
          sourceType: "scholarship",
          publicationOrEdition: null,
        }),
      ).success,
    ).toBe(false);
    expect(
      sourceSchema.safeParse(
        makeSourceData({
          sourceType: "museum-or-library",
          authorOrOrganization: "Example Museum",
          publicationOrEdition: null,
          editionBasisOrObjectId: "object-123",
        }),
      ).success,
    ).toBe(true);
    expect(
      sourceSchema.safeParse(
        makeSourceData({
          sourceType: "fieldwork-or-community-archive",
          authorOrOrganization: "Example Community Archive",
          publicationOrEdition: null,
          editionBasisOrObjectId: "archive-123",
        }),
      ).success,
    ).toBe(true);
    expect(
      sourceSchema.safeParse(
        makeSourceData({
          sourceType: "modern-adaptation",
          authorOrOrganization: "Example Studio",
          publicationOrEdition: null,
          publicationYear: 2024,
        }),
      ).success,
    ).toBe(true);
    expect(
      sourceSchema.safeParse(makeSourceData({ rightsStatus: "reviewed" }))
        .success,
    ).toBe(true);
    expect(
      sourceSchema.safeParse(makeSourceData({ sourceType: "translation" }))
        .success,
    ).toBe(false);
    const translation = makeSourceData({
      sourceType: "translation",
      translator: "Example Translator",
      publicationOrEdition: "Example Translation, first edition",
      pageOrSection: "page 12",
      rightsStatus: "citation-only",
      rightsUrl: "https://example.org/rights",
    });
    expect(sourceSchema.safeParse(translation).success).toBe(true);
    for (const requiredField of [
      "translator",
      "publicationOrEdition",
      "pageOrSection",
    ] as const) {
      expect(
        sourceSchema.safeParse({
          ...translation,
          [requiredField]: null,
        }).success,
        requiredField,
      ).toBe(false);
    }
    expect(
      sourceSchema.safeParse(
        makeSourceData({ rightsUrl: "https://example.org/rights" }),
      ).success,
    ).toBe(false);
  });

  it("accepts ISO calendar strings and rejects Date or timestamp coercion", () => {
    expect(
      sourceSchema.parse(makeSourceData({ accessedAt: "2028-02-29" }))
        .accessedAt,
    ).toBe("2028-02-29");
    expect(
      sourceSchema.safeParse(makeSourceData({ accessedAt: "2026-02-29" }))
        .success,
    ).toBe(false);
    expect(
      sourceSchema.safeParse(
        makeSourceData({ accessedAt: "2026-08-27T23:30:00-05:00" }),
      ).success,
    ).toBe(false);
    expect(
      sourceSchema.safeParse({
        ...makeSourceData(),
        accessedAt: new Date("2026-08-27T00:00:00Z"),
      }).success,
    ).toBe(false);
    expect(
      entrySchema.safeParse({
        ...makeEntryData(),
        updatedAt: new Date("2026-08-27T23:30:00-05:00"),
      }).success,
    ).toBe(false);
  });

  it("does not let archived status bypass published-lineage gates", () => {
    expect(
      entrySchema.safeParse(makeEntryData({ status: "archived" })).success,
    ).toBe(false);
    expect(
      collectionSchema.safeParse(makeCollectionData({ status: "archived" }))
        .success,
    ).toBe(false);
  });

  it("requires Claim evidence structure and reviewed terminology sources", () => {
    expect(
      claimSchema.safeParse(makeClaimData({ sourceLinks: [] })).success,
    ).toBe(false);
    expect(
      claimSchema.safeParse({
        ...makeClaimData(),
        certainty: "certain",
      }).success,
    ).toBe(false);
    expect(
      terminologySchema.safeParse(
        makeTerminologyData({ reviewStatus: "source-checked", sourceIds: [] }),
      ).success,
    ).toBe(false);
    expect(
      terminologySchema.safeParse(makeTerminologyData({ sourceIds: [] }))
        .success,
    ).toBe(true);
  });
});
