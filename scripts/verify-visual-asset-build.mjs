import { mkdtemp, readFile, rm } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { build } from "astro";
import { imageMetadata } from "astro/assets/utils";

import { inspectTrustedDirectoryChain } from "../src/visual/inspect-trusted-directory-chain.ts";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
if (resolve(process.cwd()) !== projectRoot) {
  throw new Error(`Unexpected workspace: ${process.cwd()}`);
}

const temporaryParentDirectory = join(projectRoot, ".local/visual-production");
const temporaryParentIssue = await inspectTrustedDirectoryChain(
  projectRoot,
  temporaryParentDirectory,
);
if (temporaryParentIssue !== null) {
  throw new Error(
    `Unsafe visual build directory (${temporaryParentIssue.kind}): ${temporaryParentIssue.path}`,
  );
}

const temporaryRoot = await mkdtemp(
  join(temporaryParentDirectory, "m3-build-check-"),
);
const outputDirectory = join(temporaryRoot, "dist");
const cacheDirectory = join(temporaryRoot, "astro-cache");
const viteCacheDirectory = join(temporaryRoot, "vite-cache");
const verificationRoute = "/__m3-visual-asset-build-verification";
const buildIntentVariable = "MYTHIC_CHINA_BUILD_INTENT";
const previousBuildIntent = process.env[buildIntentVariable];

const verificationIntegration = {
  name: "mythic-china-m3-visual-build-verification",
  hooks: {
    "astro:config:setup": ({ injectRoute }) => {
      injectRoute({
        pattern: verificationRoute,
        entrypoint: new URL(
          "./visual-asset-build-verification.astro",
          import.meta.url,
        ),
        prerender: true,
      });
    },
  },
};

function isOutsideRoot(rootDirectory, targetPath) {
  const relativePath = relative(rootDirectory, targetPath);
  return (
    relativePath === ".." ||
    relativePath.startsWith(`..${sep}`) ||
    isAbsolute(relativePath)
  );
}

try {
  // This isolated M3 build must satisfy review build intent and is never deployable.
  process.env[buildIntentVariable] = "review";
  await build({
    root: projectRoot,
    outDir: outputDirectory,
    cacheDir: cacheDirectory,
    vite: { cacheDir: viteCacheDirectory },
    integrations: [verificationIntegration],
  });

  const verificationHtml = await readFile(
    join(outputDirectory, verificationRoute.slice(1), "index.html"),
    "utf8",
  );
  const resultMatch = verificationHtml.match(
    /<script[^>]*data-m3-visual-build-results[^>]*>([\s\S]*?)<\/script>/u,
  );
  if (resultMatch?.[1] === undefined) {
    throw new Error("Visual build result payload was not emitted.");
  }

  const result = JSON.parse(resultMatch[1]);
  if (
    !Number.isInteger(result.manifestCount) ||
    result.manifestCount < 1 ||
    !Number.isInteger(result.masterCount) ||
    result.masterCount < 1 ||
    !Number.isInteger(result.responsiveRenditionCount) ||
    result.responsiveRenditionCount < 1 ||
    !Array.isArray(result.generatedOutputs) ||
    result.generatedOutputs.length < 1
  ) {
    throw new Error("Visual build result payload is incomplete.");
  }

  const seenOutputs = new Set();
  for (const output of result.generatedOutputs) {
    if (
      !Number.isInteger(output.widthPx) ||
      !Number.isInteger(output.sourceWidthPx) ||
      output.widthPx > output.sourceWidthPx ||
      !["avif", "webp"].includes(output.format) ||
      typeof output.url !== "string"
    ) {
      throw new Error(
        `Invalid responsive output contract: ${JSON.stringify(output)}`,
      );
    }

    const outputUrl = new URL(output.url, "https://mythic-china.local");
    const outputPath = resolve(
      outputDirectory,
      decodeURIComponent(outputUrl.pathname).replace(/^\/+/, ""),
    );
    if (isOutsideRoot(outputDirectory, outputPath)) {
      throw new Error(
        `Generated output escaped the build directory: ${output.url}`,
      );
    }
    const outputData = await readFile(outputPath);
    const metadata = await imageMetadata(outputData, outputPath);
    if (
      metadata.width !== output.widthPx ||
      metadata.format !== output.format
    ) {
      throw new Error(
        `Generated output metadata mismatch for ${output.url}: expected ${output.widthPx}px ${output.format}, received ${metadata.width}px ${metadata.format}.`,
      );
    }

    const outputKey = [
      output.manifestId,
      output.usage,
      output.format,
      output.widthPx,
    ].join(":");
    if (seenOutputs.has(outputKey)) {
      throw new Error(`Duplicate responsive output: ${outputKey}`);
    }
    seenOutputs.add(outputKey);
  }

  process.stdout.write(
    `Verified ${result.masterCount} local masters and ${result.generatedOutputs.length} responsive AVIF/WebP outputs from ${result.responsiveRenditionCount} repository renditions.\n`,
  );
} finally {
  // Do not leak the temporary build intent into later commands in this process.
  if (previousBuildIntent === undefined) {
    delete process.env[buildIntentVariable];
  } else {
    process.env[buildIntentVariable] = previousBuildIntent;
  }
  await rm(temporaryRoot, { recursive: true, force: true });
}
