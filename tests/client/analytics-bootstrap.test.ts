import { describe, expect, it, vi } from "vitest";
import { initializeSiteAnalytics } from "../../src/client/analytics-bootstrap";
import {
  analyticsSiteOrigin,
  analyticsEndpoint,
} from "../../src/site/analytics-configuration";

const configuration = {
  buildIntent: "public",
  isEnabled: true,
  origin: analyticsSiteOrigin,
  endpoint: analyticsEndpoint,
  publicPaths: ["/about/", "/explore/painted-skin/"],
  entryPaths: ["/explore/painted-skin/"],
};
function fixture(
  config: unknown = configuration,
  url = analyticsSiteOrigin + "/about/?email=private#secret",
  copies = 1,
  misplaced = false,
) {
  const head = {};
  const node = {
    parentNode: misplaced ? {} : head,
    getAttribute: (name: string) =>
      name === "content"
        ? typeof config === "string"
          ? config
          : JSON.stringify(config)
        : null,
  };
  const document = {
    head,
    querySelectorAll: (selector: string) =>
      selector === 'meta[name="mythic-china-analytics"]'
        ? Array.from({ length: copies }, () => node)
        : [],
    visibilityState: "visible",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  const view = {
    location: new URL(url),
    navigator: { webdriver: false },
    performance: { now: () => 0 },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    fetch: vi.fn<
      (url: string, options: RequestInit) => Promise<{ status: number }>
    >(async () => ({ status: 200 })),
  };
  return {
    view,
    document,
    start: () =>
      initializeSiteAnalytics(
        view as unknown as Window,
        document as unknown as Document,
      ),
  };
}
describe("analytics bootstrap", () => {
  it("initializes only once per document and starts a fresh document independently", () => {
    const f = fixture();
    f.start();
    f.start();
    expect(f.view.fetch).toHaveBeenCalledTimes(1);
    expect(f.view.addEventListener).toHaveBeenCalledTimes(4);
    expect(f.document.addEventListener).toHaveBeenCalledTimes(3);
    const fresh = fixture();
    fresh.start();
    expect(fresh.view.fetch).toHaveBeenCalledTimes(1);
    const request = new URL(f.view.fetch.mock.calls[0][0] as unknown as string);
    expect(request.searchParams.get("p")).toBe("/about/");
    expect(request.searchParams.has("email")).toBe(false);
  });
  it.each([
    { ...configuration, isEnabled: false },
    { ...configuration, isEnabled: "true" },
    { ...configuration, extra: "private" },
    { ...configuration, buildIntent: "review" },
    { ...configuration, endpoint: "https://another.goatcounter.com/count" },
    { ...configuration, publicPaths: ["/about/", "/about/"] },
    { ...configuration, entryPaths: ["/explore/missing/"] },
    "{",
    null,
  ])(
    "fails closed without listeners for invalid or disabled config %#",
    (config) => {
      const f = fixture(config);
      f.start();
      expect(f.view.fetch).not.toHaveBeenCalled();
      expect(f.view.addEventListener).not.toHaveBeenCalled();
      expect(f.document.addEventListener).not.toHaveBeenCalled();
    },
  );
  it.each([0, 2])("rejects %i configuration nodes", (copies) => {
    const f = fixture(configuration, undefined, copies);
    f.start();
    expect(f.view.fetch).not.toHaveBeenCalled();
  });
  it("rejects misplaced metadata and self-authorizing preview origins", () => {
    const misplaced = fixture(configuration, undefined, 1, true);
    misplaced.start();
    expect(misplaced.view.fetch).not.toHaveBeenCalled();
    const f = fixture(
      { ...configuration, origin: "https://preview.vercel.app" },
      "https://preview.vercel.app/about/",
    );
    f.start();
    expect(f.view.fetch).not.toHaveBeenCalled();
  });
  it.each([
    "http://localhost:4321/about/",
    "https://preview.vercel.app/about/",
    analyticsSiteOrigin + "/review/type-specimen/",
    analyticsSiteOrigin + "/explore/unpublished/",
  ])("does no work at %s", (url) => {
    const f = fixture(configuration, url);
    f.start();
    expect(f.view.fetch).not.toHaveBeenCalled();
    expect(f.view.addEventListener).not.toHaveBeenCalled();
  });
  it("does no work in an automated browser", () => {
    const f = fixture();
    f.view.navigator.webdriver = true;
    f.start();
    expect(f.view.fetch).not.toHaveBeenCalled();
  });
});
