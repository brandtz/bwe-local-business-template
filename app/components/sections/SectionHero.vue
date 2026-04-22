<script setup lang="ts">
import { useSiteConfig } from '~/composables/useSiteConfig'

interface Props {
  headline: string
  subheadline?: string
  eyebrow?: string
  trustItems?: string[]
  variant?: 'full' | 'medium'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'medium',
})

const config = useSiteConfig()

const heightClass = computed(() =>
  props.variant === 'full'
    ? 'min-h-[92vh] md:min-h-screen'
    : 'min-h-[48vh] md:min-h-[60vh]',
)
</script>

<template>
  <section
    class="bg-brand-dark text-white relative overflow-hidden"
    :class="heightClass"
  >
    <!-- Subtle architectural decoration -->
    <div class="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-30 pointer-events-none md:opacity-50">
      <div class="w-[600px] h-[600px] rounded-full bg-brand-teal/10 blur-3xl"></div>
    </div>
    <div class="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 opacity-20 pointer-events-none">
      <div class="w-[400px] h-[400px] rounded-full bg-brand-slate/10 blur-3xl"></div>
    </div>
    <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none pb-40"></div>

    <div
      class="relative z-10 max-w-container mx-auto px-6 md:px-10 py-20 md:py-24 flex flex-col justify-center items-center md:items-start text-center md:text-left"
      :class="variant === 'full' ? 'md:py-28' : ''"
    >
      <NuxtImg
        :src="config.logo"
        :alt="`${config.businessName} logo`"
        class="h-14 md:h-16 w-auto mb-8"
        loading="eager"
        sizes="sm:120px md:160px"
      />

      <p
        v-if="eyebrow"
        class="text-xs md:text-sm uppercase tracking-[0.18em] text-brand-teal font-medium mb-4"
      >
        {{ eyebrow }}
      </p>

      <h1
        class="text-4xl md:text-display font-semibold leading-tight max-w-3xl"
      >
        {{ headline }}
      </h1>

      <p
        v-if="subheadline"
        class="mt-5 text-lg md:text-subhead text-brand-slate max-w-2xl"
      >
        {{ subheadline }}
      </p>

      <div v-if="$slots.default" class="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
        <slot />
      </div>

      <ul
        v-if="trustItems && trustItems.length"
        class="mt-10 flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start text-sm text-brand-slate"
      >
        <li
          v-for="item in trustItems"
          :key="item"
          class="inline-flex items-center gap-2"
        >
          <span class="w-2 h-2 rounded-full bg-brand-teal" aria-hidden="true"></span>
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>
