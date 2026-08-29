import { describe, expect, it } from "vitest";

import {
  PageAssetResolutionError,
  resolveApprovedPageAssetById,
} from "../../src/visual/resolve-approved-page-asset";
import {
  makeApprovedHeroManifestData,
  makeDraftManifestData,
  makeManifestRecord,
} from "./fixtures";

const expectation = {
  ownerType: "entry",
  ownerId: "zhong-kui",
  role: "hero",
  slotId: "primary",
  accessibilityMode: "informative",
} as const;

describe("approved page asset resolver", () => {
  it("resolves only the explicit approved current version", () => {
    const history = makeManifestRecord(
      makeApprovedHeroManifestData({ isCurrent: false }),
    );
    const current = makeManifestRecord(
      makeApprovedHeroManifestData({
        manifestId: "asset-zhong-kui-hero-primary-v2",
        version: 2,
      }),
    );

    expect(
      resolveApprovedPageAssetById(
        [history, current],
        "asset-zhong-kui-hero-primary",
        expectation,
      ).data.manifestId,
    ).toBe("asset-zhong-kui-hero-primary-v2");
  });

  it("rejects an unapproved current asset", () => {
    const current = makeManifestRecord(
      makeDraftManifestData({ isCurrent: true }),
    );

    expect(() =>
      resolveApprovedPageAssetById(
        [current],
        "asset-zhong-kui-hero-primary",
        expectation,
      ),
    ).toThrow(PageAssetResolutionError);
  });

  it("rejects an owner, slot, or accessibility mismatch", () => {
    const current = makeManifestRecord();

    expect(() =>
      resolveApprovedPageAssetById([current], "asset-zhong-kui-hero-primary", {
        ...expectation,
        ownerId: "another-entry",
      }),
    ).toThrow(PageAssetResolutionError);
    expect(() =>
      resolveApprovedPageAssetById([current], "asset-zhong-kui-hero-primary", {
        ...expectation,
        role: "lead",
      }),
    ).toThrow(PageAssetResolutionError);
    expect(() =>
      resolveApprovedPageAssetById([current], "asset-zhong-kui-hero-primary", {
        ...expectation,
        slotId: "secondary",
      }),
    ).toThrow(PageAssetResolutionError);
    expect(() =>
      resolveApprovedPageAssetById([current], "asset-zhong-kui-hero-primary", {
        ...expectation,
        accessibilityMode: "decorative",
      }),
    ).toThrow(PageAssetResolutionError);
  });
});
