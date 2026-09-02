import { URL } from "node:url";

import { parse as parseHtml } from "parse5";

export const fontSpecimenRoute = "/review/type-specimen/";
export const fontSpecimenOutputPath = "review/type-specimen/index.html";
export const expectedReviewHtmlFiles = Object.freeze(
  [
    "about/index.html",
    "collections/chinese-underworld/index.html",
    "collections/index.html",
    "explore/chinese-underworld-guide/index.html",
    "explore/index.html",
    "explore/zhong-kui/index.html",
    "index.html",
    fontSpecimenOutputPath,
  ].sort(),
);

const navigationHrefs = ["/", "/explore/", "/collections/", "/about/"];
const pinyinLower = "ā á ǎ à ē é ě è ī í ǐ ì ō ó ǒ ò ū ú ǔ ù ǖ ǘ ǚ ǜ ü ê";
const pinyinUpper = "Ā Á Ǎ À Ē É Ě È Ī Í Ǐ Ì Ō Ó Ǒ Ò Ū Ú Ǔ Ù Ǖ Ǘ Ǚ Ǜ Ü Ê";
export const fontSpecimenPinyinRows = Object.freeze([
  Object.freeze([
    Object.freeze({ text: "Nǚwā ", language: null }),
    Object.freeze({ text: "女娲", language: "zh-Hans" }),
    Object.freeze({ text: " · Lǚ Dòngbīn ", language: null }),
    Object.freeze({ text: "吕洞宾", language: "zh-Hans" }),
    Object.freeze({ text: " · Cháng’é ", language: null }),
    Object.freeze({ text: "嫦娥", language: "zh-Hans" }),
  ]),
  Object.freeze([
    Object.freeze({ text: "Fēngdū ", language: null }),
    Object.freeze({ text: "酆都", language: "zh-Hans" }),
    Object.freeze({ text: " · Yánluó Wáng ", language: null }),
    Object.freeze({ text: "阎罗王", language: "zh-Hans" }),
    Object.freeze({ text: " · Mèng Pó ", language: null }),
    Object.freeze({ text: "孟婆", language: "zh-Hans" }),
  ]),
  Object.freeze([
    Object.freeze({ text: "Zhōng Kuí ", language: null }),
    Object.freeze({ text: "钟馗", language: "zh-Hans" }),
    Object.freeze({ text: " · Hēibái Wúcháng ", language: null }),
    Object.freeze({ text: "黑白无常", language: "zh-Hans" }),
  ]),
  Object.freeze([
    Object.freeze({
      text: "饕餮 夔 獬豸 狴犴 梼杌 穷奇 颛顼 帝喾 鲲鹏",
      language: "zh-Hans",
    }),
  ]),
  Object.freeze([
    Object.freeze({
      text: "《山海经》《搜神记》《聊斋志异》",
      language: "zh-Hans",
    }),
  ]),
]);

const pinyinSpecimenText = [
  pinyinLower,
  pinyinUpper,
  ...fontSpecimenPinyinRows.map((row) => row.map(({ text }) => text).join("")),
].join(" ");

function normalizedText(value) {
  return value.normalize("NFC").replace(/\s+/gu, " ").trim();
}

function uniqueCharacters(values) {
  return [...new Set([...values.join("").normalize("NFC")])].join("");
}

function readAttribute(node, name) {
  const matches = (node.attrs ?? []).filter(
    (attribute) => attribute.name.toLowerCase() === name,
  );
  if (matches.length > 1) {
    throw new Error(`Duplicate ${name} attribute on <${node.tagName}>.`);
  }
  return matches[0]?.value ?? null;
}

function elementRecords(document) {
  const records = [];
  function visit(node, inheritedLanguage) {
    const language =
      typeof node.tagName === "string"
        ? (readAttribute(node, "lang") ?? inheritedLanguage)
        : inheritedLanguage;
    if (typeof node.tagName === "string") {
      records.push({ node, language });
    }
    for (const child of node.childNodes ?? []) visit(child, language);
  }
  visit(document, null);
  return records;
}

function textContent(node) {
  if (node.nodeName === "#text") return node.value;
  return (node.childNodes ?? []).map((child) => textContent(child)).join("");
}

function descendants(node, predicate) {
  const matches = [];
  function visit(candidate) {
    if (typeof candidate.tagName === "string" && predicate(candidate)) {
      matches.push(candidate);
    }
    for (const child of candidate.childNodes ?? []) visit(child);
  }
  visit(node);
  return matches;
}

function childElements(node) {
  return (node.childNodes ?? []).filter(
    (child) => typeof child.tagName === "string",
  );
}

function descendantElements(node) {
  return (node.childNodes ?? []).flatMap((child) =>
    descendants(child, () => true),
  );
}

function classNames(node) {
  return new Set(
    (readAttribute(node, "class") ?? "")
      .split(/\s+/u)
      .filter((className) => className !== ""),
  );
}

function hasExactElementContract(node, tagName, classes, attributes) {
  const actualClasses = [...classNames(node)].sort();
  const actualAttributes = (node.attrs ?? [])
    .map(({ name }) => name.toLowerCase())
    .sort();
  return (
    node.tagName === tagName &&
    JSON.stringify(actualClasses) === JSON.stringify([...classes].sort()) &&
    JSON.stringify(actualAttributes) === JSON.stringify([...attributes].sort())
  );
}

const nonRenderedReviewAncestors = new Set([
  "audio",
  "canvas",
  "datalist",
  "noscript",
  "object",
  "select",
  "template",
  "video",
]);

function isHiddenFromReview(node) {
  for (
    let current = node;
    current !== null && current !== undefined;
    current = current.parentNode
  ) {
    const ariaHidden = readAttribute(current, "aria-hidden");
    if (
      readAttribute(current, "hidden") !== null ||
      readAttribute(current, "inert") !== null ||
      ariaHidden?.trim().toLowerCase() === "true" ||
      readAttribute(current, "popover") !== null ||
      nonRenderedReviewAncestors.has(current.tagName) ||
      (current.namespaceURI !== undefined &&
        current.namespaceURI !== "http://www.w3.org/1999/xhtml") ||
      (current.tagName === "details" &&
        readAttribute(current, "open") === null) ||
      (current.tagName === "dialog" && readAttribute(current, "open") === null)
    ) {
      return true;
    }
  }
  return false;
}

function assertExactList(actual, expected, label) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `${label} drifted; expected [${expected.join(", ")}], got [${actual.join(", ")}].`,
    );
  }
}

export function assertReviewHtmlInventory(htmlFiles) {
  assertExactList(
    [...htmlFiles].sort(),
    expectedReviewHtmlFiles,
    "M4 review HTML inventory",
  );
}

export function assertExactReviewNavigation(html, relativePath) {
  const document = parseHtml(html, { scriptingEnabled: false });
  const records = elementRecords(document);
  const contracts = [
    {
      label: "Primary navigation",
      className: "desktop-navigation",
    },
    {
      label: "Mobile primary navigation",
      className: null,
    },
  ];

  for (const contract of contracts) {
    const matching = records
      .map(({ node }) => node)
      .filter(
        (node) =>
          node.tagName === "nav" &&
          readAttribute(node, "aria-label") === contract.label &&
          (contract.className === null ||
            classNames(node).has(contract.className)),
      );
    if (matching.length !== 1) {
      throw new Error(
        `${relativePath} must contain one exact ${contract.label}.`,
      );
    }
    const hrefs = descendants(matching[0], (node) => node.tagName === "a").map(
      (node) => readAttribute(node, "href"),
    );
    assertExactList(
      hrefs,
      navigationHrefs,
      `${relativePath} ${contract.label}`,
    );
  }
}

export function assertExactReviewSemanticShell(html, relativePath) {
  const document = parseHtml(html, { scriptingEnabled: false });
  const nodes = elementRecords(document).map(({ node }) => node);
  const fail = () => {
    throw new Error(`${relativePath} has a stale semantic shell.`);
  };
  const htmlElements = nodes.filter((node) => node.tagName === "html");
  const bodies = nodes.filter((node) => node.tagName === "body");
  const htmlElement = htmlElements[0];
  const body = bodies[0];
  if (
    htmlElements.length !== 1 ||
    bodies.length !== 1 ||
    htmlElement === undefined ||
    body === undefined ||
    !hasExactElementContract(htmlElement, "html", [], ["lang"]) ||
    readAttribute(htmlElement, "lang") !== "en" ||
    body.parentNode !== htmlElement
  ) {
    fail();
  }

  const skipLinks = nodes.filter((node) => classNames(node).has("skip-link"));
  const skipLink = skipLinks[0];
  const mainTargets = nodes.filter(
    (node) => readAttribute(node, "id") === "main-content",
  );
  const main = mainTargets[0];
  if (
    skipLinks.length !== 1 ||
    skipLink === undefined ||
    !hasExactElementContract(skipLink, "a", ["skip-link"], ["class", "href"]) ||
    readAttribute(skipLink, "href") !== "#main-content" ||
    normalizedText(textContent(skipLink)) !== "Skip to content" ||
    skipLink.parentNode !== body ||
    mainTargets.length !== 1 ||
    main === undefined ||
    !hasExactElementContract(main, "main", [], ["id", "tabindex"]) ||
    readAttribute(main, "tabindex") !== "-1" ||
    main.parentNode !== body ||
    childElements(body).indexOf(skipLink) >= childElements(body).indexOf(main)
  ) {
    fail();
  }

  const mobileDetails = nodes.filter((node) =>
    classNames(node).has("mobile-navigation"),
  );
  const details = mobileDetails[0];
  if (
    mobileDetails.length !== 1 ||
    details === undefined ||
    !hasExactElementContract(
      details,
      "details",
      ["mobile-navigation"],
      ["class"],
    )
  ) {
    fail();
  }
  const mobileChildren = childElements(details);
  const summary = mobileChildren[0];
  const mobileNavigation = mobileChildren[1];
  if (
    mobileChildren.length !== 2 ||
    summary === undefined ||
    mobileNavigation === undefined ||
    !hasExactElementContract(summary, "summary", [], []) ||
    childElements(summary).length !== 0 ||
    normalizedText(textContent(summary)) !== "Menu" ||
    !hasExactElementContract(mobileNavigation, "nav", [], ["aria-label"]) ||
    readAttribute(mobileNavigation, "aria-label") !==
      "Mobile primary navigation"
  ) {
    fail();
  }
}

export function assertFontSpecimenResourcePolicy(resources) {
  const forbidden = resources.filter(
    ({ pathname }) => !/\.(?:css|woff2)$/u.test(pathname),
  );
  if (forbidden.length > 0) {
    throw new Error(
      `The type specimen must not add an image dependency:\n${forbidden
        .map(({ context, pathname }) => `${context}: ${pathname}`)
        .join("\n")}`,
    );
  }
}

function normalizedRoutePath(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname;
  }
  return `/${decoded.replace(/^\/+|\/+$/gu, "")}/`;
}

function reviewDocumentUrl(relativePath) {
  const normalizedPath = relativePath.replaceAll("\\", "/").replace(/^\/+/, "");
  const routePath =
    normalizedPath === "index.html"
      ? "/"
      : normalizedPath.endsWith("/index.html")
        ? `/${normalizedPath.slice(0, -"index.html".length)}`
        : `/${normalizedPath}`;
  return new URL(routePath, "https://review.invalid");
}

function readReviewLinks(html, relativePath) {
  const document = parseHtml(html, { scriptingEnabled: false });
  if (descendants(document, (node) => node.tagName === "template").length > 0) {
    throw new Error(
      `${relativePath} must not contain a template link surface.`,
    );
  }
  const documentUrl = reviewDocumentUrl(relativePath);
  const base = descendants(
    document,
    (node) => node.tagName === "base" && readAttribute(node, "href") !== null,
  )[0];
  let baseUrl = documentUrl;
  if (base !== undefined) {
    try {
      baseUrl = new URL(readAttribute(base, "href"), documentUrl);
    } catch {
      throw new Error(`${relativePath} contains an invalid base href.`);
    }
  }

  const links = descendants(document, (node) =>
    ["a", "area", "link"].includes(node.tagName),
  );
  const resolvedLinks = [];
  for (const link of links) {
    const rawHref = readAttribute(link, "href");
    if (rawHref === null) continue;
    const href = rawHref.trim();
    let resolved;
    try {
      resolved = new URL(href, baseUrl);
    } catch {
      throw new Error(
        `${relativePath} contains an invalid link href: ${href}.`,
      );
    }
    resolvedLinks.push({
      href,
      hostname: resolved.hostname,
      origin: resolved.origin,
      pathname: resolved.pathname,
      protocol: resolved.protocol,
    });
  }
  return resolvedLinks;
}

export function readInternalReviewLinks(html, relativePath) {
  const documentUrl = reviewDocumentUrl(relativePath);
  return readReviewLinks(html, relativePath)
    .filter(
      ({ hostname, origin, protocol }) =>
        origin === documentUrl.origin ||
        (["http:", "https:"].includes(protocol) &&
          (hostname === "localhost" ||
            hostname.endsWith(".localhost") ||
            /^127(?:\.\d{1,3}){3}$/u.test(hostname) ||
            ["[::1]", "0:0:0:0:0:0:0:1"].includes(hostname))),
    )
    .map(({ href, pathname }) => ({ href, pathname }));
}

export function assertNoFontSpecimenLinks(html, relativePath) {
  const sourceIsSpecimen =
    normalizedRoutePath(reviewDocumentUrl(relativePath).pathname) ===
    fontSpecimenRoute;
  for (const { href, pathname, protocol } of readReviewLinks(
    html,
    relativePath,
  )) {
    if (
      !sourceIsSpecimen &&
      ["http:", "https:"].includes(protocol) &&
      normalizedRoutePath(pathname) === fontSpecimenRoute
    ) {
      throw new Error(
        `${relativePath} must not expose the direct-only type specimen route through ${href}.`,
      );
    }
  }
}

export function createFontSpecimenSampleContract(policy) {
  const sharedPunctuation = policy.manifest.sharedPunctuation;
  const cjkSamples = ["zh-Hans", "zh-Hant"].flatMap((locale) => {
    const record = policy.manifest.locales[locale];
    const requiredText = uniqueCharacters([
      ...record.contentStrings,
      ...record.requiredProbeStrings,
      sharedPunctuation,
    ]);
    const fontRole = record.fontRole;
    return ["400", "500", "600"].flatMap((weight) => [
      {
        id: `${locale.toLowerCase()}-required-${weight}`,
        fontRole,
        contentRole: "required",
        weight,
        style: "normal",
        language: locale,
        fallbackOnly: null,
        label: `${locale} · ${weight} · required`,
        text: requiredText,
      },
      {
        id: `${locale.toLowerCase()}-fallback-${weight}`,
        fontRole,
        contentRole: "fallback",
        weight,
        style: "normal",
        language: locale,
        fallbackOnly: "true",
        label: "Intentional fallback-only probe",
        text: record.fallbackOnlyProbe,
      },
    ]);
  });

  return [
    {
      id: "display-hero-400",
      fontRole: "display",
      contentRole: "hero",
      weight: "400",
      style: "normal",
      language: "en",
      fallbackOnly: null,
      label: "Display · hero · 400",
      text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    {
      id: "display-ui-560",
      fontRole: "display",
      contentRole: "ui",
      weight: "560",
      style: "normal",
      language: "en",
      fallbackOnly: null,
      label: "Display · UI · 560",
      text: "abcdefghijklmnopqrstuvwxyz",
    },
    {
      id: "display-pinyin-600",
      fontRole: "display",
      contentRole: "pinyin",
      weight: "600",
      style: "normal",
      language: "zh-Latn-pinyin",
      fallbackOnly: null,
      label: "Display · pinyin · 600",
      text: pinyinSpecimenText,
    },
    {
      id: "display-metadata-650",
      fontRole: "display",
      contentRole: "metadata",
      weight: "650",
      style: "normal",
      language: "en",
      fallbackOnly: null,
      label: "Display · metadata · 650",
      text: "0123456789 1IlO0 “ ” ‘ ’ ' — – - … · / & @ % ( ) [ ] 《 》 〈 〉 ： ；",
    },
    {
      id: "story-400",
      fontRole: "story",
      contentRole: "story",
      weight: "400",
      style: "normal",
      language: "en",
      fallbackOnly: null,
      label: "Story · reading text · 400",
      text: "A river of names becomes a map when every source stays visible.",
    },
    {
      id: "story-600",
      fontRole: "story",
      contentRole: "story",
      weight: "600",
      style: "normal",
      language: "en",
      fallbackOnly: null,
      label: "Story · emphasis · 600",
      text: "Semibold story emphasis keeps the reading path clear.",
    },
    {
      id: "story-italic-400",
      fontRole: "story",
      contentRole: "story",
      weight: "400",
      style: "italic",
      language: "en",
      fallbackOnly: null,
      label: "Story · quotation · 400 italic",
      text: "Italic distinguishes a quoted voice without manufacturing emphasis.",
    },
    {
      id: "body-400",
      fontRole: "story",
      contentRole: "body",
      weight: "400",
      style: "normal",
      language: "en",
      fallbackOnly: null,
      label: "Body use · story role · 400",
      text: "Body copy uses the story role at a measured width for sustained reading.",
    },
    ...cjkSamples,
  ];
}

function normalizeCssSelector(selector) {
  return selector
    .trim()
    .replace(/\s+/gu, " ")
    .replace(/\s*([>+~])\s*/gu, "$1")
    .replace(/=(["'])([^"']+)\1/gu, "=$2");
}

function splitCssSelectorList(prelude) {
  const selectors = [];
  let segmentStart = 0;
  let quote = null;
  let parentheses = 0;
  let brackets = 0;
  for (let index = 0; index < prelude.length; index += 1) {
    const character = prelude[index];
    if (quote !== null) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "\\") {
      index += 1;
      continue;
    }
    if (character === "(") parentheses += 1;
    else if (character === ")") {
      if (parentheses === 0) {
        throw new Error("Type specimen CSS contains an unmatched parenthesis.");
      }
      parentheses -= 1;
    } else if (character === "[") brackets += 1;
    else if (character === "]") {
      if (brackets === 0) {
        throw new Error("Type specimen CSS contains an unmatched bracket.");
      }
      brackets -= 1;
    } else if (character === "," && parentheses === 0 && brackets === 0) {
      const selector = prelude.slice(segmentStart, index).trim();
      if (selector === "") {
        throw new Error("Type specimen CSS contains an empty selector.");
      }
      selectors.push(selector);
      segmentStart = index + 1;
    }
  }
  const selector = prelude.slice(segmentStart).trim();
  if (
    quote !== null ||
    parentheses !== 0 ||
    brackets !== 0 ||
    selector === ""
  ) {
    throw new Error("Type specimen CSS contains an invalid selector list.");
  }
  selectors.push(selector);
  return selectors;
}

function normalizeCssValue(value) {
  let normalized = "";
  let quote = null;
  let pendingSpace = false;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (quote !== null) {
      normalized += character;
      if (character === "\\" && index + 1 < value.length) {
        index += 1;
        normalized += value[index];
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }
    if (character === '"' || character === "'") {
      if (
        pendingSpace &&
        normalized.length > 0 &&
        !"([{: ,/".includes(normalized.at(-1))
      ) {
        normalized += " ";
      }
      pendingSpace = false;
      quote = character;
      normalized += character;
      continue;
    }
    if (/\s/u.test(character)) {
      pendingSpace = true;
      continue;
    }
    if (pendingSpace && normalized.length > 0) {
      const previous = normalized.at(-1);
      if (
        previous !== undefined &&
        !"([{: ,/".includes(previous) &&
        !")]}:;,!/".includes(character)
      ) {
        normalized += " ";
      }
    }
    pendingSpace = false;
    normalized += character;
  }
  return normalized;
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
        throw new Error("Type specimen CSS contains an unclosed comment.");
      }
      stripped += " ";
      index = commentEnd + 1;
      continue;
    }
    if (css.startsWith("<!--", index) || css.startsWith("-->", index)) {
      throw new Error("Type specimen CSS must not contain CDO or CDC tokens.");
    }
    stripped += character;
  }
  if (quote !== null) {
    throw new Error("Type specimen CSS contains an unclosed string.");
  }
  return stripped;
}

function hasImportant(value) {
  return /!\s*important$/iu.test(value);
}

function findCssBlockEnd(css, blockStart) {
  let depth = 1;
  let quote = null;
  for (let index = blockStart + 1; index < css.length; index += 1) {
    const character = css[index];
    if (quote !== null) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") quote = character;
    else if (character === "{") depth += 1;
    else if (character === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  throw new Error("Type specimen CSS contains an unclosed block.");
}

function parseCssDeclarations(source) {
  const declarations = [];
  for (const declaration of source.split(";")) {
    const colonIndex = declaration.indexOf(":");
    if (colonIndex < 1) continue;
    declarations.push({
      property: declaration.slice(0, colonIndex).trim().toLowerCase(),
      value: normalizeCssValue(declaration.slice(colonIndex + 1)),
    });
  }
  return declarations;
}

function collectCssRuleRecords(css, atRuleDepth, records) {
  let segmentStart = 0;
  let quote = null;
  let parentheses = 0;
  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];
    if (quote !== null) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "(") parentheses += 1;
    else if (character === ")") {
      if (parentheses === 0) {
        throw new Error("Type specimen CSS contains an unmatched parenthesis.");
      }
      parentheses -= 1;
    } else if (parentheses === 0 && character === ";") {
      if (css.slice(segmentStart, index).trim() !== "") {
        throw new Error("Type specimen CSS contains an unsupported statement.");
      }
      segmentStart = index + 1;
    } else if (parentheses === 0 && character === "{") {
      const prelude = css.slice(segmentStart, index).trim();
      const blockEnd = findCssBlockEnd(css, index);
      const body = css.slice(index + 1, blockEnd);
      if (prelude.startsWith("@")) {
        const normalizedPrelude = prelude.toLowerCase().replace(/\s+/gu, " ");
        if (/^@(?:-webkit-)?keyframes(?:\s|$)/u.test(normalizedPrelude)) {
          throw new Error("Type specimen CSS must not declare keyframes.");
        }
        if (normalizedPrelude === "@font-face") {
          records.push({
            selector: "@font-face",
            declarations: parseCssDeclarations(body),
            atRuleDepth,
            atRule: "font-face",
            registeredProperty: null,
          });
        } else if (normalizedPrelude.startsWith("@property ")) {
          records.push({
            selector: normalizedPrelude,
            declarations: parseCssDeclarations(body),
            atRuleDepth,
            atRule: "property",
            registeredProperty: normalizedPrelude.slice("@property ".length),
          });
        } else {
          collectCssRuleRecords(body, atRuleDepth + 1, records);
        }
      } else {
        if (body.includes("{")) {
          throw new Error(
            "Type specimen CSS policy does not allow nested style rules.",
          );
        }
        const declarations = parseCssDeclarations(body);
        for (const selector of splitCssSelectorList(prelude)) {
          records.push({
            selector: normalizeCssSelector(selector),
            declarations,
            atRuleDepth,
            atRule: null,
            registeredProperty: null,
          });
        }
      }
      index = blockEnd;
      segmentStart = blockEnd + 1;
    }
  }
  if (css.slice(segmentStart).trim() !== "") {
    throw new Error("Type specimen CSS contains an unparsed token.");
  }
}

function cssRuleRecords(css) {
  const records = [];
  const withoutComments = stripCssComments(css);
  collectCssRuleRecords(withoutComments, 0, records);
  return records;
}

const requiredSpecimenCss = [
  [".type-specimen__sample", "font-synthesis", "none !important"],
  [".type-specimen__sample", "font-variation-settings", "normal !important"],
  [".type-specimen__mixed-inherit", "font-family", "inherit !important"],
  [".type-specimen__mixed-inherit", "font-weight", "inherit !important"],
  [".type-specimen__mixed-inherit", "font-style", "inherit !important"],
  [".type-specimen__mixed-inherit", "font-synthesis", "inherit !important"],
  [
    ".type-specimen__mixed-inherit",
    "font-variation-settings",
    "inherit !important",
  ],
  [
    '.type-specimen__sample[data-font-role="display"]',
    "font-family",
    "var(--font-display) !important",
  ],
  [
    '.type-specimen__sample[data-font-role="story"]',
    "font-family",
    "var(--font-story) !important",
  ],
  [
    '.type-specimen__sample[data-font-role="zh-hans-display"]',
    "font-family",
    "var(--font-zh-hans-display) !important",
  ],
  [
    '.type-specimen__sample[data-font-role="zh-hant-display"]',
    "font-family",
    "var(--font-zh-hant-display) !important",
  ],
  [
    '.type-specimen__sample[data-font-weight="400"]',
    "font-weight",
    "400 !important",
  ],
  [
    '.type-specimen__sample[data-font-weight="500"]',
    "font-weight",
    "500 !important",
  ],
  [
    '.type-specimen__sample[data-font-weight="560"]',
    "font-weight",
    "560 !important",
  ],
  [
    '.type-specimen__sample[data-font-weight="600"]',
    "font-weight",
    "600 !important",
  ],
  [
    '.type-specimen__sample[data-font-weight="650"]',
    "font-weight",
    "650 !important",
  ],
  [
    '.type-specimen__sample[data-font-style="normal"]',
    "font-style",
    "normal !important",
  ],
  [
    '.type-specimen__sample[data-font-style="italic"]',
    "font-style",
    "italic !important",
  ],
];

const protectedFontTokenValues = new Map([
  [
    "--font-display",
    '"Mythic Display", Inter, ui-sans-serif, system-ui, "Segoe UI", sans-serif',
  ],
  [
    "--font-story",
    '"Mythic Story", "Iowan Old Style", "Palatino Linotype", Georgia, serif',
  ],
  [
    "--font-zh-hans-display",
    '"Mythic Han Sans SC", "Noto Sans CJK SC", "PingFang SC", "Microsoft YaHei", sans-serif',
  ],
  [
    "--font-zh-hant-display",
    '"Mythic Han Sans TC", "Noto Sans CJK TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
  ],
]);
const protectedFontTokens = new Set(protectedFontTokenValues.keys());
const controlledFontProperties = new Set([
  "font-family",
  "font-weight",
  "font-style",
  "font-synthesis",
  "font-variation-settings",
]);

function isControlledFontProperty(property) {
  return (
    controlledFontProperties.has(property) ||
    property.startsWith("font-synthesis-")
  );
}

function selectorHasPseudoElement(selector) {
  return /::[a-z-]+|:(?:before|after|first-letter|first-line)(?=$|[#.:[\s>+~]|\()/iu.test(
    selector,
  );
}

function selectorExplicitlyTargetsSpecimenSample(selector) {
  const normalizedSelector = selector.toLowerCase();
  if (
    normalizedSelector.includes("type-specimen__sample") ||
    normalizedSelector.includes("type-specimen__inline-cjk") ||
    normalizedSelector.includes("type-specimen__mixed-") ||
    /\[data-(?:font-sample|font-role|content-role|font-weight|font-style|fallback-only|inline-cjk)(?:=|\])/u.test(
      normalizedSelector,
    )
  ) {
    return true;
  }
  return (
    normalizedSelector.includes(".type-specimen") &&
    /(?:^|[\s>+~])(?:p|span|\*|\[lang(?:=|\])|:(?:is|where|not|nth|first|last|only))/u.test(
      normalizedSelector,
    )
  );
}

function selectorTargetsSpecimenSample(selector) {
  return (
    selectorHasPseudoElement(selector) ||
    selectorExplicitlyTargetsSpecimenSample(selector)
  );
}

function selectorCanGenerateSpecimenContent(selector) {
  const generatedContentPseudo = selector.search(
    /:{1,2}(?:before|after)(?=$|[#.:[\s>+~]|\()/iu,
  );
  if (generatedContentPseudo < 0) return false;
  const hostSelector = selector.slice(0, generatedContentPseudo);
  return (
    selectorExplicitlyTargetsSpecimenSample(selector) ||
    /\.type-specimen(?=$|[^a-z0-9_-])/iu.test(hostSelector) ||
    /(?:^|[^a-z0-9_-])(?:html|body|main|article|section|p|span|\*)(?=$|[^a-z0-9_-])/iu.test(
      hostSelector,
    ) ||
    /\[(?:class|lang)(?:=|\])/iu.test(hostSelector)
  );
}

const allowedHiddenReviewSelectors = new Set([
  ".desktop-navigation",
  ".mobile-navigation",
  ".mobile-navigation summary::-webkit-details-marker",
]);

const allowedReviewTransforms = new Map([
  [".skip-link", new Set(["translatey(-180%)"])],
  [".skip-link:focus", new Set(["translatey(0)"])],
  [".button-link:active", new Set(["translatey(1px)"])],
  [".text-link:active", new Set(["translatey(1px)"])],
  [".realm-surface:before", new Set(["rotate(-8deg)"])],
  [".realm-surface:after", new Set(["rotate(-7deg)"])],
  [".realm-surface::before", new Set(["rotate(-8deg)"])],
  [".realm-surface::after", new Set(["rotate(-7deg)"])],
]);

function selectorMayAffectSpecimenSurface(selector) {
  const normalizedSelector = selector.toLowerCase();
  if (
    selectorExplicitlyTargetsSpecimenSample(selector) ||
    normalizedSelector.includes(".type-specimen") ||
    normalizedSelector.includes(".page-shell") ||
    normalizedSelector.includes(".section-space")
  ) {
    return true;
  }
  return /(?:^|[\s>+~])(?:html|body|main|article|section|header|div|p|span|\*|\[class(?:=|\])|\[lang(?:=|\]))(?=$|[#.:[\s>+~])/u.test(
    normalizedSelector,
  );
}

function isZeroCssLength(value) {
  return (
    /^[+-]?0(?:\.0+)?(?:[a-z]+|%)?$/u.test(value) ||
    /^calc\(\s*[+-]?0(?:\.0+)?(?:[a-z]+|%)?\s*\)$/u.test(value)
  );
}

function hasUnsafeReviewVisibility(selector, property, value) {
  const normalizedValue = value
    .replace(/!\s*important$/iu, "")
    .trim()
    .toLowerCase();
  const fullyTransparentColor =
    normalizedValue === "transparent" ||
    /^#[\da-f]{3}0$/u.test(normalizedValue) ||
    /^#[\da-f]{6}00$/u.test(normalizedValue) ||
    /\/\s*0(?:\.0+)?%?\s*\)$/u.test(normalizedValue) ||
    /,\s*0(?:\.0+)?\s*\)$/u.test(normalizedValue);
  const zeroFontSize = isZeroCssLength(normalizedValue);
  const targetsSpecimenSurface = selectorMayAffectSpecimenSurface(selector);
  const allowedTransform = allowedReviewTransforms
    .get(selector)
    ?.has(normalizedValue);
  const unsafeGeometry =
    (property === "transform" &&
      normalizedValue !== "none" &&
      allowedTransform !== true) ||
    (["scale", "translate", "rotate"].includes(property) &&
      !["none", "1", "0", "0deg", "0turn", "0rad", "0 0"].includes(
        normalizedValue,
      )) ||
    (property === "zoom" && !["1", "normal"].includes(normalizedValue)) ||
    (["clip", "clip-path"].includes(property) &&
      !["auto", "none"].includes(normalizedValue)) ||
    (targetsSpecimenSurface &&
      property === "position" &&
      ["absolute", "fixed"].includes(normalizedValue)) ||
    (targetsSpecimenSurface &&
      /^(?:inset(?:-(?:block|inline)(?:-(?:start|end))?)?|top|right|bottom|left)$/u.test(
        property,
      ) &&
      normalizedValue !== "auto" &&
      !isZeroCssLength(normalizedValue)) ||
    (targetsSpecimenSurface &&
      /^(?:width|height|max-width|max-height|inline-size|block-size|max-inline-size|max-block-size)$/u.test(
        property,
      ) &&
      isZeroCssLength(normalizedValue)) ||
    (targetsSpecimenSurface &&
      property === "overflow" &&
      /(?:^|\s)(?:hidden|clip)(?:$|\s)/u.test(normalizedValue)) ||
    (targetsSpecimenSurface &&
      property === "text-indent" &&
      !isZeroCssLength(normalizedValue)) ||
    (targetsSpecimenSurface &&
      /^(?:filter|mask|mask-image|-webkit-mask|-webkit-mask-image)$/u.test(
        property,
      ) &&
      normalizedValue !== "none");
  return (
    (property === "display" &&
      ((normalizedValue === "none" &&
        !allowedHiddenReviewSelectors.has(selector)) ||
        /\b(?:var|attr)\s*\(/u.test(normalizedValue))) ||
    (property === "visibility" && normalizedValue !== "visible") ||
    (property === "content-visibility" &&
      (normalizedValue === "hidden" ||
        /\b(?:var|attr)\s*\(/u.test(normalizedValue))) ||
    (property === "opacity" && !["1", "100%"].includes(normalizedValue)) ||
    (["color", "-webkit-text-fill-color"].includes(property) &&
      fullyTransparentColor) ||
    (property === "font-size" &&
      (zeroFontSize || /\b(?:var|attr)\s*\(/u.test(normalizedValue))) ||
    unsafeGeometry
  );
}

export function assertFontSpecimenCss(css, options = {}) {
  const allowAppliedGlobalCss = options.allowAppliedGlobalCss === true;
  const requireMappings = options.requireMappings !== false;
  const records = cssRuleRecords(css);
  const allowedDeclarations = new Map();
  for (const [rawSelector, property, rawValue] of requiredSpecimenCss) {
    const selector = normalizeCssSelector(rawSelector);
    const value = normalizeCssValue(rawValue);
    allowedDeclarations.set(`${selector}\u0000${property}`, value);
    if (requireMappings) {
      const actualValues = records
        .filter(
          (record) => record.selector === selector && record.atRuleDepth === 0,
        )
        .flatMap((record) =>
          record.declarations
            .filter((declaration) => declaration.property === property)
            .map((declaration) => declaration.value),
        );
      if (actualValues.length !== 1 || actualValues[0] !== value) {
        throw new Error(
          `Type specimen CSS must map ${rawSelector} ${property} to ${rawValue}.`,
        );
      }
    }
  }

  for (const record of records) {
    if (record.atRule === "font-face") {
      if (!allowAppliedGlobalCss) {
        throw new Error("Type specimen CSS must not declare a font face.");
      }
      continue;
    }
    if (
      record.atRule === "property" &&
      protectedFontTokens.has(record.registeredProperty)
    ) {
      throw new Error(
        `Type specimen CSS must not register ${record.registeredProperty}.`,
      );
    }
    for (const declaration of record.declarations) {
      if (declaration.property === "font") {
        throw new Error("Type specimen CSS must not use the font shorthand.");
      }
      if (declaration.property === "all") {
        throw new Error("Type specimen CSS must not reset the sample cascade.");
      }
      if (declaration.property.startsWith("font-synthesis-")) {
        throw new Error(
          `Type specimen CSS must not override ${declaration.property}.`,
        );
      }
      if (protectedFontTokens.has(declaration.property)) {
        const approvedGlobalToken =
          allowAppliedGlobalCss &&
          record.selector === ":root" &&
          record.atRuleDepth === 0 &&
          declaration.value ===
            normalizeCssValue(
              protectedFontTokenValues.get(declaration.property),
            );
        if (!approvedGlobalToken) {
          throw new Error(
            `Type specimen CSS must not redefine ${declaration.property}.`,
          );
        }
      }
      const allowedValue = allowedDeclarations.get(
        `${record.selector}\u0000${declaration.property}`,
      );
      if (
        declaration.property === "content" &&
        selectorCanGenerateSpecimenContent(record.selector)
      ) {
        throw new Error(
          `Type specimen CSS must not generate untracked review text through ${record.selector}.`,
        );
      }
      if (
        hasUnsafeReviewVisibility(
          record.selector,
          declaration.property,
          declaration.value,
        )
      ) {
        throw new Error(
          `Type specimen CSS must not hide review text through ${record.selector}.`,
        );
      }
      if (declaration.property.startsWith("animation")) {
        throw new Error("Type specimen CSS must not animate review text.");
      }
      if (
        isControlledFontProperty(declaration.property) &&
        ((record.atRuleDepth > 0 &&
          selectorTargetsSpecimenSample(record.selector)) ||
          (hasImportant(declaration.value) &&
            allowedValue !== declaration.value) ||
          (selectorTargetsSpecimenSample(record.selector) &&
            allowedValue !== declaration.value))
      ) {
        throw new Error(
          `Type specimen CSS contains an unapproved sample ${declaration.property} override: ${record.selector}.`,
        );
      }
    }
  }
}

export function assertFontSpecimenGlobalCss(css) {
  const records = cssRuleRecords(css);
  for (const record of records) {
    if (
      record.atRule === "property" &&
      protectedFontTokens.has(record.registeredProperty)
    ) {
      throw new Error(
        `Review CSS must not register ${record.registeredProperty}.`,
      );
    }
  }
  for (const token of protectedFontTokens) {
    const declarations = records.flatMap((record) =>
      record.declarations
        .filter((declaration) => declaration.property === token)
        .map((declaration) => ({
          ...declaration,
          selector: record.selector,
          atRuleDepth: record.atRuleDepth,
        })),
    );
    if (
      declarations.length !== 1 ||
      declarations[0]?.selector !== ":root" ||
      declarations[0]?.atRuleDepth !== 0 ||
      declarations[0]?.value !==
        normalizeCssValue(protectedFontTokenValues.get(token))
    ) {
      throw new Error(
        `Review CSS must define ${token} exactly once on :root with its approved stack.`,
      );
    }
  }

  for (const record of records) {
    for (const declaration of record.declarations) {
      if (declaration.property === "font") {
        throw new Error("Review CSS must not use the font shorthand.");
      }
      if (
        (isControlledFontProperty(declaration.property) ||
          declaration.property === "all") &&
        hasImportant(declaration.value)
      ) {
        throw new Error(
          `Review CSS contains an important ${declaration.property} override: ${record.selector}.`,
        );
      }
    }
  }
}

function readExactCssDeclaration(record, property, label) {
  const values = record.declarations
    .filter((declaration) => declaration.property === property)
    .map((declaration) => declaration.value);
  if (values.length !== 1) {
    throw new Error(`${label} must declare ${property} exactly once.`);
  }
  return values[0];
}

function unquoteNormalizedCssString(value) {
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

export function assertFontSpecimenFontFaces(
  css,
  fontInventory,
  resolveAssetId,
  label,
) {
  const expectedRecords = new Map(
    fontInventory.families.flatMap((family) =>
      family.files.map((file) => [file.assetId, { family, file }]),
    ),
  );
  const faces = cssRuleRecords(css).filter(
    (record) => record.atRule === "font-face",
  );
  if (faces.length !== expectedRecords.size) {
    throw new Error(
      `${label} must contain exactly ${expectedRecords.size} approved font faces.`,
    );
  }

  const seen = new Set();
  for (const face of faces) {
    if (face.atRuleDepth !== 0) {
      throw new Error(`${label} contains a conditional font face.`);
    }
    const source = readExactCssDeclaration(face, "src", label);
    const sourceMatch = source.match(
      /^url\((["']?)([^"')]+)\1\)\s*format\((?:["']?woff2["']?)\)$/iu,
    );
    const assetId =
      sourceMatch?.[2] === undefined ? null : resolveAssetId(sourceMatch[2]);
    const record = assetId === null ? undefined : expectedRecords.get(assetId);
    if (record === undefined || seen.has(record.file.assetId)) {
      throw new Error(`${label} has an untracked or duplicate font face.`);
    }
    const expectedProperties = new Set([
      "font-family",
      "src",
      "font-style",
      "font-weight",
      "font-display",
      ...(record.family.characterSetLocale === undefined
        ? []
        : ["unicode-range"]),
    ]);
    if (
      face.declarations.length !== expectedProperties.size ||
      face.declarations.some(
        ({ property }) => !expectedProperties.has(property),
      )
    ) {
      throw new Error(
        `${label} ${record.file.assetId} has an unapproved font descriptor.`,
      );
    }
    const family = unquoteNormalizedCssString(
      readExactCssDeclaration(face, "font-family", label),
    );
    if (
      family !== normalizeCssValue(record.family.cssAlias) ||
      readExactCssDeclaration(face, "font-style", label) !==
        normalizeCssValue(record.file.style) ||
      readExactCssDeclaration(face, "font-weight", label) !==
        normalizeCssValue(record.file.weight) ||
      readExactCssDeclaration(face, "font-display", label) !== "swap"
    ) {
      throw new Error(
        `${label} ${record.file.assetId} family, style, weight, or display drifted.`,
      );
    }
    seen.add(record.file.assetId);
  }

  if ([...expectedRecords.keys()].some((assetId) => !seen.has(assetId))) {
    throw new Error(`${label} does not contain every approved font face.`);
  }
}

function assertSpecimenHead(document, records) {
  const heads = descendants(document, (node) => node.tagName === "head");
  if (heads.length !== 1) {
    throw new Error("The type specimen must contain one document head.");
  }
  const headElements = descendants(heads[0], () => true);
  const robots = records
    .map(({ node }) => node)
    .filter(
      (node) =>
        node.tagName === "meta" &&
        readAttribute(node, "name")?.toLowerCase() === "robots",
    );
  if (
    robots.length !== 1 ||
    !headElements.includes(robots[0]) ||
    readAttribute(robots[0], "content") !== "noindex, nofollow"
  ) {
    throw new Error(
      "The type specimen must contain one exact noindex, nofollow policy.",
    );
  }

  for (const { node } of records) {
    const rel = new Set(
      (readAttribute(node, "rel") ?? "").toLowerCase().split(/\s+/u),
    );
    const name = (readAttribute(node, "name") ?? "").toLowerCase();
    const property = (readAttribute(node, "property") ?? "").toLowerCase();
    const httpEquiv = (readAttribute(node, "http-equiv") ?? "").toLowerCase();
    if (
      node.tagName === "script" ||
      (node.tagName === "link" && rel.has("canonical")) ||
      (node.tagName === "link" && rel.has("alternate")) ||
      (node.tagName === "meta" && property.startsWith("og:")) ||
      (node.tagName === "meta" && name.startsWith("twitter:")) ||
      (node.tagName === "meta" &&
        httpEquiv.startsWith("content-security-policy")) ||
      (node.tagName === "meta" &&
        name !== "robots" &&
        /(?:bot|spider|slurp)/u.test(name))
    ) {
      throw new Error(
        "The type specimen contains forbidden release metadata or client JavaScript.",
      );
    }
  }

  const specimenCss = headElements
    .filter((node) => node.tagName === "style")
    .map((node) => textContent(node))
    .join("\n");
  const styles = records
    .map(({ node }) => node)
    .filter((node) => node.tagName === "style");
  const stylesheetLinks = records
    .map(({ node }) => node)
    .filter((node) => {
      const rel = new Set(
        (readAttribute(node, "rel") ?? "").toLowerCase().split(/\s+/u),
      );
      return node.tagName === "link" && rel.has("stylesheet");
    });
  if (
    stylesheetLinks.length < 1 ||
    styles.some(
      (style) =>
        !headElements.includes(style) || (style.attrs ?? []).length !== 0,
    ) ||
    stylesheetLinks.some(
      (link) =>
        !headElements.includes(link) ||
        readAttribute(link, "href") === null ||
        [
          ...new Set(
            (readAttribute(link, "rel") ?? "")
              .trim()
              .toLowerCase()
              .split(/\s+/u)
              .filter((token) => token !== ""),
          ),
        ].join(" ") !== "stylesheet" ||
        JSON.stringify(
          (link.attrs ?? []).map(({ name }) => name.toLowerCase()).sort(),
        ) !== JSON.stringify(["href", "rel"]),
    )
  ) {
    throw new Error(
      "The type specimen must keep unconditional styles in head.",
    );
  }
  assertFontSpecimenCss(specimenCss);
}

function assertScopedHanText(
  node,
  activeSampleId = null,
  inheritedLanguage = null,
) {
  const nextSampleId =
    typeof node.tagName === "string"
      ? (readAttribute(node, "data-font-sample") ?? activeSampleId)
      : activeSampleId;
  const nextLanguage =
    typeof node.tagName === "string"
      ? (readAttribute(node, "lang") ?? inheritedLanguage)
      : inheritedLanguage;
  if (node.nodeName === "#text" && /\p{Script=Han}/u.test(node.value)) {
    if (nextSampleId === null) {
      throw new Error(
        "Visible Han text on the type specimen must stay inside a declared font sample.",
      );
    }
    if (!["zh-Hans", "zh-Hant"].includes(nextLanguage)) {
      throw new Error(
        `${nextSampleId} contains Han text without an exact Hans or Hant language boundary.`,
      );
    }
  }
  for (const child of node.childNodes ?? []) {
    assertScopedHanText(child, nextSampleId, nextLanguage);
  }
}

export function assertFontSpecimenHtml(html, policy) {
  const document = parseHtml(html, { scriptingEnabled: false });
  const records = elementRecords(document);
  assertSpecimenHead(document, records);
  assertScopedHanText(document);

  if (records.some(({ node }) => readAttribute(node, "style") !== null)) {
    throw new Error("The type specimen must not use inline style attributes.");
  }

  const roots = records
    .map(({ node }) => node)
    .filter(
      (node) =>
        node.tagName === "article" &&
        readAttribute(node, "data-review-utility") === "type-specimen",
    );
  if (
    roots.length !== 1 ||
    readAttribute(roots[0], "data-review-only") !== "true" ||
    !hasExactElementContract(
      roots[0],
      "article",
      ["type-specimen", "page-shell"],
      ["class", "data-review-utility", "data-review-only"],
    )
  ) {
    throw new Error("The type specimen review-only root is missing or stale.");
  }
  const reviewMain = roots[0].parentNode;
  if (
    reviewMain === null ||
    reviewMain === undefined ||
    !hasExactElementContract(reviewMain, "main", [], ["id", "tabindex"]) ||
    readAttribute(reviewMain, "id") !== "main-content" ||
    readAttribute(reviewMain, "tabindex") !== "-1" ||
    reviewMain.parentNode?.tagName !== "body"
  ) {
    throw new Error(
      "The type specimen root must remain a direct child of the review main element.",
    );
  }
  const forbiddenMediaElements = new Set([
    "audio",
    "canvas",
    "embed",
    "img",
    "object",
    "picture",
    "source",
    "svg",
    "track",
    "video",
  ]);
  if (
    records.some(({ node }) => {
      const tagName = node.tagName.toLowerCase();
      const rel = new Set(
        (readAttribute(node, "rel") ?? "").toLowerCase().split(/\s+/u),
      );
      return (
        forbiddenMediaElements.has(tagName) ||
        (tagName === "input" &&
          readAttribute(node, "type")?.toLowerCase() === "image") ||
        ["poster", "background", "srcset", "imagesrcset"].some(
          (attribute) => readAttribute(node, attribute) !== null,
        ) ||
        (tagName === "link" &&
          (readAttribute(node, "as")?.toLowerCase() === "image" ||
            ["icon", "apple-touch-icon", "mask-icon"].some((token) =>
              rel.has(token),
            )))
      );
    })
  ) {
    throw new Error(
      "The type specimen must not add an image or media dependency.",
    );
  }

  const expectedSamples = createFontSpecimenSampleContract(policy);
  const sampleRecords = records.filter(
    ({ node }) => readAttribute(node, "data-font-sample") !== null,
  );
  const rootDescendants = new Set(descendants(roots[0], () => true));
  if (sampleRecords.some(({ node }) => !rootDescendants.has(node))) {
    throw new Error(
      "Every type specimen sample must stay inside its review root.",
    );
  }
  if (
    [...rootDescendants].some((node) => {
      const classes = classNames(node);
      return (
        classes.has("mobile-navigation") ||
        classes.has("desktop-navigation") ||
        classes.has("skip-link") ||
        classes.has("button-link") ||
        classes.has("text-link") ||
        classes.has("realm-surface")
      );
    })
  ) {
    throw new Error(
      "The type specimen root must not inherit navigation hiding classes.",
    );
  }
  assertExactList(
    sampleRecords.map(({ node }) => readAttribute(node, "data-font-sample")),
    expectedSamples.map(({ id }) => id),
    "Type specimen sample order",
  );
  const byId = new Map();
  for (const record of sampleRecords) {
    const id = readAttribute(record.node, "data-font-sample");
    if (id === null || byId.has(id)) {
      throw new Error(`Duplicate or missing type specimen sample id: ${id}.`);
    }
    byId.set(id, record);
  }
  assertExactList(
    [...byId.keys()].sort(),
    expectedSamples.map(({ id }) => id).sort(),
    "Type specimen sample inventory",
  );

  const expectedInlineCjk = fontSpecimenPinyinRows
    .flat()
    .filter(({ language }) => language !== null);
  const inlineCjkRecords = records.filter(
    ({ node }) => readAttribute(node, "data-inline-cjk") !== null,
  );
  assertExactList(
    inlineCjkRecords.map(({ node }) => normalizedText(textContent(node))),
    expectedInlineCjk.map(({ text }) => text),
    "Type specimen inline CJK inventory",
  );
  for (const [index, record] of inlineCjkRecords.entries()) {
    const expected = expectedInlineCjk[index];
    if (
      expected === undefined ||
      readAttribute(record.node, "data-inline-cjk") !== "true" ||
      readAttribute(record.node, "data-font-role") !== "zh-hans-display" ||
      readAttribute(record.node, "data-font-weight") !== "600" ||
      readAttribute(record.node, "data-font-style") !== "normal" ||
      readAttribute(record.node, "lang") !== expected.language ||
      record.language !== expected.language ||
      !hasExactElementContract(
        record.node,
        "span",
        ["type-specimen__sample", "type-specimen__inline-cjk"],
        [
          "class",
          "data-inline-cjk",
          "data-font-role",
          "data-font-weight",
          "data-font-style",
          "lang",
        ],
      ) ||
      isHiddenFromReview(record.node)
    ) {
      throw new Error("The mixed pinyin row has a stale inline CJK contract.");
    }
  }

  const mixedWrappers = records.filter(({ node }) => {
    const classes = classNames(node);
    return (
      classes.has("type-specimen__mixed-rows") ||
      classes.has("type-specimen__mixed-row")
    );
  });
  if (
    mixedWrappers.length !== fontSpecimenPinyinRows.length + 1 ||
    mixedWrappers.some(({ node, language }) => {
      const classes = classNames(node);
      const structuralClass = classes.has("type-specimen__mixed-rows")
        ? "type-specimen__mixed-rows"
        : "type-specimen__mixed-row";
      return (
        !hasExactElementContract(
          node,
          "span",
          [structuralClass, "type-specimen__mixed-inherit"],
          ["class"],
        ) ||
        language !== "zh-Latn-pinyin" ||
        isHiddenFromReview(node)
      );
    })
  ) {
    throw new Error(
      "The mixed pinyin wrappers must preserve the inherited font contract.",
    );
  }

  const pinyinRecord = byId.get("display-pinyin-600");
  if (pinyinRecord === undefined) {
    throw new Error("The mixed pinyin sample is missing.");
  }
  const pinyinChildren = childElements(pinyinRecord.node);
  const mixedRowsNode = pinyinChildren[0];
  if (
    pinyinChildren.length !== 1 ||
    mixedRowsNode === undefined ||
    !classNames(mixedRowsNode).has("type-specimen__mixed-rows")
  ) {
    throw new Error("The mixed pinyin sample has an unapproved child element.");
  }
  const rowNodes = childElements(mixedRowsNode);
  if (
    rowNodes.length !== fontSpecimenPinyinRows.length ||
    rowNodes.some((node) => !classNames(node).has("type-specimen__mixed-row"))
  ) {
    throw new Error("The mixed pinyin sample has a stale row structure.");
  }
  const allowedPinyinElements = new Set([mixedRowsNode, ...rowNodes]);
  for (const [index, rowNode] of rowNodes.entries()) {
    const expectedRow = fontSpecimenPinyinRows[index];
    const rowChildren = rowNode.childNodes ?? [];
    if (
      expectedRow === undefined ||
      rowChildren.length !== expectedRow.length ||
      rowChildren.some((child, segmentIndex) => {
        const expectedSegment = expectedRow[segmentIndex];
        if (expectedSegment === undefined) return true;
        if (expectedSegment.language === null) {
          return (
            child.nodeName !== "#text" ||
            child.value.normalize("NFC") !== expectedSegment.text
          );
        }
        return (
          typeof child.tagName !== "string" ||
          readAttribute(child, "lang") !== expectedSegment.language ||
          textContent(child).normalize("NFC") !== expectedSegment.text
        );
      })
    ) {
      throw new Error("The mixed pinyin row segment contract drifted.");
    }
    const inlineNodes = childElements(rowNode);
    const expectedInlineCount = fontSpecimenPinyinRows[index].filter(
      ({ language }) => language !== null,
    ).length;
    if (
      inlineNodes.length !== expectedInlineCount ||
      inlineNodes.some(
        (node) =>
          readAttribute(node, "data-inline-cjk") !== "true" ||
          childElements(node).length > 0,
      )
    ) {
      throw new Error("The mixed pinyin row has unapproved child markup.");
    }
    for (const inlineNode of inlineNodes) {
      allowedPinyinElements.add(inlineNode);
    }
  }
  if (
    descendantElements(pinyinRecord.node).some(
      (node) => !allowedPinyinElements.has(node),
    )
  ) {
    throw new Error(
      "The mixed pinyin sample has unapproved descendant markup.",
    );
  }

  for (const expected of expectedSamples) {
    const record = byId.get(expected.id);
    if (
      expected.id !== "display-pinyin-600" &&
      record !== undefined &&
      descendantElements(record.node).length > 0
    ) {
      throw new Error(`${expected.id} must contain text only.`);
    }
  }

  for (const expected of expectedSamples) {
    const record = byId.get(expected.id);
    if (record === undefined) {
      throw new Error(`Missing type specimen sample: ${expected.id}.`);
    }
    const expectedClasses = ["type-specimen__sample"];
    if (expected.contentRole === "required") {
      expectedClasses.push("type-specimen__sample--cjk");
    } else if (expected.contentRole === "fallback") {
      expectedClasses.push("type-specimen__sample--fallback");
    }
    const expectedAttributes = [
      "class",
      "data-font-sample",
      "data-font-role",
      "data-content-role",
      "data-font-weight",
      "data-font-style",
      "lang",
      ...(expected.fallbackOnly === null ? [] : ["data-fallback-only"]),
    ];
    if (
      !hasExactElementContract(
        record.node,
        "p",
        expectedClasses,
        expectedAttributes,
      )
    ) {
      throw new Error(`${expected.id} has a stale element contract.`);
    }
    const parent = record.node.parentNode;
    const parentClasses =
      expected.contentRole === "fallback"
        ? ["type-specimen__fallback"]
        : expected.contentRole === "required"
          ? ["type-specimen__card", "type-specimen__card--cjk"]
          : ["type-specimen__card"];
    const parentTag = expected.contentRole === "fallback" ? "div" : "article";
    if (
      parent === null ||
      parent === undefined ||
      !hasExactElementContract(parent, parentTag, parentClasses, ["class"])
    ) {
      throw new Error(`${expected.id} has a stale review card contract.`);
    }
    const siblings = childElements(parent);
    const sampleIndex = siblings.indexOf(record.node);
    const label = siblings[sampleIndex - 1];
    if (
      sampleIndex < 1 ||
      label === undefined ||
      !hasExactElementContract(
        label,
        "p",
        ["type-specimen__label"],
        ["class"],
      ) ||
      normalizedText(textContent(label)) !== expected.label
    ) {
      throw new Error(`${expected.id} has a stale visible label contract.`);
    }
    if (expected.contentRole === "fallback") {
      const requiredId = expected.id.replace("-fallback-", "-required-");
      const requiredRecord = byId.get(requiredId);
      const card = parent.parentNode;
      const cardChildren =
        card === null || card === undefined ? [] : childElements(card);
      if (
        siblings.length !== 2 ||
        sampleIndex !== 1 ||
        card === null ||
        card === undefined ||
        !hasExactElementContract(
          card,
          "article",
          ["type-specimen__card", "type-specimen__card--cjk"],
          ["class"],
        ) ||
        requiredRecord === undefined ||
        requiredRecord.node.parentNode !== card ||
        cardChildren.length !== 3 ||
        cardChildren[1] !== requiredRecord.node ||
        cardChildren[2] !== parent
      ) {
        throw new Error(
          `${expected.id} must stay paired with its required sample card.`,
        );
      }
    } else if (
      sampleIndex !== 1 ||
      siblings.length !== (expected.contentRole === "required" ? 3 : 2)
    ) {
      throw new Error(`${expected.id} has a stale review card structure.`);
    }
    const card =
      expected.contentRole === "fallback" ? parent.parentNode : parent;
    const grid = card?.parentNode;
    const expectedGridClass =
      expected.contentRole === "required" || expected.contentRole === "fallback"
        ? "type-specimen__cjk-grid"
        : "type-specimen__grid";
    if (
      card === null ||
      card === undefined ||
      grid === null ||
      grid === undefined ||
      !hasExactElementContract(grid, "div", [expectedGridClass], ["class"])
    ) {
      throw new Error(`${expected.id} must stay in its visible specimen grid.`);
    }
    const actual = {
      fontRole: readAttribute(record.node, "data-font-role"),
      contentRole: readAttribute(record.node, "data-content-role"),
      weight: readAttribute(record.node, "data-font-weight"),
      style: readAttribute(record.node, "data-font-style"),
      language: readAttribute(record.node, "lang"),
      effectiveLanguage: record.language,
      fallbackOnly: readAttribute(record.node, "data-fallback-only"),
      text: normalizedText(textContent(record.node)),
    };
    for (const field of [
      "fontRole",
      "contentRole",
      "weight",
      "style",
      "language",
      "fallbackOnly",
      "text",
    ]) {
      if (actual[field] !== expected[field]) {
        throw new Error(
          `${expected.id} ${field} drifted; expected ${String(expected[field])}, got ${String(actual[field])}.`,
        );
      }
    }
    if (actual.effectiveLanguage !== expected.language) {
      throw new Error(`${expected.id} does not inherit its exact language.`);
    }
    if (isHiddenFromReview(record.node)) {
      throw new Error(`${expected.id} must remain visible to reviewers.`);
    }
  }
}
