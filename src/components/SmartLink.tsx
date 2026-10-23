import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { isExternal, isPlainAnchor } from '../lib/links'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  children: ReactNode
}

/**
 * One link component for every destination: router links for site paths,
 * new-tab anchors for external URLs, plain anchors for mailto:, tel: and in-page hashes.
 */
export default function SmartLink({ to, children, ...rest }: Props) {
  if (isExternal(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }
  if (isPlainAnchor(to)) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  )
}
