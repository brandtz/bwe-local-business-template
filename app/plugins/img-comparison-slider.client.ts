// Client-only plugin: registers the <img-comparison-slider> custom element.
// Usage must still be wrapped in <ClientOnly> in templates since the element
// is undefined during SSR.

import 'img-comparison-slider'

export default defineNuxtPlugin(() => {
  // The import above triggers the package's side-effect registration of the
  // custom element on `window.customElements`. No additional wiring required.
})
