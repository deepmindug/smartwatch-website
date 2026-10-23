import type { ReactNode } from 'react'
import type { IconName } from '../data/types'

/** Original line icons drawn for this site (24px grid, stroke only). */
const paths: Record<IconName, ReactNode> = {
  compliance: (
    <>
      <path d="M12 3l8 3.5v5.5c0 4.8-3.4 8.3-8 9-4.6-.7-8-4.2-8-9V6.5z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  dashcam: (
    <>
      <rect x="3" y="7" width="13" height="10" rx="2" />
      <path d="M16 10.5l5-2.5v8l-5-2.5z" />
      <circle cx="9.5" cy="12" r="2" />
    </>
  ),
  tracking: (
    <>
      <path d="M12 21.5s-6.5-5.6-6.5-11.5a6.5 6.5 0 0 1 13 0c0 5.9-6.5 11.5-6.5 11.5z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  maintenance: (
    <>
      <path d="M14.5 6.5a4 4 0 0 0-5.3 5.2L4 17l3 3 5.3-5.2a4 4 0 0 0 5.2-5.3l-2.5 2.5-2-2z" />
    </>
  ),
  cargo: (
    <>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15" r="1.5" />
    </>
  ),
  sustainability: (
    <>
      <path d="M5 19c0-7.5 4.8-12.4 14-13.5-.7 9-5.7 13.5-14 13.5z" />
      <path d="M5 19c2.5-4 5.7-7 10-9" />
    </>
  ),
  insurance: (
    <>
      <path d="M12 3l8 3.5v5.5c0 4.8-3.4 8.3-8 9-4.6-.7-8-4.2-8-9V6.5z" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  hardware: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="3" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  platform: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="2" />
      <path d="M8.5 20h7M12 16.5V20" />
    </>
  ),
  support: (
    <>
      <path d="M4.5 12.5a7.5 7.5 0 0 1 15 0" />
      <rect x="3" y="12.5" width="4" height="6" rx="1.5" />
      <rect x="17" y="12.5" width="4" height="6" rx="1.5" />
      <path d="M19 18.5a3 3 0 0 1-3 3h-2.5" />
    </>
  ),
  sales: (
    <>
      <path d="M4 5h16v10H9l-5 4z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.1 1-1.1 1.7" />
      <path d="M12 17h.01" />
    </>
  ),
  phone: (
    <path d="M5.5 3.5h3.2l1.8 4.6-2.3 1.6a12.5 12.5 0 0 0 6.1 6.1l1.6-2.3 4.6 1.8v3.2a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.5 5.6a2 2 0 0 1 2-2.1z" />
  ),
  assets: (
    <>
      <rect x="3" y="3.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <path d="M17.25 13.5v7.5M13.5 17.25h7.5" />
    </>
  ),
  fuel: (
    <>
      <path d="M4 20.5V5a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 13 5v15.5" />
      <path d="M3 20.5h11" />
      <path d="M4 11h9" />
      <path d="M16 8l2.5 2.5v7a1.75 1.75 0 0 0 3.5 0V12l-2-3" />
    </>
  ),
  bus: (
    <>
      <rect x="3.5" y="4" width="17" height="12.5" rx="2.5" />
      <path d="M3.5 11h17" />
      <path d="M7 16.5v2M17 16.5v2" />
      <path d="M7.5 13.8h.01M16.5 13.8h.01" />
    </>
  ),
  signal: (
    <>
      <path d="M12 20V12" />
      <path d="M8.8 8.8a4.5 4.5 0 0 1 6.4 0" />
      <path d="M6 6a8.5 8.5 0 0 1 12 0" />
      <circle cx="12" cy="11.5" r="1.5" />
    </>
  ),
  government: (
    <>
      <path d="M3.5 9.5 12 4l8.5 5.5" />
      <path d="M5.5 9.5v8M10 9.5v8M14 9.5v8M18.5 9.5v8" />
      <path d="M3 20.5h18" />
    </>
  ),
  food: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="M9 9v6" />
      <path d="M12.5 9.5a3 3 0 0 1 0 5" />
      <path d="M15.5 8a5.5 5.5 0 0 1 0 8" />
    </>
  ),
  field: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
      <path d="M13.8 7.8a2.4 2.4 0 0 0-3.2 3.1l-2.1 2.1 1.6 1.6 2.1-2.1a2.4 2.4 0 0 0 3.1-3.2l-1.4 1.5-1.4-1.4z" />
    </>
  ),
  satellite: (
    <>
      <path d="M4 20a9 9 0 0 1 9-9" />
      <path d="M4 20a5 5 0 0 1 5-5" />
      <circle cx="5" cy="19" r="1" />
      <path d="M14.5 3.5 20.5 9.5l-3 3-6-6z" />
      <path d="M11.5 6.5 8 10l6 6 3.5-3.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 10h3.8l3.2 3v2.5h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  van: (
    <>
      <path d="M2.5 7.5h9.5l4 3.5h4a1.5 1.5 0 0 1 1.5 1.5v3.5h-19z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
      <path d="M12 7.5V11" />
    </>
  ),
  ev: (
    <>
      <rect x="3" y="7.5" width="13" height="9" rx="2" />
      <path d="M19 10v4a1.8 1.8 0 0 0 1.8-1.8V11.8A1.8 1.8 0 0 0 19 10z" />
      <path d="M16 10.5h2" />
      <path d="M10.2 9.8 7.8 13h2.6l-1.2 2.4" />
    </>
  ),
  site: (
    <>
      <path d="M4 20.5h16" />
      <path d="M7 20.5V7l9-2.5v16" />
      <path d="M7 11l9-2.5" />
      <path d="M7 15l9-2.5" />
    </>
  ),
}

type Props = {
  name: IconName
  size?: number
  className?: string
  /** Line weight; thinner for the platform tabs. */ stroke?: number
}

export default function Icon({ name, size = 24, className, stroke = 1.8 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  )
}
