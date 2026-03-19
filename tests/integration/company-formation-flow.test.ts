import { describe, expect, it } from "vitest";
import { runRetrySafeAction, InMemoryRetryStore } from "../../src/actions/retry.js";
import { parseCompanyFormationResponse } from "../../src/services/company-formation.js";
import { demoSeedData } from "../../src/seed/demo-seed.js";

describe("company formation integration flow", () => {
  it("parses AI output through retry-safe action", async () => {
    const store = new InMemoryRetryStore<string>();
    const payload = JSON.stringify(demoSeedData);

    const raw = await runRetrySafeAction(
      async () => payload,
      { maxAttempts: 2, delayMs: 0, idempotencyKey: "formation-1" },
      store
    );

    const parsed = parseCompanyFormationResponse(raw);
    expect(parsed.tradeTitleSuggestions[0].tradeTitle).not.toEqual(parsed.brandNameSuggestions[0].brandName);
    expect(parsed.domainSuggestions[0].availabilityGuaranteed).toBe(false);
    expect(parsed.legalDraft.expertReview.legalReviewRequired).toBe(true);
  });

  it("throws safe error when AI payload is malformed", () => {
    expect(() => parseCompanyFormationResponse("not-json")).toThrow(/AI_RESPONSE_INVALID/);
  });
});
