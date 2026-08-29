import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { imageMetadata } from "astro/assets/utils";

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

if (resolve(process.cwd()) !== projectRoot) {
  throw new Error(`Unexpected workspace: ${process.cwd()}`);
}
if (!existsSync(outputRoot)) {
  throw new Error("M4-U2 output verification requires an existing dist build.");
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

// Inventory HTML and raster artifacts before checking their rendered content.
const outputFiles = await listFiles(outputRoot);
const htmlFiles = outputFiles
  .filter((path) => path.endsWith(".html"))
  .map((path) => relative(outputRoot, path).replaceAll("\\", "/"))
  .sort();
const imageFiles = outputFiles.filter((path) =>
  /\.(?:avif|jpe?g|png|webp)$/iu.test(path),
);

if (htmlFiles.join("|") !== expectedHtmlFiles.join("|")) {
  throw new Error(`Unexpected M4-U2 HTML inventory:\n${htmlFiles.join("\n")}`);
}
if (
  imageFiles.length !== 14 ||
  imageFiles.some(
    (path) =>
      !path.includes("zhong-kui-hero-primary-v2") ||
      !/\.(?:avif|webp)$/iu.test(path),
  )
) {
  throw new Error(
    `Unexpected M4-U2 image artifact inventory:\n${imageFiles.join("\n")}`,
  );
}

const expectedResponsiveWidths = {
  "hero-desktop": [640, 960, 1440, 1920],
  "hero-mobile": [640, 960, 1440],
};
const seenResponsiveOutputs = new Set();
for (const imagePath of imageFiles) {
  const usage = imagePath.includes("-hero-desktop-")
    ? "hero-desktop"
    : imagePath.includes("-hero-mobile-")
      ? "hero-mobile"
      : null;
  const metadata = await imageMetadata(await readFile(imagePath), imagePath);
  if (
    usage === null ||
    !["avif", "webp"].includes(metadata.format) ||
    !expectedResponsiveWidths[usage].includes(metadata.width)
  ) {
    throw new Error(`Unexpected responsive output: ${imagePath}`);
  }
  const outputKey = `${usage}:${metadata.format}:${metadata.width}`;
  if (seenResponsiveOutputs.has(outputKey)) {
    throw new Error(`Duplicate responsive output: ${outputKey}`);
  }
  seenResponsiveOutputs.add(outputKey);
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
    /M2 semantic debug/iu,
  ]) {
    if (forbidden.test(html)) {
      throw new Error(`${relativePath} contains forbidden review output.`);
    }
  }
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

for (const forbiddenArtifact of ["rss.xml", "sitemap.xml"]) {
  if (existsSync(join(outputRoot, forbiddenArtifact))) {
    throw new Error(`Review build must not emit ${forbiddenArtifact}.`);
  }
}
if (outputFiles.some((path) => /\.(?:[cm]?js)$/iu.test(path))) {
  throw new Error("M4-U2 review pages must not emit client JavaScript.");
}

// Focal-route checks keep draft exceptions out of published-only indexes.
const zhongKuiHtml = htmlByPath.get("explore/zhong-kui/index.html");
const collectionHtml = htmlByPath.get(
  "collections/chinese-underworld/index.html",
);
const homeHtml = htmlByPath.get("index.html");
const guideHtml = htmlByPath.get("explore/chinese-underworld-guide/index.html");
const exploreIndexHtml = htmlByPath.get("explore/index.html");
const collectionsIndexHtml = htmlByPath.get("collections/index.html");
if (
  zhongKuiHtml === undefined ||
  collectionHtml === undefined ||
  homeHtml === undefined ||
  guideHtml === undefined ||
  exploreIndexHtml === undefined ||
  collectionsIndexHtml === undefined
) {
  throw new Error("M4-U2 focal page output is incomplete.");
}
if (
  guideHtml.includes("manifest-hero-picture") ||
  exploreIndexHtml.includes("zhong-kui") ||
  collectionsIndexHtml.includes("chinese-underworld")
) {
  throw new Error(
    "Review index or Guide output leaks an ineligible visual slice.",
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

// Every emitted Hero file must be referenced by both visual pages, and vice versa.
const emittedImageOutputs = new Set(
  imageFiles.map(
    (path) => `/${relative(outputRoot, path).replaceAll("\\", "/")}`,
  ),
);
const homeHeroOutputs = collectReferencedHeroOutputs(homeHtml);
const entryHeroOutputs = collectReferencedHeroOutputs(zhongKuiHtml);
const referencedHeroOutputs = new Set([
  ...homeHeroOutputs,
  ...entryHeroOutputs,
]);
if (
  referencedHeroOutputs.size !== 14 ||
  !setsEqual(homeHeroOutputs, emittedImageOutputs) ||
  !setsEqual(entryHeroOutputs, emittedImageOutputs) ||
  [...referencedHeroOutputs].some(
    (path) =>
      !path.includes("zhong-kui-hero-primary-v2") ||
      path.includes("zhong-kui-hero-primary-v1"),
  )
) {
  throw new Error(
    `Unexpected referenced Hero output inventory:\n${[...referencedHeroOutputs].join("\n")}`,
  );
}

// Keep this oracle independent from the loader so rendered evidence cannot drift silently.
const manifestAlt =
  "Zhong Kui, a bearded figure in dark green robes with a sheathed sword, stands at a misty abstract threshold above several crouching demon attendants.";
const manifestCaption =
  "A contemporary AI-assisted editorial interpretation of Zhong Kui as a protective demon-queller, with a sheathed sword and subordinate demon attendants; it is not a historical image.";
const manifestCredit = "Mythic China Editorial";
const manifestDisclosure =
  "AI-assisted original illustration, art-directed and reviewed by Mythic China Editorial.";
const manifestFigureEvidence = `<figcaption class="visual-note"><span>${manifestCaption}</span><span>${manifestCredit}. ${manifestDisclosure}</span></figcaption>`;
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
    !html.includes(`alt="${manifestAlt}"`) ||
    !html.includes(manifestFigureEvidence)
  ) {
    throw new Error("A Hero page is missing manifest accessibility evidence.");
  }
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

// Missing editorial fields stay absent rather than becoming template prose.
for (const forbiddenText of [
  "Quick Answer",
  "Article body",
  "Structured Claims",
  "Not supplied at draft status",
]) {
  if (zhongKuiHtml.includes(forbiddenText)) {
    throw new Error(`Zhong Kui renders forbidden fallback: ${forbiddenText}.`);
  }
}
if (
  (zhongKuiHtml.match(/class="source-metadata"/gu) ?? []).length !== 5 ||
  (zhongKuiHtml.match(/<dt>Accessed<\/dt>/gu) ?? []).length !== 5
) {
  throw new Error("Zhong Kui must render five complete web Source records.");
}
if (collectionHtml.includes(manifestAlt)) {
  throw new Error("Collection must not borrow the Zhong Kui Entry Hero.");
}
const guidedPathStart = collectionHtml.indexOf('id="guided-path-heading"');
const guidedPathEnd = collectionHtml.indexOf('class="collection-browse"');
const guidedPathHtml = collectionHtml.slice(guidedPathStart, guidedPathEnd);
const guidePosition = guidedPathHtml.indexOf(
  "Chinese Underworld Guide (Working Draft)",
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
  `Verified ${htmlFiles.length} noindex M4-U2 pages, navigation, Hero art direction, and zero client JavaScript.\n`,
);
