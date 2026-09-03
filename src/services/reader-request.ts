import { z } from "astro/zod";

import { contentIdSchema } from "../content/content-schemas";

const readerEmailSchema = z
  .email()
  .max(254)
  .refine(
    (value) => value.trim() === value,
    "Email must not contain surrounding whitespace.",
  );

const requestedTopicSchema = z
  .string()
  .transform((value) => value.trim())
  .refine((value) => {
    const codePointLength = Array.from(value).length;
    return codePointLength >= 3 && codePointLength <= 240;
  }, "Requested topic must contain 3 to 240 Unicode code points after trimming.");

const providerRecordIdSchema = z
  .string()
  .min(1)
  .max(200)
  .refine(
    (value) => value.trim() === value,
    "Provider record ID must not contain surrounding whitespace.",
  );

function addEmailConsentIssue(
  value: { email?: string | null; emailConsent?: boolean },
  context: z.RefinementCtx,
): void {
  const hasEmail = Object.prototype.hasOwnProperty.call(value, "email");
  const hasEmailConsent = Object.prototype.hasOwnProperty.call(
    value,
    "emailConsent",
  );

  if (!hasEmail && !hasEmailConsent) return;

  if (
    !hasEmail ||
    !hasEmailConsent ||
    value.email === undefined ||
    value.emailConsent === undefined ||
    (value.email === null && value.emailConsent !== false) ||
    (value.email !== null && value.emailConsent !== true)
  ) {
    context.addIssue({
      code: "custom",
      path: ["emailConsent"],
      message:
        "Email and email consent must be omitted together or present with matching consent.",
    });
  }
}

export const readerRequestSubmissionSchema = z
  .strictObject({
    pageId: contentIdSchema,
    requestedTopic: requestedTopicSchema,
    email: readerEmailSchema.nullable().optional(),
    emailConsent: z.boolean().optional(),
  })
  .superRefine(addEmailConsentIssue);

export const readerRequestRecordSchema = z
  .strictObject({
    requestId: providerRecordIdSchema,
    pageId: contentIdSchema,
    requestedTopic: requestedTopicSchema,
    email: readerEmailSchema.nullable(),
    emailConsent: z.boolean(),
    createdAt: z.iso.datetime(),
    status: z.literal("new"),
    normalizedTopicId: z.null(),
  })
  .superRefine(addEmailConsentIssue);

export type ReaderRequestSubmission = z.infer<
  typeof readerRequestSubmissionSchema
>;
export type ReaderRequestRecord = z.infer<typeof readerRequestRecordSchema>;

export type ReaderRequestValidationResult<T> =
  | { success: true; data: T }
  | { success: false };

function pageIdIsAllowed(
  pageId: string,
  publishedEntryIds: ReadonlySet<string>,
): boolean {
  return publishedEntryIds.has(pageId);
}

export function validateReaderRequestSubmission(
  input: unknown,
  publishedEntryIds: ReadonlySet<string>,
): ReaderRequestValidationResult<ReaderRequestSubmission> {
  const parsed = readerRequestSubmissionSchema.safeParse(input);
  if (
    !parsed.success ||
    !pageIdIsAllowed(parsed.data.pageId, publishedEntryIds)
  ) {
    return { success: false };
  }
  return { success: true, data: parsed.data };
}

export function validateReaderRequestRecord(
  input: unknown,
  publishedEntryIds: ReadonlySet<string>,
): ReaderRequestValidationResult<ReaderRequestRecord> {
  const parsed = readerRequestRecordSchema.safeParse(input);
  if (
    !parsed.success ||
    !pageIdIsAllowed(parsed.data.pageId, publishedEntryIds)
  ) {
    return { success: false };
  }
  return { success: true, data: parsed.data };
}

export type ReaderRequestAdapterResult =
  | { status: "accepted" }
  | { status: "validation-error" }
  | { status: "unavailable" }
  | { status: "rate-limited"; retryAfterSeconds: number | null }
  | { status: "unknown"; reason: "timeout" | "unknown-result" };

export interface ReaderRequestAdapter {
  submit(input: unknown): Promise<ReaderRequestAdapterResult>;
}

export class FakeReaderRequestAdapter implements ReaderRequestAdapter {
  readonly #outcome: ReaderRequestAdapterResult;
  readonly #publishedEntryIds: ReadonlySet<string>;

  constructor(
    publishedEntryIds: ReadonlySet<string>,
    outcome: ReaderRequestAdapterResult = { status: "accepted" },
  ) {
    this.#publishedEntryIds = new Set(publishedEntryIds);
    this.#outcome = outcome;
  }

  submit(input: unknown): Promise<ReaderRequestAdapterResult> {
    if (
      !validateReaderRequestSubmission(input, this.#publishedEntryIds).success
    ) {
      return Promise.resolve({ status: "validation-error" });
    }
    return Promise.resolve({ ...this.#outcome });
  }
}
