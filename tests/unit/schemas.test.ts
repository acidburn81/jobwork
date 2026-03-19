import { describe, expect, it } from "vitest";
import { aiOutputSchema } from "../../src/schemas/company.js";
import { schemaRegistry } from "../../src/schemas/registry.js";
import { demoSeedData } from "../../src/seed/demo-seed.js";

describe("schema validation", () => {
  it("validates demo seed against ai output schema", () => {
    const parsed = aiOutputSchema.safeParse(demoSeedData);
    expect(parsed.success).toBe(true);
  });

  it("validates all registered schemas with representative samples", () => {
    const samples: Record<string, unknown> = {
      companyTypeSchema: "SOLE_PROPRIETORSHIP",
      expertReviewFlagsSchema: { legalReviewRequired: true, accountingReviewRequired: true },
      tradeTitleSuggestionSchema: {
        tradeTitle: "Ornek Ticaret Unvani",
        rationale: "Registry-facing title with clear business positioning."
      },
      brandNameSuggestionSchema: {
        brandName: "OrnekMarka",
        rationale: "Customer-facing brand with memorability and fit."
      },
      domainSuggestionSchema: {
        domain: "ornekmarka.com",
        availabilityGuaranteed: false,
        advisoryNote: "Availability must be checked again before purchase."
      },
      socialHandleSuggestionSchema: {
        platform: "x",
        handle: "@ornekmarka",
        availabilityGuaranteed: false,
        advisoryNote: "Handle status can change quickly and requires re-check."
      },
      legalDraftSchema: {
        title: "Draft",
        body: "This is a legal preparation draft pending expert review.",
        expertReview: { legalReviewRequired: true, accountingReviewRequired: true }
      },
      aiOutputSchema: demoSeedData
    };

    for (const [name, schema] of Object.entries(schemaRegistry)) {
      const parsed = schema.safeParse(samples[name]);
      expect(parsed.success, `${name} failed sample validation`).toBe(true);
    }
  });
});
