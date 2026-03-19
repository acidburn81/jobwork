import { z } from "zod";

export const companyTypeSchema = z.enum(["SOLE_PROPRIETORSHIP", "LIMITED", "JOINT_STOCK"]);

export const expertReviewFlagsSchema = z.object({
  legalReviewRequired: z.boolean(),
  accountingReviewRequired: z.boolean()
});

export const tradeTitleSuggestionSchema = z.object({
  tradeTitle: z.string().min(3),
  rationale: z.string().min(10)
});

export const brandNameSuggestionSchema = z.object({
  brandName: z.string().min(2),
  rationale: z.string().min(10)
});

export const domainSuggestionSchema = z.object({
  domain: z.string().regex(/^[a-z0-9-]+\.[a-z]{2,}$/),
  availabilityGuaranteed: z.literal(false),
  advisoryNote: z.string().min(10)
});

export const socialHandleSuggestionSchema = z.object({
  platform: z.enum(["instagram", "x", "linkedin", "youtube"]),
  handle: z.string().regex(/^@[a-z0-9_.]{3,30}$/),
  availabilityGuaranteed: z.literal(false),
  advisoryNote: z.string().min(10)
});

export const legalDraftSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(20),
  expertReview: expertReviewFlagsSchema
});

export const aiOutputSchema = z.object({
  companyType: companyTypeSchema,
  tradeTitleSuggestions: z.array(tradeTitleSuggestionSchema).min(1),
  brandNameSuggestions: z.array(brandNameSuggestionSchema).min(1),
  domainSuggestions: z.array(domainSuggestionSchema).min(1),
  socialHandleSuggestions: z.array(socialHandleSuggestionSchema).min(1),
  legalDraft: legalDraftSchema,
  accountingDraft: legalDraftSchema
});

export type AiOutput = z.infer<typeof aiOutputSchema>;
