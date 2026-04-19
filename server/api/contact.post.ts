// Contact form handler. Validates with zod, then forwards to Resend.
// If RESEND_API_KEY is unset, returns { ok: true, skipped: true } so the
// live demo URL is functional before Resend is configured.

import { z } from 'zod'
import { siteConfig } from '~client/site.config'

const schema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().max(40).optional().default(''),
  email: z.string().email().max(180),
  serviceSlug: z.string().max(80).optional().default(''),
  message: z.string().min(10).max(5000),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    setResponseStatus(event, 400)
    return {
      ok: false,
      error: 'Invalid form data.',
      issues: parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    }
  }

  const { name, phone, email, serviceSlug, message } = parsed.data
  const config = useRuntimeConfig(event)
  const apiKey = config.resendApiKey

  const subject = `New quote request — ${name}`
  const text = [
    `New contact form submission for ${siteConfig.businessName}`,
    '',
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || '(not provided)'}`,
    `Service: ${serviceSlug || '(not specified)'}`,
    '',
    'Message:',
    message,
  ].join('\n')

  // No Resend key yet — log and succeed so the live demo works.
  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY not set — skipping send. Submission logged only.')
    console.info('[contact] Would have sent:', { to: siteConfig.email, subject })
    return { ok: true, skipped: true }
  }

  // Derive a plausible From address from SITE_URL host; fall back to onboarding sender.
  const siteUrl = (config.public.siteUrl as string) || 'http://localhost:3000'
  let fromDomain = 'resend.dev'
  try {
    fromDomain = new URL(siteUrl).hostname || fromDomain
  } catch {
    /* ignore */
  }
  const from = `noreply@${fromDomain}`

  try {
    const resp = await $fetch<{ id?: string }>('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: {
        from,
        to: [siteConfig.email],
        reply_to: email,
        subject,
        text,
      },
    })
    return { ok: true, id: resp?.id }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown Resend error.'
    console.error('[contact] Resend send failed:', msg)
    setResponseStatus(event, 502)
    return { ok: false, error: 'Email delivery failed. Please try again or call us.' }
  }
})
