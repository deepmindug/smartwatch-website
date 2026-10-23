import { hw } from './hardware-images'
import { img } from './images'
import type { DetailPage } from './types'

/**
 * Hardware & accessories page. Copy transcribed from the live
 * smartwatchsolutions.com/hardware-and-accessories/ page (6 devices, 12 accessories),
 * with typos corrected and third-party manufacturer names removed.
 */
export const hardware: DetailPage = {
  slug: 'hardware',
  kind: 'page',
  name: 'Hardware & accessories',
  short:
    'Total visibility into every aspect of fleet management, from safety and tracking to compliance and fuel costs.',
  icon: 'hardware',
  cardImage: img.productsCard,
  hero: {
    eyebrow: 'Hardware & accessories',
    title: "Hardware built for Africa's roads.",
    intro:
      'Total visibility into every aspect of fleet management, from safety and tracking to compliance and fuel costs.',
    tone: 'dark',
    media: img.products,
    ctas: [
      { label: 'View the devices', to: '/hardware#devices' },
      { label: 'Contact us', to: '/contact', variant: 'outline-light' },
    ],
  },
  sections: [
    {
      kind: 'steps',
      id: 'how-it-works',
      eyebrow: 'How it works',
      title: 'Plug and play, activated with a QR code.',
      items: [
        {
          title: 'Install',
          body: "A plug-and-play device delivered straight to you that doesn't require a technician to install.",
        },
        {
          title: 'Connect',
          body: 'Activate the device using a QR code. Our trackers use 4G (GSM) connectivity and a premium GPS module to report to Smartwatch FM.',
        },
        {
          title: 'Monitor',
          body: 'Track fleet activities and get daily notifications about fleet performance to manage trips, lower fuel costs and monitor driver behaviour. Receive instant mobile and web notifications about driving events and hours.',
        },
      ],
    },
    {
      kind: 'cards',
      id: 'devices',
      eyebrow: 'Smartwatch devices',
      title: 'Cameras, trackers, sensors and monitors.',
      columns: 3,
      items: [
        {
          title: 'AI Dashcam',
          image: hw.aiDashcam,
          body: 'Driver-facing, in-cab AI dash cams detect risky driver behaviour and alert the driver and fleet manager to fatigue, phone usage, smoking and distracted driving to prevent accidents and keep your drivers safe on the road.',
        },
        {
          title: 'Dashboard Camera',
          image: hw.dashboardCamera,
          body: 'The driver-facing camera detects driver events including seat belt, fatigue, phone use, distraction and smoking.',
        },
        {
          title: 'MDVR',
          image: hw.mdvr,
          body: 'MDVR stands for Mobile Digital Video Recorder. It is a sturdy digital video recorder that allows our customers to keep an eye on moving vehicles and track their real-time GPS location.',
        },
        {
          title: 'GPS Tracker',
          image: hw.gpsTracker,
          body: 'Our tracker is a compact GNSS-based Automatic Vehicle Location (AVL) tracker with all the essential features for vehicle tracking and fleet management. It uses 4G (GSM) connectivity and a premium GPS module, and suits logistics, delivery, utility services, car rental and vehicle financing use cases.',
        },
        {
          title: 'Axle Weight Monitoring Sensors',
          image: hw.axleWeightSensors,
          body: 'Axle weight monitoring sensors determine the axle load of a heavy commercial vehicle. They let the people in charge know the exact weight of the vehicle with or without cargo, help avoid possible fines for overloading, and reduce maintenance costs related to continuous overloading.',
        },
        {
          title: 'Monitor',
          image: hw.monitor,
          body: 'This 10.36-inch vehicle smart monitor is an Android touch screen that works with the vehicle MDVR and displays up to 5 channels of AHD cameras on screen. It supports map navigation, vehicle status information, camera video, driver driving records, Bluetooth phone, mobile screen mirroring, multimedia player, FM launch, assistant apps and other functions.',
        },
      ],
    },
    {
      kind: 'cards',
      id: 'specs',
      eyebrow: 'Built for the road',
      title: 'Dust and water resistant, dependable GPS tracking devices.',
      columns: 4,
      items: [
        { title: '4G', body: 'GSM connectivity with a premium GPS module.' },
        { title: 'GNSS', body: 'Automatic vehicle location (AVL) tracking.' },
        { title: 'IP-rated', body: 'Dust and water resistant housings for harsh working environments.' },
        { title: 'CANbus', body: 'Vehicle data via OBDII, FMS and splitter harnesses.' },
      ],
    },
    {
      kind: 'cards',
      id: 'accessories',
      eyebrow: 'Smartwatch accessories',
      title: 'Extend every tracker with Smartwatch accessories.',
      columns: 3,
      items: [
        {
          title: 'Fatigue Sensor',
          image: hw.fatigueSensor,
          body: "The device alarms the driver upon detection of fatigue or distraction. It also provides on-demand image output to the fleet management system when either alarm is triggered. These images serve as evidence to check the driver's real state and other data, helping management centres further improve driver safety and performance.",
        },
        {
          title: 'Snapshot Camera',
          image: hw.snapshotCamera,
          body: 'Snapshot cameras let you get snapshots of what was happening at a particular time or event with the vehicle and driver. Indoor or outdoor cameras can automatically take snapshots on set events, such as harsh braking or accelerating, GSM jamming, vehicle towing and others. They help ensure vehicle security and provide essential evidence in case of an accident.',
        },
        {
          title: 'Smart Key',
          image: hw.smartKey,
          body: 'A car smart key is an advanced iteration of a conventional car key, which leverages technology to help you manage the locks on your car, start your engine or perform other functions.',
        },
        {
          title: 'RFID Sensor',
          image: hw.rfidSensor,
          body: "The 1-Wire RFID reader is a small card reader for UNIQUE standard 125 kHz cards that identifies the driver. It shows who is using the vehicle, at what time, and who is in charge of it. If any discrepancies arise during identification, it is possible to block the vehicle's engine, notify the driver with an audio signal and send a warning to the monitoring and control system.",
        },
        {
          title: 'Push to Talk',
          image: hw.pushToTalk,
          body: 'The handheld transceiver is designed for maintaining voice communication between the driver and the manager. The device does not require an additional SIM card and simply plugs into the GPS device.',
        },
        {
          title: 'Wireless Fuel Level Sensor',
          image: hw.fuelLevelSensor,
          body: 'A wireless, battery-powered fuel level sensor with 5 to 10 years of battery life guarantees accurate and reliable fuel level monitoring, with no messing with wires.',
        },
        {
          title: 'Splitter Harness',
          image: hw.splitterHarness,
          body: 'The 9-pin Y splitter harness is used to install advanced trackers in trucks with a 9-pin Deutsch socket. CANbus data reading is available using the harness, the connection can also be used as a power source, and the spare socket stays available for vehicle diagnostics.',
        },
        {
          title: 'FMS Harness',
          image: hw.fmsHarness,
          body: 'Install GPS trackers faster and easier with the FMS harness, used to fit our advanced tracker family to trucks. CANbus and tachograph data is available using the FMS harness.',
        },
        {
          title: 'Temperature Sensor',
          image: hw.temperatureSensor,
          body: 'Temperature sensors measure the temperature of cargo and refrigerators, operating with an accuracy of ±0.5 °C across a range of −40 °C to +120 °C. The IP67-certified housing ensures durability in harsh working environments.',
        },
        {
          title: 'External Antenna',
          image: hw.externalAntenna,
          body: 'An external GNSS antenna can be connected to our 5th-generation advanced tracker family for more accurate fleet location, especially when the tracker needs to be hidden under metal construction in the vehicle. If the external antenna is damaged or disconnected, the internal one takes over and you are notified that someone is trying to interrupt fleet monitoring or damage the device.',
        },
        {
          title: 'Engine Block Relay',
          image: hw.engineBlockRelay,
          body: 'The engine relay is designed for blocking the engine of a vehicle, offering protection against unauthorised use. Remote activation of the relay is possible through the monitoring and control system or by SMS.',
        },
        {
          title: 'Eco Panel',
          image: hw.ecoPanel,
          body: 'The Eco-Drive panel monitors and educates drivers in real time. It informs the driver when their driving actions are causing fuel wastage and accelerating vehicle depreciation. Driving information is also sent to the real-time monitoring and control system, which analyses driver behaviour and provides data for driver performance evaluation.',
        },
      ],
    },
    {
      kind: 'cards',
      id: 'industries',
      eyebrow: 'Industries',
      title: 'Hardware for every kind of fleet.',
      columns: 4,
      items: [
        {
          title: 'Trucking & Logistics',
          body: 'Axle weight sensors, FMS and splitter harnesses bring CANbus and tachograph data from heavy commercial vehicles.',
          href: '/solutions/trucking-and-logistics',
        },
        {
          title: 'Bus & Public Transport',
          body: 'AI dash cams, MDVR and in-cab monitors with high-accuracy people counting.',
          href: '/solutions/bus-and-public-transport',
        },
        {
          title: 'Food Manufacturing & Processing',
          body: 'Temperature sensors for cargo and refrigerators, accurate to ±0.5 °C.',
          href: '/solutions/food-manufacturing',
        },
        {
          title: 'Oil and Gas',
          body: 'Driver-facing cameras and fatigue sensors that detect fatigue, phone use, smoking and distraction.',
          href: '/solutions/oil-and-gas',
        },
      ],
    },
    {
      kind: 'faq',
      id: 'faq',
      title: 'Frequently asked questions',
      reviewed: false,
      items: [
        {
          q: 'Do I need a technician to install a Smartwatch tracker?',
          a: "No. Our plug-and-play devices are delivered straight to you, don't require a technician to install and can be activated using a QR code.",
        },
        {
          q: 'How do the trackers connect to the platform?',
          a: 'Our GPS tracker is a compact GNSS-based AVL tracker that uses 4G (GSM) connectivity and a premium GPS module. Trucks with a 9-pin Deutsch socket can use the splitter harness, and the FMS harness adds CANbus and tachograph data.',
        },
        {
          q: 'What can the AI dashcam detect?',
          a: 'Driver-facing, in-cab AI dash cams detect risky driver behaviour, including fatigue, phone usage, smoking, seat belt use and distracted driving, and alert both the driver and the fleet manager.',
        },
        {
          q: 'Can I immobilise a vehicle remotely?',
          a: "Yes. The engine block relay protects against unauthorised use and can be activated remotely through the monitoring and control system or by SMS. With the RFID reader, the vehicle's engine can also be blocked if driver identification fails.",
        },
        {
          q: 'Do you supply sensors for refrigerated cargo?',
          a: 'Yes. Our temperature sensors measure cargo and refrigerator temperature with ±0.5 °C accuracy from −40 °C to +120 °C, in an IP67-certified housing.',
        },
      ],
    },
    {
      kind: 'related',
      id: 'related',
      slugs: ['/products/tracking-and-telematics', '/products/driver-safety-dash-cameras', '/products/maintenance'],
    },
  ],
  meta: {
    title: 'Hardware & accessories',
    description:
      'Total visibility into every aspect of fleet management, from safety and tracking to compliance and fuel costs.',
  },
}
