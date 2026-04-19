<script setup lang="ts">
interface Props {
  headline: string
  subtext?: string
  buttonLabel: string
  buttonTo: string
}

defineProps<Props>()
</script>

<template>
  <section class="bg-brand-teal py-16 md:py-20">
    <div class="max-w-container mx-auto px-6 md:px-10 text-center">
      <h2 class="text-3xl md:text-headline font-semibold text-brand-dark">
        {{ headline }}
      </h2>
      <p
        v-if="subtext"
        class="mt-4 text-brand-dark/80 max-w-2xl mx-auto"
      >
        {{ subtext }}
      </p>
      <div class="mt-8 flex justify-center">
        <NuxtLink
          :to="buttonTo"
          class="inline-flex items-center justify-center rounded-lg bg-white text-brand-dark font-medium px-6 py-3 hover:bg-brand-light transition-colors"
        >
          {{ buttonLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
