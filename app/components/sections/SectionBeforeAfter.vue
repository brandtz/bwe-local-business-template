<script setup lang="ts">
// Before/After display component. Two modes:
//   - slider:       img-comparison-slider handle (requires `before` + `after`).
//                   Custom element is client-only; wrap in <ClientOnly>.
//   - three-panel:  grid of Before / During / After NuxtImg.

interface Props {
  mode: 'slider' | 'three-panel'
  label: string
  caption?: string
  before?: string
  during?: string
  after: string
}

const props = defineProps<Props>()
</script>

<template>
  <figure class="space-y-3">
    <h3 class="text-base md:text-lg font-semibold text-white">
      {{ label }}
    </h3>

    <!-- Slider mode -->
    <div
      v-if="mode === 'slider'"
      class="relative rounded-xl overflow-hidden ring-1 ring-white/10 bg-brand-surface aspect-[4/3]"
    >
      <ClientOnly>
        <img-comparison-slider
          class="block w-full h-full before-after-slider"
          hover="hover"
        >
          <NuxtImg
            v-if="before"
            slot="first"
            :src="before"
            :alt="`${label} — before`"
            loading="lazy"
            class="w-full h-full object-cover"
          />
          <NuxtImg
            slot="second"
            :src="after"
            :alt="`${label} — after`"
            loading="lazy"
            class="w-full h-full object-cover"
          />
        </img-comparison-slider>
        <template #fallback>
          <div class="w-full h-full grid place-items-center text-brand-slate text-sm">
            Loading comparison...
          </div>
        </template>
      </ClientOnly>
    </div>

    <!-- Three-panel mode -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-3 gap-3"
    >
      <div
        v-for="(panel, i) in [
          { src: before, label: 'Before' },
          { src: during, label: 'During' },
          { src: after, label: 'After' },
        ].filter((p) => !!p.src)"
        :key="i"
        class="relative rounded-xl overflow-hidden ring-1 ring-white/10 bg-brand-surface aspect-[4/3]"
      >
        <NuxtImg
          :src="panel.src as string"
          :alt="`${label} — ${panel.label.toLowerCase()}`"
          loading="lazy"
          class="w-full h-full object-cover"
        />
        <span
          class="absolute bottom-2 left-2 text-xs font-medium uppercase tracking-wide bg-brand-dark/80 text-white px-2 py-1 rounded"
        >
          {{ panel.label }}
        </span>
      </div>
    </div>

    <figcaption
      v-if="caption"
      class="text-sm text-brand-slate"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
/* Style the img-comparison-slider handle with brand teal. */
.before-after-slider {
  --divider-color: var(--brand-teal, #45BEBF);
  --divider-width: 2px;
  --default-handle-color: var(--brand-teal, #45BEBF);
  --default-handle-opacity: 1;
  --default-handle-width: 44px;
}
</style>
