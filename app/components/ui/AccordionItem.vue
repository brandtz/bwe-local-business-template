<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

interface Props {
  question: string
  answer: string
  defaultOpen?: boolean
}

withDefaults(defineProps<Props>(), {
  defaultOpen: false,
})
</script>

<template>
  <details :open="defaultOpen" class="group">
    <summary
      class="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-brand-dark list-none marker:hidden [&::-webkit-details-marker]:hidden"
    >
      <span class="font-medium text-base md:text-lg">{{ question }}</span>
      <ChevronDown
        class="w-5 h-5 shrink-0 text-brand-teal transition-transform duration-200 group-open:rotate-180"
      />
    </summary>
    <div class="pb-4 pr-8 text-brand-dark/70 leading-relaxed">
      {{ answer }}
    </div>
  </details>
</template>
