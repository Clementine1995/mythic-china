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
const inactiveProviderHosts = Object.freeze([
  "buttondown.com",
  "buttondown.email",
  "plausible.io",
  "tally.so",
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

function normalizedText(node) {
  return textContent(node).replace(/\s+/gu, " ").trim();
}

function classNames(node) {
  return new Set(
    (readElementAttribute(node, "class") ?? "")
      .split(/\s+/u)
      .filter((className) => className !== ""),
  );
}

function isDescendantOf(node, ancestor) {
  for (
    let current = node.parentNode;
    current !== undefined;
    current = current.parentNode
  ) {
    if (current === ancestor) return true;
    if (current === null) return false;
  }
  return false;
}

function descendantsOf(elements, ancestor) {
  return elements.filter((node) => isDescendantOf(node, ancestor));
}

function usesInactiveProviderHost(value) {
  try {
    const hostname = new URL(value).hostname.toLowerCase().replace(/\.$/u, "");
    return inactiveProviderHosts.some(
      (providerHost) =>
        hostname === providerHost || hostname.endsWith(`.${providerHost}`),
    );
  } catch {
    return false;
  }
}

function parseReviewHtml(html) {
  const document = parseHtml(html, { scriptingEnabled: true });
  return { document, elements: elementRecords(document) };
}

export function assertReviewInteractionSurface(
  html,
  relativePath,
  expectedEntryId = null,
) {
  const { elements } = parseReviewHtml(html);
  const interactionRoots = elements.filter(
    (node) => readElementAttribute(node, "data-review-interaction") !== null,
  );
  if (
    interactionRoots.some(
      (node) =>
        !["newsletter", "reader-request"].includes(
          readElementAttribute(node, "data-review-interaction"),
        ),
    )
  ) {
    throw new Error(`${relativePath} contains an unknown review interaction.`);
  }
  if (
    elements.some(
      (node) =>
        ["a", "area"].includes(node.tagName) &&
        usesInactiveProviderHost(readElementAttribute(node, "href") ?? ""),
    )
  ) {
    throw new Error(`${relativePath} links to an inactive provider.`);
  }
  const newsletterRoots = elements.filter(
    (node) =>
      readElementAttribute(node, "data-review-interaction") === "newsletter",
  );
  const footers = elements.filter(
    (node) => node.tagName === "footer" && classNames(node).has("site-footer"),
  );
  const newsletter = newsletterRoots[0];
  const footer = footers[0];
  if (
    newsletterRoots.length !== 1 ||
    newsletter === undefined ||
    newsletter.tagName !== "section" ||
    !classNames(newsletter).has("newsletter-form") ||
    !classNames(newsletter).has("page-shell") ||
    readElementAttribute(newsletter, "data-review-state") !== "inactive" ||
    footers.length !== 1 ||
    footer === undefined ||
    !isDescendantOf(newsletter, footer)
  ) {
    throw new Error(
      `${relativePath} must contain one inactive Newsletter inside the global Footer.`,
    );
  }

  const newsletterElements = descendantsOf(elements, newsletter);
  const emailInputs = newsletterElements.filter(
    (node) => node.tagName === "input",
  );
  const email = emailInputs[0];
  const newsletterButtons = newsletterElements.filter(
    (node) => node.tagName === "button",
  );
  const newsletterButton = newsletterButtons[0];
  const newsletterLinks = newsletterElements.filter((node) =>
    ["a", "area"].includes(node.tagName),
  );
  const emailId = email && readElementAttribute(email, "id");
  const emailLabels = newsletterElements.filter(
    (node) =>
      node.tagName === "label" &&
      emailId !== null &&
      readElementAttribute(node, "for") === emailId,
  );
  const newsletterCopy = normalizedText(newsletter);
  if (
    emailInputs.length !== 1 ||
    email === undefined ||
    emailId !== "footer-newsletter-email" ||
    readElementAttribute(email, "type") !== "email" ||
    readElementAttribute(email, "autocomplete") !== "email" ||
    readElementAttribute(email, "disabled") === null ||
    readElementAttribute(email, "name") !== null ||
    readElementAttribute(email, "value") !== null ||
    emailLabels.length !== 1 ||
    normalizedText(emailLabels[0]) !== "Email address" ||
    newsletterButtons.length !== 1 ||
    newsletterButton === undefined ||
    readElementAttribute(newsletterButton, "type") !== "button" ||
    readElementAttribute(newsletterButton, "disabled") === null ||
    readElementAttribute(newsletterButton, "name") !== null ||
    readElementAttribute(newsletterButton, "formaction") !== null ||
    newsletterElements.some((node) =>
      ["form", "select", "textarea"].includes(node.tagName),
    ) ||
    newsletterLinks.length !== 1 ||
    readElementAttribute(newsletterLinks[0], "href") !== "/privacy/" ||
    !newsletterCopy.includes("new Mythic China stories") ||
    !newsletterCopy.includes("occasional editorial selections") ||
    !newsletterCopy.includes("no more than twice a month") ||
    !newsletterCopy.includes("confirm your subscription") ||
    !newsletterCopy.includes("unsubscribe from any email") ||
    !newsletterCopy.includes("subscriptions are not open") ||
    newsletterCopy.toLowerCase().includes("successfully subscribed")
  ) {
    throw new Error(
      `${relativePath} has a stale or potentially active Newsletter review contract.`,
    );
  }

  const readerRoots = elements.filter(
    (node) =>
      readElementAttribute(node, "data-review-interaction") ===
      "reader-request",
  );
  const controlsOutsideNewsletter = elements.filter(
    (node) =>
      ["button", "input", "select", "textarea"].includes(node.tagName) &&
      !isDescendantOf(node, newsletter),
  );
  if (expectedEntryId === null) {
    if (readerRoots.length !== 0 || controlsOutsideNewsletter.length !== 0) {
      throw new Error(
        `${relativePath} must not render a Reader Request or extra control outside an Entry.`,
      );
    }
    return;
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(expectedEntryId)) {
    throw new Error(`Invalid expected Entry ID: ${expectedEntryId}.`);
  }

  const reader = readerRoots[0];
  const entryArticles = elements.filter(
    (node) => node.tagName === "article" && classNames(node).has("entry-page"),
  );
  if (
    readerRoots.length !== 1 ||
    reader === undefined ||
    reader.tagName !== "section" ||
    !classNames(reader).has("entry-section") ||
    !classNames(reader).has("reader-request") ||
    readElementAttribute(reader, "data-review-state") !== "inactive" ||
    readElementAttribute(reader, "data-page-id") !== expectedEntryId ||
    entryArticles.length !== 1 ||
    entryArticles[0] === undefined ||
    !isDescendantOf(reader, entryArticles[0])
  ) {
    throw new Error(
      `${relativePath} must contain one inactive Reader Request for ${expectedEntryId}.`,
    );
  }

  const readerElements = descendantsOf(elements, reader);
  const readerButtons = readerElements.filter(
    (node) => node.tagName === "button",
  );
  const readerButton = readerButtons[0];
  const readerLinks = readerElements.filter((node) =>
    ["a", "area"].includes(node.tagName),
  );
  const readerCopy = normalizedText(reader);
  if (
    readerElements.some((node) =>
      ["form", "input", "select", "textarea"].includes(node.tagName),
    ) ||
    readerButtons.length !== 1 ||
    readerButton === undefined ||
    readElementAttribute(readerButton, "type") !== "button" ||
    readElementAttribute(readerButton, "disabled") === null ||
    readElementAttribute(readerButton, "formaction") !== null ||
    readerLinks.length !== 1 ||
    readElementAttribute(readerLinks[0], "href") !== "/privacy/" ||
    !readerCopy.includes("Topic or tale is required") ||
    !readerCopy.includes("Email is optional") ||
    !readerCopy.includes("This does not subscribe me to the newsletter.") ||
    !readerCopy.includes("Reader Requests are not open") ||
    readerCopy.toLowerCase().includes("successfully submitted") ||
    controlsOutsideNewsletter.length !== 1 ||
    controlsOutsideNewsletter[0] !== readerButton
  ) {
    throw new Error(
      `${relativePath} has a stale or potentially active Reader Request contract.`,
    );
  }

  const readerPosition = elements.indexOf(reader);
  const requiredPredecessors = elements.filter(
    (node) =>
      classNames(node).has("source-section") ||
      ["collections-heading", "related-heading"].includes(
        readElementAttribute(node, "id"),
      ),
  );
  if (
    requiredPredecessors.some(
      (node) => elements.indexOf(node) >= readerPosition,
    ) ||
    elements.indexOf(footer) <= readerPosition ||
    elements.indexOf(newsletter) <= readerPosition
  ) {
    throw new Error(
      `${relativePath} must order Sources and reading paths before Reader Request and Footer.`,
    );
  }
}

export function assertReviewPrivacyNotice(html, relativePath) {
  const { elements } = parseReviewHtml(html);
  const roots = elements.filter(
    (node) => readElementAttribute(node, "data-review-notice") === "privacy",
  );
  const root = roots[0];
  const mainRoots = elements.filter(
    (node) =>
      node.tagName === "main" &&
      readElementAttribute(node, "id") === "main-content",
  );
  if (
    roots.length !== 1 ||
    root === undefined ||
    root.tagName !== "article" ||
    !classNames(root).has("privacy-page") ||
    !classNames(root).has("page-shell") ||
    mainRoots.length !== 1 ||
    !isDescendantOf(root, mainRoots[0])
  ) {
    throw new Error(`${relativePath} must contain one Privacy notice root.`);
  }
  const rootElements = descendantsOf(elements, root);
  const addresses = rootElements.filter((node) => node.tagName === "address");
  const noticeCopy = normalizedText(root);
  const requiredCopy = [
    "Mythic China is a site brand operated by hyc",
    "China",
    "huyichen2019@gmail.com",
    "60 days after a request is closed",
    "unless a longer retention period is required by law",
    "not currently accepting newsletter sign-ups",
    "not currently accepting Reader Requests",
    "buttondown.com",
    "open and click tracking will remain off before the first send",
    "persistent Respondent ID",
    "tally.so",
    "Google Cloud Belgium",
    "does not remove a Respondent ID",
    "every 28 days",
    "delete records that are at least 60 days old",
    "empty Tally Trash in the same operation",
    "60 to 88 days",
    "sole operator is hyc",
    "no independent backup",
    "a missed operation can extend that period",
    "Plausible is not enabled",
    "plausible.io",
  ];
  if (
    addresses.length !== 1 ||
    !normalizedText(addresses[0]).includes("huyichen2019@gmail.com") ||
    requiredCopy.some((copy) => !noticeCopy.includes(copy)) ||
    /\[(?:TODO|TBD|填写|待确认)\]/iu.test(noticeCopy) ||
    rootElements.some(
      (node) =>
        ["a", "area"].includes(node.tagName) &&
        (readElementAttribute(node, "href") ?? "")
          .toLowerCase()
          .startsWith("mailto:"),
    )
  ) {
    throw new Error(`${relativePath} has an incomplete Privacy notice.`);
  }
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
