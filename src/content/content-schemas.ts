import { URL } from "node:url";

import { z } from "astro/zod";

import { contentIdPattern } from "./content-id";

export const contentStatuses = [
  "draft",
  "editorial-review",
  "visual-review",
  "ready",
  "published",
  "archived",
] as const;

export const entryTypes = [
  "figure",
  "creature",
  "realm",
  "tale",
  "guide",
] as const;

export const traditionTypes = [
  "myth",
  "folklore",
  "religion",
  "literature",
  "historical-legend",
] as const;

export const sourceTypes = [
  "primary-text",
  "translation",
  "scholarship",
  "museum-or-library",
  "official-site",
  "fieldwork-or-community-archive",
  "reference-website",
  "modern-adaptation",
] as const;

export const sourceTitleLanguages = ["zh", "zh-Hans", "zh-Hant"] as const;

export const claimTypes = [
  "textual",
  "historical",
  "tradition",
  "translation",
  "interpretation",
] as const;

export const claimCertainties = [
  "verified",
  "disputed",
  "provisional",
] as const;

export const evidenceContexts = [
  "historical-tradition",
  "modern-reception",
] as const;

export const sourceRoles = [
  "primary",
  "scholarship",
  "translation",
  "object-record",
  "fieldwork",
  "adaptation",
  "reference",
] as const;

export const terminologyReviewStatuses = [
  "draft",
  "source-checked",
  "bilingual-approved",
] as const;

const nonEmptyStringSchema = z
  .string()
  .refine((value) => value.trim().length > 0, "Must not be empty.");

const nullableNonEmptyStringSchema = nonEmptyStringSchema.nullable();

export const contentIdSchema = z
  .string()
  .regex(contentIdPattern, "Must be a lowercase kebab-case stable ID.");

export const contentSlugSchema = z
  .string()
  .regex(contentIdPattern, "Must be a lowercase kebab-case URL segment.");

const isoDateSchema = z.iso.date();

const nullableIsoDateSchema = isoDateSchema.nullable();

const httpUrlSchema = z.string().refine((value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}, "Must be an HTTP or HTTPS URL.");

const uniqueIdArraySchema = z
  .array(contentIdSchema)
  .superRefine((values, ctx) => {
    const seen = new Set<string>();

    values.forEach((value, index) => {
      if (seen.has(value)) {
        ctx.addIssue({
          code: "custom",
          path: [index],
          message: `Duplicate stable ID: ${value}`,
        });
      }
      seen.add(value);
    });
  });

const uniqueStringArraySchema = z
  .array(nonEmptyStringSchema)
  .superRefine((values, ctx) => {
    const seen = new Set<string>();

    values.forEach((value, index) => {
      if (seen.has(value)) {
        ctx.addIssue({
          code: "custom",
          path: [index],
          message: `Duplicate value: ${value}`,
        });
      }
      seen.add(value);
    });
  });

const editorialStatuses = new Set([
  "editorial-review",
  "visual-review",
  "ready",
  "published",
  "archived",
]);

const visualStatuses = new Set([
  "visual-review",
  "ready",
  "published",
  "archived",
]);
const readyStatuses = new Set(["ready", "published", "archived"]);

export const entrySchema = z
  .strictObject({
    entryId: contentIdSchema,
    slug: contentSlugSchema,
    title: nonEmptyStringSchema,
    subtitle: nullableNonEmptyStringSchema,
    entryType: z.enum(entryTypes),
    traditionType: z.enum(traditionTypes).nullable(),
    nameZh: nullableNonEmptyStringSchema,
    pinyin: nullableNonEmptyStringSchema,
    aliases: uniqueStringArraySchema,
    opening: z.array(nonEmptyStringSchema).max(2),
    summary: nullableNonEmptyStringSchema,
    periodLabel: nullableNonEmptyStringSchema,
    earliestKnownSourceId: contentIdSchema.nullable(),
    earliestKnownClaimId: contentIdSchema.nullable(),
    sourceIds: uniqueIdArraySchema,
    claimIds: uniqueIdArraySchema,
    terminologyRecordIds: uniqueIdArraySchema,
    relatedEntryIds: uniqueIdArraySchema,
    heroAssetId: contentIdSchema.nullable(),
    publishedAt: nullableIsoDateSchema,
    updatedAt: nullableIsoDateSchema,
    lastFactCheckedAt: nullableIsoDateSchema,
    status: z.enum(contentStatuses),
  })
  .superRefine((entry, ctx) => {
    const hasChineseIdentity = entry.nameZh !== null;
    const hasPinyin = entry.pinyin !== null;

    if (hasChineseIdentity !== hasPinyin) {
      ctx.addIssue({
        code: "custom",
        path: [hasChineseIdentity ? "pinyin" : "nameZh"],
        message: "Chinese identity and pinyin must be provided together.",
      });
    }

    const hasEarliestSource = entry.earliestKnownSourceId !== null;
    const hasEarliestClaim = entry.earliestKnownClaimId !== null;

    if (hasEarliestSource !== hasEarliestClaim) {
      ctx.addIssue({
        code: "custom",
        path: [
          hasEarliestSource ? "earliestKnownClaimId" : "earliestKnownSourceId",
        ],
        message:
          "Earliest-known Source and Claim IDs must be provided together.",
      });
    }

    if (editorialStatuses.has(entry.status)) {
      if (entry.traditionType === null) {
        ctx.addIssue({
          code: "custom",
          path: ["traditionType"],
          message: "Editorial review requires a primary tradition type.",
        });
      }

      if (entry.opening.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["opening"],
          message: "Editorial review requires one or two opening paragraphs.",
        });
      }

      if (entry.summary === null) {
        ctx.addIssue({
          code: "custom",
          path: ["summary"],
          message: "Editorial review requires an 80–120 word summary.",
        });
      } else {
        const wordCount = entry.summary.trim().split(/\s+/u).length;
        if (wordCount < 80 || wordCount > 120) {
          ctx.addIssue({
            code: "custom",
            path: ["summary"],
            message: `Editorial review summary has ${wordCount} words; expected 80–120.`,
          });
        }
      }

      if (entry.sourceIds.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["sourceIds"],
          message: "Editorial review requires at least one real source.",
        });
      }
    }

    if (visualStatuses.has(entry.status) && entry.heroAssetId === null) {
      ctx.addIssue({
        code: "custom",
        path: ["heroAssetId"],
        message: "Visual review requires a hero asset ID.",
      });
    }

    if (readyStatuses.has(entry.status)) {
      if (entry.lastFactCheckedAt === null) {
        ctx.addIssue({
          code: "custom",
          path: ["lastFactCheckedAt"],
          message: "Ready content requires a fact-check date.",
        });
      }

      if (entry.claimIds.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["claimIds"],
          message: "Ready content requires at least one structured claim.",
        });
      }
    }

    if (
      (entry.status === "published" || entry.status === "archived") &&
      entry.publishedAt === null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["publishedAt"],
        message: "Published-lineage content requires a publication date.",
      });
    }

    if (
      entry.publishedAt !== null &&
      entry.updatedAt !== null &&
      entry.updatedAt < entry.publishedAt
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["updatedAt"],
        message: "Updated date cannot precede the publication date.",
      });
    }
  });

export const collectionSchema = z
  .strictObject({
    collectionId: contentIdSchema,
    slug: contentSlugSchema,
    title: nonEmptyStringSchema,
    titleZh: nullableNonEmptyStringSchema,
    pinyin: nullableNonEmptyStringSchema,
    description: nonEmptyStringSchema,
    featuredEntryId: contentIdSchema.nullable(),
    entryIds: uniqueIdArraySchema,
    status: z.enum(contentStatuses),
    heroAssetId: contentIdSchema.nullable(),
  })
  .superRefine((collection, ctx) => {
    const hasChineseTitle = collection.titleZh !== null;
    const hasPinyin = collection.pinyin !== null;

    if (hasChineseTitle !== hasPinyin) {
      ctx.addIssue({
        code: "custom",
        path: [hasChineseTitle ? "pinyin" : "titleZh"],
        message: "Chinese title and pinyin must be provided together.",
      });
    }

    if (
      readyStatuses.has(collection.status) &&
      collection.entryIds.length === 0
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["entryIds"],
        message: "Ready Collections require at least one Entry.",
      });
    }

    if (
      collection.featuredEntryId !== null &&
      !collection.entryIds.includes(collection.featuredEntryId)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["featuredEntryId"],
        message: "Featured entry must also appear in entryIds.",
      });
    }

    if (
      visualStatuses.has(collection.status) &&
      collection.heroAssetId === null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["heroAssetId"],
        message: "Visual review requires a hero asset ID.",
      });
    }
  });

export const sourceSchema = z
  .strictObject({
    sourceId: contentIdSchema,
    sourceType: z.enum(sourceTypes),
    title: nonEmptyStringSchema,
    titleZh: nullableNonEmptyStringSchema,
    titleZhLang: z.enum(sourceTitleLanguages).nullable(),
    authorOrOrganization: nullableNonEmptyStringSchema,
    publicationOrEdition: nullableNonEmptyStringSchema,
    editionBasisOrObjectId: nullableNonEmptyStringSchema,
    originalPeriod: nullableNonEmptyStringSchema,
    publicationYear: z.number().int().nullable(),
    url: httpUrlSchema.nullable(),
    accessedAt: nullableIsoDateSchema,
    language: nonEmptyStringSchema,
    translator: nullableNonEmptyStringSchema,
    pageOrSection: nullableNonEmptyStringSchema,
    usesDigitalImageEvidence: z.boolean(),
    rightsStatus: nullableNonEmptyStringSchema,
    rightsUrl: httpUrlSchema.nullable(),
    notes: nullableNonEmptyStringSchema,
  })
  .superRefine((source, ctx) => {
    const hasChineseTitle = source.titleZh !== null;
    const hasChineseTitleLanguage = source.titleZhLang !== null;
    const hasPublicationIdentity =
      source.publicationOrEdition !== null ||
      source.publicationYear !== null ||
      source.url !== null;

    if (hasChineseTitle !== hasChineseTitleLanguage) {
      ctx.addIssue({
        code: "custom",
        path: [hasChineseTitle ? "titleZhLang" : "titleZh"],
        message:
          "Chinese Source title and title language must be provided together.",
      });
    }
    const hasArchiveIdentity =
      source.editionBasisOrObjectId !== null ||
      source.publicationOrEdition !== null ||
      source.url !== null;

    if (source.url !== null) {
      if (source.authorOrOrganization === null) {
        ctx.addIssue({
          code: "custom",
          path: ["authorOrOrganization"],
          message: "A web source requires an author or organization.",
        });
      }

      if (source.accessedAt === null) {
        ctx.addIssue({
          code: "custom",
          path: ["accessedAt"],
          message: "A web source requires an access date.",
        });
      }
    }

    if (
      (source.sourceType === "official-site" ||
        source.sourceType === "reference-website") &&
      source.url === null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["url"],
        message: "Website source types require an HTTP(S) URL.",
      });
    }

    if (
      source.sourceType === "primary-text" &&
      source.publicationOrEdition === null &&
      source.editionBasisOrObjectId === null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["publicationOrEdition"],
        message:
          "A primary text requires a publication, edition, or edition basis.",
      });
    }

    if (
      source.sourceType === "scholarship" ||
      source.sourceType === "modern-adaptation"
    ) {
      if (source.authorOrOrganization === null) {
        ctx.addIssue({
          code: "custom",
          path: ["authorOrOrganization"],
          message: `${source.sourceType} requires an author or organization.`,
        });
      }

      if (!hasPublicationIdentity) {
        ctx.addIssue({
          code: "custom",
          path: ["publicationOrEdition"],
          message: `${source.sourceType} requires publication, year, or URL identity.`,
        });
      }
    }

    if (
      source.sourceType === "museum-or-library" ||
      source.sourceType === "fieldwork-or-community-archive"
    ) {
      if (source.authorOrOrganization === null) {
        ctx.addIssue({
          code: "custom",
          path: ["authorOrOrganization"],
          message: `${source.sourceType} requires a responsible institution or organization.`,
        });
      }

      if (!hasArchiveIdentity) {
        ctx.addIssue({
          code: "custom",
          path: ["editionBasisOrObjectId"],
          message: `${source.sourceType} requires an object, archive, edition, or URL identity.`,
        });
      }
    }

    if (source.rightsUrl !== null && source.rightsStatus === null) {
      ctx.addIssue({
        code: "custom",
        path: ["rightsStatus"],
        message: "A rights URL requires an explicit rights status.",
      });
    }

    if (source.usesDigitalImageEvidence) {
      if (source.rightsStatus === null) {
        ctx.addIssue({
          code: "custom",
          path: ["rightsStatus"],
          message: "Digital image evidence requires an explicit rights status.",
        });
      }

      if (source.rightsUrl === null) {
        ctx.addIssue({
          code: "custom",
          path: ["rightsUrl"],
          message: "Digital image evidence requires a rights URL.",
        });
      }
    }

    if (source.sourceType === "translation") {
      if (source.translator === null) {
        ctx.addIssue({
          code: "custom",
          path: ["translator"],
          message: "A translation requires a named translator.",
        });
      }

      if (source.publicationOrEdition === null) {
        ctx.addIssue({
          code: "custom",
          path: ["publicationOrEdition"],
          message: "A translation requires its publication or edition.",
        });
      }

      if (source.pageOrSection === null) {
        ctx.addIssue({
          code: "custom",
          path: ["pageOrSection"],
          message: "A translation requires a page or section locator.",
        });
      }

      if (source.rightsStatus === null) {
        ctx.addIssue({
          code: "custom",
          path: ["rightsStatus"],
          message: "A translation requires an explicit rights status.",
        });
      }

      if (source.rightsUrl === null) {
        ctx.addIssue({
          code: "custom",
          path: ["rightsUrl"],
          message: "A translation requires a rights URL.",
        });
      }
    }
  });

export const sourceLinkSchema = z.strictObject({
  sourceId: contentIdSchema,
  role: z.enum(sourceRoles),
  locator: nonEmptyStringSchema,
  note: nonEmptyStringSchema,
});

export const claimSchema = z.strictObject({
  claimId: contentIdSchema,
  entryId: contentIdSchema,
  claimType: z.enum(claimTypes),
  evidenceContext: z.enum(evidenceContexts),
  statement: nonEmptyStringSchema,
  certainty: z.enum(claimCertainties),
  sourceLinks: z.array(sourceLinkSchema).min(1),
});

export const terminologySchema = z
  .strictObject({
    termId: contentIdSchema,
    entryId: contentIdSchema,
    hanzi: nonEmptyStringSchema,
    pinyin: nonEmptyStringSchema,
    sourceContext: nonEmptyStringSchema,
    chosenEnglish: nonEmptyStringSchema,
    firstUseGloss: nonEmptyStringSchema,
    alternativesRejected: uniqueStringArraySchema,
    rationale: nonEmptyStringSchema,
    sourceIds: uniqueIdArraySchema,
    reviewStatus: z.enum(terminologyReviewStatuses),
  })
  .superRefine((term, ctx) => {
    if (term.reviewStatus !== "draft" && term.sourceIds.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["sourceIds"],
        message: "Reviewed terminology requires at least one source.",
      });
    }
  });

export type EntryData = z.infer<typeof entrySchema>;
export type CollectionData = z.infer<typeof collectionSchema>;
export type SourceData = z.infer<typeof sourceSchema>;
export type ClaimData = z.infer<typeof claimSchema>;
export type TerminologyData = z.infer<typeof terminologySchema>;
export type ContentStatus = (typeof contentStatuses)[number];
