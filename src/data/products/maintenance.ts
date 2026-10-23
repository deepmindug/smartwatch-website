import { dataOpsSpotlight } from '../data-ops'
import { img } from '../images'
import { anchors, routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'maintenance',
  kind: 'product',
  name: 'Maintenance',
  short: 'Preventive maintenance with electronic inspections.',
  icon: 'maintenance',
  hero: {
    eyebrow: 'Products · Maintenance',
    title: 'The fleet maintenance solution that keeps you moving.',
    intro:
      'Reduce downtime, maximize productivity and reduce costs with preventive fleet maintenance.',
    tone: 'dark',
    media: img.fleetSunset,
  },
  sections: [
    {
      kind: 'split',
      id: 'features',
      title: 'Preventive fleet maintenance',
      body: [
        'Extend the life of your vehicles and assets, reduce repair costs, and keep your fleet running.',
        'Catch vehicle defects and inefficiencies in the moment with real-time fault alerts. Address issues early to prevent bigger problems, reduce repair costs, and increase vehicle runtime.',
      ],
      points: [
        'Real-time fault alerts',
        'Automated fleet maintenance schedules',
        'Electronic notifications of upcoming maintenance requirements',
      ],
      mediaLabel: 'vehicle service check',
      media: img.vehicleServiceCrew,
    },
    {
      kind: 'split',
      title: 'Inspection records',
      body: [
        'Create thorough inspection records for vehicles and assets. Maintain and access records electronically.',
        'Simplify inspections and stay compliant. Increase driver accountability and reduce safety risk with a thorough assessment of vehicle or asset status.',
      ],
      points: [
        'Electronic inspection records for every vehicle and asset',
        'Drivers complete inspection reports faster in the OnTrack app',
        'Thorough assessment of vehicle or asset status',
      ],
      mediaLabel: 'preventive maintenance checks scheduled in the app',
      media: img.maintenanceAppSchedule,
      reverse: true,
    },
    {
      kind: 'split',
      title: 'Service history and engine diagnostics',
      body: [
        "Automate service records and stay on top of vehicle and asset health. View your vehicles' and assets' service history, including documents, records, and invoices.",
        'Telematics offers electronic notifications of upcoming maintenance requirements and data on engine diagnostics, like oil pressure, battery voltage, accelerometer stats, and filters. For larger fleets, the maintenance tool sends notice that several trucks are due for maintenance within the next number of days.',
      ],
      points: [
        'Service history with documents, records and invoices',
        'Reminders for upcoming vehicle services and licence renewals',
        'Engine diagnostics: oil pressure, battery voltage, accelerometer stats and filters',
      ],
      mediaLabel: 'service checklist over an open engine bay',
      media: img.engineChecklist,
    },
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Take a proactive fleet maintenance strategy',
      columns: 2,
      items: [
        {
          title: 'Master your fleet maintenance schedule',
          body: "Automate service records and stay on top of vehicle and asset health. View your vehicles' and assets' service history, including documents, records, and invoices.",
        },
        {
          title: 'Extend the life of your fleet',
          body: 'Catch vehicle defects and inefficiencies in the moment with real-time fault alerts. Address issues early to prevent bigger problems, reduce repair costs, and increase vehicle runtime.',
        },
        {
          title: 'Manage inspections with ease',
          body: 'Simplify inspections and stay compliant. Increase driver accountability and reduce safety risk with a thorough assessment of vehicle or asset status.',
        },
        {
          title: 'Improve customer service',
          body: 'Ensure your vehicles are in top condition to meet customer expectations. Improve productivity, on-time work orders, and schedule forecasting.',
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
            { label: 'Sustainability', to: routes.product('sustainability') },
            { label: 'Insurance', to: routes.product('insurance') },
          ],
        },
        {
          title: 'Solutions',
          links: [
            { label: 'Trucking & Logistics', to: routes.solution('trucking-and-logistics') },
            { label: 'Bus & Public Transport', to: routes.solution('bus-and-public-transport') },
            { label: 'Fleet Management for Government', to: routes.solution('government') },
            { label: 'Field Service & Marketplace', to: routes.solution('field-service') },
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
      title: 'Maintenance questions',
      reviewed: false,
      items: [
        {
          q: 'How does preventive maintenance reduce downtime?',
          a: 'Real-time fault alerts catch vehicle defects and inefficiencies in the moment, so you can address issues early to prevent bigger problems, reduce repair costs and increase vehicle runtime.',
        },
        {
          q: 'Can Smartwatch automate my service records?',
          a: "Yes. Service records are automated so you stay on top of vehicle and asset health, and you can view each vehicle's and asset's service history, including documents, records and invoices.",
        },
        {
          q: 'How are vehicle inspections handled?',
          a: 'Thorough inspection records are created for vehicles and assets and maintained and accessed electronically. Drivers complete inspection reports faster in the OnTrack app, which increases driver accountability and reduces safety risk.',
        },
        {
          q: 'Will I know when several vehicles are due for service at once?',
          a: 'Yes. For larger fleets, the maintenance tool sends notice that several trucks are due for maintenance within the next number of days, and sends real-time alerts whenever vehicle maintenance is required.',
        },
        {
          q: 'What vehicle data does the system read?',
          a: 'Telematics provides data on engine diagnostics such as oil pressure, battery voltage, accelerometer stats and filters. CANbus data is read through the tracker harness on trucks, alongside the tachograph on FMS-equipped vehicles.',
        },
        {
          q: 'How does maintenance improve customer service?',
          a: 'Keeping vehicles in top condition helps meet customer expectations by improving productivity, on-time work orders and schedule forecasting.',
        },
      ],
    },
  ],
  meta: {
    title: 'Maintenance',
    description:
      'Reduce downtime, maximize productivity and reduce costs with preventive fleet maintenance.',
  },
}
