import { hw as base } from './images'
import type { Img } from './types'

/**
 * The hardware page's product shots: each one cut out of its backdrop, upscaled and centred on a
 * transparent 16:10 canvas so it fills the card's image panel.
 */
const clear = (image: Img, file: string): Img => ({
  ...image,
  src: `/images/${file}`,
  width: 800,
  height: 500,
  fit: 'contain',
})

export const hw = {
  ...base,
  aiDashcam: clear(base.aiDashcam, 'hw-ai-dashcam.avif'),
  axleWeightSensors: clear(base.axleWeightSensors, 'hw-axle-weight-sensors.avif'),
  dashboardCamera: clear(base.dashboardCamera, 'hw-dashboard-camera.avif'),
  ecoPanel: clear(base.ecoPanel, 'hw-eco-panel.avif'),
  engineBlockRelay: clear(base.engineBlockRelay, 'hw-engine-block-relay.avif'),
  externalAntenna: clear(base.externalAntenna, 'hw-external-antenna.avif'),
  fatigueSensor: clear(base.fatigueSensor, 'hw-fatigue-sensor.avif'),
  fmsHarness: clear(base.fmsHarness, 'hw-fms-harness.avif'),
  fuelLevelSensor: clear(base.fuelLevelSensor, 'hw-fuel-level-sensor.avif'),
  gpsTracker: clear(base.gpsTracker, 'hw-gps-tracker.avif'),
  mdvr: clear(base.mdvr, 'hw-mdvr.avif'),
  monitor: clear(base.monitor, 'hw-monitor.avif'),
  pushToTalk: clear(base.pushToTalk, 'hw-push-to-talk.avif'),
  rfidSensor: clear(base.rfidSensor, 'hw-rfid-sensor.avif'),
  smartKey: clear(base.smartKey, 'hw-smart-key.avif'),
  snapshotCamera: clear(base.snapshotCamera, 'hw-snapshot-camera.avif'),
  splitterHarness: clear(base.splitterHarness, 'hw-splitter-harness.avif'),
  temperatureSensor: {
    src: '/images/hw-temperature-sensor.avif',
    alt: 'Stainless-steel temperature probe on a rugged black sensor housing with a coiled cable',
    width: 800,
    height: 500,
    fit: 'contain' as const,
  },
}
