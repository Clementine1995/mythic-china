import assert from "node:assert/strict";
import {
  analyticsScriptHref,
  analyticsMetaName,
  assertAnalyticsScriptBytes,
} from "./analytics-output-policy.mjs";
import { assertAnalyticsBootstrapExecution } from "./verify-analytics-bootstrap.mjs";
import { assertHeroPageOutput } from "./hero-output-policy.mjs";
import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { imageMetadata } from "astro/assets/utils";
import {
  createConfiguredPublicSite,
  siteOriginEnvironmentVariable,
} from "../src/site/public-site.ts";
import {
  assertPublicInventory,
  assertPublicDocument,
  assertPublicDiscoveryFiles,
  htmlElements,
  htmlAttribute,
  htmlText,
  publicPagePaths,
  publicOutputPath,
  publicCollectionMembers,
} from "./public-output-policy.mjs";
import {
  assertReviewCssResourcePolicy,
  assertReviewResourceInventory,
  classifyReviewOutputEntry,
  assertReviewInteractionSurface,
  assertReviewPrivacyNotice,
  assertReviewPublishedIndex,
  assertReviewCollectionReadingPath,
  assertReviewCollectionFeaturedEntry,
  assertReviewEntryCollectionMembership,
  assertReviewEntryRelated,
  assertReviewEntryContentNote,
} from "./review-output-policy.mjs";
import {
  assertExactReviewNavigation,
  assertExactReviewSemanticShell,
  assertNoFontSpecimenLinks,
  assertFontSpecimenFontFaces,
} from "./font-specimen-policy.mjs";
import {
  assertCjkCssFontFaces,
  assertCjkFontFile,
  assertFontProductionProvenance,
  assertRenderedCjkPolicy,
  readCjkCharacterPolicy,
} from "./cjk-font-policy.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(
  resolve(process.cwd()),
  root,
  "Unexpected public verification workspace.",
);
const site = createConfiguredPublicSite(
  process.env[siteOriginEnvironmentVariable],
);
const outputRoot = resolve(root, ".local/public-build");
for (const path of [resolve(root, ".local"), outputRoot])
  assert.equal(classifyReviewOutputEntry(await lstat(path), path), "directory");
async function listFiles(directory) {
  const files = [];
  for (const name of (await readdir(directory)).sort()) {
    const path = join(directory, name);
    if (classifyReviewOutputEntry(await lstat(path), path) === "directory")
      files.push(...(await listFiles(path)));
    else files.push(relative(outputRoot, path).replaceAll("\\", "/"));
  }
  return files;
}
const files = await listFiles(outputRoot);
assertPublicInventory(files);
const analyticsBytes = await readFile(
  join(outputRoot, analyticsScriptHref.slice(1)),
);
assertAnalyticsScriptBytes(analyticsBytes);
const htmlByPath = new Map();
const pages = [];
const resources = [];
const appliedStylesheets = new Set();
for (const path of publicPagePaths) {
  const outputPath = publicOutputPath(path);
  const html = await readFile(join(outputRoot, outputPath), "utf8");
  const betaNotices = htmlElements(html).filter(
    (node) => htmlAttribute(node, "data-public-beta") !== undefined,
  );
  assert.equal(
    betaNotices.length,
    1,
    `Missing or repeated Beta notice: ${outputPath}`,
  );
  const betaNotice = betaNotices[0];
  assert.equal(
    betaNotice.tagName,
    "p",
    `Beta notice must be a paragraph: ${outputPath}`,
  );
  assert.equal(
    htmlText(betaNotice).replace(/\s+/gu, " ").trim(),
    "Public Beta — This site is open to readers. Reader testing is not yet complete.",
    `Unapproved Beta notice: ${outputPath}`,
  );
  let isInFooter = false;
  for (let node = betaNotice; node?.tagName; node = node.parentNode) {
    if (node.tagName === "footer") isInFooter = true;
    for (const attribute of ["hidden", "aria-hidden", "inert", "style"])
      assert.equal(
        htmlAttribute(node, attribute),
        undefined,
        `Hidden Beta notice: ${outputPath}`,
      );
  }
  assert(isInFooter, `Beta notice must be in the site footer: ${outputPath}`);
  const stylesheets = htmlElements(html).filter(
    (node) =>
      node.tagName === "link" && htmlAttribute(node, "rel") === "stylesheet",
  );
  assert(stylesheets.length > 0, `Missing applied stylesheet: ${outputPath}`);
  for (const node of stylesheets) {
    assert.deepEqual(
      node.attrs.map(({ name }) => name).sort(),
      ["href", "rel"],
      `Conditional or disabled stylesheet: ${outputPath}`,
    );
    const href = htmlAttribute(node, "href");
    assert(
      /^\/_astro\/[^/]+\.css$/u.test(href),
      `Invalid stylesheet target: ${href}`,
    );
    appliedStylesheets.add(href);
  }
  htmlByPath.set(outputPath, html);
  const page = assertPublicDocument(html, path, site.origin);
  pages.push(page);
  resources.push(...page.resources);
  assertExactReviewNavigation(html, outputPath);
  assertExactReviewSemanticShell(html, outputPath);
  assertNoFontSpecimenLinks(html, outputPath);
  const entryId = page.publishedAt ? path.split("/")[2] : null;
  assertReviewInteractionSurface(html, outputPath, entryId);
  if (entryId) {
    const notes = {
      "fighting-cricket":
        "This article includes a child found in a well and preparations for burial before faint breathing is detected.",
      "painted-skin":
        "This article includes graphic bodily violence, physical abuse and humiliation, and forced ingestion of phlegm.",
    };
    assertReviewEntryContentNote(html, outputPath, notes[entryId] ?? null);
  }
}
for (const field of ["canonical", "documentTitle", "description"])
  assert.equal(
    new Set(pages.map((page) => page[field])).size,
    pages.length,
    `Duplicate public ${field}.`,
  );
const htmlFor = (path) => htmlByPath.get(publicOutputPath(path));
const analyticsConfiguration = JSON.parse(
  htmlAttribute(
    htmlElements(htmlFor("/")).find(
      (node) =>
        node.tagName === "meta" &&
        htmlAttribute(node, "name") === analyticsMetaName,
    ),
    "content",
  ),
);
await assertAnalyticsBootstrapExecution(
  analyticsBytes.toString("utf8"),
  analyticsConfiguration,
);
assertReviewPrivacyNotice(htmlFor("/privacy/"), "privacy/index.html");
assertReviewPublishedIndex(
  htmlFor("/explore/"),
  "explore/index.html",
  pages
    .filter((page) => page.publishedAt)
    .map((page) => page.path)
    .sort(),
);
assertReviewPublishedIndex(
  htmlFor("/collections/"),
  "collections/index.html",
  pages
    .filter((page) => publicCollectionMembers[page.path])
    .sort((a, b) => a.title.localeCompare(b.title, "en"))
    .map((page) => page.path),
);
for (const [path, ids] of Object.entries(publicCollectionMembers)) {
  assertReviewCollectionReadingPath(
    htmlFor(path),
    publicOutputPath(path),
    path.split("/")[2],
    ids.map((id) => `/explore/${id}/`),
  );
  const featuredPath = `/explore/${path.includes("liaozhai") ? "painted-skin" : "zhong-kui"}/`;
  assertReviewCollectionFeaturedEntry(
    htmlFor(path),
    publicOutputPath(path),
    featuredPath,
    pages.find((page) => page.path === featuredPath).title,
  );
  for (const [index, id] of ids.entries()) {
    const entryPath = `/explore/${id}/`;
    assertReviewEntryCollectionMembership(
      htmlFor(entryPath),
      publicOutputPath(entryPath),
      path,
    );
    assertReviewEntryRelated(
      htmlFor(entryPath),
      publicOutputPath(entryPath),
      `/explore/${ids[(index + 1) % ids.length]}/`,
    );
  }
}

const fontInventory = JSON.parse(
  await readFile(join(root, "src/assets/fonts/font-assets.json"), "utf8"),
);
const cjk = await readCjkCharacterPolicy(root);
await assertFontProductionProvenance(root, fontInventory, cjk);
const fontRecords = fontInventory.families.flatMap((family) =>
  family.files.map((file) => ({ ...file, family })),
);
const fontsByUrl = new Map();
const seenFonts = new Set();
for (const path of files.filter((file) => file.endsWith(".woff2"))) {
  const digest = createHash("sha256")
    .update(await readFile(join(outputRoot, path)))
    .digest("hex");
  const record = fontRecords.find((item) => item.sha256 === digest);
  assert(
    record && !seenFonts.has(record.assetId),
    `Untracked or duplicate font: ${path}`,
  );
  seenFonts.add(record.assetId);
  fontsByUrl.set(`/${path}`, record);
  if (record.family.characterSetLocale)
    await assertCjkFontFile(
      join(outputRoot, path),
      record.family,
      record,
      cjk.byLocale[record.family.characterSetLocale].requiredCodePoints,
    );
}
assert.equal(seenFonts.size, fontRecords.length, "Missing font artifacts.");
const cssParts = [];
assert.deepEqual(
  [...appliedStylesheets].sort(),
  files
    .filter((file) => file.endsWith(".css"))
    .map((file) => `/${file}`)
    .sort(),
  "Unapplied public stylesheet.",
);
for (const path of files.filter((file) => file.endsWith(".css"))) {
  const css = await readFile(join(outputRoot, path), "utf8");
  assert(
    !css.includes("type-specimen"),
    "Review specimen CSS leaked into public output.",
  );
  resources.push(...assertReviewCssResourcePolicy(css, path));
  cssParts.push(css);
}
const resolveFontId = (url) => fontsByUrl.get(url)?.assetId ?? null;
const css = cssParts.join("\n");
assertFontSpecimenFontFaces(css, fontInventory, resolveFontId, "public CSS");
assertCjkCssFontFaces(css, fontInventory, cjk, resolveFontId, "public CSS");
assertRenderedCjkPolicy(htmlByPath, cjk);
const availableUrls = [...files.map((path) => `/${path}`), ...publicPagePaths];
assertReviewResourceInventory(resources, availableUrls);
const referencedResources = new Set(resources.map(({ pathname }) => pathname));
for (const path of files.filter((file) => file.startsWith("_astro/")))
  assert(
    referencedResources.has(`/${path}`),
    `Unreferenced public resource: ${path}`,
  );

const families = [
  "chinese-underworld-guide-hero-primary-v1",
  "chinese-underworld-hero-primary-v1",
  "fighting-cricket-hero-primary-v1",
  "liaozhai-hero-primary-v1",
  "liaozhai-reading-guide-hero-primary-v1",
  "painted-skin-hero-primary-v1",
  "ten-kings-hero-primary-v1",
  "zhong-kui-hero-primary-v2",
];
const images = files.filter((file) => /\.(?:avif|webp)$/u.test(file));
assertHeroPageOutput(htmlByPath, new Set(images.map((path) => `/${path}`)));
assert.equal(images.length, 112);
const imageKeys = new Set();
for (const path of images) {
  const family = families.filter((name) => path.includes(name));
  const usage = path.includes("-hero-desktop-")
    ? "desktop"
    : path.includes("-hero-mobile-")
      ? "mobile"
      : null;
  const metadata = await imageMetadata(
    await readFile(join(outputRoot, path)),
    path,
  );
  assert.equal(family.length, 1, `Unknown Hero family: ${path}`);
  assert(
    usage &&
      ["avif", "webp"].includes(metadata.format) &&
      (usage === "desktop"
        ? [640, 960, 1440, 1920]
        : [640, 960, 1440]
      ).includes(metadata.width),
    `Invalid Hero output: ${path}`,
  );
  const key = `${family[0]}:${usage}:${metadata.format}:${metadata.width}`;
  assert(!imageKeys.has(key), `Duplicate Hero: ${key}`);
  imageKeys.add(key);
}
for (const [path, html] of htmlByPath) {
  const nodes = htmlElements(html);
  const ids = nodes.map((node) => htmlAttribute(node, "id")).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, `Duplicate HTML ID in ${path}`);
  const preloadIds = [];
  for (const node of nodes) {
    if (node.tagName === "link" && htmlAttribute(node, "rel") === "preload") {
      assert.equal(htmlAttribute(node, "as"), "font");
      assert.equal(htmlAttribute(node, "type"), "font/woff2");
      assert(["", "anonymous"].includes(htmlAttribute(node, "crossorigin")));
      const record = fontsByUrl.get(htmlAttribute(node, "href"));
      assert(record, "Untracked preload font.");
      preloadIds.push(record.assetId);
    }
    if (node.tagName !== "a" || !htmlAttribute(node, "href")) continue;
    const url = new URL(
      htmlAttribute(node, "href"),
      `${site.origin}/${path.replace(/index\.html$/u, "")}`,
    );
    if (url.origin !== site.origin) continue;
    assert(
      availableUrls.includes(url.pathname),
      `Missing internal target ${url.href}`,
    );
    if (url.hash) {
      const target = htmlByPath.get(publicOutputPath(url.pathname));
      assert(
        target &&
          htmlElements(target).some(
            (element) =>
              htmlAttribute(element, "id") ===
              decodeURIComponent(url.hash.slice(1)),
          ),
        `Missing fragment ${url.href}`,
      );
    }
  }
  const isEntry = path.startsWith("explore/") && path !== "explore/index.html";
  assert.deepEqual(
    preloadIds.sort(),
    fontRecords
      .filter(
        ({ preload }) =>
          preload === "all-pages" || (isEntry && preload === "entry-pages"),
      )
      .map(({ assetId }) => assetId)
      .sort(),
  );
}
const [sitemap, rss, robots] = await Promise.all(
  ["sitemap.xml", "rss.xml", "robots.txt"].map((path) =>
    readFile(join(outputRoot, path), "utf8"),
  ),
);
assertPublicDiscoveryFiles({ sitemap, rss, robots }, pages, site.origin);
process.stdout.write(
  `Public output verified: ${pages.length} HTML, 2 XML, robots.txt, ${images.length} Hero images, ${seenFonts.size} fonts; one hash-locked inactive analytics script, offline execution passed. Local diagnostic only; no release receipt or deployment.\n`,
);
