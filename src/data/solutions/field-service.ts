import { img } from '../images'
import { anchors, routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'field-service',
  kind: 'solution',
  name: 'Field Service & Marketplace',
  short: 'Dispatch, tracking and proof of service for mobile teams.',
  hero: {
    eyebrow: 'Solutions · Field Service & Marketplace',
    title: 'Effective mobile workforce management.',
    intro:
      'Automate field service operations to increase team productivity, reduce expenses and refine customer experience.',
    tone: 'dark',
    mediaLabel: 'geofenced field team on a map',
    media: img.fieldGeofenceMap,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      eyebrow: 'Why Smartwatch',
      title: 'Automate your field service operations.',
      columns: 3,
      items: [
        {
          title: 'Increase team productivity',
          body: 'Turn customer orders into clear tasks and routes, and introduce a digital workflow for every field team.',
        },
        {
          title: 'Reduce expenses',
          body: 'Efficient routes across all assignments mean less fuel expense and more time with customers.',
        },
        {
          title: 'Refine customer experience',
          body: 'Sync data between field and office so managers can improve service quality, performance and customer satisfaction.',
        },
      ],
    },
    {
      kind: 'tabs',
      id: 'features',
      eyebrow: 'Features',
      title: 'All-in-one solution for field service management.',
      intro: 'Turn customer orders into clear tasks and routes. Introduce digital workflow.',
      tabs: [
        {
          label: 'Job dispatching',
          body: 'Assign jobs based on employees’ location, skill set and current workload. Import tasks from files and third-party applications.',
        },
        {
          label: 'Route optimization',
          body: 'Build efficient routes across the assignments. Less fuel expenses, more time with customers.',
        },
        {
          label: 'Digital forms',
          body: 'Sync data between field and office. Help managers improve service quality, performance and customer satisfaction.',
        },
        {
          label: 'Check-ins and POD',
          title: 'Check-ins and proof of delivery',
          body: 'Enable employees to mark locations, send pictures and submit forms on the spot.',
        },
        {
          label: 'Chat and messaging',
          body: 'Replace phone calls and a myriad of messengers with a single chat. Resolve disputes instantly without paying extra.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'every-field-team',
      title: 'A solution for every field team.',
      body: 'Improve productivity no matter what vertical you are in. Discover the most cutting-edge solutions for retail and distribution, utilities, medicine, machinery and more.',
      points: ['Retail and distribution', 'Utilities', 'Medicine', 'Machinery'],
      mediaLabel: 'field team job board on a tablet',
      media: img.fieldTaskBoard,
      cta: { label: 'Request a demo', to: `${routes.contact}#${anchors.demo}` },
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.solution('mobile-resource-management'),
        routes.product('tracking-and-telematics'),
        routes.solution('trucking-and-logistics'),
        routes.product('maintenance'),
      ],
    },
  ],
  meta: {
    title: 'Field Service & Marketplace',
    description:
      'Automate field service operations to increase team productivity, reduce expenses and refine customer experience.',
  },
}
