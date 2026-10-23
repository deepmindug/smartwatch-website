import type { Stat } from './types'

export const routes = {
  home: '/',
  products: '/products',
  solutions: '/solutions',
  hardware: '/hardware',
  platforms: '/platforms',
  about: '/about',
  /** Legacy path from the first build; redirects to `about`. */
  company: '/company',
  contact: '/contact',
  privacy: '/privacy-policy',
  terms: '/terms',
  webinars: '/resources/webinars',
  blog: '/resources/blog',
  guides: '/resources/guides',
  developers: '/resources/developer-portal',
  leadership: '/company/leadership',
  newsroom: '/company/newsroom',
  careers: '/company/careers',
  partners: '/company/partners',
  product: (slug: string) => `/products/${slug}`,
  solution: (slug: string) => `/solutions/${slug}`,
} as const

/** In-page anchor ids that menus and footers link to. Each must exist on its page. */
export const anchors = {
  support: 'support',
  demo: 'demo',
  offices: 'offices',
  awards: 'awards',
  heritage: 'heritage',
  whyUs: 'why-us',
  vision: 'vision',
  devices: 'devices',
  accessories: 'accessories',
} as const

export const solutionSlugs = [
  'mobile-resource-management',
  'oil-and-gas',
  'electronic-cargo-tracking',
  'bus-and-public-transport',
  'communications-technology',
  'government',
  'food-manufacturing',
  'field-service',
  'ngo-satellite-tracking',
  'trucking-and-logistics',
  'eco-drive',
  'commercial-vehicle-tracking',
  'ev-fleet-management',
  'site-management',
] as const
export type SolutionSlug = (typeof solutionSlugs)[number]

export const productSlugs = [
  'compliance',
  'driver-safety-dash-cameras',
  'tracking-and-telematics',
  'maintenance',
  'sustainability',
  'insurance',
] as const
export type ProductSlug = (typeof productSlugs)[number]

/** Every path the router serves (without hashes). Used by the dead-link test. */
export function allPaths(): string[] {
  return [
    routes.home,
    routes.products,
    routes.solutions,
    routes.hardware,
    routes.platforms,
    routes.about,
    routes.contact,
    routes.privacy,
    routes.terms,
    routes.webinars,
    routes.blog,
    routes.guides,
    routes.developers,
    routes.leadership,
    routes.newsroom,
    routes.careers,
    routes.partners,
    ...productSlugs.map(routes.product),
    ...solutionSlugs.map(routes.solution),
  ]
}

export type WhatsAppLine = { country: string; label: string; href: string }

export const site = {
  name: 'Smartwatch Solutions',
  legalName: 'Smartwatch Solutions Ltd',
  phone: '+256 392 177 300',
  phoneHref: 'tel:+256392177300',
  phoneKenya: '+254 118 319 547',
  phoneKenyaHref: 'tel:+254118319547',
  /** One line per region. wa.me needs the number in full international form, digits only. */
  whatsapp: [
    { country: 'Uganda', label: '+256 759 786 255', href: 'https://wa.me/256759786255' },
    { country: 'Kenya', label: '+254 118 319 547', href: 'https://wa.me/254118319547' },
  ] as WhatsAppLine[],
  email: 'customersupport@smartwatchsolutions.com',
  regions: 'Uganda · Kenya',
  tagline:
    'Affordable, user-friendly fleet and asset management solutions that enhance efficiency and support long-term business growth.',
  founding:
    'Smartwatch was incorporated as a direct response to emerging trends in mobile resource solutions across the Africa region, buoyed by oil and gas findings in Kenya, Uganda, Tanzania, South Sudan and Mozambique, with a focus on safety, security and productivity.',
  copyright: '© 2011–2026 Smartwatch Solutions Ltd. All rights reserved.',
  disclaimer: '* All products are provided by verified manufacturers.',
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/SWSUG256' },
    { name: 'X', href: 'https://x.com/SWSolutionsUG' },
    { name: 'LinkedIn', href: 'https://ug.linkedin.com/company/smartwatch-solutions-ug' },
  ],
}

/** The WhatsApp line for a country, so offices and the floating button stay in sync. */
export function whatsappFor(country: string): WhatsAppLine | undefined {
  return site.whatsapp.find((line) => line.country === country)
}

/** Customer-facing platform logins (external). */
export const portals = [
  {
    name: 'Get a demo',
    short: 'Try the Smartwatch FM demo environment',
    href: 'http://smartwebfleet.com:9966/',
  },
  {
    name: 'VSS Platform',
    short: 'Video surveillance system for dash cameras and MDVR',
    href: 'https://smartwebfleet.com:9965/vss/#/',
  },
  {
    name: 'Smart FM',
    short: 'Fleet management platform login',
    href: 'https://smartwatch.fm-track.com/login',
  },
]

export type Office = {
  city: string
  country: string
  role: string
  lines: string[]
  phones: { label: string; href: string }[]
  whatsapp?: WhatsAppLine
}

export const offices: Office[] = [
  {
    city: 'Kampala',
    country: 'Uganda',
    role: 'Head office',
    lines: ['Plot 7, Mundeka Road, Bugolobi', 'Balenzi Building, 1st Floor', 'P.O. Box 2359, Kampala'],
    phones: [
      { label: '+256 392 177 300', href: 'tel:+256392177300' },
      { label: '+256 414 580 632', href: 'tel:+256414580632' },
    ],
    whatsapp: whatsappFor('Uganda'),
  },
  {
    city: 'Nairobi',
    country: 'Kenya',
    role: 'Regional office',
    lines: ['Delta Corner, Oracle Tower', '13th Floor, Westlands'],
    phones: [
      { label: '+254 118 319 547', href: 'tel:+254118319547' },
      { label: '+254 741 520 518', href: 'tel:+254741520518' },
    ],
    whatsapp: whatsappFor('Kenya'),
  },
  {
    city: 'Giessenburg',
    country: 'The Netherlands',
    role: 'European office',
    lines: ['Nijverheidsweg 13', 'Giessenburg'],
    phones: [{ label: '+31 (0)184 652 910', href: 'tel:+31184652910' }],
  },
]

export const mapEmbed = {
  src: 'https://maps.google.com/maps?q=Smartwatch%20Solutions%20Ltd%20-%20UG&t=m&z=13&output=embed&iwloc=near',
  title: 'Smartwatch Solutions Kampala office on Google Maps',
}

export const stats: Stat[] = [
  { value: 20, suffix: 'K+', label: 'Active devices' },
  { value: 10, suffix: '+', label: 'Years of excellence' },
  { value: 6, label: 'Partnership across Africa and Europe' },
  { value: 70, suffix: '%', label: 'Fewer accidents with instant alerts' },
]

export function formatStat(stat: Stat): string {
  return `${stat.prefix ?? ''}${stat.value}${stat.suffix ?? ''}`
}
