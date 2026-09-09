import assert from "node:assert/strict";
import { parse } from "parse5";
import { assertPublicHtmlResourcePolicy } from "./review-output-policy.mjs";
import {
  analyticsScriptHref,
  analyticsMetaName,
  assertAnalyticsConfiguration,
} from "./analytics-output-policy.mjs";

// This launch inventory is independent of the page builder and its emitted metadata.
export const publicPagePaths = Object.freeze([
  "/",
  "/explore/",
  "/collections/",
  "/about/",
  "/privacy/",
  "/explore/chinese-underworld-guide/",
  "/explore/fighting-cricket/",
  "/explore/liaozhai-reading-guide/",
  "/explore/painted-skin/",
  "/explore/ten-kings/",
  "/explore/zhong-kui/",
  "/collections/chinese-underworld/",
  "/collections/liaozhai/",
]);
export const publicCollectionMembers = {
  "/collections/chinese-underworld/": [
    "chinese-underworld-guide",
    "ten-kings",
    "zhong-kui",
  ],
  "/collections/liaozhai/": [
    "liaozhai-reading-guide",
    "painted-skin",
    "fighting-cricket",
  ],
};
export function publicOutputPath(path) {
  return path === "/" ? "index.html" : `${path.slice(1)}index.html`;
}
export function assertPublicInventory(paths) {
  assert.deepEqual(
    paths.filter((path) => path.endsWith(".js")),
    [analyticsScriptHref.slice(1)],
    "Expected only the reviewed analytics bundle.",
  );
  assert.deepEqual(
    paths.filter((path) => path.endsWith(".html")).sort(),
    publicPagePaths.map(publicOutputPath).sort(),
    "Public HTML inventory differs from the approved launch.",
  );
  assert.deepEqual(
    paths
      .filter((path) => !path.startsWith("_astro/") && !path.endsWith(".html"))
      .sort(),
    ["robots.txt", "rss.xml", "sitemap.xml"],
  );
  assert(
    paths.every(
      (path) =>
        path === analyticsScriptHref.slice(1) ||
        /^(?:_astro\/[^/]+\.(?:css|avif|webp|woff2)|(?:[a-z0-9-]+\/)*index\.html|robots\.txt|rss\.xml|sitemap\.xml)$/u.test(
          path,
        ),
    ),
    "Unexpected public artifact.",
  );
}
export function htmlElements(html) {
  const elements = [];
  const document = parse(html, {
    onParseError: (error) => {
      if (error.code === "duplicate-attribute")
        throw new Error("Duplicate HTML attribute.");
    },
  });
  function visit(node) {
    if (node.tagName) elements.push(node);
    for (const child of node.childNodes ?? []) visit(child);
    if (node.content) visit(node.content);
  }
  visit(document);
  return elements;
}
export const htmlAttribute = (node, name) =>
  node.attrs?.find((attribute) => attribute.name === name)?.value;
export function htmlText(node) {
  return node.nodeName === "#text"
    ? node.value
    : (node.childNodes ?? []).map(htmlText).join("");
}
const normalizedText = (node) => htmlText(node).replace(/\s+/gu, " ").trim();
const one = (nodes, label) => {
  assert.equal(nodes.length, 1, `Expected one ${label}.`);
  return nodes[0];
};

export function assertPublicDocument(html, path, origin) {
  assert(publicPagePaths.includes(path), `Unapproved public route: ${path}`);
  const elements = htmlElements(html);
  for (const node of elements) {
    for (const key of node.tagName === "meta"
      ? ["name", "property"]
      : node.tagName === "link"
        ? ["rel"]
        : []) {
      const value = htmlAttribute(node, key);
      if (value !== undefined)
        assert.equal(
          value,
          value.trim().toLowerCase(),
          `Non-canonical metadata ${key}.`,
        );
    }
  }
  const resources = assertPublicHtmlResourcePolicy(
    html,
    publicOutputPath(path),
  );
  const head = one(
    elements.filter((node) => node.tagName === "head"),
    "head",
  );
  const inHead = (node) => {
    assert.equal(node.parentNode, head, `${node.tagName} must be in head.`);
    return node;
  };
  const tag = (name) => elements.filter((node) => node.tagName === name);
  const meta = (key, name) =>
    htmlAttribute(
      inHead(
        one(
          tag("meta").filter((node) => htmlAttribute(node, key) === name),
          name,
        ),
      ),
      "content",
    );
  const canonical = `${origin}${path}`;
  const canonicalNode = inHead(
    one(
      tag("link").filter((node) => htmlAttribute(node, "rel") === "canonical"),
      "canonical",
    ),
  );
  assert.deepEqual(canonicalNode.attrs.map(({ name }) => name).sort(), [
    "href",
    "rel",
  ]);
  assert.equal(htmlAttribute(canonicalNode, "href"), canonical);
  const feed = inHead(
    one(
      tag("link").filter((node) => htmlAttribute(node, "rel") === "alternate"),
      "RSS discovery link",
    ),
  );
  assert.deepEqual(
    Object.fromEntries(feed.attrs.map(({ name, value }) => [name, value])),
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "Mythic China",
      href: "/rss.xml",
    },
  );
  const documentTitle = normalizedText(inHead(one(tag("title"), "title")));
  const description = meta("name", "description");
  assert(
    description && description.trim() === description,
    "Missing public description.",
  );
  const isEntry = path.startsWith("/explore/") && path !== "/explore/";
  const isCollection =
    path.startsWith("/collections/") && path !== "/collections/";
  const staticTitles = {
    "/": "Mythic China",
    "/explore/": "Explore",
    "/collections/": "Collections",
    "/about/": "About",
    "/privacy/": "Privacy",
  };
  const title =
    staticTitles[path] ??
    normalizedText(one(tag("h1"), "visible content title"));
  assert.equal(
    documentTitle,
    title === "Mythic China" ? title : `${title} | Mythic China`,
  );
  assert.deepEqual(
    tag("meta")
      .map((node) => htmlAttribute(node, "property"))
      .filter((property) => property?.startsWith("og:"))
      .sort(),
    ["og:description", "og:site_name", "og:title", "og:type", "og:url"],
  );
  for (const [name, value] of Object.entries({
    "og:title": title,
    "og:description": description,
    "og:type": isEntry ? "article" : "website",
    "og:url": canonical,
    "og:site_name": "Mythic China",
  }))
    assert.equal(meta("property", name), value, name);
  const analyticsNode = inHead(
    one(
      tag("script").filter((node) => htmlAttribute(node, "type") === "module"),
      "analytics bootstrap",
    ),
  );
  assert.deepEqual(
    Object.fromEntries(
      analyticsNode.attrs.map(({ name, value }) => [name, value]),
    ),
    { type: "module", src: analyticsScriptHref },
  );
  assert.equal(htmlText(analyticsNode), "");
  const configurationNode = inHead(
    one(
      tag("meta").filter(
        (node) => htmlAttribute(node, "name") === analyticsMetaName,
      ),
      "analytics configuration",
    ),
  );
  assert.deepEqual(configurationNode.attrs.map(({ name }) => name).sort(), [
    "content",
    "name",
  ]);
  const analyticsConfiguration = JSON.parse(
    htmlAttribute(configurationNode, "content"),
  );
  assertAnalyticsConfiguration(analyticsConfiguration, origin, publicPagePaths);
  const jsonNode = inHead(
    one(
      tag("script").filter(
        (node) => htmlAttribute(node, "type") === "application/ld+json",
      ),
      "JSON-LD",
    ),
  );
  const data = JSON.parse(htmlText(jsonNode));
  const publisher = {
    "@id": `${origin}/about/#publisher`,
    "@type": "Organization",
    name: "Mythic China",
    url: `${origin}/about/`,
  };
  const author = {
    "@id": `${origin}/about/#editorial`,
    "@type": "Organization",
    name: "Mythic China Editorial",
    url: `${origin}/about/`,
  };
  const common = {
    "@context": "https://schema.org",
    url: canonical,
    name: title,
    description,
    inLanguage: "en",
  };
  let expected;
  let publishedAt;
  const updatedAt = undefined;
  if (isEntry) {
    const date = one(
      tag("time").filter(
        (node) => htmlAttribute(node, "data-publication-date") !== undefined,
      ),
      "visible publication date",
    );
    publishedAt = htmlAttribute(date, "datetime");
    assert.equal(
      publishedAt,
      "2026-09-10",
      "Publication date changed from the approved launch date.",
    );
    assert.equal(normalizedText(date), "September 10, 2026");
    const updated = tag("time").filter(
      (node) => htmlAttribute(node, "data-modified-date") !== undefined,
    );
    assert.equal(
      updated.length,
      0,
      "Launch entries have no public updates yet.",
    );
    assert(
      elements.some(
        (node) =>
          htmlAttribute(node, "class")
            ?.split(/\s+/u)
            .includes("entry-attribution") &&
          normalizedText(node).includes("By Mythic China Editorial"),
      ),
      "Missing visible editorial attribution.",
    );
    expected = {
      ...common,
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: title,
      datePublished: publishedAt,
      mainEntityOfPage: canonical,
      author,
      publisher,
    };
  } else if (path === "/")
    expected = {
      ...common,
      "@type": "WebSite",
      "@id": `${canonical}#website`,
      publisher,
    };
  else if (path === "/about/") {
    for (const id of ["publisher", "editorial"])
      assert(
        elements.some((node) => htmlAttribute(node, "id") === id),
        `Missing public identity anchor ${id}`,
      );
    expected = {
      ...common,
      "@type": "AboutPage",
      "@id": `${canonical}#about-page`,
      about: [publisher, author],
      publisher,
    };
  } else if (path === "/privacy/")
    expected = {
      ...common,
      "@type": "WebPage",
      "@id": `${canonical}#web-page`,
      publisher,
    };
  else
    expected = {
      ...common,
      "@type": "CollectionPage",
      "@id": `${canonical}#collection-page`,
      ...(isCollection
        ? {
            mainEntity: {
              "@type": "ItemList",
              itemListElement: publicCollectionMembers[path].map(
                (id, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${origin}/explore/${id}/`,
                }),
              ),
            },
          }
        : {}),
      publisher,
    };
  assert.deepEqual(
    data,
    expected,
    `JSON-LD disagrees with visible identity: ${path}`,
  );
  assert(
    !html.includes("Local review preview") &&
      !html.includes("data-review-candidate") &&
      !html.includes("type-specimen"),
    "Review-only material leaked into public output.",
  );
  return {
    path,
    canonical,
    title,
    documentTitle,
    description,
    publishedAt,
    updatedAt,
    resources,
  };
}

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
export function assertPublicDiscoveryFiles(
  { sitemap, rss, robots },
  pages,
  origin,
) {
  assert.equal(
    robots,
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  );
  const entries = pages
    .filter((page) => page.publishedAt)
    .sort(
      (a, b) =>
        b.publishedAt.localeCompare(a.publishedAt, "en") ||
        a.path.localeCompare(b.path, "en"),
    );
  const collections = pages
    .filter((page) => publicCollectionMembers[page.path])
    .sort(
      (a, b) =>
        a.title.localeCompare(b.title, "en") ||
        a.path.localeCompare(b.path, "en"),
    );
  const staticPages = publicPagePaths.slice(0, 5).map((path) =>
    one(
      pages.filter((page) => page.path === path),
      path,
    ),
  );
  // Build a separate oracle from verified rendered identities; do not import the XML builder.
  const locations = [...staticPages, ...entries, ...collections].map(
    (page) =>
      `  <url>\n    <loc>${escapeXml(page.canonical)}</loc>\n${page.publishedAt ? `    <lastmod>${page.updatedAt ?? page.publishedAt}</lastmod>\n` : ""}  </url>`,
  );
  assert.equal(
    sitemap,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.join("\n")}\n</urlset>\n`,
    "Sitemap differs from verified HTML inventory.",
  );
  const items = entries.map(
    (page) =>
      `    <item>\n      <title>${escapeXml(page.title)}</title>\n      <description>${escapeXml(page.description)}</description>\n      <link>${escapeXml(page.canonical)}</link>\n      <guid isPermaLink="true">${escapeXml(page.canonical)}</guid>\n      <pubDate>${new Date(`${page.publishedAt}T00:00:00.000Z`).toUTCString()}</pubDate>\n    </item>`,
  );
  assert.equal(
    rss,
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Mythic China</title>\n    <link>${origin}/</link>\n    <description>${escapeXml(staticPages[0].description)}</description>\n${items.join("\n")}\n  </channel>\n</rss>\n`,
    "RSS differs from verified article identities.",
  );
}
