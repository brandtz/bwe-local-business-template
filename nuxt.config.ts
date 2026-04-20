// BWE Local Business Website Template — Nuxt config
// Reads CLIENT env var to select /clients/<CLIENT>/ config + assets.

import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CLIENT = process.env.CLIENT || 'superior-exteriors'
const CLIENT_DIR = resolve(__dirname, 'clients', CLIENT)

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  srcDir: 'app/',

  // Serve client-specific public assets as the site's /public
  nitro: {
    preset: 'netlify',
    publicAssets: [
      {
        baseURL: '/',
        dir: resolve(CLIENT_DIR, 'public'),
        maxAge: 60 * 60 * 24 * 365,
      },
    ],
    // Alias so server routes (e.g. /api/contact) can import ~client/site.config
    alias: {
      '~client': CLIENT_DIR,
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sanity',
    '@vee-validate/nuxt',
  ],

  // Components in subdirectories (layout/, sections/, ui/) are auto-registered
  // under their bare names (e.g. <SectionHero>, <AppButton>) instead of the
  // default path-prefixed names (<SectionsSectionHero>, <UiAppButton>).
  // Without this, pages render as unknown elements and only slot text shows.
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  alias: {
    '~client': CLIENT_DIR,
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
    display: 'swap',
    download: true,
  },

  image: {
    format: ['webp', 'png'],
    quality: 80,
  },

  sanity: {
    projectId: process.env.SANITY_PROJECT_ID || '',
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: '2024-03-15',
    disableSmartCdn: false,
  },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    public: {
      client: CLIENT,
      sanityProjectId: process.env.SANITY_PROJECT_ID || '',
      sanityDataset: process.env.SANITY_DATASET || 'production',
      calComBaseUrl: process.env.CAL_COM_BASE_URL || '',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/brand/logo.jpg' },
      ],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
})
