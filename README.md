# AGENTS.md

## Project
This repository is for a Turkey-focused SaaS product called "Kurulus Asistani".

The product helps users prepare for company formation with AI assistance across:
- company type selection
- trade title and brand naming
- branding package generation
- domain and social identity suggestions
- formation checklist generation
- draft documents for accountant/lawyer handoff

## Core product rules
- "Sahis Sirketi" in UI must map internally to a sole proprietorship / real person business workflow.
- Trade title and brand name are different concepts and must be modeled separately.
- Domain and social handle suggestions are advisory only, never guaranteed.
- Legal and accounting outputs are preparation drafts only.
- Any legal or accounting related output must include expert review flags.
- Never claim official filing is completed unless explicitly implemented and confirmed.
- Prefer structured JSON outputs for all AI-generated data.
- All AI prompts must be stored in versioned prompt files.
- Use strong typing and runtime validation for all external and AI-derived payloads.

## Tech stack
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma
- Zod
- Role-based auth
- Audit logs

## Coding rules
- Do not make large speculative refactors without need.
- Keep functions small and explicit.
- Use server-side validation.
- Add loading, empty, and error states.
- Create reusable UI components.
- Use clean file naming.
- Prefer composition over duplication.

## Delivery rules
- Before editing, inspect existing files and architecture.
- When implementing a task:
  1. understand the current structure
  2. propose the minimal safe change set
  3. implement
  4. run checks/tests if available
  5. summarize changed files and why

## Quality bar
- Production-oriented code
- No fake data hidden as real production logic
- No fake legal certainty
- No availability guarantees for domains/social handles
- Add TODO comments only when truly necessary
