import { rumDayMs, rumOrigin, rumWindowMs } from "./contract.ts";

export interface RumDeployment {
  endpoint: string;
  startAtMs: number;
  endAtMs: number;
}

// No account or endpoint is configured. Activation also requires artifact review.
export const rumDeployment: RumDeployment | null = null;
export const rumConfigurationName = "mythic-china-rum";

export interface RumConfiguration extends RumDeployment {
  buildIntent: "public";
  publicPaths: string[];
}

export function isRumDeployment(value: RumDeployment): boolean {
  try {
    const url = new URL(value.endpoint);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      !url.search &&
      !url.hash &&
      url.pathname === "/vitals" &&
      url.hostname.endsWith(".workers.dev") &&
      url.href === value.endpoint &&
      Number.isSafeInteger(value.startAtMs) &&
      value.startAtMs > 0 &&
      value.startAtMs % rumDayMs === 0 &&
      value.endAtMs === value.startAtMs + rumWindowMs
    );
  } catch {
    return false;
  }
}

export function createRumConfiguration(
  intent: "review" | "public",
  paths: string[],
  deployment = rumDeployment,
): RumConfiguration | null {
  if (intent !== "public" || deployment === null) return null;
  if (
    !isRumDeployment(deployment) ||
    paths.length === 0 ||
    new Set(paths).size !== paths.length ||
    !paths.every(isPublicPath)
  )
    throw new Error("Invalid RUM deployment or published paths.");
  return { ...deployment, buildIntent: "public", publicPaths: [...paths] };
}

function isPublicPath(path: unknown): path is string {
  return (
    typeof path === "string" &&
    /^\/(?:[a-z0-9-]+\/)*$/u.test(path) &&
    !path.startsWith("/review/")
  );
}

export function parseRumConfiguration(
  input: unknown,
  deployment: RumDeployment | null,
): RumConfiguration | null {
  if (
    !deployment ||
    !isRumDeployment(deployment) ||
    !input ||
    typeof input !== "object" ||
    Array.isArray(input)
  )
    return null;
  const value = input as Record<string, unknown>;
  if (
    Object.keys(value).sort().join(",") !==
      "buildIntent,endAtMs,endpoint,publicPaths,startAtMs" ||
    value.buildIntent !== "public" ||
    value.endpoint !== deployment.endpoint ||
    value.startAtMs !== deployment.startAtMs ||
    value.endAtMs !== deployment.endAtMs ||
    !Array.isArray(value.publicPaths) ||
    value.publicPaths.length === 0 ||
    new Set(value.publicPaths).size !== value.publicPaths.length ||
    !value.publicPaths.every(isPublicPath)
  )
    return null;
  return value as unknown as RumConfiguration;
}

export interface RumEnvironment {
  href: string;
  isAutomated: boolean;
  hasPrivacyPreference: boolean;
  atMs: number;
}

export function canCollectRum(
  configuration: RumConfiguration,
  environment: RumEnvironment,
): boolean {
  try {
    const url = new URL(environment.href);
    return (
      !environment.isAutomated &&
      !environment.hasPrivacyPreference &&
      url.origin === rumOrigin &&
      configuration.publicPaths.includes(url.pathname) &&
      !url.searchParams.getAll("rum").includes("off") &&
      !new URLSearchParams(url.hash.slice(1)).getAll("rum").includes("off") &&
      environment.atMs >= configuration.startAtMs &&
      environment.atMs < configuration.endAtMs
    );
  } catch {
    return false;
  }
}
