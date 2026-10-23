import { dataOpsSpotlight } from '../data-ops'
import { img } from '../images'
import { anchors, routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'compliance',
  kind: 'product',
  name: 'Compliance',
  short: 'Automated compliance management and driver scoring.',
  icon: 'compliance',
  hero: {
    eyebrow: 'Products · Compliance',
    title: 'Smartwatch gives you the power to manage compliance better.',
    intro:
      'Optimize drive time, minimize violations, and improve driver scores with automated compliance management.',
    tone: 'dark',
    media: img.complianceTrackedTrucks,
    video: {
      src: '/images/compliance-hos.mp4',
      poster: '/images/compliance-hos-poster.webp',
      alt: 'An Hours of Service dashboard counts down drive time, clears violations and lifts the driver score to compliant',
    },
  },
  sections: [
    {
      kind: 'split',
      id: 'features',
      title: 'Automated compliance management',
      body: [
        'Resolve unidentified trips faster with automated trip and driver matching, and make comments on trips that have been authorized due to emergencies.',
        'Real-time email alerts notify you the moment something needs attention, so you can check on drivers instantly.',
      ],
      points: [
        'Real-time email alerts for HSE violations',
        'No-signal and signal-jamming alerts',
        'Expired vehicle service alerts',
        'Vehicle device disconnection alerts',
      ],
      mediaLabel: 'supervisor checking fleet compliance in the yard',
      video: {
        src: '/images/compliance-auto.mp4',
        poster: '/images/compliance-auto-poster.webp',
        alt: 'An unidentified trip is matched to its driver by AI while real-time HSE, signal-jamming, no-signal and service alerts arrive by email',
      },
    },
    {
      kind: 'split',
      title: 'OnTrack driver app',
      body: 'The Smartwatch OnTrack driver app is loved by drivers because it makes company compliance easy and reliable. Drivers can complete tasks and inspection reports faster, and avoid HSE violations, road penalties and fines.',
      points: [
        'Complete tasks and inspection reports faster',
        'Avoid HSE violations, road penalties and fines',
        'Sound buzzer alerts drivers before exceeding the speed limit',
      ],
      mediaLabel: 'driver working through the OnTrack app in the cab',
      media: img.driverInCab,
      reverse: true,
    },
    {
      kind: 'split',
      title: 'Driver rating scores',
      body: [
        "To get a complete picture of your drivers' risk profiles, combine vehicle driving behavior monitoring with our driver rating score. Coach drivers to lower violations and reduce the risk.",
        'Forecasted driver rating scores help you identify ways to stay below intervention thresholds, and you can share predicted scores with your insurance company to earn discounts on your insurance premiums.',
      ],
      points: [
        'Driver rating score combined with driving behavior monitoring',
        'Forecasted scores to stay below intervention thresholds',
        'Share predicted scores with your insurer for premium discounts',
      ],
      mediaLabel: 'driver rating score card',
      media: img.complianceTablet,
    },
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Minimize violations and cut costs.',
      columns: 2,
      items: [
        {
          title: 'Minimize violations',
          body: 'HSE violation alerts and a sound buzzer alert drivers before they exceed their limits. With full visibility into compliance health, managers can address violations faster and stay compliant.',
        },
        {
          title: 'Boost productivity',
          body: 'AI-powered unidentified trip matching helps fleets work smarter. Manage HSE standards and government regulations in one solution. Save time with a fast log-editing workflow and automatic workshop activities.',
        },
        {
          title: 'Reduce risk',
          body: "To get a complete picture of your drivers' risk profiles, combine vehicle driving behavior monitoring with our driver rating score. Coach drivers to lower violations and reduce the risk.",
        },
        {
          title: 'Cut costs',
          body: 'Reduce road fines and high insurance premiums with forecasted driver rating scores. Identify ways to stay below intervention thresholds. Share predicted scores with your insurance company to earn discounts on your insurance premiums.',
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
            { label: 'Driver Safety Dash Cameras', to: routes.product('driver-safety-dash-cameras') },
            { label: 'Tracking & Telematics', to: routes.product('tracking-and-telematics') },
            { label: 'Maintenance', to: routes.product('maintenance') },
            { label: 'Sustainability', to: routes.product('sustainability') },
            { label: 'Insurance', to: routes.product('insurance') },
          ],
        },
        {
          title: 'Solutions',
          links: [
            { label: 'Oil and Gas', to: routes.solution('oil-and-gas') },
            { label: 'Trucking & Logistics', to: routes.solution('trucking-and-logistics') },
            { label: 'Fleet Management for Government', to: routes.solution('government') },
            { label: 'Bus & Public Transport', to: routes.solution('bus-and-public-transport') },
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
      title: 'Compliance questions',
      reviewed: false,
      items: [
        {
          q: 'Which alerts does Smartwatch send in real time?',
          a: 'Real-time email alerts notify you of HSE violations, no-signal alerts, signal jamming, expired vehicle service and vehicle device disconnections, so you can check on drivers instantly.',
        },
        {
          q: 'How are unidentified trips handled?',
          a: 'Automated, AI-powered trip and driver matching resolves unidentified trips faster. You can also add comments on trips that were authorized due to emergencies.',
        },
        {
          q: 'How do drivers know they are about to exceed a limit?',
          a: 'A sound buzzer alerts drivers before they exceed their limits, alongside HSE violation alerts, so violations can be addressed before they happen.',
        },
        {
          q: 'What is the driver rating score?',
          a: "The driver rating score combines vehicle driving behavior monitoring into a single score that gives a complete picture of each driver's risk profile. Managers use it to coach drivers to lower violations, and forecasted scores help identify ways to stay below intervention thresholds.",
        },
        {
          q: 'Can compliance data lower my insurance premiums?',
          a: 'Yes. You can share predicted driver rating scores with your insurance company to earn discounts on your insurance premiums, and better compliance also reduces road fines.',
        },
        {
          q: 'What can drivers do in the OnTrack app?',
          a: 'Drivers use the OnTrack app to complete tasks and inspection reports faster and to avoid HSE violations, road penalties and fines.',
        },
      ],
    },
  ],
  meta: {
    title: 'Compliance',
    description:
      'Optimize drive time, minimize violations, and improve driver scores with automated compliance management.',
  },
}
