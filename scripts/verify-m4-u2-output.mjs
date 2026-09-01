import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { imageMetadata } from "astro/assets/utils";

import {
  assertReviewCssResourcePolicy,
  assertReviewHtmlResourcePolicy,
} from "./review-output-policy.mjs";
import {
  assertCjkCssFontFaces,
  assertCjkFontFile,
  assertFontProductionProvenance,
  assertRenderedCjkPolicy,
  readHtmlAttribute,
  readCjkCharacterPolicy,
} from "./cjk-font-policy.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const outputRoot = resolve(projectRoot, "dist");
const expectedHtmlFiles = [
  "about/index.html",
  "collections/chinese-underworld/index.html",
  "collections/index.html",
  "explore/chinese-underworld-guide/index.html",
  "explore/index.html",
  "explore/zhong-kui/index.html",
  "index.html",
];
const navigationTargets = ["/", "/explore/", "/collections/", "/about/"];
const fontInventory = JSON.parse(
  await readFile(
    resolve(projectRoot, "src", "assets", "fonts", "font-assets.json"),
    "utf8",
  ),
);
const cjkCharacterPolicy = await readCjkCharacterPolicy(projectRoot);
await assertFontProductionProvenance(
  projectRoot,
  fontInventory,
  cjkCharacterPolicy,
);
const fontAssetRecords = fontInventory.families.flatMap((family) =>
  family.files.map((file) => ({ ...file, family })),
);

if (resolve(process.cwd()) !== projectRoot) {
  throw new Error(`Unexpected workspace: ${process.cwd()}`);
}
if (!existsSync(outputRoot)) {
  throw new Error(
    "M4 review output verification requires an existing dist build.",
  );
}

async function listFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(absolutePath)));
    else if (entry.isFile()) files.push(absolutePath);
  }
  return files;
}

function toOutputPath(urlPath) {
  if (urlPath === "/") return "index.html";
  return `${urlPath.replace(/^\/+|\/+$/gu, "")}/index.html`;
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

// Inventory HTML and raster artifacts before checking their rendered content.
const outputFiles = await listFiles(outputRoot);
const htmlFiles = outputFiles
  .filter((path) => path.endsWith(".html"))
  .map((path) => relative(outputRoot, path).replaceAll("\\", "/"))
  .sort();
const imageFiles = outputFiles.filter((path) =>
  /\.(?:avif|jpe?g|png|webp)$/iu.test(path),
);
const fontFiles = outputFiles.filter((path) => path.endsWith(".woff2"));
const allowedHeroAssetFamilies = [
  "chinese-underworld-guide-hero-primary-v1",
  "chinese-underworld-hero-primary-v1",
  "zhong-kui-hero-primary-v2",
];

function resolveHeroAssetFamily(path) {
  const matches = allowedHeroAssetFamilies.filter((family) =>
    path.includes(family),
  );
  return matches.length === 1 ? matches[0] : null;
}

if (htmlFiles.join("|") !== expectedHtmlFiles.join("|")) {
  throw new Error(
    `Unexpected M4 review HTML inventory:\n${htmlFiles.join("\n")}`,
  );
}
if (
  imageFiles.length !== 42 ||
  imageFiles.some(
    (path) =>
      resolveHeroAssetFamily(
        relative(outputRoot, path).replaceAll("\\", "/"),
      ) === null || !/\.(?:avif|webp)$/iu.test(path),
  )
) {
  throw new Error(
    `Unexpected M4 review image artifact inventory:\n${imageFiles.join("\n")}`,
  );
}
if (
  fontFiles.length !== fontAssetRecords.length ||
  fontFiles.some(
    (path) =>
      !relative(outputRoot, path).replaceAll("\\", "/").startsWith("_astro/"),
  )
) {
  throw new Error(
    `Unexpected M4 review font artifact inventory:\n${fontFiles.join("\n")}`,
  );
}
const fontRecordByOutputPath = new Map();
const unmatchedFontRecords = new Set(
  fontAssetRecords.map(({ assetId }) => assetId),
);
for (const fontPath of fontFiles) {
  const digest = sha256(await readFile(fontPath));
  const record = fontAssetRecords.find(
    ({ sha256: expected }) => digest === expected,
  );
  if (record === undefined || !unmatchedFontRecords.delete(record.assetId)) {
    throw new Error(
      `Untracked or duplicate M4 review font artifact: ${fontPath}`,
    );
  }
  fontRecordByOutputPath.set(fontPath, record);
  if (record.family.characterSetLocale !== undefined) {
    await assertCjkFontFile(
      fontPath,
      record.family,
      record,
      cjkCharacterPolicy.byLocale[record.family.characterSetLocale]
        .requiredCodePoints,
    );
  }
}
if (unmatchedFontRecords.size > 0) {
  throw new Error(
    `M4 review output is missing font assets: ${Array.from(unmatchedFontRecords).join(", ")}`,
  );
}

const expectedResponsiveWidths = {
  "hero-desktop": [640, 960, 1440, 1920],
  "hero-mobile": [640, 960, 1440],
};
const seenResponsiveOutputs = new Set();
for (const imagePath of imageFiles) {
  const outputPath = relative(outputRoot, imagePath).replaceAll("\\", "/");
  const assetFamily = resolveHeroAssetFamily(outputPath);
  const usage = outputPath.includes("-hero-desktop-")
    ? "hero-desktop"
    : outputPath.includes("-hero-mobile-")
      ? "hero-mobile"
      : null;
  const metadata = await imageMetadata(await readFile(imagePath), imagePath);
  if (
    assetFamily === null ||
    usage === null ||
    !["avif", "webp"].includes(metadata.format) ||
    !expectedResponsiveWidths[usage].includes(metadata.width)
  ) {
    throw new Error(`Unexpected responsive output: ${imagePath}`);
  }
  const outputKey = `${assetFamily}:${usage}:${metadata.format}:${metadata.width}`;
  if (seenResponsiveOutputs.has(outputKey)) {
    throw new Error(`Duplicate responsive output: ${outputKey}`);
  }
  seenResponsiveOutputs.add(outputKey);
}
if (seenResponsiveOutputs.size !== 42) {
  throw new Error(
    `Unexpected responsive output coverage: ${seenResponsiveOutputs.size}.`,
  );
}
const htmlByPath = new Map();
// Shared page invariants also walk every root-relative link, not only navigation.
for (const relativePath of htmlFiles) {
  const html = await readFile(join(outputRoot, relativePath), "utf8");
  htmlByPath.set(relativePath, html);

  if (!/<meta name="robots" content="noindex, nofollow">/u.test(html)) {
    throw new Error(`${relativePath} is missing the review robots policy.`);
  }
  for (const forbidden of [
    /<link[^>]+rel="canonical"/iu,
    /<meta[^>]+property="og:/iu,
    /application\/ld\+json/iu,
    /<script(?:\s|>)/iu,
    /\son[a-z]+\s*=/iu,
    /\b(?:href|src)="javascript:/iu,
    /M2 semantic debug/iu,
  ]) {
    if (forbidden.test(html)) {
      throw new Error(`${relativePath} contains forbidden review output.`);
    }
  }
  assertReviewHtmlResourcePolicy(html, relativePath);
  for (const target of navigationTargets) {
    if (!html.includes(`href="${target}"`)) {
      throw new Error(
        `${relativePath} is missing navigation target ${target}.`,
      );
    }
    if (!expectedHtmlFiles.includes(toOutputPath(target))) {
      throw new Error(
        `${relativePath} links to missing navigation target ${target}.`,
      );
    }
  }
  for (const requiredSemanticShell of [
    '<html lang="en">',
    '<a class="skip-link" href="#main-content">',
    '<main id="main-content" tabindex="-1">',
    '<nav class="desktop-navigation" aria-label="Primary navigation">',
    '<details class="mobile-navigation">',
    "<summary>Menu</summary>",
    '<nav aria-label="Mobile primary navigation">',
  ]) {
    if (!html.includes(requiredSemanticShell)) {
      throw new Error(
        `${relativePath} is missing static navigation semantics.`,
      );
    }
  }
  if ((html.match(/id="main-content"/gu) ?? []).length !== 1) {
    throw new Error(`${relativePath} must have one skip-link target.`);
  }
  const fontPreloadTags = (html.match(/<link\b[^>]*>/giu) ?? []).filter(
    (tag) =>
      readHtmlAttribute(tag, "rel") === "preload" &&
      readHtmlAttribute(tag, "as") === "font",
  );
  const preloadRecords = [];
  for (const tag of fontPreloadTags) {
    const href = readHtmlAttribute(tag, "href");
    const crossOrigin = readHtmlAttribute(tag, "crossorigin");
    if (
      href === null ||
      readHtmlAttribute(tag, "type") !== "font/woff2" ||
      !["", "anonymous"].includes(crossOrigin ?? "missing")
    ) {
      throw new Error(`${relativePath} has an invalid font preload: ${tag}`);
    }
    const preloadUrl = new URL(href, "https://review.invalid");
    if (
      preloadUrl.origin !== "https://review.invalid" ||
      !preloadUrl.pathname.startsWith("/_astro/") ||
      !preloadUrl.pathname.endsWith(".woff2") ||
      preloadUrl.search !== "" ||
      preloadUrl.hash !== ""
    ) {
      throw new Error(`${relativePath} preloads an unsafe font URL: ${href}`);
    }
    const preloadPath = resolve(
      outputRoot,
      decodeURIComponent(preloadUrl.pathname).replace(/^\/+/, ""),
    );
    const record = fontRecordByOutputPath.get(preloadPath);
    if (record === undefined) {
      throw new Error(`${relativePath} preloads a missing font: ${href}`);
    }
    preloadRecords.push(record);
  }
  const isEntryPage =
    relativePath.startsWith("explore/") &&
    relativePath !== "explore/index.html";
  const expectedPreloadIds = fontAssetRecords
    .filter(
      ({ preload }) =>
        preload === "all-pages" || (isEntryPage && preload === "entry-pages"),
    )
    .map(({ assetId }) => assetId)
    .sort();
  const actualPreloadIds = preloadRecords.map(({ assetId }) => assetId).sort();
  if (actualPreloadIds.join("|") !== expectedPreloadIds.join("|")) {
    throw new Error(
      `${relativePath} has an unexpected font preload policy: ${actualPreloadIds.join(", ")}`,
    );
  }
  for (const match of html.matchAll(/href="([^"]+)"/giu)) {
    const href = match[1];
    if (
      href === undefined ||
      !href.startsWith("/") ||
      href.startsWith("/_astro/")
    ) {
      continue;
    }
    const pathname = new URL(href, "https://review.invalid").pathname;
    if (!expectedHtmlFiles.includes(toOutputPath(pathname))) {
      throw new Error(
        `${relativePath} links to missing internal route ${href}.`,
      );
    }
  }
}

const forbiddenReleaseArtifacts = outputFiles.filter((path) =>
  /\.(?:atom|rss|xml)(?:\.gz)?$/iu.test(path),
);
if (forbiddenReleaseArtifacts.length > 0) {
  throw new Error(
    `Review build must not emit release feed or XML artifacts:\n${forbiddenReleaseArtifacts
      .map((path) => relative(outputRoot, path).replaceAll("\\", "/"))
      .join("\n")}`,
  );
}
if (outputFiles.some((path) => /\.(?:[cm]?js)$/iu.test(path))) {
  throw new Error("M4-U2 review pages must not emit client JavaScript.");
}
const outputCss = [];
for (const outputFile of outputFiles.filter((path) => path.endsWith(".css"))) {
  const content = await readFile(outputFile, "utf8");
  outputCss.push(content);
  assertReviewCssResourcePolicy(
    content,
    relative(outputRoot, outputFile).replaceAll("\\", "/"),
  );
}
assertCjkCssFontFaces(
  outputCss.join("\n"),
  fontInventory,
  cjkCharacterPolicy,
  (sourceUrl) => {
    const url = new URL(sourceUrl, "https://review.invalid");
    if (
      url.origin !== "https://review.invalid" ||
      url.search !== "" ||
      url.hash !== ""
    ) {
      return null;
    }
    const outputPath = resolve(
      outputRoot,
      decodeURIComponent(url.pathname).replace(/^\/+/, ""),
    );
    return fontRecordByOutputPath.get(outputPath)?.assetId ?? null;
  },
  "review output CSS",
);
assertRenderedCjkPolicy(htmlByPath, cjkCharacterPolicy);

// Focal-route checks keep draft exceptions out of published-only indexes.
const zhongKuiHtml = htmlByPath.get("explore/zhong-kui/index.html");
const collectionHtml = htmlByPath.get(
  "collections/chinese-underworld/index.html",
);
const homeHtml = htmlByPath.get("index.html");
const guideHtml = htmlByPath.get("explore/chinese-underworld-guide/index.html");
const exploreIndexHtml = htmlByPath.get("explore/index.html");
const collectionsIndexHtml = htmlByPath.get("collections/index.html");
const aboutHtml = htmlByPath.get("about/index.html");
if (
  zhongKuiHtml === undefined ||
  collectionHtml === undefined ||
  homeHtml === undefined ||
  guideHtml === undefined ||
  exploreIndexHtml === undefined ||
  collectionsIndexHtml === undefined ||
  aboutHtml === undefined
) {
  throw new Error("M4 review focal page output is incomplete.");
}
if (
  exploreIndexHtml.includes("zhong-kui") ||
  collectionsIndexHtml.includes("chinese-underworld")
) {
  throw new Error("Review index output leaks an ineligible visual slice.");
}
if (
  !guideHtml.includes(
    '<p class="source-list__chinese-title" lang="zh-Hant">陰間</p>',
  ) ||
  !guideHtml.includes(
    '<p class="source-list__chinese-title" lang="zh-Hant">十王圖</p>',
  )
) {
  throw new Error(
    "Guide Source titles must preserve their approved orthographic locale.",
  );
}
for (const title of ["鍾馗元夜出遊圖", "清早期竹雕鍾馗群鬼", "任頤鍾馗像軸"]) {
  if (
    !zhongKuiHtml.includes(
      `<p class="source-list__chinese-title" lang="zh-Hant">${title}</p>`,
    )
  ) {
    throw new Error(
      `Zhong Kui Source title must preserve approved zh-Hant locale: ${title}`,
    );
  }
}
if (
  !exploreIndexHtml.includes("No published entries yet") ||
  exploreIndexHtml.includes('class="editorial-index"')
) {
  throw new Error("Explore must render the honest empty release state.");
}
if (
  !collectionsIndexHtml.includes("No published collections yet") ||
  collectionsIndexHtml.includes('class="editorial-index"')
) {
  throw new Error("Collections must render the honest empty release state.");
}
for (const heading of [
  "Scope",
  "Editorial method",
  "Images",
  "The museum metaphor",
]) {
  if (!aboutHtml.includes(`<h2>${heading}</h2>`)) {
    throw new Error(`About is missing the approved section: ${heading}.`);
  }
}
const publisherAnchorCount =
  aboutHtml.match(/\sid="publisher"/giu)?.length ?? 0;
const publisherHeader = aboutHtml.match(
  /<header\b[^>]*\bid="publisher"[^>]*>[\s\S]*?<\/header>/iu,
)?.[0];
if (
  publisherAnchorCount !== 1 ||
  publisherHeader === undefined ||
  !publisherHeader.includes("About Mythic China") ||
  !publisherHeader.includes("Mythic China introduces")
) {
  throw new Error(
    "About must keep one publisher identity anchor on the visible Mythic China header.",
  );
}
const editorialAnchorCount =
  aboutHtml.match(/\sid="editorial"/giu)?.length ?? 0;
const editorialSection = aboutHtml.match(
  /<section\b[^>]*\bid="editorial"[^>]*>[\s\S]*?<\/section>/iu,
)?.[0];
if (
  editorialAnchorCount !== 1 ||
  editorialSection === undefined ||
  !editorialSection.includes("<h2>Editorial method</h2>") ||
  !editorialSection.includes("Mythic China Editorial is the publication")
) {
  throw new Error(
    "About must keep the editorial identity anchor, heading, and visible team statement in the same section.",
  );
}
function collectReferencedHeroOutputs(html) {
  return new Set(
    [...html.matchAll(/\/_astro\/[^"', ]+\.(?:avif|webp)/giu)].map(
      (match) => match[0],
    ),
  );
}

function setsEqual(left, right) {
  return (
    left.size === right.size && [...left].every((value) => right.has(value))
  );
}

// Each owning page must reference exactly its approved Hero family, and together
// the owning pages must cover every emitted Hero file.
const emittedImageOutputs = new Set(
  imageFiles.map(
    (path) => `/${relative(outputRoot, path).replaceAll("\\", "/")}`,
  ),
);
const zhongKuiEmittedOutputs = new Set(
  [...emittedImageOutputs].filter((path) =>
    path.includes("zhong-kui-hero-primary-v2"),
  ),
);
const underworldEmittedOutputs = new Set(
  [...emittedImageOutputs].filter((path) =>
    path.includes("chinese-underworld-hero-primary-v1"),
  ),
);
const guideEmittedOutputs = new Set(
  [...emittedImageOutputs].filter((path) =>
    path.includes("chinese-underworld-guide-hero-primary-v1"),
  ),
);
const homeHeroOutputs = collectReferencedHeroOutputs(homeHtml);
const entryHeroOutputs = collectReferencedHeroOutputs(zhongKuiHtml);
const collectionHeroOutputs = collectReferencedHeroOutputs(collectionHtml);
const guideHeroOutputs = collectReferencedHeroOutputs(guideHtml);
const referencedHeroOutputs = new Set([
  ...homeHeroOutputs,
  ...entryHeroOutputs,
  ...collectionHeroOutputs,
  ...guideHeroOutputs,
]);
if (
  zhongKuiEmittedOutputs.size !== 14 ||
  underworldEmittedOutputs.size !== 14 ||
  guideEmittedOutputs.size !== 14 ||
  referencedHeroOutputs.size !== 42 ||
  !setsEqual(homeHeroOutputs, zhongKuiEmittedOutputs) ||
  !setsEqual(entryHeroOutputs, zhongKuiEmittedOutputs) ||
  !setsEqual(collectionHeroOutputs, underworldEmittedOutputs) ||
  !setsEqual(guideHeroOutputs, guideEmittedOutputs) ||
  !setsEqual(referencedHeroOutputs, emittedImageOutputs) ||
  [...referencedHeroOutputs].some((path) =>
    path.includes("zhong-kui-hero-primary-v1"),
  )
) {
  throw new Error(
    `Unexpected referenced Hero output inventory:\n${[...referencedHeroOutputs].join("\n")}`,
  );
}

// Keep this oracle independent from the loader so rendered evidence cannot drift silently.
const zhongKuiManifestAlt =
  "Zhong Kui, a bearded figure in dark green robes with a sheathed sword, stands at a misty abstract threshold above several crouching demon attendants.";
const zhongKuiManifestCaption =
  "A contemporary AI-assisted editorial interpretation of Zhong Kui as a protective demon-queller, with a sheathed sword and subordinate demon attendants; it is not a historical image.";
const zhongKuiManifestCredit = "Mythic China Editorial";
const zhongKuiManifestDisclosure =
  "AI-assisted original illustration, art-directed and reviewed by Mythic China Editorial.";
const zhongKuiManifestFigureEvidence = `<figcaption class="visual-note"><span>${zhongKuiManifestCaption}</span><span>${zhongKuiManifestCredit}. ${zhongKuiManifestDisclosure}</span></figcaption>`;
const underworldManifestAlt =
  "An illuminated stone path winds through dark, mist-filled mineral structures toward tiny officials gathered at a distant court-like threshold.";
const underworldManifestCaption =
  "A contemporary AI-assisted editorial interpretation of the Chinese underworld as a passage through layered courts toward rebirth; its route and architecture are invented, not a historical or universal map.";
const underworldManifestCredit = "Mythic China Editorial";
const underworldManifestDisclosure =
  "AI-assisted original illustration, art-directed and reviewed by Mythic China Editorial.";
const underworldManifestFigureEvidence = `<figcaption class="visual-note"><span>${underworldManifestCaption}</span><span>${underworldManifestCredit}. ${underworldManifestDisclosure}</span></figcaption>`;
const guideManifestAlt =
  "Blank record sheets lead through dark charcoal-and-jade administrative spaces toward tiny anonymous figures and distant warm light.";
const guideManifestCaption =
  "A contemporary AI-assisted editorial interpretation of one court-and-rebirth model in Chinese underworld traditions; the blank records, layered passage, and architecture are invented, not a historical reconstruction or universal map.";
const guideManifestCredit = "Mythic China Editorial";
const guideManifestDisclosure =
  "AI-assisted original illustration, art-directed and reviewed by Mythic China Editorial.";
const guideManifestFigureEvidence = `<figcaption class="visual-note"><span>${guideManifestCaption}</span><span>${guideManifestCredit}. ${guideManifestDisclosure}</span></figcaption>`;
function assertCandidateCount(html, media, format, expectedCount) {
  const source = html.match(
    new RegExp(
      `<source[^>]+media="${media}"[^>]+type="image/${format}"[^>]+srcset="([^"]+)"`,
      "u",
    ),
  );
  const actualCount = source?.[1]?.split(",").length ?? 0;
  if (actualCount !== expectedCount) {
    throw new Error(
      `Hero ${media} ${format} has ${actualCount} candidates; expected ${expectedCount}.`,
    );
  }
}
for (const html of [homeHtml, zhongKuiHtml]) {
  if (
    !html.includes(`alt="${zhongKuiManifestAlt}"`) ||
    !html.includes(zhongKuiManifestFigureEvidence)
  ) {
    throw new Error(
      "A Zhong Kui Hero page is missing manifest accessibility evidence.",
    );
  }
}
if (
  !collectionHtml.includes(`alt="${underworldManifestAlt}"`) ||
  !collectionHtml.includes(underworldManifestFigureEvidence)
) {
  throw new Error(
    "The Chinese Underworld Collection is missing manifest accessibility evidence.",
  );
}
if (
  !guideHtml.includes(`alt="${guideManifestAlt}"`) ||
  !guideHtml.includes(guideManifestFigureEvidence)
) {
  throw new Error(
    "The Chinese Underworld Guide is missing manifest accessibility evidence.",
  );
}
for (const html of [homeHtml, zhongKuiHtml, collectionHtml, guideHtml]) {
  if (!html.includes(".avif") || !html.includes(".webp")) {
    throw new Error("A Hero page is missing responsive AVIF/WebP output.");
  }
  if (!html.includes('media="(max-width: 767px)"')) {
    throw new Error("A Hero page is missing mobile art direction.");
  }
  for (const format of ["avif", "webp"]) {
    assertCandidateCount(html, "\\(max-width: 767px\\)", format, 3);
    assertCandidateCount(html, "\\(min-width: 768px\\)", format, 4);
  }
}

// Editorial candidates render real copy rather than template fallbacks.
for (const forbiddenText of [
  "Article body",
  "Structured Claims",
  "Not supplied at draft status",
]) {
  if (zhongKuiHtml.includes(forbiddenText)) {
    throw new Error(`Zhong Kui renders forbidden fallback: ${forbiddenText}.`);
  }
}
if (
  !zhongKuiHtml.includes("Quick Answer") ||
  !zhongKuiHtml.includes("By <span>Mythic China Editorial</span>") ||
  !zhongKuiHtml.includes('datetime="2026-08-30"') ||
  (zhongKuiHtml.match(/class="source-metadata"/gu) ?? []).length !== 6 ||
  (zhongKuiHtml.match(/<dt>Accessed<\/dt>/gu) ?? []).length !== 6
) {
  throw new Error(
    "Zhong Kui must render editorial copy, attribution, and six complete web Source records.",
  );
}
if (
  !guideHtml.includes("Quick Answer") ||
  !guideHtml.includes("By <span>Mythic China Editorial</span>") ||
  (guideHtml.match(/class="source-metadata"/gu) ?? []).length !== 3 ||
  (guideHtml.match(/<dt>Accessed<\/dt>/gu) ?? []).length !== 3
) {
  throw new Error(
    "Underworld guide must render editorial copy, attribution, and three complete web Source records.",
  );
}
if (
  collectionHtml.includes(zhongKuiManifestAlt) ||
  collectionHtml.includes(guideManifestAlt)
) {
  throw new Error("Collection must not borrow another owner's Hero copy.");
}
if (
  guideHtml.includes(zhongKuiManifestAlt) ||
  guideHtml.includes(underworldManifestAlt)
) {
  throw new Error("Guide must not borrow another owner's Hero copy.");
}
const guidedPathStart = collectionHtml.indexOf('id="guided-path-heading"');
const guidedPathEnd = collectionHtml.indexOf('class="collection-browse"');
const guidedPathHtml = collectionHtml.slice(guidedPathStart, guidedPathEnd);
const guidePosition = guidedPathHtml.indexOf(
  "A Guide to the Chinese Underworld",
);
const zhongKuiPosition = guidedPathHtml.indexOf("Zhong Kui, the Demon Queller");
if (
  guidedPathStart < 0 ||
  guidedPathEnd < 0 ||
  guidePosition < 0 ||
  zhongKuiPosition < 0 ||
  guidePosition > zhongKuiPosition
) {
  throw new Error("Collection reading order no longer follows entryIds.");
}

process.stdout.write(
  `Verified ${htmlFiles.length} noindex M4 review pages, ${fontFiles.length} hash-locked fonts with CJK cmap coverage, release empty states, navigation, Hero art direction, and zero client JavaScript.\n`,
);
