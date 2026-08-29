import {
  resolveCurrentAssetById,
  type ResolvedAssetRecord,
} from "./resolve-visual-assets";
import type { AssetManifestData, VisualRole } from "./visual-asset-schemas";

export interface ApprovedPageAssetExpectation {
  ownerType: AssetManifestData["ownerType"];
  ownerId: string;
  role: VisualRole;
  slotId: string;
  accessibilityMode?: AssetManifestData["accessibilityMode"];
}

export class PageAssetResolutionError extends Error {
  readonly code:
    | "unapproved-current-asset"
    | "page-asset-identity-mismatch"
    | "page-asset-accessibility-mismatch";

  constructor(code: PageAssetResolutionError["code"], message: string) {
    super(message);
    this.name = "PageAssetResolutionError";
    this.code = code;
  }
}

export function resolveApprovedPageAssetById(
  records: readonly ResolvedAssetRecord[],
  assetId: string,
  expectation: ApprovedPageAssetExpectation,
): ResolvedAssetRecord {
  // The base resolver selects current; page rendering adds approval and slot identity.
  const resolved = resolveCurrentAssetById(records, assetId);
  if (resolved.data.status !== "approved") {
    throw new PageAssetResolutionError(
      "unapproved-current-asset",
      `Current page asset ${assetId} is ${resolved.data.status}; expected approved.`,
    );
  }
  if (
    resolved.data.ownerType !== expectation.ownerType ||
    resolved.data.ownerId !== expectation.ownerId ||
    resolved.data.role !== expectation.role ||
    resolved.data.slotId !== expectation.slotId
  ) {
    throw new PageAssetResolutionError(
      "page-asset-identity-mismatch",
      `Current page asset ${assetId} does not match its requested owner and slot.`,
    );
  }
  if (
    expectation.accessibilityMode !== undefined &&
    resolved.data.accessibilityMode !== expectation.accessibilityMode
  ) {
    throw new PageAssetResolutionError(
      "page-asset-accessibility-mismatch",
      `Current page asset ${assetId} must use ${expectation.accessibilityMode} accessibility.`,
    );
  }
  return resolved;
}
