import type { PublicSite } from "./public-site";
import type { GoatCounterConfiguration } from "../services/goatcounter-analytics";

// Independent client identity pins prevent a preview configuration from authorizing itself.
export const analyticsSiteOrigin = "https://mythic-china-beta.vercel.app";
export const analyticsEndpoint = "https://mythic-china.goatcounter.com/count";
export const analyticsConfigurationName = "mythic-china-analytics";

export interface PublicAnalyticsConfiguration extends GoatCounterConfiguration {
  buildIntent: "public";
  isEnabled: boolean;
}

export function createPublicAnalyticsConfiguration(
  site: PublicSite,
  pages: readonly { kind: string; path: string }[],
): PublicAnalyticsConfiguration {
  if (site.origin !== analyticsSiteOrigin)
    throw new Error("Analytics requires the approved public site.");
  return {
    buildIntent: "public",
    isEnabled: false,
    origin: site.origin,
    endpoint: analyticsEndpoint,
    publicPaths: pages.map((page) => page.path),
    entryPaths: pages
      .filter((page) => page.kind === "entry")
      .map((page) => page.path),
  };
}

export function parseAnalyticsConfiguration(
  input: unknown,
): PublicAnalyticsConfiguration | null {
  if (input === null || typeof input !== "object" || Array.isArray(input))
    return null;
  const value = input as Record<string, unknown>;
  const keys = [
    "buildIntent",
    "isEnabled",
    "origin",
    "endpoint",
    "publicPaths",
    "entryPaths",
  ];
  if (
    Object.keys(value).length !== keys.length ||
    keys.some((key) => !Object.hasOwn(value, key)) ||
    value.buildIntent !== "public" ||
    typeof value.isEnabled !== "boolean" ||
    value.origin !== analyticsSiteOrigin ||
    value.endpoint !== analyticsEndpoint ||
    !Array.isArray(value.publicPaths) ||
    !Array.isArray(value.entryPaths) ||
    !value.publicPaths.every((path) => typeof path === "string") ||
    !value.entryPaths.every((path) => typeof path === "string")
  )
    return null;
  return value as unknown as PublicAnalyticsConfiguration;
}
