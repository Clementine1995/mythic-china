import { experimental_AstroContainer } from "astro/container";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import NewsletterForm from "../../src/components/NewsletterForm.astro";
import SiteFooter from "../../src/components/SiteFooter.astro";
import {
  isNewsletterEnabled,
  resolveNewsletterAction,
  type NewsletterRenderingContext,
} from "../../src/site/newsletter-configuration";
import {
  htmlElements,
  htmlAttribute,
  htmlText,
} from "../../scripts/public-output-policy.mjs";
import {
  assertReviewHtmlResourcePolicy,
  assertPublicHtmlResourcePolicy,
} from "../../scripts/review-output-policy.mjs";

const publicContext: NewsletterRenderingContext = {
  buildIntent: "public",
  siteOrigin: "https://mythic-china-beta.vercel.app",
  isEnabled: true,
};
const expectedAction =
  "https://buttondown.com/api/emails/embed-subscribe/mythicworld";
const fetchTrap = vi.fn(() => {
  throw new Error("Newsletter component tests must not access the network.");
});

beforeEach(() => {
  fetchTrap.mockClear();
  vi.stubGlobal("fetch", fetchTrap);
});
afterEach(() => {
  expect(fetchTrap).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
});

async function renderNewsletter(props: NewsletterRenderingContext) {
  const container = await experimental_AstroContainer.create();
  return container.renderToString(NewsletterForm, { props: { ...props } });
}

function documentHtml(body: string, intent: "review" | "public") {
  const robots = intent === "public" ? "index, follow" : "noindex, nofollow";
  return `<!doctype html><html><head><meta name="robots" content="${robots}"></head><body>${body}</body></html>`;
}

describe("Newsletter rendering boundaries", () => {
  it("keeps the actual build switch disabled", () => {
    expect(isNewsletterEnabled).toBe(false);
  });

  it.each([
    { ...publicContext, isEnabled: isNewsletterEnabled },
    { ...publicContext, buildIntent: "review", isEnabled: false },
    { ...publicContext, buildIntent: "review", isEnabled: true },
  ] as NewsletterRenderingContext[])(
    "emits no form or endpoint for $buildIntent / $isEnabled",
    async (context) => {
      const html = await renderNewsletter(context);
      expect(html).toContain('data-review-state="inactive"');
      expect(html).toContain("Newsletter subscriptions are not open yet.");
      expect(html).toContain("We are not collecting email addresses here.");
      expect(html).not.toMatch(
        /<(?:form|input|button|script|iframe)\b|\baction=|buttondown/iu,
      );
      expect(() =>
        assertReviewHtmlResourcePolicy(
          documentHtml(html, "review"),
          "index.html",
        ),
      ).not.toThrow();
      expect(() =>
        assertPublicHtmlResourcePolicy(
          documentHtml(html, "public"),
          "index.html",
        ),
      ).not.toThrow();
    },
  );

  it.each([
    undefined,
    "http://mythic-china-beta.vercel.app",
    "https://mythic-china-beta.vercel.app/",
    "https://mythic-china-preview.vercel.app",
    "http://localhost:4321",
    "https://mythic-china-beta.vercel.app?enabled=true",
  ])(
    "rejects an enabled form for an unapproved origin: %s",
    async (siteOrigin) => {
      await expect(
        renderNewsletter({ ...publicContext, siteOrigin }),
      ).rejects.toThrow("approved public origin");
    },
  );

  it.each([
    { ...publicContext, buildIntent: "preview" },
    { ...publicContext, buildIntent: undefined },
    { ...publicContext, isEnabled: "true" },
    { ...publicContext, isEnabled: undefined },
  ])("rejects malformed rendering decisions", (context) => {
    expect(() =>
      resolveNewsletterAction(context as NewsletterRenderingContext),
    ).toThrow("explicit build intent and flag");
  });

  it("renders the real form with only email and adjacent confirmation/privacy copy", async () => {
    const html = await renderNewsletter(publicContext);
    const elements = htmlElements(html);
    const forms = elements.filter((node) => node.tagName === "form");
    expect(forms).toHaveLength(1);
    expect(htmlAttribute(forms[0], "action")).toBe(expectedAction);
    expect(htmlAttribute(forms[0], "method")).toBe("post");
    expect(htmlAttribute(forms[0], "accept-charset")).toBe("UTF-8");
    const inputs = elements.filter((node) => node.tagName === "input");
    expect(inputs).toHaveLength(1);
    const input = inputs[0];
    expect(htmlAttribute(input, "type")).toBe("email");
    expect(htmlAttribute(input, "name")).toBe("email");
    expect(htmlAttribute(input, "required")).toBe("");
    expect(htmlAttribute(input, "maxlength")).toBe("254");
    expect(htmlAttribute(input, "autocomplete")).toBe("email");
    expect(
      elements.filter((node) => htmlAttribute(node, "name") !== undefined),
    ).toEqual(inputs);
    const labels = elements.filter((node) => node.tagName === "label");
    expect(labels).toHaveLength(1);
    expect(htmlAttribute(labels[0], "for")).toBe(htmlAttribute(input, "id"));
    expect(htmlText(labels[0])).toBe("Email address");
    const buttons = elements.filter((node) => node.tagName === "button");
    expect(buttons).toHaveLength(1);
    expect(htmlAttribute(buttons[0], "type")).toBe("submit");
    expect(htmlText(buttons[0])).toBe("Subscribe");
    const privacy = elements.find(
      (node) =>
        htmlAttribute(node, "id") ===
        htmlAttribute(forms[0], "aria-describedby"),
    );
    expect(privacy).toBeDefined();
    const copy = htmlText(privacy).replace(/\s+/gu, " ");
    expect(copy).toContain("Buttondown processes your email address.");
    expect(copy).toContain("Check your inbox to confirm your subscription.");
    expect(copy).toContain("You can unsubscribe at any time.");
    expect(html).toContain('href="/privacy/"');
    expect(html.replace(/\s+/gu, " ")).toContain("no more than twice a month");
    expect(html).not.toMatch(
      /<script\b|<iframe\b|\bon\w+=|\bformaction=|\bnovalidate|successfully subscribed/iu,
    );
  });

  it("passes configuration through the real Footer and blocks active output from release", async () => {
    const container = await experimental_AstroContainer.create();
    const html = await container.renderToString(SiteFooter, {
      props: { showPublicBeta: true, newsletter: publicContext },
    });
    const elements = htmlElements(html);
    expect(elements.filter((node) => node.tagName === "footer")).toHaveLength(
      1,
    );
    const forms = elements.filter((node) => node.tagName === "form");
    expect(forms).toHaveLength(1);
    let ancestor = forms[0].parentNode;
    while (ancestor && ancestor.tagName !== "footer")
      ancestor = ancestor.parentNode;
    expect(ancestor?.tagName).toBe("footer");
    expect(htmlAttribute(forms[0], "action")).toBe(expectedAction);
    expect(() =>
      assertReviewHtmlResourcePolicy(
        documentHtml(html, "review"),
        "index.html",
      ),
    ).toThrow("forbidden <form>");
    expect(() =>
      assertPublicHtmlResourcePolicy(
        documentHtml(html, "public"),
        "index.html",
      ),
    ).toThrow("forbidden <form>");
  });
});
