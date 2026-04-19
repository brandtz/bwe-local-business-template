// Builds a Cal.com embed URL from the active siteConfig.calComBaseUrl.
// Returns '' when the base URL is empty so components can render a graceful
// placeholder instead of a broken iframe src.

import { useSiteConfig } from './useSiteConfig'

export function useCalComUrl(eventTypeSlug?: string): string {
  const config = useSiteConfig()
  const base = (config.calComBaseUrl || '').replace(/\/+$/, '')
  if (!base) return ''
  if (!eventTypeSlug) return base
  return `${base}/${eventTypeSlug.replace(/^\/+/, '')}`
}
