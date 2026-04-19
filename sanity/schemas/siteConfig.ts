// Sanity schema: siteConfig (singleton).
// One document per client. Matthew (or Ryan's wife) edits this in Studio to
// change business-wide values without a code deploy.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  // Enforced as singleton via the Studio structure (desk) — see sanity.config.ts.
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      description: 'The full legal or trade name that appears in the nav, footer, and SEO.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short memorable line. Appears in hero + footer.',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Customer-facing phone. Include area code.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Where contact-form submissions are delivered.',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'licenseNumber',
      title: 'License Number',
      type: 'string',
      description: 'e.g. "CCB #242198". Appears in footer and About page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'licenseFooterText',
      title: 'License Footer Text',
      type: 'string',
      description: 'Short phrase like "Licensed · Insured · Bonded".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service Area',
      type: 'string',
      description: 'Where you work. e.g. "Springfield & Eugene, OR".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'calComBaseUrl',
      title: 'Cal.com Base URL',
      type: 'url',
      description: 'Your Cal.com username URL, e.g. https://cal.com/superior-exteriors',
      validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'stripePaymentLink',
      title: 'Stripe Payment Link (optional)',
      type: 'url',
      description:
        'Leave empty for v1. When set, a "Pay deposit" button will appear on service pages.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Primary logo used in the nav, hero, and footer. PNG with transparency preferred.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main H1 on the home page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'string',
      description: 'Shown under the hero headline. Service line or short value-prop.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colors',
      title: 'Brand Colors (optional overrides)',
      type: 'object',
      description:
        'Leave empty to use the template defaults. Set hex values to theme this client.',
      fields: [
        defineField({
          name: 'primary',
          title: 'Primary (teal)',
          type: 'string',
          description: 'Hex e.g. #45BEBF. Used for CTAs and accents.',
        }),
        defineField({
          name: 'dark',
          title: 'Dark (hero background)',
          type: 'string',
          description: 'Hex e.g. #1A1A24. Used for hero + nav background.',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'businessName', subtitle: 'tagline', media: 'logo' },
  },
})
