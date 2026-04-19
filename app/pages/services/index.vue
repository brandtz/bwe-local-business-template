<script setup lang="ts">
import { useSiteConfig } from '~/composables/useSiteConfig'
import { useFeaturedServices, useServices } from '~/composables/useContent'

const config = useSiteConfig()
const featured = useFeaturedServices()
const all = useServices()
const alsoAvailable = all.filter((s) => !s.featured)

useSeoMeta({
  title: `Our Services | ${config.businessName}`,
  description: `Roofing, gutters, and pressure washing across ${config.serviceArea}. Free estimates. ${config.licenseFooterText}.`,
})
</script>

<template>
  <div>
    <SectionHero
      variant="medium"
      :eyebrow="config.serviceArea"
      headline="Our Services"
      subheadline="Free estimates across Lane County. Licensed, insured, bonded."
    />

    <SectionServices :services="featured" title="Core services" variant="page" />

    <section v-if="alsoAvailable.length" class="bg-brand-light pb-16 md:pb-24">
      <div class="max-w-container mx-auto px-6 md:px-10">
        <div class="bg-white rounded-xl p-6 md:p-8 border border-brand-dark/5 shadow-sm">
          <h3 class="text-lg font-semibold text-brand-dark mb-3">
            Also available
          </h3>
          <p class="text-brand-dark/70 mb-5">
            Focused sub-services available on request or as part of a larger scope.
          </p>
          <ul class="flex flex-wrap gap-x-6 gap-y-2">
            <li v-for="service in alsoAvailable" :key="service._id">
              <NuxtLink
                :to="`/services/${service.slug}`"
                class="text-brand-teal-dark underline underline-offset-4 decoration-brand-teal/40 hover:decoration-brand-teal"
              >
                {{ service.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <SectionCtaBanner
      headline="Not sure which service you need?"
      subtext="Tell us what's going on. We'll walk you through it and give you a clear estimate."
      button-label="Get in touch"
      button-to="/contact"
    />
  </div>
</template>
