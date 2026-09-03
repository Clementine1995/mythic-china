import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

describe("responsive review layout", () => {
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

  it("keeps inert interaction controls legible and shrinkable", async () => {
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );

    expect(globalCss).toMatch(
      /\.interaction-field input,\s*\.interaction-preview button\s*\{[^}]*min-height: 2\.75rem;/su,
    );
    expect(globalCss).toMatch(
      /\.interaction-preview :disabled\s*\{[^}]*opacity: 1;/su,
    );

    const mobileStart = globalCss.indexOf("@media (max-width: 47.99rem)");
    const mobileEnd = globalCss.indexOf(
      "/* Motion accessibility. */",
      mobileStart,
    );
    const mobileCss = globalCss.slice(mobileStart, mobileEnd);
    const newsletterControls = mobileCss.match(
      /\.newsletter-form__controls\s*\{([^}]*)\}/u,
    );

    expect(newsletterControls?.[1]).toContain(
      "grid-template-columns: minmax(0, 1fr);",
    );
  });
});
