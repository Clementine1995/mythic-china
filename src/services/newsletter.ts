import { z } from "astro/zod";

const newsletterEmailSchema = z
  .email()
  .max(254)
  .refine(
    (value) => value.trim() === value,
    "Email must not contain surrounding whitespace.",
  );

export const newsletterSubmissionSchema = z.strictObject({
  email: newsletterEmailSchema,
});

export type NewsletterSubmission = z.infer<typeof newsletterSubmissionSchema>;

export type NewsletterAdapterResult =
  | { status: "accepted" }
  | { status: "validation-error" }
  | { status: "unavailable" }
  | { status: "rate-limited"; retryAfterSeconds: number | null }
  | { status: "unknown"; reason: "timeout" | "unknown-result" };

export interface NewsletterAdapter {
  submit(input: unknown): Promise<NewsletterAdapterResult>;
}

export class FakeNewsletterAdapter implements NewsletterAdapter {
  readonly #outcome: NewsletterAdapterResult;

  constructor(outcome: NewsletterAdapterResult = { status: "accepted" }) {
    this.#outcome = outcome;
  }

  submit(input: unknown): Promise<NewsletterAdapterResult> {
    if (!newsletterSubmissionSchema.safeParse(input).success) {
      return Promise.resolve({ status: "validation-error" });
    }
    return Promise.resolve({ ...this.#outcome });
  }
}
