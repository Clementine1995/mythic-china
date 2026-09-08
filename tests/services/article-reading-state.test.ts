import { describe, expect, it, vi } from "vitest";

import {
  createArticleReadingState,
  observeArticleReading,
  type ArticleReadingObservation,
} from "../../src/services/article-reading-state";
import { analyticsEventSchema } from "../../src/services/analytics";

function observation(
  atMs: number,
  overrides: Partial<ArticleReadingObservation> = {},
): ArticleReadingObservation {
  return {
    atMs,
    isVisible: true,
    story: { topPx: 1_000, bottomPx: 2_000 },
    viewport: { topPx: 800, bottomPx: 1_400 },
    ...overrides,
  };
}

const depthViewport = { topPx: 1_150, bottomPx: 1_750 };
const qualifiedEvent = { name: "article_session_qualified" };
const depthEvent = { name: "article_depth_75" };

describe("article reading state", () => {
  it("qualifies at exactly fifteen visible seconds after the story enters view", () => {
    let result = observeArticleReading(
      createArticleReadingState(0, true),
      observation(0),
    );
    expect(result.events).toEqual([]);
    result = observeArticleReading(result.state, observation(14_999));
    expect(result.events).toEqual([]);
    result = observeArticleReading(result.state, observation(15_000));
    expect(result.events).toEqual([qualifiedEvent]);
    expect(result.state.visibleDurationMs).toBe(15_000);
  });

  it("emits depth after qualification when the viewport bottom reaches the story threshold", () => {
    let result = observeArticleReading(
      createArticleReadingState(0, true),
      observation(15_000),
    );
    expect(result.events).toEqual([qualifiedEvent]);
    result = observeArticleReading(
      result.state,
      observation(16_000, {
        viewport: { topPx: 1_149, bottomPx: 1_749 },
      }),
    );
    expect(result.events).toEqual([]);
    result = observeArticleReading(
      result.state,
      observation(17_000, { viewport: depthViewport }),
    );
    expect(result.events).toEqual([depthEvent]);
  });

  it("remembers depth reached before qualification even after scrolling back", () => {
    let result = observeArticleReading(
      createArticleReadingState(0, true),
      observation(1_000, { viewport: depthViewport }),
    );
    expect(result.events).toEqual([]);
    expect(result.state.hasReachedDepth75).toBe(true);
    result = observeArticleReading(result.state, observation(15_000));
    expect(result.events).toEqual([qualifiedEvent, depthEvent]);
  });

  it("counts visible time before the story is encountered without qualifying early", () => {
    let result = observeArticleReading(
      createArticleReadingState(0, true),
      observation(20_000, { viewport: { topPx: 0, bottomPx: 600 } }),
    );
    expect(result.events).toEqual([]);
    expect(result.state.visibleDurationMs).toBe(20_000);
    expect(result.state.hasStoryEnteredViewport).toBe(false);
    result = observeArticleReading(result.state, observation(21_000));
    expect(result.events).toEqual([qualifiedEvent]);
  });

  it("pauses hidden intervals and resumes only from the visibility transition", () => {
    let result = observeArticleReading(
      createArticleReadingState(0, true),
      observation(0),
    );
    result = observeArticleReading(
      result.state,
      observation(10_000, { isVisible: false }),
    );
    expect(result.state.visibleDurationMs).toBe(10_000);
    result = observeArticleReading(result.state, observation(60_000));
    expect(result.state.visibleDurationMs).toBe(10_000);
    expect(result.events).toEqual([]);
    result = observeArticleReading(result.state, observation(65_000));
    expect(result.events).toEqual([qualifiedEvent]);
  });

  it("ignores initially hidden time and hidden story geometry", () => {
    let result = observeArticleReading(
      createArticleReadingState(0, false),
      observation(60_000, { isVisible: false, viewport: depthViewport }),
    );
    expect(result.state.visibleDurationMs).toBe(0);
    expect(result.state.hasStoryEnteredViewport).toBe(false);
    expect(result.state.hasReachedDepth75).toBe(false);
    result = observeArticleReading(result.state, observation(61_000));
    expect(result.events).toEqual([]);
    result = observeArticleReading(result.state, observation(76_000));
    expect(result.events).toEqual([qualifiedEvent]);
  });

  it("settles visible time at a hide transition without counting the following hidden interval", () => {
    let result = observeArticleReading(
      createArticleReadingState(0, true),
      observation(0),
    );
    result = observeArticleReading(
      result.state,
      observation(15_000, { isVisible: false, viewport: depthViewport }),
    );
    expect(result.events).toEqual([qualifiedEvent]);
    expect(result.state.hasReachedDepth75).toBe(false);
    result = observeArticleReading(
      result.state,
      observation(90_000, { isVisible: false }),
    );
    expect(result.events).toEqual([]);
    expect(result.state.visibleDurationMs).toBe(15_000);
  });

  it("returns each event only once across repeated observations and scroll reversal", () => {
    let result = observeArticleReading(
      createArticleReadingState(0, true),
      observation(15_000, { viewport: depthViewport }),
    );
    expect(result.events).toEqual([qualifiedEvent, depthEvent]);
    for (const atMs of [15_000, 16_000, 30_000]) {
      result = observeArticleReading(result.state, observation(atMs));
      expect(result.events).toEqual([]);
    }
    result = observeArticleReading(
      result.state,
      observation(31_000, { viewport: depthViewport }),
    );
    expect(result.events).toEqual([]);
  });

  it("resets elapsed time, predicates and once-only state on a new page load", () => {
    const previous = observeArticleReading(
      createArticleReadingState(0, true),
      observation(15_000, { viewport: depthViewport }),
    );
    const fresh = createArticleReadingState(15_000, true);
    expect(fresh).toEqual({
      lastObservedAtMs: 15_000,
      isVisible: true,
      visibleDurationMs: 0,
      hasStoryEnteredViewport: false,
      hasReachedDepth75: false,
      hasEmittedQualified: false,
      hasEmittedDepth75: false,
    });
    expect(previous.state.hasEmittedDepth75).toBe(true);
    let result = observeArticleReading(
      fresh,
      observation(15_000, { viewport: depthViewport }),
    );
    expect(result.events).toEqual([]);
    result = observeArticleReading(result.state, observation(30_000));
    expect(result.events).toEqual([qualifiedEvent, depthEvent]);
  });

  it("does not qualify a viewport that only visits material outside the story", () => {
    let result = observeArticleReading(
      createArticleReadingState(0, true),
      observation(15_000, { viewport: { topPx: 0, bottomPx: 1_000 } }),
    );
    expect(result.events).toEqual([]);
    expect(result.state.hasStoryEnteredViewport).toBe(false);
    expect(result.state.hasReachedDepth75).toBe(false);
    result = observeArticleReading(
      result.state,
      observation(30_000, { viewport: { topPx: 2_000, bottomPx: 2_600 } }),
    );
    expect(result.events).toEqual([]);
    expect(result.state.hasStoryEnteredViewport).toBe(false);
  });

  it("uses only the story bounds for depth, excluding surrounding page sections", () => {
    const result = observeArticleReading(
      createArticleReadingState(0, true),
      observation(15_000, { viewport: depthViewport }),
    );
    // 1750 is 75% of the story at 1000..2000, regardless of content below it.
    expect(result.events).toEqual([qualifiedEvent, depthEvent]);
  });

  it("does not infer a story from missing geometry", () => {
    let result = observeArticleReading(
      createArticleReadingState(0, true),
      observation(15_000, { story: null, viewport: depthViewport }),
    );
    expect(result.events).toEqual([]);
    expect(result.state.hasStoryEnteredViewport).toBe(false);
    expect(result.state.hasReachedDepth75).toBe(false);
    result = observeArticleReading(
      result.state,
      observation(16_000, { viewport: depthViewport }),
    );
    expect(result.events).toEqual([qualifiedEvent, depthEvent]);
  });

  it("is deterministic, leaves inputs untouched and returns only approved property-free events", () => {
    const state = Object.freeze(createArticleReadingState(0, true));
    const input = Object.freeze(
      observation(15_000, {
        story: Object.freeze({ topPx: 1_000, bottomPx: 2_000 }),
        viewport: Object.freeze(depthViewport),
      }),
    );
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      throw new Error("Reading state must stay offline.");
    });
    try {
      const result = observeArticleReading(state, input);
      expect(observeArticleReading(state, input)).toEqual(result);
      expect(state.visibleDurationMs).toBe(0);
      expect(result.state).not.toBe(state);
      expect(result.events).toEqual([qualifiedEvent, depthEvent]);
      for (const event of result.events) {
        expect(analyticsEventSchema.safeParse(event).success).toBe(true);
        expect(Object.keys(event)).toEqual(["name"]);
      }
      expect(fetchSpy).not.toHaveBeenCalled();
    } finally {
      fetchSpy.mockRestore();
    }
  });

  it.each([-1, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects an invalid clock value %s instead of inferring elapsed time",
    (atMs) => {
      expect(() => createArticleReadingState(atMs, true)).toThrow(RangeError);
      expect(() =>
        observeArticleReading(
          createArticleReadingState(0, true),
          observation(atMs),
        ),
      ).toThrow(RangeError);
    },
  );

  it("rejects a backwards observation without modifying the prior state", () => {
    const state = createArticleReadingState(1_000, true);
    expect(() => observeArticleReading(state, observation(999))).toThrow(
      "monotonic clock",
    );
    expect(state.visibleDurationMs).toBe(0);
  });

  it.each([
    { topPx: 1_000, bottomPx: 1_000 },
    { topPx: 2_000, bottomPx: 1_000 },
    { topPx: Number.NaN, bottomPx: 2_000 },
    { topPx: 1_000, bottomPx: Number.POSITIVE_INFINITY },
  ])("rejects invalid story and viewport bounds %o", (bounds) => {
    const state = createArticleReadingState(0, true);
    expect(() =>
      observeArticleReading(
        state,
        observation(15_000, {
          story: bounds,
        }),
      ),
    ).toThrow(RangeError);
    expect(() =>
      observeArticleReading(
        state,
        observation(15_000, {
          viewport: bounds,
        }),
      ),
    ).toThrow(RangeError);
  });
});
