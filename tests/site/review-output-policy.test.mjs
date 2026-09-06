import { lstat, mkdir, mkdtemp, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import process from "node:process";

import { describe, expect, it } from "vitest";

import {
  assertReviewCollectionReadingPath,
  assertReviewCssResourcePolicy,
  assertReviewEntryCollectionMembership,
  assertReviewEntryContentNote,
  assertReviewHtmlResourcePolicy,
  assertReviewInteractionSurface,
  assertReviewOutputArtifactExtensions,
  assertReviewPrivacyNotice,
  assertReviewResourceInventory,
  classifyReviewOutputEntry,
  indexReviewRelationshipContracts,
} from "../../scripts/review-output-policy.mjs";

function reviewDocument(body, head = "") {
  return `<!doctype html><html lang="en"><head>${head}<meta name="robots" content="noindex, nofollow"></head><body>${body}</body></html>`;
}

function newsletterFooter() {
  return `<footer class="site-footer">
    <section class="newsletter-form page-shell" data-review-interaction="newsletter" data-review-state="inactive">
      <label for="footer-newsletter-email">Email address</label>
      <input id="footer-newsletter-email" type="email" autocomplete="email" disabled>
      <button type="button" disabled>Subscribe</button>
      <p>Receive new Mythic China stories and occasional editorial selections, no more than twice a month.</p>
      <p>subscriptions are not open. When they open, confirm your subscription and unsubscribe from any email.</p>
      <a href="/privacy/">Privacy Notice</a>
    </section>
  </footer>`;
}

function readerRequest(pageId = "entry-one", extra = "") {
  return `<section class="entry-section reader-request" data-review-interaction="reader-request" data-review-state="inactive" data-page-id="${pageId}">
    <p>What should we explore next? Topic or tale is required. Email is optional.</p>
    <p>This does not subscribe me to the newsletter.</p>
    ${extra}
    <button type="button" disabled>Reader Requests are not open</button>
    <a href="/privacy/">Privacy Notice</a>
  </section>`;
}

function guidedPath(hrefs) {
  return `<section class="guided-path" aria-labelledby="guided-path-heading">
    <h2 id="guided-path-heading">Follow the guided path</h2>
    <ol>${hrefs.map((href) => `<li><a href="${href}">Entry</a></li>`).join("")}</ol>
  </section>`;
}

function collectionReadingPath(hrefs, collectionId = "collection-internal-id") {
  return `<article class="collection-page" data-realm="${collectionId}">
    ${guidedPath(hrefs)}
  </article>`;
}

function membershipNav(href) {
  return `<nav class="entry-section" aria-labelledby="collections-heading">
    <h2 id="collections-heading">Part of a collection</h2>
    <ul><li><a href="${href}">Collection</a></li></ul>
  </nav>`;
}

function collectionMembership(href) {
  return `<article class="entry-page">${membershipNav(href)}</article>`;
}

function entryWithContentNote(note = null) {
  const contentNote =
    note === null
      ? ""
      : `<aside class="entry-section entry-content-note" aria-labelledby="content-note-heading">
          <p class="section-context">Before reading</p>
          <h2 id="content-note-heading">Content note</h2>
          <p>${note}</p>
        </aside>`;
  return `<article class="entry-page">
    <div class="entry-attribution"><p>By Mythic China Editorial</p></div>
    <div class="entry-reading">
      ${contentNote}
      <section class="entry-opening" aria-label="Opening"><p>Opening.</p></section>
      <section class="entry-section" aria-labelledby="quick-answer-heading"><h2 id="quick-answer-heading">Quick Answer</h2></section>
      <section class="entry-prose" aria-label="Story"><p>Story.</p></section>
    </div>
  </article>`;
}

describe("review output resource policy", () => {
  it("accepts exact reading paths and memberships with independent public slugs", () => {
    const contracts = [
      {
        collectionId: "collection-internal-id",
        outputPath: "collections/public-collection-slug/index.html",
        href: "/collections/public-collection-slug/",
        entries: [
          {
            entryId: "guide-internal-id",
            outputPath: "explore/public-guide-slug/index.html",
            href: "/explore/public-guide-slug/",
          },
          {
            entryId: "tale-internal-id",
            outputPath: "explore/public-tale-slug/index.html",
            href: "/explore/public-tale-slug/",
          },
        ],
      },
    ];
    const { collectionIdsByOutputPath, entryIdsByOutputPath } =
      indexReviewRelationshipContracts(contracts);

    expect(
      collectionIdsByOutputPath.get(
        "collections/public-collection-slug/index.html",
      ),
    ).toBe("collection-internal-id");
    expect(
      entryIdsByOutputPath.get("explore/public-guide-slug/index.html"),
    ).toBe("guide-internal-id");
    expect(() =>
      assertReviewCollectionReadingPath(
        reviewDocument(
          collectionReadingPath([
            "/explore/public-guide-slug/",
            "/explore/public-tale-slug/",
          ]),
        ),
        "collections/public-collection-slug/index.html",
        "collection-internal-id",
        ["/explore/public-guide-slug/", "/explore/public-tale-slug/"],
      ),
    ).not.toThrow();
    expect(() =>
      assertReviewEntryCollectionMembership(
        reviewDocument(
          `<header><nav><a href="/">Home</a><a href="/explore/">Explore</a><a href="/collections/">Collections</a><a href="/about/">About</a></nav></header>${collectionMembership("/collections/public-slug/")}`,
        ),
        "explore/internal-entry-id/index.html",
        "/collections/public-slug/",
      ),
    ).not.toThrow();
  });

  it("accepts an exact named content note before all Entry reading content", () => {
    const note = "This article includes difficult material.";
    expect(() =>
      assertReviewEntryContentNote(
        reviewDocument(entryWithContentNote(note)),
        "explore/entry-one/index.html",
        note,
      ),
    ).not.toThrow();
    expect(() =>
      assertReviewEntryContentNote(
        reviewDocument(entryWithContentNote()),
        "explore/entry-two/index.html",
        null,
      ),
    ).not.toThrow();
    expect(() =>
      assertReviewEntryContentNote(
        reviewDocument(
          entryWithContentNote(note)
            .replace(
              '<section class="entry-opening" aria-label="Opening"><p>Opening.</p></section>',
              "",
            )
            .replace(
              '<section class="entry-section" aria-labelledby="quick-answer-heading"><h2 id="quick-answer-heading">Quick Answer</h2></section>',
              "",
            )
            .replace(
              '<section class="entry-prose" aria-label="Story"><p>Story.</p></section>',
              "",
            ),
        ),
        "explore/entry-three/index.html",
        note,
      ),
    ).not.toThrow();
  });

  it.each([
    ["wrong copy", entryWithContentNote("Different copy."), "Expected copy."],
    [
      "wrong reading order",
      entryWithContentNote("Expected copy.")
        .replace(
          '<section class="entry-opening" aria-label="Opening"><p>Opening.</p></section>',
          '<section class="entry-opening" aria-label="Opening"><p>Opening.</p></section><aside class="entry-section entry-content-note" aria-labelledby="content-note-heading"><p class="section-context">Before reading</p><h2 id="content-note-heading">Content note</h2><p>Expected copy.</p></aside>',
        )
        .replace(
          '<aside class="entry-section entry-content-note" aria-labelledby="content-note-heading">\n          <p class="section-context">Before reading</p>\n          <h2 id="content-note-heading">Content note</h2>\n          <p>Expected copy.</p>\n        </aside>',
          "",
        ),
      "Expected copy.",
    ],
    [
      "wrong accessible name",
      entryWithContentNote("Expected copy.").replace(
        'aria-labelledby="content-note-heading"',
        'aria-labelledby="missing-heading"',
      ),
      "Expected copy.",
    ],
    [
      "duplicate opening without the other required reading sections",
      entryWithContentNote("Expected copy.")
        .replace(
          '<section class="entry-section" aria-labelledby="quick-answer-heading"><h2 id="quick-answer-heading">Quick Answer</h2></section>',
          '<section class="entry-opening" aria-label="Opening"><p>Second opening.</p></section>',
        )
        .replace(
          '<section class="entry-prose" aria-label="Story"><p>Story.</p></section>',
          '<section class="entry-opening" aria-label="Opening"><p>Third opening.</p></section>',
        ),
      "Expected copy.",
    ],
    [
      "nested heading",
      entryWithContentNote("Expected copy.").replace(
        '<h2 id="content-note-heading">Content note</h2>',
        '<div><h2 id="content-note-heading">Content note</h2></div>',
      ),
      "Expected copy.",
    ],
    [
      "linked body copy",
      entryWithContentNote("Expected copy.").replace(
        "<p>Expected copy.</p>",
        '<p><a href="/more/">Expected copy.</a></p>',
      ),
      "Expected copy.",
    ],
    [
      "direct text outside the named children",
      entryWithContentNote("Expected copy.").replace(
        '<p class="section-context">Before reading</p>',
        'Unexpected text.<p class="section-context">Before reading</p>',
      ),
      "Expected copy.",
    ],
    [
      "alert semantics",
      entryWithContentNote("Expected copy.").replace(
        '<aside class="entry-section entry-content-note"',
        '<aside role="alert" aria-live="assertive" class="entry-section entry-content-note"',
      ),
      "Expected copy.",
    ],
    [
      "hidden state",
      entryWithContentNote("Expected copy.").replace(
        '<aside class="entry-section entry-content-note"',
        '<aside hidden class="entry-section entry-content-note"',
      ),
      "Expected copy.",
    ],
    [
      "hidden heading",
      entryWithContentNote("Expected copy.").replace(
        '<h2 id="content-note-heading">',
        '<h2 hidden id="content-note-heading">',
      ),
      "Expected copy.",
    ],
    [
      "aria-hidden body",
      entryWithContentNote("Expected copy.").replace(
        "<p>Expected copy.</p>",
        '<p aria-hidden="true">Expected copy.</p>',
      ),
      "Expected copy.",
    ],
    [
      "inline style on a child",
      entryWithContentNote("Expected copy.").replace(
        '<p class="section-context">',
        '<p style="display: none" class="section-context">',
      ),
      "Expected copy.",
    ],
    [
      "alert and live semantics on a child",
      entryWithContentNote("Expected copy.").replace(
        "<p>Expected copy.</p>",
        '<p role="alert" aria-live="assertive">Expected copy.</p>',
      ),
      "Expected copy.",
    ],
    [
      "reading before attribution",
      entryWithContentNote("Expected copy.").replace(
        '<div class="entry-attribution"><p>By Mythic China Editorial</p></div>\n    <div class="entry-reading">',
        '<div class="entry-reading"><div class="entry-attribution"><p>By Mythic China Editorial</p></div>',
      ),
      "Expected copy.",
    ],
    [
      "visibly named note with its selectors removed",
      entryWithContentNote("Expected copy.")
        .replace(" entry-content-note", "")
        .replace(' id="content-note-heading"', "")
        .replace(' aria-labelledby="content-note-heading"', ""),
      null,
    ],
    ["unexpected note", entryWithContentNote("Expected copy."), null],
  ])("rejects an Entry content note with %s", (_case, body, expected) => {
    expect(() =>
      assertReviewEntryContentNote(
        reviewDocument(body),
        "explore/entry-one/index.html",
        expected,
      ),
    ).toThrow();
  });

  it.each([
    ["Collection ID", "collectionId"],
    ["Collection output path", "outputPath"],
    ["Collection href", "href"],
  ])("rejects a duplicate %s in relationship contracts", (_label, field) => {
    const first = {
      collectionId: "collection-one",
      outputPath: "collections/collection-one/index.html",
      href: "/collections/collection-one/",
      entries: [
        {
          entryId: "entry-one",
          outputPath: "explore/entry-one/index.html",
          href: "/explore/entry-one/",
        },
      ],
    };
    const second = {
      collectionId: "collection-two",
      outputPath: "collections/collection-two/index.html",
      href: "/collections/collection-two/",
      entries: [
        {
          entryId: "entry-two",
          outputPath: "explore/entry-two/index.html",
          href: "/explore/entry-two/",
        },
      ],
    };
    second[field] = first[field];

    expect(() => indexReviewRelationshipContracts([first, second])).toThrow();
  });

  it.each([
    ["Entry ID", "entryId"],
    ["Entry output path", "outputPath"],
    ["Entry href", "href"],
  ])("rejects a duplicate %s in relationship contracts", (_label, field) => {
    const firstEntry = {
      entryId: "entry-one",
      outputPath: "explore/entry-one/index.html",
      href: "/explore/entry-one/",
    };
    const secondEntry = {
      entryId: "entry-two",
      outputPath: "explore/entry-two/index.html",
      href: "/explore/entry-two/",
    };
    secondEntry[field] = firstEntry[field];

    expect(() =>
      indexReviewRelationshipContracts([
        {
          collectionId: "collection-one",
          outputPath: "collections/collection-one/index.html",
          href: "/collections/collection-one/",
          entries: [firstEntry, secondEntry],
        },
      ]),
    ).toThrow();
  });

  it.each([
    [
      "wrong reading order",
      collectionReadingPath(["/explore/tale/", "/explore/guide/"]),
    ],
    ["missing reading-path member", collectionReadingPath(["/explore/guide/"])],
    [
      "duplicate reading-path link",
      collectionReadingPath([
        "/explore/guide/",
        "/explore/tale/",
        "/explore/tale/",
      ]),
    ],
    [
      "duplicate guided-path section",
      collectionReadingPath(["/explore/guide/", "/explore/tale/"]).replace(
        "</article>",
        `${guidedPath(["/explore/guide/", "/explore/tale/"])}</article>`,
      ),
    ],
    [
      "duplicate guided-path heading",
      `${collectionReadingPath(["/explore/guide/", "/explore/tale/"])}<h2 id="guided-path-heading">Duplicate</h2>`,
    ],
    [
      "extra guided-path heading with another ID",
      collectionReadingPath(["/explore/guide/", "/explore/tale/"]).replace(
        "<ol>",
        '<h2 id="other-heading">Duplicate</h2><ol>',
      ),
    ],
    [
      "duplicate ordered list",
      collectionReadingPath(["/explore/guide/", "/explore/tale/"]).replace(
        "</section>",
        '<ol><li><a href="/explore/guide/">Duplicate</a></li></ol></section>',
      ),
    ],
    [
      "reading-path link outside a list item",
      collectionReadingPath(["/explore/guide/", "/explore/tale/"]).replace(
        '<li><a href="/explore/guide/">Entry</a></li>',
        '<a href="/explore/guide/">Entry</a>',
      ),
    ],
    [
      "multiple reading-path links in one list item",
      collectionReadingPath(["/explore/guide/", "/explore/tale/"]).replace(
        "</li>",
        '<a href="/explore/guide/">Duplicate</a></li>',
      ),
    ],
    [
      "wrapped reading-path list item",
      collectionReadingPath(["/explore/guide/", "/explore/tale/"]).replace(
        '<li><a href="/explore/guide/">Entry</a></li>',
        '<div><li><a href="/explore/guide/">Entry</a></li></div>',
      ),
    ],
    [
      "wrong Collection ID",
      collectionReadingPath(
        ["/explore/guide/", "/explore/tale/"],
        "other-collection-id",
      ),
    ],
  ])("rejects %s", (_label, body) => {
    expect(() =>
      assertReviewCollectionReadingPath(
        reviewDocument(body),
        "collections/collection/index.html",
        "collection-internal-id",
        ["/explore/guide/", "/explore/tale/"],
      ),
    ).toThrow();
  });

  it.each([
    [
      "duplicate membership nav",
      collectionMembership("/collections/path/").replace(
        "</article>",
        `${membershipNav("/collections/path/")}</article>`,
      ),
    ],
    [
      "duplicate membership heading",
      `${collectionMembership("/collections/path/")}<h2 id="collections-heading">Duplicate</h2>`,
    ],
    [
      "duplicate membership link",
      collectionMembership("/collections/path/").replace(
        "</ul>",
        '<li><a href="/collections/path/">Duplicate</a></li></ul>',
      ),
    ],
    [
      "extra membership heading with another ID",
      collectionMembership("/collections/path/").replace(
        "<ul>",
        '<h2 id="other-heading">Duplicate</h2><ul>',
      ),
    ],
    [
      "malformed duplicate membership nav",
      collectionMembership("/collections/path/").replace(
        "</article>",
        '<nav><a href="/collections/path/">Duplicate</a></nav></article>',
      ),
    ],
    [
      "duplicate unordered list",
      collectionMembership("/collections/path/").replace(
        "</nav>",
        '<ul><li><a href="/collections/path/">Duplicate</a></li></ul></nav>',
      ),
    ],
    [
      "wrapped membership list item",
      collectionMembership("/collections/path/").replace(
        '<li><a href="/collections/path/">Collection</a></li>',
        '<div><li><a href="/collections/path/">Collection</a></li></div>',
      ),
    ],
    [
      "membership outside the Entry article",
      `<article class="entry-page"></article>${membershipNav("/collections/path/")}`,
    ],
    ["wrong membership href", collectionMembership("/collections/other/")],
    ["missing membership href", collectionMembership("")],
    [
      "membership href with a query",
      collectionMembership("/collections/path/?draft=1"),
    ],
    [
      "membership link outside a list item",
      collectionMembership("/collections/path/").replace(
        '<li><a href="/collections/path/">Collection</a></li>',
        '<a href="/collections/path/">Collection</a>',
      ),
    ],
  ])("rejects %s", (_label, body) => {
    expect(() =>
      assertReviewEntryCollectionMembership(
        reviewDocument(body),
        "explore/entry/index.html",
        "/collections/path/",
      ),
    ).toThrow();
  });

  it("accepts the exact inactive interaction surfaces", () => {
    const entryHtml = reviewDocument(`
      <main>
        <article class="entry-page">
          <section class="source-section">Sources</section>
          <nav><h2 id="collections-heading">Collection</h2></nav>
          <nav><h2 id="related-heading">Related</h2></nav>
          ${readerRequest()}
        </article>
      </main>
      ${newsletterFooter()}
    `);
    const ordinaryHtml = reviewDocument(
      `<main>Ordinary page</main>${newsletterFooter()}`,
    );

    expect(() =>
      assertReviewInteractionSurface(
        entryHtml,
        "explore/entry-one/index.html",
        "entry-one",
      ),
    ).not.toThrow();
    expect(() =>
      assertReviewInteractionSurface(ordinaryHtml, "about/index.html"),
    ).not.toThrow();
  });

  it.each([
    [
      "missing Newsletter",
      reviewDocument('<main>Page</main><footer class="site-footer"></footer>'),
      null,
    ],
    [
      "Newsletter outside Footer",
      reviewDocument(
        `<main>Page</main>${newsletterFooter().replace('<footer class="site-footer">', '<footer class="site-footer"></footer>')}`,
      ),
      null,
    ],
    [
      "Reader Request outside Entry",
      reviewDocument(`<main>${readerRequest()}</main>${newsletterFooter()}`),
      null,
    ],
    [
      "wrong Reader Request page ID",
      reviewDocument(
        `<main><article class="entry-page">${readerRequest("other-entry")}</article></main>${newsletterFooter()}`,
      ),
      "entry-one",
    ],
    [
      "Reader Request before Sources",
      reviewDocument(
        `<main><article class="entry-page">${readerRequest()}<section class="source-section">Sources</section></article></main>${newsletterFooter()}`,
      ),
      "entry-one",
    ],
    [
      "Reader Request with local fields",
      reviewDocument(
        `<main><article class="entry-page">${readerRequest("entry-one", '<input type="text" disabled>')}</article></main>${newsletterFooter()}`,
      ),
      "entry-one",
    ],
    [
      "Newsletter with an extra provider link",
      reviewDocument(
        `<main>Page</main>${newsletterFooter().replace("</section>", '<a href="https://buttondown.example/subscribe">Subscribe</a></section>')}`,
      ),
      null,
    ],
    [
      "Newsletter with an extra field type",
      reviewDocument(
        `<main>Page</main>${newsletterFooter().replace("</section>", "<select disabled><option>List</option></select></section>")}`,
      ),
      null,
    ],
    [
      "unknown interaction marker",
      reviewDocument(
        `<main><section data-review-interaction="provider-signup"></section></main>${newsletterFooter()}`,
      ),
      null,
    ],
    [
      "unregistered control outside Newsletter",
      reviewDocument(
        `<main><button type="button">Unexpected</button></main>${newsletterFooter()}`,
      ),
      null,
    ],
    [
      "provider link outside an interaction marker",
      reviewDocument(
        `<main><a href="https://forms.tally.so/r/example">Open form</a></main>${newsletterFooter()}`,
      ),
      null,
    ],
    [
      "capitalized fake Newsletter success",
      reviewDocument(
        `<main>Page</main>${newsletterFooter().replace("subscriptions are not open", "Successfully subscribed; subscriptions are not open")}`,
      ),
      null,
    ],
    [
      "capitalized fake Reader Request success",
      reviewDocument(
        `<main><article class="entry-page"><section class="source-section">Sources</section>${readerRequest("entry-one", "<p>Successfully submitted</p>")}</article></main>${newsletterFooter()}`,
      ),
      "entry-one",
    ],
  ])("rejects %s", (_label, html, expectedEntryId) => {
    expect(() =>
      assertReviewInteractionSurface(
        html,
        "fixture/index.html",
        expectedEntryId,
      ),
    ).toThrow();
  });

  it("accepts the visible Privacy review contract and rejects a mailto surface", () => {
    const privacyCopy = `
      <article class="privacy-page page-shell" data-review-notice="privacy">
        <p>Mythic China is a site brand operated by hyc in China.</p>
        <address>huyichen2019@gmail.com</address>
        <p>Retain correspondence for 60 days after a request is closed, unless a longer retention period is required by law.</p>
        <p>We are not currently accepting newsletter sign-ups and are not currently accepting Reader Requests.</p>
        <p>Buttondown uses buttondown.com; open and click tracking will remain off before the first send.</p>
        <p>Tally uses tally.so, stores form data in Google Cloud Belgium, and creates a persistent Respondent ID. Deleting provider records does not remove a Respondent ID. every 28 days, delete records that are at least 60 days old and empty Tally Trash in the same operation, producing an expected 60 to 88 days window. The sole operator is hyc, with no independent backup; a missed operation can extend that period.</p>
        <p>Plausible is not enabled; its planned service domain is plausible.io.</p>
      </article>`;
    const validHtml = reviewDocument(
      `<main id="main-content">${privacyCopy}</main>${newsletterFooter()}`,
    );
    const mailtoHtml = reviewDocument(
      `<main id="main-content">${privacyCopy.replace("huyichen2019@gmail.com", '<a href="mailto:huyichen2019@gmail.com">huyichen2019@gmail.com</a>')}</main>${newsletterFooter()}`,
    );
    const outsideMainHtml = reviewDocument(
      `${privacyCopy}<main id="main-content"></main>${newsletterFooter()}`,
    );
    const trackingEnabledHtml = reviewDocument(
      `<main id="main-content">${privacyCopy.replace("open and click tracking will remain off before the first send", "tracking may be enabled")}</main>${newsletterFooter()}`,
    );
    const retainedTrashHtml = reviewDocument(
      `<main id="main-content">${privacyCopy.replace("empty Tally Trash in the same operation", "leave deleted records in Trash")}</main>${newsletterFooter()}`,
    );

    expect(() =>
      assertReviewPrivacyNotice(validHtml, "privacy/index.html"),
    ).not.toThrow();
    expect(() =>
      assertReviewPrivacyNotice(mailtoHtml, "privacy/index.html"),
    ).toThrow();
    expect(() =>
      assertReviewPrivacyNotice(outsideMainHtml, "privacy/index.html"),
    ).toThrow();
    expect(() =>
      assertReviewPrivacyNotice(trackingEnabledHtml, "privacy/index.html"),
    ).toThrow();
    expect(() =>
      assertReviewPrivacyNotice(retainedTrashHtml, "privacy/index.html"),
    ).toThrow();
  });

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
