import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

describe("responsive review layout", () => {
  it("keeps Collection text legible when Hero images fail", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    expect(globalCss).toMatch(
      /\n\.collection-hero__figure \.manifest-hero-picture\s*\{[^}]*background: var\(--realm-bg\);/su,
    );
    expect(globalCss).toMatch(
      /\n\.manifest-hero-picture\s*\{[^}]*background: var\(--surface-muted\);/su,
    );
  });

  it("reduces scrolling and transitions without changing the reading layout", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    const reducedMotionCss = globalCss.slice(
      globalCss.indexOf("@media (prefers-reduced-motion: reduce)"),
    );
    expect(reducedMotionCss).toMatch(/html\s*\{\s*scroll-behavior: auto;/su);
    expect(reducedMotionCss).toMatch(
      /\*,\s*\*::before,\s*\*::after\s*\{\s*transition-duration: 0\.01ms !important;/su,
    );
    expect(reducedMotionCss).not.toMatch(
      /(?:display|visibility|opacity|position|width|height|margin|padding)\s*:/u,
    );
  });

  it("keeps long Entry titles in normal flow at every width", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    expect(globalCss).toMatch(
      /\n\.entry-hero\s*\{[^}]*display: flex;[^}]*flex-direction: column;/su,
    );
    expect(globalCss).toMatch(
      /\n\.entry-hero__identity\s*\{[^}]*position: static;[^}]*color: var\(--ink\);/su,
    );
    expect(globalCss).not.toMatch(
      /entry-hero__identity::before|entry-page--identity-(?:start|end)/u,
    );
    expect(globalCss).not.toMatch(
      /\.entry-hero h1\s*\{[^}]*max-width: 12ch;/su,
    );
  });

  it("overrides the desktop Entry picture selector at mobile widths", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    const mobileCss = globalCss.slice(
      globalCss.indexOf("@media (max-width: 47.99rem)"),
    );
    expect(mobileCss).toMatch(
      /\.entry-hero__figure \.manifest-hero-picture,[^{]*\{[^}]*aspect-ratio: 4 \/ 5;/su,
    );
  });

  it("caps narrative prose at the established reading measure", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    expect(globalCss).toContain("--measure: 68ch;");
    expect(globalCss).toMatch(
      /\n\.entry-prose\s*\{[^}]*max-width: var\(--measure\);/su,
    );
  });

  it("uses a defined spacing token for Privacy paragraphs and address", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    expect(globalCss).toContain("--space-4: 1rem;");
    expect(globalCss).toMatch(
      /\.privacy-content p,\s*\.privacy-content address\s*\{[^}]*margin-block-start: var\(--space-4\);/su,
    );
  });

  it("keeps ancestor navigation highlighted without claiming the current page", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    expect(globalCss).toMatch(
      /\.desktop-navigation a\[aria-current="page"\],\s*\.desktop-navigation a\[aria-current="location"\]\s*\{[^}]*box-shadow:/su,
    );
    expect(globalCss).toMatch(
      /\.mobile-navigation a\[aria-current="page"\],\s*\.mobile-navigation a\[aria-current="location"\]\s*\{[^}]*background:/su,
    );
  });

  it("keeps collection hero copy in the visual grid row", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    const collectionCopyRule = globalCss.match(
      /\.collection-hero__copy\s*\{([^}]*)\}/u,
    );

    expect(collectionCopyRule?.[1]).toContain("grid-row: 1;");
  });

  it("keeps the collection visual note clear of copy at medium widths", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    const mediumStart = globalCss.indexOf("@media (max-width: 63.99rem)");
    const mediumEnd = globalCss.indexOf(
      "@media (max-width: 47.99rem)",
      mediumStart,
    );

    expect(mediumStart).toBeGreaterThanOrEqual(0);
    expect(mediumEnd).toBeGreaterThan(mediumStart);

    const mediumCss = globalCss.slice(mediumStart, mediumEnd);
    const collectionNoteRule = mediumCss.match(
      /\.collection-hero__figure \.visual-note\s*\{([^}]*)\}/u,
    );

    expect(collectionNoteRule?.[1]).toContain("max-width: 24rem;");
  });

  it("lets mobile one-column grids shrink below intrinsic child widths", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    const mobileStart = globalCss.indexOf("@media (max-width: 47.99rem)");
    const mobileEnd = globalCss.indexOf(
      "/* Motion accessibility. */",
      mobileStart,
    );

    expect(mobileStart).toBeGreaterThanOrEqual(0);
    expect(mobileEnd).toBeGreaterThan(mobileStart);

    const mobileCss = globalCss.slice(mobileStart, mobileEnd);
    const oneColumnGridRule = mobileCss.match(
      /\.collection-hero__inner,[\s\S]*?\.about-hero\s*\{([^}]*)\}/u,
    );

    expect(oneColumnGridRule?.[1]).toContain(
      "grid-template-columns: minmax(0, 1fr);",
    );

    const collectionPictureRule = mobileCss.match(
      /\.collection-hero__figure \.manifest-hero-picture\s*\{([^}]*)\}/u,
    );

    expect(collectionPictureRule?.[1]).toContain("height: auto;");
  });

  it("keeps functional-page type and review lists locally scoped", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    const functionalHeroRule = globalCss.match(
      /\.index-hero h1,\s*\.about-hero h1\s*\{([^}]*)\}/u,
    );
    const functionalHeadingRule = globalCss.match(
      /\.honest-empty-state h2,\s*\.about-method h2,\s*\.review-preview__heading h2\s*\{([^}]*)\}/u,
    );
    const reviewListRule = globalCss.match(
      /\.review-preview-list li\s*\{([^}]*)\}/u,
    );

    expect(functionalHeroRule?.[1]).toContain(
      "font-size: clamp(2.5rem, 4vw, 3.5rem);",
    );
    expect(functionalHeadingRule?.[1]).toContain(
      "font-size: clamp(1.75rem, 2.5vw, 2.25rem);",
    );
    expect(reviewListRule?.[1]).toContain(
      "grid-template-columns: repeat(12, minmax(0, 1fr));",
    );

    const globalH1Rule = globalCss.match(/\nh1\s*\{([^}]*)\}/u);
    const globalH2Rule = globalCss.match(/\nh2\s*\{([^}]*)\}/u);
    expect(globalH1Rule?.[1]).toContain(
      "font-size: clamp(2.75rem, 5.5vw, 5.5rem);",
    );
    expect(globalH2Rule?.[1]).toContain(
      "font-size: clamp(1.75rem, 3.5vw, 3rem);",
    );

    const mobileStart = globalCss.indexOf("@media (max-width: 47.99rem)");
    const mobileEnd = globalCss.indexOf(
      "/* Motion accessibility. */",
      mobileStart,
    );
    const mobileCss = globalCss.slice(mobileStart, mobileEnd);
    const mobileReviewListRule = mobileCss.match(
      /\.review-preview-list li\s*\{([^}]*)\}/u,
    );

    expect(mobileReviewListRule?.[1]).toContain(
      "grid-template-columns: minmax(0, 1fr);",
    );
  });
});
