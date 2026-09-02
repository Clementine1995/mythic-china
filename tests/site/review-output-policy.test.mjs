import { lstat, mkdir, mkdtemp, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import process from "node:process";

import { describe, expect, it } from "vitest";

import {
  assertReviewCssResourcePolicy,
  assertReviewHtmlResourcePolicy,
  assertReviewOutputArtifactExtensions,
  assertReviewResourceInventory,
  classifyReviewOutputEntry,
} from "../../scripts/review-output-policy.mjs";

function reviewDocument(body, head = "") {
  return `<!doctype html><html lang="en"><head>${head}<meta name="robots" content="noindex, nofollow"></head><body>${body}</body></html>`;
}

describe("review output resource policy", () => {
  it("allows only the fixed review artifact extension inventory", () => {
    expect(() =>
      assertReviewOutputArtifactExtensions([
        "index.html",
        "_astro/site.css",
        "_astro/hero.avif",
        "_astro/hero.webp",
        "_astro/font.woff2",
      ]),
    ).not.toThrow();
    for (const artifact of [
      "rogue.xhtml",
      "rogue.shtml",
      "rogue.HTML",
      "_astro/font.WOFF2",
      "_astro/site.CSS",
    ]) {
      expect(() => assertReviewOutputArtifactExtensions([artifact])).toThrow();
    }
  });

  it("allows external citations and root-relative local resources", () => {
    const html = reviewDocument(`
      <a href="https://example.org/source?a=1&amp;b=2">Source</a>
      <a href="http://example.org/archive">Archive</a>
      <link rel="stylesheet" href="/_astro/site.css">
      <picture>
        <source srcset="/_astro/hero-640.avif 640w, /_astro/hero-1280.avif 1280w">
        <img src="/_astro/hero.webp" alt="A local illustration">
      </picture>
      <svg><use href="#local-symbol"></use></svg>
      <video poster="/_astro/video-poster.webp"></video>
      <svg>
        <image href="/_astro/svg-image.webp"></image>
        <filter><feImage href="/_astro/filter-image.webp"></feImage></filter>
      </svg>
      <a href="/about/">About</a>
      <a href="#sources">Sources</a>
      <link rel="preload" as="image" href="/_astro/hero.webp" imagesrcset="/_astro/hero.webp 1x, /_astro/hero-2x.webp 2x">
      <div style="background-image: url('/_astro/surface.webp')"></div>
      <svg><linearGradient id="local-gradient"></linearGradient><rect fill="url(#local-gradient)"></rect></svg>
    `);

    const htmlResources = assertReviewHtmlResourcePolicy(html, "index.html");
    const cssResources = assertReviewCssResourcePolicy(
      '/* https://comment.example/ignored */ @font-face { src: url("/_astro/font.woff2") format("woff2"); }',
      "_astro/site.css",
    );
    expect(htmlResources.map(({ pathname }) => pathname)).toEqual([
      "/_astro/site.css",
      "/_astro/hero-640.avif",
      "/_astro/hero-1280.avif",
      "/_astro/hero.webp",
      "/_astro/video-poster.webp",
      "/_astro/svg-image.webp",
      "/_astro/filter-image.webp",
      "/_astro/hero.webp",
      "/_astro/hero.webp",
      "/_astro/hero-2x.webp",
      "/_astro/surface.webp",
    ]);
    expect(cssResources.map(({ pathname }) => pathname)).toEqual([
      "/_astro/font.woff2",
    ]);
    expect(() =>
      assertReviewResourceInventory(
        [...htmlResources, ...cssResources],
        [
          "/_astro/site.css",
          "/_astro/hero-640.avif",
          "/_astro/hero-1280.avif",
          "/_astro/hero.webp",
          "/_astro/hero-2x.webp",
          "/_astro/surface.webp",
          "/_astro/video-poster.webp",
          "/_astro/svg-image.webp",
          "/_astro/filter-image.webp",
          "/_astro/font.woff2",
        ],
      ),
    ).not.toThrow();
  });

  it("rejects root-relative HTML and CSS resources missing from output", () => {
    const htmlResources = assertReviewHtmlResourcePolicy(
      reviewDocument('<img src="/_astro/missing.webp" alt="Missing">'),
      "index.html",
    );
    const cssResources = assertReviewCssResourcePolicy(
      'body { background: url("/_astro/also-missing.webp"); }',
      "_astro/site.css",
    );
    expect(() =>
      assertReviewResourceInventory(
        [...htmlResources, ...cssResources],
        ["/index.html", "/_astro/site.css"],
      ),
    ).toThrow("missing emitted resources");
  });

  it("fails closed on linked or unsupported output entries", () => {
    const entry = (type) => ({
      isDirectory: () => type === "directory",
      isFile: () => type === "file",
      isSymbolicLink: () => type === "link",
    });
    expect(classifyReviewOutputEntry(entry("directory"), "dist/assets")).toBe(
      "directory",
    );
    expect(classifyReviewOutputEntry(entry("file"), "dist/index.html")).toBe(
      "file",
    );
    expect(() =>
      classifyReviewOutputEntry(entry("link"), "dist/linked-output"),
    ).toThrow("symbolic link");
    expect(() =>
      classifyReviewOutputEntry(entry("unknown"), "dist/device"),
    ).toThrow("unsupported entry");
  });

  it("recognizes a real directory link as linked output", async () => {
    const temporaryRoot = await mkdtemp(
      join(tmpdir(), "mythic-review-output-"),
    );
    try {
      const target = join(temporaryRoot, "target");
      const linked = join(temporaryRoot, "linked");
      await mkdir(target);
      await symlink(
        target,
        linked,
        process.platform === "win32" ? "junction" : "dir",
      );
      const linkedStats = await lstat(linked);
      expect(() => classifyReviewOutputEntry(linkedStats, linked)).toThrow(
        "symbolic link",
      );
    } finally {
      await rm(temporaryRoot, { force: true, recursive: true });
    }
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
    ["slash-script syntax", "<script/x>alert(1)</script>"],
    ["slash-event syntax", "<svg/onload=alert(1)></svg>"],
    ["slash-JavaScript URL syntax", "<a/href=javascript:alert(1)>X</a>"],
    [
      "style end-tag attributes",
      "<style>body { background: url(https://cdn.example/x.png) }</style data-x>",
    ],
    [
      "content security policy",
      `<meta http-equiv="content-security-policy" content="style-src 'none'">`,
    ],
    [
      "absolute localhost review link",
      '<a href="http://localhost:9999/about/">Broken preview origin</a>',
    ],
  ])("rejects %s", (_label, html) => {
    expect(() =>
      assertReviewHtmlResourcePolicy(reviewDocument(html), "index.html"),
    ).toThrow();
  });

  it("requires the real head robots policy instead of comment text", () => {
    const html = `<!doctype html><html><head><!-- <meta name="robots" content="noindex, nofollow"> --><meta name="robots" content="index, follow"></head><body></body></html>`;
    expect(() => assertReviewHtmlResourcePolicy(html, "index.html")).toThrow();
  });

  it.each([
    '@import "https://cdn.example/theme.css";',
    "body { background: url(//cdn.example/background.jpg); }",
    "body { background: url(data:image/png;base64,AAAA); }",
    "body { background: url(/* comment */https://cdn.example/background.jpg); }",
    '@import/**/"https://cdn.example/theme.css";',
    '@import "/_astro/other.css";',
    '@import"/_astro/other.css";',
    'body { background-image: image-set("https://cdn.example/image.webp" 1x); }',
    String.raw`@\69mport "\2f\2f cdn.example/theme.css";`,
    `.guard-a { content: "/*"; }
     body { background: url(https://cdn.example/background.jpg); }
     .guard-b { content: "*/"; }`,
    String.raw`.guard-a { content: "/*"; }
      .type-specimen__sample { font-\66 amily: system-ui !important; }
      .guard-b { content: "*/"; }`,
  ])("rejects non-local CSS resources: %s", (css) => {
    expect(() =>
      assertReviewCssResourcePolicy(css, "_astro/site.css"),
    ).toThrow();
  });

  it.each([
    '"',
    ".sample { color: red;",
    ".sample { color: rgb(0, 0, 0; }",
    ".sample { background: url(); }",
    ".sample { background: url( ); }",
  ])("rejects malformed CSS token boundaries: %s", (css) => {
    expect(() =>
      assertReviewCssResourcePolicy(css, "_astro/site.css"),
    ).toThrow();
  });
});
