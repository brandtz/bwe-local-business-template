<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { useSiteConfig } from '~/composables/useSiteConfig'

const config = useSiteConfig()
const open = ref(false)
const route = useRoute()

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// Close mobile menu on route change
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="sticky top-0 z-40 bg-brand-dark/85 backdrop-blur-md border-b border-white/10">
    <div class="max-w-container mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3 min-w-0" :aria-label="`${config.businessName} — home`">
        <NuxtImg
          :src="config.logo"
          :alt="`${config.businessName} logo`"
          class="h-9 w-auto"
          loading="eager"
        />
        <span class="hidden sm:block text-white font-medium truncate">
          {{ config.businessName }}
        </span>
      </NuxtLink>

      <!-- Desktop -->
      <nav class="hidden md:flex items-center gap-8" aria-label="Primary">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-brand-slate hover:text-brand-teal transition-colors"
          active-class="text-brand-teal"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="hidden md:block">
        <AppButton to="/book" variant="primary" size="sm">Book now</AppButton>
      </div>

      <!-- Mobile hamburger -->
      <button
        type="button"
        class="md:hidden text-white p-2 -mr-2 rounded-md hover:bg-white/5"
        :aria-expanded="open"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <Menu v-if="!open" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile slide-down panel -->
    <Transition
      enter-from-class="opacity-0 -translate-y-2"
      enter-active-class="transition duration-150"
      leave-active-class="transition duration-100"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="open"
        class="md:hidden bg-brand-dark border-t border-white/10 px-6 py-4"
      >
        <ul class="flex flex-col gap-3" aria-label="Mobile primary">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="block py-2 text-white hover:text-brand-teal"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
          <li class="pt-2">
            <AppButton to="/book" variant="primary" size="md">Book now</AppButton>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
