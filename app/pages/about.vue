<script setup lang="ts">
import * as LucideIcons from 'lucide-vue-next'
import { useSiteConfig } from '~/composables/useSiteConfig'
import { useAbout } from '~/composables/useContent'

const config = useSiteConfig()
const about = useAbout()

function iconFor(name: string) {
  const icons = LucideIcons as unknown as Record<string, unknown>
  const key = name
    .split(/[-_ ]/)
    .filter(Boolean)
    .map((chunk) => chunk[0]!.toUpperCase() + chunk.slice(1).toLowerCase())
    .join('')
  return icons[key] ?? icons.Sparkles ?? icons.Home
}

const ownerInitials = computed(() =>
  about.ownerName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]!.toUpperCase())
    .join(''),
)

useSeoMeta({
  title: `About | ${config.businessName}`,
  description: `About ${config.businessName}. Local Springfield-area exterior contractor. ${config.licenseNumber}.`,
})
</script>

<template>
  <div>
    <SectionHero
      variant="medium"
      :eyebrow="config.serviceArea"
      :headline="about.heroHeadline"
      :subheadline="about.heroSubheadline"
    />

    <!-- Story + owner -->
    <section class="bg-white py-16 md:py-20">
      <div class="max-w-container mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 md:gap-14 items-start">
        <div>
          <h2 class="text-2xl md:text-headline font-semibold text-brand-dark mb-6">
            Our story
          </h2>
          <div class="space-y-4 text-brand-dark/80 leading-relaxed">
            <p v-for="(para, i) in about.story" :key="i">
              {{ para }}
            </p>
          </div>
        </div>

        <aside class="space-y-4">
          <div class="rounded-xl overflow-hidden aspect-square bg-brand-slate grid place-items-center">
            <NuxtImg
              v-if="about.ownerPhoto"
              :src="about.ownerPhoto"
              :alt="about.ownerName"
              loading="lazy"
              class="w-full h-full object-cover"
            />
            <span
              v-else
              class="text-white text-6xl font-semibold tracking-tight"
              :aria-label="about.ownerName"
            >
              {{ ownerInitials }}
            </span>
          </div>
          <div class="text-sm">
            <p class="font-semibold text-brand-dark">{{ about.ownerName }}</p>
            <p class="text-brand-dark/60">Owner · {{ config.businessName }}</p>
          </div>
        </aside>
      </div>
    </section>

    <!-- Values -->
    <section class="bg-brand-light py-16 md:py-20">
      <div class="max-w-container mx-auto px-6 md:px-10">
        <h2 class="text-2xl md:text-headline font-semibold text-brand-dark mb-10">
          What you can count on
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article
            v-for="(value, i) in about.values"
            :key="i"
            class="bg-white rounded-xl p-6 border border-brand-dark/5"
          >
            <div class="w-11 h-11 rounded-lg bg-brand-teal/15 text-brand-teal-dark grid place-items-center mb-4">
              <component :is="iconFor(value.icon)" class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-semibold text-brand-dark">{{ value.title }}</h3>
            <p class="mt-2 text-brand-dark/70 leading-relaxed">{{ value.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CCB badge -->
    <section class="bg-white py-16 md:py-20">
      <div class="max-w-xl mx-auto px-6 md:px-10 text-center">
        <div class="border-2 border-brand-teal rounded-xl py-10 px-6 bg-brand-light/50">
          <p class="text-sm uppercase tracking-[0.18em] text-brand-teal-dark font-medium">
            Oregon Construction Contractors Board
          </p>
          <p class="mt-4 text-3xl md:text-display font-semibold text-brand-dark">
            {{ config.licenseNumber }}
          </p>
          <p class="mt-3 text-brand-dark/70">
            {{ config.licenseFooterText }}
          </p>
        </div>
      </div>
    </section>

    <SectionCtaBanner
      headline="Want to talk?"
      subtext="We respond to every message within two business hours."
      button-label="Contact us"
      button-to="/contact"
    />
  </div>
</template>
