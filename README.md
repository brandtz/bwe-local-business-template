# BWE Local Business Website Template

Reusable Nuxt 3 + Tailwind + Sanity + Netlify scaffold for BWE's cold-call-sold local small business websites. One codebase deploys N client sites via an environment variable.

**Template v1 client:** Superior Exteriors & Maintenance (Ryan Brown, Springfield OR).

## Quick Start

```bash
pnpm install
pnpm dev
```

The site renders immediately using seed data from `/clients/superior-exteriors/content/seed.ts`. No Sanity project required to demo.

## Choosing the client at build time

```bash
CLIENT=superior-exteriors pnpm build
```

The `CLIENT` env var picks which folder under `/clients/` supplies the site config, content seed, and public assets.

## Architecture

```
app/              # Shared Nuxt app (pages, components, composables) — client-agnostic
clients/          # One folder per client. site.config.ts + content/seed.ts + public/
sanity/           # Sanity schemas (shared across all clients)
server/           # Nuxt server routes (/api/contact, etc.)
docs/             # INTAKE_PACKAGE, CAL_COM_SETUP, SANITY_SETUP, CLIENT_ONBOARDING
```

## Deploying a new client

1. Copy `/clients/superior-exteriors/` → `/clients/<new-client>/`.
2. Edit `site.config.ts` and `content/seed.ts`.
3. Drop client assets into `public/brand/` and `public/images/`.
4. Create a new Netlify project from the same GitHub repo. Set `CLIENT=<new-client>` in env vars.
5. Optionally create a new Sanity project and wire `SANITY_PROJECT_ID`.

See `docs/CLIENT_ONBOARDING.md` for the full runbook.

## Spec

See `docs/INTAKE_PACKAGE.md` for the locked build specification.

## License

MIT. Copyright © Brandtworks-Enterprises LLC.
