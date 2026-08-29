import { lstat } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";

export type DirectoryChainIssueKind =
  | "outside-trusted-root"
  | "missing"
  | "symbolic-link"
  | "not-directory";

export interface DirectoryChainIssue {
  kind: DirectoryChainIssueKind;
  path: string;
}

function normalizePath(path: string): string {
  return path.replaceAll("\\", "/");
}

export async function inspectTrustedDirectoryChain(
  trustedRootDirectory: string,
  targetDirectory: string,
): Promise<DirectoryChainIssue | null> {
  const trustedRoot = resolve(trustedRootDirectory);
  const target = resolve(targetDirectory);
  const targetRelativePath = relative(trustedRoot, target);

  if (
    targetRelativePath === ".." ||
    targetRelativePath.startsWith(`..${sep}`) ||
    isAbsolute(targetRelativePath)
  ) {
    return {
      kind: "outside-trusted-root",
      path: normalizePath(targetRelativePath),
    };
  }

  const directories = [trustedRoot];
  let currentDirectory = trustedRoot;
  for (const segment of targetRelativePath.split(sep).filter(Boolean)) {
    currentDirectory = resolve(currentDirectory, segment);
    directories.push(currentDirectory);
  }

  for (const directory of directories) {
    const relativePath = normalizePath(relative(trustedRoot, directory)) || ".";
    try {
      const directoryStat = await lstat(directory);
      if (directoryStat.isSymbolicLink()) {
        return { kind: "symbolic-link", path: relativePath };
      }
      if (!directoryStat.isDirectory()) {
        return { kind: "not-directory", path: relativePath };
      }
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return { kind: "missing", path: relativePath };
      }
      throw error;
    }
  }

  return null;
}
