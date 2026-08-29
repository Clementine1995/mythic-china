import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import process from "node:process";

import { afterEach, describe, expect, it } from "vitest";

import {
  loadImageMetadataRegistry,
  maximumRepositoryImageBytes,
} from "../../src/visual/load-image-metadata-registry";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("image metadata registry", () => {
  it("registers normalized paths, real hashes, dimensions, and stable order", async () => {
    const directory = await mkdtemp(join(tmpdir(), "mythic-china-u3-"));
    temporaryDirectories.push(directory);
    await mkdir(join(directory, "nested"));
    const firstBytes = Buffer.from("synthetic-png-fixture");
    await writeFile(join(directory, "z-image.png"), firstBytes);
    await writeFile(
      join(directory, "nested", "a-image.webp"),
      Buffer.from("synthetic-webp-fixture"),
    );
    await writeFile(join(directory, ".gitkeep"), "ignored");

    const registry = await loadImageMetadataRegistry({
      rootDirectory: directory,
      readMetadata: async (_data, sourcePath) =>
        sourcePath.endsWith("z-image.png")
          ? { width: 3200, height: 1800, format: "png" }
          : { width: 1600, height: 2000, format: "webp" },
    });

    expect([...registry.files.keys()]).toEqual([
      "src/assets/images/nested/a-image.webp",
      "src/assets/images/z-image.png",
    ]);
    expect(registry.files.get("src/assets/images/z-image.png")).toMatchObject({
      widthPx: 3200,
      heightPx: 1800,
      format: "png",
      sha256: createHash("sha256").update(firstBytes).digest("hex"),
      metadataError: null,
      forbiddenSignature: null,
    });
    expect(registry.rootError).toBeNull();
  });

  it("records forbidden model-like files without trying to decode them", async () => {
    const directory = await mkdtemp(join(tmpdir(), "mythic-china-u3-"));
    temporaryDirectories.push(directory);
    await writeFile(
      join(directory, "weights.gguf"),
      Buffer.from([0x47, 0x47, 0x55, 0x46, 0x00]),
    );
    let decoderCalled = false;

    const registry = await loadImageMetadataRegistry({
      rootDirectory: directory,
      readMetadata: async () => {
        decoderCalled = true;
        return { width: 1, height: 1, format: "png" };
      },
    });
    const metadata = registry.files.get("src/assets/images/weights.gguf");

    expect(decoderCalled).toBe(false);
    expect(metadata).toMatchObject({
      metadataError: "Forbidden GGUF model in repository image inventory.",
      forbiddenSignature: "GGUF model",
    });
  });

  it("checks size before decoding and recognizes modern pickle signatures", async () => {
    const directory = await mkdtemp(join(tmpdir(), "mythic-china-u3-"));
    temporaryDirectories.push(directory);
    await writeFile(
      join(directory, "oversized.png"),
      Buffer.alloc(maximumRepositoryImageBytes + 1),
    );
    await writeFile(
      join(directory, "model.png"),
      Buffer.from([0x80, 0x05, 0x00, 0x00]),
    );
    let decoderCalls = 0;

    const registry = await loadImageMetadataRegistry({
      rootDirectory: directory,
      readMetadata: async () => {
        decoderCalls += 1;
        return { width: 1, height: 1, format: "png" };
      },
    });

    expect(decoderCalls).toBe(0);
    expect(registry.files.get("src/assets/images/oversized.png")).toMatchObject(
      {
        sizeBytes: maximumRepositoryImageBytes + 1,
        sha256: null,
        metadataError: `Repository image exceeds the ${maximumRepositoryImageBytes} byte limit.`,
      },
    );
    expect(registry.files.get("src/assets/images/model.png")).toMatchObject({
      forbiddenSignature: "pickle/model payload",
    });
  });

  it("fails closed when the inventory root is a link", async () => {
    const directory = await mkdtemp(join(tmpdir(), "mythic-china-u3-"));
    temporaryDirectories.push(directory);
    const target = join(directory, "target");
    const linkedRoot = join(directory, "linked-images");
    await mkdir(target);
    await symlink(
      target,
      linkedRoot,
      process.platform === "win32" ? "junction" : "dir",
    );

    const registry = await loadImageMetadataRegistry({
      rootDirectory: linkedRoot,
    });

    expect(registry.rootError).toBe(
      "Repository image path cannot contain symbolic links or junctions.",
    );
    expect(registry.files.size).toBe(0);
  });

  it("fails closed when a parent of the inventory root is a link", async () => {
    const directory = await mkdtemp(join(tmpdir(), "mythic-china-u3-"));
    temporaryDirectories.push(directory);
    const target = join(directory, "target");
    await mkdir(join(directory, "src"));
    await mkdir(join(target, "images"), { recursive: true });
    await symlink(
      target,
      join(directory, "src", "assets"),
      process.platform === "win32" ? "junction" : "dir",
    );

    const registry = await loadImageMetadataRegistry({
      rootDirectory: join(directory, "src", "assets", "images"),
      trustedRootDirectory: directory,
    });

    expect(registry.rootError).toBe(
      "Repository image path cannot contain symbolic links or junctions.",
    );
    expect(registry.files.size).toBe(0);
  });
});
