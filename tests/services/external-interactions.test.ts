import { describe, expect, it, vi } from "vitest";

import {
  analyticsEventSchema,
  type AnalyticsAdapterResult,
  FakeAnalyticsAdapter,
  normalizeAnalyticsRecord,
} from "../../src/services/analytics";
import {
  FakeNewsletterAdapter,
  type NewsletterAdapterResult,
  newsletterSubmissionSchema,
} from "../../src/services/newsletter";
import {
  FakeReaderRequestAdapter,
  type ReaderRequestAdapterResult,
  readerRequestSubmissionSchema,
  validateReaderRequestRecord,
  validateReaderRequestSubmission,
} from "../../src/services/reader-request";
import { createPublicSite } from "../../src/site/public-site";

const publishedEntryIds = new Set(["zhong-kui"]);
const newsletterSubmission = { email: "reader@example.test" };
const readerRequestSubmission = {
  pageId: "zhong-kui",
  requestedTopic: "A short reader suggestion",
} as const;
const emailAt254Characters = `${"a".repeat(64)}@${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(61)}`;
const emailAt255Characters = `${emailAt254Characters}d`;
const publicSite = createPublicSite("https://mythic-china-fixture.vercel.app");
const analyticsRecord = {
  event: { name: "related_story_click" },
  pageUrl: "https://mythic-china-fixture.vercel.app/explore/zhong-kui/",
  referrer: null,
} as const;

describe("newsletter interaction contract", () => {
  it("accepts only the provider-neutral email DTO", () => {
    expect(newsletterSubmissionSchema.parse(newsletterSubmission)).toEqual(
      newsletterSubmission,
    );
    expect(emailAt254Characters).toHaveLength(254);
    expect(
      newsletterSubmissionSchema.safeParse({ email: emailAt254Characters })
        .success,
    ).toBe(true);

    for (const invalid of [
      {},
      { email: "not-an-email" },
      { email: " reader@example.test" },
      { email: emailAt255Characters },
      { ...newsletterSubmission, embed: "1" },
      { ...newsletterSubmission, name: "Reader" },
    ]) {
      expect(newsletterSubmissionSchema.safeParse(invalid).success).toBe(false);
    }
  });

  it("returns every Fake outcome without adding provider behavior", async () => {
    const outcomes: NewsletterAdapterResult[] = [
      { status: "accepted" },
      { status: "validation-error" },
      { status: "unavailable" },
      { status: "rate-limited", retryAfterSeconds: 60 },
      { status: "unknown", reason: "timeout" },
      { status: "unknown", reason: "unknown-result" },
    ];

    for (const outcome of outcomes) {
      await expect(
        new FakeNewsletterAdapter(outcome).submit(newsletterSubmission),
      ).resolves.toEqual(outcome);
    }
  });

  it("fails validation without returning the submitted email", async () => {
    const privateEmail = "private-address@example.test";
    const result = await new FakeNewsletterAdapter().submit({
      email: privateEmail,
      trackingId: "not-allowed",
    });

    expect(result).toEqual({ status: "validation-error" });
    expect(JSON.stringify(result)).not.toContain(privateEmail);
  });
});

describe("Reader Request interaction contract", () => {
  it("validates an allowlisted submission and trims the topic", () => {
    const result = validateReaderRequestSubmission(
      { ...readerRequestSubmission, requestedTopic: "  Three Kingdoms  " },
      publishedEntryIds,
    );

    expect(result).toEqual({
      success: true,
      data: {
        ...readerRequestSubmission,
        requestedTopic: "Three Kingdoms",
      },
    });
  });

  it("counts Unicode code points after trimming at both boundaries", () => {
    for (const requestedTopic of ["玄武神", "𠮷".repeat(3), "神".repeat(240)]) {
      expect(
        readerRequestSubmissionSchema.safeParse({
          ...readerRequestSubmission,
          requestedTopic,
        }).success,
      ).toBe(true);
    }

    for (const requestedTopic of ["神".repeat(2), "神".repeat(241), "   "]) {
      expect(
        readerRequestSubmissionSchema.safeParse({
          ...readerRequestSubmission,
          requestedTopic,
        }).success,
      ).toBe(false);
    }
  });

  it.each([
    [null, false, true],
    ["reader@example.test", true, true],
    [emailAt254Characters, true, true],
    [emailAt255Characters, true, false],
    [null, true, false],
    ["reader@example.test", false, false],
    ["", true, false],
    [" reader@example.test", true, false],
  ])(
    "enforces the email/consent pair for email %s and consent %s",
    (email, emailConsent, expected) => {
      expect(
        readerRequestSubmissionSchema.safeParse({
          ...readerRequestSubmission,
          email,
          emailConsent,
        }).success,
      ).toBe(expected);
    },
  );

  it("allows both optional fields to be omitted and rejects either field alone", () => {
    expect(
      readerRequestSubmissionSchema.safeParse(readerRequestSubmission).success,
    ).toBe(true);

    for (const incompletePair of [
      { email: null },
      { email: "reader@example.test" },
      { emailConsent: false },
      { emailConsent: true },
    ]) {
      expect(
        readerRequestSubmissionSchema.safeParse({
          ...readerRequestSubmission,
          ...incompletePair,
        }).success,
      ).toBe(false);
    }
  });

  it("rejects unknown pages, malformed IDs, and provider-only browser fields", () => {
    expect(
      validateReaderRequestSubmission(
        { ...readerRequestSubmission, pageId: "unpublished-entry" },
        publishedEntryIds,
      ),
    ).toEqual({ success: false });
    expect(
      validateReaderRequestSubmission(
        { ...readerRequestSubmission, pageId: "Not A Stable ID" },
        publishedEntryIds,
      ),
    ).toEqual({ success: false });

    for (const providerField of [
      { requestId: "provider-id" },
      { createdAt: "2026-09-02T12:00:00Z" },
      { status: "new" },
      { normalizedTopicId: null },
      { respondentId: "persistent-provider-id" },
    ]) {
      expect(
        readerRequestSubmissionSchema.safeParse({
          ...readerRequestSubmission,
          ...providerField,
        }).success,
      ).toBe(false);
    }
  });

  it("keeps the provider/internal Record strict and separately trusted", () => {
    const record = {
      requestId: "provider-generated-id",
      ...readerRequestSubmission,
      email: null,
      emailConsent: false,
      createdAt: "2026-09-02T12:00:00.123Z",
      status: "new",
      normalizedTopicId: null,
    } as const;

    expect(validateReaderRequestRecord(record, publishedEntryIds)).toEqual({
      success: true,
      data: record,
    });

    for (const invalid of [
      { ...record, createdAt: "2026-09-02" },
      { ...record, createdAt: "2026-02-30T12:00:00Z" },
      { ...record, createdAt: new Date("2026-09-02T12:00:00Z") },
      { ...record, status: "reviewed" },
      { ...record, normalizedTopicId: "topic-one" },
      { ...record, respondentId: "persistent-provider-id" },
      { ...record, pageId: "unpublished-entry" },
      { ...record, email: null, emailConsent: true },
      { ...record, email: emailAt255Characters, emailConsent: true },
    ]) {
      expect(validateReaderRequestRecord(invalid, publishedEntryIds)).toEqual({
        success: false,
      });
    }
  });

  it("returns every Fake outcome and redacts rejected values", async () => {
    const outcomes: ReaderRequestAdapterResult[] = [
      { status: "accepted" },
      { status: "validation-error" },
      { status: "unavailable" },
      { status: "rate-limited", retryAfterSeconds: null },
      { status: "unknown", reason: "timeout" },
      { status: "unknown", reason: "unknown-result" },
    ];

    for (const outcome of outcomes) {
      await expect(
        new FakeReaderRequestAdapter(publishedEntryIds, outcome).submit(
          readerRequestSubmission,
        ),
      ).resolves.toEqual(outcome);
    }

    const privateTopic = "My private unpublished story idea";
    const privateEmail = "private-address@example.test";
    const rejected = await new FakeReaderRequestAdapter(
      publishedEntryIds,
    ).submit({
      ...readerRequestSubmission,
      pageId: "unpublished-entry",
      requestedTopic: privateTopic,
      email: privateEmail,
      emailConsent: true,
    });
    const serialized = JSON.stringify(rejected);

    expect(rejected).toEqual({ status: "validation-error" });
    expect(serialized).not.toContain(privateTopic);
    expect(serialized).not.toContain(privateEmail);
  });
});

describe("analytics interaction contract", () => {
  it("allows only the three property-free product events", () => {
    for (const name of [
      "article_session_qualified",
      "article_depth_75",
      "related_story_click",
    ]) {
      expect(analyticsEventSchema.safeParse({ name }).success).toBe(true);
    }

    for (const invalid of [
      { name: "outbound_recommendation_click" },
      { name: "newsletter_submit_success" },
      { name: "reader_request_submit_success" },
      { name: "related_story_click", properties: {} },
      { name: "related_story_click", email: "reader@example.test" },
      { name: "related_story_click", pageId: "zhong-kui" },
      { name: "related_story_click", sessionId: "stable-session" },
    ]) {
      expect(analyticsEventSchema.safeParse(invalid).success).toBe(false);
    }
  });

  it("removes query, hash, and referrer details from the envelope", () => {
    expect(
      normalizeAnalyticsRecord(
        {
          event: { name: "related_story_click" },
          pageUrl:
            "https://mythic-china-fixture.vercel.app/explore/zhong-kui/?campaign=private#sources",
          referrer:
            "https://search.example.test/results?q=private-reader-query",
        },
        publicSite,
      ),
    ).toEqual({
      success: true,
      data: {
        event: { name: "related_story_click" },
        envelope: {
          url: "https://mythic-china-fixture.vercel.app/explore/zhong-kui/",
          referrer: null,
        },
      },
    });
  });

  it("rejects unsafe origins, credentials, unknown fields, and PII properties", () => {
    for (const invalid of [
      { ...analyticsRecord, pageUrl: "not-a-url" },
      {
        ...analyticsRecord,
        pageUrl: "http://mythic-china-fixture.vercel.app/explore/zhong-kui/",
      },
      {
        ...analyticsRecord,
        pageUrl: "https://other.example.test/explore/zhong-kui/",
      },
      {
        ...analyticsRecord,
        pageUrl:
          "https://user:secret@mythic-china-fixture.vercel.app/explore/zhong-kui/",
      },
      {
        ...analyticsRecord,
        pageUrl: " https://mythic-china-fixture.vercel.app/explore/zhong-kui/",
      },
      { ...analyticsRecord, token: "private-token" },
      {
        ...analyticsRecord,
        event: {
          name: "related_story_click",
          properties: { email: "reader@example.test" },
        },
      },
    ]) {
      expect(normalizeAnalyticsRecord(invalid, publicSite)).toEqual({
        success: false,
      });
    }
  });

  it("returns every Fake outcome without exposing rejected envelope data", async () => {
    const outcomes: AnalyticsAdapterResult[] = [
      { status: "recorded" },
      { status: "validation-error" },
      { status: "unavailable" },
      { status: "rate-limited", retryAfterSeconds: 30 },
      { status: "unknown", reason: "timeout" },
      { status: "unknown", reason: "unknown-result" },
    ];

    for (const outcome of outcomes) {
      await expect(
        new FakeAnalyticsAdapter(publicSite, outcome).record(analyticsRecord),
      ).resolves.toEqual(outcome);
    }

    const privateToken = "private-campaign-token";
    const rejected = await new FakeAnalyticsAdapter(publicSite).record({
      ...analyticsRecord,
      token: privateToken,
    });

    expect(rejected).toEqual({ status: "validation-error" });
    expect(JSON.stringify(rejected)).not.toContain(privateToken);
  });
});

describe("Fake adapter isolation", () => {
  it("keeps every result path free of network access and logging", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      throw new Error("Fake adapters must not access the network.");
    });
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const infoSpy = vi
      .spyOn(console, "info")
      .mockImplementation(() => undefined);
    const warnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    try {
      const newsletterOutcomes: NewsletterAdapterResult[] = [
        { status: "accepted" },
        { status: "validation-error" },
        { status: "unavailable" },
        { status: "rate-limited", retryAfterSeconds: 60 },
        { status: "unknown", reason: "timeout" },
        { status: "unknown", reason: "unknown-result" },
      ];
      const requestOutcomes: ReaderRequestAdapterResult[] = [
        { status: "accepted" },
        { status: "validation-error" },
        { status: "unavailable" },
        { status: "rate-limited", retryAfterSeconds: null },
        { status: "unknown", reason: "timeout" },
        { status: "unknown", reason: "unknown-result" },
      ];
      const analyticsOutcomes: AnalyticsAdapterResult[] = [
        { status: "recorded" },
        { status: "validation-error" },
        { status: "unavailable" },
        { status: "rate-limited", retryAfterSeconds: 30 },
        { status: "unknown", reason: "timeout" },
        { status: "unknown", reason: "unknown-result" },
      ];

      for (const outcome of newsletterOutcomes) {
        await new FakeNewsletterAdapter(outcome).submit(newsletterSubmission);
      }
      for (const outcome of requestOutcomes) {
        await new FakeReaderRequestAdapter(publishedEntryIds, outcome).submit(
          readerRequestSubmission,
        );
      }
      for (const outcome of analyticsOutcomes) {
        await new FakeAnalyticsAdapter(publicSite, outcome).record(
          analyticsRecord,
        );
      }

      await new FakeNewsletterAdapter().submit({
        email: "private@example.test",
        token: "private-token",
      });
      await new FakeReaderRequestAdapter(publishedEntryIds).submit({
        ...readerRequestSubmission,
        pageId: "unpublished-entry",
        requestedTopic: "private suggestion",
      });
      await new FakeAnalyticsAdapter(publicSite).record({
        ...analyticsRecord,
        token: "private-token",
      });

      expect(fetchSpy).not.toHaveBeenCalled();
      for (const consoleSpy of [logSpy, infoSpy, warnSpy, errorSpy]) {
        expect(consoleSpy).not.toHaveBeenCalled();
      }
    } finally {
      fetchSpy.mockRestore();
      logSpy.mockRestore();
      infoSpy.mockRestore();
      warnSpy.mockRestore();
      errorSpy.mockRestore();
    }
  });
});
