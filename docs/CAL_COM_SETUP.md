# Cal.com Setup — Superior Exteriors

> 20–30 minute task. Do this once per client. Output: a Cal.com username and 5 event-type slugs that slot directly into the site's env vars and Sanity.

## 1. Create the account

1. Go to <https://cal.com/signup>.
2. Sign up with `SuperiorEandMcorp@gmail.com` (Ryan's business email). Use a password saved in your password manager — you'll hand this off later.
3. Free tier is fine. Skip all paid upsells.
4. When prompted for a username, use `superior-exteriors`. This becomes the URL: `https://cal.com/superior-exteriors`.
5. Set the display name to **Superior Exteriors & Maintenance**.
6. Timezone: **America/Los_Angeles** (Oregon).
7. Connect a Google Calendar for the same email so bookings don't double-book Ryan. Skip if Ryan isn't using Google Calendar yet — you can come back to it.

## 2. Create the 5 event types

Cal → Event Types → **New**. Repeat for each row:

| Title | URL slug | Duration | Location | Who it's for |
|---|---|---|---|---|
| Free Roof Estimate | `roof-estimate` | 60 min | In-person (use Ryan's service area) | Roofing jobs |
| Gutter Cleaning | `gutter-cleaning` | 30 min | In-person | Gutter cleaning |
| Gutter Guard Install | `gutter-guard-install` | 45 min | In-person | Gutter guards |
| Pressure Washing | `pressure-washing` | 30 min | In-person | Pressure washing |
| General Estimate | `estimate` | 45 min | In-person | Fallback / unknown |

For each event type:

- **Location:** pick "In-person" and enter `Springfield & Eugene, OR service area — address provided by customer`.
- **Event Description:** short sentence, e.g. "Ryan will come out, walk the property, and give you a written quote. Free, no pressure."
- **Buffer time:** 15 min before and after. Ryan's driving between jobs.
- **Availability:** Mon–Fri 8am–5pm to start. Ryan can loosen later.
- **Booking questions** (required):
  - Full name (built-in)
  - Phone number (built-in)
  - Service address (custom short-text question)
  - Brief description of the work (long-text)
- **Notifications:** workflow → SMS to Ryan's phone `(503) 860-2218` + email to `SuperiorEandMcorp@gmail.com` on new booking.

## 3. Verify the embed URLs work

Open each of these in an incognito window. All five must render the booking flow:

- <https://cal.com/superior-exteriors/roof-estimate>
- <https://cal.com/superior-exteriors/gutter-cleaning>
- <https://cal.com/superior-exteriors/gutter-guard-install>
- <https://cal.com/superior-exteriors/pressure-washing>
- <https://cal.com/superior-exteriors/estimate>

## 4. Wire into the site

Two places:

### Netlify env var
Site settings → Environment variables:

```
CAL_COM_BASE_URL=https://cal.com/superior-exteriors
```

Redeploy after saving.

### Sanity (once Sanity is set up — see SANITY_SETUP.md)
In the `siteConfig` singleton, set `calComBaseUrl` to `https://cal.com/superior-exteriors`.

The seed data already has the correct event-type slugs per service (`clients/superior-exteriors/content/seed.ts`). If you changed any slug in step 2, update `seed.ts` → the `calComEventTypeSlug` field on the matching service, and commit.

## 5. Handoff to Ryan (later)

When Ryan's wife is ready to take over:

1. In Cal → Settings → Account, change the email to hers and confirm.
2. Transfer password via 1Password shared vault or similar.
3. Remove your Google Calendar connection; have her connect hers.

## Known gotchas

- **Slug renaming** is NOT free. If you rename an event type, existing links break and you must update `seed.ts` + any printed/marketing material. Lock slugs before launch.
- **Paid plans** unlock round-robin, team scheduling, SMS reminders to customers. Not needed for Superior Exteriors v1. Revisit if Ryan adds a second crew.
- **Cal.com subdomain** (`superior-exteriors.cal.com`) is an alternate URL. Stick with the `/superior-exteriors` path form — simpler, works identically, and renames cleanly if we rebrand.
