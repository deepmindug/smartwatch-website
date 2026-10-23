import { hardwareRef, solutionRefs, type PageRef } from './pages'

/** The fifteen "Solutions" menu entries: fourteen industries plus hardware, in the live nav order. */
export const industries: PageRef[] = [...solutionRefs, hardwareRef]

/** Two menu columns of the industries list. */
export const industriesA = industries.slice(0, 8)
export const industriesB = industries.slice(8)
