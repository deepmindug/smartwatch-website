import { img } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'ngo-satellite-tracking',
  kind: 'solution',
  name: 'Satellite Tracking for NGOs',
  short: 'Stay connected in remote areas beyond cellular coverage.',
  hero: {
    eyebrow: 'Solutions · Satellite Tracking for NGOs',
    title: 'Get trusted telematics solutions for the NGO industry.',
    intro:
      'Propel your staff’s safety and efficiency today. Your vehicles and operators are constantly on the move from one job to another. With Smartwatch telematics you can identify where these vehicles are at all times, determine wasteful or unsafe driving, better manage routes and raise red flags when vehicles encounter mechanical problems.',
    tone: 'dark',
    media: img.ngoFleetYard,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      eyebrow: 'Features & benefits',
      title: 'Safety, efficiency & sustainability.',
      columns: 3,
      items: [
        {
          title: 'Safety optimisation',
          body: 'Driver ID helps manage driving hours, audit driving infringements and potential damage to vehicles, and implement training depending on individual driver activity.',
        },
        {
          title: 'Sustainability & efficiency',
          body: 'Accurately locate your operators and assets by combining a variety of sophisticated data points, and make important decisions in real time to maximize efficiency in your operations.',
        },
        {
          title: 'Actionable insights',
          body: 'Get daily, weekly and monthly intelligence reports that highlight all fleet operations to help you see trends and anticipate any issues causing inefficiency, safety threats and more.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      title: 'Driver tracking.',
      body: 'Our on-board computer tracks the precise location of vehicles using GPS and GSM technology to reach even the most remote areas.',
      points: [
        'On-board accelerometer',
        'Geofencing capabilities',
        'Driving event notifications',
        'Long-life back-up batteries',
        'Driver ID and more',
      ],
      mediaLabel: 'driver at the wheel, seen in the cab mirror',
      media: img.driverMirror,
    },
    {
      kind: 'split',
      title: 'App-based tracking solution.',
      body: 'OnTrack is an app that utilizes cellphone technology to help you accurately track vehicles in real time while also monitoring all driver behaviours that may be unsafe or inefficient. Send notifications to operators on important events. No hardware installation is required, and thus no vehicle downtime. Just download and go.',
      points: [
        'Accurate real-time vehicle tracking from a phone',
        'Monitors unsafe or inefficient driver behaviour',
        'Notifications to operators on important events',
        'No hardware installation, no vehicle downtime',
      ],
      mediaLabel: 'live vehicle position on a phone map',
      media: img.phoneRouteMap,
      reverse: true,
    },
    {
      kind: 'split',
      title: 'GPS tracking.',
      body: 'Simplify the fleet management and tracking process with a plug-and-play device delivered straight to you that doesn’t require a technician to install and can be activated using a QR code. Monitor and manage the behaviour and performance of vehicles and operators. Receive instant mobile and web notifications about driving events and hours to improve your fleet.',
      points: [
        'Delivered straight to you',
        'No technician needed to install',
        'Activated using a QR code',
        'Instant mobile and web notifications',
      ],
      mediaLabel: 'plug-and-play GPS tracker',
      media: img.device,
      cta: { label: 'View hardware', to: routes.hardware },
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.solution('government'),
        routes.product('tracking-and-telematics'),
        routes.solution('communications-technology'),
        routes.hardware,
      ],
    },
  ],
  meta: {
    title: 'Satellite Tracking for NGOs',
    description:
      'Identify where your vehicles are at all times, determine wasteful or unsafe driving, better manage routes and raise red flags on mechanical problems.',
  },
}
