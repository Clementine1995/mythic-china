import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import process from "node:process";

import { imageMetadata } from "astro/assets/utils";

import { inspectTrustedDirectoryChain } from "./inspect-trusted-directory-chain";
import type { AssetManifestData } from "./visual-asset-schemas";
import type { VisualGraphRecord } from "./validate-visual-asset-graph";

const localMasterUriPrefix =
  "project-local://mythic-china/.local/visual-production/masters/";

export interface LocalMasterVerificationIssue {
  code:
    | "duplicate-master-path"
    | "duplicate-master-uri"
    | "invalid-master-uri"
    | "master-dimension-mismatch"
    | "master-format-mismatch"
    | "master-hash-mismatch"
    | "master-metadata-error"
    | "master-root-error"
    | "missing-master"
    | "orphan-master"
    | "symbolic-link";
  path: string;
  message: string;
}

export interface LocalMasterVerificationResult {
  rootDirectory: string;
  verifiedFileCount: number;
  issues: LocalMasterVerificationIssue[];
}

interface ImageMetadataResult {
  width: number;
  height: number;
  format: string;
}

type ImageMetadataReader = (
  data: Uint8Array,
  sourcePath: string,
) => Promise<ImageMetadataResult>;

export interface VerifyLocalVisualProductionMastersOptions {
  projectRootDirectory?: string;
  masterRootDirectory?: string;
  readMetadata?: ImageMetadataReader;
}

interface ExpectedMaster {
  logicalUri: string;
  relativePath: string;
  widthPx: number;
  heightPx: number;
  sha256: string;
}

function normalizePath(path: string): string {
  return path.replaceAll("\\", "/");
}

function isOutsideRoot(rootDirectory: string, targetPath: string): boolean {
  const relativePath = relative(rootDirectory, targetPath);
  return (
    relativePath === ".." ||
    relativePath.startsWith(`..${sep}`) ||
    isAbsolute(relativePath)
  );
}

function parseLocalMasterUri(logicalUri: string): string | null {
  if (!logicalUri.startsWith(localMasterUriPrefix)) return null;
  const relativePath = logicalUri.slice(localMasterUriPrefix.length);
  const segments = relativePath.split("/");
  if (
    relativePath.length === 0 ||
    relativePath.includes("\\") ||
    segments.some(
      (segment) => segment.length === 0 || segment === "." || segment === "..",
    )
  ) {
    return null;
  }
  return relativePath;
}

function expectedFormat(path: string): string | null {
  const extension = extname(path).toLowerCase();
  if (extension === ".jpg" || extension === ".jpeg") return "jpeg";
  if ([".avif", ".png", ".webp"].includes(extension)) {
    return extension.slice(1);
  }
  return null;
}

async function collectMasterFiles(
  rootDirectory: string,
  issues: LocalMasterVerificationIssue[],
): Promise<string[]> {
  const files: string[] = [];

  async function visit(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name, "en"));

    for (const entry of entries) {
      const absolutePath = join(directory, entry.name);
      const relativePath = normalizePath(relative(rootDirectory, absolutePath));
      if (entry.isSymbolicLink()) {
        issues.push({
          code: "symbolic-link",
          path: relativePath,
          message:
            "Local master inventory cannot contain symbolic links or junctions.",
        });
      } else if (entry.isDirectory()) {
        await visit(absolutePath);
      } else if (entry.isFile()) {
        files.push(relativePath);
      }
    }
  }

  await visit(rootDirectory);
  return files.sort((left, right) => left.localeCompare(right, "en"));
}

function sortIssues(
  issues: LocalMasterVerificationIssue[],
): LocalMasterVerificationIssue[] {
  return issues.sort((left, right) =>
    `${left.path}:${left.code}`.localeCompare(
      `${right.path}:${right.code}`,
      "en",
    ),
  );
}

export async function verifyLocalVisualProductionMasters(
  manifests: readonly VisualGraphRecord<AssetManifestData>[],
  options: VerifyLocalVisualProductionMastersOptions = {},
): Promise<LocalMasterVerificationResult> {
  const projectRootDirectory = resolve(
    options.projectRootDirectory ?? process.cwd(),
  );
  const rootDirectory = resolve(
    options.masterRootDirectory ??
      join(projectRootDirectory, ".local/visual-production/masters"),
  );
  const readMetadata = options.readMetadata ?? imageMetadata;
  const issues: LocalMasterVerificationIssue[] = [];
  const expectedByPath = new Map<string, ExpectedMaster>();
  const seenUris = new Set<string>();

  for (const manifest of [...manifests].sort((left, right) =>
    left.id.localeCompare(right.id, "en"),
  )) {
    for (const master of manifest.data.masterRenditions) {
      const relativePath = parseLocalMasterUri(master.logicalUri);
      if (relativePath === null) {
        issues.push({
          code: "invalid-master-uri",
          path: master.logicalUri,
          message: `${manifest.data.manifestId}/${master.usage} must use the approved project-local master URI root.`,
        });
        continue;
      }
      if (seenUris.has(master.logicalUri)) {
        issues.push({
          code: "duplicate-master-uri",
          path: master.logicalUri,
          message:
            "A local master logical URI must be referenced exactly once.",
        });
      }
      seenUris.add(master.logicalUri);

      const absolutePath = resolve(rootDirectory, ...relativePath.split("/"));
      if (isOutsideRoot(rootDirectory, absolutePath)) {
        issues.push({
          code: "invalid-master-uri",
          path: master.logicalUri,
          message: "A local master URI cannot escape the approved master root.",
        });
        continue;
      }
      const normalizedRelativePath = normalizePath(
        relative(rootDirectory, absolutePath),
      );
      if (expectedByPath.has(normalizedRelativePath)) {
        issues.push({
          code: "duplicate-master-path",
          path: normalizedRelativePath,
          message: "A local master file must be referenced exactly once.",
        });
        continue;
      }
      expectedByPath.set(normalizedRelativePath, {
        logicalUri: master.logicalUri,
        relativePath: normalizedRelativePath,
        widthPx: master.widthPx,
        heightPx: master.heightPx,
        sha256: master.sha256,
      });
    }
  }

  const directoryIssue = await inspectTrustedDirectoryChain(
    projectRootDirectory,
    rootDirectory,
  );
  if (directoryIssue !== null) {
    issues.push({
      code:
        directoryIssue.kind === "symbolic-link"
          ? "symbolic-link"
          : "master-root-error",
      path: directoryIssue.path,
      message: `Local master root is invalid: ${directoryIssue.kind}.`,
    });
    return {
      rootDirectory,
      verifiedFileCount: 0,
      issues: sortIssues(issues),
    };
  }

  const actualPaths = await collectMasterFiles(rootDirectory, issues);
  const actualPathSet = new Set(actualPaths);
  let verifiedFileCount = 0;

  for (const master of expectedByPath.values()) {
    if (!actualPathSet.has(master.relativePath)) {
      issues.push({
        code: "missing-master",
        path: master.relativePath,
        message: `Missing local master for ${master.logicalUri}.`,
      });
      continue;
    }

    const absolutePath = join(rootDirectory, ...master.relativePath.split("/"));
    const data = await readFile(absolutePath);
    const sha256 = createHash("sha256").update(data).digest("hex");
    if (sha256 !== master.sha256) {
      issues.push({
        code: "master-hash-mismatch",
        path: master.relativePath,
        message: `Expected SHA-256 ${master.sha256}, received ${sha256}.`,
      });
    }

    try {
      const metadata = await readMetadata(data, master.relativePath);
      if (
        metadata.width !== master.widthPx ||
        metadata.height !== master.heightPx
      ) {
        issues.push({
          code: "master-dimension-mismatch",
          path: master.relativePath,
          message: `Expected ${master.widthPx}x${master.heightPx}, received ${metadata.width}x${metadata.height}.`,
        });
      }
      const format = expectedFormat(master.relativePath);
      if (format === null || metadata.format !== format) {
        issues.push({
          code: "master-format-mismatch",
          path: master.relativePath,
          message: `File extension and decoded format do not match: ${metadata.format}.`,
        });
      }
    } catch (error) {
      issues.push({
        code: "master-metadata-error",
        path: master.relativePath,
        message:
          error instanceof Error
            ? error.message
            : "Unable to decode local master metadata.",
      });
    }

    verifiedFileCount += 1;
  }

  for (const actualPath of actualPaths) {
    if (!expectedByPath.has(actualPath)) {
      issues.push({
        code: "orphan-master",
        path: actualPath,
        message: "Local master file is not referenced by an Asset Manifest.",
      });
    }
  }

  return {
    rootDirectory,
    verifiedFileCount,
    issues: sortIssues(issues),
  };
}
