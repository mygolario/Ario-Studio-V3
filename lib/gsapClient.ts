/**
 * GSAP Client Utilities
 * 
 * Safe GSAP setup for Next.js client-side only.
 * Registers ScrollTrigger plugin and provides helper functions.
 * 
 * Usage:
 * - Import this file only in "use client" components
 * - Use animateSectionReveal() for scroll-based section animations
 * - Use animateHeroIntro() for hero intro animations
 */

'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin (client-side only)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Animate section reveal on scroll
 * 
 * @param ref - React ref to the section element
 * @param options - Animation options
 */
export const animateSectionReveal = (
  ref: React.RefObject<HTMLElement>,
  options?: {
    y?: number
    duration?: number
    ease?: string
    stagger?: number
    trigger?: string
  }
) => {
  if (typeof window === 'undefined' || !ref.current) return

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion()) {
    gsap.set(ref.current, { opacity: 1, y: 0 })
    return
  }

  const {
    y = 30,
    duration = 0.8,
    ease = 'power3.out',
    stagger = 0.1,
    trigger,
  } = options || {}

  // Animate main container
  gsap.fromTo(
    ref.current,
    {
      opacity: 0,
      y: y,
    },
    {
      opacity: 1,
      y: 0,
      duration: duration,
      ease: ease,
      scrollTrigger: {
        trigger: trigger || ref.current,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none none',
        once: true,
      },
    }
  )

  // Animate child elements with stagger
  const children = ref.current.querySelectorAll('[data-animate-child]')
  if (children.length > 0) {
    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: y * 0.5,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration * 0.8,
        ease: ease,
        stagger: stagger,
        scrollTrigger: {
          trigger: trigger || ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    )
  }
}

/**
 * Animate hero intro on page load
 * 
 * @param elements - Object with refs to hero elements
 */
export const animateHeroIntro = (elements: {
  heading?: React.RefObject<HTMLElement>
  subheading?: React.RefObject<HTMLElement>
  buttons?: React.RefObject<HTMLElement>
  chips?: React.RefObject<HTMLElement>
  card?: React.RefObject<HTMLElement>
}) => {
  if (typeof window === 'undefined') return

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion()) {
    Object.values(elements).forEach((ref) => {
      if (ref?.current) {
        gsap.set(ref.current, { opacity: 1, y: 0 })
      }
    })
    return
  }

  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Animate heading
  if (elements.heading?.current) {
    timeline.fromTo(
      elements.heading.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
  }

  // Animate subheading (after heading)
  if (elements.subheading?.current) {
    timeline.fromTo(
      elements.subheading.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.4'
    )
  }

  // Animate chips (after subheading)
  if (elements.chips?.current) {
    const chipElements = elements.chips.current.querySelectorAll('[data-chip]')
    if (chipElements.length > 0) {
      timeline.fromTo(
        chipElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.3'
      )
    }
  }

  // Animate buttons (last)
  if (elements.buttons?.current) {
    const buttonElements = elements.buttons.current.querySelectorAll('[data-button]')
    if (buttonElements.length > 0) {
      timeline.fromTo(
        buttonElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
        '-=0.2'
      )
    }
  }

  // Animate card (if provided)
  if (elements.card?.current) {
    timeline.fromTo(
      elements.card.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
  }
}

/**
 * Cleanup ScrollTrigger instances
 */
export const cleanupScrollTriggers = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}

