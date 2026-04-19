// Thin typed accessor for the active client's site.config.ts.
// The ~client alias is set in nuxt.config.ts and points at /clients/<CLIENT>/.
// Pages/components should import via this composable — do NOT import ~client directly.

import { siteConfig, type ClientSiteConfig } from '~client/site.config'

export function useSiteConfig(): ClientSiteConfig {
  return siteConfig
}

export type { ClientSiteConfig }
