import { z } from "astro/zod";

import type { PublicSite } from "../site/public-site";
import {
  analyticsEventNames,
  normalizeAnalyticsRecord,
} from "./analytics-record";

export {
  analyticsEventNames,
  normalizeAnalyticsPageview,
  normalizeAnalyticsRecord,
} from "./analytics-record";
export type {
  AnalyticsEvent,
  AnalyticsRecordValidationResult,
  NormalizedAnalyticsPageview,
  NormalizedAnalyticsRecord,
} from "./analytics-record";

export const analyticsEventSchema = z.strictObject({
  name: z.enum(analyticsEventNames),
});

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
