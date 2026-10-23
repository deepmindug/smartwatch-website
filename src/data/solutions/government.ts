import { img } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'government',
  kind: 'solution',
  name: 'Fleet Management for Government',
  short: 'Accountability, utilization and cost control for public fleets.',
  hero: {
    eyebrow: 'Solutions · Fleet Management for Government',
    title: 'Solutions for the public sector.',
    intro:
      'With our telematics technology at your disposal, you can stay within strict budget requirements, track utilisation, meet green goals, manage vehicles, and much more.',
    tone: 'dark',
    mediaLabel: 'public-sector fleet',
    media: img.governmentFleetParked,
  },
  sections: [
    {
      kind: 'split',
      id: 'features',
      eyebrow: 'Experience safe and compliant solutions for your fleet',
      title: 'Track vehicles',
      body: 'Visibility of your vehicles’ movements in real time is the starting point of improved fleet operations. The most important benefit of tracking is its ability to increase efficiency by providing insights into how your vehicles are used – so you can see where time can be saved and how to improve utilisation.',
      points: [
        'How much time drivers spend at locations',
        'How long it takes them to get from point A to point B',
        'Full visibility of the routes they take',
      ],
      mediaLabel: 'public-sector vehicles seen from above',
      media: img.taxiParkAerial,
    },
    {
      kind: 'split',
      title: 'Reduce fuel usage',
      body: 'Fuel consumption is one of the largest operating costs for fleets. Telematics technology can provide you with data on fuel usage, including:',
      points: [
        'Exactly which vehicles and drivers are using the most fuel',
        'Which activities and behaviours are contributing to the problem',
        'Your carbon emissions before and after you’ve implemented fuel reduction measures',
      ],
      reverse: true,
      mediaLabel: 'fuel usage report by vehicle and driver',
      media: img.fleetFuelDashboard,
    },
    {
      kind: 'split',
      title: 'Maintain vehicles',
      body: 'Proper and regular maintenance of vehicles can extend their lifespan and save you repair and replacement costs. Telematics offers electronic notifications of upcoming maintenance requirements and data on engine diagnostics, which could help with maintaining proper upkeep.',
      points: ['Oil pressure', 'Battery voltage', 'Accelerometer stats', 'Filters'],
      mediaLabel: 'maintenance checklist by service interval',
      media: img.maintenanceChecklist,
    },
    {
      kind: 'bullets',
      id: 'benefits',
      title: 'Benefits to the government',
      columns: 2,
      items: [
        'Increases revenue through building of the tax base and reduction of fraud',
        'Designed for complete compliance with industry standards, including the World Customs Organization',
        'Single window capability facilitates communication with other revenue and border agencies, both nationally and internationally',
        'Can link into regional integration initiatives',
        'Provides better, more effective risk management through improved intelligence and risk profiling',
        'Reduces operational costs through process automation, better intelligence, and more targeted audits',
        'Enables faster clearance times and facilitates trade, creating a better investment climate',
      ],
    },
    {
      kind: 'bullets',
      id: 'taxpayer-benefits',
      title: 'Benefits to the taxpayer',
      columns: 2,
      items: [
        'Helps to streamline operations',
        'Increases revenue collection and compliance with e-government mandates for security and confidentiality',
        'Provides flexibility to build a solution that fits tax and revenue agencies’ unique business needs and enforces compliance while increasing tax collection',
        'Supports effective enforcement of trade facilitation activities',
      ],
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.solution('electronic-cargo-tracking'),
        routes.product('compliance'),
        routes.product('sustainability'),
        routes.product('maintenance'),
      ],
    },
  ],
  meta: {
    title: 'Fleet Management for Government',
    description:
      'With our telematics technology at your disposal, you can stay within strict budget requirements, track utilisation, meet green goals and manage vehicles.',
  },
}
