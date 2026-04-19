import type { Config } from 'tailwindcss'

// Baseline design tokens for the BWE local-business template.
// Per-client color overrides happen at runtime via CSS custom properties
// emitted from /clients/<CLIENT>/site.config.ts — see app/plugins/brand-vars.client.ts.

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts,tsx}',
    './clients/**/*.{vue,js,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1A1A24',
          surface: '#252535',
          teal: '#45BEBF',
          'teal-dark': '#2E8A8B',
          slate: '#8A9EAA',
          light: '#F4F6F8',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['3rem', { lineHeight: '1.1', fontWeight: '600' }],
        headline: ['2rem', { lineHeight: '1.2', fontWeight: '600' }],
        subhead: ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: {
        xl: '0.875rem',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
