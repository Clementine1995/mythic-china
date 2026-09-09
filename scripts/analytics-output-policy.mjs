import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import analyticsScript from "./analytics-script.json" with { type: "json" };

export const analyticsScriptHref = analyticsScript.href;
export const analyticsMetaName = "mythic-china-analytics";

export function assertAnalyticsScriptBytes(bytes) {
  assert.match(analyticsScriptHref, /^\/_astro\/[a-zA-Z0-9_.-]+\.js$/u);
  assert.match(analyticsScript.sha256, /^[a-f0-9]{64}$/u);
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    analyticsScript.sha256,
    "Analytics script differs from the reviewed bytes.",
  );
  assert(
    !/\b(?:import|export)\b/u.test(bytes.toString("utf8")),
    "Analytics must be one self-contained bundle.",
  );
}

export function assertAnalyticsConfiguration(value, origin, publicPaths) {
  assert.deepEqual(Object.keys(value).sort(), [
    "buildIntent",
    "endpoint",
    "entryPaths",
    "isEnabled",
    "origin",
    "publicPaths",
  ]);
  assert.equal(origin, "https://mythic-china-beta.vercel.app");
  assert.equal(value.origin, origin);
  assert.equal(value.endpoint, "https://mythic-china.goatcounter.com/count");
  assert.equal(value.buildIntent, "public");
  assert.equal(
    value.isEnabled,
    false,
    "Analytics activation requires a separate verified change.",
  );
  assert.deepEqual([...value.publicPaths].sort(), [...publicPaths].sort());
  assert.deepEqual(
    [...value.entryPaths].sort(),
    publicPaths
      .filter((path) => path.startsWith("/explore/") && path !== "/explore/")
      .sort(),
  );
}
