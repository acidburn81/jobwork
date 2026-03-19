import { onboardingAnswersSchema, companyTypeMap } from "@/domain/company";

export type OnboardingState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function saveOnboardingAnswers(raw: FormData): Promise<OnboardingState> {
  const payload = {
    founderFullName: raw.get("founderFullName"),
    city: raw.get("city"),
    uiCompanyType: raw.get("uiCompanyType"),
    activityDescription: raw.get("activityDescription"),
    hasTrademarkPlan: raw.get("hasTrademarkPlan") === "on",
    monthlyRevenueExpectationTry: Number(raw.get("monthlyRevenueExpectationTry"))
  };

  const validated = onboardingAnswersSchema.safeParse(payload);

  if (!validated.success) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: validated.error.flatten().fieldErrors
    };
  }

  const mappedType = companyTypeMap[validated.data.uiCompanyType];

  return {
    success: true,
    message: `Onboarding saved for ${mappedType}. Next: identity and checklist generation.`
  };
}
