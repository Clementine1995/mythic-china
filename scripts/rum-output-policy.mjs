import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { URL } from "node:url";
import ts from "typescript";
import { parse } from "parse5";
import rumScript from "./rum-script.json" with { type: "json" };
import {
  analyticsScriptHref,
  assertAnalyticsScriptBytes,
} from "./analytics-output-policy.mjs";

// Independent release expectation: changes to producer dates must fail until reviewed.
export const rumRelease = Object.freeze({
  endpoint: "https://mythic-china-rum.huyichen2019.workers.dev/vitals",
  startAtMs: Date.UTC(2026, 8, 16),
  endAtMs: Date.UTC(2026, 8, 30),
});
export const rumMetaName = "mythic-china-rum";
export const publicScriptHrefs = [
  analyticsScriptHref,
  ...rumScript.chunks.map(({ href }) => href),
];

export function assertRumConfiguration(value, publicPaths) {
  assert(value && typeof value === "object" && !Array.isArray(value));
  assert.deepEqual(Object.keys(value).sort(), [
    "buildIntent",
    "endAtMs",
    "endpoint",
    "publicPaths",
    "startAtMs",
  ]);
  assert.equal(value.buildIntent, "public");
  assert(Array.isArray(value.publicPaths) && value.publicPaths.length > 0);
  assert.equal(new Set(value.publicPaths).size, value.publicPaths.length);
  assert(
    value.publicPaths.every(
      (path) =>
        typeof path === "string" &&
        /^\/(?:[a-z0-9-]+\/)*$/u.test(path) &&
        !path.startsWith("/review/"),
    ),
  );
  for (const [key, expected] of Object.entries(rumRelease))
    assert.equal(
      value[key],
      expected,
      `RUM ${key} differs from the reviewed window.`,
    );
  assert.deepEqual([...value.publicPaths].sort(), [...publicPaths].sort());
}

export function assertRumPrivacyNotice(html, configuration) {
  const elements = [];
  const visit = (node) => {
    if (node.tagName) elements.push(node);
    for (const child of node.childNodes ?? []) visit(child);
  };
  visit(parse(html));
  const attribute = (node, name) =>
    node.attrs?.find((item) => item.name === name)?.value;
  const text = (node) =>
    node.nodeName === "#text"
      ? node.value
      : (node.childNodes ?? []).map(text).join("");
  const sections = elements.filter(
    (node) =>
      node.tagName === "section" &&
      attribute(node, "id") === "performance-monitoring",
  );
  assert.equal(sections.length, 1, "Missing performance privacy section.");
  const section = sections[0];
  const copy = text(section).replace(/\s+/gu, " ").trim();
  for (const phrase of [
    "LCP, INP, or CLS",
    "random identifier",
    "update sequence",
    "no cookies or browser storage",
    "30 days old",
    "hourly maintenance",
    "Cloudflare",
    "IP addresses",
    "backup",
    "?rum=off",
    "#rum=off",
    "Global Privacy Control or Do Not Track",
    "each page address",
    "analytics=off",
  ])
    assert(
      copy.toLowerCase().includes(phrase.toLowerCase()),
      `Missing performance privacy disclosure: ${phrase}`,
    );
  assert(
    !copy.includes("Real user monitoring is not enabled"),
    "Public RUM privacy still claims disabled.",
  );
  const dates = elements
    .filter(
      (node) =>
        node.tagName === "time" &&
        (() => {
          for (let parent = node.parentNode; parent; parent = parent.parentNode)
            if (parent === section) return true;
          return false;
        })(),
    )
    .map((node) => attribute(node, "datetime"));
  assert.deepEqual(
    dates,
    [
      new Date(configuration.startAtMs).toISOString(),
      new Date(configuration.endAtMs).toISOString(),
    ],
    "Privacy dates differ from the client window.",
  );
}

export function scriptImports(code) {
  const source = ts.createSourceFile(
    "artifact.js",
    code,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.JS,
  );
  assert.equal(
    source.parseDiagnostics.length,
    0,
    "Invalid JavaScript artifact.",
  );
  const imports = [];
  function visit(node) {
    let specifier;
    let kind;
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      specifier = node.moduleSpecifier;
      kind = "static";
    } else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword
    ) {
      assert.equal(
        node.arguments.length,
        1,
        "Unsupported dynamic import options.",
      );
      specifier = node.arguments[0];
      kind = "dynamic";
    }
    if (specifier) {
      assert(
        ts.isStringLiteral(specifier) ||
          ts.isNoSubstitutionTemplateLiteral(specifier),
        "Computed imports are forbidden.",
      );
      assert.match(
        specifier.text,
        /^\.\/[a-zA-Z0-9_.-]+\.js$/u,
        "Only local flat module imports are allowed.",
      );
      imports.push({ kind, specifier: specifier.text });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return imports;
}

export function assertPublicScriptGraph(modules) {
  assert.deepEqual(
    Object.keys(modules).sort(),
    [...publicScriptHrefs].sort(),
    "Unexpected executable inventory.",
  );
  assertAnalyticsScriptBytes(modules[analyticsScriptHref]);
  const records = [
    { href: analyticsScriptHref, imports: rumScript.entryImports },
    ...rumScript.chunks,
  ];
  const resources = [];
  for (const record of records) {
    const bytes = modules[record.href];
    if (record.sha256) {
      assert.equal(bytes.length, record.bytes);
      assert.equal(
        createHash("sha256").update(bytes).digest("hex"),
        record.sha256,
        "RUM chunk differs from reviewed bytes.",
      );
    }
    assert.deepEqual(
      scriptImports(bytes.toString("utf8")),
      record.imports,
      "Unapproved module dependencies.",
    );
    for (const { specifier } of record.imports) {
      const pathname = new URL(
        specifier,
        `https://artifact.invalid${record.href}`,
      ).pathname;
      assert(
        publicScriptHrefs.includes(pathname),
        "Module dependency missing from release inventory.",
      );
      resources.push({ pathname, context: `${record.href} import` });
    }
  }
  const reached = new Set([analyticsScriptHref]);
  function reach(href) {
    for (const { specifier } of records.find((record) => record.href === href)
      .imports) {
      const path = new URL(specifier, `https://artifact.invalid${href}`)
        .pathname;
      if (!reached.has(path)) {
        reached.add(path);
        reach(path);
      }
    }
  }
  reach(analyticsScriptHref);
  assert.equal(
    reached.size,
    publicScriptHrefs.length,
    "Unreachable executable artifact.",
  );
  return resources;
}
