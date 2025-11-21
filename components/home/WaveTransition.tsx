'use client'

import { motion } from 'framer-motion'

/**
 * Wave Transition Component
 * 
 * Curved SVG wave transition between sections.
 */
export default function WaveTransition() {
  return (
    <div className="relative w-full h-24 sm:h-32 lg:h-40 overflow-hidden">
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,60 C360,20 720,100 1080,60 C1260,40 1440,80 1440,80 L1440,120 L0,120 Z"
          fill="var(--color-surface-alt)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,80 C360,40 720,120 1080,80 C1260,60 1440,100 1440,100 L1440,120 L0,120 Z"
          fill="var(--color-base)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
        />
      </svg>
    </div>
  )
}

