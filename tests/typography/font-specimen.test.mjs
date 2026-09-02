import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { readCjkCharacterPolicy } from "../../scripts/cjk-font-policy.mjs";
import {
  assertExactReviewNavigation,
  assertExactReviewSemanticShell,
  assertFontSpecimenCss,
  assertFontSpecimenFontFaces,
  assertFontSpecimenGlobalCss,
  assertFontSpecimenHtml,
  assertFontSpecimenResourcePolicy,
  assertNoFontSpecimenLinks,
  assertReviewHtmlInventory,
  createFontSpecimenSampleContract,
  expectedReviewHtmlFiles,
  fontSpecimenPinyinRows,
  readInternalReviewLinks,
} from "../../scripts/font-specimen-policy.mjs";

const projectRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const pinyinToneFixture =
  "ā á ǎ à ē é ě è ī í ǐ ì ō ó ǒ ò ū ú ǔ ù ǖ ǘ ǚ ǜ ü ê Ā Á Ǎ À Ē É Ě È Ī Í Ǐ Ì Ō Ó Ǒ Ò Ū Ú Ǔ Ù Ǖ Ǘ Ǚ Ǜ Ü Ê";
const validSpecimenCss = `
  .type-specimen__sample { font-synthesis: none !important; font-variation-settings: normal !important; }
  .type-specimen__mixed-inherit { font-family: inherit !important; font-weight: inherit !important; font-style: inherit !important; font-synthesis: inherit !important; font-variation-settings: inherit !important; }
  .type-specimen__sample[data-font-role="display"] { font-family: var(--font-display) !important; }
  .type-specimen__sample[data-font-role="story"] { font-family: var(--font-story) !important; }
  .type-specimen__sample[data-font-role="zh-hans-display"] { font-family: var(--font-zh-hans-display) !important; }
  .type-specimen__sample[data-font-role="zh-hant-display"] { font-family: var(--font-zh-hant-display) !important; }
  .type-specimen__sample[data-font-weight="400"] { font-weight: 400 !important; }
  .type-specimen__sample[data-font-weight="500"] { font-weight: 500 !important; }
  .type-specimen__sample[data-font-weight="560"] { font-weight: 560 !important; }
  .type-specimen__sample[data-font-weight="600"] { font-weight: 600 !important; }
  .type-specimen__sample[data-font-weight="650"] { font-weight: 650 !important; }
  .type-specimen__sample[data-font-style="normal"] { font-style: normal !important; }
  .type-specimen__sample[data-font-style="italic"] { font-style: italic !important; }
  .type-specimen__sample--fallback { font-size: 2rem; }
`;
const validGlobalCss = `
  :root {
    --font-display: "Mythic Display", Inter, ui-sans-serif, system-ui, "Segoe UI", sans-serif;
    --font-story: "Mythic Story", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
    --font-zh-hans-display: "Mythic Han Sans SC", "Noto Sans CJK SC", "PingFang SC", "Microsoft YaHei", sans-serif;
    --font-zh-hant-display: "Mythic Han Sans TC", "Noto Sans CJK TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
  }
`;
const fontFaceInventory = {
  families: [
    {
      cssAlias: "Mythic Display",
      files: [
        {
          assetId: "font-display",
          style: "normal",
          weight: "100 900",
        },
      ],
    },
  ],
};
const validFontFaceCss = `
  @font-face {
    font-family: "Mythic Display";
    src: url("/fonts/display.woff2") format("woff2");
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
  }
`;

function pinyinFixtureHtml() {
  const rows = fontSpecimenPinyinRows
    .map(
      (row) =>
        `<span class="type-specimen__mixed-row type-specimen__mixed-inherit">${row
          .map(({ text, language }) =>
            language === null
              ? text
              : `<span
                class="type-specimen__sample type-specimen__inline-cjk"
                data-inline-cjk="true"
                data-font-role="zh-hans-display"
                data-font-weight="600"
                data-font-style="normal"
                lang="${language}"
              >${text}</span>`,
          )
          .join("")}</span>`,
    )
    .join(" ");
  return `${pinyinToneFixture} <span class="type-specimen__mixed-rows type-specimen__mixed-inherit">${rows}</span>`;
}

function validSpecimenHtml(policy) {
  const contract = createFontSpecimenSampleContract(policy);
  const sampleMarkup = (sample) => {
    const content =
      sample.id === "display-pinyin-600" ? pinyinFixtureHtml() : sample.text;
    const modifierClass =
      sample.contentRole === "required"
        ? " type-specimen__sample--cjk"
        : sample.contentRole === "fallback"
          ? " type-specimen__sample--fallback"
          : "";
    return `<p
        class="type-specimen__sample${modifierClass}"
        data-font-sample="${sample.id}"
        data-font-role="${sample.fontRole}"
        data-content-role="${sample.contentRole}"
        data-font-weight="${sample.weight}"
        data-font-style="${sample.style}"
        ${sample.fallbackOnly === null ? "" : `data-fallback-only="${sample.fallbackOnly}"`}
        lang="${sample.language}"
      >${content}</p>`;
  };
  const cards = contract.map((sample, index) => {
    if (sample.contentRole === "fallback") return "";
    if (sample.contentRole === "required") {
      const fallback = contract[index + 1];
      return `<article class="type-specimen__card type-specimen__card--cjk"><p class="type-specimen__label">${sample.label}</p>${sampleMarkup(sample)}<div class="type-specimen__fallback"><p class="type-specimen__label">${fallback.label}</p>${sampleMarkup(fallback)}</div></article>`;
    }
    return `<article class="type-specimen__card"><p class="type-specimen__label">${sample.label}</p>${sampleMarkup(sample)}</article>`;
  });
  const samples = [
    `<div class="type-specimen__grid">${cards.slice(0, 8).join("")}</div>`,
    `<div class="type-specimen__cjk-grid">${cards.slice(8).join("")}</div>`,
  ].join("");
  const links = ["/", "/explore/", "/collections/", "/about/"]
    .map((href) => `<a href="${href}">${href}</a>`)
    .join("");
  return `<!doctype html><html lang="en"><head>
    <meta name="robots" content="noindex, nofollow"><title>Type specimen</title><link rel="stylesheet" href="/_astro/site.css"><style>${validSpecimenCss}</style>
  </head><body>
    <a class="skip-link" href="#main-content">Skip to content</a>
    <nav class="desktop-navigation" aria-label="Primary navigation">${links}</nav>
    <details class="mobile-navigation"><summary>Menu</summary><nav aria-label="Mobile primary navigation">${links}</nav></details>
    <main id="main-content" tabindex="-1"><article class="type-specimen page-shell" data-review-utility="type-specimen" data-review-only="true">${samples}<a href="#display">Display</a></article></main>
  </body></html>`;
}

describe("M4-U5A font specimen policy", () => {
  it("accepts the exact review inventory, navigation, and specimen matrix", async () => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    const html = validSpecimenHtml(policy);

    expect(() =>
      assertReviewHtmlInventory(expectedReviewHtmlFiles),
    ).not.toThrow();
    expect(() =>
      assertExactReviewNavigation(html, "review/type-specimen/index.html"),
    ).not.toThrow();
    expect(() =>
      assertExactReviewSemanticShell(html, "review/type-specimen/index.html"),
    ).not.toThrow();
    expect(() =>
      assertNoFontSpecimenLinks(html, "review/type-specimen/index.html"),
    ).not.toThrow();
    expect(() => assertFontSpecimenHtml(html, policy)).not.toThrow();
  });

  it.each([
    ["missing page", (files) => files.slice(1)],
    ["extra page", (files) => [...files, "review/extra/index.html"]],
    [
      "wrong route",
      (files) =>
        files.map((file) =>
          file === "review/type-specimen/index.html"
            ? "review/font-specimen/index.html"
            : file,
        ),
    ],
  ])("rejects a %s in the review inventory", (_label, mutate) => {
    expect(() =>
      assertReviewHtmlInventory(mutate(expectedReviewHtmlFiles)),
    ).toThrow("M4 review HTML inventory");
  });

  it("rejects a navigation link to the specimen", async () => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    const html = validSpecimenHtml(policy).replace(
      '<a href="/about/">/about/</a>',
      '<a href="/about/">/about/</a><a href="/review/type-specimen/">Specimen</a>',
    );
    expect(() => assertExactReviewNavigation(html, "fixture.html")).toThrow(
      "Primary navigation drifted",
    );
  });

  it("rejects inactive or displaced semantic shell markup", async () => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    const html = validSpecimenHtml(policy);
    const inactiveSkipLink = html.replace(
      '<a class="skip-link" href="#main-content">Skip to content</a>',
      '<!-- <a class="skip-link" href="#main-content">Skip to content</a> -->',
    );
    expect(() =>
      assertExactReviewSemanticShell(inactiveSkipLink, "fixture.html"),
    ).toThrow("semantic shell");

    const displacedMobileNavigation = html.replace(
      `<details class="mobile-navigation"><summary>Menu</summary><nav aria-label="Mobile primary navigation">${[
        "/",
        "/explore/",
        "/collections/",
        "/about/",
      ]
        .map((href) => `<a href="${href}">${href}</a>`)
        .join("")}</nav></details>`,
      `<details class="mobile-navigation"><summary>Menu</summary></details><nav aria-label="Mobile primary navigation">${[
        "/",
        "/explore/",
        "/collections/",
        "/about/",
      ]
        .map((href) => `<a href="${href}">${href}</a>`)
        .join("")}</nav>`,
    );
    expect(() =>
      assertExactReviewNavigation(displacedMobileNavigation, "fixture.html"),
    ).not.toThrow();
    expect(() =>
      assertExactReviewSemanticShell(displacedMobileNavigation, "fixture.html"),
    ).toThrow("semantic shell");
  });

  it("rejects equivalent direct-only specimen links", async () => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    for (const [href, relativePath, baseHref] of [
      ["/review/type-specimen", "index.html", null],
      ["/review/type-specimen/?from=home", "index.html", null],
      ["/review/%74ype-specimen/#display", "index.html", null],
      ["review/type-specimen/", "index.html", null],
      ["../review/type-specimen/", "about/index.html", null],
      ["../../review/type-specimen/", "explore/zhong-kui/index.html", null],
      ["https://review.invalid/review/type-specimen/", "index.html", null],
      ["http://localhost:4321/review/type-specimen/", "index.html", null],
      ["review/type-specimen/", "about/index.html", "/"],
      ["#display", "index.html", "/review/type-specimen/"],
      ["", "index.html", "/review/type-specimen/"],
      ["?view=display", "index.html", "/review/type-specimen/"],
    ]) {
      let html = validSpecimenHtml(policy).replace(
        "</article>",
        `<a href="${href}">Hidden utility</a></article>`,
      );
      if (baseHref !== null) {
        html = html.replace(
          "<title>Type specimen</title>",
          `<base href="${baseHref}"><title>Type specimen</title>`,
        );
      }
      expect(() => assertNoFontSpecimenLinks(html, relativePath)).toThrow(
        "direct-only type specimen route",
      );
    }

    expect(
      readInternalReviewLinks(
        '<a href="http://localhost:4321/definitely-missing/">Broken</a>',
        "index.html",
      ),
    ).toEqual([
      {
        href: "http://localhost:4321/definitely-missing/",
        pathname: "/definitely-missing/",
      },
    ]);

    const areaHtml = validSpecimenHtml(policy).replace(
      "</article>",
      '<map name="specimen-map"><area href="review/type-specimen/" alt="Specimen"></map></article>',
    );
    expect(() => assertNoFontSpecimenLinks(areaHtml, "index.html")).toThrow(
      "direct-only type specimen route",
    );

    const shadowDomHtml = validSpecimenHtml(policy).replace(
      "</article>",
      '<template shadowrootmode="open"><a href="/review/type-specimen/">Specimen</a></template></article>',
    );
    expect(() =>
      assertNoFontSpecimenLinks(shadowDomHtml, "index.html"),
    ).toThrow("template link surface");

    const discoveryLinkHtml = validSpecimenHtml(policy).replace(
      "</head>",
      '<link rel="prefetch" href="/review/type-specimen/"></head>',
    );
    expect(() =>
      assertNoFontSpecimenLinks(discoveryLinkHtml, "index.html"),
    ).toThrow("direct-only type specimen route");
  });

  it.each([
    [
      "required character",
      (html, contract) =>
        html.replace(contract[8].text, contract[8].text.slice(1)),
    ],
    ["pinyin diacritic", (html) => html.replace("ā á ǎ à", "a á ǎ à")],
    [
      "pinyin language",
      (html) => html.replace('lang="zh-Latn-pinyin"', 'lang="en"'),
    ],
    [
      "sample CSS class",
      (html) =>
        html.replace('class="type-specimen__sample"', 'class="not-a-sample"'),
    ],
    [
      "sample extra hiding class",
      (html) =>
        html.replace(
          'class="type-specimen__sample"',
          'class="type-specimen__sample mobile-navigation"',
        ),
    ],
    [
      "sample tag",
      (html) =>
        html
          .replace(
            '<p\n        class="type-specimen__sample"\n        data-font-sample="display-hero-400"',
            '<div\n        class="type-specimen__sample"\n        data-font-sample="display-hero-400"',
          )
          .replace(
            ">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>",
            ">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>",
          ),
    ],
    [
      "sample popover attribute",
      (html) =>
        html.replace(
          'class="type-specimen__sample"',
          'class="type-specimen__sample" popover',
        ),
    ],
    [
      "mixed pinyin inherited language",
      (html) =>
        html.replace(
          '<span class="type-specimen__mixed-rows type-specimen__mixed-inherit">',
          '<span class="type-specimen__mixed-rows type-specimen__mixed-inherit" lang="en">',
        ),
    ],
    [
      "mixed pinyin row visibility",
      (html) =>
        html.replace(
          '<span class="type-specimen__mixed-row type-specimen__mixed-inherit">',
          '<span class="type-specimen__mixed-row type-specimen__mixed-inherit" hidden>',
        ),
    ],
    [
      "inline CJK aria visibility",
      (html) =>
        html.replace(
          'data-inline-cjk="true"',
          'data-inline-cjk="true" aria-hidden=" TRUE "',
        ),
    ],
    [
      "sample ancestor visibility",
      (html) =>
        html.replace(
          '<article class="type-specimen page-shell" data-review-utility="type-specimen"',
          '<article class="type-specimen page-shell" hidden data-review-utility="type-specimen"',
        ),
    ],
    [
      "sample ancestor aria visibility",
      (html) =>
        html.replace(
          '<article class="type-specimen page-shell" data-review-utility="type-specimen"',
          '<article class="type-specimen page-shell" aria-hidden=" TRUE " data-review-utility="type-specimen"',
        ),
    ],
    [
      "sample outside review root",
      (html) => {
        const card = html.match(
          /<article class="type-specimen__card">[\s\S]*?<\/article>/u,
        )?.[0];
        return card === undefined
          ? html
          : html
              .replace(card, "")
              .replace(
                '<article class="type-specimen page-shell"',
                `${card}<article class="type-specimen page-shell"`,
              );
      },
    ],
    [
      "canvas fallback root ancestor",
      (html) =>
        html
          .replace(
            '<article class="type-specimen page-shell"',
            '<canvas><article class="type-specimen page-shell"',
          )
          .replace("</article></main>", "</article></canvas></main>"),
    ],
    [
      "canvas sample card ancestor",
      (html) =>
        html
          .replace(
            '<article class="type-specimen__card">',
            '<canvas><article class="type-specimen__card">',
          )
          .replace("</article>", "</article></canvas>"),
    ],
    [
      "video dependency",
      (html) =>
        html.replace(
          "</article></main>",
          '<video poster="/_astro/hero.webp"></video></article></main>',
        ),
    ],
    [
      "detached fallback sample card",
      (html) => {
        const card = html.match(
          /<article class="type-specimen__card type-specimen__card--cjk">[\s\S]*?<\/article>/u,
        )?.[0];
        const fallback = card?.match(
          /<div class="type-specimen__fallback">[\s\S]*?<\/div>/u,
        )?.[0];
        return card === undefined || fallback === undefined
          ? html
          : html.replace(card, `${card.replace(fallback, "")}${fallback}`);
      },
    ],
    [
      "noscript sample ancestor",
      (html) =>
        html
          .replace(
            '<article class="type-specimen__card">',
            '<noscript><article class="type-specimen__card">',
          )
          .replace("</article>", "</article></noscript>"),
    ],
    [
      "closed details sample ancestor",
      (html) =>
        html
          .replace(
            '<article class="type-specimen__card">',
            '<details><article class="type-specimen__card">',
          )
          .replace("</article>", "</article></details>"),
    ],
    [
      "closed dialog sample ancestor",
      (html) =>
        html
          .replace(
            '<article class="type-specimen__card">',
            '<dialog><article class="type-specimen__card">',
          )
          .replace("</article>", "</article></dialog>"),
    ],
    [
      "popover sample ancestor",
      (html) =>
        html
          .replace(
            '<article class="type-specimen__card">',
            '<div popover><article class="type-specimen__card">',
          )
          .replace("</article>", "</article></div>"),
    ],
    ["frozen mixed name", (html) => html.replace("Nǚwā", "Nuwa")],
    [
      "frozen mixed row boundary",
      (html) =>
        html.replace(
          '</span></span> <span class="type-specimen__mixed-row type-specimen__mixed-inherit">Fēngdū ',
          '</span></span> Fēngdū <span class="type-specimen__mixed-row type-specimen__mixed-inherit">',
        ),
    ],
    [
      "visible sample label association",
      (html, contract) =>
        html
          .replace(contract[0].label, "__FIRST_LABEL__")
          .replace(contract[1].label, contract[0].label)
          .replace("__FIRST_LABEL__", contract[1].label),
    ],
    [
      "inline CJK language",
      (html) =>
        html.replace(
          'lang="zh-Hans"\n              >女娲',
          'lang="zh"\n              >女娲',
        ),
    ],
    ["language", (html) => html.replace('lang="zh-Hans"', 'lang="zh"')],
    [
      "font role",
      (html) =>
        html.replace('data-font-role="display"', 'data-font-role="story"'),
    ],
    [
      "weight",
      (html) =>
        html.replace('data-font-weight="560"', 'data-font-weight="500"'),
    ],
    [
      "style",
      (html) =>
        html.replace('data-font-style="italic"', 'data-font-style="normal"'),
    ],
    [
      "fallback marker",
      (html) => html.replace('data-fallback-only="true"', ""),
    ],
    [
      "fallback boundary",
      (html, contract) =>
        html.replace(contract[8].text, `${contract[8].text}测`),
    ],
  ])("rejects drift in %s", async (_label, mutate) => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    const contract = createFontSpecimenSampleContract(policy);
    expect(() =>
      assertFontSpecimenHtml(
        mutate(validSpecimenHtml(policy), contract),
        policy,
      ),
    ).toThrow();
  });

  it("rejects CSS role, weight, style, synthesis, and fallback overrides", () => {
    expect(() => assertFontSpecimenGlobalCss(validGlobalCss)).not.toThrow();
    expect(() =>
      assertFontSpecimenFontFaces(
        validFontFaceCss,
        fontFaceInventory,
        (sourceUrl) =>
          sourceUrl === "/fonts/display.woff2" ? "font-display" : null,
        "fixture CSS",
      ),
    ).not.toThrow();
    const mutations = [
      (css) => css.replace("var(--font-display)", "var(--font-story)"),
      (css) => css.replace("font-weight: 560", "font-weight: 500"),
      (css) => css.replace("font-style: italic", "font-style: normal"),
      (css) => css.replace("font-synthesis: none", "font-synthesis: weight"),
      (css) =>
        css.replace(
          '.type-specimen__sample[data-font-role="display"]',
          '.type-specimen__sample [data-font-role="display"]',
        ),
      (css) =>
        `${css}\n.type-specimen__sample[data-font-role="display"] { font-family: system-ui; }`,
      (css) =>
        `${css}\n.type-specimen__sample[data-font-weight="400"] { font-weight: 500; }`,
      (css) =>
        `${css}\n[data-font-role="display"] { font: 400 1rem system-ui; }`,
      (css) => `${css}\n.type-specimen { --font-display: system-ui; }`,
      (css) => `${css}\n.type-specimen__sample { all: initial; }`,
      (css) =>
        `${css}\n.type-specimen__sample { font-synthesis-weight: auto !important; }`,
      (css) =>
        `${css}\n.type-specimen__sample { font-variation-settings: "wght" 900 !important; }`,
      (css) =>
        `${css}\n.type-specimen__mixed-row { font-family: system-ui ! IMPORTANT; }`,
      (css) =>
        `${css}\n[class~="type-specimen__sample"]::first-letter { font-family: system-ui; }`,
      (css) => `${css}\np::first-line { font-weight: 400; }`,
      (css) =>
        `${css}\np::before { content: "Injected"; font-family: system-ui; }`,
      (css) => `${css}\np:after { content: "Injected"; }`,
      (css) => `${css}\n.type-specimen__sample { display: none !important; }`,
      (css) => `${css}\n.type-specimen__mixed-row { visibility: hidden; }`,
      (css) => `${css}\n.type-specimen__sample { opacity: 0; }`,
      (css) => `@media (max-width: 1px) { ${css} }`,
      (css) => `@supports (display: grid) { ${css} }`,
      (css) =>
        `${css}\n@font-face { font-family: "Mythic Display"; src: local("Arial"); font-style: normal; font-weight: 100 900; font-display: swap; }`,
      (css) =>
        css.replace(
          "font-size: 2rem",
          "font-size: 2rem; font-family: system-ui",
        ),
    ];
    for (const mutate of mutations) {
      expect(() => assertFontSpecimenCss(mutate(validSpecimenCss))).toThrow();
    }

    const validAppliedCss = [
      validGlobalCss,
      validFontFaceCss,
      validSpecimenCss,
    ].join("\n");
    expect(() =>
      assertFontSpecimenCss(validAppliedCss, { allowAppliedGlobalCss: true }),
    ).not.toThrow();
    for (const css of [validGlobalCss, validFontFaceCss, validSpecimenCss]) {
      expect(() =>
        assertFontSpecimenCss(css, {
          allowAppliedGlobalCss: true,
          requireMappings: false,
        }),
      ).not.toThrow();
    }
    for (const css of [
      `${validAppliedCss}\np::first-letter { font-family: system-ui; }`,
      `${validAppliedCss}\np::before { content: "Injected"; }`,
      `${validAppliedCss}\n.type-specimen__card { display: none; }`,
      `${validAppliedCss}\np { display: none; }`,
      `${validAppliedCss}\n.type-specimen__sample { --hide: none; display: var(--hide); }`,
      `${validAppliedCss}\n@keyframes conceal { to { opacity: 0; } }`,
      `${validAppliedCss}\n.type-specimen__sample { color: transparent; }`,
      `${validAppliedCss}\n.type-specimen__sample { font-size: 0; }`,
      `${validAppliedCss}\n.type-specimen::before { content: ""; position: fixed; inset: 0; z-index: 2147483647; background: black; }`,
      `${validAppliedCss}\n.type-specimen:is(.page-shell, .never)::before { content: ""; position: fixed; inset: 0; z-index: 2147483647; background: black; }`,
      `${validAppliedCss}\n.type-specimen__sample { transform: scale(0); }`,
      `${validAppliedCss}\n[data-font-sample] { clip-path: inset(50%); }`,
      `${validAppliedCss}\n.type-specimen__card { position: fixed; left: -9999px; }`,
    ]) {
      expect(() =>
        assertFontSpecimenCss(css, { allowAppliedGlobalCss: true }),
      ).toThrow();
    }

    expect(() =>
      assertFontSpecimenResourcePolicy([
        {
          context: "fixture CSS url()",
          pathname: "/_astro/hero.webp",
        },
      ]),
    ).toThrow("image dependency");
    expect(() =>
      assertFontSpecimenResourcePolicy([
        {
          context: "fixture CSS url()",
          pathname: "/_astro/font.woff2",
        },
      ]),
    ).not.toThrow();

    for (const css of [
      `${validGlobalCss}\n.type-specimen { --font-display: system-ui; }`,
      validGlobalCss.replace(
        '"Mythic Display", Inter, ui-sans-serif, system-ui, "Segoe UI", sans-serif',
        "system-ui, sans-serif",
      ),
      validGlobalCss.replace('"Mythic Display"', '"MythicDisplay"'),
      validGlobalCss.replace('"Mythic Display"', '"Mythic/*literal*/ Display"'),
      `${validGlobalCss}\n[class][lang] { font-family: system-ui !important; }`,
      `${validGlobalCss}\n[class][lang] { font-synthesis-weight: auto !important; }`,
      `${validGlobalCss}\n[class][lang] { font-variation-settings: "wght" 900 !important; }`,
      `${validGlobalCss}\n* { all: initial !important; }`,
      `${validGlobalCss}\n@property --font-display { syntax: "*"; inherits: false; initial-value: system-ui; }`,
      `${validGlobalCss}\n@property/**/--font-display { syntax: "*"; inherits: false; initial-value: system-ui; }`,
    ]) {
      expect(() => assertFontSpecimenGlobalCss(css)).toThrow();
    }

    for (const css of [
      validFontFaceCss.replace(
        'url("/fonts/display.woff2") format("woff2")',
        'local("Arial")',
      ),
      `${validFontFaceCss}\n@font-face { font-family: "Mythic Display"; src: local("Arial"); font-style: normal; font-weight: 100 900; font-display: swap; }`,
      validFontFaceCss.replace(
        "font-display: swap;",
        "font-display: swap; unicode-range: U+0;",
      ),
      validFontFaceCss.replace('"Mythic Display"', '"MythicDisplay"'),
      validFontFaceCss.replace("font-weight: 100 900", "font-weight: 100900"),
      `${validFontFaceCss}\n<!--\n@font-face { font-family: "Injected"; src: local("Arial"); font-style: normal; font-weight: 400; font-display: swap; }\n-->`,
    ]) {
      expect(() =>
        assertFontSpecimenFontFaces(
          css,
          fontFaceInventory,
          (sourceUrl) =>
            sourceUrl === "/fonts/display.woff2" ? "font-display" : null,
          "fixture CSS",
        ),
      ).toThrow();
    }
  });

  it.each([
    ["robots", (html) => html.replace("noindex, nofollow", "index, follow")],
    [
      "canonical",
      (html) =>
        html.replace(
          "</head>",
          '<link rel="canonical" href="https://example.com/review/type-specimen/"></head>',
        ),
    ],
    [
      "Open Graph",
      (html) =>
        html.replace(
          "</head>",
          '<meta property="og:title" content="Type specimen"></head>',
        ),
    ],
    [
      "RSS discovery",
      (html) =>
        html.replace(
          "</head>",
          '<link rel="alternate" type="application/rss+xml" href="/rss.xml"></head>',
        ),
    ],
    [
      "client JavaScript",
      (html) => html.replace("</body>", "<script></script></body>"),
    ],
    [
      "conditional inline style",
      (html) => html.replace("<style>", '<style media="not all">'),
    ],
    [
      "alternate stylesheet",
      (html) =>
        html.replace(
          "</head>",
          '<link rel="alternate stylesheet" href="/_astro/site.css"></head>',
        ),
    ],
    [
      "missing linked stylesheet",
      (html) =>
        html.replace('<link rel="stylesheet" href="/_astro/site.css">', ""),
    ],
    [
      "stylesheet outside head",
      (html) =>
        html
          .replace('<link rel="stylesheet" href="/_astro/site.css">', "")
          .replace(
            "</body>",
            '<link rel="stylesheet" href="/_astro/site.css"></body>',
          ),
    ],
    [
      "content security policy",
      (html) =>
        html.replace(
          "</head>",
          '<meta http-equiv="Content-Security-Policy" content="style-src \'none\'">\n</head>',
        ),
    ],
  ])("rejects specimen %s output", async (_label, mutate) => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    expect(() =>
      assertFontSpecimenHtml(mutate(validSpecimenHtml(policy)), policy),
    ).toThrow();
  });

  it("rejects bot overrides, alternate discovery, and robots outside head", async () => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    const mutations = [
      (html) =>
        html.replace(
          "</head>",
          '<meta name="googlebot" content="index, follow"></head>',
        ),
      (html) =>
        html.replace(
          "</head>",
          '<link rel="alternate" hreflang="zh-Hans" href="/zh-hans/review/type-specimen/"></head>',
        ),
      (html) =>
        html.replace(
          "</head>",
          '<meta name="twitter:card" content="summary"></head>',
        ),
      (html) =>
        html.replace(
          "</head>",
          '<link rel="alternate" type="application/atom+xml" href="/atom.xml"></head>',
        ),
      (html) =>
        html
          .replace('<meta name="robots" content="noindex, nofollow">', "")
          .replace(
            "</body>",
            '<meta name="robots" content="noindex, nofollow"></body>',
          ),
      (html) =>
        html.replace(
          "</article>",
          '<p style="--font-display: system-ui"></p></article>',
        ),
      (html) =>
        html.replace(
          "type-specimen__mixed-rows type-specimen__mixed-inherit",
          "type-specimen__mixed-rows",
        ),
      (html) =>
        html.replace(
          "A river of names becomes a map when every source stays visible.",
          '<font face="Arial">A river of names becomes a map when every source stays visible.</font>',
        ),
      (html) =>
        html.replace("</body>", "<style>p { color: red; }</style></body>"),
    ];
    for (const mutate of mutations) {
      expect(() =>
        assertFontSpecimenHtml(mutate(validSpecimenHtml(policy)), policy),
      ).toThrow();
    }
  });
});
