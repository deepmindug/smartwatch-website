import { routes } from './site'
import type { Section } from './types'

/**
 * The data-ops spotlight every product page carries in place of the old hardware panel: how a
 * reading from a device becomes an action on the platform. The panel draws the flow itself
 * (DataOpsFlow) rather than showing a photo.
 */
export const dataOpsSpotlight: Extract<Section, { kind: 'spotlight' }> = {
  kind: 'spotlight',
  id: 'data-ops',
  eyebrow: 'Data ops',
  title: 'From reading to action, automatically.',
  body: 'Every message a device sends is picked up the moment it lands, shaped into the attributes you track and run through your own rules, so alerts, commands and reports go out without anyone watching a screen.',
  specs: [
    { value: 'Real-time', label: 'Readings processed as they arrive' },
    { value: 'Rules', label: 'IF / THEN conditions you define' },
    { value: 'Actions', label: 'Alerts, commands and reports' },
    { value: 'REST API', label: 'Streams into the systems you run' },
  ],
  visual: 'data-ops',
  cta: { label: 'Platform overview', to: routes.products },
}
