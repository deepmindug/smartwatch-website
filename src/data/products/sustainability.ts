import { dataOpsSpotlight } from '../data-ops'
import { img } from '../images'
import { anchors, routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'sustainability',
  kind: 'product',
  name: 'Sustainability',
  short: 'Fuel management that cuts cost and emissions.',
  icon: 'sustainability',
  hero: {
    eyebrow: 'Products · Sustainability',
    title: 'Fleet sustainability starts with improving fuel efficiency.',
    intro:
      'Save on fuel and reduce your environmental impact with Smartwatch FM fleet fuel management.',
    tone: 'dark',
    media: img.fuelNozzle,
  },
  sections: [
    {
      kind: 'split',
      id: 'features',
      title: 'Fuel monitoring',
      body: [
        "Smartwatch monitors fuel in two ways. For brand new vehicles and trucks, our devices capture fuel data from the vehicle's CANbus system accurately, without drilling the tanks. For vehicles with older technology, we use our reliable fuel sensors to capture the data.",
        'Smartwatch fuel sensors are designed to make accurate measurements of fuel level in vehicle tanks. Based on these measurements, our GPS tracking and telematics platform reports the following data.',
      ],
      points: [
        'Fuel level in the tank of a vehicle',
        'Fuel consumption per time period',
        'Average fuel consumption, e.g. kilometres per litre (km/l)',
        'Fuel refills or drains',
      ],
      mediaLabel: 'fuel level graph with refill and drain events',
      media: img.fuelFillDrainChart,
    },
    {
      kind: 'split',
      title: 'Stop refuelling fraud and fuel theft',
      body: 'Live monitor fuel consumption to counter refuelling fraud and fuel theft. Fuel level change detection sends an alert to the central server when an abnormal event triggers, and the platform detects and records low fuel economy behaviour like harsh driving, route deviation or idling for driver coaching.',
      points: [
        'Real-time anti-fuel-fraud alerts',
        'Fuel refill and drain detection',
        'Wireless battery-powered fuel level sensor with 5 to 10 years of battery time',
        'Fuel sensors also fit stationary tanks at gas stations, generators, locomotives and ships',
      ],
      mediaLabel: 'fuel theft alerts and consumption reporting',
      media: img.fuelTheftAlerts,
      reverse: true,
    },
    {
      kind: 'split',
      title: 'Coach drivers to cut fuel and emissions',
      body: [
        'Educate drivers to cut fuel and wear, monitor driving risk, compare performance to spot improvements, and collect data from all vehicles.',
        'Learn how employee driving style should change to drive the most economically. Benefit from reduced fuel consumption and optimized overall vehicle wear and tear, including tires. Minimize your impact on the environment by lowering unnecessary CO2 emissions.',
      ],
      points: [
        'Monitor excessive idling, harsh acceleration and overspeeding',
        'Evaluate and contrast driver performance to pinpoint areas for enhancement',
        'Gather data from all vehicle brands',
      ],
      mediaLabel: 'driver ranking leaderboard',
      media: img.driverLeaderboard,
      cta: {
        label: 'Explore the Eco-Drive solution',
        to: routes.solution('eco-drive'),
        variant: 'outline',
      },
    },
    {
      kind: 'cards',
      id: 'benefits',
      title: 'How Smartwatch fleet fuel management can help you save up to 40% on fuel.',
      columns: 2,
      items: [
        {
          title: 'Recommendations for improvement',
          body: 'Get detailed fuel performance data and pinpoint specific areas for improvement.',
        },
        {
          title: 'Benchmark your fuel performance',
          body: "Reduce operational costs when you understand how your fleet is consuming fuel and how you're performing against similar fleets.",
        },
        {
          title: 'Uncover improvement opportunities',
          body: 'Improve fuel economy when you know who your top and bottom performers are. Identify specific areas to change and improve on both a driver and vehicle level.',
        },
        {
          title: 'Optimize fuel efficiency',
          body: 'Reduce fuel waste, save money, and decrease your environmental impact by improving driver behavior and vehicle upkeep with fleet fuel management.',
        },
      ],
    },
    dataOpsSpotlight,
    {
      kind: 'links',
      id: 'resources',
      columns: [
        {
          title: 'Products',
          links: [
            { label: 'Compliance', to: routes.product('compliance') },
            { label: 'Driver Safety Dash Cameras', to: routes.product('driver-safety-dash-cameras') },
            { label: 'Tracking & Telematics', to: routes.product('tracking-and-telematics') },
            { label: 'Maintenance', to: routes.product('maintenance') },
            { label: 'Insurance', to: routes.product('insurance') },
          ],
        },
        {
          title: 'Solutions',
          links: [
            { label: 'Eco-Drive Solution', to: routes.solution('eco-drive') },
            { label: 'EV Fleet Management', to: routes.solution('ev-fleet-management') },
            { label: 'Oil and Gas', to: routes.solution('oil-and-gas') },
            { label: 'Trucking & Logistics', to: routes.solution('trucking-and-logistics') },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Contact', to: routes.contact },
            { label: 'Help centre', to: `${routes.contact}#${anchors.support}` },
            { label: 'Platform logins', to: routes.platforms },
          ],
        },
      ],
    },
    {
      kind: 'faq',
      id: 'faq',
      title: 'Fuel management questions',
      reviewed: false,
      items: [
        {
          q: 'How does Smartwatch measure fuel?',
          a: "In two ways. For brand new vehicles and trucks, our devices capture fuel data from the vehicle's CANbus system. For vehicles with older technology, we fit our reliable fuel sensors to measure the fuel level in the tank.",
        },
        {
          q: 'Do you need to drill my fuel tank?',
          a: 'Not for newer vehicles, where fuel data is captured accurately from the CANbus system without drilling the tanks. Older vehicles use fuel sensors, including a wireless battery-powered fuel level sensor with 5 to 10 years of battery time and no messing with wires.',
        },
        {
          q: 'What fuel data does the platform show?',
          a: 'Fuel level in the tank of a vehicle, fuel consumption per time period, average fuel consumption (for example kilometres per litre) and fuel refills or drains.',
        },
        {
          q: 'How much fuel can I save?',
          a: 'Smartwatch fleet fuel management can help you save up to 40% on fuel by benchmarking your performance against similar fleets, identifying top and bottom performers, and improving driver behavior and vehicle upkeep.',
        },
        {
          q: 'Can fuel sensors be used on generators or stationary tanks?',
          a: 'Yes. Fuel sensors are used on stationary units, such as fuel tanks at gas stations, and on vehicles including cars, locomotives, ships and generators.',
        },
        {
          q: 'How does this reduce my environmental impact?',
          a: 'Reducing fuel waste through better driver behavior and vehicle upkeep lowers unnecessary CO2 emissions as well as your fuel bill, and cuts overall vehicle wear and tear, including tires.',
        },
      ],
    },
  ],
  meta: {
    title: 'Sustainability',
    description:
      'Save on fuel and reduce your environmental impact with Smartwatch FM fleet fuel management.',
  },
}
