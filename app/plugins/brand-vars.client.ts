// Client-only plugin: writes the active client's brand colors as CSS custom
// properties on <html>. Lets per-client theme overrides work without a Tailwind
// rebuild — components that want a client-aware color can reference
// `var(--brand-teal)` etc. Tailwind utility classes still use the baseline
// tokens from tailwind.config.ts; these vars cover custom CSS situations
// (e.g. img-comparison-slider handle color, gradients, inline styles).

import { useSiteConfig } from '~/composables/useSiteConfig'

export default defineNuxtPlugin(() => {
  const config = useSiteConfig()
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const { colors } = config
  if (!colors) return

  root.style.setProperty('--brand-dark', colors.dark)
  root.style.setProperty('--brand-surface', colors.surface)
  root.style.setProperty('--brand-teal', colors.teal)
  root.style.setProperty('--brand-teal-dark', colors.tealDark)
  root.style.setProperty('--brand-slate', colors.slate)
  root.style.setProperty('--brand-light', colors.light)
})
