<script setup lang="ts">
// Default page shell. Pages that want a non-default main background can set
// their own classes on their root section; the <main> wrapper here is neutral.
</script>

<template>
  <div class="min-h-screen flex flex-col bg-brand-light">
    <AppNav />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
