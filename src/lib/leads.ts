export type Lead = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  fleetSize?: string
  country?: string
  interest?: string
  message?: string
  marketingOptIn?: boolean
  source?: string
}

/**
 * Single place to wire a real backend for demo and contact requests.
 * Replace the body with a fetch to your form endpoint (API route, Formspree, CRM, …).
 * Both forms await this and show their sent state when it resolves.
 */
export async function submitLead(lead: Lead): Promise<void> {
  if (import.meta.env.DEV) {
    console.info('[leads] submitLead (no backend configured)', lead)
  }
}
