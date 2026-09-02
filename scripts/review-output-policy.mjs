import { URL } from "node:url";

import { parse as parseHtml } from "parse5";
import { extname } from "node:path";

const forbiddenElements = new Set([
  "base",
  "embed",
  "form",
  "iframe",
  "noscript",
  "object",
  "script",
  "template",
]);

const reviewOrigin = "https://review.invalid";
const allowedReviewOutputExtensions = new Set([
  ".avif",
  ".css",
  ".html",
  ".webp",
  ".woff2",
]);

const svgPresentationUrlAttributes = [
  "clip-path",
  "color-profile",
  "cursor",
  "fill",
  "filter",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "mask",
  "stroke",
];

const resourceAttributes = new Map([
  ["link", ["href", "imagesrcset"]],
  ["script", ["src"]],
  ["img", ["src", "srcset"]],
  ["source", ["src", "srcset"]],
  ["video", ["src", "poster"]],
  ["audio", ["src"]],
  ["track", ["src"]],
  ["input", ["src"]],
  ["image", ["href", "xlink:href", "src", "srcset"]],
  ["feimage", ["href", "xlink:href"]],
  ["use", ["href", "xlink:href"]],
  ["html", ["manifest"]],
]);

function attributeName(attribute) {
  return `${attribute.prefix === undefined ? "" : `${attribute.prefix}:`}${attribute.name}`.toLowerCase();
}

function readElementAttribute(node, name) {
  const values = (node.attrs ?? [])
    .filter((attribute) => attributeName(attribute) === name)
    .map(({ value }) => value);
  if (values.length > 1) {
    throw new Error(`Duplicate ${name} attribute on <${node.tagName}>.`);
  }
  return values[0] ?? null;
}

function elementRecords(document) {
  const records = [];
  function visit(node) {
    if (typeof node.tagName === "string") records.push(node);
    for (const child of node.childNodes ?? []) visit(child);
    if (node.content !== undefined) visit(node.content);
  }
  visit(document);
  return records;
}

function textContent(node) {
  if (node.nodeName === "#text") return node.value;
  return (node.childNodes ?? []).map((child) => textContent(child)).join("");
}

function parseReviewHtml(html) {
  const document = parseHtml(html, { scriptingEnabled: true });
  return { document, elements: elementRecords(document) };
}

function decodeUrlEntities(value) {
  return value
    .replace(/&#x([\da-f]+);?/giu, (match, hexadecimal) => {
      const codePoint = Number.parseInt(hexadecimal, 16);
      return Number.isSafeInteger(codePoint) && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : match;
    })
    .replace(/&#(\d+);?/gu, (match, decimal) => {
      const codePoint = Number.parseInt(decimal, 10);
      return Number.isSafeInteger(codePoint) && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : match;
    })
    .replace(/&colon;/giu, ":")
    .replace(/&sol;/giu, "/")
    .replace(/&tab;/giu, "\t")
    .replace(/&newline;/giu, "\n")
    .replace(/&bsol;/giu, "\\")
    .replace(/&amp;/giu, "&");
}

function hasUnsafeUrlCharacter(value) {
  return [...value].some((character) => {
    const codePoint = character.codePointAt(0);
    return (
      character === "\\" ||
      (codePoint !== undefined && (codePoint <= 0x1f || codePoint === 0x7f))
    );
  });
}

function assertRootRelativeResource(value, context, options = {}) {
  const decoded = decodeUrlEntities(value);
  const normalized = decoded.trim();
  if (
    options.allowFragment === true &&
    normalized.startsWith("#") &&
    !hasUnsafeUrlCharacter(decoded)
  ) {
    return null;
  }

  let parsed;
  try {
    parsed = new URL(normalized, reviewOrigin);
  } catch {
    throw new Error(`${context} must use a root-relative local resource.`);
  }

  if (
    normalized === "" ||
    !normalized.startsWith("/") ||
    normalized.startsWith("//") ||
    hasUnsafeUrlCharacter(decoded) ||
    parsed.origin !== reviewOrigin
  ) {
    throw new Error(`${context} must use a root-relative local resource.`);
  }
  return { context, pathname: parsed.pathname };
}

function assertAnchorHref(value, context) {
  const decoded = decodeUrlEntities(value);
  const normalized = decoded.trim();
  if (normalized.startsWith("/")) {
    assertRootRelativeResource(decoded, context);
    return;
  }
  if (
    normalized.startsWith("#") &&
    normalized.length > 1 &&
    !hasUnsafeUrlCharacter(decoded)
  ) {
    return;
  }
  if (hasUnsafeUrlCharacter(decoded) || !/^https?:\/\//iu.test(normalized)) {
    throw new Error(
      `${context} must use an HTTP(S), root-relative, or fragment URL.`,
    );
  }

  let parsed;
  try {
    parsed = new URL(normalized);
  } catch {
    throw new Error(
      `${context} must use an HTTP(S), root-relative, or fragment URL.`,
    );
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(
      `${context} must use an HTTP(S), root-relative, or fragment URL.`,
    );
  }
  const hostname = parsed.hostname.toLowerCase().replace(/\.$/u, "");
  if (
    hostname === "review.invalid" ||
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    /^127(?:\.\d{1,3}){3}$/u.test(hostname) ||
    ["[::1]", "0:0:0:0:0:0:0:1"].includes(hostname)
  ) {
    throw new Error(`${context} must not use an absolute review-only origin.`);
  }
}

function assertSrcset(value, context) {
  const resources = [];
  const candidates = decodeUrlEntities(value).split(",");
  for (const candidate of candidates) {
    const resource = candidate.trim().split(/\s+/u)[0];
    if (resource === undefined || resource === "") {
      throw new Error(`${context} contains an empty srcset candidate.`);
    }
    resources.push(assertRootRelativeResource(resource, context));
  }
  return resources;
}

function stripCssComments(css) {
  let stripped = "";
  let quote = null;
  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];
    if (quote !== null) {
      stripped += character;
      if (character === "\\" && index + 1 < css.length) {
        index += 1;
        stripped += css[index];
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      stripped += character;
      continue;
    }
    if (character === "/" && css[index + 1] === "*") {
      const commentEnd = css.indexOf("*/", index + 2);
      if (commentEnd < 0) {
        throw new Error("Review CSS contains an unclosed comment.");
      }
      stripped += " ";
      index = commentEnd + 1;
      continue;
    }
    stripped += character;
  }
  if (quote !== null) {
    throw new Error("Review CSS contains an unclosed string.");
  }
  return stripped;
}

function assertClosedCssSyntax(css, relativePath) {
  const expectedClosers = [];
  let quote = null;
  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];
    if (quote !== null) {
      if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    const closer = { "{": "}", "(": ")", "[": "]" }[character];
    if (closer !== undefined) {
      expectedClosers.push(closer);
      continue;
    }
    if (["}", ")", "]"].includes(character)) {
      if (expectedClosers.pop() !== character) {
        throw new Error(`${relativePath} CSS contains an unmatched delimiter.`);
      }
    }
  }
  if (quote !== null || expectedClosers.length > 0) {
    throw new Error(`${relativePath} CSS contains an unclosed token.`);
  }
}

export function assertReviewOutputArtifactExtensions(relativePaths) {
  const invalid = relativePaths.filter(
    (relativePath) => !allowedReviewOutputExtensions.has(extname(relativePath)),
  );
  if (invalid.length > 0) {
    throw new Error(
      `Review output contains unsupported artifact types:\n${invalid.join("\n")}`,
    );
  }
}

export function classifyReviewOutputEntry(entry, relativePath) {
  if (entry.isSymbolicLink()) {
    throw new Error(
      `Review output must not contain a symbolic link: ${relativePath}`,
    );
  }
  if (entry.isDirectory()) return "directory";
  if (entry.isFile()) return "file";
  throw new Error(
    `Review output contains an unsupported entry: ${relativePath}`,
  );
}

export function assertReviewResourceInventory(resources, availablePaths) {
  const inventory = new Set(availablePaths);
  const missing = resources.filter(({ pathname }) => !inventory.has(pathname));
  if (missing.length > 0) {
    throw new Error(
      `Review output references missing emitted resources:\n${missing
        .map(({ context, pathname }) => `${context}: ${pathname}`)
        .join("\n")}`,
    );
  }
}

export function assertReviewCssResourcePolicy(css, relativePath) {
  const decodedCss = decodeUrlEntities(css);
  if (decodedCss.includes("\\")) {
    throw new Error(`${relativePath} CSS contains a forbidden escape.`);
  }
  const inspectedCss = stripCssComments(decodedCss);
  assertClosedCssSyntax(inspectedCss, relativePath);
  if (
    /\/\//u.test(inspectedCss) ||
    /\b(?:data|blob|file):/iu.test(inspectedCss)
  ) {
    throw new Error(`${relativePath} CSS contains a non-local URL.`);
  }
  if (/\b(?:-webkit-)?image-set\s*\(/iu.test(inspectedCss)) {
    throw new Error(`${relativePath} CSS uses unsupported image-set().`);
  }
  if (/@import\b/iu.test(inspectedCss)) {
    throw new Error(`${relativePath} CSS must not import another stylesheet.`);
  }

  const urlPattern =
    /\burl\(\s*(?:"([^"]*)"|'([^']*)'|([^)'"\s][^)]*?))\s*\)/giu;
  const matches = [...inspectedCss.matchAll(urlPattern)];
  const matchedStarts = new Set(matches.map(({ index }) => index));
  for (const { index } of inspectedCss.matchAll(/\burl\s*\(/giu)) {
    if (!matchedStarts.has(index)) {
      throw new Error(`${relativePath} CSS contains an unsupported url().`);
    }
  }
  const resources = [];
  for (const match of matches) {
    const resource = match[1] ?? match[2] ?? match[3];
    if (resource === undefined) continue;
    const record = assertRootRelativeResource(
      resource,
      `${relativePath} CSS url()`,
      {
        allowFragment: true,
      },
    );
    if (record !== null) resources.push(record);
  }
  return resources;
}

export function assertReviewHtmlResourcePolicy(html, relativePath) {
  const { elements } = parseReviewHtml(html);
  const resources = [];
  const heads = elements.filter((node) => node.tagName === "head");
  const head = heads[0];
  const robots = elements.filter(
    (node) =>
      node.tagName === "meta" &&
      readElementAttribute(node, "name")?.toLowerCase() === "robots",
  );
  if (
    heads.length !== 1 ||
    head === undefined ||
    robots.length !== 1 ||
    robots[0]?.parentNode !== head ||
    readElementAttribute(robots[0], "content") !== "noindex, nofollow"
  ) {
    throw new Error(
      `${relativePath} must keep one exact robots policy in head.`,
    );
  }

  for (const node of elements) {
    const element = node.tagName;
    const elementKey = element.toLowerCase();
    const name = (readElementAttribute(node, "name") ?? "").toLowerCase();
    const property = (
      readElementAttribute(node, "property") ?? ""
    ).toLowerCase();
    const rel = new Set(
      (readElementAttribute(node, "rel") ?? "").toLowerCase().split(/\s+/u),
    );
    const httpEquiv = (
      readElementAttribute(node, "http-equiv") ?? ""
    ).toLowerCase();
    if (forbiddenElements.has(elementKey)) {
      throw new Error(
        `${relativePath} contains forbidden <${element}> output.`,
      );
    }
    if (elementKey === "meta") {
      if (
        httpEquiv.trim() === "refresh" ||
        httpEquiv.trim().startsWith("content-security-policy")
      ) {
        throw new Error(`${relativePath} contains forbidden meta policy.`);
      }
      if (
        property.startsWith("og:") ||
        name.startsWith("twitter:") ||
        (name !== "robots" && /(?:bot|spider|slurp)/u.test(name))
      ) {
        throw new Error(`${relativePath} contains release discovery metadata.`);
      }
    }
    if (
      elementKey === "link" &&
      (rel.has("canonical") || rel.has("alternate"))
    ) {
      throw new Error(`${relativePath} contains release discovery metadata.`);
    }
    for (const attribute of node.attrs ?? []) {
      const attributeKey = attributeName(attribute);
      const decodedValue = decodeUrlEntities(attribute.value).trim();
      if (attributeKey.startsWith("on")) {
        throw new Error(`${relativePath} contains an event handler.`);
      }
      if (/^(?:javascript|vbscript):/iu.test(decodedValue)) {
        throw new Error(`${relativePath} contains an executable URL.`);
      }
    }

    const attributes = resourceAttributes.get(elementKey) ?? [];
    let resourceCount = 0;
    for (const attribute of attributes) {
      const value = readElementAttribute(node, attribute);
      if (value === null) continue;
      resourceCount += 1;
      const context = `${relativePath} <${element}> ${attribute}`;
      if (attribute === "srcset" || attribute === "imagesrcset") {
        resources.push(...assertSrcset(value, context));
      } else {
        const record = assertRootRelativeResource(value, context, {
          allowFragment:
            (elementKey === "image" ||
              elementKey === "feimage" ||
              elementKey === "use") &&
            (attribute === "href" || attribute === "xlink:href"),
        });
        if (record !== null) resources.push(record);
      }
    }
    if (
      ["link", "img", "source", "track", "image", "feimage", "use"].includes(
        elementKey,
      ) &&
      resourceCount === 0
    ) {
      throw new Error(`${relativePath} <${element}> lacks a local resource.`);
    }

    const inlineStyle = readElementAttribute(node, "style");
    if (inlineStyle !== null) {
      resources.push(
        ...assertReviewCssResourcePolicy(
          inlineStyle,
          `${relativePath} inline style`,
        ),
      );
    }
    for (const attribute of svgPresentationUrlAttributes) {
      const value = readElementAttribute(node, attribute);
      if (value !== null) {
        resources.push(
          ...assertReviewCssResourcePolicy(
            value,
            `${relativePath} <${element}> ${attribute}`,
          ),
        );
      }
    }
    const background = readElementAttribute(node, "background");
    if (background !== null) {
      resources.push(
        assertRootRelativeResource(
          background,
          `${relativePath} <${element}> background`,
        ),
      );
    }
    if (elementKey === "a" || elementKey === "area") {
      for (const attribute of ["href", "xlink:href"]) {
        const href = readElementAttribute(node, attribute);
        if (href !== null) {
          assertAnchorHref(href, `${relativePath} <${element}> ${attribute}`);
        }
      }
    } else {
      for (const attribute of ["href", "xlink:href"]) {
        if (attributes.includes(attribute)) continue;
        const href = readElementAttribute(node, attribute);
        if (href !== null) {
          const record = assertRootRelativeResource(
            href,
            `${relativePath} <${element}> ${attribute}`,
            { allowFragment: true },
          );
          if (record !== null) resources.push(record);
        }
      }
    }
    if (
      (elementKey === "a" || elementKey === "area") &&
      readElementAttribute(node, "ping") !== null
    ) {
      throw new Error(`${relativePath} contains a forbidden anchor ping.`);
    }
  }

  for (const style of elements.filter((node) => node.tagName === "style")) {
    resources.push(
      ...assertReviewCssResourcePolicy(
        textContent(style),
        `${relativePath} <style>`,
      ),
    );
  }
  return resources;
}

export function readReviewHtmlStyleResources(html) {
  const { elements } = parseReviewHtml(html);
  return {
    inlineStyles: elements
      .filter((node) => node.tagName === "style")
      .map((node) => ({
        attributes: (node.attrs ?? []).map(attributeName).sort(),
        css: textContent(node),
      })),
    stylesheets: elements
      .filter((node) => {
        const rel = new Set(
          (readElementAttribute(node, "rel") ?? "").toLowerCase().split(/\s+/u),
        );
        return node.tagName === "link" && rel.has("stylesheet");
      })
      .map((node) => ({
        attributes: (node.attrs ?? []).map(attributeName).sort(),
        href: readElementAttribute(node, "href"),
        rel: (readElementAttribute(node, "rel") ?? "")
          .trim()
          .toLowerCase()
          .split(/\s+/u)
          .filter((token) => token !== "")
          .sort()
          .join(" "),
      })),
  };
}
