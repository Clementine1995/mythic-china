import { describe, expect, it } from "vitest";
import {
  assertHeroPageOutput,
  heroAssetContracts,
  heroPagePlacements,
} from "../../scripts/hero-output-policy.mjs";

const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
function fixture() {
  const outputs = new Set();
  const renderFigure = (id, linked, compact) => {
    const contract = heroAssetContracts.find((item) => item.id === id);
    const sources = [];
    for (const [media, widths, direction] of [
      ["(max-width: 767px)", [640, 960, 1440], "mobile"],
      ["(min-width: 768px)", [640, 960, 1440, 1920], "desktop"],
    ]) {
      for (const format of ["avif", "webp"]) {
        const candidates = widths
          .map((width) => {
            const url =
              "/_astro/" +
              contract.family +
              "-" +
              direction +
              "-" +
              width +
              ".hash." +
              format;
            outputs.add(url);
            return url + " " + width + "w";
          })
          .join(", ");
        sources.push(
          '<source media="' +
            media +
            '" type="image/' +
            format +
            '" srcset="' +
            candidates +
            '">',
        );
      }
    }
    return (
      '<figure data-hero-asset="asset-' +
      id +
      '-hero-primary"><picture>' +
      sources.join("") +
      '<img alt="' +
      escape(contract.alt) +
      '"></picture>' +
      (linked
        ? '<h2><a href="/' +
          (["liaozhai", "chinese-underworld"].includes(id)
            ? "collections"
            : "explore") +
          "/" +
          id +
          '/">Story</a></h2>'
        : "") +
      '<figcaption class="visual-note">' +
      (compact
        ? '<span>Mythic China Editorial. AI-assisted original illustration, art-directed and reviewed by Mythic China Editorial.</span><details class="illustration-details"><summary>Image notes</summary><span>' +
          escape(contract.caption) +
          "</span></details>"
        : "<span>" +
          escape(contract.caption) +
          "</span><span>Mythic China Editorial. AI-assisted original illustration, art-directed and reviewed by Mythic China Editorial.</span>") +
      "</figcaption></figure>"
    );
  };
  const pages = new Map(
    Object.entries(heroPagePlacements).map(([path, ids]) => {
      const identity =
        path.startsWith("explore/") && path !== "explore/index.html"
          ? '<div class="entry-hero__identity"><h1>A complete long title</h1></div>'
          : "";
      return [
        path,
        "<main>" +
          identity +
          ids
            .map((id) =>
              renderFigure(
                id,
                ids.length > 1 &&
                  !(path === "index.html" && id === "zhong-kui"),
                [
                  "index.html",
                  "explore/index.html",
                  "collections/index.html",
                ].includes(path),
              ),
            )
            .join("") +
          "</main>",
      ];
    }),
  );
  return { pages, outputs };
}
describe("Hero placement evidence", () => {
  it("allows repeated approved families in 19 explicit placements without extra files", () => {
    const { pages, outputs } = fixture();
    expect(outputs.size).toBe(112);
    expect(() => assertHeroPageOutput(pages, outputs)).not.toThrow();
  });
  it.each([
    [
      "missing figure",
      (html) => html.replace(/<figure[\s\S]*?<\/figure>/u, ""),
    ],
    [
      "duplicate figure",
      (html) => html + html.match(/<figure[\s\S]*?<\/figure>/u)[0],
    ],
    [
      "wrong image",
      (html) =>
        html.replaceAll(
          "chinese-underworld-guide-hero-primary-v1",
          "ten-kings-hero-primary-v1",
        ),
    ],
    [
      "borrowed alt",
      (html) => html.replace(/alt="[^"]*"/u, 'alt="A different image"'),
    ],
    [
      "caption outside figure",
      (html) =>
        html.replace(
          /(<figcaption[\s\S]*?<\/figcaption>)<\/figure>/u,
          "</figure>$1",
        ),
    ],
    [
      "disclosure on another figure",
      (html) =>
        html.replace("<span>Mythic China Editorial.", "<span>Someone else."),
    ],
    [
      "hidden caption",
      (html) =>
        html.replace(
          '<figcaption class="visual-note">',
          '<figcaption class="visual-note" hidden>',
        ),
    ],
    [
      "hidden disclosure",
      (html) =>
        html.replace(
          "<span>Mythic China Editorial.",
          "<span hidden>Mythic China Editorial.",
        ),
    ],
    [
      "extra caption text",
      (html) => html.replace("</figcaption>", "unapproved text</figcaption>"),
    ],
    [
      "missing disclosure label",
      (html) => html.replace("<summary>Image notes</summary>", ""),
    ],
    [
      "hidden disclosure label",
      (html) => html.replace("<summary>", "<summary hidden>"),
    ],
    [
      "non-native disclosure label",
      (html) =>
        html.replace(
          "<summary>Image notes</summary>",
          "<div>Image notes</div>",
        ),
    ],
    [
      "label removed from keyboard order",
      (html) => html.replace("<summary>", '<summary tabindex="-1">'),
    ],
    [
      "AI attribution collapsed with caption",
      (html) =>
        html.replace(
          /(<span>Mythic China Editorial[^<]*<\/span>)(<details[^>]*><summary>Image notes<\/summary>)/u,
          "$2$1",
        ),
    ],
    [
      "caption borrowed from a different picture",
      (html) =>
        html.replace(
          escape(
            heroAssetContracts.find(
              (item) => item.id === "chinese-underworld-guide",
            ).caption,
          ),
          escape(
            heroAssetContracts.find((item) => item.id === "ten-kings").caption,
          ),
        ),
    ],
    [
      "hidden disclosure ancestor",
      (html) => "<details><summary>Other</summary>" + html + "</details>",
    ],
    [
      "collapsible open ancestor",
      (html) => "<details open><summary>Other</summary>" + html + "</details>",
    ],
    [
      "hidden child within AI attribution",
      (html) =>
        html.replace(
          "<span>Mythic China Editorial.",
          "<span><span hidden>Mythic China Editorial.</span>",
        ),
    ],
    ["missing mobile source", (html) => html.replace(/<source[^>]*>/u, "")],
  ])("rejects %s", (_label, mutate) => {
    const { pages, outputs } = fixture();
    const path = "explore/index.html";
    pages.set(path, mutate(pages.get(path)));
    expect(() => assertHeroPageOutput(pages, outputs)).toThrow();
  });

  it("rejects collapsed captions on detail pages", () => {
    const { pages, outputs } = fixture();
    const path = "explore/zhong-kui/index.html";
    pages.set(
      path,
      pages
        .get(path)
        .replace(
          /<figcaption class="visual-note">(<span>[\s\S]*?<\/span>)(<span>[\s\S]*?<\/span>)<\/figcaption>/u,
          '<figcaption class="visual-note">$2<details class="illustration-details"><summary>Image notes</summary>$1</details></figcaption>',
        ),
    );
    expect(() => assertHeroPageOutput(pages, outputs)).toThrow();
  });
  it("rejects a valid route attached to the wrong Home illustration", () => {
    const { pages, outputs } = fixture();
    pages.set(
      "index.html",
      pages
        .get("index.html")
        .replace(
          'href="/collections/chinese-underworld/"',
          'href="/collections/liaozhai/"',
        ),
    );
    expect(() => assertHeroPageOutput(pages, outputs)).toThrow(/own content/u);
  });
  it("rejects stale emitted files and images on unassigned pages", () => {
    const { pages, outputs } = fixture();
    outputs.add("/_astro/zhong-kui-hero-primary-v1-old.webp");
    expect(() => assertHeroPageOutput(pages, outputs)).toThrow();
    outputs.delete("/_astro/zhong-kui-hero-primary-v1-old.webp");
    pages.set("about/index.html", "<img alt='Unexpected illustration'>");
    expect(() => assertHeroPageOutput(pages, outputs)).toThrow(
      /Unexpected Hero page/u,
    );
  });
  it("rejects a title after its image", () => {
    const { pages, outputs } = fixture();
    const path = "explore/fighting-cricket/index.html";
    pages.set(
      path,
      pages
        .get(path)
        .replace(
          /(<div class="entry-hero__identity">[\s\S]*?<\/div>)([\s\S]*?<\/figure>)/u,
          "$2$1",
        ),
    );
    expect(() => assertHeroPageOutput(pages, outputs)).toThrow(
      /identity before/u,
    );
  });
});
