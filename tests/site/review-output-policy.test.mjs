import { describe, expect, it } from "vitest";

import {
  assertReviewCssResourcePolicy,
  assertReviewHtmlResourcePolicy,
} from "../../scripts/review-output-policy.mjs";

describe("review output resource policy", () => {
  it("allows external citations and root-relative local resources", () => {
    const html = `
      <a href="https://example.org/source?a=1&amp;b=2">Source</a>
      <a href="http://example.org/archive">Archive</a>
      <link rel="stylesheet" href="/_astro/site.css">
      <picture>
        <source srcset="/_astro/hero-640.avif 640w, /_astro/hero-1280.avif 1280w">
        <img src="/_astro/hero.webp" alt="A local illustration">
      </picture>
      <svg><use href="#local-symbol"></use></svg>
      <a href="/about/">About</a>
      <a href="#sources">Sources</a>
      <link rel="preload" as="image" href="/_astro/hero.webp" imagesrcset="/_astro/hero.webp 1x, /_astro/hero-2x.webp 2x">
      <div style="background-image: url('/_astro/surface.webp')"></div>
      <svg><linearGradient id="local-gradient"></linearGradient><rect fill="url(#local-gradient)"></rect></svg>
    `;

    expect(() =>
      assertReviewHtmlResourcePolicy(html, "index.html"),
    ).not.toThrow();
    expect(() =>
      assertReviewCssResourcePolicy(
        '/* https://comment.example/ignored */ @font-face { src: url("/_astro/font.woff2") format("woff2"); }',
        "_astro/site.css",
      ),
    ).not.toThrow();
  });

  it.each([
    ["remote image", '<img src="https://tracker.example/pixel.gif">'],
    [
      "mixed srcset",
      '<source srcset="/_astro/local.avif 640w, //cdn.example/remote.avif 1280w">',
    ],
    ["iframe", '<iframe src="/embedded/"></iframe>'],
    ["form", '<form action="/submit/"></form>'],
    [
      "remote poster",
      '<video poster="https://cdn.example/poster.jpg"></video>',
    ],
    [
      "remote SVG use",
      '<svg><use href="https://cdn.example/icons.svg#mark"></use></svg>',
    ],
    ["remote icon", '<link rel="icon" href="//cdn.example/icon.svg">'],
    [
      "meta refresh",
      '<meta http-equiv="refresh" content="0;url=https://example.org">',
    ],
    [
      "entity-encoded meta refresh",
      '<meta http-equiv="refre&#x73;h" content="0;url=https://example.org">',
    ],
    [
      "anchor ping",
      '<a href="https://example.org" ping="https://tracker.example">Source</a>',
    ],
    [
      "inline remote CSS",
      '<div style="background-image:url(https://cdn.example/background.jpg)"></div>',
    ],
    [
      "inline remote CSS after quoted greater-than",
      '<div title=">" style="background-image:url(https://cdn.example/background.jpg)"></div>',
    ],
    ["single-quoted JavaScript link", "<a href='javascript:alert(1)'>X</a>"],
    [
      "entity-encoded JavaScript link",
      '<a href="javascript&#58;alert(1)">X</a>',
    ],
    ["protocol-relative link", '<a href="//tracker.example/x">X</a>'],
    [
      "entity-encoded JavaScript image-map link",
      '<area href="javascript&#58;alert(1)">',
    ],
    [
      "entity-encoded JavaScript SVG link",
      '<svg><a xlink:href="javascript&#58;alert(1)">X</a></svg>',
    ],
    [
      "remote SVG gradient",
      '<svg><linearGradient href="https://cdn.example/gradient.svg#g"></linearGradient></svg>',
    ],
    [
      "remote responsive preload",
      '<link rel="preload" as="image" href="/_astro/local.webp" imagesrcset="https://cdn.example/remote.webp 2x">',
    ],
    [
      "HTML image alias remote source",
      '<image href="/_astro/local.webp" src="https://cdn.example/remote.webp">',
    ],
    [
      "remote SVG presentation URL",
      '<svg><rect fill="url(https://cdn.example/paint.svg#p)"></rect></svg>',
    ],
    [
      "image-map ping",
      '<map><area href="https://example.org" ping="https://tracker.example"></map>',
    ],
    [
      "entity whitespace resource",
      '<img src="/&Tab;/tracker.example/pixel.gif">',
    ],
    [
      "entity backslash resource",
      '<img src="/&bsol;/tracker.example/pixel.gif">',
    ],
    [
      "entity newline resource",
      '<img src="/&NewLine;/tracker.example/pixel.gif">',
    ],
    [
      "remote SVG filter image",
      '<svg><feImage href="https://cdn.example/filter.png"></feImage></svg>',
    ],
    [
      "remote legacy background",
      '<table background="https://cdn.example/background.png"></table>',
    ],
    [
      "remote style block after quoted greater-than",
      '<style title=">">body { background: url(https://cdn.example/x.png) }</style>',
    ],
  ])("rejects %s", (_label, html) => {
    expect(() => assertReviewHtmlResourcePolicy(html, "index.html")).toThrow();
  });

  it.each([
    '@import "https://cdn.example/theme.css";',
    "body { background: url(//cdn.example/background.jpg); }",
    "body { background: url(data:image/png;base64,AAAA); }",
    "body { background: url(/* comment */https://cdn.example/background.jpg); }",
    '@import/**/"https://cdn.example/theme.css";',
    'body { background-image: image-set("https://cdn.example/image.webp" 1x); }',
    String.raw`@\69mport "\2f\2f cdn.example/theme.css";`,
  ])("rejects non-local CSS resources: %s", (css) => {
    expect(() =>
      assertReviewCssResourcePolicy(css, "_astro/site.css"),
    ).toThrow();
  });
});
