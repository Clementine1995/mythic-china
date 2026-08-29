import type { AssetManifestData, VisualRole } from "./visual-asset-schemas";
import type { VisualGraphRecord } from "./validate-visual-asset-graph";

export type ResolvedAssetRecord = VisualGraphRecord<AssetManifestData>;

export interface ResolveAssetOptions {
  required?: boolean;
}

export interface AssetSlotSelector {
  ownerType: AssetManifestData["ownerType"];
  ownerId: string;
  role: VisualRole;
  slotId: string;
}

export class VisualAssetResolutionError extends Error {
  readonly code:
    | "missing-current-asset"
    | "duplicate-current-asset"
    | "archived-current-asset";
  readonly selector: string;

  constructor(
    code: VisualAssetResolutionError["code"],
    selector: string,
    message: string,
  ) {
    super(message);
    this.name = "VisualAssetResolutionError";
    this.code = code;
    this.selector = selector;
  }
}

function resolveCurrent(
  records: readonly ResolvedAssetRecord[],
  selector: string,
  options: ResolveAssetOptions,
): ResolvedAssetRecord | undefined {
  // Current is selected only by explicit isCurrent, never by highest version.
  const current = records.filter((record) => record.data.isCurrent);
  if (current.length === 0) {
    if (options.required ?? true) {
      throw new VisualAssetResolutionError(
        "missing-current-asset",
        selector,
        `${selector} has no explicit current manifest.`,
      );
    }
    return undefined;
  }
  if (current.length > 1) {
    throw new VisualAssetResolutionError(
      "duplicate-current-asset",
      selector,
      `${selector} has ${current.length} current manifests; expected one.`,
    );
  }

  const resolved = current[0];
  if (!resolved) return undefined;
  if (resolved.data.status === "archived") {
    throw new VisualAssetResolutionError(
      "archived-current-asset",
      selector,
      `${selector} resolves to archived manifest ${resolved.data.manifestId}.`,
    );
  }
  return resolved;
}

export function resolveCurrentAssetById(
  records: readonly ResolvedAssetRecord[],
  assetId: string,
): ResolvedAssetRecord {
  const resolved = resolveCurrent(
    records.filter((record) => record.data.assetId === assetId),
    `assetId:${assetId}`,
    { required: true },
  );
  if (!resolved) {
    throw new VisualAssetResolutionError(
      "missing-current-asset",
      `assetId:${assetId}`,
      `assetId:${assetId} has no explicit current manifest.`,
    );
  }
  return resolved;
}

export function resolveCurrentAssetBySlot(
  records: readonly ResolvedAssetRecord[],
  selector: AssetSlotSelector,
  options: ResolveAssetOptions = {},
): ResolvedAssetRecord | undefined {
  const selectorText = [
    selector.ownerType,
    selector.ownerId,
    selector.role,
    selector.slotId,
  ].join("/");

  return resolveCurrent(
    records.filter(
      (record) =>
        record.data.ownerType === selector.ownerType &&
        record.data.ownerId === selector.ownerId &&
        record.data.role === selector.role &&
        record.data.slotId === selector.slotId,
    ),
    `slot:${selectorText}`,
    options,
  );
}
