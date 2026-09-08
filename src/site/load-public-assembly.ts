import process from "node:process";
import { loadValidatedContentGraph } from "../content/load-validated-content-graph";
import { readBuildIntent } from "./build-intent";
import { createPublicAssembly } from "./public-assembly";
import {
  createConfiguredPublicSite,
  siteOriginEnvironmentVariable,
} from "./public-site";

export async function loadPublicAssembly() {
  if (readBuildIntent() !== "public")
    throw new Error("Public assembly requires explicit public intent.");
  const site = createConfiguredPublicSite(
    process.env[siteOriginEnvironmentVariable],
  );
  return createPublicAssembly(site, await loadValidatedContentGraph());
}
