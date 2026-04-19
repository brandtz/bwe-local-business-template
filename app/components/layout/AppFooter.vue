<script setup lang="ts">
import { useSiteConfig } from '~/composables/useSiteConfig'

const config = useSiteConfig()
const year = new Date().getFullYear()

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Book now', to: '/book' },
]

// Strip +1 and non-digits for tel: href
const telHref = computed(() => `tel:${config.phone.replace(/[^\d+]/g, '')}`)
</script>

<template>
  <footer class="bg-brand-dark text-white pt-16 pb-8 border-t border-white/10">
    <div class="max-w-container mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
      <!-- Left -->
      <div>
        <NuxtImg
          :src="config.logo"
          :alt="`${config.businessName} logo`"
          class="h-12 w-auto mb-4"
          loading="lazy"
        />
        <p class="text-brand-slate italic mb-3">
          "{{ config.tagline }}"
        </p>
        <p class="text-sm text-brand-slate">
          {{ config.licenseFooterText }}
        </p>
      </div>

      <!-- Center -->
      <nav aria-label="Footer">
        <h3 class="text-white font-semibold mb-4">Explore</h3>
        <ul class="space-y-2">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-brand-slate hover:text-brand-teal transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Right -->
      <div>
        <h3 class="text-white font-semibold mb-4">Get in touch</h3>
        <ul class="space-y-2 text-brand-slate">
          <li>
            <a :href="telHref" class="hover:text-brand-teal transition-colors">
              {{ config.phone }}
            </a>
          </li>
          <li>
            <a :href="`mailto:${config.email}`" class="hover:text-brand-teal transition-colors break-all">
              {{ config.email }}
            </a>
          </li>
          <li>{{ config.serviceArea }}</li>
          <li>{{ config.licenseNumber }}</li>
        </ul>
      </div>
    </div>

    <div class="max-w-container mx-auto px-6 md:px-10 mt-12 pt-6 border-t border-white/10 text-sm text-brand-slate">
      &copy; {{ year }} {{ config.businessName }}
    </div>
  </footer>
</template>
