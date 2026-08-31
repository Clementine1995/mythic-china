import { describe, expect, it } from "vitest";

import {
  claimSchema,
  contentStatuses,
  entrySchema,
  sourceSchema,
  type ClaimData,
  type SourceData,
} from "../../src/content/content-schemas";
import {
  ContentGraphValidationError,
  isCollectionEntryStatusAllowed,
  validateContentGraph,
  type ContentGraph,
  type ContentGraphIssue,
} from "../../src/content/validate-content-graph";
import {
  makeClaimData,
  makeCollectionData,
  makeDraftGraph,
  makeEntryData,
  makeEntryRecord,
  makeRecord,
  makeSourceData,
  makeTerminologyData,
} from "./fixtures";

function issuesFrom(graph: ContentGraph): readonly ContentGraphIssue[] {
  try {
    validateContentGraph(graph);
  } catch (error) {
    if (error instanceof ContentGraphValidationError) {
      return error.issues;
    }
    throw error;
  }

  throw new Error("Expected content graph validation to fail.");
}

function issueCodes(graph: ContentGraph): string[] {
  return issuesFrom(graph).map((issue) => issue.code);
}

const eightyWordSummary = Array.from(
  { length: 80 },
  (_, index) => `word${index + 1}`,
).join(" ");

function makeReadyEvidenceGraph(options: {
  source: SourceData;
  role: ClaimData["sourceLinks"][number]["role"];
  evidenceContext: ClaimData["evidenceContext"];
}): ContentGraph {
  const source = sourceSchema.parse(options.source);
  const claim = claimSchema.parse(
    makeClaimData({
      evidenceContext: options.evidenceContext,
      sourceLinks: [
        {
          sourceId: source.sourceId,
          role: options.role,
          locator: "bounded locator",
          note: "Supports only the bounded fixture statement.",
        },
      ],
    }),
  );
  const entry = entrySchema.parse(
    makeEntryData({
      traditionType: "folklore",
      opening: ["A bounded editorial opening."],
      summary: eightyWordSummary,
      sourceIds: [source.sourceId],
      claimIds: [claim.claimId],
      heroAssetId: "asset-one",
      lastFactCheckedAt: "2026-08-27",
      status: "ready",
    }),
  );

  return {
    entries: [makeEntryRecord(entry, { body: "Visible editorial body." })],
    collections: [],
    sources: [makeRecord(source.sourceId, "sources", source)],
    claims: [makeRecord(claim.claimId, "claims", claim)],
    terminology: [],
  };
}

describe("validateContentGraph", () => {
  it("accepts the real draft graph, sorts records, and preserves editorial order", () => {
    const result = validateContentGraph(makeDraftGraph());

    expect(result.entries.map((entry) => entry.id)).toEqual([
      "chinese-underworld-guide",
      "zhong-kui",
    ]);
    expect(result.collections[0]?.data.entryIds).toEqual([
      "chinese-underworld-guide",
      "zhong-kui",
    ]);
  });

  it.each([
    ["entry", "loader-record-id-mismatch", "data.entryId"],
    ["collection", "loader-record-id-mismatch", "data.collectionId"],
    ["source", "loader-record-id-mismatch", "data.sourceId"],
    ["claim", "loader-record-id-mismatch", "data.claimId"],
    ["terminology", "loader-record-id-mismatch", "data.termId"],
  ] as const)(
    "checks filename, loader, and %s record IDs",
    (kind, code, expectedPath) => {
      const graph = makeDraftGraph();

      if (kind === "entry") {
        const data = makeEntryData({ entryId: "declared-entry" });
        graph.entries = [
          makeEntryRecord(data, {
            id: "loader-entry",
            filePath: "src/content/entries/file-entry.md",
          }),
        ];
        graph.collections = [];
      } else if (kind === "collection") {
        const data = makeCollectionData({
          collectionId: "declared-collection",
          featuredEntryId: null,
          entryIds: [],
        });
        graph.collections = [
          makeRecord("loader-collection", "collections", data, {
            filePath: "src/content/collections/file-collection.yml",
          }),
        ];
      } else if (kind === "source") {
        const data = makeSourceData({ sourceId: "declared-source" });
        graph.sources = [
          makeRecord("loader-source", "sources", data, {
            filePath: "src/content/sources/file-source.yml",
          }),
        ];
      } else if (kind === "claim") {
        const data = makeClaimData({ claimId: "declared-claim" });
        graph.claims = [
          makeRecord("loader-claim", "claims", data, {
            filePath: "src/content/claims/file-claim.yml",
          }),
        ];
      } else {
        const data = makeTerminologyData({ termId: "declared-term" });
        graph.terminology = [
          makeRecord("loader-term", "terminology", data, {
            filePath: "src/content/terminology/file-term.yml",
          }),
        ];
      }

      const issues = issuesFrom(graph);
      expect(issues.map((issue) => issue.code)).toContain(code);
      expect(issues.map((issue) => issue.code)).toContain(
        "file-record-id-mismatch",
      );
      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ code, path: expectedPath }),
        ]),
      );
    },
  );

  it("rejects IDs and slugs reused across object types", () => {
    const graph = makeDraftGraph();
    const source = makeSourceData({ sourceId: "zhong-kui" });
    const collection = graph.collections[0];
    if (!collection) throw new Error("Missing fixture Collection.");
    collection.data.slug = "zhong-kui";
    graph.sources = [makeRecord("zhong-kui", "sources", source)];

    expect(issueCodes(graph)).toEqual(
      expect.arrayContaining(["duplicate-global-id", "duplicate-global-slug"]),
    );
    expect(issuesFrom(graph)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "duplicate-global-id",
          objectType: "source",
          path: "data.sourceId",
        }),
      ]),
    );
  });

  it("reports dangling Entry and Collection relationships with field paths", () => {
    const graph = makeDraftGraph();
    const entry = graph.entries[0];
    const collection = graph.collections[0];
    if (!entry || !collection) throw new Error("Missing graph fixtures.");

    entry.data.sourceIds = ["missing-source"];
    entry.data.claimIds = ["missing-claim"];
    entry.data.terminologyRecordIds = ["missing-term"];
    entry.data.relatedEntryIds = ["missing-entry"];
    collection.data.entryIds = ["missing-entry"];
    collection.data.featuredEntryId = "missing-featured";

    const issues = issuesFrom(graph);
    expect(issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining([
        "dangling-source",
        "dangling-claim",
        "dangling-terminology",
        "dangling-related-entry",
        "dangling-collection-entry",
        "dangling-featured-entry",
        "featured-entry-not-member",
      ]),
    );
    expect(issues.some((issue) => issue.path.includes("sourceIds[0]"))).toBe(
      true,
    );
  });

  it("enforces the owning Entry declared by referenced Claims and terminology", () => {
    const graph = makeDraftGraph();
    const source = makeSourceData();
    const claim = makeClaimData({ entryId: "chinese-underworld-guide" });
    const term = makeTerminologyData({
      entryId: "chinese-underworld-guide",
    });
    const entry = graph.entries.find((record) => record.id === "zhong-kui");
    if (!entry) throw new Error("Missing Zhong Kui fixture.");
    entry.data.claimIds = [claim.claimId];
    entry.data.terminologyRecordIds = [term.termId];
    graph.sources = [makeRecord(source.sourceId, "sources", source)];
    graph.claims = [makeRecord(claim.claimId, "claims", claim)];
    graph.terminology = [makeRecord(term.termId, "terminology", term)];

    expect(issueCodes(graph)).toEqual(
      expect.arrayContaining([
        "claim-owner-mismatch",
        "terminology-owner-mismatch",
      ]),
    );
  });

  it("accepts bounded earliest-known evidence and rejects incomplete evidence", () => {
    const graph = makeDraftGraph();
    const entry = graph.entries.find((record) => record.id === "zhong-kui");
    if (!entry) throw new Error("Missing Zhong Kui fixture.");

    const primary = makeSourceData();
    const scholarship = makeSourceData({
      sourceId: "scholarship-one",
      sourceType: "scholarship",
      title: "Scholarship One",
      authorOrOrganization: "Example Scholar",
      publicationYear: 2024,
      language: "en",
    });
    const claim = makeClaimData({
      claimType: "historical",
      evidenceContext: "historical-tradition",
      statement:
        "Source One is the earliest securely located source within this fixture's stated research boundary.",
      sourceLinks: [
        {
          sourceId: "source-one",
          role: "primary",
          locator: "chapter 1",
          note: "Primary locator for the bounded claim.",
        },
        {
          sourceId: "scholarship-one",
          role: "scholarship",
          locator: "pages 1–10",
          note: "Supports dating and the stated research boundary.",
        },
      ],
    });
    entry.data.sourceIds = ["source-one", "scholarship-one"];
    entry.data.claimIds = ["claim-one"];
    entry.data.earliestKnownSourceId = "source-one";
    entry.data.earliestKnownClaimId = "claim-one";
    graph.sources = [
      makeRecord(primary.sourceId, "sources", primary),
      makeRecord(scholarship.sourceId, "sources", scholarship),
    ];
    graph.claims = [makeRecord(claim.claimId, "claims", claim)];

    expect(() => validateContentGraph(graph)).not.toThrow();

    entry.data.earliestKnownClaimId = "missing-claim";
    expect(issueCodes(graph)).toContain("dangling-earliest-claim");
    entry.data.earliestKnownClaimId = "claim-one";

    const primaryLink = claim.sourceLinks[0];
    const scholarshipLink = claim.sourceLinks[1];
    if (!primaryLink || !scholarshipLink) {
      throw new Error("Missing earliest-known evidence links.");
    }

    claim.sourceLinks = [
      primaryLink,
      { ...scholarshipLink, sourceId: primary.sourceId },
    ];
    expect(issueCodes(graph)).toContain("unsupported-earliest-source");

    claim.sourceLinks = [primaryLink, scholarshipLink];
    scholarship.sourceType = "primary-text";
    expect(issueCodes(graph)).toContain("unsupported-earliest-source");

    scholarship.sourceType = "scholarship";
    primary.sourceType = "scholarship";
    expect(issueCodes(graph)).toContain("unsupported-earliest-source");

    primary.sourceType = "fieldwork-or-community-archive";
    primary.authorOrOrganization = "Example Community Archive";
    claim.sourceLinks = [
      { ...primaryLink, role: "fieldwork" },
      scholarshipLink,
    ];
    expect(() => validateContentGraph(graph)).not.toThrow();

    primary.sourceType = "primary-text";
    claim.sourceLinks = [primaryLink];
    expect(issueCodes(graph)).toContain("unsupported-earliest-source");

    const decoyClaim = makeClaimData({
      claimId: "claim-two",
      claimType: "historical",
      evidenceContext: "historical-tradition",
      statement:
        "A different Claim has complete evidence but is not the selected earliest-known Claim.",
      sourceLinks: [primaryLink, scholarshipLink],
    });
    entry.data.claimIds = [claim.claimId, decoyClaim.claimId];
    graph.claims = [
      makeRecord(claim.claimId, "claims", claim),
      makeRecord(decoyClaim.claimId, "claims", decoyClaim),
    ];
    expect(issueCodes(graph)).toContain("unsupported-earliest-source");

    entry.data.earliestKnownClaimId = decoyClaim.claimId;
    expect(() => validateContentGraph(graph)).not.toThrow();
  });

  it("implements the exact Collection-to-Entry status matrix", () => {
    const allowed: Record<string, readonly string[]> = {
      draft: [
        "draft",
        "editorial-review",
        "visual-review",
        "ready",
        "published",
      ],
      "editorial-review": [
        "draft",
        "editorial-review",
        "visual-review",
        "ready",
        "published",
      ],
      "visual-review": [
        "draft",
        "editorial-review",
        "visual-review",
        "ready",
        "published",
      ],
      ready: ["ready", "published"],
      published: ["published"],
      archived: ["published", "archived"],
    };

    for (const collectionStatus of contentStatuses) {
      for (const entryStatus of contentStatuses) {
        expect(
          isCollectionEntryStatusAllowed(collectionStatus, entryStatus),
          `${collectionStatus} -> ${entryStatus}`,
        ).toBe(allowed[collectionStatus]?.includes(entryStatus) ?? false);
      }
    }
  });

  it("rejects duplicate Collection members and a Featured Entry outside the list", () => {
    const graph = makeDraftGraph();
    const collection = graph.collections[0];
    if (!collection) throw new Error("Missing Collection fixture.");
    collection.data.entryIds = ["zhong-kui", "zhong-kui"];
    collection.data.featuredEntryId = "chinese-underworld-guide";

    expect(issueCodes(graph)).toEqual(
      expect.arrayContaining([
        "duplicate-collection-member",
        "featured-entry-not-member",
      ]),
    );
  });

  it("blocks unverified ready evidence", () => {
    const graph = makeDraftGraph();
    const entry = graph.entries.find((record) => record.id === "zhong-kui");
    if (!entry) throw new Error("Missing Zhong Kui fixture.");
    const source = makeSourceData();
    const claimSource = makeSourceData({
      sourceId: "claim-source",
      title: "Claim Source",
    });
    const terminologySource = makeSourceData({
      sourceId: "terminology-source",
      title: "Terminology Source",
    });
    const claim = makeClaimData({
      certainty: "provisional",
      sourceLinks: [
        {
          sourceId: claimSource.sourceId,
          role: "primary",
          locator: "chapter 1",
          note: "Supports only the bounded fixture claim.",
        },
      ],
    });
    const term = makeTerminologyData({
      sourceIds: [terminologySource.sourceId],
    });

    entry.data.status = "ready";
    entry.data.sourceIds = [source.sourceId];
    entry.data.claimIds = [claim.claimId];
    entry.data.terminologyRecordIds = [term.termId];
    entry.body = "Editorial body.";
    graph.sources = [
      makeRecord(source.sourceId, "sources", source),
      makeRecord(claimSource.sourceId, "sources", claimSource),
      makeRecord(terminologySource.sourceId, "sources", terminologySource),
    ];
    graph.claims = [makeRecord(claim.claimId, "claims", claim)];
    graph.terminology = [makeRecord(term.termId, "terminology", term)];

    expect(issueCodes(graph)).toEqual(
      expect.arrayContaining([
        "provisional-ready-claim",
        "unapproved-ready-terminology",
        "unlisted-claim-source",
        "unlisted-terminology-source",
      ]),
    );

    entry.data.status = "draft";
    expect(() => validateContentGraph(graph)).not.toThrow();
  });

  it("blocks unresolved Chinese Source title language at ready lineage", () => {
    const graph = makeReadyEvidenceGraph({
      source: makeSourceData({
        titleZh: "示例来源",
        titleZhLang: "zh",
      }),
      role: "primary",
      evidenceContext: "historical-tradition",
    });

    expect(issueCodes(graph)).toContain(
      "unresolved-ready-source-title-language",
    );

    const entry = graph.entries[0];
    const source = graph.sources[0];
    if (!entry || !source) throw new Error("Missing ready locale fixtures.");

    entry.data.status = "editorial-review";
    expect(() => validateContentGraph(graph)).not.toThrow();

    entry.data.status = "ready";
    source.data.titleZhLang = "zh-Hans";
    expect(() => validateContentGraph(graph)).not.toThrow();
  });

  it("requires visible editorial Markdown instead of comment-only body", () => {
    const graph = makeDraftGraph();
    const entry = graph.entries[0];
    if (!entry) throw new Error("Missing Entry fixture.");
    entry.data.status = "editorial-review";

    entry.body = "\n<!-- editorial TODO -->\n<!-- research note -->\n";
    expect(issueCodes(graph)).toContain("missing-editorial-body");

    entry.body = "<!-- unfinished editorial note";
    expect(issueCodes(graph)).toContain("missing-editorial-body");

    entry.body = "<div></div>";
    expect(issueCodes(graph)).toContain("missing-editorial-body");

    entry.body = '<!-- editorial note --><div aria-label="metadata"></div>';
    expect(issueCodes(graph)).toContain("missing-editorial-body");

    entry.body = '<div title=">" style="display:block"></div>';
    expect(issueCodes(graph)).toContain("missing-editorial-body");

    entry.body = '<img src="/local-image.webp" alt="Image only">';
    expect(issueCodes(graph)).toContain("missing-editorial-body");

    entry.body = "![Image only](/local-image.webp)";
    expect(issueCodes(graph)).toContain("missing-editorial-body");

    entry.body = "<!-- editorial note -->\n## Core story";
    expect(() => validateContentGraph(graph)).not.toThrow();

    entry.body = "<p>Reader-visible prose.</p>";
    expect(() => validateContentGraph(graph)).not.toThrow();

    entry.body = "`<!-- visible code literal -->`";
    expect(() => validateContentGraph(graph)).not.toThrow();
  });

  it("enforces Source roles and bounded historical versus modern evidence", () => {
    const validCases: Array<{
      source: SourceData;
      role: ClaimData["sourceLinks"][number]["role"];
      evidenceContext: ClaimData["evidenceContext"];
    }> = [
      {
        source: makeSourceData(),
        role: "primary",
        evidenceContext: "historical-tradition",
      },
      {
        source: makeSourceData({
          sourceType: "translation",
          translator: "Example Translator",
          pageOrSection: "page 12",
          rightsStatus: "citation-only",
          rightsUrl: "https://example.org/rights",
        }),
        role: "translation",
        evidenceContext: "historical-tradition",
      },
      {
        source: makeSourceData({
          sourceType: "scholarship",
          authorOrOrganization: "Example Scholar",
        }),
        role: "scholarship",
        evidenceContext: "historical-tradition",
      },
      {
        source: makeSourceData({
          sourceType: "museum-or-library",
          authorOrOrganization: "Example Museum",
        }),
        role: "object-record",
        evidenceContext: "historical-tradition",
      },
      {
        source: makeSourceData({
          sourceType: "fieldwork-or-community-archive",
          authorOrOrganization: "Example Community Archive",
        }),
        role: "fieldwork",
        evidenceContext: "historical-tradition",
      },
      {
        source: makeSourceData({
          sourceType: "modern-adaptation",
          authorOrOrganization: "Example Studio",
        }),
        role: "adaptation",
        evidenceContext: "modern-reception",
      },
      {
        source: makeSourceData({
          sourceType: "official-site",
          authorOrOrganization: "Example Institution",
          url: "https://example.org/official",
          accessedAt: "2026-08-27",
        }),
        role: "reference",
        evidenceContext: "modern-reception",
      },
      {
        source: makeSourceData({
          sourceType: "reference-website",
          authorOrOrganization: "Example Reference",
          url: "https://example.org/reference",
          accessedAt: "2026-08-27",
        }),
        role: "reference",
        evidenceContext: "modern-reception",
      },
    ];

    for (const validCase of validCases) {
      expect(
        () => makeReadyEvidenceGraph(validCase),
        `${validCase.source.sourceType}/${validCase.role}/${validCase.evidenceContext}`,
      ).not.toThrow();
      expect(
        () => validateContentGraph(makeReadyEvidenceGraph(validCase)),
        `${validCase.source.sourceType}/${validCase.role}/${validCase.evidenceContext}`,
      ).not.toThrow();
    }

    const officialSource = validCases[6]?.source;
    const modernSource = validCases[5]?.source;
    if (!officialSource || !modernSource) {
      throw new Error("Missing evidence matrix fixtures.");
    }

    expect(
      issueCodes(
        makeReadyEvidenceGraph({
          source: officialSource,
          role: "primary",
          evidenceContext: "modern-reception",
        }),
      ),
    ).toContain("source-role-mismatch");
    expect(
      issueCodes(
        makeReadyEvidenceGraph({
          source: modernSource,
          role: "adaptation",
          evidenceContext: "historical-tradition",
        }),
      ),
    ).toContain("historical-evidence-insufficient");
    expect(
      issueCodes(
        makeReadyEvidenceGraph({
          source: officialSource,
          role: "reference",
          evidenceContext: "historical-tradition",
        }),
      ),
    ).toContain("historical-evidence-insufficient");

    const historicalWithSupplement = makeReadyEvidenceGraph(validCases[0]!);
    const supplementalSource = sourceSchema.parse(
      makeSourceData({
        sourceId: "modern-supplement",
        sourceType: "modern-adaptation",
        authorOrOrganization: "Example Studio",
      }),
    );
    const historicalEntry = historicalWithSupplement.entries[0];
    const historicalClaim = historicalWithSupplement.claims[0];
    if (!historicalEntry || !historicalClaim) {
      throw new Error("Missing historical evidence fixtures.");
    }
    historicalEntry.data.sourceIds.push(supplementalSource.sourceId);
    historicalClaim.data.sourceLinks.push({
      sourceId: supplementalSource.sourceId,
      role: "adaptation",
      locator: "episode 1",
      note: "Supplies modern reception context, not historical proof.",
    });
    historicalWithSupplement.sources = [
      ...historicalWithSupplement.sources,
      makeRecord(supplementalSource.sourceId, "sources", supplementalSource),
    ];
    expect(() => validateContentGraph(historicalWithSupplement)).not.toThrow();

    const provisionalGraph = makeDraftGraph();
    const provisionalEntry = provisionalGraph.entries.find(
      (entry) => entry.id === "zhong-kui",
    );
    if (!provisionalEntry)
      throw new Error("Missing provisional Entry fixture.");
    const provisionalClaim = claimSchema.parse(
      makeClaimData({
        certainty: "provisional",
        evidenceContext: "historical-tradition",
        sourceLinks: [
          {
            sourceId: modernSource.sourceId,
            role: "adaptation",
            locator: "episode 1",
            note: "Research lead only; not verified historical evidence.",
          },
        ],
      }),
    );
    provisionalEntry.data.sourceIds = [modernSource.sourceId];
    provisionalEntry.data.claimIds = [provisionalClaim.claimId];
    provisionalGraph.sources = [
      makeRecord(modernSource.sourceId, "sources", modernSource),
    ];
    provisionalGraph.claims = [
      makeRecord(provisionalClaim.claimId, "claims", provisionalClaim),
    ];
    expect(() => validateContentGraph(provisionalGraph)).not.toThrow();
  });

  it("prevents published Entries from linking to unpublished Entries", () => {
    const graph = makeDraftGraph();
    const published = graph.entries.find((record) => record.id === "zhong-kui");
    if (!published) throw new Error("Missing Zhong Kui fixture.");
    published.data.status = "published";
    published.data.relatedEntryIds = ["chinese-underworld-guide"];
    published.body = "Published body retained for relationship validation.";

    expect(issueCodes(graph)).toContain("published-related-entry-status");

    const related = graph.entries.find(
      (record) => record.id === "chinese-underworld-guide",
    );
    if (!related) throw new Error("Missing related Entry fixture.");
    related.data.status = "published";
    related.body = "Published related body.";
    expect(() => validateContentGraph(graph)).not.toThrow();

    published.data.status = "archived";
    related.data.status = "draft";
    expect(issueCodes(graph)).toContain("published-related-entry-status");

    related.data.status = "archived";
    const collection = graph.collections[0];
    if (!collection) throw new Error("Missing Collection fixture.");
    collection.data.status = "archived";
    expect(() => validateContentGraph(graph)).not.toThrow();
  });

  it("accepts finite related-entry cycles", () => {
    const graph = makeDraftGraph();
    const first = graph.entries[0];
    const second = graph.entries[1];
    if (!first || !second) throw new Error("Missing Entry fixtures.");
    first.data.relatedEntryIds = [second.id];
    second.data.relatedEntryIds = [first.id];

    expect(() => validateContentGraph(graph)).not.toThrow();
  });

  it("sorts aggregated errors deterministically and names object fields", () => {
    const graph = makeDraftGraph();
    const entry = graph.entries[0];
    if (!entry) throw new Error("Missing Entry fixture.");
    entry.data.sourceIds = ["z-source", "a-source"];

    const issues = issuesFrom(graph);
    const keys = issues.map((issue) =>
      [issue.objectType, issue.objectId, issue.path, issue.code].join("|"),
    );
    expect(keys).toEqual([...keys].sort());
    expect(() => validateContentGraph(graph)).toThrow(
      /entry:zhong-kui data\.sourceIds\[0\]/,
    );

    const makeDuplicateGraph = (reverse: boolean): ContentGraph => {
      const first = makeEntryRecord(
        makeEntryData({
          entryId: "shared-entry-id",
          slug: "shared-entry-slug",
        }),
        {
          id: "a-loader-id",
          filePath: "src/content/entries/a-loader-id.md",
        },
      );
      const second = makeEntryRecord(
        makeEntryData({
          entryId: "shared-entry-id",
          slug: "shared-entry-slug",
        }),
        {
          id: "b-loader-id",
          filePath: "src/content/entries/b-loader-id.md",
        },
      );

      return {
        entries: reverse ? [second, first] : [first, second],
        collections: [],
        sources: [],
        claims: [],
        terminology: [],
      };
    };
    const conflictCodes = new Set([
      "duplicate-global-id",
      "duplicate-global-slug",
    ]);
    const forwardGraph = makeDuplicateGraph(false);
    const reverseGraph = makeDuplicateGraph(true);
    const forwardIssues = issuesFrom(forwardGraph).filter((issue) =>
      conflictCodes.has(issue.code),
    );
    const reverseIssues = issuesFrom(reverseGraph).filter((issue) =>
      conflictCodes.has(issue.code),
    );

    expect(reverseIssues).toStrictEqual(forwardIssues);
    expect(forwardIssues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "duplicate-global-id",
          objectId: "b-loader-id",
          path: "data.entryId",
        }),
        expect.objectContaining({
          code: "duplicate-global-slug",
          objectId: "b-loader-id",
          path: "data.slug",
        }),
      ]),
    );
    expect(reverseGraph.entries.map((entry) => entry.id)).toEqual([
      "b-loader-id",
      "a-loader-id",
    ]);
  });
});
