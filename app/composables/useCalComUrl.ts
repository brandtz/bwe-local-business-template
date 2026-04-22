// Builds a Cal.com embed URL from runtime config when present, falling back
// to the active client site config.
// Returns '' when the base URL is empty so components can render a graceful
// placeholder instead of a broken iframe src.

import { useSiteConfig } from './useSiteConfig'

export function useCalComUrl(eventTypeSlug?: string): string {
  const config = useSiteConfig()
  const runtimeConfig = useRuntimeConfig()
  const base = (runtimeConfig.public.calComBaseUrl || config.calComBaseUrl || '').replace(/\/+$/, '')
  if (!base) return ''
  if (!eventTypeSlug) return base
  return `${base}/${eventTypeSlug.replace(/^\/+/, '')}`
}
