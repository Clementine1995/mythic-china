import { parse, serialize } from "parse5";

export const heroAssetContracts = [
  {
    id: "zhong-kui",
    label: "Zhong Kui",
    family: "zhong-kui-hero-primary-v2",
    alt: "Zhong Kui, a bearded figure in dark green robes with a sheathed sword, stands at a misty abstract threshold above several crouching demon attendants.",
    caption:
      "A contemporary AI-assisted editorial interpretation of Zhong Kui as a protective demon-queller, with a sheathed sword and subordinate demon attendants; it is not a historical image.",
  },
  {
    id: "chinese-underworld",
    label: "Chinese Underworld",
    family: "chinese-underworld-hero-primary-v1",
    alt: "An illuminated stone path winds through dark, mist-filled mineral structures toward tiny officials gathered at a distant court-like threshold.",
    caption:
      "A contemporary AI-assisted editorial interpretation of the Chinese underworld as a passage through layered courts toward rebirth; its route and architecture are invented, not a historical or universal map.",
  },
  {
    id: "chinese-underworld-guide",
    label: "Chinese Underworld Guide",
    family: "chinese-underworld-guide-hero-primary-v1",
    alt: "Blank record sheets lead through dark charcoal-and-jade administrative spaces toward tiny anonymous figures and distant warm light.",
    caption:
      "A contemporary AI-assisted editorial interpretation of one court-and-rebirth model in Chinese underworld traditions; the blank records, layered passage, and architecture are invented, not a historical reconstruction or universal map.",
  },
  {
    id: "ten-kings",
    label: "Ten Kings",
    family: "ten-kings-hero-primary-v1",
    alt: "Ten warm, unnumbered light pauses recede through dark green haze, with separate abstract balance and reflection forms.",
    caption:
      "A contemporary AI-assisted editorial interpretation turns ten ritual intervals in the cited CBETA witness into a seven-plus-three rhythm, keeping blank record planes separate from abstract balance and reflection cues; it is not a manuscript reconstruction, a set of literal courts, or a universal underworld map.",
  },
  {
    id: "liaozhai-reading-guide",
    label: "Liaozhai Reading Guide",
    family: "liaozhai-reading-guide-hero-primary-v1",
    alt: "Two unequal groups of blank page planes branch from a warm junction in a misty smoke-green space.",
    caption:
      "A contemporary AI-assisted editorial interpretation uses unequal, connected page groups and a branching path to represent variant edition structures and a staged compilation history; it does not depict a definitive Liaozhai edition or a historical reading room.",
  },
  {
    id: "painted-skin",
    label: "Painted Skin",
    family: "painted-skin-hero-primary-v1",
    alt: "A narrow window reveals a hand holding a brush against a folded, unmarked pale plane in warm light.",
    caption:
      "A contemporary AI-assisted editorial interpretation of the cited 1766 Painted Skin scene, in which Wang looks through a window and sees an indeterminate being paint a wearable human skin; the room, figure design, folded plane, and lighting are invented, and the later attack and cure are omitted.",
  },
  {
    id: "fighting-cricket",
    label: "Fighting Cricket",
    family: "fighting-cricket-hero-primary-v1",
    alt: "A small cricket stands beside a narrowing path of dark stone thresholds, with a detached partial ring in the mist.",
    caption:
      "A contemporary AI-assisted editorial interpretation compresses the cited tale's chain of official demand into narrowing thresholds ending at one small cricket; a detached rim alludes to the well without depicting the child or a literal transformation, and the space and species details are invented.",
  },
  {
    id: "liaozhai",
    label: "Liaozhai Collection",
    family: "liaozhai-hero-primary-v1",
    alt: "An angular dark aperture frames one lit path from blank pages and a brush toward a tiny cricket beneath narrowing planes.",
    caption:
      "A contemporary AI-assisted editorial illustration connects unequal blank page groups, Painted Skin's brush and unmarked layer, and Fighting Cricket's small subject within one invented reading path; it is not a historical interior, a folklore map, or a scene from one tale.",
  },
];

// Explicit editorial placements, independent from the content and asset loaders.
export const heroPagePlacements = {
  "index.html": ["zhong-kui", "chinese-underworld", "liaozhai"],
  "explore/index.html": [
    "chinese-underworld-guide",
    "fighting-cricket",
    "liaozhai-reading-guide",
    "painted-skin",
    "ten-kings",
    "zhong-kui",
  ],
  "collections/index.html": ["liaozhai", "chinese-underworld"],
  "explore/zhong-kui/index.html": ["zhong-kui"],
  "explore/chinese-underworld-guide/index.html": ["chinese-underworld-guide"],
  "explore/ten-kings/index.html": ["ten-kings"],
  "explore/liaozhai-reading-guide/index.html": ["liaozhai-reading-guide"],
  "explore/painted-skin/index.html": ["painted-skin"],
  "explore/fighting-cricket/index.html": ["fighting-cricket"],
  "collections/chinese-underworld/index.html": ["chinese-underworld"],
  "collections/liaozhai/index.html": ["liaozhai"],
};
const credit = "Mythic China Editorial";
const disclosure =
  "AI-assisted original illustration, art-directed and reviewed by Mythic China Editorial.";
function elements(node, tag) {
  return (node.childNodes ?? []).flatMap((child) => [
    ...(child.tagName === tag ? [child] : []),
    ...elements(child, tag),
  ]);
}
function attribute(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value;
}
function textContent(node) {
  return node.nodeName === "#text"
    ? node.value
    : (node.childNodes ?? []).map(textContent).join("");
}
function normalizedText(node) {
  return textContent(node).replace(/\s+/gu, " ").trim();
}
function imageOutputs(html) {
  return new Set(
    [...html.matchAll(/\/_astro\/[^"', ]+\.(?:avif|webp)/giu)].map(
      (match) => match[0],
    ),
  );
}
function sameSet(left, right) {
  return left.size === right.size && [...left].every((item) => right.has(item));
}
function assertVisible(node, allowedDetails = null) {
  for (let current = node; current; current = current.parentNode) {
    if (
      ["hidden", "inert", "style"].some(
        (name) => attribute(current, name) !== undefined,
      ) ||
      attribute(current, "aria-hidden") === "true" ||
      (current.tagName === "details" && current !== allowedDetails)
    ) {
      throw new Error("Hero evidence must remain visible.");
    }
  }
}
function meaningfulChildren(node) {
  return (node?.childNodes ?? []).filter(
    (child) =>
      child.tagName || (child.nodeName === "#text" && child.value.trim()),
  );
}
export function assertHeroPageOutput(htmlByPath, emittedImageOutputs) {
  const referenced = new Set();
  for (const [path, html] of htmlByPath) {
    if (
      !(path in heroPagePlacements) &&
      elements(parse(html), "img").length > 0
    ) {
      throw new Error("Unexpected Hero page: " + path);
    }
  }
  for (const [path, placements] of Object.entries(heroPagePlacements)) {
    const html = htmlByPath.get(path);
    if (html === undefined) throw new Error("Missing Hero page: " + path);
    const document = parse(html, { sourceCodeLocationInfo: true });
    const figures = elements(document, "figure");
    if (
      figures.length !== placements.length ||
      elements(document, "img").length !== placements.length
    ) {
      throw new Error(
        path + " has missing, extra, or uncontained Hero figures.",
      );
    }
    const expectedPageOutputs = new Set();
    for (let index = 0; index < placements.length; index++) {
      const id = placements[index];
      const contract = heroAssetContracts.find((item) => item.id === id);
      if (!contract)
        throw new Error("Missing independent Hero contract: " + id);
      const figure = figures[index];
      const familyOutputs = new Set(
        [...emittedImageOutputs].filter((item) =>
          item.includes(contract.family),
        ),
      );
      if (
        familyOutputs.size !== 14 ||
        !sameSet(imageOutputs(serialize(figure)), familyOutputs)
      ) {
        throw new Error(
          path +
            " figure " +
            index +
            " does not reference exactly the approved " +
            id +
            " family.",
        );
      }
      const assetId = attribute(figure, "data-hero-asset");
      if (
        assetId !== undefined &&
        assetId !== "asset-" + id + "-hero-primary"
      ) {
        throw new Error(path + " has a mismatched Hero identity.");
      }
      if (placements.length > 1 && !(path === "index.html" && index === 0)) {
        const links = elements(figure, "a");
        const prefix = ["chinese-underworld", "liaozhai"].includes(id)
          ? "collections"
          : "explore";
        if (
          links.length !== 1 ||
          attribute(links[0], "href") !== "/" + prefix + "/" + id + "/"
        ) {
          throw new Error(
            path + " figure " + index + " must link only to its own content.",
          );
        }
      }
      const images = elements(figure, "img");
      const notes = elements(figure, "figcaption");
      const compact = [
        "index.html",
        "explore/index.html",
        "collections/index.html",
      ].includes(path);
      const children = meaningfulChildren(notes[0]);
      const details = compact ? children[1] : null;
      const detailChildren = meaningfulChildren(details);
      const caption = compact ? detailChildren[1] : children[0];
      const attribution = compact ? children[0] : children[1];
      if (
        images.length !== 1 ||
        attribute(images[0], "alt") !== contract.alt ||
        notes.length !== 1 ||
        attribute(notes[0], "class") !== "visual-note" ||
        children.length !== 2 ||
        caption?.tagName !== "span" ||
        attribution?.tagName !== "span" ||
        normalizedText(caption) !== contract.caption ||
        normalizedText(attribution) !== credit + ". " + disclosure ||
        [caption, attribution, ...(compact ? [detailChildren[0]] : [])].some(
          (node) => (node?.childNodes ?? []).some((child) => child.tagName),
        ) ||
        (compact &&
          (details?.tagName !== "details" ||
            attribute(details, "class") !== "illustration-details" ||
            attribute(details, "open") !== undefined ||
            detailChildren.length !== 2 ||
            detailChildren[0]?.tagName !== "summary" ||
            normalizedText(detailChildren[0]) !== "Image notes" ||
            ["tabindex", "role", "aria-hidden"].some(
              (name) => attribute(detailChildren[0], name) !== undefined,
            )))
      ) {
        throw new Error(
          path +
            " figure " +
            index +
            " is missing its own manifest accessibility evidence.",
        );
      }
      assertVisible(notes[0]);
      assertVisible(attribution);
      assertVisible(caption, details);
      if (compact) assertVisible(detailChildren[0], details);
      const sources = elements(figure, "source");
      if (sources.length !== 4)
        throw new Error(path + " has an unexpected Hero source count.");
      for (const [media, count] of [
        ["(max-width: 767px)", 3],
        ["(min-width: 768px)", 4],
      ]) {
        for (const format of ["avif", "webp"]) {
          const matches = sources.filter(
            (node) =>
              attribute(node, "media") === media &&
              attribute(node, "type") === "image/" + format,
          );
          if (
            matches.length !== 1 ||
            attribute(matches[0], "srcset")?.split(",").length !== count
          ) {
            throw new Error(
              path + " is missing approved responsive Hero candidates.",
            );
          }
        }
      }
      for (const output of familyOutputs) {
        expectedPageOutputs.add(output);
        referenced.add(output);
      }
    }
    if (!sameSet(imageOutputs(html), expectedPageOutputs))
      throw new Error(path + " has images outside its approved placements.");
    if (path.startsWith("explore/") && path !== "explore/index.html") {
      const identities = elements(document, "div").filter(
        (node) => attribute(node, "class") === "entry-hero__identity",
      );
      if (
        identities.length !== 1 ||
        elements(identities[0], "h1").length !== 1 ||
        identities[0].sourceCodeLocation.endOffset >
          figures[0].sourceCodeLocation.startOffset ||
        /entry-page--identity-(?:start|end)/u.test(html)
      ) {
        throw new Error(
          path + " must place its complete Entry identity before the Hero.",
        );
      }
    }
  }
  if (
    referenced.size !== 112 ||
    !sameSet(referenced, emittedImageOutputs) ||
    [...referenced].some((path) => path.includes("zhong-kui-hero-primary-v1"))
  ) {
    throw new Error("Unexpected global Hero output inventory.");
  }
}
