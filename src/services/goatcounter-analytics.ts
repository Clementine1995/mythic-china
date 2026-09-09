import {
  normalizeAnalyticsPageview,
  normalizeAnalyticsRecord,
} from "./analytics-record";
import type { AnalyticsAdapter, AnalyticsAdapterResult } from "./analytics";

export interface GoatCounterConfiguration {
  origin: string;
  endpoint: string;
  publicPaths: readonly string[];
  entryPaths: readonly string[];
}

export type AnalyticsTransport = (
  url: string,
  options: RequestInit,
) => Promise<{ status: number }>;

export class GoatCounterAnalyticsAdapter implements AnalyticsAdapter {
  readonly origin: string;
  readonly #endpoint: string;
  readonly #publicPaths: ReadonlySet<string>;
  readonly #entryPaths: ReadonlySet<string>;
  readonly #transport: AnalyticsTransport;

  constructor(
    configuration: GoatCounterConfiguration,
    transport: AnalyticsTransport,
  ) {
    const { origin, endpoint, publicPaths, entryPaths } = configuration;
    const site = new URL(origin);
    const target = new URL(endpoint);
    if (
      site.protocol !== "https:" ||
      site.origin !== origin ||
      site.port !== "" ||
      !/^https:\/\/[a-z0-9]+(?:-[a-z0-9]+)*\.goatcounter\.com\/count$/u.test(
        endpoint,
      ) ||
      target.href !== endpoint ||
      publicPaths.length === 0 ||
      new Set(publicPaths).size !== publicPaths.length ||
      new Set(entryPaths).size !== entryPaths.length ||
      publicPaths.some(
        (path) => !/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*$/u.test(path),
      ) ||
      entryPaths.some(
        (path) =>
          !/^\/explore\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/u.test(path) ||
          !publicPaths.includes(path),
      )
    ) {
      throw new Error("Invalid analytics collection boundary.");
    }
    this.origin = origin;
    this.#endpoint = endpoint;
    this.#publicPaths = new Set(publicPaths);
    this.#entryPaths = new Set(entryPaths);
    this.#transport = transport;
  }

  hasPublicPath(path: string): boolean {
    return this.#publicPaths.has(path);
  }

  hasEntryPath(path: string): boolean {
    return this.#entryPaths.has(path);
  }

  record(input: unknown): Promise<AnalyticsAdapterResult> {
    const parsed = normalizeAnalyticsRecord(input, this);
    if (!parsed.success) return Promise.resolve({ status: "validation-error" });
    const path = new URL(parsed.data.envelope.url).pathname;
    if (!this.hasEntryPath(path))
      return Promise.resolve({ status: "validation-error" });
    return this.#send(`${parsed.data.event.name}:${path}`, true);
  }

  pageview(input: unknown): Promise<AnalyticsAdapterResult> {
    const parsed = normalizeAnalyticsPageview(input, this);
    if (!parsed.success) return Promise.resolve({ status: "validation-error" });
    const path = new URL(parsed.data.envelope.url).pathname;
    if (!this.hasPublicPath(path))
      return Promise.resolve({ status: "validation-error" });
    return this.#send(path, false);
  }

  async #send(path: string, isEvent: boolean): Promise<AnalyticsAdapterResult> {
    const url = new URL(this.#endpoint);
    url.search = new URLSearchParams({
      p: path,
      e: String(isEvent),
    }).toString();
    try {
      const response = await this.#transport(url.href, {
        method: "GET",
        mode: "cors",
        credentials: "omit",
        referrer: "",
        referrerPolicy: "no-referrer",
        cache: "no-store",
        keepalive: true,
        redirect: "error",
      });
      if (response.status === 429)
        return { status: "rate-limited", retryAfterSeconds: null };
      if (response.status >= 400) return { status: "unavailable" };
      // A GIF response can represent a filtered hit, not a recorded aggregate.
      return { status: "unknown", reason: "unknown-result" };
    } catch {
      return { status: "unknown", reason: "unknown-result" };
    }
  }
}
