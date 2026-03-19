import { OnboardingForm } from "@/components/onboarding-form";

export default function OnboardingPage() {
  return (
    <main className="space-y-3">
      <h1 className="text-2xl font-semibold">Founder onboarding</h1>
      <p className="text-sm text-neutral-700">We validate all inputs server-side before generating checklist and drafts.</p>
      <OnboardingForm />
      <p className="text-xs text-neutral-600">
        Domain and social identity suggestions are advisory only and can change at any time.
      </p>
    </main>
  );
}
