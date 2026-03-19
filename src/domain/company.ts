import { z } from "zod";

export const companyTypeSchema = z.enum([
  "sole_proprietorship",
  "limited_company",
  "joint_stock_company"
]);

export const uiCompanyTypeSchema = z.enum([
  "Sahis Sirketi",
  "Limited Sirket",
  "Anonim Sirket"
]);

export const companyTypeMap: Record<z.infer<typeof uiCompanyTypeSchema>, z.infer<typeof companyTypeSchema>> = {
  "Sahis Sirketi": "sole_proprietorship",
  "Limited Sirket": "limited_company",
  "Anonim Sirket": "joint_stock_company"
};

export const legalReviewFlagsSchema = z.object({
  legalReviewRequired: z.literal(true),
  accountingReviewRequired: z.literal(true),
  reason: z.string().min(10)
});

export const tradeTitleSchema = z.object({
  value: z.string().min(3).max(120),
  language: z.enum(["tr", "en"]),
  rationale: z.string().min(20)
});

export const brandNameSchema = z.object({
  value: z.string().min(2).max(60),
  rationale: z.string().min(20)
});

export const identitySuggestionSchema = z.object({
  provider: z.enum(["domain", "instagram", "x", "linkedin", "tiktok"]),
  suggestion: z.string().min(2),
  availability: z.enum(["unknown", "likely_available", "likely_taken"]),
  advisoryNotice: z.literal("Availability is advisory only and must be checked manually.")
});

export const onboardingAnswersSchema = z.object({
  founderFullName: z.string().min(3),
  city: z.string().min(2),
  uiCompanyType: uiCompanyTypeSchema,
  activityDescription: z.string().min(20).max(800),
  hasTrademarkPlan: z.boolean(),
  monthlyRevenueExpectationTry: z.number().int().nonnegative()
});

export type CompanyType = z.infer<typeof companyTypeSchema>;
export type OnboardingAnswers = z.infer<typeof onboardingAnswersSchema>;
