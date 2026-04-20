// Superior Exteriors & Maintenance — client identity + brand tokens.
// This file is the single source of truth for client-specific strings that
// don't belong in CMS content (e.g., tagline shown before CMS hydrates,
// default social handles, and the color overrides for this client's theme).

export interface ClientSiteConfig {
  clientSlug: string
  businessName: string
  tagline: string
  phone: string
  email: string
  licenseNumber: string
  licenseFooterText: string
  serviceArea: string
  city: string
  region: string
  country: string

  // Hero defaults (Sanity can override)
  heroHeadline: string
  heroSubheadline: string

  // External links
  calComBaseUrl: string
  stripePaymentLink: string

  // Brand tokens — applied at runtime via CSS custom properties
  colors: {
    dark: string
    surface: string
    teal: string
    tealDark: string
    slate: string
    light: string
  }

  // Public-asset paths (served from /clients/<slug>/public via nitro.publicAssets)
  logo: string

  // Feature flags
  // When false, the home before/after showcase renders static after-photos
  // instead of the img-comparison-slider. Flip to true once we have strong
  // before/after pairs from the client.
  showBeforeAfterSliders: boolean

  // Misc
  socials?: {
    facebook?: string
    instagram?: string
    google?: string
  }
}

export const siteConfig: ClientSiteConfig = {
  clientSlug: 'superior-exteriors',
  businessName: 'Superior Exteriors & Maintenance',
  tagline: 'Our sweat, your equity.',
  phone: '(503) 860-2218',
  email: 'SuperiorEandMcorp@gmail.com',
  licenseNumber: 'CCB #242198',
  licenseFooterText: 'Licensed · Insured · Bonded',
  serviceArea: 'Springfield & Eugene, OR',
  city: 'Springfield',
  region: 'OR',
  country: 'US',

  heroHeadline: 'Our sweat, your equity.',
  heroSubheadline: 'Roofing · Gutters · Pressure Washing',

  // Placeholders — swap in the real URLs once Matthew finishes setup.
  calComBaseUrl: 'https://cal.com/superior-exteriors',
  stripePaymentLink: '',

  colors: {
    dark: '#1A1A24',
    surface: '#252535',
    teal: '#45BEBF',
    tealDark: '#2E8A8B',
    slate: '#8A9EAA',
    light: '#F4F6F8',
  },

  logo: '/brand/logo.jpg',

  // Flip to true once we have strong before/after pairs from Ryan.
  showBeforeAfterSliders: false,

  // Flip to true once we have strong before/after pairs from Ryan.
  showBeforeAfterSliders: false,

  socials: {
    // TODO: confirm with Ryan — using Google Business Profile as placeholder
    google: '',
  },
}

export default siteConfig
