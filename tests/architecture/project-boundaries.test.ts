import {
  closeSync,
  existsSync,
  lstatSync,
  openSync,
  readFileSync,
  readSync,
  readdirSync,
  realpathSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
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

function collectRepositoryInventory(directory = projectRoot): {
  files: string[];
  links: string[];
} {
  const files: string[] = [];
  const links: string[] = [];
  const ignoredDirectories = new Set([
    ".astro",
    ".git",
    "coverage",
    "dist",
    "node_modules",
    ".local",
  ]);

  function visit(currentDirectory: string): void {
    for (const entry of readdirSync(currentDirectory, {
      withFileTypes: true,
    })) {
      const absolutePath = join(currentDirectory, entry.name);
      const relativePath = relative(projectRoot, absolutePath).replaceAll(
        "\\",
        "/",
      );
      if (entry.isSymbolicLink()) {
        links.push(relativePath);
      } else if (entry.isDirectory()) {
        if (!ignoredDirectories.has(entry.name)) visit(absolutePath);
      } else if (entry.isFile()) {
        files.push(relativePath);
      }
    }
  }

  visit(directory);
  return { files: files.sort(), links: links.sort() };
}

function hasForbiddenWeightSignature(relativePath: string): boolean {
  const descriptor = openSync(join(projectRoot, relativePath), "r");
  const header = Buffer.alloc(16);
  let bytesRead: number;
  try {
    bytesRead = readSync(descriptor, header, 0, header.length, 0);
  } finally {
    closeSync(descriptor);
  }
  const bytes = header.subarray(0, bytesRead);
  const startsWith = (...signature: number[]): boolean =>
    signature.every((byte, index) => bytes[index] === byte);

  if (startsWith(0x47, 0x47, 0x55, 0x46)) return true;
  if (startsWith(0x50, 0x4b, 0x03, 0x04)) return true;
  if (
    startsWith(0x80, 0x02) ||
    startsWith(0x80, 0x03) ||
    startsWith(0x80, 0x04) ||
    startsWith(0x80, 0x05)
  ) {
    return true;
  }
  if (bytes.length > 9 && bytes[8] === 0x7b) {
    const headerLength = new DataView(
      bytes.buffer,
      bytes.byteOffset,
      8,
    ).getBigUint64(0, true);
    return headerLength > 0n && headerLength < 100_000_000n;
  }
  return false;
}

describe("M2 application and M3 U5 production boundaries", () => {
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
    expect(manifest.dependencies).toEqual({
      astro: "7.2.8",
      sharp: "0.35.4",
    });
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
      "allowBuilds:\n  esbuild: false\nminimumReleaseAgeExclude:\n  - astro@7.2.8",
    );
  });

  it("keeps Astro static and limits M3 U4 to approved production directories", () => {
    const astroConfig = readProjectFile("astro.config.mjs");
    expect(astroConfig).toContain('output: "static"');
    expect(astroConfig).not.toMatch(/\badapter\s*:/u);

    for (const relativePath of [
      "public",
      "src/services",
      "src/components/commercial",
      "tests/browser",
    ]) {
      expect(existsSync(join(projectRoot, relativePath)), relativePath).toBe(
        false,
      );
    }

    const visualRoot = join(projectRoot, "visual");
    const visualFiles = readdirSync(visualRoot, {
      recursive: true,
      withFileTypes: true,
    })
      .filter((entry) => entry.isFile())
      .map((entry) =>
        relative(visualRoot, join(entry.parentPath, entry.name)).replaceAll(
          "\\",
          "/",
        ),
      )
      .sort();

    expect(visualFiles).toEqual([
      "briefs/brief-zhong-kui-visual-package-v1.yml",
      "manifests/.gitkeep",
      "manifests/asset-zhong-kui-hero-primary-v1.yml",
      "manifests/asset-zhong-kui-hero-primary-v2.yml",
      "manifests/asset-zhong-kui-lead-primary-v1.yml",
      "manifests/asset-zhong-kui-og-primary-v1.yml",
      "manifests/asset-zhong-kui-social-primary-v1.yml",
      "production-records/.gitkeep",
      "production-records/production-zhong-kui-hero-primary-v2.yml",
      "production-records/production-zhong-kui-visual-package-v1.yml",
    ]);
    const gitignore = readProjectFile(".gitignore");
    expect(gitignore).toMatch(/^\/.local\/$/mu);
    expect(gitignore).toMatch(/^\/Codex 图像 \*\.png$/mu);
    expect(gitignore).toMatch(/^\/Codex 图像 \*\.webp$/mu);
    expect(
      readProjectFile("visual/briefs/brief-zhong-kui-visual-package-v1.yml"),
    ).toMatch(/^status: approved$/mu);
    const approvedBrief = readProjectFile(
      "visual/briefs/brief-zhong-kui-visual-package-v1.yml",
    );
    expect(
      [...approvedBrief.matchAll(/^ {2}- role: (.+)$/gmu)].map(
        (match) => match[1],
      ),
    ).toEqual(["hero", "lead", "og", "social"]);
    expect(approvedBrief.match(/^ {2}- referenceId:/gmu)).toHaveLength(4);
    expect(
      new Set(approvedBrief.match(/claim-zhong-kui-[a-z0-9-]+/gu)),
    ).toHaveLength(5);
    expect(approvedBrief).toMatch(
      /^approvedBy: Project owner \(user-confirmed\)$/mu,
    );
    expect(approvedBrief).toMatch(/^approvedAt: "2026-08-28T07:36:04Z"$/mu);

    const repositoryImageFiles = readdirSync(
      join(projectRoot, "src", "assets", "images"),
      { recursive: true, withFileTypes: true },
    )
      .filter((entry) => entry.isFile())
      .map((entry) =>
        relative(
          join(projectRoot, "src", "assets", "images"),
          join(entry.parentPath, entry.name),
        ).replaceAll("\\", "/"),
      )
      .sort();
    expect(repositoryImageFiles).toEqual([
      ".gitkeep",
      "zhong-kui-hero-primary-v1-hero-desktop-3200w.webp",
      "zhong-kui-hero-primary-v1-hero-mobile-1600w.webp",
      "zhong-kui-hero-primary-v2-hero-desktop-3200w.webp",
      "zhong-kui-hero-primary-v2-hero-mobile-1600w.webp",
      "zhong-kui-lead-primary-v1-article-lead-2400w.webp",
      "zhong-kui-og-primary-v1-open-graph-1200w.png",
      "zhong-kui-social-primary-v1-social-portrait-1080w.png",
    ]);

    for (const root of [
      "visual/briefs",
      "visual/manifests",
      "visual/production-records",
      "src/assets/images",
    ]) {
      expect(lstatSync(join(projectRoot, root)).isSymbolicLink(), root).toBe(
        false,
      );
    }

    const repositoryInventory = collectRepositoryInventory();
    expect(
      repositoryInventory.links.filter(
        (path) =>
          path.startsWith("visual/") || path.startsWith("src/assets/images/"),
      ),
    ).toEqual([]);
    expect(
      repositoryInventory.files.filter((path) =>
        /\.(?:bin|ckpt|gguf|onnx|pt|pth|safetensors)$/iu.test(path),
      ),
    ).toEqual([]);
    expect(
      repositoryInventory.files.filter(hasForbiddenWeightSignature),
    ).toEqual([]);

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
