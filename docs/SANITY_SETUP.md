# Sanity Setup — Superior Exteriors

> 45–60 minute task for v1. Everything below is one-time per client.
> Outputs: a Sanity project ID, a deployed Studio URL, and a fully-populated dataset that the Nuxt site consumes at runtime.

The site ships with a working fallback (`clients/superior-exteriors/content/seed.ts`) so it will render even if Sanity is never wired up. Doing this step turns the site into something Ryan's wife can edit without Matthew touching the code.

## 1. Create the Sanity project

1. Go to <https://sanity.io/login> and sign in with `SuperiorEandMcorp@gmail.com` (or Matthew's BWE account if we want to own it centrally — see section 7).
2. **Create new project** → name it `Superior Exteriors`. Dataset: `production`. Public read: **yes** (the site reads over the public API).
3. Copy the **Project ID** (looks like `a1b2c3d4`). You'll need it in three places:
   - Netlify env var `SANITY_PROJECT_ID`
   - Local `.env` for Studio dev: `SANITY_STUDIO_PROJECT_ID`
   - `sanity.cli.ts` (already pulls from env, no hard-coding required)

## 2. Install and run the Studio locally

From the repo root:

```bash
pnpm install
cd sanity
pnpm dlx sanity@latest install         # first time only
SANITY_STUDIO_PROJECT_ID=<your-id> pnpm dlx sanity dev
```

Studio boots on <http://localhost:3333>. Log in with the same email you used in step 1.

If `pnpm dlx sanity dev` errors on a missing `sanity.cli.ts`, create one alongside `sanity.config.ts`:

```ts
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
```

## 3. Populate the singleton: `siteConfig`

The schema is `sanity/schemas/siteConfig.ts`. Required fields — fill each exactly:

| Field | Value |
|---|---|
| Business Name | Superior Exteriors & Maintenance |
| Tagline | Our sweat, your equity. |
| Phone Number | (503) 860-2218 |
| Email Address | SuperiorEandMcorp@gmail.com |
| License Number | CCB #242198 |
| License Footer Text | Licensed · Insured · Bonded |
| Service Area | Springfield & Eugene, OR |
| Cal.com Base URL | https://cal.com/superior-exteriors |
| Stripe Payment Link | *(leave blank for v1)* |
| Logo | upload `clients/superior-exteriors/public/brand/logo.png` |
| Hero Headline | Your home's exterior, handled by owner-operators |
| Hero Subheadline | Roofing, gutters, and pressure washing across Springfield & Eugene |
| Brand Colors → Primary | `#45BEBF` *(optional — template default)* |
| Brand Colors → Dark | `#1A1A24` *(optional — template default)* |

Enforce singleton behavior by editing the existing doc instead of creating duplicates. If you see two `siteConfig` entries, delete the older one.

## 4. Create the 5 service documents

Open **Service** in the Studio desk. Create one document per row. Values match `clients/superior-exteriors/content/seed.ts` so the site behaves identically whether it reads from Sanity or the seed.

| Name | Slug | Icon | Featured | Nav Order | Cal.com Event Slug |
|---|---|---|---|---|---|
| Roofing | `roofing` | `home` | ✓ | 10 | `roof-estimate` |
| Gutter Cleaning | `gutter-cleaning` | `droplets` | ✓ | 20 | `gutter-cleaning` |
| Gutter Guards | `gutter-guards` | `shield` | ✓ | 30 | `gutter-guard-install` |
| Pressure Washing | `pressure-washing` | `sparkles` | ✗ | 40 | `pressure-washing` |
| General Estimate | `general-estimate` | `clipboard-check` | ✗ | 50 | `estimate` |

For each service, also fill:

- **Short Description** — copy from `seed.ts`
- **Long Description** — block content. 2–4 paragraphs.
- **Sub-scope** — bullet list (e.g. Roofing: `Removal`, `Installation`, `Repair`, `Inspection`).
- **What's Included** — copy from `seed.ts`.
- **Gallery** — upload at least one after photo. For roofing + pressure washing, upload before/after pairs; the img-comparison-slider will render automatically.
- **FAQ** — 3–5 Q/A entries per service. Start with the ones in `seed.ts` and let Ryan add more over time.

Leave all pricing fields (`startingPrice`, `priceLabel`, `pricingTiers`) empty. The UI falls back to **"Let's book and discuss"**, which is the locked v1 pricing model per `docs/INTAKE_PACKAGE.md`.

## 5. Create 3–5 review documents

Open **Review** in the desk. Each needs: author name, rating (1–5), quote, service (reference), and optionally location + date.

Start with whatever Ryan already has in text messages, Facebook, or Google reviews. Three real ones beats ten invented ones.

## 6. Wire Sanity into the Nuxt site

### Netlify env vars
Site settings → Environment variables:

```
SANITY_PROJECT_ID=<your-project-id>
SANITY_DATASET=production
```

Redeploy after saving. The Nuxt runtime picks these up via `nuxt.config.ts` → `runtimeConfig.public`.

### Verify locally
```bash
SANITY_PROJECT_ID=<your-project-id> SANITY_DATASET=production pnpm dev
```

Visit <http://localhost:3000>. The home page should render content from Sanity. If a field is missing in Sanity, the site falls back to `seed.ts` for that field only — you won't see a broken page.

### Deploy the Studio
```bash
cd sanity
pnpm dlx sanity deploy
```

Choose a subdomain like `superior-exteriors` → Studio lives at <https://superior-exteriors.sanity.studio>. Give this URL to Ryan's wife when we hand off.

## 7. Ownership + access

Two models. Pick one before inviting anyone:

**Model A — Client owns the project.** Sanity account belongs to `SuperiorEandMcorp@gmail.com`. Matthew is invited as an admin. Clean break when we're done; easy to hand off; client pays if they ever exceed the free tier.

**Model B — BWE owns it.** All clients live under one Sanity org. Matthew invites Ryan's wife as an editor. Cheaper to manage long-term; harder to separate if the relationship ends. Appropriate once we have 3+ clients.

**Recommendation for Superior Exteriors:** Model A. We don't have enough clients yet to justify the BWE-owned overhead, and Ryan's project is standalone.

## 8. Preview + publish workflow

Sanity defaults to publishing on save. No staging environment in v1. If Ryan's wife wants draft/publish separation later, enable Sanity's built-in **Drafts** feature and route the Nuxt build to pull the `published` dataset only.

For v1: she edits in Studio → Save → change is live on the site within ~60 seconds (CDN cache). No deploy required.

## Known gotchas

- **`@sanity/image-url`** must be installed in the Nuxt side for `useSanity` to generate thumbnails. If image loading breaks, add it: `pnpm add @sanity/image-url`.
- **CORS**: Sanity projects default to blocking all origins. Before the first Netlify deploy, go to Sanity → API → CORS origins and add the Netlify URL + the custom domain once you have it. Include both `https://` variants (with and without `www`).
- **Dataset naming** is permanent. Stick with `production` — renaming forces a full re-wire of env vars.
- **Seed fallback**: `seed.ts` is truth-at-build-time if `SANITY_PROJECT_ID` is empty. Don't delete `seed.ts` even after Sanity is wired — it's the recovery path if Sanity goes down or we need to rebuild the site offline.
