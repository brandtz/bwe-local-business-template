// Sanity schema: review.
// Customer testimonials. Set featured=true to surface on the home page.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'reviewerName',
      title: 'Reviewer Name',
      type: 'string',
      description: 'Shown on the review card. Use first name + last initial if concerned about privacy.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Springfield, OR".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      description: 'Whole number from 1 to 5.',
      validation: (Rule) => Rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: 'body',
      title: 'Review Body',
      type: 'text',
      rows: 4,
      description: 'The review text itself.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'The service this review is about. Drives the tag badge on the card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'If true, appears in the home page reviews section.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'When the review was received.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'reviewerName', subtitle: 'location' },
  },
})
