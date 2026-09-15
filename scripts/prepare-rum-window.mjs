import assert from "node:assert/strict";
import process from "node:process";
import { isRumDeployment, rumDeployment } from "../src/rum/configuration.ts";

// Generates reviewed SQL only. It never connects to D1 or executes a statement.
export function createRumWindowSql(deployment, nowMs = Date.now()) {
  assert(
    deployment && isRumDeployment(deployment),
    "A valid RUM deployment is required.",
  );
  assert(
    deployment.startAtMs > nowMs,
    "Select a future UTC midnight before preparing the window.",
  );
  const { startAtMs, endAtMs } = deployment;
  return `-- Run once in the verified RUM D1 database after activation approval.
-- Client and database must use exactly these UTC timestamps.
INSERT INTO rum_windows (start_at_ms, end_at_ms, last_maintenance_at_ms)
SELECT ${startAtMs}, ${endAtMs}, unixepoch() * 1000
WHERE ${startAtMs} > unixepoch() * 1000
  AND NOT EXISTS (
    SELECT 1 FROM rum_windows
    WHERE snapshot_json IS NULL OR (end_at_ms > ${startAtMs} AND (
      invalid_reason IS NOT 'cancelled-before-activation'
      OR EXISTS (SELECT 1 FROM rum_measurements AS m
        WHERE m.window_start_at_ms = rum_windows.start_at_ms)
    ))
  );
SELECT changes() AS inserted_windows;
SELECT start_at_ms, end_at_ms, last_maintenance_at_ms, invalid_reason, snapshot_json
FROM rum_windows WHERE start_at_ms = ${startAtMs};
`;
}

if (process.argv[2] === "--prepare")
  process.stdout.write(createRumWindowSql(rumDeployment));
