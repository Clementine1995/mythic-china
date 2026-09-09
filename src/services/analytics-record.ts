import type { PublicSite } from "../site/public-site";

export const analyticsEventNames = [
  "article_session_qualified",
  "article_depth_75",
  "related_story_click",
] as const;

export interface AnalyticsEvent {
  name: (typeof analyticsEventNames)[number];
}

export interface NormalizedAnalyticsPageview {
  envelope: { url: string; referrer: null };
}

export interface NormalizedAnalyticsRecord extends NormalizedAnalyticsPageview {
  event: AnalyticsEvent;
}

type ValidationResult<T> = { success: true; data: T } | { success: false };

export type AnalyticsRecordValidationResult =
  ValidationResult<NormalizedAnalyticsRecord>;

function hasExactKeys(
  value: unknown,
  keys: readonly string[],
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value).length === keys.length &&
    keys.every((key) => Object.hasOwn(value, key))
  );
}

export function normalizeAnalyticsPageview(
  input: unknown,
  site: Pick<PublicSite, "origin">,
): ValidationResult<NormalizedAnalyticsPageview> {
  if (
    !hasExactKeys(input, ["pageUrl", "referrer"]) ||
    typeof input.pageUrl !== "string" ||
    input.pageUrl.trim() !== input.pageUrl ||
    (input.referrer !== null && typeof input.referrer !== "string")
  ) {
    return { success: false };
  }
  let pageUrl: URL;
  try {
    pageUrl = new URL(input.pageUrl);
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
      envelope: { url: `${pageUrl.origin}${pageUrl.pathname}`, referrer: null },
    },
  };
}

export function normalizeAnalyticsRecord(
  input: unknown,
  site: Pick<PublicSite, "origin">,
): AnalyticsRecordValidationResult {
  if (
    !hasExactKeys(input, ["event", "pageUrl", "referrer"]) ||
    !hasExactKeys(input.event, ["name"])
  ) {
    return { success: false };
  }
  const eventName = input.event.name;
  if (!analyticsEventNames.some((name) => name === eventName))
    return { success: false };
  const pageview = normalizeAnalyticsPageview(
    { pageUrl: input.pageUrl, referrer: input.referrer },
    site,
  );
  if (!pageview.success) return pageview;
  return {
    success: true,
    data: {
      ...pageview.data,
      event: { name: eventName as AnalyticsEvent["name"] },
    },
  };
}
