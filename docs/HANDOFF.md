# Handoff — Superior Exteriors Template v1

> What Matthew needs to do locally to finish what the agent couldn't. Ordered. Each step takes 2–10 minutes.

## Context

The agent (Claude, in Cowork mode) scaffolded the repo, pushed the full codebase to GitHub, and wrote the setup docs. Three things the agent **could not** do from the sandbox:

1. Commit the 10 binary image assets (PNG/JPEG bytes can't transit JSON-based MCP calls cleanly).
2. Clean up a corrupted `logo.png` and a `test-logo.png` that were pushed as base64 text during debugging.
3. Click "Connect" in Netlify, Sanity, and Cal.com UIs.

Steps 1–3 below handle those. Steps 4–6 finish the external-service wiring.

---

## 1. Clean up the corrupted files on GitHub

Two bad files currently exist on `main`:

- `clients/superior-exteriors/public/brand/logo.png` — stored as ASCII base64 text, not actual image bytes. Browsers will refuse it.
- `test-logo.png` (repo root) — leftover from MCP binary-upload testing.

Delete both in one commit:

```bash
cd D:\LOCAL_BUSINESS_MARKETPLACE\superior_exteriors\superior-exteriors-intake\superior-exteriors
git pull
git rm clients/superior-exteriors/public/brand/logo.png test-logo.png
git commit -m "chore: remove corrupted logo and test artifact"
git push
```

## 2. Commit the real image assets

The 10 image files live at `clients/superior-exteriors/public/` on your disk. They were never pushed.

```bash
git add clients/superior-exteriors/public/brand/logo.png
git add clients/superior-exteriors/public/images/
git status                      # sanity-check: 10 files staged, all binary
git commit -m "feat: add brand logo + before/after photo assets"
git push
```

### Tech debt flagged — file extensions lie

`file clients/superior-exteriors/public/brand/logo.png` reports `JPEG image data`. All ten `.png` files are actually JPEGs. Modern browsers content-sniff and render them anyway, but it's a minor correctness issue.

**Recommended:** after launch, either rename the files to `.jpg` and update the references in `seed.ts` + `site.config.ts`, or re-encode them to real PNGs with ImageMagick:

```bash
for f in clients/superior-exteriors/public/**/*.png; do
  magick "$f" "${f%.png}.real.png" && mv "${f%.png}.real.png" "$f"
done
```

Non-blocking. Ship first, fix after.

## 3. Verify the repo builds locally

```bash
pnpm install
pnpm dev
# Open http://localhost:3000 — home, services, about, contact should all render
```

If any image 404s after step 2, the path in `seed.ts` doesn't match the file on disk. Filenames are case-sensitive on Netlify's Linux runners even though Windows is lenient — double-check casing before pushing.

---

## 4. Cal.com (20–30 min)

Full runbook: [`docs/CAL_COM_SETUP.md`](./CAL_COM_SETUP.md).

TL;DR: sign up as `superior-exteriors`, create 5 event types matching the slugs in `seed.ts`, set `CAL_COM_BASE_URL=https://cal.com/superior-exteriors` in Netlify.

## 5. Sanity (45–60 min)

Full runbook: [`docs/SANITY_SETUP.md`](./SANITY_SETUP.md).

TL;DR: create a project, populate `siteConfig` + 5 services + 3–5 reviews, deploy the Studio, set `SANITY_PROJECT_ID` + `SANITY_DATASET` in Netlify.

You can launch the site **before** Sanity is wired — the `seed.ts` fallback means content renders either way. Do Netlify first, Sanity second.

## 6. Netlify (15 min)

1. <https://app.netlify.com> → **Add new site** → **Import from Git** → GitHub → `brandtz/bwe-local-business-template`.
2. Branch: `main`. Build command: `pnpm install --no-frozen-lockfile && pnpm run build`. Publish directory: `.output/public` (Nitro's Netlify preset handles routing automatically).
3. **Environment variables** (Site settings → Environment variables):

   ```
   CLIENT=superior-exteriors
   SITE_URL=https://<your-netlify-subdomain>.netlify.app
   CAL_COM_BASE_URL=https://cal.com/superior-exteriors
   RESEND_API_KEY=<leave blank until step 7>
   SANITY_PROJECT_ID=<leave blank until Sanity step is done>
   SANITY_DATASET=production
   ```

4. **Deploy site**. First build takes ~3–4 minutes.
5. Verify: home, services, each of 5 service detail pages, about, contact render without console errors. Test the contact form — it will 500 until `RESEND_API_KEY` is set, which is expected.

### Custom domain (later)
Once Ryan confirms a domain (e.g. `superiorexteriors.com`):
1. Buy via Cloudflare Registrar or Namecheap.
2. Netlify → Domain management → Add custom domain.
3. Point DNS to Netlify's nameservers (simplest) or set an ALIAS/CNAME.
4. Update `SITE_URL` env var → redeploy.
5. Add the production domain to Sanity CORS origins.

## 7. Resend (10 min, later)

Needed only when the contact form goes live.

1. <https://resend.com/signup> — use `SuperiorEandMcorp@gmail.com`.
2. Verify a sending domain (or use Resend's sandbox for testing).
3. Create an API key — scope: **sending**, no domain restriction in v1.
4. Netlify → `RESEND_API_KEY=<key>` → redeploy.
5. Submit a test through the contact form. Confirm Ryan receives the email.

## 8. Responsive QA pass

After the Netlify deploy is live:

- Chrome DevTools device emulation: iPhone SE, iPhone 14 Pro, iPad, desktop 1440px. Every page should pass.
- Real device check on a phone (Ryan's or yours). Look for: nav menu usable with one hand, before/after slider works on touch, phone number is tap-to-call, Cal.com iframe loads.
- Lighthouse: target 90+ on Performance and 95+ on Accessibility. SEO and Best Practices should also be green.

Any below-target score → file as a GitHub issue, don't block launch.

---

## Post-launch next steps (not urgent)

- Replace JPEG-as-PNG files with real PNGs (tech debt from section 2).
- Add a `clients/guided-growth/` folder once Matthew's partner's site is ready to fold into this template.
- Build the Resend webhook to log failed sends — currently we only know a submission failed if Ryan tells us.
- Evaluate: is Sanity overkill for Ryan's wife's editing volume? If she edits < 1x/month, consider pulling content back into the code and removing Sanity entirely to cut complexity. Decision point: 60 days post-launch.

---

## Repo state at handoff

- **Branch:** `main`
- **Last agent commit:** see GitHub history. Includes: full Nuxt app, all 6 pages, Sanity schemas, contact form server route, 3 setup docs.
- **Not yet in repo:** image assets (step 2), `logo.png` is currently corrupt (step 1).
- **Not yet external:** Cal.com, Sanity, Netlify, Resend.

Everything from here is manual clicks + a handful of git commits. No more code needed for v1.
