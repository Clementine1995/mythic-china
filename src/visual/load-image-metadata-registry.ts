import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { open, readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import process from "node:process";

import { imageMetadata } from "astro/assets/utils";

import { inspectTrustedDirectoryChain } from "./inspect-trusted-directory-chain";

const allowedImageExtensions = new Set([
  ".avif",
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
]);
export const maximumRepositoryImageBytes = 10 * 1024 * 1024;

export interface RepositoryImageMetadata {
  path: string;
  absolutePath: string;
  extension: string;
  sizeBytes: number;
  sha256: string | null;
  widthPx: number | null;
  heightPx: number | null;
  format: string | null;
  metadataError: string | null;
  forbiddenSignature: string | null;
}

export interface ImageMetadataRegistry {
  rootDirectory: string;
  rootError: string | null;
  files: ReadonlyMap<string, RepositoryImageMetadata>;
}

export interface ExtractedImageMetadata {
  width: number;
  height: number;
  format: string;
}

export type ImageMetadataReader = (
  data: Uint8Array,
  sourcePath: string,
) => Promise<ExtractedImageMetadata>;

export interface LoadImageMetadataRegistryOptions {
  rootDirectory?: string;
  trustedRootDirectory?: string;
  repositoryPrefix?: string;
  readMetadata?: ImageMetadataReader;
}

const defaultProjectRoot = resolve(process.cwd());
const defaultImageRoot = resolve(defaultProjectRoot, "src/assets/images");

function normalizePath(path: string): string {
  return path.replaceAll("\\", "/");
}

function detectForbiddenSignature(data: Uint8Array): string | null {
  const startsWith = (...bytes: number[]): boolean =>
    bytes.every((byte, index) => data[index] === byte);

  if (startsWith(0x47, 0x47, 0x55, 0x46)) return "GGUF model";
  if (startsWith(0x50, 0x4b, 0x03, 0x04)) return "ZIP/model archive";
  if (
    startsWith(0x80, 0x02) ||
    startsWith(0x80, 0x03) ||
    startsWith(0x80, 0x04) ||
    startsWith(0x80, 0x05)
  ) {
    return "pickle/model payload";
  }
  if (data.length > 9 && data[8] === 0x7b) {
    const headerLength = new DataView(
      data.buffer,
      data.byteOffset,
      Math.min(data.byteLength, 8),
    ).getBigUint64(0, true);
    if (headerLength > 0n && headerLength < 100_000_000n) {
      return "safetensors-like payload";
    }
  }

  return null;
}

async function readHeader(
  absolutePath: string,
  sizeBytes: number,
): Promise<Uint8Array> {
  const handle = await open(absolutePath, "r");
  try {
    const header = Buffer.alloc(Math.min(sizeBytes, 16));
    await handle.read(header, 0, header.length, 0);
    return header;
  } finally {
    await handle.close();
  }
}

interface InventoryEntry {
  absolutePath: string;
  isSymbolicLink: boolean;
}

async function listFiles(rootDirectory: string): Promise<InventoryEntry[]> {
  const files: InventoryEntry[] = [];

  async function visit(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name, "en"));

    for (const entry of entries) {
      const absolutePath = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(absolutePath);
      } else if (entry.isSymbolicLink()) {
        files.push({ absolutePath, isSymbolicLink: true });
      } else if (entry.isFile() && entry.name !== ".gitkeep") {
        files.push({ absolutePath, isSymbolicLink: false });
      }
    }
  }

  if (existsSync(rootDirectory)) {
    await visit(rootDirectory);
  }

  return files;
}

export async function loadImageMetadataRegistry(
  options: LoadImageMetadataRegistryOptions = {},
): Promise<ImageMetadataRegistry> {
  const rootDirectory = resolve(options.rootDirectory ?? defaultImageRoot);
  const trustedRootDirectory = resolve(
    options.trustedRootDirectory ??
      (options.rootDirectory === undefined
        ? defaultProjectRoot
        : rootDirectory),
  );
  const repositoryPrefix = normalizePath(
    options.repositoryPrefix ?? "src/assets/images",
  ).replace(/\/$/u, "");
  const readMetadata = options.readMetadata ?? imageMetadata;
  const registry = new Map<string, RepositoryImageMetadata>();
  let rootError: string | null = null;

  const directoryIssue = await inspectTrustedDirectoryChain(
    trustedRootDirectory,
    rootDirectory,
  );
  if (directoryIssue?.kind === "outside-trusted-root") {
    rootError = "Repository image root must remain inside its trusted root.";
  } else if (directoryIssue?.kind === "missing") {
    rootError = "Repository image root does not exist.";
  } else if (directoryIssue?.kind === "symbolic-link") {
    rootError =
      "Repository image path cannot contain symbolic links or junctions.";
  } else if (directoryIssue?.kind === "not-directory") {
    rootError = "Repository image path must contain only real directories.";
  }

  if (rootError !== null) {
    return { rootDirectory, rootError, files: registry };
  }

  for (const inventoryEntry of await listFiles(rootDirectory)) {
    const { absolutePath } = inventoryEntry;
    const relativePath = normalizePath(relative(rootDirectory, absolutePath));
    const repositoryPath = `${repositoryPrefix}/${relativePath}`;
    const extension = extname(absolutePath).toLowerCase();
    if (inventoryEntry.isSymbolicLink) {
      registry.set(repositoryPath, {
        path: repositoryPath,
        absolutePath,
        extension,
        sizeBytes: 0,
        sha256: null,
        widthPx: null,
        heightPx: null,
        format: null,
        metadataError: "Symbolic links are forbidden in src/assets/images/.",
        forbiddenSignature: null,
      });
      continue;
    }
    const fileStat = await stat(absolutePath);
    const canDecode =
      allowedImageExtensions.has(extension) &&
      fileStat.size <= maximumRepositoryImageBytes;
    const data = canDecode
      ? await readFile(absolutePath)
      : await readHeader(absolutePath, fileStat.size);
    const sha256 = canDecode
      ? createHash("sha256").update(data).digest("hex")
      : null;
    const forbiddenSignature = detectForbiddenSignature(data);
    let widthPx: number | null = null;
    let heightPx: number | null = null;
    let format: string | null = null;
    let metadataError: string | null = null;

    if (forbiddenSignature !== null) {
      metadataError = `Forbidden ${forbiddenSignature} in repository image inventory.`;
    } else if (!allowedImageExtensions.has(extension)) {
      metadataError = `Unsupported repository image extension: ${extension || "<none>"}`;
    } else if (fileStat.size > maximumRepositoryImageBytes) {
      metadataError = `Repository image exceeds the ${maximumRepositoryImageBytes} byte limit.`;
    } else {
      try {
        const metadata = await readMetadata(data, repositoryPath);
        widthPx = metadata.width;
        heightPx = metadata.height;
        format = metadata.format;
      } catch (error) {
        metadataError =
          error instanceof Error
            ? error.message
            : "Unable to extract image metadata.";
      }
    }

    registry.set(repositoryPath, {
      path: repositoryPath,
      absolutePath,
      extension,
      sizeBytes: fileStat.size,
      sha256,
      widthPx,
      heightPx,
      format,
      metadataError,
      forbiddenSignature,
    });
  }

  return {
    rootDirectory,
    rootError,
    files: registry,
  };
}
