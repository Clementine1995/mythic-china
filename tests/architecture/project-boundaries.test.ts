import { existsSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

interface PackageManifest {
  packageManager: string;
  engines: Record<string, string>;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function readProjectFile(relativePath: string): string {
  return readFileSync(join(projectRoot, relativePath), "utf8").replaceAll(
    "\r\n",
    "\n",
  );
}

describe("M2 project boundaries", () => {
  it("runs tests under the fixed project Node identity", () => {
    const expectedNode = realpathSync.native(
      "D:\\Program Files\\nvm\\v24.16.0\\node.exe",
    );

    expect(realpathSync.native(process.execPath).toLowerCase()).toBe(
      expectedNode.toLowerCase(),
    );
    expect(process.version).toBe("v24.16.0");
    expect(readProjectFile(".node-version").trim()).toBe("24.16.0");
  });

  it("pins the package manager, engines, and direct dependency whitelist", () => {
    const manifest = JSON.parse(
      readProjectFile("package.json"),
    ) as PackageManifest;

    expect(manifest.packageManager).toBe("pnpm@11.22.0");
    expect(manifest.engines).toEqual({
      node: ">=24.16.0 <25",
      pnpm: ">=11.22.0 <12",
    });
    expect(manifest.dependencies).toEqual({ astro: "7.2.8" });
    expect(Object.keys(manifest.devDependencies).sort()).toEqual([
      "@astrojs/check",
      "@eslint/js",
      "@types/node",
      "eslint",
      "eslint-plugin-astro",
      "prettier",
      "prettier-plugin-astro",
      "typescript",
      "typescript-eslint",
      "vitest",
    ]);
    expect(manifest.devDependencies).toMatchObject({
      "@astrojs/check": "0.9.10",
      "@eslint/js": "10.0.1",
      "@types/node": "24.13.3",
      eslint: "10.9.1",
      "eslint-plugin-astro": "3.1.0",
      prettier: "3.6.2",
      "prettier-plugin-astro": "0.14.1",
      typescript: "6.0.3",
      "typescript-eslint": "8.68.0",
      vitest: "4.1.11",
    });
    for (const [name, script] of Object.entries(manifest.scripts)) {
      expect(script, name).toContain("node scripts/verify-runtime.mjs");
    }
  });

  it("keeps one lockfile and the explicit pnpm release-age exception", () => {
    const lockNames = readdirSync(projectRoot).filter((name) =>
      [
        "pnpm-lock.yaml",
        "package-lock.json",
        "npm-shrinkwrap.json",
        "yarn.lock",
        "bun.lock",
        "bun.lockb",
      ].includes(name),
    );

    expect(lockNames).toEqual(["pnpm-lock.yaml"]);
    expect(readProjectFile("pnpm-workspace.yaml").trim()).toBe(
      "minimumReleaseAgeExclude:\n  - astro@7.2.8",
    );
  });

  it("keeps Astro static with no adapter or forbidden M2 directories", () => {
    const astroConfig = readProjectFile("astro.config.mjs");
    expect(astroConfig).toContain('output: "static"');
    expect(astroConfig).not.toMatch(/\badapter\s*:/u);

    for (const relativePath of [
      "public",
      "src/assets",
      "src/services",
      "src/components/commercial",
      "tests/browser",
      "visual",
    ]) {
      expect(existsSync(join(projectRoot, relativePath)), relativePath).toBe(
        false,
      );
    }

    const contentFileContracts = {
      entries: /\.md$/u,
      collections: /\.yml$/u,
      sources: /\.yml$/u,
      claims: /\.yml$/u,
      terminology: /\.yml$/u,
    } as const;

    expect(contentFileContracts.entries.test("entry.yaml")).toBe(false);
    expect(contentFileContracts.entries.test("entry.md.bak")).toBe(false);
    expect(contentFileContracts.sources.test("source.yaml")).toBe(false);

    for (const [directory, allowedExtension] of Object.entries(
      contentFileContracts,
    )) {
      const recordFiles = readdirSync(
        join(projectRoot, "src", "content", directory),
        { recursive: true, withFileTypes: true },
      )
        .filter((entry) => entry.isFile() && entry.name !== ".gitkeep")
        .map((entry) => entry.name)
        .sort();

      expect(recordFiles, directory).toEqual(
        recordFiles.filter((filename) => allowedExtension.test(filename)),
      );
    }
  });
});
