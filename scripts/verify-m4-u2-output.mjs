import { createHash } from "node:crypto";
import { assertHeroPageOutput } from "./hero-output-policy.mjs";
import { existsSync } from "node:fs";
import { lstat, readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { imageMetadata } from "astro/assets/utils";

import {
  assertReviewCollectionFeaturedEntry,
  assertReviewCollectionReadingPath,
  assertReviewCssResourcePolicy,
  assertReviewEntryCollectionMembership,
  assertReviewEntryContentNote,
  assertReviewEntryRelated,
  assertReviewPublishedIndex,
  assertReviewHtmlResourcePolicy,
  assertReviewInteractionSurface,
  assertReviewOutputArtifactExtensions,
  assertReviewPrivacyNotice,
  assertReviewResourceInventory,
  classifyReviewOutputEntry,
  indexReviewRelationshipContracts,
  readReviewHtmlStyleResources,
} from "./review-output-policy.mjs";
import {
  assertCjkCssFontFaces,
  assertCjkFontFile,
  assertFontProductionProvenance,
  assertRenderedCjkPolicy,
  readHtmlAttribute,
  readCjkCharacterPolicy,
} from "./cjk-font-policy.mjs";
import {
  assertExactReviewNavigation,
  assertExactReviewSemanticShell,
  assertFontSpecimenCss,
  assertFontSpecimenHtml,
  assertFontSpecimenResourcePolicy,
  assertFontSpecimenGlobalCss,
  assertFontSpecimenFontFaces,
  assertNoFontSpecimenLinks,
  assertReviewHtmlInventory,
  expectedReviewHtmlFiles,
  fontSpecimenOutputPath,
  readInternalReviewLinks,
} from "./font-specimen-policy.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const outputRoot = resolve(projectRoot, "dist");
const navigationTargets = ["/", "/explore/", "/collections/", "/about/"];
// Paths and hrefs stay explicit because stable IDs are not URL slugs.
const collectionReadingPathContracts = [
  {
    collectionId: "chinese-underworld",
    outputPath: "collections/chinese-underworld/index.html",
    href: "/collections/chinese-underworld/",
    entries: [
      {
        entryId: "chinese-underworld-guide",
        outputPath: "explore/chinese-underworld-guide/index.html",
        href: "/explore/chinese-underworld-guide/",
      },
      {
        entryId: "ten-kings",
        outputPath: "explore/ten-kings/index.html",
        href: "/explore/ten-kings/",
      },
      {
        entryId: "zhong-kui",
        outputPath: "explore/zhong-kui/index.html",
        href: "/explore/zhong-kui/",
      },
    ],
  },
  {
    collectionId: "liaozhai",
    outputPath: "collections/liaozhai/index.html",
    href: "/collections/liaozhai/",
    entries: [
      {
        entryId: "liaozhai-reading-guide",
        outputPath: "explore/liaozhai-reading-guide/index.html",
        href: "/explore/liaozhai-reading-guide/",
      },
      {
        entryId: "painted-skin",
        outputPath: "explore/painted-skin/index.html",
        href: "/explore/painted-skin/",
      },
      {
        entryId: "fighting-cricket",
        outputPath: "explore/fighting-cricket/index.html",
        href: "/explore/fighting-cricket/",
      },
    ],
  },
];
const {
  collectionIdsByOutputPath: reviewCollectionIdsByOutputPath,
  entryIdsByOutputPath: reviewEntryIdsByOutputPath,
} = indexReviewRelationshipContracts(collectionReadingPathContracts);
const contentNoteByEntryId = new Map([
  [
    "fighting-cricket",
    "This article includes a child found in a well and preparations for burial before faint breathing is detected.",
  ],
  [
    "painted-skin",
    "This article includes graphic bodily violence, physical abuse and humiliation, and forced ingestion of phlegm.",
  ],
]);
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
if (
  classifyReviewOutputEntry(await lstat(outputRoot), "dist") !== "directory"
) {
  throw new Error("M4 review output root must be a real directory.");
}

async function listFiles(directory) {
  const files = [];
  for (const name of (await readdir(directory)).sort()) {
    const absolutePath = join(directory, name);
    const relativePath = relative(outputRoot, absolutePath).replaceAll(
      "\\",
      "/",
    );
    const entryType = classifyReviewOutputEntry(
      await lstat(absolutePath),
      relativePath,
    );
    if (entryType === "directory") {
      files.push(...(await listFiles(absolutePath)));
    } else {
      files.push(absolutePath);
    }
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
const outputRelativeFiles = outputFiles.map((path) =>
  relative(outputRoot, path).replaceAll("\\", "/"),
);
assertReviewOutputArtifactExtensions(outputRelativeFiles);
const outputFileByUrlPath = new Map();
function registerOutputUrlPath(urlPath, outputFile) {
  const existing = outputFileByUrlPath.get(urlPath);
  if (existing !== undefined && existing !== outputFile) {
    throw new Error(`Review output has an ambiguous URL path: ${urlPath}`);
  }
  outputFileByUrlPath.set(urlPath, outputFile);
}
for (const [index, outputFile] of outputFiles.entries()) {
  const relativePath = outputRelativeFiles[index];
  registerOutputUrlPath(`/${relativePath}`, outputFile);
  if (relativePath === "index.html") {
    registerOutputUrlPath("/", outputFile);
  } else if (relativePath.endsWith("/index.html")) {
    registerOutputUrlPath(
      `/${relativePath.slice(0, -"index.html".length)}`,
      outputFile,
    );
  }
}
const htmlFiles = outputFiles
  .filter((path) => /\.html$/iu.test(path))
  .map((path) => relative(outputRoot, path).replaceAll("\\", "/"))
  .sort();
const invalidHtmlArtifacts = outputFiles.filter(
  (path) =>
    /\.htm$/iu.test(path) ||
    (/\.html$/iu.test(path) && !path.endsWith(".html")),
);
const imageFiles = outputFiles.filter((path) =>
  /\.(?:avif|jpe?g|png|webp)$/iu.test(path),
);
const fontFiles = outputFiles.filter((path) => /\.woff2$/iu.test(path));
const allowedHeroAssetFamilies = [
  "chinese-underworld-guide-hero-primary-v1",
  "chinese-underworld-hero-primary-v1",
  "fighting-cricket-hero-primary-v1",
  "liaozhai-hero-primary-v1",
  "liaozhai-reading-guide-hero-primary-v1",
  "painted-skin-hero-primary-v1",
  "ten-kings-hero-primary-v1",
  "zhong-kui-hero-primary-v2",
];

function resolveHeroAssetFamily(path) {
  const matches = allowedHeroAssetFamilies.filter((family) =>
    path.includes(family),
  );
  return matches.length === 1 ? matches[0] : null;
}

if (invalidHtmlArtifacts.length > 0) {
  throw new Error(
    `Review output contains non-canonical HTML artifacts:\n${invalidHtmlArtifacts.join("\n")}`,
  );
}
assertReviewHtmlInventory(htmlFiles);
if (
  imageFiles.length !== 112 ||
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
  fontAssetRecords.length !== 10 ||
  fontFiles.length !== 10 ||
  fontFiles.length !== fontAssetRecords.length ||
  fontFiles.some(
    (path) =>
      !path.endsWith(".woff2") ||
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
if (seenResponsiveOutputs.size !== 112) {
  throw new Error(
    `Unexpected responsive output coverage: ${seenResponsiveOutputs.size}.`,
  );
}
const htmlByPath = new Map();
const resourceRecordsByHtmlPath = new Map();
const styleResourcesByPath = new Map();
// Shared page invariants also walk every root-relative link, not only navigation.
for (const relativePath of htmlFiles) {
  const html = await readFile(join(outputRoot, relativePath), "utf8");
  htmlByPath.set(relativePath, html);

  if (html.includes("data-public-beta") || html.includes("Public Beta")) {
    throw new Error(
      `${relativePath} must not display a public Beta notice in review.`,
    );
  }

  if (/M2 semantic debug/iu.test(html)) {
    throw new Error(`${relativePath} contains forbidden review output.`);
  }
  resourceRecordsByHtmlPath.set(
    relativePath,
    assertReviewHtmlResourcePolicy(html, relativePath),
  );
  const reviewEntryId = reviewEntryIdsByOutputPath.get(relativePath);
  assertReviewInteractionSurface(html, relativePath, reviewEntryId ?? null);
  if (reviewEntryId !== undefined) {
    assertReviewEntryContentNote(
      html,
      relativePath,
      contentNoteByEntryId.get(reviewEntryId) ?? null,
    );
  }
  styleResourcesByPath.set(relativePath, readReviewHtmlStyleResources(html));
  assertExactReviewNavigation(html, relativePath);
  assertExactReviewSemanticShell(html, relativePath);
  assertNoFontSpecimenLinks(html, relativePath);
  for (const target of navigationTargets) {
    if (!html.includes(`href="${target}"`)) {
      throw new Error(
        `${relativePath} is missing navigation target ${target}.`,
      );
    }
    if (!expectedReviewHtmlFiles.includes(toOutputPath(target))) {
      throw new Error(
        `${relativePath} links to missing navigation target ${target}.`,
      );
    }
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
  for (const { href, pathname } of readInternalReviewLinks(
    html,
    relativePath,
  )) {
    if (pathname.startsWith("/_astro/")) continue;
    if (!expectedReviewHtmlFiles.includes(toOutputPath(pathname))) {
      throw new Error(
        `${relativePath} links to missing internal route ${href}.`,
      );
    }
  }
}
assertReviewResourceInventory(
  [...resourceRecordsByHtmlPath.values()].flat(),
  outputFileByUrlPath.keys(),
);

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
const outputCssFiles = outputFiles.filter((path) => /\.css$/iu.test(path));
if (outputCssFiles.some((path) => !path.endsWith(".css"))) {
  throw new Error("Review output contains a non-canonical CSS extension.");
}
const referencedStylesheets = new Set();
for (const [relativePath, resources] of styleResourcesByPath) {
  for (const stylesheet of resources.stylesheets) {
    if (
      stylesheet.href === null ||
      stylesheet.rel !== "stylesheet" ||
      JSON.stringify(stylesheet.attributes) !== JSON.stringify(["href", "rel"])
    ) {
      throw new Error(`${relativePath} has a conditional stylesheet link.`);
    }
    const url = new URL(stylesheet.href, "https://review.invalid");
    const outputFile = outputFileByUrlPath.get(url.pathname);
    if (
      url.origin !== "https://review.invalid" ||
      url.search !== "" ||
      url.hash !== "" ||
      outputFile === undefined ||
      !outputFile.endsWith(".css")
    ) {
      throw new Error(`${relativePath} links to a missing stylesheet.`);
    }
    referencedStylesheets.add(outputFile);
  }
}
if (
  referencedStylesheets.size !== outputCssFiles.length ||
  outputCssFiles.some((path) => !referencedStylesheets.has(path))
) {
  throw new Error("Review output contains an unreferenced stylesheet.");
}
const cssByOutputFile = new Map();
const resourceRecordsByCssFile = new Map();
for (const outputFile of referencedStylesheets) {
  const content = await readFile(outputFile, "utf8");
  cssByOutputFile.set(outputFile, content);
  resourceRecordsByCssFile.set(
    outputFile,
    assertReviewCssResourcePolicy(
      content,
      relative(outputRoot, outputFile).replaceAll("\\", "/"),
    ),
  );
}
assertReviewResourceInventory(
  [...resourceRecordsByCssFile.values()].flat(),
  outputFileByUrlPath.keys(),
);
const specimenStyleResources = styleResourcesByPath.get(fontSpecimenOutputPath);
if (
  specimenStyleResources === undefined ||
  specimenStyleResources.inlineStyles.length !== 1 ||
  JSON.stringify(specimenStyleResources.inlineStyles[0]?.attributes) !== "[]" ||
  specimenStyleResources.stylesheets.length < 1
) {
  throw new Error("The type specimen has a stale applied stylesheet contract.");
}
const specimenLinkedCss = specimenStyleResources.stylesheets.map(({ href }) => {
  const url = new URL(href, "https://review.invalid");
  const outputFile = outputFileByUrlPath.get(url.pathname);
  const css =
    outputFile === undefined ? undefined : cssByOutputFile.get(outputFile);
  if (css === undefined) {
    throw new Error("The type specimen links to missing review CSS.");
  }
  return css;
});
assertFontSpecimenResourcePolicy([
  ...(resourceRecordsByHtmlPath.get(fontSpecimenOutputPath) ?? []),
  ...specimenStyleResources.stylesheets.flatMap(({ href }) => {
    const outputFile = outputFileByUrlPath.get(
      new URL(href, "https://review.invalid").pathname,
    );
    return outputFile === undefined
      ? []
      : (resourceRecordsByCssFile.get(outputFile) ?? []);
  }),
]);
const specimenLinkedCssText = specimenLinkedCss.join("\n");
for (const css of [
  ...specimenLinkedCss,
  ...specimenStyleResources.inlineStyles.map(({ css }) => css),
]) {
  assertFontSpecimenCss(css, {
    allowAppliedGlobalCss: true,
    requireMappings: false,
  });
}
const specimenAppliedCssText = [
  specimenLinkedCssText,
  ...specimenStyleResources.inlineStyles.map(({ css }) => css),
].join("\n");
const resolveOutputFontAssetId = (sourceUrl) => {
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
};
assertFontSpecimenCss(specimenAppliedCssText, { allowAppliedGlobalCss: true });
assertFontSpecimenGlobalCss(specimenLinkedCssText);
assertFontSpecimenFontFaces(
  specimenLinkedCssText,
  fontInventory,
  resolveOutputFontAssetId,
  "review output CSS",
);
assertCjkCssFontFaces(
  specimenLinkedCssText,
  fontInventory,
  cjkCharacterPolicy,
  resolveOutputFontAssetId,
  "review output CSS",
);
const contentHtmlByPath = new Map(
  [...htmlByPath].filter(
    ([relativePath]) => relativePath !== fontSpecimenOutputPath,
  ),
);
assertRenderedCjkPolicy(contentHtmlByPath, cjkCharacterPolicy);
const typeSpecimenHtml = htmlByPath.get(fontSpecimenOutputPath);
if (typeSpecimenHtml === undefined) {
  throw new Error("The M4-U5A type specimen output is missing.");
}
assertFontSpecimenHtml(typeSpecimenHtml, cjkCharacterPolicy);

// Published content is visible in local indexes without changing the review build intent.
const zhongKuiHtml = htmlByPath.get("explore/zhong-kui/index.html");
const collectionHtml = htmlByPath.get(
  "collections/chinese-underworld/index.html",
);
const homeHtml = htmlByPath.get("index.html");
const guideHtml = htmlByPath.get("explore/chinese-underworld-guide/index.html");
const tenKingsHtml = htmlByPath.get("explore/ten-kings/index.html");
const liaozhaiReadingGuideHtml = htmlByPath.get(
  "explore/liaozhai-reading-guide/index.html",
);
const paintedSkinHtml = htmlByPath.get("explore/painted-skin/index.html");
const fightingCricketHtml = htmlByPath.get(
  "explore/fighting-cricket/index.html",
);
const liaozhaiHtml = htmlByPath.get("collections/liaozhai/index.html");
const exploreIndexHtml = htmlByPath.get("explore/index.html");
const collectionsIndexHtml = htmlByPath.get("collections/index.html");
const aboutHtml = htmlByPath.get("about/index.html");
const privacyHtml = htmlByPath.get("privacy/index.html");
if (
  zhongKuiHtml === undefined ||
  collectionHtml === undefined ||
  homeHtml === undefined ||
  guideHtml === undefined ||
  tenKingsHtml === undefined ||
  liaozhaiReadingGuideHtml === undefined ||
  paintedSkinHtml === undefined ||
  fightingCricketHtml === undefined ||
  liaozhaiHtml === undefined ||
  exploreIndexHtml === undefined ||
  collectionsIndexHtml === undefined ||
  aboutHtml === undefined ||
  privacyHtml === undefined ||
  typeSpecimenHtml === undefined
) {
  throw new Error("M4 review focal page output is incomplete.");
}
assertReviewPrivacyNotice(privacyHtml, "privacy/index.html");
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
assertReviewPublishedIndex(exploreIndexHtml, "explore/index.html", [
  "/explore/chinese-underworld-guide/",
  "/explore/fighting-cricket/",
  "/explore/liaozhai-reading-guide/",
  "/explore/painted-skin/",
  "/explore/ten-kings/",
  "/explore/zhong-kui/",
]);
assertReviewPublishedIndex(collectionsIndexHtml, "collections/index.html", [
  "/collections/liaozhai/",
  "/collections/chinese-underworld/",
]);
for (const [route, html] of htmlByPath) {
  if (
    html.includes("data-review-preview") ||
    html.includes("data-review-candidate")
  ) {
    throw new Error(`${route} must not render a review index preview.`);
  }
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
assertHeroPageOutput(
  htmlByPath,
  new Set(
    imageFiles.map(
      (path) => `/${relative(outputRoot, path).replaceAll("\\", "/")}`,
    ),
  ),
);

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
  (guideHtml.match(/class="source-metadata"/gu) ?? []).length !== 4 ||
  (guideHtml.match(/<dt>Accessed<\/dt>/gu) ?? []).length !== 4
) {
  throw new Error(
    "Underworld guide must render editorial copy, attribution, and four complete web Source records.",
  );
}
for (const collection of collectionReadingPathContracts) {
  const { collectionId, outputPath } = collection;
  if (reviewCollectionIdsByOutputPath.get(outputPath) !== collectionId) {
    throw new Error(`Review Collection contract drifted for ${outputPath}.`);
  }
  const html = htmlByPath.get(outputPath);
  if (html === undefined)
    throw new Error(`Missing review Collection ${collectionId}.`);
  assertReviewCollectionReadingPath(
    html,
    outputPath,
    collectionId,
    collection.entries.map(({ href }) => href),
  );
  for (const [index, entry] of collection.entries.entries()) {
    const entryHtml = htmlByPath.get(entry.outputPath);
    if (entryHtml === undefined)
      throw new Error(`Missing member Entry ${entry.entryId}.`);
    assertReviewEntryCollectionMembership(
      entryHtml,
      entry.outputPath,
      collection.href,
    );
    // Every approved ring target is now published; URLs remain explicit in the contract.
    assertReviewEntryRelated(
      entryHtml,
      entry.outputPath,
      collection.entries[(index + 1) % collection.entries.length].href,
    );
  }
}
assertReviewCollectionFeaturedEntry(
  liaozhaiHtml,
  "collections/liaozhai/index.html",
  "/explore/painted-skin/",
  "Painted Skin: A Close Reading of a 1766 Text",
);
if (!liaozhaiHtml.includes('class="collection-hero__figure"')) {
  throw new Error(
    "Liaozhai must keep its own Hero when rendering a Featured Entry.",
  );
}
process.stdout.write(
  `Verified ${htmlFiles.length} noindex review pages including Privacy and the direct-only type specimen, ${fontFiles.length} hash-locked fonts with CJK cmap coverage, exact Entry content notes, inactive reader interactions, six published Entries, two published Collections, exact Related links, navigation, Hero art direction, and zero client JavaScript.\n`,
);
