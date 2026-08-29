import { describe, expect, it } from "vitest";

import {
  VisualAssetResolutionError,
  resolveCurrentAssetById,
  resolveCurrentAssetBySlot,
} from "../../src/visual/resolve-visual-assets";
import { makeDraftManifestData, makeManifestRecord } from "./fixtures";

describe("visual asset resolver", () => {
  it("resolves the explicit current version by asset ID and owner slot", () => {
    const versionOne = makeManifestRecord(
      makeDraftManifestData({ isCurrent: true }),
    );
    const versionTwo = makeManifestRecord(
      makeDraftManifestData({
        manifestId: "asset-zhong-kui-hero-primary-v2",
        version: 2,
        isCurrent: false,
      }),
    );
    const records = [versionTwo, versionOne];

    expect(
      resolveCurrentAssetById(records, versionOne.data.assetId)?.data.version,
    ).toBe(1);
    expect(
      resolveCurrentAssetBySlot(records, {
        ownerType: "entry",
        ownerId: "zhong-kui",
        role: "hero",
        slotId: "primary",
      })?.data.version,
    ).toBe(1);
  });

  it("returns none only for a missing optional slot", () => {
    expect(
      resolveCurrentAssetBySlot(
        [],
        {
          ownerType: "global",
          ownerId: "site-shell",
          role: "page-atmosphere",
          slotId: "primary",
        },
        { required: false },
      ),
    ).toBeUndefined();
  });

  it("fails required missing, duplicate current, and archived current", () => {
    expect(() => resolveCurrentAssetById([], "asset-missing")).toThrow(
      VisualAssetResolutionError,
    );

    const first = makeManifestRecord(
      makeDraftManifestData({ isCurrent: true }),
    );
    const second = makeManifestRecord(
      makeDraftManifestData({
        manifestId: "asset-zhong-kui-hero-primary-v2",
        version: 2,
        isCurrent: true,
      }),
    );
    expect(() =>
      resolveCurrentAssetById([first, second], "asset-zhong-kui-hero-primary"),
    ).toThrow(/2 current manifests/u);

    const archived = makeManifestRecord(
      makeDraftManifestData({ status: "archived", isCurrent: true }),
    );
    expect(() =>
      resolveCurrentAssetById([archived], archived.data.assetId),
    ).toThrow(/archived manifest/u);
  });
});
