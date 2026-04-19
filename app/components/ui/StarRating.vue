<script setup lang="ts">
import { Star } from 'lucide-vue-next'

interface Props {
  rating: number // 1-5
}

const props = defineProps<Props>()

const stars = computed(() => {
  const clamped = Math.max(0, Math.min(5, Math.round(props.rating)))
  return [1, 2, 3, 4, 5].map((i) => i <= clamped)
})
</script>

<template>
  <div class="inline-flex items-center gap-0.5" role="img" :aria-label="`${rating} out of 5 stars`">
    <Star
      v-for="(filled, i) in stars"
      :key="i"
      class="w-4 h-4"
      :class="filled ? 'fill-brand-teal text-brand-teal' : 'text-brand-slate/50'"
      :stroke-width="filled ? 1 : 1.5"
    />
    <span class="sr-only">{{ rating }} / 5</span>
  </div>
</template>
