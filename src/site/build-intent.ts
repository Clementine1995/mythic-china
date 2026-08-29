import process from "node:process";

export const buildIntentEnvironmentVariable = "MYTHIC_CHINA_BUILD_INTENT";
export const reviewBuildIntent = "review" as const;
export type BuildIntent = typeof reviewBuildIntent;

export class BuildIntentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BuildIntentError";
  }
}

export function readBuildIntent(
  value = process.env[buildIntentEnvironmentVariable],
): BuildIntent {
  // There is no implicit development mode; every page build declares its intent.
  if (value === reviewBuildIntent) return value;
  if (value === undefined || value.trim() === "") {
    throw new BuildIntentError(
      `${buildIntentEnvironmentVariable} is required. M4-U2 only supports review.`,
    );
  }
  throw new BuildIntentError(
    `${buildIntentEnvironmentVariable}=${value} is not enabled. M4-U2 only supports review.`,
  );
}
