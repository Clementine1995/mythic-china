import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function readProjectFile(...segments: string[]): Promise<string> {
  return readFile(resolve(projectRoot, ...segments), "utf8");
}

function normalizeSource(source: string): string {
  return source.replace(/\s+/gu, " ");
}

describe("M5-U3 inert review interactions", () => {
  it("routes the Newsletter through the single Footer boundary", async () => {
    const [footer, newsletter] = await Promise.all([
      readProjectFile("src", "components", "SiteFooter.astro"),
      readProjectFile("src", "components", "NewsletterForm.astro"),
    ]);
    const newsletterSource = normalizeSource(newsletter);

    expect(footer).toContain(
      'import NewsletterForm from "./NewsletterForm.astro";',
    );
    expect(
      footer.match(/<NewsletterForm\s+\{\.\.\.newsletter\}\s*\/>/gu),
    ).toHaveLength(1);
    expect(newsletter).toContain('data-review-interaction="newsletter"');
    expect(newsletter).toContain(
      'data-review-state={action ? "active" : "inactive"}',
    );
    expect(newsletter).toContain('href="/privacy/"');
    expect(newsletterSource).toContain("new Mythic China stories");
    expect(newsletterSource).toContain("occasional editorial selections");
    expect(newsletterSource).toContain("no more than twice a month");
    expect(newsletterSource).toContain("subscriptions are not open");
    expect(newsletterSource).toContain(
      "We are not collecting email addresses here.",
    );
    expect(newsletter).not.toMatch(/<script\b|https?:\/\//iu);
  });

  it("keeps one inactive Reader Request after every Entry reading path", async () => {
    const [entryTemplate, readerRequest] = await Promise.all([
      readProjectFile("src", "templates", "EntryTemplate.astro"),
      readProjectFile("src", "components", "ReaderRequest.astro"),
    ]);
    const readerRequestSource = normalizeSource(readerRequest);

    expect(entryTemplate).toContain(
      'import ReaderRequest from "../components/ReaderRequest.astro";',
    );
    expect(
      entryTemplate.match(/<ReaderRequest pageId=\{entry\.id\}\s*\/>/gu),
    ).toHaveLength(1);
    expect(entryTemplate.lastIndexOf("<ReaderRequest")).toBeGreaterThan(
      entryTemplate.lastIndexOf("relatedEntries.length > 0"),
    );

    expect(readerRequest).toContain('data-review-interaction="reader-request"');
    expect(readerRequest).toContain('data-review-state="inactive"');
    expect(readerRequest).toContain("data-page-id={pageId}");
    expect(readerRequestSource).toContain(
      "No suggestions or email addresses are collected here.",
    );
    expect(readerRequest).toContain('href="/privacy/"');
    expect(readerRequest).not.toMatch(
      /<(?:form|input|button|select|textarea)\b|\baction=|https?:\/\//iu,
    );
  });

  it("publishes an honest review Privacy notice without live providers", async () => {
    const privacy = await readProjectFile("src", "pages", "privacy.astro");
    const privacySource = normalizeSource(privacy);

    expect(privacySource).toContain(
      "Mythic China is a site brand operated by hyc",
    );
    expect(privacySource).toContain("China");
    expect(privacySource).toContain("huyichen2019@gmail.com");
    expect(privacySource).toContain("60 days after a request is closed");
    expect(privacySource).toContain(
      "unless a longer retention period is required by law",
    );
    expect(privacySource).toContain("Google");
    expect(privacySource).toContain(
      "not currently accepting newsletter sign-ups",
    );
    expect(privacySource).toContain("not currently accepting Reader Requests");
    expect(privacySource).toContain("persistent Respondent ID");
    expect(privacySource).toContain("buttondown.com");
    expect(privacySource).toContain(
      "open and click tracking will remain off before the first send",
    );
    expect(privacySource).toContain("tally.so");
    expect(privacySource).toContain("Google Cloud Belgium");
    expect(privacySource).toContain("does not remove a Respondent ID");
    expect(privacySource).toContain("every 28 days");
    expect(privacySource).toContain(
      "delete records that are at least 60 days old",
    );
    expect(privacySource).toContain("empty Tally Trash in the same operation");
    expect(privacySource).toContain("60 to 88 days");
    expect(privacySource).toContain("sole operator is hyc");
    expect(privacySource).toContain("no independent backup");
    expect(privacySource).toContain(
      "a missed operation can extend that period",
    );
    expect(privacySource).toContain("GoatCounter is not enabled");
    expect(privacySource).toContain("mythic-china.goatcounter.com");
    expect(privacySource).toContain("counts, not identified readers");
    expect(privacySource).toContain(
      "account is configured for 90 days of aggregate retention",
    );
    expect(privacySource).toContain(
      "GoatCounter is enabled on our public site",
    );
    expect(privacySource).toContain("periodic cleanup");
    expect(privacySource).toContain("Global Privacy Control or Do Not Track");
    expect(privacy).not.toMatch(/<form\b|<script\b|mailto:|\baction=/iu);
    expect(privacy).not.toMatch(/\[(?:TODO|TBD|填写|待确认)\]/iu);
  });
});
