// Content access layer.
//
// v1: reads from the seed file at /clients/<CLIENT>/content/seed.ts via ~client alias.
//
// TODO (Sanity hookup):
//   When runtimeConfig.public.sanityProjectId is non-empty, these composables
//   should GROQ-fetch from Sanity instead of returning seed data.
//   The Sanity document shapes mirror the TypeScript interfaces in seed.ts
//   one-for-one (see sanity/schemas/*.ts). Suggested GROQ queries:
//     services: *[_type == "service"] | order(navOrder asc)
//     featured: *[_type == "service" && featured == true] | order(navOrder asc)
//     single:   *[_type == "service" && slug.current == $slug][0]
//     reviews:  *[_type == "review" && featured == true] | order(date desc)
//     about:    *[_type == "aboutContent"][0]   (or keep AboutContent in siteConfig)
//   Until then, leave the seed branch as the default path.

import {
  allServices,
  featuredReviews,
  featuredServices,
  getServiceBySlug,
  about as seedAbout,
  type AboutContent,
  type Review,
  type Service,
} from '~client/content/seed'

export function useServices(): Service[] {
  // TODO: swap to GROQ when runtimeConfig.public.sanityProjectId is set
  return allServices
}

export function useFeaturedServices(): Service[] {
  // TODO: swap to GROQ when runtimeConfig.public.sanityProjectId is set
  return featuredServices
}

/**
 * Resolve a single service by slug. Wraps useAsyncData so SSR + hydration
 * both see the same object. Throws a 404 if the slug is unknown.
 */
export async function useService(slug: string) {
  return await useAsyncData(`service-${slug}`, async () => {
    // TODO: swap to GROQ when runtimeConfig.public.sanityProjectId is set
    const service = getServiceBySlug(slug)
    if (!service) {
      throw createError({
        statusCode: 404,
        statusMessage: `Service not found: ${slug}`,
        fatal: true,
      })
    }
    return service
  })
}

export function useReviews(): Review[] {
  // TODO: swap to GROQ when runtimeConfig.public.sanityProjectId is set
  return featuredReviews
}

export function useAbout(): AboutContent {
  // TODO: swap to GROQ when runtimeConfig.public.sanityProjectId is set
  return seedAbout
}

export type { AboutContent, Review, Service }
