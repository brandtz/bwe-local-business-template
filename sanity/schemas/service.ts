// Sanity schema: service.
// One document per service (Roofing, Gutters, Pressure Washing, etc).
// Pricing fields are optional — the UI falls back to "Let's book and discuss"
// whenever they're empty, so leaving them blank is a valid, intentional state.

import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      description: 'e.g. "Roofing", "Gutters".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL path (e.g. "roofing" → /services/roofing). Click Generate.',
      options: { source: 'name', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'One sentence shown on cards and search results.',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full body copy for the service detail page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'lucide-vue-next icon name (e.g. "home", "droplets", "shield").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'If true, appears in nav + home grid + main /services grid.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navOrder',
      title: 'Nav Order',
      type: 'number',
      description: 'Lower numbers come first.',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'calComEventTypeSlug',
      title: 'Cal.com Event Type Slug',
      type: 'string',
      description: 'e.g. "roof-estimate". Must match a Cal.com event type.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subScope',
      title: 'Sub-scope',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short list of what this service includes, e.g. ["Removal", "Installation"].',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price (optional)',
      type: 'number',
      description:
        'Dollar amount. Leave blank in v1. When set, displays on cards + detail page.',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price Label (optional)',
      type: 'string',
      description:
        'Human label shown with the price, e.g. "Starting at $X". Leave blank to hide.',
    }),
    defineField({
      name: 'pricingTiers',
      title: 'Pricing Tiers (optional)',
      type: 'array',
      description: 'Leave empty to hide the pricing section entirely.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Tier Name', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'price', title: 'Price (USD)', type: 'number', validation: (R) => R.required() }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'price' } },
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Before / During / After Gallery',
      type: 'array',
      description:
        'Each entry can have a before + during + after (3-panel) OR before + after (slider) OR just an after photo.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'before', title: 'Before', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'during', title: 'During', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'after',
              title: 'After',
              type: 'image',
              options: { hotspot: true },
              validation: (R) => R.required(),
            }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
          preview: { select: { title: 'caption', media: 'after' } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (R) => R.required() }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),
    defineField({
      name: 'whatIsIncluded',
      title: "What's Included",
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points shown on the service detail page.',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      media: 'gallery.0.after',
    },
  },
})
