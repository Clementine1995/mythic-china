import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { verifyLocalVisualProductionMasters } from "../../src/visual/verify-local-visual-production-masters";
import { makeManifestRecord } from "./fixtures";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("local visual production master verification", () => {
  it("verifies referenced files against declared hashes and dimensions", async () => {
    const projectRoot = await mkdtemp(
      join(tmpdir(), "mythic-china-u5-master-"),
    );
    temporaryDirectories.push(projectRoot);
    const masterRoot = join(
      projectRoot,
      ".local/visual-production/masters/zhong-kui/v1",
    );
    await mkdir(masterRoot, { recursive: true });
    const data = Buffer.from("synthetic-master");
    const sha256 = createHash("sha256").update(data).digest("hex");
    await writeFile(join(masterRoot, "hero.png"), data);

    const manifest = makeManifestRecord();
    manifest.data.masterRenditions = [
      {
        logicalUri:
          "project-local://mythic-china/.local/visual-production/masters/zhong-kui/v1/hero.png",
        usage: "hero-desktop",
        widthPx: 3200,
        heightPx: 1800,
        sha256,
      },
    ];

    const result = await verifyLocalVisualProductionMasters([manifest], {
      projectRootDirectory: projectRoot,
      readMetadata: async () => ({
        width: 3200,
        height: 1800,
        format: "png",
      }),
    });

    expect(result.verifiedFileCount).toBe(1);
    expect(result.issues).toEqual([]);
  });

  it("reports missing, orphaned, and mismatched masters deterministically", async () => {
    const projectRoot = await mkdtemp(
      join(tmpdir(), "mythic-china-u5-master-"),
    );
    temporaryDirectories.push(projectRoot);
    const masterRoot = join(
      projectRoot,
      ".local/visual-production/masters/zhong-kui/v1",
    );
    await mkdir(masterRoot, { recursive: true });
    await writeFile(join(masterRoot, "hero.png"), "changed-master");
    await writeFile(join(masterRoot, "orphan.png"), "orphan-master");

    const manifest = makeManifestRecord();
    manifest.data.masterRenditions = [
      {
        logicalUri:
          "project-local://mythic-china/.local/visual-production/masters/zhong-kui/v1/hero.png",
        usage: "hero-desktop",
        widthPx: 3200,
        heightPx: 1800,
        sha256: "a".repeat(64),
      },
      {
        logicalUri:
          "project-local://mythic-china/.local/visual-production/masters/zhong-kui/v1/missing.png",
        usage: "hero-mobile",
        widthPx: 1600,
        heightPx: 2000,
        sha256: "b".repeat(64),
      },
    ];

    const result = await verifyLocalVisualProductionMasters([manifest], {
      projectRootDirectory: projectRoot,
      readMetadata: async () => ({
        width: 1,
        height: 1,
        format: "webp",
      }),
    });

    expect(result.issues.map((issue) => issue.code)).toEqual([
      "master-dimension-mismatch",
      "master-format-mismatch",
      "master-hash-mismatch",
      "missing-master",
      "orphan-master",
    ]);
  });
});
