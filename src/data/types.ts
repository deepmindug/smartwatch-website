export type IconName =
  | 'compliance'
  | 'dashcam'
  | 'tracking'
  | 'maintenance'
  | 'cargo'
  | 'sustainability'
  | 'insurance'
  | 'hardware'
  | 'platform'
  | 'support'
  | 'sales'
  | 'help'
  | 'phone'
  | 'assets'
  | 'fuel'
  | 'bus'
  | 'signal'
  | 'government'
  | 'food'
  | 'field'
  | 'satellite'
  | 'truck'
  | 'van'
  | 'ev'
  | 'site'

export type Img = {
  src: string
  alt: string
  width: number
  height: number
  /** 'contain' keeps cut-out product shots whole instead of cropping them to the frame. */
  fit?: 'cover' | 'contain'
  /** Where a cropped photo keeps its focus, as a CSS object-position (e.g. 'center 25%'). */
  focus?: string
}

/** A muted, looping clip that autoplays in place of a still image. */
export type Video = {
  src: string
  poster: string
  /** Spoken description, like an image's alt. */
  alt: string
}

export type Cta = { label: string; to: string; variant?: 'primary' | 'outline' | 'outline-light' }

export type Stat = { value: number; prefix?: string; suffix?: string; label: string }

export type Point = string | { title: string; body: string }

export type CardItem = {
  title: string
  body?: string
  points?: string[]
  image?: Img
  /** Placeholder label shown when a card's image has been withdrawn and not yet replaced. */
  imageLabel?: string
  icon?: IconName
  href?: string
}

type Base = { id?: string; eyebrow?: string; title?: string; intro?: string }

export type Section =
  | (Base & {
      kind: 'cards'
      items: CardItem[]
      /** Keeps the cards on white instead of the light band. */
      plain?: boolean
      /** A full-width card above the grid: a short title over a statement set large. */
      lead?: { title: string; statement: string }
      columns?: 1 | 2 | 3 | 4
      /** Centres the heading, the cards and their text. */ center?: boolean
    })
  | (Base & { kind: 'bullets'; items: string[]; columns?: 1 | 2 | 3 })
  | (Base & {
      kind: 'split'
      title: string
      /** Stretches the image to the height of the copy beside it instead of a fixed 4 : 3 frame. */
      mediaFill?: boolean
      body: string | string[]
      points?: Point[]
      media?: Img
      /** Takes the media slot when set; `media` is then ignored. */
      video?: Video
      mediaLabel?: string
      reverse?: boolean
      cta?: Cta
    })
  | (Base & {
      /** A long company story broken into a lede with key facts, themed cards and a named-client row. */
      kind: 'story'
      title: string
      lede: string
      facts?: { value: string; label: string }[]
      media?: Img
      mediaLabel?: string
      themes?: CardItem[]
      /** Named clients; a tile shows the logo when one exists and the name otherwise. */
      clients?: { title: string; items: { name: string; logo?: Img }[] }
      /** Revenue authorities shown above the clients in the same panel, each labelled with its country, with a line of copy under the logos. */
      authorities?: { title: string; items: { name: string; country: string; logo: Img }[]; note?: string }
      closing?: string
      cta?: Cta
    })
  | (Base & {
      /** The story's logo panel on its own: revenue authorities, named clients, a closing line and link. */
      kind: 'trust'
      clients?: { title: string; items: { name: string; logo?: Img }[] }
      authorities?: { title: string; items: { name: string; country: string; logo: Img }[]; note?: string }
      closing?: string
      cta?: Cta
    })
  | (Base & { kind: 'stats'; items: Stat[] })
  | (Base & {
      /**
       * RECTS infographic: four product boxes around a map of the countries served, then the core
       * technologies, the monitoring centre and the regional support offices.
       */
      kind: 'coverage'
      subtitle?: string
      pillars: { title: string; sub: string; image: Img; points: { b: string; d?: string }[] }[]
      tech: { name: string; image: Img; body: string }[]
      centre: { title: string; image: Img; points: { b: string; d?: string }[] }
      countries: { id: string; name: string }[]
      offices: { city: string; country: string; note: string }[]
    })
  | (Base & {
      kind: 'beforeAfter'
      title: string
      body?: string
      before: string[]
      after: string[]
      /** Module graphic shown beside the heading. */
      media?: Img
    })
  | (Base & {
      kind: 'tabs'
      tabs: { label: string; title?: string; body: string | string[]; points?: string[] }[]
    })
  | (Base & { kind: 'steps'; items: { title: string; body: string }[] })
  | (Base & {
      kind: 'spotlight'
      title: string
      body: string
      specs?: { value: string; label: string }[]
      media?: Img
      mediaLabel?: string
      /** A drawn visual in place of the photo: the data-ops flow. */
      visual?: 'data-ops'
      cta: Cta
    })
  | (Base & { kind: 'links'; columns: { title: string; links: Cta[] }[] })
  | (Base & { kind: 'faq'; items: { q: string; a: string }[]; reviewed?: boolean })
  | (Base & { kind: 'logos'; items: string[] })
  | (Base & { kind: 'related'; slugs: string[] })

export type SectionKind = Section['kind']

/** The announcement slide that follows a photo hero. */
export type HeroSlide = {
  image: Img
  title: string
  /** Words of the title shown in green. */
  highlight?: string
  subtitle: string
  body: string
  tagline: { label: string; text: string }
  badge: Img
  ctas: Cta[]
}

/** The announcement over the East Africa globe: the same copy without the photo; the badge is optional. */
export type GlobeSlide = Omit<HeroSlide, 'image' | 'badge'> & { badge?: Img }

export type DetailPage = {
  slug: string
  kind: 'solution' | 'product' | 'page'
  name: string
  short: string
  icon?: IconName
  /** The picture on cards and menus that link to this page; defaults to the hero image. */
  cardImage?: Img
  hero: {
    eyebrow: string
    title: string
    intro: string
    tone?: 'dark' | 'light' | 'photo'
    media?: Img
    /** Takes the media slot when set; `media` is then ignored (not on `photo` heroes). */
    video?: Video
    mediaLabel?: string
    ctas?: Cta[]
    /** A second slide: the hero becomes a two-slide slideshow (photo heroes only). */
    slide?: HeroSlide
    /** A third slide: the announcement over the globe. */
    globe?: GlobeSlide
    /** A smaller headline and lead, for a long title that should sit level with the hero image. */
    compact?: boolean
    /** A short catch phrase typed out above the page label; `highlight` is set in green. */
    announce?: { text: string; highlight?: string }
    /** Leaves the hero off: the page opens on its title alone, and the image still serves menus and cards. */
    hidden?: boolean
  }
  sections: Section[]
  /** Closing CTA band. Omit for the default "See it in action" band; `false` hides it. */
  cta?: { title: string; body: string; ctas: Cta[] } | false
  meta: { title: string; description: string }
}
