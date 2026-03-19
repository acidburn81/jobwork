import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold">Kurulus Asistani</h1>
      <p className="text-neutral-700">Prepare your company formation plan with safe AI-assisted guidance.</p>
      <Link className="inline-flex rounded bg-black px-4 py-2 text-white" href="/onboarding">
        Start onboarding
      </Link>
    </main>
  );
}
