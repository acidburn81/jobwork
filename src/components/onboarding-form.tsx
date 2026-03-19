"use client";

import { useActionState } from "react";
import { submitOnboarding, initialState } from "@/app/onboarding/actions";

function ErrorText({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-red-600">{message}</p>;
}

export function OnboardingForm() {
  const [state, formAction, pending] = useActionState(submitOnboarding, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border p-4">
      <div>
        <label htmlFor="founderFullName" className="mb-1 block text-sm font-medium">
          Founder full name
        </label>
        <input id="founderFullName" name="founderFullName" className="w-full rounded border px-3 py-2" />
        <ErrorText message={state.fieldErrors?.founderFullName?.[0]} />
      </div>

      <div>
        <label htmlFor="city" className="mb-1 block text-sm font-medium">
          City
        </label>
        <input id="city" name="city" className="w-full rounded border px-3 py-2" />
        <ErrorText message={state.fieldErrors?.city?.[0]} />
      </div>

      <div>
        <label htmlFor="uiCompanyType" className="mb-1 block text-sm font-medium">
          Company type
        </label>
        <select id="uiCompanyType" name="uiCompanyType" className="w-full rounded border px-3 py-2" defaultValue="Sahis Sirketi">
          <option>Sahis Sirketi</option>
          <option>Limited Sirket</option>
          <option>Anonim Sirket</option>
        </select>
      </div>

      <div>
        <label htmlFor="activityDescription" className="mb-1 block text-sm font-medium">
          Planned business activity
        </label>
        <textarea id="activityDescription" name="activityDescription" className="w-full rounded border px-3 py-2" rows={4} />
        <ErrorText message={state.fieldErrors?.activityDescription?.[0]} />
      </div>

      <div>
        <label htmlFor="monthlyRevenueExpectationTry" className="mb-1 block text-sm font-medium">
          Monthly revenue expectation (TRY)
        </label>
        <input
          id="monthlyRevenueExpectationTry"
          name="monthlyRevenueExpectationTry"
          type="number"
          min={0}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="hasTrademarkPlan" />
        I plan to pursue trademark registration.
      </label>

      <button disabled={pending} className="rounded bg-black px-4 py-2 text-white disabled:opacity-60">
        {pending ? "Saving..." : "Continue"}
      </button>

      {!pending && state.message ? (
        <p className={state.success ? "text-sm text-green-700" : "text-sm text-red-700"}>{state.message}</p>
      ) : null}
    </form>
  );
}
