import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
it.each([
  { args: ["dev"], origin: "https://mythic-china-beta.vercel.app" },
  { args: ["preview"], origin: "https://mythic-china-beta.vercel.app" },
  {
    args: ["build", "--outDir", "elsewhere"],
    origin: "https://mythic-china-beta.vercel.app",
  },
  { args: ["build"], origin: undefined },
  { args: ["build"], origin: "https://unapproved.vercel.app" },
  {
    args: ["build"],
    origin: "https://mythic-china-beta.vercel.app",
    intent: "review",
  },
])(
  "rejects public runner misuse before launching Astro: %j",
  ({ args, origin, intent }) => {
    const env = { ...process.env };
    delete env.MYTHIC_CHINA_SITE_ORIGIN;
    delete env.MYTHIC_CHINA_BUILD_INTENT;
    if (origin) env.MYTHIC_CHINA_SITE_ORIGIN = origin;
    if (intent) env.MYTHIC_CHINA_BUILD_INTENT = intent;
    const result = spawnSync(
      process.execPath,
      ["scripts/run-public-astro.mjs", ...args],
      { cwd: root, env, encoding: "utf8" },
    );
    expect(result.status).not.toBe(0);
    expect(result.stdout).not.toMatch(/build|astro/u);
  },
);
