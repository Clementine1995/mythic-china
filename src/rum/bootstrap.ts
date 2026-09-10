import { collectRum, type RumObservers } from "./collector.ts";
import {
  canCollectRum,
  parseRumConfiguration,
  rumConfigurationName,
  rumDeployment,
  type RumDeployment,
} from "./configuration.ts";

const initializedDocuments = new WeakSet<Document>();

export async function initializeRum(
  view: Window,
  document: Document,
  deployment: RumDeployment | null = rumDeployment,
  load: () => Promise<RumObservers> = () => import("./web-vitals.ts"),
): Promise<void> {
  if (initializedDocuments.has(document)) return;
  initializedDocuments.add(document);
  let hasFailed = false;
  try {
    if (!deployment) return;
    const nodes = document.querySelectorAll(
      `meta[name="${rumConfigurationName}"]`,
    );
    if (nodes.length !== 1 || nodes[0].parentNode !== document.head) return;
    const configuration = parseRumConfiguration(
      JSON.parse(nodes[0].getAttribute("content") ?? "null"),
      deployment,
    );
    if (!configuration) return;
    const canSend = (): boolean =>
      !hasFailed &&
      canCollectRum(configuration, {
        href: view.location.href,
        atMs: Date.now(),
        isAutomated: view.navigator.webdriver,
        hasPrivacyPreference:
          view.navigator.doNotTrack === "1" ||
          (view.navigator as Navigator & { globalPrivacyControl?: boolean })
            .globalPrivacyControl === true,
      });
    if (!canSend()) return;
    const observers = await load();
    if (!canSend()) return;
    collectRum({
      observers,
      canSend,
      randomId: () => view.crypto.randomUUID(),
      send: (measurement) => {
        // No retries or persistence; transport failures must not affect reading.
        try {
          void view
            .fetch(configuration.endpoint, {
              method: "POST",
              mode: "cors",
              credentials: "omit",
              referrerPolicy: "no-referrer",
              redirect: "error",
              keepalive: true,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(measurement),
            })
            .then(
              (response) => {
                if (response.status !== 204) hasFailed = true;
              },
              () => {
                hasFailed = true;
              },
            );
        } catch {
          hasFailed = true;
        }
      },
    });
  } catch {
    hasFailed = true;
    // Configuration, observer or library failures disable collection without logging data.
  }
}

if (typeof window !== "undefined" && typeof document !== "undefined")
  void initializeRum(window, document);
