import type {
  ClaimData,
  CollectionData,
  EntryData,
  SourceData,
  TerminologyData,
} from "../../src/content/content-schemas";
import type {
  ContentGraph,
  ContentGraphEntryRecord,
  ContentGraphRecord,
} from "../../src/content/validate-content-graph";

export function makeEntryData(overrides: Partial<EntryData> = {}): EntryData {
  return {
    entryId: "zhong-kui",
    slug: "zhong-kui",
    title: "Zhong Kui, the Demon Queller",
    subtitle: null,
    entryType: "figure",
    traditionType: null,
    nameZh: "钟馗",
    pinyin: "Zhōng Kuí",
    aliases: [],
    opening: [],
    summary: null,
    periodLabel: null,
    earliestKnownSourceId: null,
    earliestKnownClaimId: null,
    sourceIds: [],
    claimIds: [],
    terminologyRecordIds: [],
    relatedEntryIds: [],
    heroAssetId: null,
    publishedAt: null,
    updatedAt: null,
    lastFactCheckedAt: null,
    status: "draft",
    ...overrides,
  };
}

export function makeCollectionData(
  overrides: Partial<CollectionData> = {},
): CollectionData {
  return {
    collectionId: "chinese-underworld",
    slug: "chinese-underworld",
    title: "The Chinese Underworld",
    titleZh: "中国阴间",
    pinyin: "Zhōngguó yīnjiān",
    description:
      "A guided exploration of changing Chinese ideas about realms of the dead.",
    featuredEntryId: "zhong-kui",
    entryIds: ["chinese-underworld-guide", "zhong-kui"],
    status: "draft",
    heroAssetId: null,
    ...overrides,
  };
}

export function makeSourceData(
  overrides: Partial<SourceData> = {},
): SourceData {
  return {
    sourceId: "source-one",
    sourceType: "primary-text",
    title: "Source One",
    titleZh: null,
    titleZhLang: null,
    authorOrOrganization: null,
    publicationOrEdition: "Example critical edition",
    editionBasisOrObjectId: null,
    originalPeriod: null,
    publicationYear: null,
    url: null,
    accessedAt: null,
    language: "zh",
    translator: null,
    pageOrSection: null,
    rightsStatus: null,
    rightsUrl: null,
    notes: null,
    ...overrides,
  };
}

export function makeClaimData(overrides: Partial<ClaimData> = {}): ClaimData {
  return {
    claimId: "claim-one",
    entryId: "zhong-kui",
    claimType: "textual",
    evidenceContext: "historical-tradition",
    statement: "A bounded test statement.",
    certainty: "verified",
    sourceLinks: [
      {
        sourceId: "source-one",
        role: "primary",
        locator: "chapter 1",
        note: "Supports only this bounded test statement.",
      },
    ],
    ...overrides,
  };
}

export function makeTerminologyData(
  overrides: Partial<TerminologyData> = {},
): TerminologyData {
  return {
    termId: "term-one",
    entryId: "zhong-kui",
    hanzi: "鬼",
    pinyin: "guǐ",
    sourceContext: "Source One, chapter 1",
    chosenEnglish: "ghost",
    firstUseGloss: "a context-specific term for a ghost",
    alternativesRejected: [],
    rationale:
      "The fixture tests graph relationships, not a public translation.",
    sourceIds: ["source-one"],
    reviewStatus: "draft",
    ...overrides,
  };
}

export function makeEntryRecord(
  data: EntryData,
  overrides: Partial<ContentGraphEntryRecord> = {},
): ContentGraphEntryRecord {
  return {
    id: data.entryId,
    filePath: `src/content/entries/${data.entryId}.md`,
    data,
    body: "",
    ...overrides,
  };
}

export function makeRecord<TData>(
  id: string,
  directory: string,
  data: TData,
  overrides: Partial<ContentGraphRecord<TData>> = {},
): ContentGraphRecord<TData> {
  return {
    id,
    filePath: `src/content/${directory}/${id}.yml`,
    data,
    ...overrides,
  };
}

export function makeDraftGraph(): ContentGraph {
  const zhongKui = makeEntryData();
  const guide = makeEntryData({
    entryId: "chinese-underworld-guide",
    slug: "chinese-underworld-guide",
    title: "Chinese Underworld Guide (Working Draft)",
    entryType: "guide",
    nameZh: null,
    pinyin: null,
  });
  const collection = makeCollectionData();

  return {
    entries: [makeEntryRecord(zhongKui), makeEntryRecord(guide)],
    collections: [
      makeRecord(collection.collectionId, "collections", collection),
    ],
    sources: [],
    claims: [],
    terminology: [],
  };
}
