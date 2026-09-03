import { z } from "astro/zod";

import type { PublicSite } from "../site/public-site";

export const analyticsEventNames = [
  "article_session_qualified",
  "article_depth_75",
  "related_story_click",
] as const;

export const analyticsEventSchema = z.strictObject({
  name: z.enum(analyticsEventNames),
});

const analyticsRecordInputSchema = z.strictObject({
  event: analyticsEventSchema,
  pageUrl: z.string().min(1),
  referrer: z.string().nullable(),
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

export interface NormalizedAnalyticsRecord {
  event: AnalyticsEvent;
  envelope: {
    url: string;
    referrer: null;
  };
}

export type AnalyticsRecordValidationResult =
  | { success: true; data: NormalizedAnalyticsRecord }
  | { success: false };

export function normalizeAnalyticsRecord(
  input: unknown,
  site: PublicSite,
): AnalyticsRecordValidationResult {
  const parsed = analyticsRecordInputSchema.safeParse(input);
  if (!parsed.success || parsed.data.pageUrl.trim() !== parsed.data.pageUrl) {
    return { success: false };
  }

  let pageUrl: URL;
  try {
    pageUrl = new URL(parsed.data.pageUrl);
  } catch {
    return { success: false };
  }

  if (
    pageUrl.protocol !== "https:" ||
    pageUrl.username !== "" ||
    pageUrl.password !== "" ||
    pageUrl.origin !== site.origin
  ) {
    return { success: false };
  }

  return {
    success: true,
    data: {
      event: parsed.data.event,
      envelope: {
        url: `${pageUrl.origin}${pageUrl.pathname}`,
        referrer: null,
      },
    },
  };
}

export type AnalyticsAdapterResult =
  | { status: "recorded" }
  | { status: "validation-error" }
  | { status: "unavailable" }
  | { status: "rate-limited"; retryAfterSeconds: number | null }
  | { status: "unknown"; reason: "timeout" | "unknown-result" };

export interface AnalyticsAdapter {
  record(input: unknown): Promise<AnalyticsAdapterResult>;
}

export class FakeAnalyticsAdapter implements AnalyticsAdapter {
  readonly #outcome: AnalyticsAdapterResult;
  readonly #site: PublicSite;

  constructor(
    site: PublicSite,
    outcome: AnalyticsAdapterResult = { status: "recorded" },
  ) {
    this.#site = site;
    this.#outcome = outcome;
  }

  record(input: unknown): Promise<AnalyticsAdapterResult> {
    if (!normalizeAnalyticsRecord(input, this.#site).success) {
      return Promise.resolve({ status: "validation-error" });
    }
    return Promise.resolve({ ...this.#outcome });
  }
}
