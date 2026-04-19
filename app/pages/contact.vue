<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useSiteConfig } from '~/composables/useSiteConfig'
import { useServices } from '~/composables/useContent'

const config = useSiteConfig()
const services = useServices()

const schema = toTypedSchema(
  z.object({
    name: z.string().min(2, 'Please enter your name.'),
    phone: z.string().optional(),
    email: z.string().email('Please enter a valid email.'),
    serviceSlug: z.string().optional(),
    message: z.string().min(10, 'Tell us a little about the job (min 10 characters).'),
  }),
)

const { defineField, handleSubmit, errors, resetForm, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    phone: '',
    email: '',
    serviceSlug: '',
    message: '',
  },
})

const [name, nameAttrs] = defineField('name')
const [phone, phoneAttrs] = defineField('phone')
const [email, emailAttrs] = defineField('email')
const [serviceSlug, serviceAttrs] = defineField('serviceSlug')
const [message, messageAttrs] = defineField('message')

const submitted = ref(false)
const serverError = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  serverError.value = null
  try {
    const res = await $fetch<{ ok: boolean; error?: string }>('/api/contact', {
      method: 'POST',
      body: values,
    })
    if (res.ok) {
      submitted.value = true
      resetForm()
    } else {
      serverError.value = res.error ?? 'Something went wrong. Please try again or call us.'
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error.'
    serverError.value = msg
  }
})

const telHref = computed(() => `tel:${config.phone.replace(/[^\d+]/g, '')}`)

// Google Maps embed centered on Springfield, OR — no API key needed
const mapSrc =
  'https://www.google.com/maps?q=Springfield,+OR&t=&z=12&ie=UTF8&iwloc=&output=embed'

useSeoMeta({
  title: `Contact | ${config.businessName}`,
  description: `Contact ${config.businessName}. Serving ${config.serviceArea}. We respond within two business hours.`,
})
</script>

<template>
  <div class="bg-brand-light py-12 md:py-16">
    <div class="max-w-container mx-auto px-6 md:px-10">
      <header class="mb-10 text-center md:text-left">
        <p class="text-sm uppercase tracking-[0.18em] text-brand-teal font-medium">
          {{ config.serviceArea }}
        </p>
        <h1 class="mt-2 text-3xl md:text-display font-semibold text-brand-dark">
          Contact us
        </h1>
        <p class="mt-3 text-brand-dark/70 max-w-2xl">
          Tell us what's going on. We respond within two business hours.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Form -->
        <section class="bg-white rounded-xl p-6 md:p-8 border border-brand-dark/5 shadow-sm">
          <div
            v-if="submitted"
            class="rounded-lg bg-brand-teal/15 border border-brand-teal/30 p-4 text-brand-dark"
            role="status"
          >
            <p class="font-medium">Thanks — we'll be in touch within 2 business hours.</p>
            <button
              type="button"
              class="mt-2 text-sm underline text-brand-teal-dark"
              @click="submitted = false"
            >
              Send another message
            </button>
          </div>

          <form v-else class="space-y-5" novalidate @submit.prevent="onSubmit">
            <div>
              <label class="block text-sm font-medium text-brand-dark mb-1.5" for="name">Name *</label>
              <input
                id="name"
                v-model="name"
                v-bind="nameAttrs"
                type="text"
                class="w-full rounded-lg border border-brand-dark/15 px-3 py-2.5 bg-white text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-teal"
                :aria-invalid="!!errors.name"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-brand-dark mb-1.5" for="phone">Phone</label>
                <input
                  id="phone"
                  v-model="phone"
                  v-bind="phoneAttrs"
                  type="tel"
                  placeholder="(503) 555-0123"
                  class="w-full rounded-lg border border-brand-dark/15 px-3 py-2.5 bg-white text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-brand-dark mb-1.5" for="email">Email *</label>
                <input
                  id="email"
                  v-model="email"
                  v-bind="emailAttrs"
                  type="email"
                  class="w-full rounded-lg border border-brand-dark/15 px-3 py-2.5 bg-white text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  :aria-invalid="!!errors.email"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-brand-dark mb-1.5" for="service">Service type</label>
              <select
                id="service"
                v-model="serviceSlug"
                v-bind="serviceAttrs"
                class="w-full rounded-lg border border-brand-dark/15 px-3 py-2.5 bg-white text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-teal"
              >
                <option value="">Not sure yet</option>
                <option v-for="s in services" :key="s._id" :value="s.slug">
                  {{ s.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-brand-dark mb-1.5" for="message">Message *</label>
              <textarea
                id="message"
                v-model="message"
                v-bind="messageAttrs"
                rows="5"
                class="w-full rounded-lg border border-brand-dark/15 px-3 py-2.5 bg-white text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-teal resize-y"
                :aria-invalid="!!errors.message"
              />
              <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
            </div>

            <div v-if="serverError" class="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm" role="alert">
              {{ serverError }}
              <button type="button" class="ml-2 underline" @click="onSubmit">Retry</button>
            </div>

            <AppButton type="submit" variant="primary" size="lg" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending…' : 'Send message' }}
            </AppButton>
          </form>
        </section>

        <!-- Info panel -->
        <section class="space-y-6">
          <div class="bg-white rounded-xl p-6 md:p-8 border border-brand-dark/5 shadow-sm">
            <h2 class="font-semibold text-brand-dark mb-4">How to reach us</h2>
            <dl class="space-y-3 text-brand-dark/80">
              <div>
                <dt class="text-xs uppercase tracking-wider text-brand-dark/50">Phone</dt>
                <dd>
                  <a :href="telHref" class="text-xl font-semibold text-brand-teal-dark hover:underline">
                    {{ config.phone }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="text-xs uppercase tracking-wider text-brand-dark/50">Email</dt>
                <dd>
                  <a :href="`mailto:${config.email}`" class="hover:underline break-all">
                    {{ config.email }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="text-xs uppercase tracking-wider text-brand-dark/50">Service area</dt>
                <dd>{{ config.serviceArea }}</dd>
              </div>
              <div>
                <dt class="text-xs uppercase tracking-wider text-brand-dark/50">Response time</dt>
                <dd>Within 2 business hours</dd>
              </div>
              <div>
                <dt class="text-xs uppercase tracking-wider text-brand-dark/50">License</dt>
                <dd>{{ config.licenseNumber }} · {{ config.licenseFooterText }}</dd>
              </div>
            </dl>
          </div>

          <div class="rounded-xl overflow-hidden border border-brand-dark/5 shadow-sm aspect-[4/3]">
            <iframe
              :src="mapSrc"
              title="Map of Springfield, OR service area"
              class="w-full h-full"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
