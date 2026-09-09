import type { BuildIntent } from "./build-intent";

// Enabling requires the account, Privacy and public-output gates to pass separately.
export const isNewsletterEnabled = false;

export interface NewsletterRenderingContext {
  buildIntent: BuildIntent;
  siteOrigin: string | undefined;
  isEnabled: boolean;
}

export function resolveNewsletterAction({
  buildIntent,
  siteOrigin,
  isEnabled,
}: NewsletterRenderingContext): string | null {
  if (
    !["review", "public"].includes(buildIntent) ||
    typeof isEnabled !== "boolean"
  ) {
    throw new Error("Newsletter requires an explicit build intent and flag.");
  }
  // Review never gains a form, including when the public switch is enabled.
  if (buildIntent === "review" || !isEnabled) return null;
  if (siteOrigin !== "https://mythic-china-beta.vercel.app") {
    throw new Error("Newsletter requires the approved public origin.");
  }
  return "https://buttondown.com/api/emails/embed-subscribe/mythicworld";
}
