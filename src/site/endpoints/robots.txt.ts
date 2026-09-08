import type { APIRoute } from "astro";
import { loadPublicAssembly } from "../load-public-assembly";

export const GET: APIRoute = async () =>
  new Response((await loadPublicAssembly()).robots, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
