import { readdir } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import process from "node:process";

import { inspectTrustedDirectoryChain } from "./inspect-trusted-directory-chain";

export interface VisualRecordInventoryIssue {
  path: string;
  message: string;
}

const defaultProjectRoot = resolve(process.cwd());

function normalizePath(path: string): string {
  return path.replaceAll("\\", "/");
}

export async function loadVisualRecordInventory(
  projectRoot = defaultProjectRoot,
): Promise<readonly VisualRecordInventoryIssue[]> {
  const issues: VisualRecordInventoryIssue[] = [];

  async function inspectRoot(relativeRoot: string): Promise<void> {
    const absoluteRoot = resolve(projectRoot, relativeRoot);
    const directoryIssue = await inspectTrustedDirectoryChain(
      projectRoot,
      absoluteRoot,
    );
    if (directoryIssue?.kind === "outside-trusted-root") {
      issues.push({
        path: relativeRoot,
        message: "Visual record roots must remain inside the project root.",
      });
      return;
    }
    if (directoryIssue?.kind === "missing") {
      issues.push({
        path: directoryIssue.path,
        message: "Required visual record directory does not exist.",
      });
      return;
    }
    if (directoryIssue?.kind === "symbolic-link") {
      issues.push({
        path: directoryIssue.path,
        message:
          "Visual record paths cannot contain symbolic links or junctions.",
      });
      return;
    }
    if (directoryIssue?.kind === "not-directory") {
      issues.push({
        path: directoryIssue.path,
        message: "Visual record paths must contain only real directories.",
      });
      return;
    }

    async function visit(directory: string): Promise<void> {
      const entries = await readdir(directory, { withFileTypes: true });
      entries.sort((left, right) => left.name.localeCompare(right.name, "en"));
      for (const entry of entries) {
        const absolutePath = join(directory, entry.name);
        const relativePath = normalizePath(relative(projectRoot, absolutePath));
        if (entry.isSymbolicLink()) {
          issues.push({
            path: relativePath,
            message:
              "Visual record directories cannot contain symbolic links or junctions.",
          });
        } else if (entry.isDirectory()) {
          await visit(absolutePath);
        } else if (
          entry.isFile() &&
          entry.name !== ".gitkeep" &&
          extname(entry.name) !== ".yml"
        ) {
          issues.push({
            path: relativePath,
            message: "Visual record inventories only allow .yml files.",
          });
        }
      }
    }

    await visit(absoluteRoot);
  }

  await inspectRoot("visual/briefs");
  await inspectRoot("visual/manifests");
  await inspectRoot("visual/production-records");

  return [
    ...new Map(
      issues.map((issue) => [`${issue.path}\u0000${issue.message}`, issue]),
    ).values(),
  ].sort((left, right) =>
    `${left.path}\u0000${left.message}`.localeCompare(
      `${right.path}\u0000${right.message}`,
      "en",
    ),
  );
}
