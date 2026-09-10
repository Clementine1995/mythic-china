import {
  createArticleReadingState,
  observeArticleReading,
} from "../services/article-reading-state";
import type { GoatCounterAnalyticsAdapter } from "../services/goatcounter-analytics";

interface SiteAnalyticsOptions {
  window: Window;
  document: Document;
  adapter: GoatCounterAnalyticsAdapter;
  buildIntent: "review" | "public";
  isEnabled?: boolean;
}

// The public bootstrap owns one binding per document. Nothing runs on import.
export function bindSiteAnalytics({
  window: view,
  document,
  adapter,
  buildIntent,
  isEnabled = false,
}: SiteAnalyticsOptions): () => void {
  const { origin, pathname } = view.location;
  function hasOptedOut(): boolean {
    const navigator = view.navigator as Navigator & {
      globalPrivacyControl?: boolean;
    };
    return (
      navigator.doNotTrack === "1" ||
      navigator.globalPrivacyControl === true ||
      new URLSearchParams(view.location.search)
        .getAll("analytics")
        .includes("off") ||
      new URLSearchParams(view.location.hash.slice(1))
        .getAll("analytics")
        .includes("off")
    );
  }
  if (
    isEnabled !== true ||
    buildIntent !== "public" ||
    view.navigator.webdriver ||
    hasOptedOut() ||
    origin !== adapter.origin ||
    !adapter.hasPublicPath(pathname)
  )
    return () => {};

  const page = { pageUrl: `${origin}${pathname}`, referrer: null };
  const isEntry = adapter.hasEntryPath(pathname);
  const story = isEntry
    ? document.querySelector('section.entry-prose[aria-label="Story"]')
    : null;
  let state = createArticleReadingState(
    view.performance.now(),
    document.visibilityState === "visible",
  );
  let timer: number | undefined;
  let isStopped = false;
  let isSuspended = false;

  function send(action: () => Promise<unknown>): void {
    try {
      // A privacy choice stops this document, including later BFCache restores.
      if (isStopped) return;
      if (hasOptedOut()) {
        stop();
        return;
      }
      void action().catch(() => {});
    } catch {
      // Analytics cannot interrupt reading or navigation, including a transport failure.
    }
  }

  function clearTimer(): void {
    if (timer !== undefined) view.clearInterval(timer);
    timer = undefined;
  }

  function observe(isVisible = document.visibilityState === "visible"): void {
    if (isStopped || !isEntry || !story || view.innerHeight <= 0) return;
    const bounds = story.getBoundingClientRect();
    const observation = observeArticleReading(state, {
      atMs: view.performance.now(),
      isVisible,
      story:
        bounds.bottom > bounds.top
          ? { topPx: bounds.top, bottomPx: bounds.bottom }
          : null,
      viewport: { topPx: 0, bottomPx: view.innerHeight },
    });
    state = observation.state;
    for (const event of observation.events)
      send(() => adapter.record({ ...page, event }));
    if (state.hasEmittedDepth75) clearTimer();
  }

  function startTimer(): void {
    if (
      !isStopped &&
      isEntry &&
      story &&
      timer === undefined &&
      !state.hasEmittedDepth75
    ) {
      // Periodic measurement also catches font/image layout changes without scrolling.
      timer = view.setInterval(onObservation, 500);
    }
  }

  function onObservation(): void {
    if (!isSuspended) observe();
  }

  function onPrivacyChange(): void {
    if (hasOptedOut()) stop();
  }

  function onPageHide(): void {
    observe(false);
    isSuspended = true;
    clearTimer();
  }

  function onPageShow(): void {
    if (isStopped || !isSuspended) return;
    isSuspended = false;
    observe();
    startTimer();
  }

  function onActivation(event: MouseEvent): void {
    if (
      isStopped ||
      isSuspended ||
      !isEntry ||
      !event.isTrusted ||
      event.defaultPrevented ||
      (event.type === "click" ? event.button !== 0 : event.button !== 1)
    )
      return;
    const target = event.target as Element | null;
    if (typeof target?.closest !== "function") return;
    const link = target.closest(
      'nav[aria-labelledby="related-heading"] a[href]',
    );
    const href = link?.getAttribute("href");
    if (!href) return;
    const destination = new URL(href, page.pageUrl);
    if (
      destination.origin !== origin ||
      destination.search !== "" ||
      destination.hash !== "" ||
      !adapter.hasEntryPath(destination.pathname) ||
      link?.hasAttribute("download")
    )
      return;
    send(() =>
      adapter.record({ ...page, event: { name: "related_story_click" } }),
    );
  }

  send(() => adapter.pageview(page));
  observe();
  startTimer();
  view.addEventListener("scroll", onObservation, { passive: true });
  view.addEventListener("resize", onObservation);
  view.addEventListener("pagehide", onPageHide);
  view.addEventListener("pageshow", onPageShow);
  view.addEventListener("hashchange", onPrivacyChange);
  document.addEventListener("visibilitychange", onObservation);
  document.addEventListener("click", onActivation);
  document.addEventListener("auxclick", onActivation);

  function stop(): void {
    if (isStopped) return;
    isStopped = true;
    clearTimer();
    view.removeEventListener("scroll", onObservation);
    view.removeEventListener("resize", onObservation);
    view.removeEventListener("pagehide", onPageHide);
    view.removeEventListener("pageshow", onPageShow);
    view.removeEventListener("hashchange", onPrivacyChange);
    document.removeEventListener("visibilitychange", onObservation);
    document.removeEventListener("click", onActivation);
    document.removeEventListener("auxclick", onActivation);
  }
  return stop;
}
