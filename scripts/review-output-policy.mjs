import { URL } from "node:url";

const forbiddenElements = new Set([
  "base",
  "embed",
  "form",
  "iframe",
  "object",
]);

const reviewOrigin = "https://review.invalid";

const htmlTagPattern = /<([a-z][\w:-]*)\b(?:[^<>"']|"[^"]*"|'[^']*')*>/giu;

const styleElementPattern =
  /<style\b(?:[^<>"']|"[^"]*"|'[^']*')*>([\s\S]*?)<\/style\s*>/giu;

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

function readHtmlAttribute(tag, name) {
  const match = tag.match(
    new RegExp(
      `\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>]+))`,
      "iu",
    ),
  );
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
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
    return;
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
}

function assertSrcset(value, context) {
  const candidates = decodeUrlEntities(value).split(",");
  for (const candidate of candidates) {
    const resource = candidate.trim().split(/\s+/u)[0];
    if (resource === undefined || resource === "") {
      throw new Error(`${context} contains an empty srcset candidate.`);
    }
    assertRootRelativeResource(resource, context);
  }
}

export function assertReviewCssResourcePolicy(css, relativePath) {
  const inspectedCss = decodeUrlEntities(css).replace(
    /\/\*[\s\S]*?\*\//gu,
    " ",
  );
  if (inspectedCss.includes("\\")) {
    throw new Error(`${relativePath} CSS contains a forbidden escape.`);
  }
  if (
    /\/\//u.test(inspectedCss) ||
    /\b(?:data|blob|file):/iu.test(inspectedCss)
  ) {
    throw new Error(`${relativePath} CSS contains a non-local URL.`);
  }
  if (/\b(?:-webkit-)?image-set\s*\(/iu.test(inspectedCss)) {
    throw new Error(`${relativePath} CSS uses unsupported image-set().`);
  }

  for (const match of inspectedCss.matchAll(
    /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)'"\s][^)]*?))\s*\)/giu,
  )) {
    const resource = match[1] ?? match[2] ?? match[3];
    if (resource === undefined) continue;
    assertRootRelativeResource(resource, `${relativePath} CSS url()`, {
      allowFragment: true,
    });
  }
  for (const match of inspectedCss.matchAll(
    /@import\s+(?!url\()(?:"([^"]*)"|'([^']*)'|([^\s;]+))/giu,
  )) {
    const resource = match[1] ?? match[2] ?? match[3];
    if (resource === undefined) continue;
    assertRootRelativeResource(resource, `${relativePath} CSS @import`);
  }
}

export function assertReviewHtmlResourcePolicy(html, relativePath) {
  for (const match of html.matchAll(htmlTagPattern)) {
    const tag = match[0];
    const element = match[1]?.toLowerCase();
    if (element === undefined) continue;
    if (forbiddenElements.has(element)) {
      throw new Error(
        `${relativePath} contains forbidden <${element}> output.`,
      );
    }
    if (
      element === "meta" &&
      decodeUrlEntities(readHtmlAttribute(tag, "http-equiv") ?? "")
        .trim()
        .toLowerCase() === "refresh"
    ) {
      throw new Error(`${relativePath} contains a forbidden meta refresh.`);
    }

    const attributes = resourceAttributes.get(element) ?? [];
    let resourceCount = 0;
    for (const attribute of attributes) {
      const value = readHtmlAttribute(tag, attribute);
      if (value === null) continue;
      resourceCount += 1;
      const context = `${relativePath} <${element}> ${attribute}`;
      if (attribute === "srcset" || attribute === "imagesrcset") {
        assertSrcset(value, context);
      } else {
        assertRootRelativeResource(value, context, {
          allowFragment:
            (element === "image" ||
              element === "feimage" ||
              element === "use") &&
            (attribute === "href" || attribute === "xlink:href"),
        });
      }
    }
    if (
      ["link", "img", "source", "track", "image", "feimage", "use"].includes(
        element,
      ) &&
      resourceCount === 0
    ) {
      throw new Error(`${relativePath} <${element}> lacks a local resource.`);
    }

    const inlineStyle = readHtmlAttribute(tag, "style");
    if (inlineStyle !== null) {
      assertReviewCssResourcePolicy(
        inlineStyle,
        `${relativePath} inline style`,
      );
    }
    for (const attribute of svgPresentationUrlAttributes) {
      const value = readHtmlAttribute(tag, attribute);
      if (value !== null) {
        assertReviewCssResourcePolicy(
          value,
          `${relativePath} <${element}> ${attribute}`,
        );
      }
    }
    const background = readHtmlAttribute(tag, "background");
    if (background !== null) {
      assertRootRelativeResource(
        background,
        `${relativePath} <${element}> background`,
      );
    }
    if (element === "a" || element === "area") {
      for (const attribute of ["href", "xlink:href"]) {
        const href = readHtmlAttribute(tag, attribute);
        if (href !== null) {
          assertAnchorHref(href, `${relativePath} <${element}> ${attribute}`);
        }
      }
    } else {
      for (const attribute of ["href", "xlink:href"]) {
        if (attributes.includes(attribute)) continue;
        const href = readHtmlAttribute(tag, attribute);
        if (href !== null) {
          assertRootRelativeResource(
            href,
            `${relativePath} <${element}> ${attribute}`,
            { allowFragment: true },
          );
        }
      }
    }
    if (
      (element === "a" || element === "area") &&
      readHtmlAttribute(tag, "ping") !== null
    ) {
      throw new Error(`${relativePath} contains a forbidden anchor ping.`);
    }
  }

  for (const match of html.matchAll(styleElementPattern)) {
    assertReviewCssResourcePolicy(match[1] ?? "", `${relativePath} <style>`);
  }
}
