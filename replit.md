# MAFII Wax Studio

Multipage website for an inclusive waxing studio in Mountain View, California, with booking handed off to GlossGenius.

## Website maintenance

- Website pages live in `artifacts/mafii/src/pages/editorial`; route and asset helpers live in `artifacts/mafii/src/lib`.
- The design-canvas sandbox (`artifacts/mockup-sandbox`) was removed in October 2026; its exploratory designs remain in git history.
- A seasonal bar at the top of every page switches on by date (Pacific time) for gift-card holidays and beach-ready booking seasons. Windows and wording live in `artifacts/mafii/src/lib/seasons.ts`; preview one with `?season=<id>`.
- `docs/` holds the GitHub Pages preview build (https://shree6791.github.io/mafii-wax/), marked noindex. Rebuild it after site changes with `pnpm --filter @workspace/mafii run build:pages`.
- The old request-form frontend has been retired. Historical request records and the backend API are preserved; do not delete customer data as part of cleanup.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

- Black and white is intended to be gender-neutral and welcoming to all. The physical studio has vertical black-and-white wall stripes, a black sofa, and otherwise white furnishings.
- Use true black and white, not warm cream/amber. The user rejected the soft serif-led single-page direction and wants a modern multi-page website that sells the dream and result.
- Copy must focus on smooth skin, confidence, and the client experience, not furniture descriptions or phrases like “no gatekeeping.” The supplied business cards use a bold geometric wordmark and “Always inclusive and intentional.”
- Women are the primary audience while the studio remains welcoming to all genders. Marketing copy must sell the result and personal experience, not expose development-stage “Preview” wording; explain actual request limitations within the appointment form and receipt.
- The studio is women-owned and independently run. Keep the footer proportionate but not cramped: separate brand, navigation, and contact groups with breathing room. Keep cancellation policy separate from the FAQ.
- Alternate white and black homepage sections; the user explicitly rejected consecutive white sections without that visual rhythm.
- Typography, spacing, and stripes need particular care: the user rejected the oversized, heavy-type redesign. Prioritize readable hierarchy, consistent spacing, and restrained stripe accents rather than visual loudness.
- Storytelling matters more than filling sections. The user finds repeated positioning and unnecessary information redundant; each section should advance the visitor’s understanding rather than restate brand claims.
- The owner supplied “over seven years” of expertise and describes MAFII as owner-operated, focused on Brazilian and full-body waxing. Cancellation terms: 24 hours’ notice; 5-minute grace for shorter services and 10-minute grace for longer services; repeated last-minute cancellations or missed appointments may require a future deposit.
- Use free, authentic photographs rather than AI-generated pictures. Verify licenses and distinguish stock models from MAFII's clients, staff, and treatment results.
- The business has existing clients but needs visibility, an event/social sharing destination, and lead-to-appointment tracking.
- The user confirmed the owner previously worked at European Wax Center and expects high standards. Confirm owner-approved wording before publishing this background; do not infer credentials, tenure, endorsement, or current affiliation.
- The user approved retaining GlossGenius as the booking destination for the new multipage website. All booking entry points should open the studio's GlossGenius service menu. This is a booking handoff, not API synchronization or migration; do not change the provider's records, scheduling, notifications, or payments.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
