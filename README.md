# Kurulus Asistani

Kurulus Asistani is a Turkey-focused SaaS app that helps founders prepare for company formation using AI-assisted planning flows.

## Local setup
1. Install Node.js 22+.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment template:
   ```bash
   cp .env.example .env
   ```

## Environment variables
Create `.env` with the following values:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kurulus_asistani"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/kurulus_asistani"
OPENAI_API_KEY="your_openai_key"
APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace_with_secure_random_value"
```

## Migrations
When Prisma migrations are configured in your local environment, run:

```bash
npx prisma migrate dev
npx prisma generate
```

## Development run
```bash
npm run lint
npm run typecheck
npm test
npm run seed:demo
```

For Next.js local server (when app layer is present):
```bash
npm run dev
```

## Architecture summary
Current hardening/testing layer includes:
- **Zod schemas** for AI payload validation and business constraints (trade title and brand name separated, advisory availability flags, expert review flags).
- **Safe AI JSON parser** that handles malformed JSON and schema failures explicitly.
- **Retry-safe action runner** with idempotency key support to avoid duplicated side effects.
- **Accessibility helper** for consistent ARIA field metadata.
- **Demo seed data** suitable for local/dev demo flows.
- **Unit and integration tests** validating parsing, schema registry, retry behavior, and core flow.

## AI prompt system
All prompts must be versioned and stored in files under `src/prompts/<version>/`.

Current prompt file:
- `src/prompts/v1/company-formation.ts`

Prompt policy:
- Return JSON only.
- Keep trade title and brand names separate.
- Mark domain/social suggestions as advisory (`availabilityGuaranteed=false`).
- Add expert review requirements for legal/accounting outputs.

## Known limitations
- Repository currently contains the hardening/testing foundation but not the full Next.js UI stack.
- Retry store is in-memory for testability; production should replace with a durable store.
- Demo seed generation writes JSON output only and does not insert into a live database.
- Lint/type/test checks cover TypeScript modules in this repository scope.
