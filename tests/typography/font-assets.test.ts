import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

interface FontFileRecord {
  assetId: string;
  path: string;
  bytes: number;
  sha256: string;
  style: "normal" | "italic";
  weight: string;
  preload: "all-pages" | "entry-pages" | "on-demand";
  registryKey: string | null;
  legacyFamily?: string;
  typographicFamily?: string;
  typographicSubfamily?: string;
  postscriptName?: string;
  cmapCodePointCount?: number;
}

interface FontFamilyRecord {
  familyId: string;
  role: "display" | "story" | "zh-hans-display" | "zh-hant-display";
  cssAlias: string;
  upstreamFamily: string;
  licensePath: string;
  licenseUrl: string;
  licenseSha256: string;
  reservedFontName: string | null;
  fontlogPath?: string;
  fontlogSha256?: string;
  modified?: boolean;
  characterSetLocale?: "zh-Hans" | "zh-Hant";
  files: FontFileRecord[];
}

interface FontInventory {
  schemaVersion: number;
  status: string;
  fontProduction: {
    characterSetPath: string;
    characterSetSha256: string;
    generatorPath: string;
    generatorSha256: string;
    requirementsPath: string;
    requirementsSha256: string;
  };
  replaceability: {
    displayAlias: string;
    storyAlias: string;
    hansDisplayAlias: string;
    hantDisplayAlias: string;
    consumerTokens: string[];
  };
  families: FontFamilyRecord[];
}

const projectRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const fontRoot = resolve(projectRoot, "src", "assets", "fonts");

async function listFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(absolutePath)));
    else if (entry.isFile()) files.push(absolutePath);
  }
  return files;
}

function sha256(buffer: Buffer): string {
  return createHash("sha256").update(buffer).digest("hex");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

async function readInventory(): Promise<FontInventory> {
  return JSON.parse(
    await readFile(resolve(fontRoot, "font-assets.json"), "utf8"),
  ) as FontInventory;
}

describe("font asset boundary", () => {
  it("locks the exact candidate inventory, hashes, licenses, and preload roles", async () => {
    const inventory = await readInventory();
    expect(inventory.schemaVersion).toBe(2);
    expect(inventory.status).toBe("browser-review-pending");
    expect(inventory.replaceability).toEqual(
      expect.objectContaining({
        displayAlias: "Mythic Display",
        storyAlias: "Mythic Story",
        hansDisplayAlias: "Mythic Han Sans SC",
        hantDisplayAlias: "Mythic Han Sans TC",
        consumerTokens: [
          "--font-display",
          "--font-story",
          "--font-zh-display",
          "--font-zh-hans-display",
          "--font-zh-hant-display",
        ],
      }),
    );

    const familyRoles = inventory.families.map((family) => family.role).sort();
    expect(familyRoles).toEqual([
      "display",
      "story",
      "zh-hans-display",
      "zh-hant-display",
    ]);
    expect(new Set(familyRoles).size).toBe(familyRoles.length);

    const fontRecords = inventory.families.flatMap((family) =>
      family.files.map((file) => ({ family, file })),
    );
    for (const field of ["assetId", "path", "sha256"] as const) {
      expect(new Set(fontRecords.map(({ file }) => file[field])).size).toBe(
        fontRecords.length,
      );
    }
    expect(
      fontRecords
        .filter(({ file }) => file.preload !== "on-demand")
        .map(({ family, file }) => ({
          role: family.role,
          preload: file.preload,
          registryKey: file.registryKey,
        })),
    ).toEqual([
      {
        role: "display",
        preload: "all-pages",
        registryKey: "displayRoman",
      },
      {
        role: "story",
        preload: "entry-pages",
        registryKey: "storyRoman",
      },
    ]);

    for (const [path, expectedHash, root] of [
      [
        inventory.fontProduction.characterSetPath,
        inventory.fontProduction.characterSetSha256,
        fontRoot,
      ],
      [
        inventory.fontProduction.generatorPath,
        inventory.fontProduction.generatorSha256,
        projectRoot,
      ],
      [
        inventory.fontProduction.requirementsPath,
        inventory.fontProduction.requirementsSha256,
        projectRoot,
      ],
    ] as const) {
      expect(sha256(await readFile(resolve(root, path))), path).toBe(
        expectedHash,
      );
    }

    for (const family of inventory.families) {
      const expectedAlias = {
        display: inventory.replaceability.displayAlias,
        story: inventory.replaceability.storyAlias,
        "zh-hans-display": inventory.replaceability.hansDisplayAlias,
        "zh-hant-display": inventory.replaceability.hantDisplayAlias,
      }[family.role];
      expect(family.cssAlias).toBe(expectedAlias);
      expect(new URL(family.licenseUrl).protocol).toBe("https:");
      const license = await readFile(resolve(fontRoot, family.licensePath));
      expect(sha256(license)).toBe(family.licenseSha256);
      expect(license.toString("utf8")).toContain("SIL OPEN FONT LICENSE");
      if (family.reservedFontName !== null) {
        expect(license.toString("utf8")).toContain("Reserved Font Name");
        expect(license.toString("utf8")).toContain(family.reservedFontName);
      }
      if (family.fontlogPath !== undefined) {
        const fontlog = await readFile(resolve(fontRoot, family.fontlogPath));
        expect(sha256(fontlog)).toBe(family.fontlogSha256);
        expect(fontlog.toString("utf8")).toContain("Modified Version");
        expect(family.modified).toBe(true);
        expect(family.characterSetLocale).toMatch(/^zh-Han[st]$/u);
      }

      for (const record of family.files) {
        expect(record.registryKey === null).toBe(
          record.preload === "on-demand",
        );
        const file = await readFile(resolve(fontRoot, record.path));
        expect(file.byteLength, record.assetId).toBe(record.bytes);
        expect(sha256(file), record.assetId).toBe(record.sha256);
        expect(file.subarray(0, 4).toString("ascii"), record.assetId).toBe(
          "wOF2",
        );
      }
    }

    const actualFiles = (await listFiles(fontRoot))
      .map((path) => relative(fontRoot, path).replaceAll("\\", "/"))
      .sort();
    const expectedFiles = [
      ...new Set([
        "font-assets.json",
        inventory.fontProduction.characterSetPath,
        ...inventory.families.flatMap((family) => [
          family.licensePath,
          ...(family.fontlogPath === undefined ? [] : [family.fontlogPath]),
          ...family.files.map((record) => record.path),
        ]),
      ]),
    ].sort();
    expect(actualFiles).toEqual(expectedFiles);
  });

  it("keeps upstream families behind one CSS mapping and stable role tokens", async () => {
    const inventory = await readInventory();
    const fontsCss = await readFile(
      resolve(projectRoot, "src", "styles", "fonts.css"),
      "utf8",
    );
    const globalCss = await readFile(
      resolve(projectRoot, "src", "styles", "global.css"),
      "utf8",
    );
    const layout = await readFile(
      resolve(projectRoot, "src", "layouts", "SiteLayout.astro"),
      "utf8",
    );
    const preloadRegistry = await readFile(
      resolve(projectRoot, "src", "typography", "font-assets.ts"),
      "utf8",
    );

    const faceBlocks = fontsCss.match(/@font-face\s*\{[^}]*\}/gu) ?? [];
    const fontRecords = inventory.families.flatMap((family) =>
      family.files.map((file) => ({ family, file })),
    );
    expect(faceBlocks).toHaveLength(fontRecords.length);
    for (const { family, file } of fontRecords) {
      const matchingBlocks = faceBlocks.filter((block) =>
        block.includes(`url("../assets/fonts/${file.path}")`),
      );
      expect(matchingBlocks, file.assetId).toHaveLength(1);
      const block = matchingBlocks[0] ?? "";
      expect(block).toContain(`font-family: "${family.cssAlias}"`);
      expect(block).toContain(`font-style: ${file.style}`);
      expect(block).toContain(`font-weight: ${file.weight}`);
      expect(block).toContain("font-display: swap");
    }
    expect(fontsCss).not.toMatch(
      /@import\s+[^;]*(?:https?:)?\/\/|url\(\s*["']?(?:https?:)?\/\//iu,
    );
    for (const family of inventory.families) {
      expect(globalCss).toContain(`"${family.cssAlias}"`);
      expect(globalCss).not.toContain(`"${family.upstreamFamily}"`);
    }
    for (const token of inventory.replaceability.consumerTokens) {
      expect(globalCss).toContain(token);
    }

    const preloadRecords = fontRecords.filter(
      ({ file }) => file.registryKey !== null,
    );
    expect(
      preloadRegistry.match(/^import .+\.woff2\?no-inline";$/gmu) ?? [],
    ).toHaveLength(preloadRecords.length);
    for (const { file } of preloadRecords) {
      const importMatch = preloadRegistry.match(
        new RegExp(
          `import\\s+([A-Za-z_$][\\w$]*)\\s+from\\s+"${escapeRegExp(`../assets/fonts/${file.path}?no-inline`)}";`,
          "u",
        ),
      );
      expect(importMatch, file.assetId).not.toBeNull();
      const importedName = importMatch?.[1] ?? "";
      expect(preloadRegistry).toMatch(
        new RegExp(
          `\\b${escapeRegExp(file.registryKey ?? "")}\\s*:\\s*${escapeRegExp(importedName)}\\b`,
          "u",
        ),
      );
      expect(layout).toContain(`fontAssetUrls.${file.registryKey}`);
    }
    for (const { file } of fontRecords.filter(
      ({ file }) => file.registryKey === null,
    )) {
      expect(preloadRegistry).not.toContain(file.path);
    }
    expect(layout).toContain("preloadStoryFont");
    expect(preloadRegistry).not.toContain("?url");
  });
});
