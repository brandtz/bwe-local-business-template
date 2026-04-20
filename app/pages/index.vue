<script setup lang="ts">
import { useSiteConfig } from '~/composables/useSiteConfig'
import { useFeaturedServices, useReviews, useServices } from '~/composables/useContent'

const config = useSiteConfig()
const featured = useFeaturedServices()
const reviews = useReviews()
const allServices = useServices()

// Resolve the gallery items for the home before/after showcase by slug.
// If the client's seed data ever changes slugs, these fall back to nothing
// instead of crashing the page.
const pressureWash = allServices.find((s) => s.slug === 'pressure-washing')
const gutterClean = allServices.find((s) => s.slug === 'gutter-cleaning')
const roofing = allServices.find((s) => s.slug === 'roofing')

const pressureGallery = pressureWash?.gallery[0]
const gutterGallery = gutterClean?.gallery[0]
const roofingGallery = roofing?.gallery[0]

// When the client hasn't supplied strong before/after pairs yet, render the
// showcase cards as static after-photos. Flip config.showBeforeAfterSliders
// to true once better photos are available to re-enable the slider/three-panel
// experience.
const showcaseEnabled = config.showBeforeAfterSliders
const pressureMode = showcaseEnabled ? 'slider' : 'static'
const gutterMode = showcaseEnabled ? 'slider' : 'static'
const roofingMode = showcaseEnabled ? 'three-panel' : 'static'
const showcaseSubhead = showcaseEnabled
  ? 'Real jobs. Real homeowners. Drag the sliders to see the difference.'
  : 'Real jobs. Real homeowners across Springfield and Eugene.'

useSeoMeta({
  title: `${config.businessName} | ${config.city}, ${config.region} Roofing & Gutters`,
  description: `${config.businessName} — roofing, gutters, and pressure washing across ${config.serviceArea}. ${config.licenseFooterText}. ${config.licenseNumber}.`,
  ogTitle: config.businessName,
  ogDescription: `${config.heroHeadline} — ${config.heroSubheadline}`,
  ogImage: '/images/roof-after.png',
  twitterCard: 'summary_large_image',
})

const ldJson = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: config.businessName,
  image: '/images/roof-after.png',
  telephone: config.phone,
  email: config.email,
  identifier: config.licenseNumber,
  areaServed: config.serviceArea,
  slogan: config.tagline,
  address: {
    '@type': 'PostalAddress',
    addressLocality: config.city,
    addressRegion: config.region,
    addressCountry: config.country,
  },
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(ldJson),
    },
  ],
})
</script>

<template>
  <div>
    <SectionHero
      variant="full"
      :eyebrow="`${config.serviceArea} · ${config.licenseNumber}`"
      :headline="config.heroHeadline"
      :subheadline="config.heroSubheadline"
      :trust-items="[
        'Licensed & Insured',
        config.licenseNumber,
        config.serviceArea,
        'Free Estimates',
      ]"
    >
      <AppButton to="/book" variant="primary" size="lg">
        Book a free estimate
      </AppButton>
      <AppButton to="/services" variant="ghost" size="lg">
        See our work
      </AppButton>
    </SectionHero>

    <SectionServices :services="featured" title="What we do" variant="home" />

    <!-- Before/After showcase -->
    <section class="bg-brand-dark py-16 md:py-24">
      <div class="max-w-container mx-auto px-6 md:px-10">
        <header class="mb-10 md:mb-14">
          <h2 class="text-3xl md:text-headline font-semibold text-white">
            The work speaks for itself
          </h2>
          <p class="mt-3 text-brand-slate max-w-xl">
            {{ showcaseSubhead }}
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <SectionBeforeAfter
            v-if="pressureGallery?.after && (!showcaseEnabled || pressureGallery?.before)"
            :mode="pressureMode"
            label="Pressure washing"
            :before="pressureGallery.before"
            :after="pressureGallery.after"
            :caption="pressureGallery.caption"
          />
          <SectionBeforeAfter
            v-if="gutterGallery?.after && (!showcaseEnabled || gutterGallery?.before)"
            :mode="gutterMode"
            label="Gutter cleaning"
            :before="gutterGallery.before"
            :after="gutterGallery.after"
            :caption="gutterGallery.caption"
          />
          <SectionBeforeAfter
            v-if="roofingGallery?.after"
            :mode="roofingMode"
            label="Roofing"
            :before="roofingGallery.before"
            :during="roofingGallery.during"
            :after="roofingGallery.after"
            :caption="roofingGallery.caption"
          />
        </div>
      </div>
    </section>

    <SectionReviews :reviews="reviews" />

    <SectionCtaBanner
      headline="Ready to protect your home?"
      :subtext="`Free estimates. ${config.licenseFooterText}. Local to ${config.serviceArea}.`"
      button-label="Book your free estimate"
      button-to="/book"
    />
  </div>
</template>
