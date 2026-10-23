export type RailItem = { id: string; label: string }

const labels: Record<string, string> = {
  features: 'Features',
  benefits: 'Benefits',
  'how-it-works': 'How it works',
  hardware: 'Hardware',
  'data-ops': 'Data ops',
  resources: 'Resources',
  faq: 'FAQ',
  devices: 'Devices',
  accessories: 'Accessories',
  specs: 'Specs',
  industries: 'Industries',
  related: 'Related',
  stats: 'At a glance',
  vision: 'Vision',
  heritage: 'Heritage',
  'why-us': 'Why us',
  awards: 'Awards',
  support: 'Support',
  products: 'Products',
  demo: 'Get a demo',
}

/** Short pill label for a section id, falling back to the section title. */
export function railLabel(id: string, fallback?: string): string {
  return labels[id] ?? fallback ?? id
}
