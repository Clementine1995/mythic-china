import {
  parseRumMeasurement,
  rumBodyLimitBytes,
  rumOrigin,
} from "../../src/rum/contract.ts";
import {
  invalidateRumWindow,
  latestRumWindow,
  maintainRum,
  recordRumMeasurement,
  type RumDatabase,
} from "./store.ts";

export interface RumWorkerEnvironment {
  RUM_ENABLED?: string;
  DB?: RumDatabase;
}

function reply(status: number, isAllowedOrigin = false): Response {
  return new Response(null, {
    status,
    headers: {
      "Cache-Control": "no-store",
      Vary: "Origin",
      ...(isAllowedOrigin
        ? {
            "Access-Control-Allow-Origin": rumOrigin,
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          }
        : {}),
    },
  });
}

async function readBody(request: Request): Promise<unknown> {
  if (!request.body) throw new Error("Invalid body.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > rumBodyLimitBytes) {
        await reader.cancel();
        throw new Error("Body too large.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

export async function receiveRum(
  request: Request,
  env: RumWorkerEnvironment,
  nowMs = Date.now(),
): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname !== "/vitals" || url.search) return reply(404);
  if (request.headers.get("Origin") !== rumOrigin) return reply(403);
  if (env.RUM_ENABLED !== "true" || !env.DB) return reply(503, true);
  if (request.method === "OPTIONS") {
    return reply(
      request.headers.get("Access-Control-Request-Method") === "POST" &&
        request.headers.get("Access-Control-Request-Headers")?.toLowerCase() ===
          "content-type"
        ? 204
        : 403,
      true,
    );
  }
  if (request.method !== "POST") return reply(405, true);
  if (request.headers.get("Content-Type")?.toLowerCase() !== "application/json")
    return reply(415, true);
  const length = request.headers.get("Content-Length");
  if (
    length !== null &&
    (!/^\d+$/u.test(length) || Number(length) > rumBodyLimitBytes)
  )
    return reply(413, true);
  let measurement;
  try {
    measurement = parseRumMeasurement(await readBody(request));
  } catch {
    return reply(400, true);
  }
  if (!measurement) return reply(400, true);
  let startAtMs: number | undefined;
  try {
    const window = await latestRumWindow(env.DB);
    if (
      !window ||
      window.snapshot_json ||
      window.invalid_reason ||
      nowMs < window.start_at_ms ||
      nowMs >= window.end_at_ms
    )
      return reply(503, true);
    startAtMs = window.start_at_ms;
    await recordRumMeasurement(env.DB, startAtMs, measurement);
    return reply(204, true);
  } catch {
    if (startAtMs !== undefined) {
      try {
        await invalidateRumWindow(env.DB, startAtMs, "storage-failure");
      } catch {
        /* Platform failures require operational review. */
      }
    }
    return reply(503, true);
  }
}

export default {
  fetch: (request: Request, env: RumWorkerEnvironment) =>
    receiveRum(request, env),
  async scheduled(_event: unknown, env: RumWorkerEnvironment): Promise<void> {
    if (!env.DB) throw new Error("RUM database is not configured.");
    try {
      await maintainRum(env.DB, env.RUM_ENABLED === "true");
    } catch {
      try {
        const window = await latestRumWindow(env.DB);
        if (window)
          await invalidateRumWindow(
            env.DB,
            window.start_at_ms,
            "maintenance-failure",
          );
      } catch {
        /* Do not expose database or request details. */
      }
      throw new Error("RUM maintenance failed.");
    }
  },
};
