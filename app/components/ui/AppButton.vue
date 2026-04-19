<script setup lang="ts">
// Polymorphic button: renders <NuxtLink> for internal links (`to`),
// <a> for external (`href`), <button> otherwise. Variants per intake spec.

interface Props {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  target?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-sm px-3 py-1.5'
    case 'lg': return 'text-base px-6 py-3'
    default:   return 'text-sm px-4 py-2.5'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'ghost':
      return 'bg-transparent border border-brand-slate text-white hover:border-brand-teal hover:text-brand-teal'
    case 'outline':
      return 'bg-transparent border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-brand-dark'
    case 'primary':
    default:
      return 'bg-brand-teal text-brand-dark border border-brand-teal hover:bg-brand-teal-dark hover:border-brand-teal-dark'
  }
})

const classes = computed(() => [base, sizeClasses.value, variantClasses.value])

const linkTarget = computed(() => props.target ?? (props.href ? '_blank' : undefined))
const linkRel = computed(() =>
  props.href && linkTarget.value === '_blank' ? 'noopener noreferrer' : undefined,
)
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :target="linkTarget"
    :rel="linkRel"
    :class="classes"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="classes"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>
