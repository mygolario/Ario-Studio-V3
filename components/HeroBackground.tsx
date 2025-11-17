'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * HeroBackground Component
 * 
 * Subtle animated background for Hero section with AI-native feel.
 * Features animated gradient blobs and abstract grid lines.
 * 
 * To adjust:
 * - Blob colors: Modify gradient values in style props
 * - Animation speed: Change duration values (currently 30-40s)
 * - Intensity: Adjust opacity values (currently 0.08-0.15)
 * - Grid visibility: Adjust opacity in grid div (currently 0.03-0.05)
 */
export default function HeroBackground() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReducedMotion(mediaQuery.matches)
      
      const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient overlay for readability */}
      <div className="absolute inset-0 bg-pure-white/70 dark:bg-slate-900/75" />
      
      {/* Animated gradient blobs - subtle AI galaxy feel */}
      {!reducedMotion ? (
        <>
          {/* Blob 1 - Top left - Orange/Warm */}
          <motion.div
            className="absolute rounded-full blur-[150px]"
            style={{
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(255,106,61,0.15) 0%, rgba(255,179,71,0.1) 50%, transparent 70%)',
              top: '5%',
              left: '5%',
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Blob 2 - Bottom right - Gold/Yellow */}
          <motion.div
            className="absolute rounded-full blur-[180px]"
            style={{
              width: '700px',
              height: '700px',
              background: 'radial-gradient(circle, rgba(255,179,71,0.12) 0%, rgba(255,215,95,0.08) 50%, transparent 70%)',
              bottom: '10%',
              right: '10%',
            }}
            animate={{
              x: [0, -40, 30, 0],
              y: [0, 35, -25, 0],
              scale: [1, 0.9, 1.15, 1],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Blob 3 - Center - Soft orange */}
          <motion.div
            className="absolute rounded-full blur-[120px]"
            style={{
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(255,77,77,0.1) 0%, rgba(255,106,61,0.08) 50%, transparent 70%)',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              x: [0, 25, -30, 0],
              y: [0, -20, 30, 0],
              scale: [1, 1.05, 0.98, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      ) : (
        // Static version for reduced motion
        <>
          <div
            className="absolute rounded-full blur-[150px]"
            style={{
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(255,106,61,0.1) 0%, transparent 70%)',
              top: '5%',
              left: '5%',
            }}
          />
          <div
            className="absolute rounded-full blur-[180px]"
            style={{
              width: '700px',
              height: '700px',
              background: 'radial-gradient(circle, rgba(255,179,71,0.08) 0%, transparent 70%)',
              bottom: '10%',
              right: '10%',
            }}
          />
        </>
      )}

      {/* Subtle abstract grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          color: 'currentColor',
        }}
      />
    </div>
  )
}

