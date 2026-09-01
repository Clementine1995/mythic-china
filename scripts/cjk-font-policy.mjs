import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";

import { create as createFont } from "fontkitten";
import { parse as parseHtml } from "parse5";

const locales = ["zh-Hans", "zh-Hant"];
const htmlWhitespace = new Set(["\t", "\n", "\f", "\r", " "]);
const skippedTextTags = new Set(["script", "style", "template"]);

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function codePoints(strings) {
  return new Set(
    strings.flatMap((value) =>
      [...value].map((character) => character.codePointAt(0)),
    ),
  );
}

function sortedCodePoints(values) {
  return [...values].sort((left, right) => left - right);
}

function formatCodePoints(values) {
  return sortedCodePoints(values)
    .map(
      (codePoint) =>
        `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
    )
    .join(", ");
}

function setsEqual(left, right) {
  return (
    left.size === right.size && [...left].every((value) => right.has(value))
  );
}

function assertExactCodePoints(actual, expected, label) {
  if (setsEqual(actual, expected)) return;
  const missing = new Set([...expected].filter((value) => !actual.has(value)));
  const unexpected = new Set(
    [...actual].filter((value) => !expected.has(value)),
  );
  throw new Error(
    `${label} code points drifted; missing=[${formatCodePoints(missing)}], unexpected=[${formatCodePoints(unexpected)}].`,
  );
}

export function readHtmlAttribute(tag, name) {
  const tagName = tag.match(/^<\s*[\w:-]+/u);
  if (tagName === null) return null;

  const expectedName = name.toLowerCase();
  let matchedValue = null;
  let index = tagName[0].length;
  while (index < tag.length) {
    while (htmlWhitespace.has(tag[index])) index += 1;
    if (tag[index] === ">" || (tag[index] === "/" && tag[index + 1] === ">")) {
      break;
    }

    const nameStart = index;
    while (
      index < tag.length &&
      !htmlWhitespace.has(tag[index]) &&
      !["=", "/", ">"].includes(tag[index])
    ) {
      index += 1;
    }
    if (nameStart === index) {
      index += 1;
      continue;
    }
    const attributeName = tag.slice(nameStart, index).toLowerCase();
    while (htmlWhitespace.has(tag[index])) index += 1;

    let attributeValue = "";
    if (tag[index] === "=") {
      index += 1;
      while (htmlWhitespace.has(tag[index])) index += 1;
      const quote = tag[index];
      if (quote === '"' || quote === "'") {
        index += 1;
        const valueStart = index;
        while (index < tag.length && tag[index] !== quote) index += 1;
        if (index >= tag.length) {
          throw new Error(`Malformed quoted HTML attribute in tag: ${tag}`);
        }
        attributeValue = tag.slice(valueStart, index);
        index += 1;
      } else {
        const valueStart = index;
        while (
          index < tag.length &&
          !htmlWhitespace.has(tag[index]) &&
          tag[index] !== ">"
        ) {
          index += 1;
        }
        attributeValue = tag.slice(valueStart, index);
      }
    }

    if (attributeName === expectedName) {
      if (matchedValue !== null) {
        throw new Error(`Duplicate ${name} attribute in tag: ${tag}`);
      }
      matchedValue = attributeValue;
    }
  }
  return matchedValue;
}

function resolveWithin(root, path, label) {
  const absolutePath = resolve(root, path);
  const relativePath = relative(root, absolutePath);
  if (
    relativePath === "" ||
    relativePath === ".." ||
    relativePath.startsWith(`..${sep}`) ||
    isAbsolute(relativePath)
  ) {
    throw new Error(`${label} escapes its approved root: ${path}`);
  }
  return absolutePath;
}

function readCssDeclaration(block, property) {
  return (
    block
      .match(
        new RegExp(
          `(?:^|[;{])\\s*${escapeRegExp(property)}\\s*:\\s*([^;}]+)`,
          "iu",
        ),
      )?.[1]
      ?.trim() ?? null
  );
}

function unquoteCssString(value) {
  if (value === null) return null;
  const trimmed = value.trim();
  if (
    trimmed.length >= 2 &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function readFirstCssUrl(value) {
  if (value === null) return null;
  const match = value.match(/url\(\s*(?:"([^"]+)"|'([^']+)'|([^\s)]+))\s*\)/iu);
  return match === null ? null : (match[1] ?? match[2] ?? match[3] ?? null);
}

function isHan(character) {
  return /\p{Script=Han}/u.test(character);
}

function isCjkPunctuation(codePoint) {
  return (
    (codePoint >= 0x3000 && codePoint <= 0x303f) ||
    (codePoint >= 0xff01 && codePoint <= 0xff65)
  );
}

function scanVisibleValue(value, language, label, collected) {
  for (const character of value.normalize("NFC")) {
    const codePoint = character.codePointAt(0);
    if (isHan(character) && !locales.includes(language)) {
      throw new Error(
        `${label} renders ${character} (${formatCodePoints([codePoint])}) under ${language ?? "no language"}; visible Han text requires exact zh-Hans or zh-Hant semantics.`,
      );
    }
    if (
      locales.includes(language) &&
      (isHan(character) || isCjkPunctuation(codePoint))
    ) {
      collected[language].add(codePoint);
    }
  }
}

function readParsedAttribute(node, name) {
  const matches = (node.attrs ?? []).filter(
    (attribute) => attribute.name.toLowerCase() === name,
  );
  if (matches.length > 1) {
    throw new Error(`Duplicate ${name} attribute on parsed <${node.tagName}>.`);
  }
  return matches[0]?.value ?? null;
}

function scanParsedHtmlNode(node, language, skip, relativePath, collected) {
  if (node.nodeName === "#text") {
    if (!skip) {
      scanVisibleValue(node.value, language, `${relativePath} text`, collected);
    }
    return;
  }

  let childLanguage = language;
  let childSkip = skip;
  if (typeof node.tagName === "string") {
    childLanguage = readParsedAttribute(node, "lang") ?? language;
    childSkip = skip || skippedTextTags.has(node.tagName);
    if (!childSkip) {
      for (const attribute of ["alt", "aria-label", "title"]) {
        const value = readParsedAttribute(node, attribute);
        if (value !== null) {
          scanVisibleValue(
            value,
            childLanguage,
            `${relativePath} ${attribute}`,
            collected,
          );
        }
      }
    }
  }

  for (const child of node.childNodes ?? []) {
    scanParsedHtmlNode(
      child,
      childLanguage,
      childSkip,
      relativePath,
      collected,
    );
  }
}

export async function readCjkCharacterPolicy(projectRoot) {
  const manifestPath = resolve(
    projectRoot,
    "src",
    "assets",
    "fonts",
    "cjk-character-sets.json",
  );
  const buffer = await readFile(manifestPath);
  const manifest = JSON.parse(buffer.toString("utf8"));
  if (
    manifest.schemaVersion !== 1 ||
    manifest.status !== "input-approved" ||
    manifest.normalization !== "NFC" ||
    Object.keys(manifest.locales).sort().join("|") !==
      [...locales].sort().join("|")
  ) {
    throw new Error("The CJK character-set manifest contract is invalid.");
  }

  const byLocale = {};
  for (const locale of locales) {
    const record = manifest.locales[locale];
    const allStrings = [
      ...record.contentStrings,
      ...record.requiredProbeStrings,
      manifest.sharedPunctuation,
      record.fallbackOnlyProbe,
    ];
    if (allStrings.some((value) => value !== value.normalize("NFC"))) {
      throw new Error(`${locale} CJK inputs must be NFC.`);
    }
    const contentCodePoints = codePoints(record.contentStrings);
    const requiredCodePoints = codePoints([
      ...record.contentStrings,
      ...record.requiredProbeStrings,
      manifest.sharedPunctuation,
    ]);
    const fallbackOnlyCodePoints = codePoints([record.fallbackOnlyProbe]);
    if (
      contentCodePoints.size !== record.expectedContentCodePointCount ||
      requiredCodePoints.size !== record.expectedRequiredCodePointCount ||
      [...fallbackOnlyCodePoints].some((value) => requiredCodePoints.has(value))
    ) {
      throw new Error(
        `${locale} CJK character counts or fallback boundary drifted.`,
      );
    }
    byLocale[locale] = {
      contentCodePoints,
      requiredCodePoints,
      fallbackOnlyCodePoints,
      unicodeRange: formatCodePoints(requiredCodePoints),
    };
  }

  return {
    manifest,
    manifestPath,
    manifestSha256: sha256(buffer),
    byLocale,
  };
}

export async function assertFontProductionProvenance(
  projectRoot,
  fontInventory,
  policy,
) {
  const fontRoot = resolve(projectRoot, "src", "assets", "fonts");
  const production = fontInventory.fontProduction;
  const bindings = [
    {
      path: production.characterSetPath,
      expectedHash: production.characterSetSha256,
      root: fontRoot,
      label: "CJK character-set manifest",
    },
    {
      path: production.generatorPath,
      expectedHash: production.generatorSha256,
      root: projectRoot,
      label: "CJK subset generator",
    },
    {
      path: production.requirementsPath,
      expectedHash: production.requirementsSha256,
      root: projectRoot,
      label: "CJK production requirements",
    },
  ];

  for (const family of fontInventory.families.filter(
    (candidate) => candidate.characterSetLocale !== undefined,
  )) {
    bindings.push(
      {
        path: family.licensePath,
        expectedHash: family.licenseSha256,
        root: fontRoot,
        label: `${family.familyId} license`,
      },
      {
        path: family.fontlogPath,
        expectedHash: family.fontlogSha256,
        root: fontRoot,
        label: `${family.familyId} FONTLOG`,
      },
    );
  }

  for (const binding of bindings) {
    if (
      typeof binding.path !== "string" ||
      typeof binding.expectedHash !== "string"
    ) {
      throw new Error(`${binding.label} provenance is incomplete.`);
    }
    const path = resolveWithin(binding.root, binding.path, binding.label);
    const actualHash = sha256(await readFile(path));
    if (actualHash !== binding.expectedHash) {
      throw new Error(
        `${binding.label} hash drifted: expected ${binding.expectedHash}, got ${actualHash}.`,
      );
    }
  }

  if (
    resolveWithin(
      fontRoot,
      production.characterSetPath,
      "CJK character-set manifest",
    ) !== policy.manifestPath ||
    production.characterSetSha256 !== policy.manifestSha256
  ) {
    throw new Error(
      "The font inventory does not bind the approved CJK character set.",
    );
  }

  const requirements = (
    await readFile(
      resolveWithin(
        projectRoot,
        production.requirementsPath,
        "CJK production requirements",
      ),
      "utf8",
    )
  )
    .split(/\r?\n/gu)
    .map((line) => line.trim())
    .filter((line) => line !== "" && !line.startsWith("#"))
    .sort();
  const expectedRequirements = [
    `Brotli==${production.brotliVersion}`,
    `fonttools==${production.fontToolsVersion}`,
  ].sort();
  if (
    typeof production.pythonVersion !== "string" ||
    !/^\d+\.\d+\.\d+$/u.test(production.pythonVersion) ||
    requirements.join("|") !== expectedRequirements.join("|")
  ) {
    throw new Error(
      "The font-production tool versions do not match the pinned requirements.",
    );
  }
}

export function parseUnicodeRange(value) {
  const result = new Set();
  for (const rawToken of value.split(",")) {
    const token = rawToken.trim();
    const match = token.match(/^U\+([\dA-F]{1,6})(?:-([\dA-F]{1,6}))?$/iu);
    if (match === null || token.includes("?")) {
      throw new Error(`Unsupported or broad unicode-range token: ${token}`);
    }
    const start = Number.parseInt(match[1], 16);
    const end = Number.parseInt(match[2] ?? match[1], 16);
    if (start > end || end > 0x10ffff) {
      throw new Error(`Invalid unicode-range token: ${token}`);
    }
    for (let codePoint = start; codePoint <= end; codePoint += 1) {
      result.add(codePoint);
    }
  }
  return result;
}

export function mappedFontCodePoints(font) {
  return new Set(
    font.characterSet.filter((codePoint) =>
      font.hasGlyphForCodePoint(codePoint),
    ),
  );
}

export function assertCjkCssFontFaces(
  css,
  fontInventory,
  policy,
  resolveAssetId,
  label,
) {
  const expectedRecords = new Map(
    fontInventory.families
      .filter((family) => family.characterSetLocale !== undefined)
      .flatMap((family) =>
        family.files.map((file) => [file.assetId, { family, file }]),
      ),
  );
  const cjkAliases = new Set(
    [...expectedRecords.values()].map(({ family }) => family.cssAlias),
  );
  const seen = new Set();
  const faceBlocks = css.match(/@font-face\s*\{[^}]*\}/gu) ?? [];

  for (const block of faceBlocks) {
    const cssFamily = unquoteCssString(
      readCssDeclaration(block, "font-family"),
    );
    const sourceUrl = readFirstCssUrl(readCssDeclaration(block, "src"));
    const assetId = sourceUrl === null ? null : resolveAssetId(sourceUrl);
    const record = assetId === null ? undefined : expectedRecords.get(assetId);
    if (!cjkAliases.has(cssFamily) && record === undefined) continue;
    if (
      record === undefined ||
      cssFamily !== record.family.cssAlias ||
      seen.has(record.file.assetId)
    ) {
      throw new Error(`${label} has an untracked or duplicate CJK font face.`);
    }
    if (
      readCssDeclaration(block, "font-style") !== record.file.style ||
      readCssDeclaration(block, "font-weight") !== record.file.weight ||
      readCssDeclaration(block, "font-display") !== "swap"
    ) {
      throw new Error(
        `${label} ${record.file.assetId} style, weight, or display drifted.`,
      );
    }
    const unicodeRange = readCssDeclaration(block, "unicode-range");
    if (unicodeRange === null) {
      throw new Error(`${label} ${record.file.assetId} lacks unicode-range.`);
    }
    assertExactCodePoints(
      parseUnicodeRange(unicodeRange),
      policy.byLocale[record.family.characterSetLocale].requiredCodePoints,
      `${label} ${record.file.assetId} unicode-range`,
    );
    seen.add(record.file.assetId);
  }

  if (
    seen.size !== expectedRecords.size ||
    [...expectedRecords.keys()].some((assetId) => !seen.has(assetId))
  ) {
    throw new Error(`${label} does not contain every approved CJK font face.`);
  }
}

export async function assertCjkFontFile(
  path,
  family,
  file,
  requiredCodePoints,
) {
  const buffer = await readFile(path);
  const font = createFont(buffer);
  if (font.isCollection || font.type !== "WOFF2") {
    throw new Error(`${file.assetId} is not one standalone WOFF2 font.`);
  }
  const actualCodePoints = mappedFontCodePoints(font);
  assertExactCodePoints(
    actualCodePoints,
    requiredCodePoints,
    `${file.assetId} cmap`,
  );
  if (
    font.familyName !== file.legacyFamily ||
    font.subfamilyName !== "Regular" ||
    font.fullName !== file.legacyFamily ||
    font.getName("preferredFamily") !== file.typographicFamily ||
    font.getName("preferredSubfamily") !== file.typographicSubfamily ||
    font.postscriptName !== file.postscriptName ||
    font["OS/2"].usWeightClass !== Number(file.weight) ||
    Object.keys(font.variationAxes).length !== 0 ||
    actualCodePoints.size !== file.cmapCodePointCount
  ) {
    throw new Error(
      `${file.assetId} internal names, weight, or static cmap metadata drifted.`,
    );
  }
  for (const value of [
    font.familyName,
    font.fullName,
    font.getName("preferredFamily"),
    font.postscriptName,
  ]) {
    if (value.includes(family.reservedFontName)) {
      throw new Error(
        `${file.assetId} retains the Reserved Font Name in a primary name.`,
      );
    }
  }
  if (!font.getName("license")?.includes("SIL Open Font License")) {
    throw new Error(`${file.assetId} is missing its embedded OFL record.`);
  }
}

export function assertRenderedCjkPolicy(htmlByPath, policy) {
  const collected = Object.fromEntries(
    locales.map((locale) => [locale, new Set()]),
  );

  for (const [relativePath, html] of htmlByPath) {
    const document = parseHtml(html, { scriptingEnabled: false });
    scanParsedHtmlNode(document, null, false, relativePath, collected);
  }

  for (const locale of locales) {
    assertExactCodePoints(
      collected[locale],
      policy.byLocale[locale].contentCodePoints,
      `${locale} rendered content`,
    );
  }
  return collected;
}
