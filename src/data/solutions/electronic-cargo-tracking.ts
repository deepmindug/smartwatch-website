import { img } from '../images'
import { anchors, routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'electronic-cargo-tracking',
  kind: 'solution',
  name: 'Electronic Cargo Tracking',
  short: 'Heavy-duty e-lock for secure cargo transit.',
  icon: 'cargo',
  hero: {
    eyebrow: 'Solutions · Electronic Cargo Tracking',
    title: 'Giving cargo transporters and government authorities visibility.',
    intro:
      'A heavy-duty electromagnetic lock integrated with comprehensive commercial vehicle operation services to enable seamless automation of cargo, security, carrier and support operations.',
    tone: 'photo',
    media: img.cargoTruckEsealNight,
    // The flagship product asks for the demo straight away, not only in the closing band.
    ctas: [
      { label: 'Get a demo', to: `${routes.contact}#${anchors.demo}`, variant: 'primary' },
      { label: 'All solutions', to: routes.solutions, variant: 'outline-light' },
    ],
    announce: { text: 'We are a KRA-approved vendor for EAC RECTS.', highlight: 'EAC RECTS' },
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Features & benefits',
      columns: 3,
      items: [
        {
          title: 'Increased cargo security',
          points: [
            'Cargo is fully secured during transit',
            'Full accountability',
            'The container door can only open at the right destination, with the right electronic key and within the right period of time',
          ],
        },
        {
          title: 'Improved service quality',
          points: ['Improve reliability', 'Increase operational flexibility', 'Improve user and customer confidence'],
        },
        {
          title: 'Increased operational efficiency & productivity',
          points: [
            'Reduce errors, wasted effort, and re-work',
            'Optimize assignment of equipment and people',
            'Optimize across functional areas',
            'Reduce slack capacity and inventory',
          ],
        },
      ],
    },
    {
      kind: 'coverage',
      id: 'coverage',
      title: 'Smartwatch RECTS: Regional Electronic Cargo Tracking System',
      subtitle: 'Advanced Cargo Tracking & Surveillance System',
      pillars: [
        {
          title: 'E-Seal and Fuel:',
          sub: 'Intelligent Dry Cargo Security',
          image: {
            src: '/images/rects-eseal.webp',
            alt: 'A container secured by a secure eSEAL and a lockable eSEAL (eLOCK), linked to eNET',
            width: 420,
            height: 285,
          },
          points: [
            { b: 'Multi-GNSS Accuracy', d: 'GPS, GLONASS, Galileo, BeiDou' },
            { b: 'eNET Connectivity & Blockchain', d: 'Data integrity' },
            { b: 'Extreme Durability', d: 'IP67, strong magnetic warning' },
            { b: 'Massive 20,000mAh Battery', d: '60 days operation' },
          ],
        },
        {
          title: 'eFUEL:',
          sub: 'Liquid Transit Enforcement',
          image: {
            src: '/images/rects-efuel.webp',
            alt: 'A fuel tanker with secure access points and a digital display',
            width: 420,
            height: 288,
          },
          points: [
            { b: 'Multi-Compartment Tracking', d: 'Up to 9 compartments' },
            { b: 'Precise Volume Measurement', d: 'dFL Flow Meters' },
            { b: 'Dynamic Alert Dashboard', d: 'Real-time severe violation flags' },
            { b: 'Detailed Transaction Reports', d: 'DTR with GPS timestamps' },
          ],
        },
        {
          title: 'Mobile DVR:',
          sub: 'Advanced Telematics & Driver Monitoring',
          image: {
            src: '/images/rects-dvr.webp',
            alt: 'The view from the driver seat with AI scanning of the road ahead',
            width: 420,
            height: 287,
          },
          points: [
            { b: 'Real-Time CCTV & Long-Term Storage', d: 'Up to 36 months' },
            { b: 'AI-Powered Driver Monitoring', d: 'Distraction & fatigue detection' },
            { b: 'Active Collision Prevention', d: 'FCW, headway, pedestrian, lane departure' },
          ],
        },
        {
          title: 'Smart Gates, ANPR',
          sub: '& Driver Recognition',
          image: {
            src: '/images/rects-gate.webp',
            alt: 'An automated border gate post with a guard booth and access barriers',
            width: 420,
            height: 312,
          },
          points: [
            { b: 'Automated Access Control', d: 'Driver Recog & ANPR' },
            { b: 'Real-Time Compliance Verification', d: 'Eldoret KPC Depot detail' },
            { b: 'Dynamic Activation', d: 'Authorization & Geolocation management' },
          ],
        },
      ],
      tech: [
        {
          name: 'Futuristic IoT',
          image: {
            src: '/images/rects-iot.webp',
            alt: 'A truck and cargo connected to a wireless network',
            width: 360,
            height: 184,
          },
          body: 'Connected seals, sensors and gates on every consignment',
        },
        {
          name: 'Blockchain',
          image: {
            src: '/images/rects-chain.webp',
            alt: 'Linked blocks forming a verifiable ledger on eNET',
            width: 360,
            height: 163,
          },
          body: 'A verifiable ledger of every cargo event on eNET',
        },
        {
          name: 'Multi-GNSS',
          image: {
            src: '/images/rects-gnss.webp',
            alt: 'Satellites, a globe and location pins',
            width: 360,
            height: 204,
          },
          body: 'GPS, GLONASS, Galileo and BeiDou positioning',
        },
      ],
      centre: {
        title: 'Centralized Monitoring Center (CMC)',
        image: {
          src: '/images/rects-cmc.webp',
          alt: 'Operators at a monitoring centre in front of a wall of live map and data screens',
          width: 500,
          height: 266,
        },
        points: [
          { b: '24/7 CMC', d: 'Live Northern Corridor mapping' },
          { b: 'Rapid Response Dispatch' },
          { b: 'Capacity Building', d: 'Cybersecurity, SQL, PMP, programming' },
        ],
      },
      countries: [
        { id: 'UG', name: 'Uganda' },
        { id: 'KE', name: 'Kenya' },
        { id: 'RW', name: 'Rwanda' },
        { id: 'CD', name: 'DR Congo' },
        { id: 'BI', name: 'Burundi' },
        { id: 'SS', name: 'South Sudan' },
      ],
      offices: [
        { city: 'Nairobi', country: 'Kenya', note: 'Regional Support Office' },
        { city: 'Kampala', country: 'Uganda', note: 'Regional Support Office' },
        { city: 'Mombasa', country: 'Kenya', note: 'Regional Support Office' },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      title: 'Smartwatch empowers management through technology',
      body: [
        'Smartwatch ECTS gives cargo transporters and government authorities visibility by providing the real-time location and status of the cargo, and expedites the clearance of goods at border posts, warehouses and along trading corridors.',
        'Cargo transporters and revenue authorities use ECTS to monitor the movement of goods in transit from neighbouring states while en route to other neighbouring states, and those movements from border entry points to inland bonded warehouses. The ECTS system facilitates quick inspection and clearance of cargo by providing real-time data on the movement and location of the cargo.',
      ],
      points: [
        'Real-time location and status of cargo',
        'Faster clearance at border posts, warehouses and along trading corridors',
        'Goods monitored from border entry points to inland bonded warehouses',
      ],
      video: {
        src: '/videos/cargo-tracking.mp4',
        poster: '/videos/cargo-tracking-poster.webp',
        alt: 'A sealed cargo truck on the road dissolves into a live map, where its pin travels the corridor and arrives at its destination',
      },
    },
    {
      kind: 'cards',
      id: 'use-cases',
      title: 'Use cases',
      columns: 3,
      items: [
        {
          title: 'Container transportation',
          body: 'ECTS greatly improves security and reduces the expense and transit times for international and domestic shipments.',
        },
        {
          title: 'Fuel tanker compartment monitoring',
          body: 'The truck tanker monitoring system provides precise fuel level and volume measurement in each compartment of the cistern.',
        },
        {
          title: 'Logistics vehicle cargo management',
          body: 'Keep cargo safe and reduce theft by staying alert, knowing common trends, and keeping cargo locked up securely.',
        },
        {
          title: 'High-value goods tracking',
          body: 'Closely monitor your high-value transports and securely share tracking data with your clients through ECTS. Increase customer satisfaction and optimise your transport operations.',
        },
        {
          title: 'Law enforcement goods monitoring',
          body: 'Track where items are located from your PC, whether in equipment rooms, weapons lockers, vehicles or repair shops, or permanently assigned to officers.',
        },
      ],
    },
    {
      kind: 'split',
      title: 'Actively and significantly safeguard cargo in transit',
      body: [
        'The e-Lock is an intelligent tracking and positioning lock for securing logistics and freight assets. It consists of a primary e-Lock and ancillary secondary e-Locks.',
        'The secondary e-Locks are controlled via the primary e-Lock over Bluetooth communication: if the primary e-Lock is unlocked, the secondary e-Locks will unlock too. The primary e-Lock can accommodate up to seven (7) secondary e-Locks.',
      ],
      points: [
        'Primary e-Lock plus ancillary secondary e-Locks',
        'Secondary e-Locks controlled from the primary over Bluetooth',
        'Up to seven secondary e-Locks per primary e-Lock',
      ],
      reverse: true,
      mediaLabel: 'e-lock fitted to a cargo trailer door',
      // The wider, AI-extended e-lock photo, so the truck and lock sit in the middle of the frame.
      media: { src: '/images/cargo-elock-centered.webp', alt: img.cargoElockTrailer.alt, width: 1000, height: 747 },
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.solution('trucking-and-logistics'),
        routes.solution('government'),
        routes.product('tracking-and-telematics'),
        routes.hardware,
      ],
    },
  ],
  meta: {
    title: 'Electronic Cargo Tracking',
    description:
      'A heavy-duty electromagnetic lock integrated with commercial vehicle operation services to automate cargo, security, carrier and support operations.',
  },
}
