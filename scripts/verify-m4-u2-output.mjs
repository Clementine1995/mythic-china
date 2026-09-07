import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { lstat, readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { imageMetadata } from "astro/assets/utils";

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
  fontSpecimenRoute,
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

// Focal-route checks keep release lists empty while exposing only the fixed
// review slice through an explicitly labeled, non-published preview.
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

function collectReviewPreviewKinds(html) {
  return (html.match(/<section\b[^>]*>/giu) ?? []).flatMap((tag) => {
    const kind = readHtmlAttribute(tag, "data-review-preview");
    return kind === null ? [] : [kind];
  });
}

function collectReviewCandidateHrefs(html, candidateKind) {
  return (html.match(/<a\b[^>]*>/giu) ?? [])
    .filter(
      (tag) =>
        readHtmlAttribute(tag, "data-review-candidate") === candidateKind,
    )
    .map((tag) => readHtmlAttribute(tag, "href"));
}

const explorePreviewKinds = collectReviewPreviewKinds(exploreIndexHtml);
const collectionsPreviewKinds = collectReviewPreviewKinds(collectionsIndexHtml);
const exploreEntryCandidates = collectReviewCandidateHrefs(
  exploreIndexHtml,
  "entry",
);
const exploreCollectionCandidates = collectReviewCandidateHrefs(
  exploreIndexHtml,
  "collection",
);
const collectionEntryCandidates = collectReviewCandidateHrefs(
  collectionsIndexHtml,
  "entry",
);
const collectionCandidates = collectReviewCandidateHrefs(
  collectionsIndexHtml,
  "collection",
);

if (
  JSON.stringify(explorePreviewKinds) !== JSON.stringify(["entries"]) ||
  !exploreIndexHtml.includes("Local review preview") ||
  !exploreIndexHtml.includes("Not published") ||
  JSON.stringify(exploreEntryCandidates) !==
    JSON.stringify([
      "/explore/chinese-underworld-guide/",
      "/explore/ten-kings/",
      "/explore/zhong-kui/",
    ]) ||
  exploreCollectionCandidates.length !== 0
) {
  throw new Error(
    "Explore must expose exactly the fixed, labeled review Entry preview.",
  );
}
if (
  JSON.stringify(collectionsPreviewKinds) !== JSON.stringify(["collections"]) ||
  !collectionsIndexHtml.includes("Local review preview") ||
  !collectionsIndexHtml.includes("Not published") ||
  JSON.stringify(collectionCandidates) !==
    JSON.stringify(["/collections/chinese-underworld/"]) ||
  collectionEntryCandidates.length !== 0
) {
  throw new Error(
    "Collections must expose exactly the fixed, labeled review Collection preview.",
  );
}
for (const [route, html] of [
  ["/", homeHtml],
  ["/about/", aboutHtml],
  ["/privacy/", privacyHtml],
  ["/collections/chinese-underworld/", collectionHtml],
  ["/explore/chinese-underworld-guide/", guideHtml],
  ["/explore/zhong-kui/", zhongKuiHtml],
  [fontSpecimenRoute, typeSpecimenHtml],
]) {
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

// Keep this oracle independent from the loader so rendered evidence cannot drift silently.
const manifestCredit = "Mythic China Editorial";
const manifestDisclosure =
  "AI-assisted original illustration, art-directed and reviewed by Mythic China Editorial.";
const heroPageContracts = [
  {
    label: "Zhong Kui",
    family: "zhong-kui-hero-primary-v2",
    pages: [
      ["Home", homeHtml],
      ["Zhong Kui Entry", zhongKuiHtml],
    ],
    alt: "Zhong Kui, a bearded figure in dark green robes with a sheathed sword, stands at a misty abstract threshold above several crouching demon attendants.",
    caption:
      "A contemporary AI-assisted editorial interpretation of Zhong Kui as a protective demon-queller, with a sheathed sword and subordinate demon attendants; it is not a historical image.",
  },
  {
    label: "Chinese Underworld",
    family: "chinese-underworld-hero-primary-v1",
    pages: [["Chinese Underworld Collection", collectionHtml]],
    alt: "An illuminated stone path winds through dark, mist-filled mineral structures toward tiny officials gathered at a distant court-like threshold.",
    caption:
      "A contemporary AI-assisted editorial interpretation of the Chinese underworld as a passage through layered courts toward rebirth; its route and architecture are invented, not a historical or universal map.",
  },
  {
    label: "Chinese Underworld Guide",
    family: "chinese-underworld-guide-hero-primary-v1",
    pages: [["Chinese Underworld Guide Entry", guideHtml]],
    alt: "Blank record sheets lead through dark charcoal-and-jade administrative spaces toward tiny anonymous figures and distant warm light.",
    caption:
      "A contemporary AI-assisted editorial interpretation of one court-and-rebirth model in Chinese underworld traditions; the blank records, layered passage, and architecture are invented, not a historical reconstruction or universal map.",
  },
  {
    label: "Ten Kings",
    family: "ten-kings-hero-primary-v1",
    pages: [["Ten Kings Entry", tenKingsHtml]],
    alt: "Ten warm, unnumbered light pauses recede through dark green haze, with separate abstract balance and reflection forms.",
    caption:
      "A contemporary AI-assisted editorial interpretation turns ten ritual intervals in the cited CBETA witness into a seven-plus-three rhythm, keeping blank record planes separate from abstract balance and reflection cues; it is not a manuscript reconstruction, a set of literal courts, or a universal underworld map.",
  },
  {
    label: "Liaozhai Reading Guide",
    family: "liaozhai-reading-guide-hero-primary-v1",
    pages: [["Liaozhai Reading Guide Entry", liaozhaiReadingGuideHtml]],
    alt: "Two unequal groups of blank page planes branch from a warm junction in a misty smoke-green space.",
    caption:
      "A contemporary AI-assisted editorial interpretation uses unequal, connected page groups and a branching path to represent variant edition structures and a staged compilation history; it does not depict a definitive Liaozhai edition or a historical reading room.",
  },
  {
    label: "Painted Skin",
    family: "painted-skin-hero-primary-v1",
    pages: [["Painted Skin Entry", paintedSkinHtml]],
    alt: "A narrow window reveals a hand holding a brush against a folded, unmarked pale plane in warm light.",
    caption:
      "A contemporary AI-assisted editorial interpretation of the cited 1766 Painted Skin scene, in which Wang looks through a window and sees an indeterminate being paint a wearable human skin; the room, figure design, folded plane, and lighting are invented, and the later attack and cure are omitted.",
  },
  {
    label: "Fighting Cricket",
    family: "fighting-cricket-hero-primary-v1",
    pages: [["Fighting Cricket Entry", fightingCricketHtml]],
    alt: "A small cricket stands beside a narrowing path of dark stone thresholds, with a detached partial ring in the mist.",
    caption:
      "A contemporary AI-assisted editorial interpretation compresses the cited tale's chain of official demand into narrowing thresholds ending at one small cricket; a detached rim alludes to the well without depicting the child or a literal transformation, and the space and species details are invented.",
  },
  {
    label: "Liaozhai Collection",
    family: "liaozhai-hero-primary-v1",
    pages: [["Liaozhai Collection", liaozhaiHtml]],
    alt: "An angular dark aperture frames one lit path from blank pages and a brush toward a tiny cricket beneath narrowing planes.",
    caption:
      "A contemporary AI-assisted editorial illustration connects unequal blank page groups, Painted Skin's brush and unmarked layer, and Fighting Cricket's small subject within one invented reading path; it is not a historical interior, a folklore map, or a scene from one tale.",
  },
];

// Each owning page must reference exactly its approved Hero family, and together
// the owning pages must cover every emitted Hero file.
const emittedImageOutputs = new Set(
  imageFiles.map(
    (path) => `/${relative(outputRoot, path).replaceAll("\\", "/")}`,
  ),
);
const referencedHeroOutputs = new Set();
for (const contract of heroPageContracts) {
  const familyOutputs = new Set(
    [...emittedImageOutputs].filter((path) => path.includes(contract.family)),
  );
  if (familyOutputs.size !== 14) {
    throw new Error(
      `${contract.label} emitted ${familyOutputs.size} Hero outputs; expected 14.`,
    );
  }
  for (const [pageLabel, html] of contract.pages) {
    const pageOutputs = collectReferencedHeroOutputs(html);
    if (!setsEqual(pageOutputs, familyOutputs)) {
      throw new Error(
        `${pageLabel} does not reference exactly the ${contract.label} Hero family.`,
      );
    }
    pageOutputs.forEach((path) => referencedHeroOutputs.add(path));
  }
}
if (
  referencedHeroOutputs.size !== 112 ||
  !setsEqual(referencedHeroOutputs, emittedImageOutputs) ||
  [...referencedHeroOutputs].some((path) =>
    path.includes("zhong-kui-hero-primary-v1"),
  )
) {
  throw new Error(
    `Unexpected referenced Hero output inventory:\n${[...referencedHeroOutputs].join("\n")}`,
  );
}

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

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

for (const contract of heroPageContracts) {
  const figureEvidence = `<figcaption class="visual-note"><span>${escapeHtml(contract.caption)}</span><span>${escapeHtml(manifestCredit)}. ${escapeHtml(manifestDisclosure)}</span></figcaption>`;
  for (const [pageLabel, html] of contract.pages) {
    if (
      !html.includes(`alt="${escapeHtml(contract.alt)}"`) ||
      !html.includes(figureEvidence)
    ) {
      throw new Error(
        `${pageLabel} is missing ${contract.label} manifest accessibility evidence.`,
      );
    }
    for (const otherContract of heroPageContracts) {
      if (otherContract !== contract && html.includes(otherContract.alt)) {
        throw new Error(
          `${pageLabel} borrows ${otherContract.label} Hero accessibility copy.`,
        );
      }
    }
    if (!html.includes(".avif") || !html.includes(".webp")) {
      throw new Error(`${pageLabel} is missing responsive AVIF/WebP output.`);
    }
    if (!html.includes('media="(max-width: 767px)"')) {
      throw new Error(`${pageLabel} is missing mobile art direction.`);
    }
    for (const format of ["avif", "webp"]) {
      assertCandidateCount(html, "\\(max-width: 767px\\)", format, 3);
      assertCandidateCount(html, "\\(min-width: 768px\\)", format, 4);
    }
  }
}

for (const [pageLabel, html] of [
  ["Ten Kings Entry", tenKingsHtml],
  ["Liaozhai Reading Guide Entry", liaozhaiReadingGuideHtml],
  ["Painted Skin Entry", paintedSkinHtml],
  ["Fighting Cricket Entry", fightingCricketHtml],
]) {
  if (
    !html.includes("entry-page--identity-start") ||
    html.includes("entry-page--identity-end")
  ) {
    throw new Error(
      `${pageLabel} must place its desktop identity on the left.`,
    );
  }
}
for (const [pageLabel, html] of [
  ["Zhong Kui Entry", zhongKuiHtml],
  ["Chinese Underworld Guide Entry", guideHtml],
]) {
  if (
    !html.includes("entry-page--identity-end") ||
    html.includes("entry-page--identity-start")
  ) {
    throw new Error(
      `${pageLabel} must place its desktop identity on the right.`,
    );
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
  for (const entry of collection.entries) {
    const entryHtml = htmlByPath.get(entry.outputPath);
    if (entryHtml === undefined)
      throw new Error(`Missing member Entry ${entry.entryId}.`);
    assertReviewEntryCollectionMembership(
      entryHtml,
      entry.outputPath,
      collection.href,
    );
  }
}
if (
  liaozhaiHtml.includes('class="collection-featured"') ||
  !liaozhaiHtml.includes('class="collection-hero__figure"')
) {
  throw new Error(
    "Draft Liaozhai must render its own Hero without borrowing a Featured Entry.",
  );
}
process.stdout.write(
  `Verified ${htmlFiles.length} noindex review pages including Privacy and the direct-only type specimen, ${fontFiles.length} hash-locked fonts with CJK cmap coverage, exact Entry content notes, inactive reader interactions, release empty states, navigation, Hero art direction, and zero client JavaScript.\n`,
);
