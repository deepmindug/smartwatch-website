import { img } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'food-manufacturing',
  kind: 'solution',
  name: 'Food Manufacturing & Processing',
  short: 'Temperature-sensitive deliveries tracked door to door.',
  hero: {
    eyebrow: 'Solutions · Food Manufacturing & Processing',
    title: 'Eliminate spoiled and damaged goods while providing fast and safe delivery, every time.',
    intro:
      'Moving the world forward by connecting & protecting fleet operations with solutions that achieve safety, sustainability, compliance and efficiency.',
    tone: 'dark',
    media: img.food,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Features & benefits',
      columns: 3,
      items: [
        {
          title: 'Increased consumer satisfaction',
          body: 'We offer fleet management solutions that help you deliver goods faster, more efficiently and in good condition.',
          points: [
            'Improved driver behaviour, such as smoother cornering, so that cargo arrives at its destination intact',
            'Real-time driver location tracking, so the nearest person to a customer’s location is sent out to ensure speedy delivery',
            'Temperature control analytics to limit the risk of perishable goods getting spoiled in transit',
          ],
        },
        {
          title: 'Reduced fuel usage',
          body: 'Increasingly, the application of machine learning and artificial intelligence to interpret and synthesise driver behaviour is helping fleets identify wasteful driving and cut fuel use.',
        },
        {
          title: 'Safer vehicle handling',
          body: 'With a telematics solution, you can improve the safety of your drivers while still getting the job done.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      eyebrow: 'Experience safe and compliant solutions for your fleet',
      title: 'Route optimisation',
      body: 'This electronic journey planning solution does away with error-prone manual route management and has been found to be ideal for cargo-carrying fleets.',
      mediaLabel: 'planned delivery route on a map',
      media: img.routePlanning,
    },
    {
      kind: 'split',
      title: 'Vehicle & driver location',
      body: 'Tracking your drivers as they deliver time-sensitive goods is now super simple with the OnTrack app. Drivers simply download the app, verify their identity and then get moving!',
      points: ['Download the OnTrack app', 'Verify your identity', 'Get moving'],
      reverse: true,
      mediaLabel: 'field vehicle tracked to its live position on a phone map',
      media: img.mapPinMacro,
    },
    {
      kind: 'split',
      title: 'Vehicle telematics',
      body: 'Our onboard computer is ideal for any mixed fleet that requires essential vehicle tracking features.',
      points: [
        'Driver route and driver behaviour monitoring',
        'Reminders for upcoming vehicle services',
        'Reminders for licence renewals',
      ],
      mediaLabel: 'onboard computer fitted to a refrigerated truck',
      media: img.truckRefrigerated,
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.solution('trucking-and-logistics'),
        routes.solution('commercial-vehicle-tracking'),
        routes.product('tracking-and-telematics'),
        routes.product('maintenance'),
      ],
    },
  ],
  meta: {
    title: 'Food Manufacturing & Processing',
    description:
      'Moving the world forward by connecting & protecting fleet operations with solutions that achieve safety, sustainability, compliance and efficiency.',
  },
}
