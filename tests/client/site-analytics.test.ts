import { describe, expect, it, vi } from "vitest";
import { bindSiteAnalytics } from "../../src/client/site-analytics";
import { GoatCounterAnalyticsAdapter } from "../../src/services/goatcounter-analytics";

const origin = "https://mythic-china-beta.vercel.app";
const articlePath = "/explore/painted-skin/";
const relatedPath = "/explore/fighting-cricket/";

class EventSurface {
  readonly listeners = new Map<string, Set<EventListener>>();
  addEventListener(type: string, listener: EventListener): void {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(listener);
  }
  removeEventListener(type: string, listener: EventListener): void {
    this.listeners.get(type)?.delete(listener);
  }
  fire(type: string, fields: Record<string, unknown> = {}): void {
    for (const listener of this.listeners.get(type) ?? [])
      listener({ type, ...fields } as unknown as Event);
  }
  get listenerCount(): number {
    return [...this.listeners.values()].reduce(
      (count, listeners) => count + listeners.size,
      0,
    );
  }
}

function fixture(url = origin + articlePath + "?email=private#secret") {
  let atMs = 0;
  let bounds = { top: 0, bottom: 1000 };
  let hasStory = true;
  const timers = new Map<number, () => void>();
  let timerId = 0;
  const document = Object.assign(new EventSurface(), {
    visibilityState: "visible",
    querySelector: vi.fn((selector: string) =>
      selector === 'section.entry-prose[aria-label="Story"]' && hasStory
        ? { getBoundingClientRect: () => bounds }
        : null,
    ),
  });
  const view = Object.assign(new EventSurface(), {
    location: new URL(url),
    navigator: { webdriver: false },
    innerHeight: 600,
    performance: { now: () => atMs },
    setInterval: (callback: () => void) => {
      timers.set(++timerId, callback);
      return timerId;
    },
    clearInterval: (id: number) => {
      timers.delete(id);
    },
  });
  const transport = vi.fn<
    (url: string, options: RequestInit) => Promise<{ status: number }>
  >(async () => ({ status: 200 }));
  const adapter = new GoatCounterAnalyticsAdapter(
    {
      origin,
      endpoint: "https://mythic-china.goatcounter.com/count",
      publicPaths: ["/", "/about/", articlePath, relatedPath],
      entryPaths: [articlePath, relatedPath],
    },
    transport,
  );
  const options = {
    window: view as unknown as Window,
    document: document as unknown as Document,
    adapter,
    buildIntent: "public" as const,
  };
  return {
    view,
    document,
    timers,
    transport,
    adapter,
    start: (overrides: Partial<Parameters<typeof bindSiteAnalytics>[0]> = {}) =>
      bindSiteAnalytics({ ...options, ...overrides }),
    advance: (ms: number) => {
      atMs += ms;
      for (const callback of [...timers.values()]) callback();
    },
    moveStory: (top: number, bottom: number) => {
      bounds = { top, bottom };
    },
    removeStory: () => {
      hasStory = false;
    },
    events: () =>
      transport.mock.calls.map(([url]) => new URL(url).searchParams.get("p")),
    activate: (
      overrides: Record<string, unknown> = {},
      href = relatedPath,
      isRelated = true,
    ) => {
      const link = { getAttribute: () => href, hasAttribute: () => false };
      const closest = vi.fn((selector: string) =>
        selector === 'nav[aria-labelledby="related-heading"] a[href]' &&
        isRelated
          ? link
          : null,
      );
      document.fire("click", {
        isTrusted: true,
        button: 0,
        defaultPrevented: false,
        target: { closest },
        ...overrides,
      });
    },
  };
}

describe("conditional analytics DOM binding", () => {
  it("is closed by default and has no listeners or timers when disabled", () => {
    const f = fixture();
    f.start();
    f.advance(30_000);
    f.activate();
    expect(f.transport).not.toHaveBeenCalled();
    expect(
      f.timers.size + f.document.listenerCount + f.view.listenerCount,
    ).toBe(0);
  });

  it.each([
    "http://localhost:4321" + articlePath,
    "https://preview.vercel.app" + articlePath,
    "file:///site/index.html",
    origin + "/review/type-specimen/",
    origin + "/explore/unpublished/",
    origin + "/explore/painted-skin",
  ])("rejects a nonproduction location before binding: %s", (url) => {
    const f = fixture(url);
    f.start({ isEnabled: true });
    f.advance(30_000);
    expect(f.transport).not.toHaveBeenCalled();
    expect(
      f.timers.size + f.document.listenerCount + f.view.listenerCount,
    ).toBe(0);
  });

  it("rejects review intent and browser automation even at the production URL", () => {
    const review = fixture();
    review.start({ isEnabled: true, buildIntent: "review" });
    const automation = fixture();
    automation.view.navigator.webdriver = true;
    automation.start({ isEnabled: true });
    expect(review.transport).not.toHaveBeenCalled();
    expect(automation.transport).not.toHaveBeenCalled();
  });

  it("records public non-article pageviews without reading or Related events", () => {
    const f = fixture(origin + "/about/?private=secret");
    f.start({ isEnabled: true });
    f.advance(30_000);
    f.activate();
    expect(f.events()).toEqual(["/about/"]);
    expect(f.document.querySelector).not.toHaveBeenCalled();
    expect(f.timers.size).toBe(0);
  });

  it("qualifies after visible time without scrolling, then counts measured depth once", () => {
    const f = fixture();
    f.start({ isEnabled: true });
    f.advance(14_999);
    expect(f.events()).toEqual([articlePath]);
    f.advance(1);
    expect(f.events()).toEqual([
      articlePath,
      `article_session_qualified:${articlePath}`,
    ]);
    f.moveStory(-200, 800);
    f.view.fire("scroll");
    f.view.fire("resize");
    f.advance(20_000);
    expect(f.events()).toEqual([
      articlePath,
      `article_session_qualified:${articlePath}`,
      `article_depth_75:${articlePath}`,
    ]);
    expect(f.timers.size).toBe(0);
  });

  it("remembers depth reached first and observes layout changes without a scroll", () => {
    const f = fixture();
    f.start({ isEnabled: true });
    f.moveStory(-200, 800);
    f.advance(1000);
    f.moveStory(0, 1000);
    f.advance(14_000);
    expect(f.events()).toEqual([
      articlePath,
      `article_session_qualified:${articlePath}`,
      `article_depth_75:${articlePath}`,
    ]);
  });

  it("pauses hidden time and retains a qualified reading across a back-forward restore", () => {
    const f = fixture();
    f.moveStory(-200, 800);
    f.start({ isEnabled: true });
    f.advance(5_000);
    f.document.visibilityState = "hidden";
    f.document.fire("visibilitychange");
    f.view.fire("pagehide");
    f.advance(60_000);
    expect(f.events()).toEqual([articlePath]);
    f.document.visibilityState = "visible";
    f.view.fire("pageshow");
    f.advance(9_999);
    expect(f.events()).toEqual([articlePath]);
    f.advance(1);
    expect(f.events()).toEqual([
      articlePath,
      `article_session_qualified:${articlePath}`,
      `article_depth_75:${articlePath}`,
    ]);
  });

  it("does not infer a missing Story or count sources and footer as the Story", () => {
    const missing = fixture();
    missing.removeStory();
    missing.start({ isEnabled: true });
    missing.advance(30_000);
    expect(missing.events()).toEqual([articlePath]);
    const neverEntered = fixture();
    neverEntered.moveStory(1000, 2000);
    neverEntered.start({ isEnabled: true });
    neverEntered.advance(30_000);
    expect(neverEntered.events()).toEqual([articlePath]);
  });

  it("counts trusted keyboard or pointer activations using only the source path", () => {
    const f = fixture();
    f.start({ isEnabled: true });
    f.activate({ detail: 0 });
    f.activate({ detail: 1 });
    expect(f.events()).toEqual([
      articlePath,
      `related_story_click:${articlePath}`,
      `related_story_click:${articlePath}`,
    ]);
    f.activate({ defaultPrevented: true });
    f.activate({ isTrusted: false });
    f.activate({ button: 2 });
    f.activate({}, "/explore/unpublished/");
    f.activate({}, relatedPath, false);
    f.activate({}, "https://elsewhere.example/");
    expect(f.transport).toHaveBeenCalledTimes(3);
  });

  it("stops every listener and timer and resets only for a new document", () => {
    const f = fixture();
    const stop = f.start({ isEnabled: true });
    stop();
    stop();
    f.advance(30_000);
    f.activate();
    f.view.fire("pageshow");
    expect(f.events()).toEqual([articlePath]);
    expect(
      f.timers.size + f.document.listenerCount + f.view.listenerCount,
    ).toBe(0);
    const next = fixture();
    next.moveStory(-200, 800);
    next.start({ isEnabled: true });
    next.advance(15_000);
    expect(next.events()).toHaveLength(3);
  });

  it("leaves navigation and reading available when the transport fails", () => {
    const f = fixture();
    f.transport.mockRejectedValue(new Error("private network details"));
    expect(() => {
      f.start({ isEnabled: true });
      f.advance(15_000);
      f.activate();
    }).not.toThrow();
    expect(f.transport).toHaveBeenCalledTimes(3);
  });
});
