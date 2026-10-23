import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once for the whole app; every component imports gsap from here.
gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Height of the sticky header plus breathing room, used as the anchor scroll offset. */
export const HEADER_OFFSET = 108

export { gsap, ScrollTrigger, useGSAP }
