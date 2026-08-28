import { describe, expect, it } from "vitest";

import {
  contentIdFromEntryPath,
  contentIdPattern,
} from "../../src/content/content-id";

describe("contentIdFromEntryPath", () => {
  it("derives stable IDs from the allowed file extensions", () => {
    expect(contentIdFromEntryPath("zhong-kui.md", ".md")).toBe("zhong-kui");
    expect(contentIdFromEntryPath("source-one.yml", ".yml")).toBe("source-one");
  });

  it.each(["nested/zhong-kui.md", "nested\\zhong-kui.md"])(
    "rejects nested records after path normalization: %s",
    (entryPath) => {
      expect(() => contentIdFromEntryPath(entryPath, ".md")).toThrow(
        /cannot be nested/,
      );
    },
  );

  it("rejects the wrong extension instead of silently stripping it", () => {
    expect(() => contentIdFromEntryPath("zhong-kui.yaml", ".yml")).toThrow(
      /Expected a \.yml/,
    );
  });

  it.each(["Zhong-Kui", "zhong_kui", "-zhong-kui", "zhong-kui-"])(
    "rejects a non-canonical ID: %s",
    (id) => {
      expect(contentIdPattern.test(id)).toBe(false);
      expect(() => contentIdFromEntryPath(`${id}.md`, ".md")).toThrow(
        /kebab-case ID/,
      );
    },
  );
});
