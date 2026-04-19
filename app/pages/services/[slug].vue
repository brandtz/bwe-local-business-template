<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next'
import { useSiteConfig } from '~/composables/useSiteConfig'
import { useService } from '~/composables/useContent'
import { useCalComUrl } from '~/composables/useCalComUrl'

const route = useRoute()
const config = useSiteConfig()

const slug = computed(() => String(route.params.slug))
const { data: service } = await useService(slug.value)

if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
}

const calComUrl = computed(() => useCalComUrl(service.value?.calComEventTypeSlug))

// Pick the correct Before/After mode per gallery item.
function modeFor(item: { before?: string; during?: string; after: string }): 'slider' | 'three-panel' {
  if (item.before && item.during && item.after) return 'three-panel'
  if (item.before && item.after) return 'slider'
  return 'three-panel' // single 'after' falls through to the panel-rendering grid which shows just one panel
}

useSeoMeta({
  title: () => service.value ? `${service.value.name} | ${config.businessName}` : config.businessName,
  description: () => service.value?.shortDescription ?? config.tagline,
  ogTitle: () => service.value?.name ?? config.businessName,
  ogImage: () => service.value?.gallery?.[0]?.after ?? '/images/roof-after.png',
})
</script>

<template>
  <div v-if="service">
    <SectionHero
      variant="medium"
      :eyebrow="service.subScope.join(' · ')"
      :headline="service.name"
      :subheadline="service.shortDescription"
    >
      <AppButton href="#book" variant="primary" size="lg">
        Let's book and discuss
      </AppButton>
      <AppButton :to="`/book?service=${service.slug}`" variant="ghost" size="lg">
        Book now
      </AppButton>
    </SectionHero>

    <!-- Long description -->
    <section class="bg-brand-light py-16 md:py-20">
      <div class="max-w-3xl mx-auto px-6 md:px-10">
        <div class="prose prose-lg max-w-none text-brand-dark/80 leading-relaxed space-y-4">
          <p v-for="(para, i) in service.longDescription" :key="i">
            {{ para }}
          </p>
        </div>
      </div>
    </section>

    <!-- What's included -->
    <section class="bg-white py-16 md:py-20 border-t border-brand-dark/5">
      <div class="max-w-container mx-auto px-6 md:px-10">
        <h2 class="text-2xl md:text-headline font-semibold text-brand-dark mb-8">
          What's included
        </h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li
            v-for="(item, i) in service.whatIsIncluded"
            :key="i"
            class="flex items-start gap-3 text-brand-dark/80"
          >
            <CheckCircle2 class="w-5 h-5 shrink-0 mt-0.5 text-brand-teal" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Pricing tiers — rendered only if populated (v1 = never) -->
    <section
      v-if="service.pricingTiers && service.pricingTiers.length"
      class="bg-brand-light py-16 md:py-20"
    >
      <div class="max-w-container mx-auto px-6 md:px-10">
        <h2 class="text-2xl md:text-headline font-semibold text-brand-dark mb-8">
          Pricing
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article
            v-for="(tier, i) in service.pricingTiers"
            :key="i"
            class="bg-white rounded-xl p-6 border border-brand-dark/5"
          >
            <h3 class="font-semibold text-xl text-brand-dark">{{ tier.name }}</h3>
            <p v-if="tier.price" class="mt-2 text-2xl font-semibold text-brand-teal-dark">
              ${{ tier.price }}
            </p>
            <p class="mt-3 text-brand-dark/70">{{ tier.description }}</p>
            <ul class="mt-4 space-y-2 text-sm text-brand-dark/80">
              <li v-for="(f, j) in tier.features" :key="j" class="flex gap-2">
                <CheckCircle2 class="w-4 h-4 shrink-0 mt-0.5 text-brand-teal" />
                <span>{{ f }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section
      v-if="service.gallery.length"
      class="bg-brand-dark py-16 md:py-20"
    >
      <div class="max-w-container mx-auto px-6 md:px-10">
        <h2 class="text-2xl md:text-headline font-semibold text-white mb-8">
          Before &amp; after
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <template v-for="(item, i) in service.gallery" :key="i">
            <!-- Slider when we have before+after (no during) -->
            <SectionBeforeAfter
              v-if="item.before && item.after && !item.during"
              mode="slider"
              :label="service.name"
              :before="item.before"
              :after="item.after"
              :caption="item.caption"
            />
            <!-- Three-panel when we have before+during+after -->
            <SectionBeforeAfter
              v-else-if="item.before && item.during && item.after"
              mode="three-panel"
              :label="service.name"
              :before="item.before"
              :during="item.during"
              :after="item.after"
              :caption="item.caption"
              class="md:col-span-2"
            />
            <!-- Single featured 'after' photo -->
            <figure
              v-else
              class="rounded-xl overflow-hidden ring-1 ring-white/10 bg-brand-surface"
            >
              <NuxtImg
                :src="item.after"
                :alt="item.caption ?? `${service.name} — finished`"
                loading="lazy"
                class="w-full aspect-[4/3] object-cover"
              />
              <figcaption v-if="item.caption" class="p-4 text-sm text-brand-slate">
                {{ item.caption }}
              </figcaption>
            </figure>
          </template>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section v-if="service.faq.length" class="bg-white py-16 md:py-20">
      <div class="max-w-3xl mx-auto px-6 md:px-10">
        <h2 class="text-2xl md:text-headline font-semibold text-brand-dark mb-6">
          Frequently asked
        </h2>
        <div class="divide-y divide-brand-dark/10">
          <AccordionItem
            v-for="(entry, i) in service.faq"
            :key="i"
            :question="entry.question"
            :answer="entry.answer"
            :default-open="i === 0"
          />
        </div>
      </div>
    </section>

    <!-- Booking -->
    <section id="book" class="bg-brand-light py-16 md:py-20">
      <div class="max-w-4xl mx-auto px-6 md:px-10">
        <header class="mb-6 text-center">
          <h2 class="text-2xl md:text-headline font-semibold text-brand-dark">
            Ready to book?
          </h2>
          <p class="mt-3 text-brand-dark/70">
            Pick a time that works for you. We'll confirm within two business hours.
          </p>
        </header>
        <div class="bg-white rounded-xl shadow-sm border border-brand-dark/5 overflow-hidden aspect-[4/5] md:aspect-[16/10]">
          <ClientOnly>
            <iframe
              v-if="calComUrl"
              :src="calComUrl"
              :title="`Book ${service.name}`"
              class="w-full h-full"
              frameborder="0"
              loading="lazy"
            />
            <div
              v-else
              class="w-full h-full grid place-items-center text-center p-6 text-brand-dark/60"
            >
              Booking calendar will appear here once Cal.com is configured.
            </div>
            <template #fallback>
              <div class="w-full h-full grid place-items-center text-brand-dark/50">
                Loading calendar...
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </section>
  </div>
</template>
