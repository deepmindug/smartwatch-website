import { img } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'mobile-resource-management',
  kind: 'solution',
  name: 'Mobile Resource Management',
  short: 'Vehicles, assets, drivers and equipment managed together.',
  hero: {
    eyebrow: 'Solutions · Mobile Resource Management',
    title: 'View reefer, fleet, and equipment status in one dashboard.',
    intro:
      'Manage your vehicles, assets, drivers, and equipment with Smartwatch’s integrated fleet management system.',
    tone: 'dark',
    mediaLabel: 'fleet status dashboard on a tablet',
    media: img.tabletFleetDashboard,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Key values',
      columns: 2,
      items: [
        {
          title: 'Preventative maintenance alerts',
          body: 'Prevent costly breakdowns and reduce liability with preventative maintenance alerts.',
        },
        {
          title: 'Centralised driver and compliance management',
          body: 'Centralize driver qualification and compliance management in one place.',
        },
        {
          title: 'Early detection',
          body: 'Prevent costly, unexpected breakdowns with early detection.',
        },
        {
          title: 'Delivery confirmation',
          body: 'Confirm deliveries and share location, conditions, and ETAs.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      title: 'Design your GPS business',
      body: 'Build unique solutions for fleet management, field service, and asset monitoring.',
      points: [
        'Localize to any region and highlight your brand.',
        'Bring in your favourite mobile devices, GPS, and IoT hardware.',
      ],
      mediaLabel: 'the Smartwatch GPS and IoT hardware range',
      media: img.products,
    },
    {
      kind: 'split',
      title: 'Reshape the landscape',
      body: 'Introduce innovations with our community of experts and implement the groundbreaking ideas first.',
      points: ['Upgrade your expertise with trainings, private tours, and innovative insights.'],
      reverse: true,
      mediaLabel: 'the Smartwatch partner ecosystem',
      media: img.partnerFistBump,
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.product('tracking-and-telematics'),
        routes.product('maintenance'),
        routes.solution('field-service'),
        routes.solution('trucking-and-logistics'),
      ],
    },
  ],
  meta: {
    title: 'Mobile Resource Management',
    description:
      'Manage your vehicles, assets, drivers, and equipment with Smartwatch’s integrated fleet management system.',
  },
}
