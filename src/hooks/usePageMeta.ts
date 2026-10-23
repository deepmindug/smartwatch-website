import { useEffect } from 'react'

export const SITE_NAME = 'Smartwatch Solutions'
export const SITE_TITLE = 'Smartwatch Solutions — Fleet & asset management, East Africa'

type Meta = { title?: string; description: string }

/** Sets the document title and meta description for the current page. */
export function usePageMeta({ title, description }: Meta) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_TITLE
    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [title, description])
}
