import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL, URL } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  loadPublishedEntryIds,
  reviewReaderRequest,
} from "../../scripts/review-reader-request.mjs";

const root = new URL("../../", import.meta.url);
const script = new URL("scripts/review-reader-request.mjs", root);
const pages = new Set(["zhong-kui"]);
const candidate = { pageId: "zhong-kui", requestedTopic: "A test suggestion" };
const temporaryDirectories = [];

afterEach(() => {
  vi.unstubAllGlobals();
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

function runCli(input, args = []) {
  return spawnSync(process.execPath, [fileURLToPath(script), ...args], {
    cwd: root,
    input,
    encoding: "utf8",
  });
}

describe("offline Reader Request review", () => {
  it.each([
    ["   ", false, 0],
    [" ab ", false, 2],
    ["😀😀", false, 2],
    [" abc ", true, 3],
    ["a".repeat(239) + "😀", true, 240],
    ["😀".repeat(240), true, 240],
    ["a".repeat(241), false, 241],
    ["e\u0301a", true, 3],
  ])("applies the existing trim/code-point rule", (topic, accepted, length) => {
    const result = runCli(
      JSON.stringify({ ...candidate, requestedTopic: topic }),
    );
    expect(result.error).toBeUndefined();
    expect(result.status).toBe(accepted ? 0 : 1);
    expect(JSON.parse(result.stdout)).toEqual({
      status: accepted ? "eligible-for-editorial-review" : "rejected",
      codePointLength: length,
      invalidFields: accepted ? [] : ["requestedTopic"],
    });
  });

  it.each([
    [{}, true],
    [{ email: null, emailConsent: false }, true],
    [{ email: "reader@example.test", emailConsent: true }, true],
    [{ email: "reader@example.test", emailConsent: false }, false],
    [{ email: "reader@example.test" }, false],
    [{ email: null, emailConsent: true }, false],
    [{ email: "-", emailConsent: "-" }, false],
    [{ pageId: "unpublished-entry" }, false],
    [{ respondentId: "private-provider-value" }, false],
  ])("preserves page and consent boundaries", (fields, accepted) => {
    const result = reviewReaderRequest({ ...candidate, ...fields }, pages);
    expect(result.status).toBe(
      accepted ? "eligible-for-editorial-review" : "rejected",
    );
  });

  it("derives the allowlist from current content and rejects malformed content", () => {
    const directory = mkdtempSync(join(tmpdir(), "mythic-reader-review-"));
    temporaryDirectories.push(directory);
    const url = pathToFileURL(`${directory}/`);
    const source = readFileSync(
      new URL("src/content/entries/zhong-kui.md", root),
      "utf8",
    );
    writeFileSync(join(directory, "zhong-kui.md"), source);
    expect(loadPublishedEntryIds(url)).toEqual(pages);
    writeFileSync(
      join(directory, "zhong-kui.md"),
      source.replace("status: published", "status: draft"),
    );
    expect(() => loadPublishedEntryIds(url)).toThrow("No published Entry");
    writeFileSync(
      join(directory, "zhong-kui.md"),
      "---\nstatus: published\n---",
    );
    expect(() => loadPublishedEntryIds(url)).toThrow(
      "Entry content is not valid",
    );
  });

  it("never echoes private inputs, extra keys, or JSON errors", () => {
    const marker = "private-value-that-must-not-reach-output";
    for (const input of [
      JSON.stringify({
        ...candidate,
        requestedTopic: marker,
        email: `${marker}@example.test`,
        emailConsent: true,
      }),
      JSON.stringify({ ...candidate, [marker]: marker }),
      `{"requestedTopic": "${marker}`,
    ]) {
      const result = runCli(input);
      expect(result.error).toBeUndefined();
      expect(result.stdout + result.stderr).not.toContain(marker);
    }
    const malformed = runCli("not JSON");
    expect(malformed.status).toBe(2);
    expect(malformed.stdout).toBe("");
    const argument = runCli("", [marker]);
    expect(argument.status).toBe(2);
    expect(argument.stdout + argument.stderr).not.toContain(marker);
  });

  it("does not use network or persistence APIs", () => {
    const fetchTrap = vi.fn(() => {
      throw new Error("Network forbidden");
    });
    vi.stubGlobal("fetch", fetchTrap);
    expect(reviewReaderRequest(candidate, loadPublishedEntryIds()).status).toBe(
      "eligible-for-editorial-review",
    );
    expect(fetchTrap).not.toHaveBeenCalled();
    const source = readFileSync(script, "utf8");
    expect(source).not.toMatch(
      /\b(?:writeFile|appendFile|fetch|WebSocket|localStorage|sessionStorage|https?)\b/u,
    );
  });
});
