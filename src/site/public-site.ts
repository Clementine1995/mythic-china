import { isIP } from "node:net";

export const siteOriginEnvironmentVariable = "MYTHIC_CHINA_SITE_ORIGIN";

export const publicSiteIdentity = {
  name: "Mythic China",
  publisher: {
    name: "Mythic China",
    type: "Organization",
    fragment: "publisher",
  },
  author: {
    name: "Mythic China Editorial",
    type: "Organization",
    fragment: "editorial",
  },
  aboutPath: "/about/",
} as const;

export interface PublicIdentityNode {
  id: string;
  name: string;
  type: "Organization";
  url: string;
}

export interface PublicSite {
  origin: string;
  rootUrl: string;
  name: string;
  publisher: PublicIdentityNode;
  author: PublicIdentityNode;
}

export class PublicSiteConfigurationError extends Error {
  readonly code: "missing-site-origin" | "invalid-site-origin";

  constructor(code: PublicSiteConfigurationError["code"], message: string) {
    super(message);
    this.name = "PublicSiteConfigurationError";
    this.code = code;
  }
}

function isReservedHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase();
  const addressCandidate =
    normalized.startsWith("[") && normalized.endsWith("]")
      ? normalized.slice(1, -1)
      : normalized;
  return (
    normalized.endsWith(".") ||
    normalized === "localhost" ||
    !normalized.includes(".") ||
    isIP(addressCandidate) !== 0 ||
    [
      ".localhost",
      ".local",
      ".invalid",
      ".test",
      ".example",
      ".example.com",
      ".example.net",
      ".example.org",
    ].some((suffix) => normalized.endsWith(suffix)) ||
    ["example.com", "example.net", "example.org"].includes(normalized)
  );
}

function parseSiteOrigin(value: string): URL {
  if (
    hasAsciiControlCharacter(value) ||
    !/^https:\/\/[^/?#:@\\]+\/?$/u.test(value)
  ) {
    throw new PublicSiteConfigurationError(
      "invalid-site-origin",
      `${siteOriginEnvironmentVariable} must be a real HTTPS origin without credentials, port, path, query, or hash.`,
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new PublicSiteConfigurationError(
      "invalid-site-origin",
      `${siteOriginEnvironmentVariable} must be an absolute HTTPS origin.`,
    );
  }

  if (
    parsed.protocol !== "https:" ||
    parsed.username !== "" ||
    parsed.password !== "" ||
    parsed.port !== "" ||
    parsed.pathname !== "/" ||
    parsed.search !== "" ||
    parsed.hash !== "" ||
    isReservedHostname(parsed.hostname)
  ) {
    throw new PublicSiteConfigurationError(
      "invalid-site-origin",
      `${siteOriginEnvironmentVariable} must be a real HTTPS origin without credentials, port, path, query, or hash.`,
    );
  }

  return parsed;
}

export function createPublicSite(value: string | undefined): PublicSite {
  if (value === undefined || value === "") {
    throw new PublicSiteConfigurationError(
      "missing-site-origin",
      `${siteOriginEnvironmentVariable} is required for public SEO output.`,
    );
  }
  if (value.trim() !== value) {
    throw new PublicSiteConfigurationError(
      "invalid-site-origin",
      `${siteOriginEnvironmentVariable} must not contain surrounding whitespace.`,
    );
  }

  const parsed = parseSiteOrigin(value);
  const origin = parsed.origin;
  const aboutUrl = new URL(publicSiteIdentity.aboutPath, `${origin}/`).href;

  return {
    origin,
    rootUrl: `${origin}/`,
    name: publicSiteIdentity.name,
    publisher: {
      id: `${aboutUrl}#${publicSiteIdentity.publisher.fragment}`,
      name: publicSiteIdentity.publisher.name,
      type: publicSiteIdentity.publisher.type,
      url: aboutUrl,
    },
    author: {
      id: `${aboutUrl}#${publicSiteIdentity.author.fragment}`,
      name: publicSiteIdentity.author.name,
      type: publicSiteIdentity.author.type,
      url: aboutUrl,
    },
  };
}

function hasAsciiControlCharacter(value: string): boolean {
  for (const character of value) {
    const codePoint = character.codePointAt(0);
    if (codePoint !== undefined && (codePoint <= 0x1f || codePoint === 0x7f)) {
      return true;
    }
  }
  return false;
}

export function createPublicUrl(site: PublicSite, path: string): string {
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\") ||
    path.includes("?") ||
    path.includes("#") ||
    hasAsciiControlCharacter(path)
  ) {
    throw new PublicSiteConfigurationError(
      "invalid-site-origin",
      `Public URL path must be root-relative: ${path}`,
    );
  }
  const url = new URL(path, site.rootUrl);
  if (url.origin !== site.origin || url.pathname !== path) {
    throw new PublicSiteConfigurationError(
      "invalid-site-origin",
      `Public URL escaped the configured origin: ${path}`,
    );
  }
  return url.href;
}
