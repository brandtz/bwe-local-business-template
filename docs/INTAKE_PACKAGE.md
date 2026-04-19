# Superior Exteriors & Maintenance — Build Intake Package

> Template v1 for the BWE Local Business Website Platform.
> Client instance: **Superior Exteriors & Maintenance** (Ryan Brown, Springfield/Eugene OR).

---

## Read This First

This is the single source of truth for the build. All architectural decisions, design tokens, content, and photo asset usage are defined below. Do not ask for clarification on anything documented here — infer and build. Flag only true blockers.

Every decision marked **LOCKED** is final for v1. Do not re-litigate.

---

## Project Overview

- **Client:** Superior Exteriors & Maintenance
- **Owner:** Ryan Brown
- **Phone:** (503) 860-2218 _(real — no placeholders)_
- **Email:** SuperiorEandMcorp@gmail.com
- **CCB License:** #242198 (Insured & Bonded)
- **Service Area:** Springfield & Eugene, Oregon
- **Tagline:** "Our sweat, your equity."
- **Services:** Roofing · Gutters · Pressure Washing
- **Crew size:** Husband-and-wife operation plus 1–2 hired hands per job

**Business context:** Built as an in-kind service exchange by BWE (Matthew Brandt). Loss leader and template proving ground. Ryan is not technically literate; intended long-term content manager is Ryan's wife. Matthew (BWE) is the interim admin through launch and early operation. All third-party accounts (Cal.com, Sanity, Netlify, GitHub) are created and managed by BWE until handoff.

**Template role:** This is **template v1** for the BWE Local Business Website platform. The repo is `bwe-local-business-template`. Client-specific values live under `/clients/<client-slug>/`. Same codebase deploys N clients via different `CLIENT` env var + different Netlify project. Build every decision with reusability as a first-class concern.

---

## Tech Stack — LOCKED

| Layer | Tool | Notes |
|---|---|---|
| Framework | Nuxt 3 + TypeScript | Composition API throughout |
| Hosting | **Netlify** | Auto-deploy from GitHub `main`. `nitro.preset: 'netlify'`. |
| Repo host | GitHub | Public repo under `brandtz` (or BWE org when created) |
| CMS | Sanity.io | Free tier. Studio configured for non-technical end user. |
| Styling | Tailwind CSS v3 | Config-driven design tokens |
| Booking | Cal.com embed | iframe, free hosted tier |
| Payments | Stripe Payment Links | Schema hooks present, UI hides when empty (v1 = no payments collected) |
| Forms | Resend + Nuxt server route | No third-party form services |
| Package manager | pnpm | Not npm, not yarn |
| Image handling | `@nuxt/image` | Optimized, lazy loaded |
| Icons | `lucide-vue-next` | Service card icons, UI glyphs |

**Banned / not used:** Vercel (superseded by Netlify for this line of work), Docker, jsonwebtoken, Prisma, npm, yarn.

---

## Pricing Model — LOCKED

Ryan has **not** committed to published prices. The public-facing pricing story is **"Call for a free quote"**.

**Implementation rules:**

- Sanity `service.startingPrice`, `priceLabel`, and `pricingTiers` fields **remain in the schema** as optional. When empty (which is v1 everywhere), the UI falls back to **"Let's book and discuss"** → routes to Cal.com booking.
- Sanity `siteConfig.stripePaymentLink` remains as an optional string. When empty, no Stripe buttons render anywhere. When populated in the future, a "Pay deposit" CTA appears on the service detail page and booking confirmation.
- When Ryan's wife later wants to publish prices, she fills the field in Sanity and the price displays — no code change needed.
- **Never** hard-code price strings in components. Always read from `siteConfig`/`service` and fall through to the "book and discuss" default.

---

## Service Structure — LOCKED

Three top-level categories in the main nav and `/services` grid, matching Ryan's business card. Two additional service detail pages exist for SEO deep-links but are **not in the main grid**. They are reachable via contextual links on the Gutters page.

| Top-level (in nav + grid) | Slug | Sub-scope listed on page |
|---|---|---|
| Roofing | `roofing` | Removal, installation, repairs, cleaning, treatments |
| Gutters | `gutters` | Removal, installation, cleaning, repairs, screen installation |
| Pressure Washing | `pressure-washing` | Buildings, pavement, fencing, siding, decks |

| Sub-pages (SEO only — not in main grid) | Slug |
|---|---|
| Gutter Cleaning | `gutter-cleaning` |
| Gutter Guard Installation | `gutter-guards` |

All five pages follow the same service-detail template. The `service` Sanity schema has a `featured: boolean` flag; only `featured: true` services appear in the home page services strip and the `/services` grid. Gutter Cleaning and Gutter Guards are `featured: false` but still reachable via URL and internal links.

---

## Design Tokens — LOCKED

Defined in `tailwind.config.ts` under `theme.extend`. These tokens are the client-agnostic baseline — client-specific overrides live in `/clients/<slug>/site.config.ts` under a `colors` key that is merged at build time.

### Colors (baseline for Superior Exteriors)

```ts
colors: {
  brand: {
    dark:        '#1A1A24',  // hero backgrounds, nav
    surface:     '#252535',  // cards on dark sections
    teal:        '#45BEBF',  // primary accent — CTA, highlights
    'teal-dark': '#2E8A8B',  // hover states, borders
    slate:       '#8A9EAA',  // secondary text on dark, ghost borders
    light:       '#F4F6F8',  // body section backgrounds
    white:       '#FFFFFF',
  }
}
```

These colors are pulled from Ryan's business card teal. Any future client's brand colors override these via their `site.config.ts` without touching Tailwind.

### Typography

```ts
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
fontSize: {
  'display':  ['3rem',    { lineHeight: '1.1', fontWeight: '600' }],
  'headline': ['2rem',    { lineHeight: '1.2', fontWeight: '600' }],
  'subhead':  ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
}
```

Load Inter via `@nuxtjs/google-fonts`.

### Spacing / Radius

Tailwind defaults. `rounded-xl` for cards, `rounded-lg` for buttons, `rounded-full` for badges/pills.

---

## Repo & Folder Layout — LOCKED

```
bwe-local-business-template/
├── app/                          # Shared Nuxt app (client-agnostic)
│   ├── components/
│   │   ├── ui/                   # AppButton, AppBadge, StarRating, AccordionItem
│   │   ├── sections/             # SectionHero, SectionBeforeAfter, SectionServices, ...
│   │   └── layout/               # AppNav, AppFooter
│   ├── composables/              # useSiteConfig, useContent, useServices
│   ├── layouts/
│   ├── pages/                    # /, /services, /services/[slug], /book, /about, /contact
│   └── plugins/                  # img-comparison-slider client plugin
├── clients/
│   └── superior-exteriors/
│       ├── site.config.ts        # Client brand/contact/links
│       ├── content/
│       │   └── seed.ts           # Services + reviews (fallback when Sanity empty)
│       └── public/
│           ├── brand/            # Logo + favicon
│           └── images/           # Before/after photos
├── sanity/
│   ├── schemas/                  # siteConfig.ts, service.ts, review.ts
│   └── sanity.config.ts          # Studio config
├── server/
│   └── api/
│       └── contact.post.ts       # Resend handler
├── docs/
│   ├── INTAKE_PACKAGE.md         # This file
│   ├── CAL_COM_SETUP.md
│   ├── SANITY_SETUP.md
│   └── CLIENT_ONBOARDING.md      # "How to add client #2" runbook
├── nuxt.config.ts                # Reads CLIENT env to pick client folder
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── .env.example
├── .gitignore
├── .github/
│   └── CODEOWNERS
├── netlify.toml                  # Build config
├── CLAUDE.md                     # Session opener
└── README.md
```

**Client selection mechanism:** Nuxt reads `process.env.CLIENT` (default `superior-exteriors`). The `useSiteConfig()` composable imports `~/clients/${CLIENT}/site.config.ts`. Static assets: symlinked or copied into Nuxt's `public/` at build time via a simple script or Vite alias — choose the simpler path.

---

## Site Architecture

```
/                          → Home
/services                  → Services overview (3 featured categories)
/services/[slug]           → Service detail (roofing, gutters, pressure-washing, gutter-cleaning, gutter-guards)
/book                      → Booking page with Cal.com embed
/about                     → About
/contact                   → Contact form + info
```

All routes SSR. No SPA-only pages.

---

## Sanity Schema

### `siteConfig` (singleton document)

```ts
{
  businessName: string         // "Superior Exteriors & Maintenance"
  tagline: string              // "Our sweat, your equity."
  phone: string                // "(503) 860-2218"
  email: string                // "SuperiorEandMcorp@gmail.com"
  licenseNumber: string        // "CCB #242198"
  licenseFooterText: string    // "Licensed · Insured · Bonded"
  serviceArea: string          // "Springfield & Eugene, OR"
  calComBaseUrl: string        // "https://cal.com/superior-exteriors"
  stripePaymentLink: string    // optional — empty in v1
  logo: image
  heroHeadline: string
  heroSubheadline: string
  colors: {
    primary: string            // hex — teal
    dark: string               // hex — dark base
  }
}
```

### `service` (array document)

```ts
{
  _id: string
  slug: { current: string }
  name: string                 // "Roofing"
  shortDescription: string     // 1 sentence for cards
  longDescription: portableText
  icon: string                 // lucide icon name ("home", "droplets", etc.)
  featured: boolean            // true = appears in nav + home + /services grid
  navOrder: number             // display order
  calComEventTypeSlug: string  // "roof-estimate", "gutter-cleaning", etc.
  subScope: string[]           // ["Removal", "Installation", "Repairs", ...]

  // Pricing — all optional. Empty = "Let's book and discuss" CTA.
  startingPrice?: number       // integer dollars
  priceLabel?: string          // "Starting at $X" — only displayed if set
  pricingTiers?: {
    name: string
    price: number
    description: string
    features: string[]
  }[]

  gallery: {
    before?: image
    during?: image
    after: image
    caption?: string
  }[]
  faq: {
    question: string
    answer: string
  }[]
  whatIsIncluded: string[]
}
```

### `review` (array document)

```ts
{
  _id: string
  reviewerName: string
  location: string             // "Springfield, OR"
  rating: number               // 1-5
  body: string
  service: reference → service
  featured: boolean
  date: date
}
```

---

## Content Fallback Strategy — LOCKED

The site renders correctly **before Sanity is connected**. This is required so Matthew can ship a live URL to cold-call demos without waiting on Sanity configuration.

Implementation: a `useContent()` composable abstracts data source.

```ts
// app/composables/useContent.ts
// If runtimeConfig.public.sanityProjectId is empty, read from /clients/<CLIENT>/content/seed.ts
// Otherwise fetch from Sanity GROQ.
```

Seed data file `clients/superior-exteriors/content/seed.ts` contains the complete object tree — full 5 services with copy, 3 reviews, all FAQs. When Sanity goes live, that same data gets imported into the project via a one-shot `pnpm seed:sanity` script (documented in `SANITY_SETUP.md`).

---

## Page Specifications

### 1. Home Page (`/`)

**Section order:**

1. **Nav** — sticky. Logo left. Links center (Services, About, Contact). "Book now" button right in `brand.teal`. Mobile: hamburger.

2. **Hero** — full viewport height on desktop, `min-h-screen`. Background `brand.dark`. Logo centered above headline on mobile, left-aligned on desktop.
   - Eyebrow: `serviceArea` + `licenseNumber` in `brand.teal`, small caps
   - H1: `heroHeadline` — "Our sweat, your equity." large display type, white
   - Subhead: service list — "Roofing · Gutters · Pressure Washing", `brand.slate`
   - CTA row: Primary "Book a free estimate" (`brand.teal` bg, `brand.dark` text) + Ghost "See our work"
   - Trust bar: 4 items — "Licensed & Insured" / "CCB #242198" / "Springfield & Eugene" / "Free Estimates". Each with a teal dot indicator.

3. **Services strip** — `brand.light` background. Header "What we do". 3-card grid (featured services only). Each card:
   - Teal accent bar (4px top border)
   - Lucide icon in teal
   - Service name
   - Short description
   - Sub-scope list (condensed)
   - **CTA row:** `"Book a free quote"` (primary) + `"Learn more"` (ghost). **No price** shown unless `priceLabel` is set.

4. **Before/After showcase** — `brand.dark` background. Header "The work speaks for itself".
   - **Pressure washing:** Before/after drag slider (`img-comparison-slider`).
   - **Gutter cleaning:** Before/after drag slider.
   - **Roofing:** 3-panel card (Before → During → After).
   - Layout: responsive 3-column grid, stacks on mobile.

5. **Reviews** — white background. Header "What homeowners are saying". 3 featured review cards. Star rating, reviewer name + location, service tag badge.

6. **CTA banner** — `brand.teal` background. Headline "Ready to protect your home?" Subtext "Free estimates. Licensed, insured, and bonded. Local to Springfield & Eugene." Button "Book your free estimate" (white bg, dark text).

7. **Footer** — `brand.dark`. Logo + tagline left. Nav center. Contact + CCB right. Copyright.

---

### 2. Services Page (`/services`)

- Dark hero, H1 "Our Services". Subtext about free quotes.
- 3-card grid (featured services only). Card layout larger than home strip but same component.
- Below the grid: small "Also available" row linking to Gutter Cleaning and Gutter Guards sub-pages.
- Each card links to `/services/[slug]`.

---

### 3. Service Detail Page (`/services/[slug]`)

Dynamic route. Fetch service by slug from `useContent()`.

**Sections:**
1. Dark hero with service name, sub-scope badges, and CTA. CTA text:
   - If `priceLabel` set → "Book your free quote · Starting at {priceLabel}"
   - Else → "Let's book and discuss"
2. "What's included" — icon list from `whatIsIncluded` array.
3. `pricingTiers` table — only renders if the array is populated. Otherwise omit the section entirely.
4. **Before/After gallery** — render based on available photos:
   - 2 photos (before + after): drag slider
   - 3 photos (before + during + after): 3-panel card row
   - Only after: single featured photo with caption
5. FAQ accordion from `faq` array.
6. Booking CTA — "Ready to book?" + Cal.com embed (iframe with `calComEventTypeSlug`).

---

### 4. Book Now Page (`/book`)

- Light background. Minimal.
- Page header: "Book a Free Estimate".
- Service selector dropdown (all 5 services — featured and non-featured). On change, updates Cal.com embed URL to matching event-type slug.
- Address field: plain text input, passed to Cal.com via prefill URL params if supported.
- Full-width Cal.com iframe below.
- Desktop-only sidebar: 3-step "What to expect" — "1. Book online" / "2. We confirm within 2 hours" / "3. We show up on time".

---

### 5. About Page (`/about`)

- Dark hero: "Local. Licensed. Accountable."
- Owner photo placeholder: `owner-photo.jpg` in client public dir. If missing, render a `brand.slate` initials tile ("RB").
- Story section: 2–3 paragraphs from seed copy.
- Values list: 3 items with teal icon indicators:
  - "We treat your home like it's ours"
  - "No hidden fees. Ever."
  - "Oregon licensed, insured, and bonded"
- CCB license badge (prominent).
- CTA → Contact.

**Placeholder about copy** (in seed data):

> Superior Exteriors & Maintenance was built on one belief: your home is your biggest investment, and it deserves to be treated that way. We're a local Springfield crew that shows up on time, does the job right, and leaves your property cleaner than we found it.
>
> Every project we take on — whether it's a full roof replacement or a gutter cleaning — gets the same attention to detail. We're not a franchise. We're your neighbors.

---

### 6. Contact Page (`/contact`)

- Split layout on desktop: form left, contact info right.
- Form fields: Name (required), Phone, Email (required), Service type (dropdown from services), Message.
- Submit: `POST /api/contact` → Resend → delivers to `siteConfig.email`.
- Right panel: large phone number, email, service area, response-time promise ("We respond within 2 business hours"), Google Maps iframe (Springfield OR centered).
- Success state: inline confirmation, no redirect.
- Form validation: `vee-validate` + `zod`.

---

## Photo Asset Usage

Original source location: `/clients/superior-exteriors/public/images/` and `/public/brand/`.

| File | Usage |
|---|---|
| `brand/logo.png` | Nav, footer, hero, favicon source |
| `images/pressure-wash-before.png` | Home before/after slider — left |
| `images/pressure-wash-after.png` | Home before/after slider — right |
| `images/roof-before.png` | Roofing service — 3-panel card, panel 1 |
| `images/roof-during.png` | Roofing service — 3-panel card, panel 2 |
| `images/roof-after.png` | Roofing service — 3-panel card, panel 3 + hero + OG image |
| `images/gutter-clean-before.png` | Gutter cleaning slider left |
| `images/gutter-clean-after.png` | Gutter cleaning slider right |
| `images/gutter-guard-during.png` | Gutter guards — 2-panel during card |
| `images/gutter-guard-after.png` | Gutter guards — 2-panel after card + Gutters page hero |

**Image notes:**

- Portrait phone shots. Crop to 4:3 or 16:9 for hero/slider — focus on primary subject, crop from bottom.
- `gutter-guard-after.png` is hero-quality — use prominently on the Gutters service page.
- Always `<NuxtImg>` with `loading="lazy"` on below-fold imagery.

**Reference-only assets** (do not display on site):

- `assets/picture of business card.jpg` — source of truth for colors and contact info.
- `assets/logo file.jpg` — higher-res logo, use as favicon source and OG image source if `logo.png` comes out pixelated.

---

## Before/After Slider Component

Use `img-comparison-slider`.

```bash
pnpm add img-comparison-slider
```

Register as a Nuxt plugin (client-only). Usage:

```vue
<ClientOnly>
  <img-comparison-slider>
    <NuxtImg slot="first" :src="beforeSrc" :alt="beforeAlt" />
    <NuxtImg slot="second" :src="afterSrc" :alt="afterAlt" />
  </img-comparison-slider>
</ClientOnly>
```

Style the handle with `brand.teal`.

---

## Cal.com Setup

Configured by BWE on Ryan's behalf. See `docs/CAL_COM_SETUP.md` for step-by-step.

**Event types to create:**

| Event Type | Slug | Duration | Notes |
|---|---|---|---|
| Free Roof Estimate | `roof-estimate` | 60 min | In-person, requires address |
| Gutter Cleaning | `gutter-cleaning` | 30 min | In-person |
| Gutter Guard Install | `gutter-guard-install` | 45 min | In-person |
| Pressure Washing | `pressure-washing` | 30 min | In-person |
| General Estimate | `estimate` | 45 min | Default fallback |

**Embed config:**

- `calComBaseUrl` in Sanity = `https://cal.com/superior-exteriors` (placeholder until account exists)
- Service detail page iframe URL = `${calComBaseUrl}/${service.calComEventTypeSlug}`
- Loading state renders while iframe initializes
- Intake form per event type collects: full name, phone, service address, brief description

---

## Stripe Integration

- Sanity `siteConfig.stripePaymentLink` is optional. Empty in v1.
- When set, a "Pay deposit" button appears on service detail pages and booking confirmations.
- Button opens the Stripe Payment Link in a new tab (no Stripe.js, no embedded checkout).
- Deposit collection only — not full e-commerce.

---

## Component Architecture

```
/app/components
  /ui
    AppButton.vue          ← variants: primary | ghost | outline
    AppBadge.vue
    StarRating.vue
    AccordionItem.vue
  /sections
    SectionHero.vue
    SectionBeforeAfter.vue ← modes: slider | three-panel
    SectionServices.vue
    SectionReviews.vue
    SectionCtaBanner.vue
  /layout
    AppNav.vue
    AppFooter.vue
```

`SectionBeforeAfter` accepts:

```ts
interface BeforeAfterProps {
  mode: 'slider' | 'three-panel'
  label: string
  caption?: string
  before?: string
  during?: string
  after: string
}
```

---

## SEO & Meta

- `useHead()` + `useSeoMeta()` on every page.
- Home: "Superior Exteriors & Maintenance | Springfield, OR Roofing & Gutters"
- Services: "Our Services | Superior Exteriors & Maintenance"
- Service detail: "[Service Name] | Superior Exteriors & Maintenance"
- Meta description from Sanity with fallback.
- OG image default: `roof-after.png`.
- `LocalBusiness` JSON-LD on home with real name, phone, email, CCB, service area.

---

## Nuxt Config Notes

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sanity',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],
  nitro: {
    preset: 'netlify',
  },
  runtimeConfig: {
    resendApiKey: '',            // server only
    public: {
      client: process.env.CLIENT || 'superior-exteriors',
      sanityProjectId: '',
      sanityDataset: 'production',
      calComBaseUrl: '',
    },
  },
})
```

All secrets via env vars. Never hardcoded.

---

## Build Order

1. Scaffold repo structure per folder layout above
2. `pnpm install` — Nuxt 3, Tailwind, modules, img-comparison-slider, lucide-vue-next, vee-validate, zod, resend
3. `tailwind.config.ts` with design tokens
4. Client config: `clients/superior-exteriors/site.config.ts`
5. Seed data: `clients/superior-exteriors/content/seed.ts`
6. Sanity schemas (checked into repo, not deployed to Studio yet)
7. Composables: `useSiteConfig`, `useContent`, `useServices`
8. Layout components: AppNav, AppFooter
9. UI components: AppButton, AppBadge, StarRating, AccordionItem
10. Section components including SectionBeforeAfter
11. Home page
12. Services + service detail pages
13. Book page
14. About page
15. Contact page + `/api/contact` Resend route
16. SEO meta + JSON-LD
17. `netlify.toml`, `.env.example`, README, CODEOWNERS
18. GitHub repo + initial commit
19. Netlify project + first deploy
20. `docs/CAL_COM_SETUP.md` and `docs/SANITY_SETUP.md`
21. Responsive QA pass

---

## Definition of Done (v1)

- Repo pushed to GitHub, Netlify auto-deploying from `main`, live URL in Matthew's hands.
- All 6 pages render on the live URL without console errors.
- Before/after slider functional on mobile and desktop.
- Contact form validates client-side; server route is wired (Resend API key may be stub — flag in handoff if so).
- Cal.com embed shows graceful loading state with placeholder URL; swap to real URL once account exists.
- All images load via `<NuxtImg>` with lazy loading.
- Lighthouse ≥ 90 performance on home page (best-effort; flag if below).
- `siteConfig` + seed data are single source of truth — all client-specific values flow from `clients/superior-exteriors/`.
- No prices rendered anywhere. Every price-spot shows "Let's book and discuss".
- `docs/CAL_COM_SETUP.md` and `docs/SANITY_SETUP.md` complete and Matthew-ready.
- `docs/CLIENT_ONBOARDING.md` drafted so client #2 is a predictable day's work.
