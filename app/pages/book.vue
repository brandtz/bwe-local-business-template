<script setup lang="ts">
import { useSiteConfig } from '~/composables/useSiteConfig'
import { useServices } from '~/composables/useContent'
import { useCalComUrl } from '~/composables/useCalComUrl'

const config = useSiteConfig()
const services = useServices()
const route = useRoute()

// Preselect from ?service= query if present
const initialSlug = (() => {
  const q = route.query.service
  const candidate = typeof q === 'string' ? q : ''
  return services.find((s) => s.slug === candidate)?.calComEventTypeSlug ?? 'estimate'
})()

const selectedEventType = ref<string>(initialSlug)
const address = ref('')

const iframeSrc = computed(() => {
  const base = useCalComUrl(selectedEventType.value)
  if (!base) return ''
  if (!address.value.trim()) return base
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}address=${encodeURIComponent(address.value.trim())}`
})

useSeoMeta({
  title: `Book a Free Estimate | ${config.businessName}`,
  description: `Book a free on-site estimate with ${config.businessName}. Serving ${config.serviceArea}.`,
})
</script>

<template>
  <div class="bg-brand-light min-h-[80vh] py-12 md:py-16">
    <div class="max-w-container mx-auto px-6 md:px-10">
      <header class="mb-10 text-center md:text-left">
        <p class="text-sm uppercase tracking-[0.18em] text-brand-teal font-medium">
          {{ config.serviceArea }}
        </p>
        <h1 class="mt-2 text-3xl md:text-display font-semibold text-brand-dark">
          Book a Free Estimate
        </h1>
        <p class="mt-3 text-brand-dark/70 max-w-2xl">
          Pick a service and a time that works for you. We'll confirm within two business hours.
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        <!-- Main booking column -->
        <div class="space-y-6">
          <div class="bg-white rounded-xl p-5 md:p-6 border border-brand-dark/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="flex flex-col gap-1.5 text-sm">
              <span class="font-medium text-brand-dark">Service</span>
              <select
                v-model="selectedEventType"
                class="rounded-lg border border-brand-dark/15 px-3 py-2.5 bg-white text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-teal"
              >
                <option value="estimate">General estimate</option>
                <option
                  v-for="service in services"
                  :key="service._id"
                  :value="service.calComEventTypeSlug"
                >
                  {{ service.name }}
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-1.5 text-sm">
              <span class="font-medium text-brand-dark">Address (optional)</span>
              <input
                v-model="address"
                type="text"
                placeholder="Street address, Springfield OR"
                class="rounded-lg border border-brand-dark/15 px-3 py-2.5 bg-white text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </label>
          </div>

          <div class="bg-white rounded-xl overflow-hidden border border-brand-dark/5 shadow-sm aspect-[4/5] md:aspect-[16/11]">
            <ClientOnly>
              <iframe
                v-if="iframeSrc"
                :src="iframeSrc"
                title="Cal.com booking"
                class="w-full h-full"
                frameborder="0"
                loading="lazy"
              />
              <div
                v-else
                class="w-full h-full grid place-items-center text-center p-6 text-brand-dark/60"
              >
                Booking calendar will appear here once Cal.com is configured.<br />
                In the meantime, call
                <a :href="`tel:${config.phone.replace(/[^\d+]/g, '')}`" class="text-brand-teal-dark underline">{{ config.phone }}</a>
                or
                <NuxtLink to="/contact" class="text-brand-teal-dark underline">send us a message</NuxtLink>.
              </div>
              <template #fallback>
                <div class="w-full h-full grid place-items-center text-brand-dark/50">
                  Loading calendar...
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>

        <!-- Desktop-only sidebar -->
        <aside class="hidden lg:block">
          <div class="sticky top-24 bg-white rounded-xl p-6 border border-brand-dark/5 shadow-sm">
            <h2 class="font-semibold text-brand-dark mb-5">
              What to expect
            </h2>
            <ol class="space-y-5 text-sm">
              <li class="flex gap-3">
                <span class="shrink-0 w-7 h-7 rounded-full bg-brand-teal text-brand-dark grid place-items-center font-semibold">1</span>
                <div>
                  <p class="font-medium text-brand-dark">Book online</p>
                  <p class="text-brand-dark/60">Pick a time that works. No sales calls.</p>
                </div>
              </li>
              <li class="flex gap-3">
                <span class="shrink-0 w-7 h-7 rounded-full bg-brand-teal text-brand-dark grid place-items-center font-semibold">2</span>
                <div>
                  <p class="font-medium text-brand-dark">We confirm within 2 hours</p>
                  <p class="text-brand-dark/60">You'll hear from Ryan or his wife by phone or email.</p>
                </div>
              </li>
              <li class="flex gap-3">
                <span class="shrink-0 w-7 h-7 rounded-full bg-brand-teal text-brand-dark grid place-items-center font-semibold">3</span>
                <div>
                  <p class="font-medium text-brand-dark">We show up on time</p>
                  <p class="text-brand-dark/60">Assessment, photos, and a written estimate.</p>
                </div>
              </li>
            </ol>

            <div class="mt-6 pt-6 border-t border-brand-dark/10 text-sm text-brand-dark/70 space-y-1">
              <p>{{ config.phone }}</p>
              <p class="break-all">{{ config.email }}</p>
              <p>{{ config.licenseNumber }}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
