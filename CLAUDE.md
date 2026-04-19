# BWE Local Business Website Template — Session Opener

This workspace is `bwe-local-business-template`, the reusable template for BWE's cold-call-sold local small business websites. Client instance #1 is **Superior Exteriors & Maintenance** under `/clients/superior-exteriors/`.

## Instructions for Any Agent Picking Up Work Here

1. **Read `docs/INTAKE_PACKAGE.md` in full before taking any action.** That is the complete, locked specification. Every pricing, hosting, service-structure, and repo-layout decision is already made.
2. **Do not ask clarifying questions on anything in the intake.** The decisions are deliberate — Matthew already picked from the menu.
3. **Respect the template-vs-client separation.** Shared code lives under `/app`, `/sanity`, `/server`. Client-specific values (copy, colors, contact info, photos) live **only** under `/clients/<client-slug>/`. Do not hard-code Superior Exteriors copy inside shared components.

## First Actions When Starting a Session

1. Confirm you have read and understood `docs/INTAKE_PACKAGE.md`.
2. One-paragraph summary of what you are about to build.
3. Resume from the earliest incomplete step in the Build Order section of the intake.

## Core Decisions Reference Card

- **Hosting:** Netlify (not Vercel). `nitro.preset: 'netlify'`.
- **Repo:** `bwe-local-business-template` on GitHub under `brandtz`.
- **Client selection:** `CLIENT` env var picks `/clients/<CLIENT>/` config.
- **Services:** 3 top-level (Roofing, Gutters, Pressure Washing) + 2 `featured: false` sub-pages (Gutter Cleaning, Gutter Guards).
- **Pricing:** Never display a price in v1. Every price-spot renders "Let's book and discuss" → Cal.com.
- **Stripe:** Schema fields present, UI hidden when empty.
- **Sanity:** Schemas checked in, Studio setup deferred to `docs/SANITY_SETUP.md`. Seed data under `/clients/<slug>/content/seed.ts` is the fallback so the site renders before Sanity is wired.
- **Content manager UX:** Eventual end-user is Ryan's wife (non-technical). Matthew manages interim. Labels and workflow must serve the non-technical handoff.

Photo assets for Superior Exteriors originally landed in `/assets/` — during scaffolding they get relocated to `/clients/superior-exteriors/public/brand/` (logo) and `/clients/superior-exteriors/public/images/` (before/after). The `/assets/picture of business card.jpg` and `/assets/logo file.jpg` are reference-only, not site assets.
