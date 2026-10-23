import { dataOpsSpotlight } from '../data-ops'
import { hw, img } from '../images'
import { anchors, routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'driver-safety-dash-cameras',
  kind: 'product',
  name: 'Driver Safety Dash Cameras',
  short: 'AI video, people counting, instant alerts.',
  icon: 'dashcam',
  hero: {
    eyebrow: 'Products · Driver Safety Dash Cameras',
    title: 'Protect your fleet and profits with an all-in-one safety solution.',
    intro:
      'Proactively manage fleet safety, deliver documented results, and free up more time in your day. Prevent accidents and exonerate drivers with our most accurate dash cams.',
    tone: 'dark',
    video: {
      src: '/videos/dash-cameras.mp4',
      poster: '/videos/dash-cameras-poster.webp',
      alt: 'An in-cab AI dash camera watches the road and the driver, flagging fatigue and distraction alerts in real time',
    },
  },
  sections: [
    {
      kind: 'split',
      id: 'features',
      title: 'Video surveillance',
      body: [
        'Driver-facing, in-cab AI dash cams detect risky driver behaviour and alert the driver and fleet manager to fatigue, phone usage, smoking and distracted driving, to prevent accidents and keep your drivers safe on the road.',
        'Multi-channel video with a built-in AI algorithm analyses footage and sends a short alarm video to the platform when an alert triggers.',
      ],
      points: [
        'Fatigue, phone use, smoking, seat belt and distraction detection',
        'Short alarm video sent to the platform when an alert triggers',
        'MDVR keeps an eye on moving vehicles and tracks their real-time GPS location',
      ],
      media: hw.aiDashcam,
    },
    {
      kind: 'split',
      title: 'Get time back',
      body: "Manage driver safety with Smartwatch's all-in-one platform and reduce your safety department's workload through automation. Eliminate repetitive or time-consuming tasks with self-coaching tools, prioritized footage, and custom safety definitions.",
      points: ['Self-coaching tools for drivers', 'Prioritized footage', 'Custom safety definitions'],
      mediaLabel: 'safety dashboard with prioritized event footage',
      media: img.aiRoadDetection,
      reverse: true,
    },
    {
      kind: 'split',
      title: 'Instant alerts on violations',
      body: 'Prevent accidents with an interactive system that alerts drivers the moment a violation occurs. A sound buzzer alerts drivers before they exceed the speed limit, and fatigue detection warns the driver with a seat vibration as a reminder to drive safely.',
      points: [
        '70% fewer accidents with instant alerts on violation',
        'Sound buzzer alerts drivers before exceeding the speed limit',
        'Overspeed detection with speed control system',
        'Fatigue detection and alert with seat vibration',
      ],
      mediaLabel: 'speeding vehicles flagged by AI detection',
      media: img.speedViolationDetection,
    },
    {
      kind: 'split',
      title: 'Passenger information and people counting',
      body: 'For bus and public transport operators, the same platform brings together video surveillance, passenger information, AI analytics and people counting, a dispatch system and a terminal with ticket system. High-accuracy people counting with big data analysis reduces money lost and increases profit.',
      points: [
        'Passenger information',
        'AI analytics and people counting',
        'Dispatch system and terminal with ticket system',
        'Mobile DVR multi-channel video surveillance for buses',
      ],
      mediaLabel: 'passenger counters and mobile DVR fitted to a bus',
      media: img.busPeopleCounterDiagram,
      reverse: true,
      cta: {
        label: 'See the bus & public transport solution',
        to: routes.solution('bus-and-public-transport'),
        variant: 'outline',
      },
    },
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Reduce risk with ease',
      intro:
        'The most comprehensive toolkit available to all fleets looking to minimize risk, improve overall safety, increase driver satisfaction, and boost productivity.',
      columns: 2,
      items: [
        {
          title: 'Prevent accidents',
          body: 'Real-time alerts, warning buzzers and HD video instill a culture of safety, and potentially lower insurance premiums.',
        },
        {
          title: 'Mitigate risk',
          body: 'Mitigation of risk requires a safety-first mentality. Use real-time data to influence driver behaviors and reduce accidents.',
        },
        {
          title: 'Assess driver behavior',
          body: 'Combine telematics, video footage and event reports to identify high-risk drivers and reward safe drivers.',
        },
        {
          title: 'Exonerate drivers',
          body: 'Prevent accidents and exonerate drivers with our most accurate dash cams. Snapshot cameras help to ensure vehicle security and provide essential evidence in case of an accident.',
        },
      ],
    },
    {
      kind: 'stats',
      id: 'results',
      title: 'A fleet safety solution that gets results.',
      items: [
        {
          value: 70,
          suffix: '%',
          label: 'Fewer accidents with interactive system through instant alerts on violation',
        },
        { value: 10, suffix: 'x', label: 'Up to 10x ROI in the first year of onboarding our system' },
        { value: 72, suffix: '%', label: 'Fleets exonerated by dash cam video' },
        { value: 25, suffix: '%', label: 'Potential reduction of insurance premium' },
        { value: 40, suffix: '%', label: 'Potential reduction of fuel costs' },
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
            { label: 'Tracking & Telematics', to: routes.product('tracking-and-telematics') },
            { label: 'Maintenance', to: routes.product('maintenance') },
            { label: 'Sustainability', to: routes.product('sustainability') },
            { label: 'Insurance', to: routes.product('insurance') },
          ],
        },
        {
          title: 'Solutions',
          links: [
            { label: 'Bus & Public Transport', to: routes.solution('bus-and-public-transport') },
            { label: 'Trucking & Logistics', to: routes.solution('trucking-and-logistics') },
            { label: 'Oil and Gas', to: routes.solution('oil-and-gas') },
            { label: 'Mobile Resource Management', to: routes.solution('mobile-resource-management') },
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
      title: 'Dash camera questions',
      reviewed: false,
      items: [
        {
          q: 'What do the AI dash cams detect?',
          a: 'Driver-facing, in-cab AI dash cams detect risky driver behaviour and alert the driver and fleet manager to fatigue, phone usage, smoking, seat belt use and distracted driving.',
        },
        {
          q: 'How do the cameras help prevent accidents?',
          a: 'The interactive system sends instant alerts on violations, and a sound buzzer alerts drivers before they exceed the speed limit. Fleets using it report 70% fewer accidents.',
        },
        {
          q: 'Can dash cam footage protect my drivers after an incident?',
          a: 'Yes. The system is built to prevent accidents and exonerate drivers, with prioritized footage giving you documented results. 72% of fleets have been exonerated by dash cam video, and snapshot cameras provide essential evidence in case of an accident.',
        },
        {
          q: 'What return can I expect?',
          a: 'Up to 10x ROI in the first year of onboarding the system, with a potential 25% reduction of insurance premium and a potential 40% reduction of fuel costs.',
        },
        {
          q: 'Which camera hardware is available?',
          a: 'The AI Dashcam, the driver-facing Dashboard Camera, the MDVR (Mobile Digital Video Recorder) that also tracks real-time GPS location, and a 10.36 inch Android vehicle monitor that works with the MDVR and displays up to 5 channels of AHD cameras. Fatigue sensor and snapshot camera accessories are also available.',
        },
        {
          q: 'How does it reduce my safety department’s workload?',
          a: "Smartwatch's all-in-one platform automates repetitive or time-consuming tasks with self-coaching tools, prioritized footage and custom safety definitions, so your team reviews what matters.",
        },
      ],
    },
  ],
  meta: {
    title: 'Driver Safety Dash Cameras',
    description:
      'Proactively manage fleet safety, deliver documented results, and free up more time in your day.',
  },
}
