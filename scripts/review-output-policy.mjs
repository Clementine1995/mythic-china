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

function directElementChildren(node) {
  return (node.childNodes ?? []).filter(
    (child) => typeof child.tagName === "string",
  );
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

export function indexReviewRelationshipContracts(contracts) {
  const collectionIds = new Set();
  const collectionHrefs = new Set();
  const collectionOutputPaths = new Set();
  const collectionIdsByOutputPath = new Map();
  const entryIds = new Set();
  const entryHrefs = new Set();
  const entryOutputPaths = new Set();
  const entryIdsByOutputPath = new Map();

  function registerUnique(seen, value, label) {
    if (typeof value !== "string" || value === "" || seen.has(value)) {
      throw new Error(
        `Review relationship contracts require a unique ${label}.`,
      );
    }
    seen.add(value);
  }

  for (const contract of contracts) {
    registerUnique(collectionIds, contract.collectionId, "Collection ID");
    registerUnique(collectionHrefs, contract.href, "Collection href");
    registerUnique(
      collectionOutputPaths,
      contract.outputPath,
      "Collection output path",
    );
    if (!Array.isArray(contract.entries) || contract.entries.length === 0) {
      throw new Error(
        `Review Collection ${contract.collectionId} requires at least one Entry contract.`,
      );
    }
    collectionIdsByOutputPath.set(contract.outputPath, contract.collectionId);

    for (const entry of contract.entries) {
      registerUnique(entryIds, entry.entryId, "Entry ID");
      registerUnique(entryHrefs, entry.href, "Entry href");
      registerUnique(entryOutputPaths, entry.outputPath, "Entry output path");
      entryIdsByOutputPath.set(entry.outputPath, entry.entryId);
    }
  }

  return { collectionIdsByOutputPath, entryIdsByOutputPath };
}

function listHasExactLinks(elements, list, expectedHrefs) {
  if (list === undefined) return false;
  const items = directElementChildren(list);
  const anchors = descendantsOf(elements, list).filter(
    (node) => node.tagName === "a",
  );
  return (
    items.length === expectedHrefs.length &&
    items.every(
      (item) =>
        item.tagName === "li" &&
        descendantsOf(elements, item).filter((node) => node.tagName === "a")
          .length === 1,
    ) &&
    JSON.stringify(
      anchors.map((node) => readElementAttribute(node, "href")),
    ) === JSON.stringify(expectedHrefs)
  );
}

export function assertReviewPublishedIndex(html, relativePath, expectedHrefs) {
  const { elements } = parseReviewHtml(html);
  const sections = elements.filter(
    (node) =>
      node.tagName === "section" && classNames(node).has("index-results"),
  );
  const section = sections[0];
  const lists = elements.filter((node) =>
    classNames(node).has("editorial-index"),
  );
  const list = lists[0];
  if (
    sections.length !== 1 ||
    section === undefined ||
    lists.length !== 1 ||
    list === undefined ||
    list.tagName !== "ol" ||
    !isDescendantOf(list, section) ||
    !listHasExactLinks(elements, list, expectedHrefs) ||
    descendantsOf(elements, section).filter((node) => node.tagName === "a")
      .length !== expectedHrefs.length ||
    elements.some(
      (node) =>
        classNames(node).has("honest-empty-state") ||
        readElementAttribute(node, "data-review-preview") !== null ||
        readElementAttribute(node, "data-review-candidate") !== null,
    ) ||
    html.includes("Not published") ||
    html.includes("Local review preview")
  ) {
    throw new Error(
      `${relativePath} must render one published index with exact hrefs ${JSON.stringify(expectedHrefs)} and no unpublished preview.`,
    );
  }
}

export function assertReviewEntryRelated(html, relativePath, expectedHref) {
  const { elements } = parseReviewHtml(html);
  const navs = elements.filter(
    (node) =>
      node.tagName === "nav" &&
      readElementAttribute(node, "aria-labelledby") === "related-heading",
  );
  const nav = navs[0];
  const headings = elements.filter(
    (node) => readElementAttribute(node, "id") === "related-heading",
  );
  const heading = headings[0];
  // Collection membership uses the same list class; scope this check to Related.
  const lists =
    nav === undefined
      ? []
      : descendantsOf(elements, nav).filter((node) =>
          classNames(node).has("related-entries"),
        );
  const list = lists[0];
  if (
    navs.length !== 1 ||
    nav === undefined ||
    headings.length !== 1 ||
    heading === undefined ||
    heading.tagName !== "h2" ||
    !isDescendantOf(heading, nav) ||
    lists.length !== 1 ||
    list === undefined ||
    list.tagName !== "ul" ||
    !isDescendantOf(list, nav) ||
    !listHasExactLinks(elements, list, [expectedHref]) ||
    descendantsOf(elements, nav).filter((node) => node.tagName === "a")
      .length !== 1
  ) {
    throw new Error(
      `${relativePath} must render one named Related navigation with exact href ${JSON.stringify(expectedHref)}.`,
    );
  }
}

export function assertReviewCollectionReadingPath(
  html,
  relativePath,
  expectedCollectionId,
  expectedEntryHrefs,
) {
  const { elements } = parseReviewHtml(html);
  const collectionPages = elements.filter(
    (node) =>
      node.tagName === "article" && classNames(node).has("collection-page"),
  );
  const collectionPage = collectionPages[0];
  const paths = elements.filter(
    (node) => node.tagName === "section" && classNames(node).has("guided-path"),
  );
  const path = paths[0];
  const headings = elements.filter(
    (node) => readElementAttribute(node, "id") === "guided-path-heading",
  );
  const heading = headings[0];
  const pathElements = path === undefined ? [] : descendantsOf(elements, path);
  const pathHeadings = pathElements.filter((node) => node.tagName === "h2");
  const orderedLists = pathElements.filter((node) => node.tagName === "ol");
  const orderedList = orderedLists[0];
  const pathAnchors = pathElements.filter((node) => node.tagName === "a");
  const orderedListAnchors =
    orderedList === undefined
      ? []
      : descendantsOf(elements, orderedList).filter(
          (node) => node.tagName === "a",
        );
  const orderedListChildren =
    orderedList === undefined ? [] : directElementChildren(orderedList);
  const orderedListItems = orderedListChildren.filter(
    (node) => node.tagName === "li",
  );
  const actualEntryHrefs = pathAnchors.map((node) =>
    readElementAttribute(node, "href"),
  );

  if (
    collectionPages.length !== 1 ||
    collectionPage === undefined ||
    readElementAttribute(collectionPage, "data-realm") !==
      expectedCollectionId ||
    paths.length !== 1 ||
    path === undefined ||
    !isDescendantOf(path, collectionPage) ||
    readElementAttribute(path, "aria-labelledby") !== "guided-path-heading" ||
    headings.length !== 1 ||
    heading === undefined ||
    heading.tagName !== "h2" ||
    !isDescendantOf(heading, path) ||
    pathHeadings.length !== 1 ||
    pathHeadings[0] !== heading ||
    orderedLists.length !== 1 ||
    orderedList === undefined ||
    orderedListAnchors.length !== pathAnchors.length ||
    orderedListChildren.length !== expectedEntryHrefs.length ||
    orderedListItems.length !== expectedEntryHrefs.length ||
    orderedListItems.some(
      (item) =>
        descendantsOf(elements, item).filter((node) => node.tagName === "a")
          .length !== 1,
    ) ||
    JSON.stringify(actualEntryHrefs) !== JSON.stringify(expectedEntryHrefs)
  ) {
    throw new Error(
      `${relativePath} must render Collection ${expectedCollectionId} with one guided reading path and exact hrefs ${JSON.stringify(expectedEntryHrefs)}; received ${JSON.stringify(actualEntryHrefs)}.`,
    );
  }
}

export function assertReviewEntryCollectionMembership(
  html,
  relativePath,
  expectedCollectionHref,
) {
  const { elements } = parseReviewHtml(html);
  const entryPages = elements.filter(
    (node) => node.tagName === "article" && classNames(node).has("entry-page"),
  );
  const entryPage = entryPages[0];
  const navs = elements.filter((node) => node.tagName === "nav");
  const memberships = navs.filter((node) => {
    const descendants = descendantsOf(elements, node);
    return (
      readElementAttribute(node, "aria-labelledby") === "collections-heading" ||
      descendants.some(
        (descendant) =>
          readElementAttribute(descendant, "id") === "collections-heading",
      ) ||
      descendants.some(
        (descendant) =>
          descendant.tagName === "a" &&
          readElementAttribute(descendant, "href") === expectedCollectionHref,
      )
    );
  });
  const membership = memberships[0];
  const headings = elements.filter(
    (node) => readElementAttribute(node, "id") === "collections-heading",
  );
  const heading = headings[0];
  const membershipElements =
    membership === undefined ? [] : descendantsOf(elements, membership);
  const membershipHeadings = membershipElements.filter(
    (node) => node.tagName === "h2",
  );
  const unorderedLists = membershipElements.filter(
    (node) => node.tagName === "ul",
  );
  const unorderedList = unorderedLists[0];
  const membershipAnchors = membershipElements.filter(
    (node) => node.tagName === "a",
  );
  const unorderedListAnchors =
    unorderedList === undefined
      ? []
      : descendantsOf(elements, unorderedList).filter(
          (node) => node.tagName === "a",
        );
  const unorderedListChildren =
    unorderedList === undefined ? [] : directElementChildren(unorderedList);
  const unorderedListItems = unorderedListChildren.filter(
    (node) => node.tagName === "li",
  );
  const actualCollectionHrefs = membershipAnchors.map((node) =>
    readElementAttribute(node, "href"),
  );
  const expectedCollectionHrefs = [expectedCollectionHref];

  if (
    entryPages.length !== 1 ||
    entryPage === undefined ||
    memberships.length !== 1 ||
    membership === undefined ||
    !isDescendantOf(membership, entryPage) ||
    !classNames(membership).has("entry-section") ||
    readElementAttribute(membership, "aria-labelledby") !==
      "collections-heading" ||
    headings.length !== 1 ||
    heading === undefined ||
    heading.tagName !== "h2" ||
    !isDescendantOf(heading, membership) ||
    membershipHeadings.length !== 1 ||
    membershipHeadings[0] !== heading ||
    unorderedLists.length !== 1 ||
    unorderedList === undefined ||
    unorderedListAnchors.length !== membershipAnchors.length ||
    unorderedListChildren.length !== 1 ||
    unorderedListItems.length !== 1 ||
    descendantsOf(elements, unorderedListItems[0]).filter(
      (node) => node.tagName === "a",
    ).length !== 1 ||
    JSON.stringify(actualCollectionHrefs) !==
      JSON.stringify(expectedCollectionHrefs)
  ) {
    throw new Error(
      `${relativePath} must contain one Collection membership with exact href ${JSON.stringify(expectedCollectionHref)}; received ${JSON.stringify(actualCollectionHrefs)}.`,
    );
  }
}

export function assertReviewCollectionFeaturedEntry(
  html,
  relativePath,
  expectedHref,
  expectedTitle,
) {
  const { elements } = parseReviewHtml(html);
  const sections = elements.filter((node) =>
    classNames(node).has("collection-featured"),
  );
  const section = sections[0];
  const headings = elements.filter(
    (node) => readElementAttribute(node, "id") === "featured-entry-heading",
  );
  const heading = headings[0];
  const children =
    section === undefined ? [] : descendantsOf(elements, section);
  const anchors = children.filter((node) => node.tagName === "a");
  if (
    sections.length !== 1 ||
    section?.tagName !== "section" ||
    readElementAttribute(section, "aria-labelledby") !==
      "featured-entry-heading" ||
    headings.length !== 1 ||
    heading?.tagName !== "h2" ||
    !children.includes(heading) ||
    normalizedText(heading) !== expectedTitle ||
    anchors.length !== 1 ||
    readElementAttribute(anchors[0], "href") !== expectedHref
  ) {
    throw new Error(
      `${relativePath} must render one Featured Entry titled ${JSON.stringify(expectedTitle)} with exact href ${JSON.stringify(expectedHref)}.`,
    );
  }
}

export function assertReviewEntryContentNote(html, relativePath, expectedText) {
  const { elements } = parseReviewHtml(html);
  const entryPages = elements.filter(
    (node) => node.tagName === "article" && classNames(node).has("entry-page"),
  );
  const entryReadings = elements.filter(
    (node) => node.tagName === "div" && classNames(node).has("entry-reading"),
  );
  const notes = elements.filter((node) =>
    classNames(node).has("entry-content-note"),
  );
  const noteHeadings = elements.filter(
    (node) => readElementAttribute(node, "id") === "content-note-heading",
  );
  const visiblyNamedNoteHeadings = elements.filter(
    (node) => node.tagName === "h2" && normalizedText(node) === "Content note",
  );
  const entryReadingAsides = elements.filter(
    (node) =>
      node.tagName === "aside" &&
      entryReadings.some((entryReading) => isDescendantOf(node, entryReading)),
  );

  if (expectedText === null) {
    if (
      notes.length !== 0 ||
      noteHeadings.length !== 0 ||
      visiblyNamedNoteHeadings.length !== 0 ||
      entryReadingAsides.length !== 0
    ) {
      throw new Error(`${relativePath} must not render an Entry content note.`);
    }
    return;
  }
  if (
    typeof expectedText !== "string" ||
    expectedText.trim() !== expectedText
  ) {
    throw new Error(`${relativePath} has an invalid expected content note.`);
  }

  const entryPage = entryPages[0];
  const entryReading = entryReadings[0];
  const note = notes[0];
  const heading = noteHeadings[0];
  const entryPageChildren =
    entryPage === undefined ? [] : directElementChildren(entryPage);
  const readingChildren =
    entryReading === undefined ? [] : directElementChildren(entryReading);
  const noteChildren = note === undefined ? [] : directElementChildren(note);
  const attributions = entryPageChildren.filter(
    (node) =>
      node.tagName === "div" && classNames(node).has("entry-attribution"),
  );
  const contexts = noteChildren.filter(
    (node) => node.tagName === "p" && classNames(node).has("section-context"),
  );
  const bodyParagraphs = noteChildren.filter(
    (node) => node.tagName === "p" && !classNames(node).has("section-context"),
  );
  const openings = readingChildren.filter((node) =>
    classNames(node).has("entry-opening"),
  );
  const quickAnswers = readingChildren.filter(
    (node) =>
      readElementAttribute(node, "aria-labelledby") === "quick-answer-heading",
  );
  const proseSections = readingChildren.filter((node) =>
    classNames(node).has("entry-prose"),
  );
  const noteDescendants =
    note === undefined ? [] : descendantsOf(elements, note);
  const noteElements = note === undefined ? [] : [note, ...noteDescendants];
  const hiddenContainers = [
    entryPage,
    entryReading,
    attributions[0],
    ...noteElements,
  ].filter(
    (node) =>
      node !== undefined &&
      (readElementAttribute(node, "hidden") !== null ||
        readElementAttribute(node, "inert") !== null ||
        readElementAttribute(node, "aria-hidden") !== null),
  );
  const disallowedNoteAttributes = noteElements.filter(
    (node) =>
      readElementAttribute(node, "aria-live") !== null ||
      readElementAttribute(node, "role") !== null ||
      readElementAttribute(node, "style") !== null,
  );
  const hasDirectText = (note?.childNodes ?? []).some(
    (node) => node.nodeName === "#text" && node.value.trim() !== "",
  );
  const attributionIndex = entryPageChildren.indexOf(attributions[0]);
  const readingIndex = entryPageChildren.indexOf(entryReading);
  const noteIndex = readingChildren.indexOf(note);
  const laterContentIndexes = [openings[0], quickAnswers[0], proseSections[0]]
    .filter((node) => node !== undefined)
    .map((node) => readingChildren.indexOf(node));

  if (
    entryPages.length !== 1 ||
    entryPage === undefined ||
    entryReadings.length !== 1 ||
    entryReading === undefined ||
    entryReading.parentNode !== entryPage ||
    attributions.length !== 1 ||
    attributionIndex < 0 ||
    readingIndex <= attributionIndex ||
    notes.length !== 1 ||
    entryReadingAsides.length !== 1 ||
    note === undefined ||
    note.tagName !== "aside" ||
    note.parentNode !== entryReading ||
    !classNames(note).has("entry-section") ||
    readElementAttribute(note, "aria-labelledby") !== "content-note-heading" ||
    hiddenContainers.length !== 0 ||
    disallowedNoteAttributes.length !== 0 ||
    noteHeadings.length !== 1 ||
    visiblyNamedNoteHeadings.length !== 1 ||
    heading === undefined ||
    heading.tagName !== "h2" ||
    heading.parentNode !== note ||
    normalizedText(heading) !== "Content note" ||
    noteChildren.length !== 3 ||
    noteChildren[0] !== contexts[0] ||
    noteChildren[1] !== heading ||
    noteChildren[2] !== bodyParagraphs[0] ||
    noteDescendants.length !== 3 ||
    hasDirectText ||
    contexts.length !== 1 ||
    normalizedText(contexts[0]) !== "Before reading" ||
    bodyParagraphs.length !== 1 ||
    normalizedText(bodyParagraphs[0]) !== expectedText ||
    noteIndex !== 0 ||
    openings.length > 1 ||
    quickAnswers.length > 1 ||
    proseSections.length > 1 ||
    laterContentIndexes.some((index) => index <= noteIndex)
  ) {
    throw new Error(
      `${relativePath} must render one named Entry content note before opening, Quick Answer, and body with exact text ${JSON.stringify(expectedText)}.`,
    );
  }
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
