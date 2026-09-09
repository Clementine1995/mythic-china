/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Component tests compile Astro in memory without loading publishing hooks.
export default getViteConfig(
  { test: { environment: "node" } },
  { configFile: false, output: "static" },
);
