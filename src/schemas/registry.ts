import type { ZodTypeAny } from "zod";
import {
  aiOutputSchema,
  brandNameSuggestionSchema,
  companyTypeSchema,
  domainSuggestionSchema,
  expertReviewFlagsSchema,
  legalDraftSchema,
  socialHandleSuggestionSchema,
  tradeTitleSuggestionSchema
} from "./company.js";

export const schemaRegistry: Record<string, ZodTypeAny> = {
  companyTypeSchema,
  expertReviewFlagsSchema,
  tradeTitleSuggestionSchema,
  brandNameSuggestionSchema,
  domainSuggestionSchema,
  socialHandleSuggestionSchema,
  legalDraftSchema,
  aiOutputSchema
};
