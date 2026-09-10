export const rumOrigin = "https://mythic-china-beta.vercel.app";
export const rumMetricNames = ["LCP", "INP", "CLS"] as const;
export type RumMetricName = (typeof rumMetricNames)[number];
export const rumDayMs = 86_400_000;
export const rumWindowMs = 14 * rumDayMs;
export const rumBodyLimitBytes = 512;

export interface RumMeasurement {
  name: RumMetricName;
  value: number;
  measurementId: string;
  sequence: number;
}

export function parseRumMeasurement(input: unknown): RumMeasurement | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const value = input as Record<string, unknown>;
  if (
    Object.keys(value).sort().join(",") !==
      "measurementId,name,sequence,value" ||
    !rumMetricNames.includes(value.name as RumMetricName) ||
    typeof value.value !== "number" ||
    !Number.isFinite(value.value) ||
    value.value < 0 ||
    typeof value.measurementId !== "string" ||
    !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/u.test(
      value.measurementId,
    ) ||
    !Number.isSafeInteger(value.sequence) ||
    (value.sequence as number) < 1
  )
    return null;
  return value as unknown as RumMeasurement;
}
