import { GoatCounterAnalyticsAdapter } from "../services/goatcounter-analytics";
import {
  analyticsConfigurationName,
  parseAnalyticsConfiguration,
} from "../site/analytics-configuration";
import { bindSiteAnalytics } from "./site-analytics";

// Document lifetime only: no visitor identifier or persistent storage.
const initializedDocuments = new WeakSet<Document>();

export function initializeSiteAnalytics(
  view: Window,
  document: Document,
): void {
  if (initializedDocuments.has(document)) return;
  initializedDocuments.add(document);
  try {
    const nodes = document.querySelectorAll(
      `meta[name="${analyticsConfigurationName}"]`,
    );
    if (nodes.length !== 1 || nodes[0].parentNode !== document.head) return;
    const configuration = parseAnalyticsConfiguration(
      JSON.parse(nodes[0].getAttribute("content") ?? "null"),
    );
    if (!configuration || !configuration.isEnabled) return;
    const adapter = new GoatCounterAnalyticsAdapter(
      configuration,
      (url, options) => view.fetch(url, options),
    );
    bindSiteAnalytics({
      window: view,
      document,
      adapter,
      buildIntent: configuration.buildIntent,
      isEnabled: configuration.isEnabled,
    });
  } catch {
    // Malformed configuration disables analytics without exposing its values or breaking reading.
  }
}

if (typeof window !== "undefined" && typeof document !== "undefined")
  initializeSiteAnalytics(window, document);
