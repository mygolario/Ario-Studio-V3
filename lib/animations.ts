/**
 * Animation Utilities
 * 
 * Centralized animation patterns for consistent scroll and hover effects.
 * 
 * To adjust animation timing, modify the duration values (currently 0.6-0.8s).
 * To change easing, modify the ease arrays (currently using custom cubic-bezier).
 */

import { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export const hoverScale = {
  scale: 1.05,
  y: -4,
  transition: { duration: 0.3 },
}

export const hoverLift = {
  y: -8,
  scale: 1.02,
  transition: { duration: 0.3 },
}

