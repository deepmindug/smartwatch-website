import { industries } from './industries'
import { pillars } from './pillars'
import { anchors, portals, routes } from './site'
import type { IconName } from './types'

export type NavLink = { name: string; short: string; to: string; icon?: IconName }

/** Resources › Learn, the design's five entries. */
export const learnLinks: NavLink[] = [
  { name: 'Content library', short: 'Product overviews and spec sheets', to: routes.products },
  { name: 'Customer stories', short: 'Fleets succeeding with Smartwatch', to: routes.solutions },
  { name: 'Webinars', short: 'Tune in for actionable insights', to: routes.webinars },
  { name: 'Blog', short: 'Stay up to date with Smartwatch news', to: routes.blog },
  { name: 'Guides', short: 'A deep dive into fleet management', to: routes.guides },
]

/** Resources › Technical resources */
export const techLinks: NavLink[] = [
  { name: 'Developer portal', short: 'Integrate with Smartwatch APIs', to: routes.developers },
  { name: 'Help centre', short: 'Install, set up and use Smartwatch', to: `${routes.contact}#${anchors.support}` },
  { name: 'Platform logins', short: 'Smartwatch FM, VSS and Smart FM', to: routes.platforms },
]

/** Company › Get to know Smartwatch */
export const companyLinks: NavLink[] = [
  { name: 'About Smartwatch', short: 'Who we are and what we build', to: routes.about },
  { name: 'Our heritage', short: 'A decade of connected fleets', to: `${routes.about}#${anchors.heritage}` },
  { name: 'Why Smartwatch', short: 'Our trade, our promise, our support', to: `${routes.about}#${anchors.whyUs}` },
  { name: 'Reviews & awards', short: 'KPMG Top 100 · KRA RECTS certified', to: `${routes.about}#${anchors.awards}` },
  { name: 'Leadership', short: 'Smartwatch executives and board', to: routes.leadership },
  { name: 'Newsroom', short: 'Press releases and articles', to: routes.newsroom },
  { name: 'Careers', short: 'Join our team in Kampala or Nairobi', to: routes.careers },
]

/** Company › Connect */
export const connectLinks: NavLink[] = [
  { name: 'Contact us', short: 'Connect with sales or support', to: routes.contact },
  { name: 'Customer support', short: 'Help with an installed device', to: `${routes.contact}#${anchors.support}` },
  { name: 'Partners', short: 'Join our partner program', to: routes.partners },
  { name: 'Schedule a demo', short: 'See Smartwatch solutions in action', to: `${routes.contact}#${anchors.demo}` },
]

/** Solutions › Hardware column */
export const hardwareLinks: NavLink[] = [
  { name: 'Devices', short: '', to: `${routes.hardware}#${anchors.devices}` },
  { name: 'Accessories', short: '', to: `${routes.hardware}#${anchors.accessories}` },
  { name: 'Installation & support', short: '', to: `${routes.contact}#${anchors.support}` },
]

/** "View all" link pinned to the bottom of each mega menu's main column. */
export const viewAll = {
  solutions: { name: 'View all solutions', short: '', to: routes.solutions },
  products: { name: 'View all products', short: '', to: routes.products },
  resources: { name: 'View all resources', short: '', to: routes.products },
  company: { name: 'About Smartwatch', short: '', to: routes.about },
} satisfies Record<string, NavLink>

/** Products menu: the seven pillars plus the index. */
export const productLinks: NavLink[] = [
  ...pillars.map((p) => ({ name: p.name, short: p.short, to: p.to, icon: p.icon })),
  { name: 'All products', short: 'Every product and device', to: routes.products, icon: 'platform' as const },
]

/** Solutions menu: every industry we serve, plus hardware. */
export const solutionLinks: NavLink[] = industries.map((i) => ({
  name: i.name,
  short: i.short,
  to: i.to,
  icon: i.icon,
}))

/** Mobile drawer groups (click accordions) and its plain links. */
export const drawerGroups: { label: string; links: NavLink[] }[] = [
  { label: 'Products', links: productLinks },
  { label: 'Solutions', links: solutionLinks },
  { label: 'Resources', links: [...learnLinks, ...techLinks] },
  { label: 'Company', links: [...companyLinks, ...connectLinks] },
]

export const portalLinks: NavLink[] = portals.map((p) => ({ name: p.name, short: p.short, to: p.href }))
