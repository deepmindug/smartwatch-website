import { about } from './about'
import { careers, leadership, newsroom, partners } from './company'
import { hardware } from './hardware'
import { img } from './images'
import { platforms } from './platforms'
import { products } from './products'
import { blog, developerPortal, guides, webinars } from './resources'
import { routes } from './site'
import { solutions } from './solutions'
import type { DetailPage, IconName, Img } from './types'

/** Enough about a page to render a card or menu item that links to it. */
export type PageRef = { to: string; name: string; short: string; image?: Img; icon?: IconName }

function ref(page: DetailPage, to: string): PageRef {
  return { to, name: page.name, short: page.short, image: page.cardImage ?? page.hero.media, icon: page.icon }
}

/** Icon per industry, used by the Solutions menu and the solutions index cards. */
const solutionIcons: Record<string, IconName> = {
  'mobile-resource-management': 'assets',
  'oil-and-gas': 'fuel',
  'electronic-cargo-tracking': 'cargo',
  'bus-and-public-transport': 'bus',
  'communications-technology': 'signal',
  government: 'government',
  'food-manufacturing': 'food',
  'field-service': 'field',
  'ngo-satellite-tracking': 'satellite',
  'trucking-and-logistics': 'truck',
  'eco-drive': 'sustainability',
  'commercial-vehicle-tracking': 'van',
  'ev-fleet-management': 'ev',
  'site-management': 'site',
}

export const productRefs: PageRef[] = products.map((p) => ref(p, routes.product(p.slug)))
export const solutionRefs: PageRef[] = solutions.map((s) => ({
  ...ref(s, routes.solution(s.slug)),
  icon: s.icon ?? solutionIcons[s.slug],
}))
export const hardwareRef: PageRef = { ...ref(hardware, routes.hardware), image: hardware.cardImage ?? hardware.hero.media ?? img.products }

const staticPages: PageRef[] = [
  hardwareRef,
  ref(about, routes.about),
  ref(platforms, routes.platforms),
  ref(webinars, routes.webinars),
  ref(blog, routes.blog),
  ref(guides, routes.guides),
  ref(developerPortal, routes.developers),
  ref(leadership, routes.leadership),
  ref(newsroom, routes.newsroom),
  ref(careers, routes.careers),
  ref(partners, routes.partners),
  { to: routes.products, name: 'All products', short: 'The full Smartwatch FM product suite.', icon: 'platform' },
  { to: routes.solutions, name: 'All solutions', short: 'Solutions for every industry we serve.', icon: 'tracking' },
  { to: routes.contact, name: 'Contact', short: 'Talk to sales or support, 24/7.', icon: 'sales' },
  { to: routes.privacy, name: 'Privacy policy', short: 'How we handle your data and cookies.' },
  { to: routes.terms, name: 'Terms and conditions', short: 'The terms for using this website.' },
]

const all: PageRef[] = [...productRefs, ...solutionRefs, ...staticPages]

function titleFromPath(path: string): string {
  const last = path.split('#')[0].split('/').filter(Boolean).pop() ?? ''
  return last.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

/** Describes a site path for cards and menus; falls back to a title derived from the slug. */
export function resolvePage(path: string): PageRef {
  const base = path.split('#')[0]
  return all.find((p) => p.to === base) ?? { to: path, name: titleFromPath(path), short: '' }
}
