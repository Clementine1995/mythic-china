import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import process from "node:process";

import { afterEach, describe, expect, it } from "vitest";

import { loadVisualRecordInventory } from "../../src/visual/load-visual-record-inventory";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

async function makeInventoryRoot(): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), "mythic-china-u3-"));
  temporaryDirectories.push(directory);
  await mkdir(join(directory, "visual", "briefs"), { recursive: true });
  await mkdir(join(directory, "visual", "manifests"), { recursive: true });
  await mkdir(join(directory, "visual", "production-records"), {
    recursive: true,
  });
  return directory;
}

describe("visual record inventory", () => {
  it("accepts YAML records and an empty manifest sentinel", async () => {
    const directory = await makeInventoryRoot();
    await writeFile(
      join(directory, "visual", "briefs", "brief-one.yml"),
      "briefId: brief-one\n",
    );
    await writeFile(join(directory, "visual", "manifests", ".gitkeep"), "");
    await writeFile(
      join(directory, "visual", "production-records", ".gitkeep"),
      "",
    );

    await expect(loadVisualRecordInventory(directory)).resolves.toEqual([]);
  });

  it("rejects linked roots, nested links, and ignored file extensions", async () => {
    const directory = await makeInventoryRoot();
    const linkedTarget = join(directory, "linked-target");
    await mkdir(linkedTarget);
    await symlink(
      linkedTarget,
      join(directory, "visual", "briefs", "linked-records"),
      process.platform === "win32" ? "junction" : "dir",
    );
    await writeFile(
      join(directory, "visual", "manifests", "ignored.yaml"),
      "manifestId: ignored\n",
    );
    await writeFile(
      join(directory, "visual", "production-records", "ignored.json"),
      "{}\n",
    );

    const issues = await loadVisualRecordInventory(directory);
    expect(issues.map((issue) => issue.message)).toEqual(
      expect.arrayContaining([
        "Visual record directories cannot contain symbolic links or junctions.",
        "Visual record inventories only allow .yml files.",
      ]),
    );

    const linkedRootParent = await mkdtemp(
      join(tmpdir(), "mythic-china-u3-linked-"),
    );
    temporaryDirectories.push(linkedRootParent);
    await mkdir(join(linkedRootParent, "visual"), { recursive: true });
    await symlink(
      join(directory, "visual", "briefs"),
      join(linkedRootParent, "visual", "briefs"),
      process.platform === "win32" ? "junction" : "dir",
    );
    await mkdir(join(linkedRootParent, "visual", "manifests"));
    await mkdir(join(linkedRootParent, "visual", "production-records"));

    await expect(loadVisualRecordInventory(linkedRootParent)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "visual/briefs",
          message:
            "Visual record paths cannot contain symbolic links or junctions.",
        }),
      ]),
    );

    const linkedParentRoot = await mkdtemp(
      join(tmpdir(), "mythic-china-u3-parent-linked-"),
    );
    temporaryDirectories.push(linkedParentRoot);
    await symlink(
      join(directory, "visual"),
      join(linkedParentRoot, "visual"),
      process.platform === "win32" ? "junction" : "dir",
    );

    await expect(loadVisualRecordInventory(linkedParentRoot)).resolves.toEqual([
      {
        path: "visual",
        message:
          "Visual record paths cannot contain symbolic links or junctions.",
      },
    ]);
  });
});
