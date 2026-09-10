import {
  rumDayMs,
  rumWindowMs,
  type RumMeasurement,
  type RumMetricName,
} from "../../src/rum/contract.ts";

// This is the narrow D1 binding surface used here, not a general database adapter.
export interface RumStatement {
  bind(...values: (string | number | null)[]): RumStatement;
  first<T>(): Promise<T | null>;
  run(): Promise<{ meta: { changes: number } }>;
}
export interface RumDatabase {
  prepare(sql: string): RumStatement;
  batch(statements: RumStatement[]): Promise<unknown[]>;
}
export interface RumWindow {
  start_at_ms: number;
  end_at_ms: number;
  last_maintenance_at_ms: number;
  invalid_reason: string | null;
  snapshot_json: string | null;
}

export async function openRumWindow(
  db: RumDatabase,
  startAtMs: number,
  nowMs = Date.now(),
): Promise<void> {
  if (
    !Number.isSafeInteger(startAtMs) ||
    startAtMs % rumDayMs !== 0 ||
    startAtMs <= nowMs
  )
    throw new Error("RUM must start at a future UTC midnight.");
  const result = await db
    .prepare(
      `INSERT INTO rum_windows
    (start_at_ms, end_at_ms, last_maintenance_at_ms)
    SELECT ?, ?, ? WHERE NOT EXISTS (
      SELECT 1 FROM rum_windows WHERE snapshot_json IS NULL OR end_at_ms > ?
    )`,
    )
    .bind(startAtMs, startAtMs + rumWindowMs, nowMs, startAtMs)
    .run();
  if (result.meta.changes !== 1)
    throw new Error("RUM window overlaps or an earlier window is not sealed.");
}

export async function latestRumWindow(
  db: RumDatabase,
): Promise<RumWindow | null> {
  return db
    .prepare("SELECT * FROM rum_windows ORDER BY start_at_ms DESC LIMIT 1")
    .first<RumWindow>();
}

export async function invalidateRumWindow(
  db: RumDatabase,
  startAtMs: number,
  reason: "storage-failure" | "maintenance-failure" | "operational-incident",
): Promise<void> {
  await db
    .prepare(
      "UPDATE rum_windows SET invalid_reason = COALESCE(invalid_reason, ?) WHERE start_at_ms = ?",
    )
    .bind(reason, startAtMs)
    .run();
}

export async function recordRumMeasurement(
  db: RumDatabase,
  startAtMs: number,
  measurement: RumMeasurement,
): Promise<void> {
  // Use database time inside the write: a request queued before cutoff cannot write after it.
  await db
    .prepare(
      `INSERT INTO rum_measurements
    (window_start_at_ms, name, measurement_id, sequence, value, first_received_at_ms, last_received_at_ms)
    SELECT start_at_ms, ?, ?, ?, ?, unixepoch() * 1000, unixepoch() * 1000
    FROM rum_windows WHERE start_at_ms = ? AND snapshot_json IS NULL AND invalid_reason IS NULL
      AND unixepoch() * 1000 >= start_at_ms AND unixepoch() * 1000 < end_at_ms
    ON CONFLICT(window_start_at_ms, name, measurement_id) DO UPDATE SET
      sequence = excluded.sequence, value = excluded.value, last_received_at_ms = excluded.last_received_at_ms
    WHERE excluded.sequence > rum_measurements.sequence`,
    )
    .bind(
      measurement.name,
      measurement.measurementId,
      measurement.sequence,
      measurement.value,
      startAtMs,
    )
    .run();
}

const freezeSql = `UPDATE rum_windows SET snapshot_json = (
  WITH ranked AS (
    SELECT name, value, COUNT(*) OVER (PARTITION BY name) AS n,
      ROW_NUMBER() OVER (PARTITION BY name ORDER BY value, measurement_id) AS position
    FROM rum_measurements WHERE window_start_at_ms = rum_windows.start_at_ms
  ), metrics(name) AS (VALUES ('LCP'), ('INP'), ('CLS'))
  SELECT json_group_array(json_object('name', metrics.name,
    'n', COALESCE(ranked.n, 0), 'p75', CASE WHEN ranked.n >= 50 THEN ranked.value ELSE NULL END))
  FROM metrics LEFT JOIN ranked ON ranked.name = metrics.name AND ranked.position = (3 * ranked.n + 3) / 4
) WHERE snapshot_json IS NULL AND end_at_ms <= unixepoch() * 1000`;

export async function maintainRum(
  db: RumDatabase,
  isEnabled: boolean,
): Promise<void> {
  // Freeze before retention deletion in the same transaction. Disabled collection still cleans up.
  await db.batch([
    db
      .prepare(
        `UPDATE rum_windows SET invalid_reason = COALESCE(invalid_reason, CASE
      WHEN unixepoch() * 1000 >= start_at_ms + ? THEN 'retention-expired'
      WHEN last_maintenance_at_ms < end_at_ms
        AND MIN(unixepoch() * 1000, end_at_ms) - MAX(last_maintenance_at_ms, start_at_ms) > 7200000 THEN 'maintenance-gap'
      WHEN ? = 0 AND unixepoch() * 1000 >= start_at_ms AND unixepoch() * 1000 < end_at_ms THEN 'collection-paused'
      ELSE NULL END), last_maintenance_at_ms = unixepoch() * 1000
      WHERE snapshot_json IS NULL`,
      )
      .bind(30 * rumDayMs, isEnabled ? 1 : 0),
    db.prepare(freezeSql),
    db
      .prepare(
        "DELETE FROM rum_measurements WHERE first_received_at_ms <= unixepoch() * 1000 - ?",
      )
      .bind(30 * rumDayMs),
  ]);
}

export interface RumMetricSummary {
  name: RumMetricName;
  n: number;
  p75: number | null;
}

export async function readRumReport(db: RumDatabase, startAtMs: number) {
  const window = await db
    .prepare("SELECT * FROM rum_windows WHERE start_at_ms = ?")
    .bind(startAtMs)
    .first<RumWindow>();
  if (!window) return null;
  const metrics = window.snapshot_json
    ? (JSON.parse(window.snapshot_json) as RumMetricSummary[])
    : null;
  return {
    startAtMs: window.start_at_ms,
    endAtMs: window.end_at_ms,
    status: window.invalid_reason
      ? "INCOMPLETE"
      : !metrics
        ? "COLLECTING"
        : metrics.some((metric) => metric.n < 50)
          ? "INCONCLUSIVE_INSUFFICIENT_TRAFFIC"
          : "REQUIRES_OPERATIONAL_REVIEW",
    invalidReason: window.invalid_reason,
    metrics,
  };
}
