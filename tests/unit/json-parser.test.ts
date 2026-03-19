import { describe, expect, it } from "vitest";
import { safeParseAiJson } from "../../src/ai/json.js";
import { aiOutputSchema } from "../../src/schemas/company.js";
import { demoSeedData } from "../../src/seed/demo-seed.js";

describe("safeParseAiJson", () => {
  it("returns invalid json error for malformed payload", () => {
    const result = safeParseAiJson("{bad-json", aiOutputSchema);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errorCode).toBe("INVALID_JSON");
    }
  });

  it("returns schema error for shape mismatch", () => {
    const result = safeParseAiJson(JSON.stringify({ companyType: "SOLE_PROPRIETORSHIP" }), aiOutputSchema);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errorCode).toBe("SCHEMA_VALIDATION_FAILED");
    }
  });

  it("returns data when valid", () => {
    const result = safeParseAiJson(JSON.stringify(demoSeedData), aiOutputSchema);
    expect(result.ok).toBe(true);
  });
});
