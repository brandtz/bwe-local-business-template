// Sanity Studio config — loaded by the Studio when Matthew deploys it per docs/SANITY_SETUP.md.
// Not read by Nuxt at build time; Nuxt consumes Sanity over the API via @nuxtjs/sanity.

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'bwe-local-business',
  title: 'BWE Local Business Content',

  // Fill these with the real IDs once Matthew creates the Sanity project.
  // Safe to leave as empty strings in version control — Studio only runs locally/hosted for admins.
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
