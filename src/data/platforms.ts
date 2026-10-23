import { img } from './images'
import { portals, site } from './site'
import type { CardItem, DetailPage } from './types'

const loginCards: CardItem[] = portals.map((portal) => ({
  title: portal.name,
  body: portal.short,
  href: portal.href,
  icon: 'platform',
}))

/** Platform logins page: the three customer-facing portals from `site.ts` plus sign-in support. */
export const platforms: DetailPage = {
  slug: 'platforms',
  kind: 'page',
  name: 'Platform logins',
  short: 'Sign in to Smartwatch FM, the VSS video platform or Smart FM.',
  icon: 'platform',
  hero: {
    eyebrow: 'Platform logins',
    title: 'Log in to your Smartwatch platform.',
    intro:
      'Smartwatch FM is the single solution for all your fleet management needs, and anyone with a mobile or desktop device can access the platform. Choose your platform below to sign in or try the demo.',
    tone: 'dark',
    media: img.laptop,
  },
  sections: [
    {
      kind: 'cards',
      id: 'logins',
      eyebrow: 'Our platforms',
      title: 'Choose your platform.',
      columns: 3,
      items: loginCards,
    },
    {
      kind: 'split',
      id: 'support',
      eyebrow: 'Support',
      title: 'Need help signing in?',
      body: [
        'Our policy is to provide world-class customer support, helping our clients to continually meet their service goals of reliability and quality. Whether faced with a routine inquiry or an emergency, we make it our duty to provide prompt, relevant expertise by phone or email, via remote log-in or in person.',
        "If you have forgotten your password or cannot reach your platform, contact our support team and we'll get you back in.",
      ],
      points: [`Call ${site.phone}`, `Email ${site.email}`],
      mediaLabel: 'Smartwatch FM on phone, tablet and desktop',
      media: img.appOnPhone,
      cta: { label: 'Contact support', to: '/contact#support' },
    },
  ],
  cta: false,
  meta: {
    title: 'Platform logins',
    description:
      'Sign in to Smartwatch FM, the VSS video platform or Smart FM, or try the Smartwatch FM demo environment.',
  },
}
