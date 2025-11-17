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

// Dynamic GSAP imports for better tree-shaking
let gsap: typeof import('gsap').gsap
let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger

// Lazy load GSAP only when needed
async function loadGSAP(): Promise<{ gsap: typeof import('gsap').gsap; ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger }> {
  if (typeof window === 'undefined') {
    throw new Error('GSAP can only be loaded on the client side')
  }
  
  if (!gsap) {
    const gsapModule = await import('gsap')
    gsap = gsapModule.gsap
  }
  
  if (!ScrollTrigger) {
    const scrollTriggerModule = await import('gsap/ScrollTrigger')
    ScrollTrigger = scrollTriggerModule.ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)
  }
  
  return { gsap, ScrollTrigger }
}

// Initialize GSAP on first use
let gsapPromise: Promise<{ gsap: typeof import('gsap').gsap; ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger }> | null = null

function getGSAP(): Promise<{ gsap: typeof import('gsap').gsap; ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger }> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('GSAP can only be loaded on the client side'))
  }
  
  if (!gsapPromise) {
    gsapPromise = loadGSAP()
  }
  
  return gsapPromise
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
export const animateSectionReveal = async (
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
  
  // Skip animation if tab is not visible
  if (document.visibilityState !== 'visible') {
    if (ref.current) {
      ref.current.style.opacity = '1'
      ref.current.style.transform = 'translateY(0)'
    }
    return
  }

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion()) {
    if (ref.current) {
      ref.current.style.opacity = '1'
      ref.current.style.transform = 'translateY(0)'
    }
    return
  }

  const { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance } = await getGSAP()
  if (!gsapInstance || !ScrollTriggerInstance) return

  const {
    y = 30,
    duration = 0.8,
    ease = 'power3.out',
    stagger = 0.1,
    trigger,
  } = options || {}

  // Animate main container
  gsapInstance.fromTo(
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
    gsapInstance.fromTo(
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
export const animateHeroIntro = async (elements: {
  heading?: React.RefObject<HTMLElement>
  subheading?: React.RefObject<HTMLElement>
  buttons?: React.RefObject<HTMLElement>
  chips?: React.RefObject<HTMLElement>
  card?: React.RefObject<HTMLElement>
}) => {
  if (typeof window === 'undefined') return
  
  // Skip animation if tab is not visible
  if (document.visibilityState !== 'visible') {
    Object.values(elements).forEach((ref) => {
      if (ref?.current) {
        ref.current.style.opacity = '1'
        ref.current.style.transform = 'translateY(0)'
      }
    })
    return
  }

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion()) {
    Object.values(elements).forEach((ref) => {
      if (ref?.current) {
        ref.current.style.opacity = '1'
        ref.current.style.transform = 'translateY(0)'
      }
    })
    return
  }

  const { gsap: gsapInstance } = await getGSAP()
  if (!gsapInstance) return

  const timeline = gsapInstance.timeline({ defaults: { ease: 'power3.out' } })

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
export const cleanupScrollTriggers = async () => {
  if (typeof window !== 'undefined') {
    const { ScrollTrigger: ScrollTriggerInstance } = await getGSAP()
    if (ScrollTriggerInstance) {
      ScrollTriggerInstance.getAll().forEach((trigger) => trigger.kill())
    }
  }
}

/**
 * Apply scroll-based parallax to Hero elements
 * 
 * @param elements - Object with refs to hero elements and their parallax speeds
 */
export const applyHeroParallax = async (elements: {
  heading?: { ref: React.RefObject<HTMLElement>; speed: number }
  subheading?: { ref: React.RefObject<HTMLElement>; speed: number }
  buttons?: { ref: React.RefObject<HTMLElement>; speed: number }
  card?: { ref: React.RefObject<HTMLElement>; speed: number }
  chips?: { ref: React.RefObject<HTMLElement>; speed: number }
}) => {
  if (typeof window === 'undefined') return

  // Disable parallax on mobile/low-power devices
  const isMobile = window.innerWidth < 768
  if (isMobile) return

  // Skip parallax if tab is not visible
  if (document.visibilityState !== 'visible') return

  // Skip parallax if user prefers reduced motion
  if (prefersReducedMotion()) {
    return
  }

  const { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance } = await getGSAP()
  if (!gsapInstance || !ScrollTriggerInstance) return

  const heroSection = elements.heading?.ref.current?.closest('section')
  if (!heroSection) return

  // Create ScrollTrigger for each element
  Object.entries(elements).forEach(([key, config]) => {
    if (!config?.ref.current) return

    const element = config.ref.current
    const speed = config.speed || 0.3 // Default speed multiplier

    ScrollTriggerInstance.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const translateY = progress * 20 * speed // Max 20px movement
        gsapInstance.set(element, { y: translateY })
      },
    })
  })
}

