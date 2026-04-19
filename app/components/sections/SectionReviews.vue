<script setup lang="ts">
import type { Review } from '~/composables/useContent'
import { useServices } from '~/composables/useContent'

interface Props {
  reviews: Review[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'What homeowners are saying',
})

const services = useServices()
function serviceName(slug: string): string {
  return services.find((s) => s.slug === slug)?.name ?? 'General'
}
</script>

<template>
  <section class="bg-white py-16 md:py-24">
    <div class="max-w-container mx-auto px-6 md:px-10">
      <header class="mb-10 md:mb-14">
        <h2 class="text-3xl md:text-headline font-semibold text-brand-dark">
          {{ title }}
        </h2>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="review in reviews"
          :key="review._id"
          class="rounded-xl p-6 md:p-7 bg-brand-light/60 border border-brand-dark/5 flex flex-col"
        >
          <StarRating :rating="review.rating" />

          <blockquote class="mt-4 italic text-brand-dark/80 leading-relaxed">
            "{{ review.body }}"
          </blockquote>

          <footer class="mt-6 pt-4 border-t border-brand-dark/10 flex items-center justify-between gap-3">
            <div>
              <p class="font-medium text-brand-dark">
                {{ review.reviewerName }}
              </p>
              <p class="text-sm text-brand-dark/60">
                {{ review.location }}
              </p>
            </div>
            <AppBadge tone="teal" size="sm">
              {{ serviceName(review.serviceSlug) }}
            </AppBadge>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>
