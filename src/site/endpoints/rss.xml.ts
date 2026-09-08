import type { APIRoute } from "astro";
import { loadPublicAssembly } from "../load-public-assembly";

export const GET: APIRoute = async () =>
  new Response((await loadPublicAssembly()).rss, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
