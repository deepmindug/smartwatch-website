import { img } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'oil-and-gas',
  kind: 'solution',
  name: 'Oil and Gas',
  short:
    'Intelligent IVMS that connects the vehicle, protects the operator and gives fleet managers actionable insight.',
  cardImage: img.oilGasWarehouse,
  hero: {
    eyebrow: 'Solutions · Oil and Gas',
    title: 'Transforming oil & gas operations through automation.',
    intro:
      'Transform oil & gas operations through AI-powered automation that improves driver safety, asset tracking, cost control, and compliance management with ease.',
    tone: 'dark',
    media: img.oilPumpjackSunset,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Features & benefits',
      columns: 3,
      items: [
        {
          title: 'Smart video surveillance',
          body: 'Multi-channel cameras with a built-in AI algorithm that analyse video and send a short alarm clip to the control centre when an alert is triggered.',
        },
        {
          title: 'Multi-driver identification',
          body: 'Face recognition, button reader, RFID reader and magnetic card reader.',
        },
        {
          title: 'Driver behaviour monitoring',
          body: 'Fatigue detection with a seat-vibration alert to remind the driver to drive safely, plus overspeed detection with a speed control system.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      title: 'Fleet management for the oil & gas sector',
      body: 'Smartwatch FM connects the vehicle, protects the operator and provides actionable insights for fleet managers.',
      points: ['Driver safety', 'Asset tracking', 'Cost control', 'Compliance management'],
      mediaLabel: 'fuel tanker on the road',
      media: img.fuelTankerTruck,
    },
    {
      kind: 'tabs',
      id: 'sector',
      title: 'How Smartwatch FM supports oil & gas operations',
      tabs: [
        {
          label: 'Compliance',
          body: 'With the focus on on-site safety and the impact that risky driving behaviour can have on safety targets, the need to comply with regulatory guidelines in terms of hours worked is key to your success in the oil and gas sector. Our knowledge of driver working-hours rules informed the need to develop an electronic logging solution that records each driver’s hours to comply with the maximum allowable amount. No more paper-based logbooks – this solution makes it easier and far more efficient.',
        },
        {
          label: 'Safety',
          body: 'Telematics helps foster safe driving behaviours on site by giving fleet managers and supervisors eyes and ears on the ground. With deeper insight into what’s going on as employees move around a site, no matter how remote the location is, driving performance can be closely monitored and ultimately improved with the help of real-time communication, driver scoring, and training that’s relevant to the employee in question.',
        },
        {
          label: 'Reporting',
          body: 'All data is collected and stored within our central SaaS platform, which allows the Smartwatch customer service team to build the parameters that are important for your organisation, giving you the ability to generate daily, weekly, or monthly reports on the various metrics that affect your business. In addition, we help you develop driver programs, provide you with solutions to problem areas identified within the reports, and advise on how to implement the measures to improve on them.',
        },
        {
          label: 'Sustainability',
          body: 'We are proud to provide customers with technology that helps reduce CO2 emissions for cleaner operations. By using vehicle telematics, fleet managers can monitor idle time. This gives them full control by quickly identifying problems in their operations that negatively impact the environment. Knowing where, when and by whom excessive idling is occurring is a step in the right direction towards global efforts in CO2 reduction.',
        },
        {
          label: 'Upstream services',
          body: 'You can’t put a price on life, and in upstream operations, efficiency and safety are tantamount to success. Our fleet management technology helps service providers in the upstream sector run their operations safely and efficiently through vehicle tracking and driver monitoring, ensuring land transport safety is top of mind on any site.',
        },
      ],
    },
    {
      kind: 'split',
      title: 'Intelligent fuel monitoring',
      body: 'Fuel level change detection, with an alert sent to the central server whenever an abnormal change is triggered.',
      reverse: true,
      mediaLabel: 'fuel level sensor reading on a truck',
      media: img.fuelSensorTruck,
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.product('driver-safety-dash-cameras'),
        routes.product('compliance'),
        routes.solution('site-management'),
        routes.solution('ngo-satellite-tracking'),
      ],
    },
  ],
  meta: {
    title: 'Oil and Gas',
    description:
      'Transform oil & gas operations through AI-powered automation that improves driver safety, asset tracking, cost control, and compliance management.',
  },
}
