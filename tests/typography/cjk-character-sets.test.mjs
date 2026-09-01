import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  assertCjkCssFontFaces,
  assertCjkFontFile,
  assertFontProductionProvenance,
  assertRenderedCjkPolicy,
  mappedFontCodePoints,
  parseUnicodeRange,
  readCjkCharacterPolicy,
} from "../../scripts/cjk-font-policy.mjs";

const projectRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const fontRoot = resolve(projectRoot, "src", "assets", "fonts");

function sortedCharacters(values) {
  return [...values]
    .sort((left, right) => left - right)
    .map((codePoint) => String.fromCodePoint(codePoint))
    .join("");
}

describe("CJK character and cmap boundary", () => {
  it("freezes approved content, required probes, punctuation, and fallback-only probes", async () => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    expect(policy.manifestSha256).toBe(
      "8dfd1760fa83b504347db9f6d561e7ba67d86f954b5b183ff944a4d3b489ccf2",
    );
    expect(sortedCharacters(policy.byLocale["zh-Hans"].contentCodePoints)).toBe(
      "中国钟间阴馗",
    );
    expect(sortedCharacters(policy.byLocale["zh-Hant"].contentCodePoints)).toBe(
      "任像元出十圖夜早期清王竹群軸遊鍾間陰雕頤馗鬼",
    );
    expect(policy.byLocale["zh-Hans"].requiredCodePoints.size).toBe(65);
    expect(policy.byLocale["zh-Hant"].requiredCodePoints.size).toBe(36);
    expect(
      sortedCharacters(policy.byLocale["zh-Hans"].fallbackOnlyCodePoints),
    ).toBe("测");
    expect(
      sortedCharacters(policy.byLocale["zh-Hant"].fallbackOnlyCodePoints),
    ).toBe("測");
  });

  it("locks every SC/TC weight to the approved cmap, internal names, and on-demand policy", async () => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    const inventory = JSON.parse(
      await readFile(resolve(fontRoot, "font-assets.json"), "utf8"),
    );
    expect(inventory.fontProduction.characterSetSha256).toBe(
      policy.manifestSha256,
    );
    await expect(
      assertFontProductionProvenance(projectRoot, inventory, policy),
    ).resolves.toBeUndefined();

    const cjkFamilies = inventory.families.filter(
      (family) => family.characterSetLocale !== undefined,
    );
    expect(
      cjkFamilies.map((family) => family.characterSetLocale).sort(),
    ).toEqual(["zh-Hans", "zh-Hant"]);
    for (const family of cjkFamilies) {
      const localePolicy = policy.byLocale[family.characterSetLocale];
      expect(family.files.map((file) => file.weight)).toEqual([
        "400",
        "500",
        "600",
      ]);
      for (const file of family.files) {
        expect(file.preload).toBe("on-demand");
        expect(file.registryKey).toBeNull();
        await assertCjkFontFile(
          resolve(fontRoot, file.path),
          family,
          file,
          localePolicy.requiredCodePoints,
        );
      }
    }
  });

  it("keeps CSS unicode-range declarations exact and rejects broad or stale coverage", async () => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    const inventory = JSON.parse(
      await readFile(resolve(fontRoot, "font-assets.json"), "utf8"),
    );
    const fontsCss = await readFile(
      resolve(projectRoot, "src", "styles", "fonts.css"),
      "utf8",
    );
    const cjkRecords = inventory.families
      .filter((family) => family.characterSetLocale !== undefined)
      .flatMap((family) => family.files);
    expect(() =>
      assertCjkCssFontFaces(
        fontsCss,
        inventory,
        policy,
        (sourceUrl) =>
          cjkRecords.find((file) => sourceUrl.endsWith(file.path))?.assetId ??
          null,
        "source fonts.css",
      ),
    ).not.toThrow();
    expect(() => parseUnicodeRange("U+4E??")).toThrow(
      "Unsupported or broad unicode-range token",
    );
  });

  it("counts only cmap entries that resolve to a real glyph", () => {
    const mapped = mappedFontCodePoints({
      characterSet: [0x4e00, 0x4e01, 0xffff],
      hasGlyphForCodePoint: (codePoint) => codePoint === 0x4e00,
    });
    expect(mapped).toEqual(new Set([0x4e00]));
  });

  it("requires every visible Han character to inherit an exact locale", async () => {
    const policy = await readCjkCharacterPolicy(projectRoot);
    const validFixture = new Map([
      [
        "fixture.html",
        `<html lang="en"><body><span data-aria-label="阴间" data-title="钟馗" data-note=' aria-label="阴间" '>English</span><span lang="zh-Hans">${policy.manifest.locales["zh-Hans"].contentStrings.join("")}</span><span lang="zh-Hant">${policy.manifest.locales["zh-Hant"].contentStrings.join("")}</span></body></html>`,
      ],
    ]);
    expect(() => assertRenderedCjkPolicy(validFixture, policy)).not.toThrow();
    expect(() =>
      assertRenderedCjkPolicy(
        new Map([["bad.html", '<html lang="en"><p>阴间</p></html>']]),
        policy,
      ),
    ).toThrow("visible Han text requires exact zh-Hans or zh-Hant semantics");
    expect(() =>
      assertRenderedCjkPolicy(
        new Map([["bad.html", '<html lang="en"><p lang="zh">陰間</p></html>']]),
        policy,
      ),
    ).toThrow("visible Han text requires exact zh-Hans or zh-Hant semantics");
    expect(() =>
      assertRenderedCjkPolicy(
        new Map([
          [
            "bad.html",
            '<html lang="en"><p data-lang="zh-Hans">阴间</p></html>',
          ],
        ]),
        policy,
      ),
    ).toThrow("visible Han text requires exact zh-Hans or zh-Hant semantics");
    expect(() =>
      assertRenderedCjkPolicy(
        new Map([
          [
            "bad.html",
            `<html lang="en"><p data-note=' lang=zh-Hans '>阴间</p></html>`,
          ],
        ]),
        policy,
      ),
    ).toThrow("visible Han text requires exact zh-Hans or zh-Hant semantics");
    expect(() =>
      assertRenderedCjkPolicy(
        new Map([
          [
            "bad.html",
            '<html lang="en"><body><p lang="zh-Hans"><p>阴间</p></body></html>',
          ],
        ]),
        policy,
      ),
    ).toThrow("visible Han text requires exact zh-Hans or zh-Hant semantics");
    expect(() =>
      assertRenderedCjkPolicy(
        new Map([
          [
            "bad.html",
            '<html lang="en"><body><ul><li lang="zh-Hans"><li>阴间</ul></body></html>',
          ],
        ]),
        policy,
      ),
    ).toThrow("visible Han text requires exact zh-Hans or zh-Hant semantics");
    expect(() =>
      assertRenderedCjkPolicy(
        new Map([
          [
            "bad.html",
            '<html lang="en"><body><table lang="zh-Hans">阴间</table></body></html>',
          ],
        ]),
        policy,
      ),
    ).toThrow("visible Han text requires exact zh-Hans or zh-Hant semantics");
  });
});
