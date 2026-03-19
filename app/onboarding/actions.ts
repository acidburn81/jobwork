"use server";

import { saveOnboardingAnswers, type OnboardingState } from "@/server/onboarding/service";

const initialState: OnboardingState = {
  success: false,
  message: ""
};

export async function submitOnboarding(_: OnboardingState, formData: FormData): Promise<OnboardingState> {
  return saveOnboardingAnswers(formData);
}

export { initialState };
