import { spawnSync } from "node:child_process";
import { existsSync, lstatSync } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  createConfiguredPublicSite,
  siteOriginEnvironmentVariable,
} from "../src/site/public-site.ts";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [command, ...args] = process.argv.slice(2);
if (resolve(process.cwd()) !== projectRoot)
  throw new Error("Unexpected public build workspace.");
if (!["check", "build"].includes(command) || args.length !== 0)
  throw new Error(
    "Public runner accepts only check or build, without arguments.",
  );
if (
  process.env.MYTHIC_CHINA_BUILD_INTENT !== undefined &&
  process.env.MYTHIC_CHINA_BUILD_INTENT !== "public"
)
  throw new Error("Incompatible inherited build intent.");
createConfiguredPublicSite(process.env[siteOriginEnvironmentVariable]);
// Astro clears its output directory; reject links before it can traverse outside the workspace.
for (const path of [".local", ".local/public-build"]) {
  const target = resolve(projectRoot, path);
  let stat;
  try {
    stat = lstatSync(target);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (stat && (!stat.isDirectory() || stat.isSymbolicLink()))
    throw new Error(`Public build output must be a real directory: ${path}`);
}
const cli = resolve(projectRoot, "node_modules/astro/bin/astro.mjs");
if (!existsSync(cli))
  throw new Error("Astro CLI is not installed in this project.");
const result = spawnSync(process.execPath, [cli, command], {
  cwd: projectRoot,
  env: { ...process.env, MYTHIC_CHINA_BUILD_INTENT: "public" },
  stdio: "inherit",
});
if (result.error) throw result.error;
if (result.signal)
  throw new Error(`Public ${command} ended after signal ${result.signal}.`);
process.exitCode = result.status ?? 1;
