import type { AnalyticsEvent } from "./analytics";

interface ReadingBounds {
  readonly topPx: number;
  readonly bottomPx: number;
}

export interface ArticleReadingObservation {
  readonly atMs: number;
  readonly isVisible: boolean;
  readonly story: ReadingBounds | null;
  readonly viewport: ReadingBounds;
}

export interface ArticleReadingState {
  readonly lastObservedAtMs: number;
  readonly isVisible: boolean;
  readonly visibleDurationMs: number;
  readonly hasStoryEnteredViewport: boolean;
  readonly hasReachedDepth75: boolean;
  readonly hasEmittedQualified: boolean;
  readonly hasEmittedDepth75: boolean;
}

function requireTime(atMs: number): void {
  if (!Number.isFinite(atMs) || atMs < 0) {
    throw new RangeError("Reading time must be finite and non-negative.");
  }
}

function requireBounds(bounds: ReadingBounds): void {
  if (
    !Number.isFinite(bounds.topPx) ||
    !Number.isFinite(bounds.bottomPx) ||
    bounds.bottomPx <= bounds.topPx
  ) {
    throw new RangeError("Reading bounds must be finite with positive height.");
  }
}

export function createArticleReadingState(
  atMs: number,
  isVisible: boolean,
): ArticleReadingState {
  requireTime(atMs);
  return {
    lastObservedAtMs: atMs,
    isVisible,
    visibleDurationMs: 0,
    hasStoryEnteredViewport: false,
    hasReachedDepth75: false,
    hasEmittedQualified: false,
    hasEmittedDepth75: false,
  };
}

export function observeArticleReading(
  state: ArticleReadingState,
  observation: ArticleReadingObservation,
): { state: ArticleReadingState; events: AnalyticsEvent[] } {
  requireTime(observation.atMs);
  if (observation.atMs < state.lastObservedAtMs) {
    throw new RangeError("Reading observations must use a monotonic clock.");
  }
  requireBounds(observation.viewport);
  if (observation.story !== null) requireBounds(observation.story);

  // A visibility change closes the previous interval; hidden time never accrues.
  const visibleDurationMs =
    state.visibleDurationMs +
    (state.isVisible ? observation.atMs - state.lastObservedAtMs : 0);
  let hasStoryEnteredViewport = state.hasStoryEnteredViewport;
  let hasReachedDepth75 = state.hasReachedDepth75;
  if (observation.isVisible && observation.story !== null) {
    const { story, viewport } = observation;
    hasStoryEnteredViewport ||=
      viewport.bottomPx > story.topPx && viewport.topPx < story.bottomPx;
    // Only the measured story contributes to depth, never the whole page.
    hasReachedDepth75 ||=
      viewport.bottomPx >= story.topPx + (story.bottomPx - story.topPx) * 0.75;
  }

  const isQualified = hasStoryEnteredViewport && visibleDurationMs >= 15_000;
  const events: AnalyticsEvent[] = [];
  if (isQualified && !state.hasEmittedQualified) {
    events.push({ name: "article_session_qualified" });
  }
  if (isQualified && hasReachedDepth75 && !state.hasEmittedDepth75) {
    events.push({ name: "article_depth_75" });
  }

  return {
    state: {
      lastObservedAtMs: observation.atMs,
      isVisible: observation.isVisible,
      visibleDurationMs,
      hasStoryEnteredViewport,
      hasReachedDepth75,
      hasEmittedQualified: state.hasEmittedQualified || isQualified,
      hasEmittedDepth75:
        state.hasEmittedDepth75 || (isQualified && hasReachedDepth75),
    },
    events,
  };
}
