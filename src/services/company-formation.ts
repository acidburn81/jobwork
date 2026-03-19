import { safeParseAiJson } from "../ai/json.js";
import { aiOutputSchema, type AiOutput } from "../schemas/company.js";

export function parseCompanyFormationResponse(raw: string): AiOutput {
  const parsed = safeParseAiJson(raw, aiOutputSchema);

  if (!parsed.ok) {
    throw new Error(`AI_RESPONSE_INVALID: ${parsed.errorCode} - ${parsed.message}`);
  }

  return parsed.data;
}
