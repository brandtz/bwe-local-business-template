# Adding a new client to the template

This repo is client-agnostic shared code + per-client folders under `/clients/<slug>/`. Onboarding a new client is a one-day task.

## 1. Copy the template client folder

```bash
cp -r clients/superior-exteriors clients/<new-client-slug>
```

## 2. Edit `clients/<new-client-slug>/site.config.ts`

Update every field: `clientSlug`, `businessName`, `tagline`, `phone`, `email`, `licenseNumber`, `serviceArea`, `city`/`region`, `heroHeadline`, `calComBaseUrl`, `logo` path, and the `colors` object if the client has different brand colors.

## 3. Edit `clients/<new-client-slug>/content/seed.ts`

Replace the `services`, `reviews`, and `about` data. Keep the same TypeScript shape. Leave `startingPrice` / `priceLabel` / `pricingTiers` undefined unless the client wants public pricing.

## 4. Drop assets into `clients/<new-client-slug>/public/`

- `brand/logo.png` — primary logo
- `images/*.png` — before/during/after photos referenced from `seed.ts`

No build step needed. Nitro's `publicAssets` config (see `nuxt.config.ts`) serves them at site root.

## 5. Create a Netlify project

1. In Netlify, "Add new site" → "Import from GitHub" → pick the same repo.
2. Build command: `pnpm build`
3. Publish directory: `.output/public` (or leave default, Nitro preset handles it)
4. Environment variables:
   - `CLIENT` = `<new-client-slug>`
   - `RESEND_API_KEY` = (when ready)
   - `SANITY_PROJECT_ID` = (when ready)
   - `SANITY_DATASET` = `production`
   - `CAL_COM_BASE_URL` = `https://cal.com/<client>`
   - `SITE_URL` = the final production URL

## 6. Create Cal.com + Sanity per client

See `CAL_COM_SETUP.md` and `SANITY_SETUP.md`. Each client gets a separate Cal.com account and a separate Sanity dataset (or project — confirm with Matthew).

## 7. Deploy and verify

Push to `main`. Netlify auto-deploys. Verify all 6 pages render, contact form submits, before/after sliders work on mobile.

## What NOT to change

- Anything in `app/` (shared components). If the new client needs a new section or variant, add it as a new prop/variant — don't fork.
- Tailwind tokens. Color overrides flow through `site.config.ts` → CSS custom properties at runtime.
