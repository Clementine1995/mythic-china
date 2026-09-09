import { defineConfig } from "astro/config";
import process from "node:process";
import { readBuildIntent } from "./src/site/build-intent.ts";
import {
  createConfiguredPublicSite,
  siteOriginEnvironmentVariable,
} from "./src/site/public-site.ts";

const intent = readBuildIntent();
const site =
  intent === "public"
    ? createConfiguredPublicSite(process.env[siteOriginEnvironmentVariable])
    : null;

export default defineConfig({
  output: "static",
  outDir: intent === "public" ? "./.local/public-build" : "./dist",
  ...(site ? { site: site.origin } : {}),
  integrations: [
    {
      name: "mythic-china-build-routes",
      hooks: {
        "astro:config:setup": ({ injectRoute, injectScript }) => {
          if (intent === "review") {
            injectRoute({
              pattern: "/review/type-specimen",
              entrypoint: "./src/review/type-specimen.astro",
              prerender: true,
            });
          } else {
            injectScript(
              "page",
              'import "/src/client/analytics-bootstrap.ts";',
            );
            for (const filename of ["sitemap.xml", "rss.xml", "robots.txt"]) {
              injectRoute({
                pattern: `/${filename}`,
                entrypoint: `./src/site/endpoints/${filename}.ts`,
                prerender: true,
              });
            }
          }
        },
      },
    },
  ],
});
