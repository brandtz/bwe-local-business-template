// Seed content for Superior Exteriors & Maintenance.
// Read by useContent() when Sanity is not configured (empty SANITY_PROJECT_ID).
// When Sanity goes live, this same shape is imported via `pnpm seed:sanity`.
//
// Pricing convention for v1: do NOT populate `startingPrice`, `priceLabel`, or
// `pricingTiers`. UI falls back to "Let's book and discuss" CTA wherever price
// would appear. Ryan's wife (or Matthew) can populate these later in Sanity.

export interface ServiceGalleryItem {
  before?: string
  during?: string
  after: string
  caption?: string
}

export interface ServicePricingTier {
  name: string
  price: number
  description: string
  features: string[]
}

export interface Service {
  _id: string
  slug: string
  name: string
  shortDescription: string
  longDescription: string[] // paragraphs
  icon: string // lucide-vue-next icon name
  featured: boolean
  navOrder: number
  calComEventTypeSlug: string
  subScope: string[]

  startingPrice?: number
  priceLabel?: string
  pricingTiers?: ServicePricingTier[]

  gallery: ServiceGalleryItem[]
  faq: { question: string; answer: string }[]
  whatIsIncluded: string[]
}

export interface Review {
  _id: string
  reviewerName: string
  location: string
  rating: number
  body: string
  serviceSlug: string
  featured: boolean
  date: string // ISO
}

export interface AboutContent {
  heroHeadline: string
  heroSubheadline: string
  ownerName: string
  ownerPhoto?: string
  story: string[]
  values: { title: string; description: string; icon: string }[]
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const services: Service[] = [
  {
    _id: 'service-roofing',
    slug: 'roofing',
    name: 'Roofing',
    shortDescription:
      'Full roof replacement, repairs, cleaning, and protective treatments — done right the first time.',
    longDescription: [
      "Your roof is the single most important system protecting your home. We handle the full scope: tear-off and removal of old material, full new installs on both residential and light commercial properties, targeted leak and storm-damage repairs, and roof cleaning and treatment to extend the life of the roof you already have.",
      "Every roofing job on our schedule gets a real free estimate first — in person, with photos, and a clear written scope. No high-pressure sales, no upsells, no surprises after the invoice.",
    ],
    icon: 'home',
    featured: true,
    navOrder: 1,
    calComEventTypeSlug: 'roof-estimate',
    subScope: [
      'Removal & tear-off',
      'New installation',
      'Leak & storm repairs',
      'Roof cleaning',
      'Protective treatments',
    ],
    gallery: [
      {
        before: '/images/roof-before.png',
        during: '/images/roof-during.png',
        after: '/images/roof-after.png',
        caption: 'Full roof replacement — Springfield residence',
      },
    ],
    faq: [
      {
        question: 'How long does a roof replacement take?',
        answer:
          "Most single-family homes take 1 to 3 days depending on roof size, pitch, and weather. We'll give you a realistic timeline in writing before you commit.",
      },
      {
        question: 'Do you handle insurance claims?',
        answer:
          'Yes. We can meet your insurance adjuster on-site and provide the documentation carriers need. We are licensed, bonded, and insured (CCB #242198).',
      },
      {
        question: 'What materials do you install?',
        answer:
          "Primarily asphalt architectural shingles, which are the standard for Oregon residential roofs. We also handle metal roofing and specialty treatments — let's discuss what fits your home and budget.",
      },
    ],
    whatIsIncluded: [
      'Free on-site assessment and written estimate',
      'Tear-off and disposal of old roofing',
      'New underlayment, flashing, and drip edge',
      'Manufacturer-specified fastener pattern',
      'Full cleanup and magnetic sweep of the property',
      'Written workmanship warranty',
    ],
  },

  {
    _id: 'service-gutters',
    slug: 'gutters',
    name: 'Gutters',
    shortDescription:
      'Gutter installation, cleaning, repairs, and leaf-guard screens — the full gutter scope in one call.',
    longDescription: [
      "Gutters are the cheapest insurance policy you can buy for your foundation. We handle new gutter installation, removal and replacement, seasonal cleaning, targeted repairs, and leaf-guard screen installation — so one crew owns the whole gutter story on your property.",
      "For homes surrounded by fir and oak (read: most of Springfield), we strongly recommend gutter guards. We've installed dozens and will walk you through what actually works in our climate versus what the big-box marketing says.",
    ],
    icon: 'cloud-rain',
    featured: true,
    navOrder: 2,
    calComEventTypeSlug: 'gutter-cleaning',
    subScope: [
      'New installation',
      'Removal & replacement',
      'Seasonal cleaning',
      'Repairs & re-seals',
      'Leaf-guard screen install',
    ],
    gallery: [
      {
        after: '/images/gutter-guard-after.png',
        caption: 'Gutter guard installation — clean lines, no debris',
      },
      {
        before: '/images/gutter-clean-before.png',
        after: '/images/gutter-clean-after.png',
        caption: 'Before and after — seasonal gutter cleaning',
      },
    ],
    faq: [
      {
        question: 'How often should gutters be cleaned?',
        answer:
          "For most Springfield homes with nearby trees, twice a year minimum — late fall after leaf drop, and early spring. Homes surrounded by fir or cedar often need three cleanings.",
      },
      {
        question: 'Do gutter guards really work?',
        answer:
          "Good ones do. Cheap ones collect debris on top instead of inside. We install screens we've personally tested and will tell you which brand we recommend on-site based on your tree cover.",
      },
      {
        question: 'Can you repair a sagging gutter section?',
        answer:
          "Usually yes. Most sags are a hanger or fascia issue, not a full replacement. We'll show you exactly what's happening and quote the fix.",
      },
    ],
    whatIsIncluded: [
      'Free on-site assessment',
      'Full debris removal (bagged and hauled)',
      'Downspout flush and blockage check',
      'Hanger and seal inspection',
      'Photos of any issues found',
      'Written quote for any needed repairs',
    ],
  },

  {
    _id: 'service-pressure-washing',
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    shortDescription:
      'Exterior cleaning and restoration for siding, driveways, patios, fences, and decks.',
    longDescription: [
      "Pressure washing is the fastest-value-per-dollar exterior service we offer. A single afternoon of work takes years off the look of your home. We clean siding (vinyl, fiber cement, wood), concrete driveways and walks, fences, decks, and patios.",
      "We run proper equipment with adjustable pressure — we're not the guys who blast the paint off your siding. For softer surfaces we use a soft-wash approach with appropriate cleaning solution.",
    ],
    icon: 'droplets',
    featured: true,
    navOrder: 3,
    calComEventTypeSlug: 'pressure-washing',
    subScope: [
      'House siding',
      'Driveways & concrete',
      'Fences',
      'Decks & patios',
      'Commercial buildings',
    ],
    gallery: [
      {
        before: '/images/pressure-wash-before.png',
        after: '/images/pressure-wash-after.png',
        caption: 'Exterior cleaning — before and after',
      },
    ],
    faq: [
      {
        question: 'Will pressure washing damage my siding or paint?',
        answer:
          "Not the way we do it. We adjust pressure and nozzle for each surface, and for painted or soft surfaces we soft-wash with cleaning solution instead of high PSI.",
      },
      {
        question: 'How long does a typical house take?',
        answer:
          'A standard two-story home takes a half day. A driveway plus walkway usually takes 2–3 hours. Larger properties or commercial buildings we scope on-site.',
      },
      {
        question: 'Do I need to do anything before you arrive?',
        answer:
          "Move what you can from the area we'll be working in (patio furniture, planters, kids' toys). Make sure outdoor outlets are accessible. That's it.",
      },
    ],
    whatIsIncluded: [
      'Free on-site assessment',
      'Pressure-appropriate cleaning for every surface',
      'Soft-wash solution for painted or delicate surfaces',
      'Full rinse and runoff management',
      'Before/after photos on request',
    ],
  },

  // Sub-pages — featured: false, not in main nav or home grid
  {
    _id: 'service-gutter-cleaning',
    slug: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    shortDescription:
      'Seasonal gutter cleaning — fast, thorough, and with photos of anything we find.',
    longDescription: [
      "A dedicated gutter cleaning visit takes a half day on most homes. We hand-clear debris (we don't just blow it onto your roof), flush downspouts, and inspect hangers, seals, and slopes as we go.",
      "If we find a repair issue, you get a photo and a written quote — no sales pressure. Most seasonal visits end without any repairs needed.",
    ],
    icon: 'cloud-rain',
    featured: false,
    navOrder: 4,
    calComEventTypeSlug: 'gutter-cleaning',
    subScope: ['Debris removal', 'Downspout flush', 'Hanger inspection', 'Seal check'],
    gallery: [
      {
        before: '/images/gutter-clean-before.png',
        after: '/images/gutter-clean-after.png',
        caption: 'Seasonal gutter cleaning — before and after',
      },
    ],
    faq: [
      {
        question: 'Do you haul debris away?',
        answer: 'Yes. Everything goes in a bag and off your property.',
      },
      {
        question: 'How long does a cleaning take?',
        answer:
          "Typical single-story: 1–2 hours. Two-story: 2–4 hours. Properties with heavy tree cover take longer — we'll give you a realistic estimate on arrival.",
      },
    ],
    whatIsIncluded: [
      'Full hand clearing of gutter runs',
      'Downspout flush and blockage check',
      'Debris bagged and hauled',
      'Photos of any issues found',
    ],
  },

  {
    _id: 'service-gutter-guards',
    slug: 'gutter-guards',
    name: 'Gutter Guard Installation',
    shortDescription:
      'Leaf-guard screens that actually work in Oregon — installed clean, warrantied, and explained plainly.',
    longDescription: [
      "Gutter guards are one of the best investments a Springfield homeowner can make if you're surrounded by trees. Done right, they turn a twice-yearly cleaning ritual into a light annual inspection.",
      "We install screens we've used ourselves. We'll walk you through the tradeoffs on-site — material, pitch, warranty — and give you a straight answer on what fits your house.",
    ],
    icon: 'shield',
    featured: false,
    navOrder: 5,
    calComEventTypeSlug: 'gutter-guard-install',
    subScope: ['On-site product selection', 'Installation', 'Warranty documentation'],
    gallery: [
      {
        during: '/images/gutter-guard-during.png',
        after: '/images/gutter-guard-after.png',
        caption: 'Gutter guard installation in progress and completed',
      },
    ],
    faq: [
      {
        question: 'Are all gutter guards the same?',
        answer:
          "Not remotely. Cheap plastic screens clog at the top. We install products that shed pine needles and debris in our actual Oregon conditions.",
      },
      {
        question: 'Will this void my roof warranty?',
        answer:
          "Done correctly, no. We install without penetrating shingles or affecting existing flashing. If your roof warranty has specific clauses, bring them to the estimate and we'll read them together.",
      },
    ],
    whatIsIncluded: [
      'Free on-site product recommendation',
      'Gutter cleaning before install',
      'Full install including end caps and corners',
      'Written product and workmanship warranty',
    ],
  },
]

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export const reviews: Review[] = [
  {
    _id: 'review-1',
    reviewerName: 'Jennifer M.',
    location: 'Springfield, OR',
    rating: 5,
    body:
      "Ryan's crew replaced our roof last fall. Quote was detailed, crew was on time every day, and they cleaned up so well I couldn't tell they'd been there. Highly recommend.",
    serviceSlug: 'roofing',
    featured: true,
    date: '2025-11-14',
  },
  {
    _id: 'review-2',
    reviewerName: 'David & Angela T.',
    location: 'Eugene, OR',
    rating: 5,
    body:
      "We had three bids for gutter guards. Superior was the only one who didn't try to upsell us on stuff we didn't need. Honest, fast, and the install looks great.",
    serviceSlug: 'gutters',
    featured: true,
    date: '2026-02-03',
  },
  {
    _id: 'review-3',
    reviewerName: 'Mark H.',
    location: 'Springfield, OR',
    rating: 5,
    body:
      "Pressure washed our driveway and back deck. Night and day difference. Will have them back for the house siding next spring.",
    serviceSlug: 'pressure-washing',
    featured: true,
    date: '2026-03-22',
  },
]

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

export const about: AboutContent = {
  heroHeadline: 'Local. Licensed. Accountable.',
  heroSubheadline:
    'A Springfield-based exterior contractor serving Lane County. Family-run. CCB #242198.',
  ownerName: 'Ryan Brown',
  // ownerPhoto intentionally omitted — UI falls back to initials tile until we have a photo
  story: [
    "Superior Exteriors & Maintenance was built on one belief: your home is your biggest investment, and it deserves to be treated that way. We're a local Springfield crew that shows up on time, does the job right, and leaves your property cleaner than we found it.",
    "Every project we take on — whether it's a full roof replacement or a gutter cleaning — gets the same attention to detail. We're not a franchise. We're your neighbors.",
    "We're a husband-and-wife run business. Ryan leads the crew in the field; every estimate, every invoice, and every follow-up call is handled by someone with a name and a face you'll meet.",
  ],
  values: [
    {
      title: "We treat your home like it's ours",
      description:
        'Drop cloths down. Clean-up at the end of every day. Boots off when we step inside. That is a baseline, not a selling point.',
      icon: 'home',
    },
    {
      title: 'No hidden fees. Ever.',
      description:
        "What we quote is what you pay. If something changes mid-job, we call you before we touch it.",
      icon: 'receipt',
    },
    {
      title: 'Oregon licensed, insured, and bonded',
      description:
        'CCB #242198. Full general liability. Ready to document for your insurance carrier.',
      icon: 'shield-check',
    },
  ],
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const featuredServices = services.filter((s) => s.featured).sort((a, b) => a.navOrder - b.navOrder)
export const allServices = [...services].sort((a, b) => a.navOrder - b.navOrder)
export const featuredReviews = reviews.filter((r) => r.featured)

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
