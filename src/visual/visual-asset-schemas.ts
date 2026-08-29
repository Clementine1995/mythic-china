import { URL } from "node:url";
import { posix, win32 } from "node:path";

import { z } from "astro/zod";

import { contentIdSchema } from "../content/content-schemas";

export const visualOwnerTypes = ["entry", "collection", "global"] as const;
export const visualRoles = [
  "hero",
  "lead",
  "inline",
  "page-atmosphere",
  "og",
  "social",
] as const;
export const renditionUsages = [
  "hero-desktop",
  "hero-mobile",
  "article-lead",
  "open-graph",
  "social-portrait",
  "social-story",
  "inline",
  "page-atmosphere",
] as const;
export const visualRecordStatuses = [
  "draft",
  "in-review",
  "approved",
  "archived",
] as const;
export const referenceRightsStatuses = [
  "research-only",
  "public-domain",
  "licensed",
  "permission",
  "unknown",
] as const;
export const repositoryImageFormats = [
  "avif",
  "webp",
  "png",
  "jpg",
  "jpeg",
] as const;
export const productionMethods = [
  "in-house-original",
  "commissioned-original",
  "public-domain-reuse",
  "licensed-reuse",
  "ai-assisted",
] as const;
export const productionInputImageKinds = [
  "project-generated-anchor",
  "authorized-reference",
  "edit-target",
] as const;

const nonEmptyStringSchema = z
  .string()
  .refine((value) => value.trim().length > 0, "Must not be empty.");
const nullableNonEmptyStringSchema = nonEmptyStringSchema.nullable();
const positiveIntegerSchema = z.number().int().positive();
const sha256Schema = z
  .string()
  .regex(/^[a-f0-9]{64}$/u, "Must be a lowercase SHA-256 value.");
const utcTimestampSchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/u,
    "Must be a quoted UTC RFC 3339 timestamp with second precision.",
  )
  .refine((value) => {
    const parsed = new Date(value);
    return (
      !Number.isNaN(parsed.valueOf()) &&
      parsed.toISOString() === value.replace(/Z$/u, ".000Z")
    );
  }, "Must be a real UTC timestamp.");
const nullableUtcTimestampSchema = utcTimestampSchema.nullable();
const httpUrlSchema = z.string().refine((value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}, "Must be an HTTP or HTTPS URL.");
const logicalUriSchema = nonEmptyStringSchema.refine((value) => {
  try {
    const url = new URL(value);
    return (
      /^[a-z][a-z0-9+.-]*:\/\//iu.test(value) &&
      url.protocol !== "file:" &&
      !value.includes("\\")
    );
  } catch {
    return false;
  }
}, "Must be a non-file logical URI with an explicit scheme.");
const productionRecordIdSchema = contentIdSchema.refine(
  (value) => /^production-[a-z0-9]+(?:-[a-z0-9]+)*-v[1-9]\d*$/u.test(value),
  "Production record IDs must use production-...-vN.",
);

function isCanonicalPathWithin(value: string, prefix: string): boolean {
  return (
    !value.includes("\\") &&
    !posix.isAbsolute(value) &&
    !win32.isAbsolute(value) &&
    !value.includes(":") &&
    value.startsWith(`${prefix}/`) &&
    posix.normalize(value) === value &&
    !value.split("/").includes("..")
  );
}

function isDirectYamlFileWithin(value: string, prefix: string): boolean {
  return (
    isCanonicalPathWithin(value, prefix) &&
    posix.dirname(value) === prefix &&
    posix.extname(value) === ".yml"
  );
}

function addDuplicateIssues(
  values: readonly string[],
  ctx: z.RefinementCtx,
): void {
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
}

const uniqueContentIdArraySchema = z
  .array(contentIdSchema)
  .superRefine(addDuplicateIssues);
const uniqueNonEmptyStringArraySchema = z
  .array(nonEmptyStringSchema)
  .superRefine(addDuplicateIssues);
const uniqueUsageArraySchema = z
  .array(z.enum(renditionUsages))
  .superRefine(addDuplicateIssues);
const uniqueFormatArraySchema = z
  .array(z.enum(repositoryImageFormats))
  .superRefine(addDuplicateIssues);
const uniquePositiveIntegerArraySchema = z
  .array(positiveIntegerSchema)
  .superRefine((values, ctx) => addDuplicateIssues(values.map(String), ctx));

export const roleUsageContract = {
  hero: {
    required: ["hero-desktop", "hero-mobile"],
    optional: [],
  },
  lead: { required: ["article-lead"], optional: [] },
  inline: { required: ["inline"], optional: [] },
  "page-atmosphere": {
    required: ["page-atmosphere"],
    optional: [],
  },
  og: { required: ["open-graph"], optional: [] },
  social: { required: ["social-portrait"], optional: ["social-story"] },
} as const satisfies Record<
  (typeof visualRoles)[number],
  {
    required: readonly (typeof renditionUsages)[number][];
    optional: readonly (typeof renditionUsages)[number][];
  }
>;

const responsiveUsages = new Set<(typeof renditionUsages)[number]>([
  "hero-desktop",
  "hero-mobile",
  "article-lead",
  "inline",
  "page-atmosphere",
]);
const responsiveWidths = [640, 960, 1440, 1920] as const;

export const focalPointSchema = z.strictObject({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
});

export const renditionBuildPlanSchema = z.strictObject({
  mode: z.enum(["responsive", "exact-canvas"]),
  formats: uniqueFormatArraySchema.min(1),
  candidateWidths: uniquePositiveIntegerArraySchema.min(1),
  allowUpscale: z.boolean(),
});

const targetCanvasSchema = z
  .strictObject({
    usage: z.enum(renditionUsages),
    widthPx: positiveIntegerSchema,
    heightPx: positiveIntegerSchema,
    compositionGoal: nonEmptyStringSchema,
    safeArea: nonEmptyStringSchema,
    focalPointGoal: focalPointSchema,
    buildPlan: renditionBuildPlanSchema,
  })
  .superRefine((canvas, ctx) => {
    if (canvas.buildPlan.allowUpscale) {
      ctx.addIssue({
        code: "custom",
        path: ["buildPlan", "allowUpscale"],
        message: "Visual asset build plans must prohibit upscaling.",
      });
    }

    const shouldBeResponsive = responsiveUsages.has(canvas.usage);
    const expectedMode = shouldBeResponsive ? "responsive" : "exact-canvas";
    if (canvas.buildPlan.mode !== expectedMode) {
      ctx.addIssue({
        code: "custom",
        path: ["buildPlan", "mode"],
        message: `${canvas.usage} requires ${expectedMode} mode.`,
      });
    }

    const expectedFormats = ["avif", "webp"];
    if (
      shouldBeResponsive &&
      [...canvas.buildPlan.formats].sort().join("|") !==
        [...expectedFormats].sort().join("|")
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["buildPlan", "formats"],
        message: "Responsive renditions require exactly AVIF and WebP outputs.",
      });
    }

    const expectedWidths = shouldBeResponsive
      ? responsiveWidths.filter((width) => width <= canvas.widthPx)
      : [canvas.widthPx];
    if (
      canvas.buildPlan.candidateWidths.join("|") !== expectedWidths.join("|")
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["buildPlan", "candidateWidths"],
        message: `Candidate widths must be exactly ${expectedWidths.join(", ")} for this canvas.`,
      });
    }
  });

const targetSlotSchema = z
  .strictObject({
    role: z.enum(visualRoles),
    slotId: contentIdSchema,
    requiredUsages: uniqueUsageArraySchema,
    optionalUsages: uniqueUsageArraySchema,
    canvas: z.array(targetCanvasSchema).min(1),
  })
  .superRefine((target, ctx) => {
    const contract = roleUsageContract[target.role];
    const expectedRequired = [...contract.required].sort().join("|");
    const actualRequired = [...target.requiredUsages].sort().join("|");
    if (actualRequired !== expectedRequired) {
      ctx.addIssue({
        code: "custom",
        path: ["requiredUsages"],
        message: `${target.role} requires exactly: ${contract.required.join(", ")}.`,
      });
    }

    const allowedOptional = new Set(contract.optional);
    target.optionalUsages.forEach((usage, index) => {
      if (!allowedOptional.has(usage as never)) {
        ctx.addIssue({
          code: "custom",
          path: ["optionalUsages", index],
          message: `${usage} is not optional for role ${target.role}.`,
        });
      }
    });

    const declaredUsages = new Set([
      ...target.requiredUsages,
      ...target.optionalUsages,
    ]);
    const canvasUsages = target.canvas.map((canvas) => canvas.usage);
    addDuplicateIssues(canvasUsages, ctx);
    target.requiredUsages.forEach((usage) => {
      if (!canvasUsages.includes(usage)) {
        ctx.addIssue({
          code: "custom",
          path: ["canvas"],
          message: `Required usage ${usage} needs a canvas contract.`,
        });
      }
    });
    target.canvas.forEach((canvas, index) => {
      if (!declaredUsages.has(canvas.usage)) {
        ctx.addIssue({
          code: "custom",
          path: ["canvas", index, "usage"],
          message: `Canvas usage ${canvas.usage} is not declared by this target.`,
        });
      }
    });
  });

const verifiedVisualElementSchema = z.strictObject({
  elementId: contentIdSchema,
  statement: nonEmptyStringSchema,
  claimIds: uniqueContentIdArraySchema.min(1),
});
const inferredVisualElementSchema = z.strictObject({
  elementId: contentIdSchema,
  statement: nonEmptyStringSchema,
  rationale: nonEmptyStringSchema,
});
const inventedVisualElementSchema = z.strictObject({
  elementId: contentIdSchema,
  statement: nonEmptyStringSchema,
});

const referenceAssetSchema = z
  .strictObject({
    referenceId: contentIdSchema,
    url: httpUrlSchema,
    organization: nonEmptyStringSchema,
    creator: nonEmptyStringSchema,
    rightsStatus: z.enum(referenceRightsStatuses),
    rightsUrl: httpUrlSchema.nullable(),
    licenseOrPermissionId: nullableNonEmptyStringSchema,
    notes: nonEmptyStringSchema,
  })
  .superRefine((reference, ctx) => {
    if (
      ["licensed", "permission"].includes(reference.rightsStatus) &&
      reference.licenseOrPermissionId === null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["licenseOrPermissionId"],
        message: `${reference.rightsStatus} references require a license or permission identity.`,
      });
    }

    if (reference.rightsStatus !== "unknown" && reference.rightsUrl === null) {
      ctx.addIssue({
        code: "custom",
        path: ["rightsUrl"],
        message: `${reference.rightsStatus} references require an auditable rights URL.`,
      });
    }
  });

export const visualBriefSchema = z
  .strictObject({
    briefId: contentIdSchema,
    version: positiveIntegerSchema,
    status: z.enum(visualRecordStatuses),
    ownerType: z.enum(visualOwnerTypes),
    ownerId: contentIdSchema,
    purpose: contentIdSchema,
    approvedBy: nullableNonEmptyStringSchema,
    approvedAt: nullableUtcTimestampSchema,
    notes: nonEmptyStringSchema,
    primaryReferenceFamily: nonEmptyStringSchema,
    period: nonEmptyStringSchema,
    region: nonEmptyStringSchema,
    medium: nonEmptyStringSchema,
    culturalContext: z.array(nonEmptyStringSchema).min(1),
    targetSlots: z.array(targetSlotSchema).min(1),
    visualElements: z.strictObject({
      verified: z.array(verifiedVisualElementSchema),
      inferred: z.array(inferredVisualElementSchema),
      invented: z.array(inventedVisualElementSchema),
    }),
    referenceAssets: z.array(referenceAssetSchema),
    composition: z.strictObject({
      continuity: nonEmptyStringSchema,
      hierarchy: nonEmptyStringSchema,
      colorDirection: nonEmptyStringSchema,
      lightingDirection: nonEmptyStringSchema,
      textPolicy: nonEmptyStringSchema,
    }),
    excludedMotifs: z.array(nonEmptyStringSchema).min(1),
    openDecisions: z.array(nonEmptyStringSchema),
  })
  .superRefine((brief, ctx) => {
    const expectedBriefId = `brief-${brief.ownerId}-${brief.purpose}-v${brief.version}`;
    if (brief.briefId !== expectedBriefId) {
      ctx.addIssue({
        code: "custom",
        path: ["briefId"],
        message: `briefId must be ${expectedBriefId}.`,
      });
    }

    const isApprovedLineage =
      brief.status === "approved" || brief.status === "archived";
    for (const [field, value] of [
      ["approvedBy", brief.approvedBy],
      ["approvedAt", brief.approvedAt],
    ] as const) {
      if (isApprovedLineage && value === null) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message:
            "Approved-lineage briefs require real approval identity and time.",
        });
      }
      if (!isApprovedLineage && value !== null) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message:
            "Unapproved briefs must not claim approval identity or time.",
        });
      }
    }

    if (
      isApprovedLineage &&
      brief.referenceAssets.some(
        (reference) => reference.rightsStatus === "unknown",
      )
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["referenceAssets"],
        message:
          "Approved-lineage briefs cannot retain unknown reference rights.",
      });
    }

    const targetKeys = brief.targetSlots.map(
      (target) => `${target.role}/${target.slotId}`,
    );
    addDuplicateIssues(targetKeys, ctx);

    const elementIds = [
      ...brief.visualElements.verified,
      ...brief.visualElements.inferred,
      ...brief.visualElements.invented,
    ].map((element) => element.elementId);
    addDuplicateIssues(elementIds, ctx);
    addDuplicateIssues(
      brief.referenceAssets.map((reference) => reference.referenceId),
      ctx,
    );
  });

const masterRenditionSchema = z.strictObject({
  logicalUri: logicalUriSchema,
  usage: z.enum(renditionUsages),
  widthPx: positiveIntegerSchema,
  heightPx: positiveIntegerSchema,
  sha256: sha256Schema,
});

const repositoryRenditionSchema = z
  .strictObject({
    usage: z.enum(renditionUsages),
    path: nonEmptyStringSchema,
    format: z.enum(repositoryImageFormats),
    widthPx: positiveIntegerSchema,
    heightPx: positiveIntegerSchema,
    sha256: sha256Schema,
    focalPoint: focalPointSchema,
    buildPlan: renditionBuildPlanSchema,
  })
  .superRefine((rendition, ctx) => {
    const shouldBeResponsive = responsiveUsages.has(rendition.usage);
    const expectedMode = shouldBeResponsive ? "responsive" : "exact-canvas";
    if (rendition.buildPlan.mode !== expectedMode) {
      ctx.addIssue({
        code: "custom",
        path: ["buildPlan", "mode"],
        message: `${rendition.usage} requires ${expectedMode} mode.`,
      });
    }
    if (rendition.buildPlan.allowUpscale) {
      ctx.addIssue({
        code: "custom",
        path: ["buildPlan", "allowUpscale"],
        message: "Repository renditions must prohibit upscaling.",
      });
    }

    const expectedFormats = ["avif", "webp"];
    if (
      shouldBeResponsive &&
      [...rendition.buildPlan.formats].sort().join("|") !==
        [...expectedFormats].sort().join("|")
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["buildPlan", "formats"],
        message: "Responsive renditions require exactly AVIF and WebP outputs.",
      });
    }

    const expectedWidths = shouldBeResponsive
      ? responsiveWidths.filter((width) => width <= rendition.widthPx)
      : [rendition.widthPx];
    if (
      rendition.buildPlan.candidateWidths.join("|") !== expectedWidths.join("|")
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["buildPlan", "candidateWidths"],
        message: `Candidate widths must be exactly ${expectedWidths.join(", ")} for this source width.`,
      });
    }
  });

const publicationRightsSchema = z
  .strictObject({
    status: z.enum(["pending", "approved", "rejected"]),
    basis: z
      .enum([
        "in-house-original",
        "commission-contract",
        "public-domain",
        "license",
        "permission",
      ])
      .nullable(),
    rightsHolder: nullableNonEmptyStringSchema,
    licenseOrPermissionId: nullableNonEmptyStringSchema,
    rightsUrl: httpUrlSchema.nullable(),
    notes: nullableNonEmptyStringSchema,
  })
  .superRefine((rights, ctx) => {
    if (rights.status !== "approved") return;

    if (rights.basis === null || rights.notes === null) {
      ctx.addIssue({
        code: "custom",
        path: [rights.basis === null ? "basis" : "notes"],
        message: "Approved publication rights require a basis and notes.",
      });
    }
    if (rights.basis !== "public-domain" && rights.rightsHolder === null) {
      ctx.addIssue({
        code: "custom",
        path: ["rightsHolder"],
        message: "Approved non-public-domain rights require a rights holder.",
      });
    }
    if (
      ["commission-contract", "license", "permission"].includes(
        rights.basis ?? "",
      ) &&
      rights.licenseOrPermissionId === null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["licenseOrPermissionId"],
        message:
          "This rights basis requires a contract, license, or permission identity.",
      });
    }
    if (
      ["public-domain", "license", "permission"].includes(rights.basis ?? "") &&
      rights.rightsUrl === null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["rightsUrl"],
        message: "This rights basis requires an auditable rights URL.",
      });
    }
  });

const workflowSchema = z
  .strictObject({
    workflowId: contentIdSchema,
    path: nonEmptyStringSchema,
    sha256: sha256Schema,
    modelRegistryIds: uniqueContentIdArraySchema.min(1),
  })
  .superRefine((workflow, ctx) => {
    if (!isCanonicalPathWithin(workflow.path, "visual/workflows")) {
      ctx.addIssue({
        code: "custom",
        path: ["path"],
        message: "Workflow paths must remain under visual/workflows/.",
      });
    }
  });

const productionSchema = z
  .strictObject({
    method: z.enum(productionMethods),
    tool: nullableNonEmptyStringSchema,
    recordPath: nonEmptyStringSchema,
    workflow: workflowSchema.nullable(),
  })
  .superRefine((production, ctx) => {
    if (
      !isDirectYamlFileWithin(
        production.recordPath,
        "visual/production-records",
      )
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["recordPath"],
        message:
          "Production record paths must be direct .yml files under visual/production-records/.",
      });
    }
  });

const productionInputImageSchema = z.strictObject({
  kind: z.enum(productionInputImageKinds),
  sha256: sha256Schema,
  rightsNotes: nonEmptyStringSchema,
});

const productionRawOutputSchema = z.strictObject({
  format: z.enum(repositoryImageFormats),
  widthPx: positiveIntegerSchema,
  heightPx: positiveIntegerSchema,
  sha256: sha256Schema,
});

const productionProcessingSchema = z.strictObject({
  tool: nonEmptyStringSchema,
  version: nullableNonEmptyStringSchema,
  operations: uniqueNonEmptyStringArraySchema.min(1),
});

const productionRecordRenditionSchema = z
  .strictObject({
    manifestId: contentIdSchema,
    usage: z.enum(renditionUsages),
    prompt: nullableNonEmptyStringSchema,
    receivedAt: utcTimestampSchema,
    inputImages: z.array(productionInputImageSchema),
    rawOutput: productionRawOutputSchema,
    master: masterRenditionSchema,
    processing: productionProcessingSchema,
    verifiedAt: utcTimestampSchema,
  })
  .superRefine((rendition, ctx) => {
    if (rendition.master.usage !== rendition.usage) {
      ctx.addIssue({
        code: "custom",
        path: ["master", "usage"],
        message: "Production rendition and master usage must match.",
      });
    }
    addDuplicateIssues(
      rendition.inputImages.map((input) => input.sha256),
      ctx,
    );
  });

export const visualProductionRecordSchema = z
  .strictObject({
    productionRecordId: productionRecordIdSchema,
    briefId: contentIdSchema,
    method: z.enum(productionMethods),
    tool: nullableNonEmptyStringSchema,
    modelId: nullableNonEmptyStringSchema,
    modelNotes: nullableNonEmptyStringSchema,
    termsUrl: httpUrlSchema.nullable(),
    rightsNotes: nonEmptyStringSchema,
    recordedAt: utcTimestampSchema,
    renditions: z.array(productionRecordRenditionSchema).min(1),
    notes: nonEmptyStringSchema,
  })
  .superRefine((record, ctx) => {
    const isAiAssisted = record.method === "ai-assisted";
    for (const [field, value] of [
      ["tool", record.tool],
      ["modelNotes", record.modelNotes],
      ["termsUrl", record.termsUrl],
    ] as const) {
      if (isAiAssisted && value === null) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: `AI-assisted production records require ${field}.`,
        });
      }
    }
    if (
      !isAiAssisted &&
      (record.modelId !== null || record.modelNotes !== null)
    ) {
      ctx.addIssue({
        code: "custom",
        path: [record.modelId !== null ? "modelId" : "modelNotes"],
        message: "Non-AI production records must not claim model metadata.",
      });
    }
    record.renditions.forEach((rendition, index) => {
      if (isAiAssisted && rendition.prompt === null) {
        ctx.addIssue({
          code: "custom",
          path: ["renditions", index, "prompt"],
          message: "AI-assisted renditions require the actual prompt.",
        });
      }
      if (!isAiAssisted && rendition.prompt !== null) {
        ctx.addIssue({
          code: "custom",
          path: ["renditions", index, "prompt"],
          message: "Non-AI production renditions must use a null prompt.",
        });
      }
    });
    addDuplicateIssues(
      record.renditions.map(
        (rendition) => `${rendition.manifestId}/${rendition.usage}`,
      ),
      ctx,
    );
    addDuplicateIssues(
      record.renditions.map((rendition) => rendition.master.logicalUri),
      ctx,
    );
  });

const reviewSchema = z
  .strictObject({
    status: z.enum([
      "pending",
      "approved",
      "changes-requested",
      "not-applicable",
    ]),
    reviewedBy: nullableNonEmptyStringSchema,
    reviewedAt: nullableUtcTimestampSchema,
    notes: nullableNonEmptyStringSchema,
  })
  .superRefine((review, ctx) => {
    const isPending = review.status === "pending";
    for (const [field, value] of [
      ["reviewedBy", review.reviewedBy],
      ["reviewedAt", review.reviewedAt],
      ["notes", review.notes],
    ] as const) {
      if (isPending && value !== null) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: "Pending reviews must not claim completed review details.",
        });
      }
      if (!isPending && value === null) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message:
            "Completed review decisions require reviewer, time, and notes.",
        });
      }
    }
  });

export const assetManifestSchema = z
  .strictObject({
    assetId: contentIdSchema,
    manifestId: contentIdSchema,
    ownerType: z.enum(visualOwnerTypes),
    ownerId: contentIdSchema,
    role: z.enum(visualRoles),
    slotId: contentIdSchema,
    version: positiveIntegerSchema,
    status: z.enum(visualRecordStatuses),
    isCurrent: z.boolean(),
    briefId: contentIdSchema.nullable(),
    accessibilityMode: z.enum(["informative", "decorative"]).nullable(),
    masterRenditions: z.array(masterRenditionSchema),
    repositoryRenditions: z.array(repositoryRenditionSchema),
    referenceAssetIds: uniqueContentIdArraySchema,
    publicationRights: publicationRightsSchema,
    visualElementIds: uniqueContentIdArraySchema,
    production: productionSchema.nullable(),
    humanEdits: uniqueNonEmptyStringArraySchema,
    reviews: z.strictObject({
      cultural: reviewSchema,
      rights: reviewSchema,
      visual: reviewSchema,
      accessibility: reviewSchema,
      language: reviewSchema,
    }),
    alt: z.string().nullable(),
    caption: nullableNonEmptyStringSchema,
    credit: nullableNonEmptyStringSchema,
    aiDisclosure: nullableNonEmptyStringSchema,
  })
  .superRefine((manifest, ctx) => {
    const expectedAssetId = `asset-${manifest.ownerId}-${manifest.role}-${manifest.slotId}`;
    if (manifest.assetId !== expectedAssetId) {
      ctx.addIssue({
        code: "custom",
        path: ["assetId"],
        message: `assetId must be ${expectedAssetId}.`,
      });
    }
    const expectedManifestId = `${manifest.assetId}-v${manifest.version}`;
    if (manifest.manifestId !== expectedManifestId) {
      ctx.addIssue({
        code: "custom",
        path: ["manifestId"],
        message: `manifestId must be ${expectedManifestId}.`,
      });
    }
    if (manifest.status === "archived" && manifest.isCurrent) {
      ctx.addIssue({
        code: "custom",
        path: ["isCurrent"],
        message: "Archived manifests cannot be current.",
      });
    }

    if (
      manifest.briefId === null &&
      (manifest.visualElementIds.length > 0 ||
        manifest.referenceAssetIds.length > 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: [
          manifest.visualElementIds.length > 0
            ? "visualElementIds"
            : "referenceAssetIds",
        ],
        message:
          "A manifest without a brief cannot carry visual-element or reference foreign keys.",
      });
    }

    const isApprovedLineageState = manifest.status !== "draft";
    if (isApprovedLineageState) {
      for (const [field, value] of [
        ["briefId", manifest.briefId],
        ["accessibilityMode", manifest.accessibilityMode],
        ["production", manifest.production],
        ["credit", manifest.credit],
      ] as const) {
        if (value === null) {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: `${manifest.status} manifests require ${field}.`,
          });
        }
      }
      if (
        manifest.masterRenditions.length === 0 ||
        manifest.repositoryRenditions.length === 0
      ) {
        ctx.addIssue({
          code: "custom",
          path: [
            manifest.masterRenditions.length === 0
              ? "masterRenditions"
              : "repositoryRenditions",
          ],
          message: `${manifest.status} manifests require reviewable master and repository renditions.`,
        });
      }
    }

    const contract = roleUsageContract[manifest.role];
    for (const [field, renditions] of [
      ["masterRenditions", manifest.masterRenditions],
      ["repositoryRenditions", manifest.repositoryRenditions],
    ] as const) {
      const usages = renditions.map((rendition) => rendition.usage);
      const seen = new Set<string>();
      usages.forEach((usage, index) => {
        if (seen.has(usage)) {
          ctx.addIssue({
            code: "custom",
            path: [field, index, "usage"],
            message: `Usage ${usage} occurs more than once.`,
          });
        }
        seen.add(usage);
      });

      if (isApprovedLineageState) {
        contract.required.forEach((usage) => {
          if (!usages.includes(usage)) {
            ctx.addIssue({
              code: "custom",
              path: [field],
              message: `${manifest.role} requires ${usage}.`,
            });
          }
        });
      }
      usages.forEach((usage, index) => {
        if (
          !contract.required.includes(usage as never) &&
          !contract.optional.includes(usage as never)
        ) {
          ctx.addIssue({
            code: "custom",
            path: [field, index, "usage"],
            message: `${usage} is invalid for role ${manifest.role}.`,
          });
        }
      });
    }

    addDuplicateIssues(
      manifest.masterRenditions.map((rendition) => rendition.logicalUri),
      ctx,
    );

    if (isApprovedLineageState) {
      const masterUsages = manifest.masterRenditions
        .map((rendition) => rendition.usage)
        .sort();
      const repositoryUsages = manifest.repositoryRenditions
        .map((rendition) => rendition.usage)
        .sort();
      if (masterUsages.join("|") !== repositoryUsages.join("|")) {
        ctx.addIssue({
          code: "custom",
          path: ["repositoryRenditions"],
          message: "Master and repository rendition usages must match.",
        });
      }
    }

    if (isApprovedLineageState) {
      const rights = manifest.publicationRights;
      if (rights.status === "rejected") {
        ctx.addIssue({
          code: "custom",
          path: ["publicationRights", "status"],
          message: `${manifest.status} manifests cannot carry rejected publication rights.`,
        });
      }
      if (rights.basis === null || rights.notes === null) {
        ctx.addIssue({
          code: "custom",
          path: [
            "publicationRights",
            rights.basis === null ? "basis" : "notes",
          ],
          message: `${manifest.status} manifests require reviewable publication-rights identity and notes.`,
        });
      }
      if (
        rights.basis !== null &&
        rights.basis !== "public-domain" &&
        rights.rightsHolder === null
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["publicationRights", "rightsHolder"],
          message: `${manifest.status} non-public-domain rights require a rights holder.`,
        });
      }
      if (
        ["commission-contract", "license", "permission"].includes(
          rights.basis ?? "",
        ) &&
        rights.licenseOrPermissionId === null
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["publicationRights", "licenseOrPermissionId"],
          message: `${manifest.status} rights require a contract, license, or permission identity for this basis.`,
        });
      }
      if (
        ["public-domain", "license", "permission"].includes(
          rights.basis ?? "",
        ) &&
        rights.rightsUrl === null
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["publicationRights", "rightsUrl"],
          message: `${manifest.status} rights require an auditable rights URL for this basis.`,
        });
      }
    }

    if (manifest.accessibilityMode === "informative") {
      if (manifest.alt === null || manifest.alt.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["alt"],
          message: "Informative assets require non-empty alt text.",
        });
      }
      if (manifest.caption === null) {
        ctx.addIssue({
          code: "custom",
          path: ["caption"],
          message: "Informative assets require a caption.",
        });
      }
    }
    if (manifest.accessibilityMode === "decorative" && manifest.alt !== "") {
      ctx.addIssue({
        code: "custom",
        path: ["alt"],
        message: "Decorative assets require an explicit empty alt string.",
      });
    }

    if (manifest.production !== null) {
      const method = manifest.production.method;
      const normalizedTool =
        manifest.production.tool?.toLowerCase().replace(/[^a-z0-9]/gu, "") ??
        "";
      const usesComfyUi = normalizedTool.includes("comfyui");
      const allowedRightsBasis = {
        "in-house-original": ["in-house-original"],
        "commissioned-original": ["commission-contract"],
        "public-domain-reuse": ["public-domain"],
        "licensed-reuse": ["license", "permission"],
        "ai-assisted": ["in-house-original", "license", "permission"],
      } as const;
      const basis = manifest.publicationRights.basis;
      if (
        basis !== null &&
        !allowedRightsBasis[method].includes(basis as never)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["publicationRights", "basis"],
          message: `${method} is incompatible with rights basis ${basis}.`,
        });
      }

      if (method === "ai-assisted") {
        if (manifest.production.tool === null) {
          ctx.addIssue({
            code: "custom",
            path: ["production", "tool"],
            message: "AI-assisted production requires the actual tool.",
          });
        }
        if (manifest.aiDisclosure === null) {
          ctx.addIssue({
            code: "custom",
            path: ["aiDisclosure"],
            message: "AI-assisted production requires a disclosure.",
          });
        }
        if (usesComfyUi && manifest.production.workflow === null) {
          ctx.addIssue({
            code: "custom",
            path: ["production", "workflow"],
            message: "Actual ComfyUI use requires workflow and model metadata.",
          });
        }
      } else if (manifest.aiDisclosure !== null) {
        ctx.addIssue({
          code: "custom",
          path: ["aiDisclosure"],
          message: "Non-AI production methods require aiDisclosure to be null.",
        });
      }
      if (usesComfyUi && method !== "ai-assisted") {
        ctx.addIssue({
          code: "custom",
          path: ["production", "method"],
          message: "ComfyUI use must be recorded as ai-assisted production.",
        });
      }
      if (
        manifest.production.workflow !== null &&
        (method !== "ai-assisted" || !usesComfyUi)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["production", "workflow"],
          message:
            "Workflow/model metadata is only valid for actual ComfyUI-assisted production.",
        });
      }
    }

    for (const reviewName of [
      "cultural",
      "rights",
      "visual",
      "accessibility",
    ] as const) {
      if (manifest.reviews[reviewName].status === "not-applicable") {
        ctx.addIssue({
          code: "custom",
          path: ["reviews", reviewName, "status"],
          message: `${reviewName} review cannot be not-applicable.`,
        });
      }
    }

    const languageReview = manifest.reviews.language;
    if (
      languageReview.status === "not-applicable" &&
      (manifest.accessibilityMode !== "decorative" ||
        manifest.alt !== "" ||
        manifest.caption !== null)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["reviews", "language", "status"],
        message:
          "Language review is not-applicable only when image text, alt, and caption are absent.",
      });
    }

    if (manifest.status === "approved" || manifest.status === "archived") {
      if (manifest.publicationRights.status !== "approved") {
        ctx.addIssue({
          code: "custom",
          path: ["publicationRights", "status"],
          message:
            "Approved-lineage manifests require approved publication rights.",
        });
      }
      for (const reviewName of [
        "cultural",
        "rights",
        "visual",
        "accessibility",
      ] as const) {
        if (manifest.reviews[reviewName].status !== "approved") {
          ctx.addIssue({
            code: "custom",
            path: ["reviews", reviewName, "status"],
            message: `Approved-lineage manifests require approved ${reviewName} review.`,
          });
        }
      }
      if (
        languageReview.status !== "approved" &&
        languageReview.status !== "not-applicable"
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["reviews", "language", "status"],
          message:
            "Approved-lineage manifests require approved or valid not-applicable language review.",
        });
      }
    }
  });

export type VisualBriefData = z.infer<typeof visualBriefSchema>;
export type AssetManifestData = z.infer<typeof assetManifestSchema>;
export type VisualProductionRecordData = z.infer<
  typeof visualProductionRecordSchema
>;
export type VisualRole = (typeof visualRoles)[number];
export type RenditionUsage = (typeof renditionUsages)[number];
export type RepositoryImageFormat = (typeof repositoryImageFormats)[number];
