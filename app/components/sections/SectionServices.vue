<script setup lang="ts">
import * as LucideIcons from 'lucide-vue-next'
import type { Service } from '~/composables/useContent'

interface Props {
  services: Service[]
  title?: string
  variant?: 'home' | 'page'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'What we do',
  variant: 'home',
})

// Resolve a lucide icon by name with a safe fallback.
function iconFor(name: string) {
  const icons = LucideIcons as unknown as Record<string, unknown>
  const key = name
    .split(/[-_ ]/)
    .filter(Boolean)
    .map((chunk) => chunk[0]!.toUpperCase() + chunk.slice(1).toLowerCase())
    .join('')
  return icons[key] ?? icons.CircleDot ?? icons.Home
}
</script>

<template>
  <section class="bg-brand-light py-16 md:py-24">
    <div class="max-w-container mx-auto px-6 md:px-10">
      <header class="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <h2 class="text-3xl md:text-headline font-semibold text-brand-dark">
          {{ title }}
        </h2>
        <p class="text-brand-dark/60 max-w-md">
          Licensed, insured, and bonded. Free estimates, straight answers, and clean job sites.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="service in services"
          :key="service._id"
          class="bg-white rounded-xl shadow-sm border-t-4 border-brand-teal p-6 md:p-7 flex flex-col"
        >
          <div class="mb-4 w-11 h-11 rounded-lg bg-brand-teal/15 text-brand-teal-dark grid place-items-center">
            <component :is="iconFor(service.icon)" class="w-6 h-6" />
          </div>

          <h3 class="text-xl md:text-2xl font-semibold text-brand-dark">
            {{ service.name }}
          </h3>

          <p class="mt-2 text-brand-dark/70 leading-relaxed">
            {{ service.shortDescription }}
          </p>

          <p class="mt-3 text-sm text-brand-dark/50">
            {{ service.subScope.join(' · ') }}
          </p>

          <!--
            Intentional: no price rendered in v1. `priceLabel` and `startingPrice`
            are undefined on seed data; the CTA below is the price-spot fallback.
          -->

          <div class="mt-6 flex flex-wrap gap-2 pt-4 border-t border-brand-dark/10">
            <AppButton
              variant="primary"
              size="sm"
              :to="`/book?service=${service.slug}`"
            >
              Book a free quote
            </AppButton>
            <AppButton
              variant="outline"
              size="sm"
              :to="`/services/${service.slug}`"
            >
              Learn more
            </AppButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
