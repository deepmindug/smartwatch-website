import { img } from '../images'
import { anchors, routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'eco-drive',
  kind: 'solution',
  name: 'Eco-Drive Solution',
  short: 'Coach driver behavior to cut fuel use and emissions.',
  hero: {
    eyebrow: 'Solutions · Eco-Drive Solution',
    title: 'Educate drivers to cut fuel and wear.',
    intro:
      'Monitor driving risk, compare driver performance to spot improvements, and collect data from all vehicle brands. Eco-Drive educates drivers to lower fuel expenses and reduce vehicle wear and tear.',
    tone: 'dark',
    media: img.highwayPair,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      eyebrow: 'Eco-Drive Solution',
      title: 'Key values.',
      columns: 2,
      items: [
        {
          title: 'Improved fleet safety',
          body: 'Enhance business risk management by monitoring driving conduct.',
        },
        {
          title: 'Driver ranking and motivation',
          body: 'Evaluate and contrast driver performance to pinpoint areas for enhancement.',
        },
        {
          title: 'Broad vehicle coverage',
          body: 'Leverage our versatile solution to gather data from all vehicle brands.',
        },
        {
          title: 'Optimized fuel consumption',
          body: 'Educate drivers to lower fuel expenses and reduce vehicle wear and tear.',
        },
      ],
    },
    {
      kind: 'bullets',
      id: 'parameters',
      eyebrow: 'Eco-Drive insights',
      title: 'Over 90 parameters to monitor and analyze.',
      intro:
        'Choose from over 90 parameters to closely monitor and analyze Eco-Drive outcomes, encompassing aspects such as fuel efficiency and safe driving, including:',
      columns: 2,
      items: [
        'Average speed',
        'Cruise control use (% of available)',
        'Dangerous driving point rate',
        'Dangerous driving points',
        'Driven distance',
        'Driving time',
        'Excessive idling (%)',
        'Extreme braking event rate',
        'Extreme braking events',
        'Fuel consumption',
        'Fuel consumed',
        'Fuel wasted',
        'Fuel wasting rate',
        'Harsh acceleration event rate',
        'Harsh acceleration events',
        'Harsh braking event rate',
        'Harsh braking events',
        'Idling duration',
        'Maximum RPM (rev/minute)',
        'Maximum speed',
        'Normal braking event rate',
        'Normal braking events',
        'Overspeeding (% of driving time)',
        'Overspeeding duration',
        'RPM in the red band (% of driving time)',
        'Wasted fuel (% of fuel consumed)',
      ],
    },
    {
      kind: 'split',
      id: 'features',
      title: 'Improved fleet safety.',
      body: 'Prioritizing safety bolsters your company’s standing as a dependable and responsible partner. Elevate fleet safety measures to safeguard both driver and cargo, ensuring a secure arrival at the destination. By meticulously tracking driving behavior, particularly concerning extreme braking, overspeeding, harsh braking, and extreme acceleration events along the route, you can effectively reduce the risk of accidents on the road.',
      points: [
        'Extreme braking events',
        'Overspeeding',
        'Harsh braking events',
        'Extreme acceleration events',
      ],
      mediaLabel: 'driver safety score dashboard',
      media: img.aiRoadDetection,
    },
    {
      kind: 'split',
      title: 'Optimize fuel consumption.',
      body: 'Learn how employee driving style should change to drive the most economically. Benefit from reduced fuel consumption and optimized overall vehicle wear and tear, including tires. Minimize your impact on the environment by lowering unnecessary CO2 emissions. Be precise about the average weight of the vehicle and cargo for the best fuel consumption and driver performance evaluation.',
      points: [
        'Reduced fuel consumption',
        'Optimized vehicle wear and tear, including tires',
        'Lower unnecessary CO2 emissions',
      ],
      mediaLabel: 'van fleet parked in a depot yard',
      media: img.vanFleetYard,
      reverse: true,
    },
    {
      kind: 'split',
      title: 'Driver ranking and motivation.',
      body: 'Motivating drivers for personal improvement has never been that easy. Use driver behavior information to set up internal education and motivation systems for drivers to accelerate their interest in improved fleet performance. Recognize and reward drivers with the highest scores to keep them motivated.',
      points: [
        'Internal education and motivation systems',
        'Recognize and reward the highest-scoring drivers',
      ],
      mediaLabel: 'driver leaderboard ranked by score',
      media: img.driverLeaderboard,
      cta: { label: 'See the Eco-Drive panel', to: `${routes.hardware}#${anchors.accessories}` },
    },
    {
      kind: 'split',
      title: 'Broad vehicle coverage.',
      body: 'Even if your fleet comprises vehicles from various manufacturers, our Eco-Drive solution seamlessly integrates data from diverse car brands, offering accurate and unbiased performance metrics for efficient and objective comparisons. Customize your selection of vehicles, drivers, and parameters to receive tailored analyses and performance tracking that align with your specific business requirements.',
      points: [
        'Data from vehicles of various manufacturers',
        'Accurate and unbiased performance metrics',
        'Custom selection of vehicles, drivers and parameters',
      ],
      mediaLabel: 'mixed fleet of different vehicle brands',
      media: img.fleetSunset,
      reverse: true,
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.product('sustainability'),
        routes.product('driver-safety-dash-cameras'),
        routes.solution('trucking-and-logistics'),
        routes.product('insurance'),
      ],
    },
  ],
  meta: {
    title: 'Eco-Drive Solution',
    description:
      'Monitor driving risk, compare driver performance to spot improvements, and collect data from all vehicle brands.',
  },
}
