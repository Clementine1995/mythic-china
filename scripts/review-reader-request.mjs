import "./verify-runtime.mjs";

import { readFileSync, readdirSync } from "node:fs";
import process from "node:process";
import { URL } from "node:url";
import { parseFrontmatter } from "astro/markdown";
import { entrySchema } from "../src/content/content-schemas.ts";
import {
  readerRequestSubmissionSchema,
  validateReaderRequestSubmission,
} from "../src/services/reader-request.ts";

export function loadPublishedEntryIds(
  directory = new URL("../src/content/entries/", import.meta.url),
) {
  const ids = new Set();
  for (const file of readdirSync(directory, { withFileTypes: true })) {
    if (!file.name.endsWith(".md")) continue;
    if (!file.isFile()) throw new Error("Entry must be a regular file.");
    const { frontmatter } = parseFrontmatter(
      readFileSync(new URL(file.name, directory), "utf8"),
    );
    const parsed = entrySchema.safeParse(frontmatter);
    if (!parsed.success || parsed.data.entryId !== file.name.slice(0, -3)) {
      throw new Error("Entry content is not valid for the review allowlist.");
    }
    if (parsed.data.status === "published") ids.add(parsed.data.entryId);
  }
  if (ids.size === 0) throw new Error("No published Entry is available.");
  return ids;
}

export function reviewReaderRequest(input, publishedEntryIds) {
  const parsed = readerRequestSubmissionSchema.safeParse(input);
  const validation = validateReaderRequestSubmission(input, publishedEntryIds);
  const fields = new Set();
  if (!parsed.success) {
    // Only fixed field names may reach output; validation messages can contain input.
    const knownFields = new Set([
      "pageId",
      "requestedTopic",
      "email",
      "emailConsent",
    ]);
    for (const issue of parsed.error.issues) {
      fields.add(knownFields.has(issue.path[0]) ? issue.path[0] : "input");
    }
  } else if (!validation.success) {
    fields.add("pageId");
  }
  return {
    status: validation.success ? "eligible-for-editorial-review" : "rejected",
    codePointLength:
      typeof input?.requestedTopic === "string"
        ? Array.from(input.requestedTopic.trim()).length
        : null,
    invalidFields: [...fields].sort(),
  };
}

if (import.meta.main) {
  try {
    if (process.argv.length !== 2) throw new Error("Input must use stdin.");
    const publishedEntryIds = loadPublishedEntryIds();
    if (process.stdin.isTTY) {
      process.stderr.write(
        "粘贴一条 JSON；Windows 按 Ctrl+Z 再 Enter 结束输入。结果不保存、不回显正文或邮箱。\n",
      );
    }
    const input = JSON.parse(readFileSync(0, "utf8"));
    const result = reviewReaderRequest(input, publishedEntryIds);
    process.stdout.write(`${JSON.stringify(result)}\n`);
    process.exitCode =
      result.status === "eligible-for-editorial-review" ? 0 : 1;
  } catch {
    process.stderr.write(
      "审核未完成：请核对 JSON 输入、运行方式与本地 Entry 内容。\n",
    );
    process.exitCode = 2;
  }
}
