import { dataOpsSpotlight } from '../data-ops'
import { img } from '../images'
import { anchors, routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'insurance',
  kind: 'product',
  name: 'Insurance',
  short: 'Theft prevention, recovery and safer driving.',
  icon: 'insurance',
  hero: {
    eyebrow: 'Products · Insurance',
    title: 'Smartwatch offers transformative end-to-end solutions for insurance companies.',
    intro:
      'We have been working with insurance companies for over 10 years to deliver telematics solutions and services that solve business problems, automate processes, reduce customer churn, reduce risk, and add revenue through services.',
    tone: 'dark',
    balanced: true,
    media: {
      src: '/images/insurance-shield.webp',
      alt: 'Glowing green check on a black shield ringed by data lines, beside a car key and a phone showing a protected policy dashboard',
      width: 1000,
      height: 750,
    },
  },
  sections: [
    {
      kind: 'split',
      id: 'features',
      title: 'Vehicle security and recovery',
      body: [
        'Smartwatch tracking solutions help companies improve the operational efficiency of their business with vehicle maintenance tools and driver controls, and our GPS tracking also helps prevent fleet vehicle theft and enables the recovery of stolen vehicles.',
        'Smartwatch tracking gives business owners a proactive step: our tracking devices can be programmed to disable the vehicle or truck, all from the convenience of any smartphone or computer with internet access.',
      ],
      points: [
        'Recovery of stolen vehicles',
        'Remote engine disable from any smartphone or computer',
        'Engine block relay activated remotely through the platform or by SMS',
      ],
      mediaLabel: 'vehicle recovery map',
      media: img.laptopTracking,
    },
    {
      kind: 'split',
      title: 'Driver behaviour management',
      body: 'Get data from your fleet vehicles on speeding, rapid acceleration, harsh braking, and sharp cornering. This data can be used to coach your drivers on safer driving behaviours, which reduces insurance costs while at the same time reducing fuel costs for fleet owners.',
      points: ['Speeding', 'Rapid acceleration', 'Harsh braking', 'Sharp cornering'],
      mediaLabel: 'driver behaviour score card',
      media: img.driverLeaderboard,
      reverse: true,
    },
    {
      kind: 'split',
      title: 'Vehicle maintenance tools',
      body: [
        'Smartwatch vehicle maintenance tools that come with GPS tracking help keep client fleets efficient and safe on the road. A vehicle that suffers a tire blowout or other mechanical malfunction is more likely to cause an accident.',
        'The Smartwatch maintenance tool sends out real-time alerts when vehicle maintenance is required, helping you prevent these kinds of incidents. The fleet becomes easier to manage with the quality control data that comes with a telematics system.',
      ],
      points: [
        'Real-time alerts when vehicle maintenance is required',
        'Notice when several trucks are due for maintenance within the next number of days',
        'Quality control data that makes the fleet easier to manage',
      ],
      mediaLabel: 'service required warning on the dashboard',
      media: img.serviceRequiredCluster,
    },
    {
      kind: 'split',
      title: 'Location monitoring and strategic routing',
      body: [
        'Business owners and managers can monitor vehicle locations and movements at any time. Understanding where your fleet cars or trucks are helps you develop business routes and make changes to driver routes more strategically.',
        'By understanding traffic patterns and road conditions, businesses use the Smartwatch routing feature to dispatch drivers on more efficient routes. Insurers are aware of how providing this kind of guidance to drivers makes for a better driver to insure.',
      ],
      points: [
        'Most efficient routes save vehicle wear and tear and fuel costs',
        "Savings improve a company's bottom line and provide better customer service",
        'Monitor vehicle locations and movements at any time',
      ],
      mediaLabel: 'route map with traffic overlay',
      media: img.routeMap,
      reverse: true,
    },
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Look at the benefits',
      intro:
        'Smartwatch tracking solutions help companies improve the operational efficiency of their business with vehicle maintenance tools and driver controls, and our GPS tracking also helps prevent fleet vehicle theft.',
      columns: 2,
      items: [
        {
          title: 'Vehicle security',
          body: 'Enhance vehicle security and enable recovery of stolen vehicles.',
        },
        {
          title: 'Driver behavior management',
          body: 'Driver data can be used to coach drivers and promote safer driving, lowering both insurance and fuel costs for fleet owners.',
        },
        {
          title: 'Vehicle maintenance tools',
          body: 'Real-time alerts for when vehicle maintenance is required, helping you prevent these kinds of incidents.',
        },
        {
          title: 'Monitor vehicle locations',
          body: 'Use of the most efficient routes available saves vehicle wear and tear and fuel costs.',
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
            { label: 'Sustainability', to: routes.product('sustainability') },
          ],
        },
        {
          title: 'Solutions',
          links: [
            { label: 'Commercial Vehicle Tracking', to: routes.solution('commercial-vehicle-tracking') },
            { label: 'Trucking & Logistics', to: routes.solution('trucking-and-logistics') },
            { label: 'Mobile Resource Management', to: routes.solution('mobile-resource-management') },
            { label: 'Eco-Drive Solution', to: routes.solution('eco-drive') },
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
      title: 'Insurance questions',
      reviewed: false,
      items: [
        {
          q: 'How long has Smartwatch worked with insurance companies?',
          a: 'For over 10 years, delivering telematics solutions and services that solve business problems, automate processes, reduce customer churn, reduce risk, and add revenue through services.',
        },
        {
          q: 'Can a stolen vehicle be recovered?',
          a: 'GPS tracking helps prevent fleet vehicle theft and enables the recovery of stolen vehicles. Tracking devices can also be programmed to disable the vehicle or truck from any smartphone or computer with internet access.',
        },
        {
          q: 'Which driving behaviours are captured?',
          a: 'Speeding, rapid acceleration, harsh braking and sharp cornering. This data is used to coach drivers on safer driving, which reduces insurance costs and fuel costs for fleet owners.',
        },
        {
          q: 'How does telematics reduce accident risk?',
          a: 'A vehicle that suffers a tire blowout or other mechanical malfunction is more likely to cause an accident, so the maintenance tool sends real-time alerts when maintenance is required. Driver coaching from behaviour data further promotes safer driving.',
        },
        {
          q: 'How does route monitoring benefit insurers and fleet owners?',
          a: 'Managers can monitor vehicle locations and movements at any time and dispatch drivers on the most efficient routes, which saves vehicle wear and tear and fuel costs and improves customer service. Insurers recognise that this guidance makes for a better driver to insure.',
        },
        {
          q: 'Can I immobilise a vehicle remotely?',
          a: 'Yes. Tracking devices can be programmed to disable the vehicle or truck from any smartphone or computer with internet access, and the engine block relay can be activated remotely through the monitoring and control system or by SMS.',
        },
      ],
    },
  ],
  meta: {
    title: 'Insurance',
    description:
      'Telematics solutions and services for insurance companies that solve business problems, automate processes, reduce risk, and add revenue through services.',
  },
}
