import type { APIRoute } from "astro";
import { loadPublicAssembly } from "../load-public-assembly";

export const GET: APIRoute = async () =>
  new Response((await loadPublicAssembly()).sitemap, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
