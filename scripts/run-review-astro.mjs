import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const buildIntentVariable = "MYTHIC_CHINA_BUILD_INTENT";
const reviewBuildIntent = "review";
const allowedCommands = new Set(["build", "check", "dev", "preview"]);
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const astroCli = resolve(projectRoot, "node_modules/astro/bin/astro.mjs");
const [command, ...args] = process.argv.slice(2);

if (resolve(process.cwd()) !== projectRoot) {
  throw new Error(`Unexpected workspace: ${process.cwd()}`);
}
if (command === undefined || !allowedCommands.has(command)) {
  throw new Error(
    `Expected one Astro command: ${[...allowedCommands].join(", ")}.`,
  );
}
if (!existsSync(astroCli)) {
  throw new Error(`Astro CLI not found: ${astroCli}`);
}

const inheritedIntent = process.env[buildIntentVariable];
if (inheritedIntent !== undefined && inheritedIntent !== reviewBuildIntent) {
  throw new Error(
    `${buildIntentVariable} is already set to an incompatible value: ${inheritedIntent}`,
  );
}

// Scope the review intent to the Astro child; the caller's environment is unchanged.
const result = spawnSync(process.execPath, [astroCli, command, ...args], {
  cwd: projectRoot,
  env: {
    ...process.env,
    [buildIntentVariable]: reviewBuildIntent,
  },
  stdio: "inherit",
});

if (result.error !== undefined) throw result.error;
if (result.signal !== null) {
  throw new Error(`Astro ${command} ended after signal ${result.signal}.`);
}
process.exitCode = result.status ?? 1;
