<script setup lang="ts">
interface Props {
  tone?: 'teal' | 'slate' | 'dark'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'teal',
  size: 'sm',
})

const sizeClasses = computed(() =>
  props.size === 'md' ? 'text-sm px-3 py-1' : 'text-xs px-2.5 py-0.5',
)

const toneClasses = computed(() => {
  switch (props.tone) {
    case 'slate': return 'bg-brand-slate/15 text-brand-slate border border-brand-slate/30'
    case 'dark':  return 'bg-brand-dark text-white border border-brand-dark'
    case 'teal':
    default:      return 'bg-brand-teal/15 text-brand-teal-dark border border-brand-teal/40'
  }
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-full font-medium tracking-wide"
    :class="[sizeClasses, toneClasses]"
  >
    <slot />
  </span>
</template>
