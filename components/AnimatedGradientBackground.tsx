'use client'

import { motion } from 'framer-motion'

interface AnimatedGradientBackgroundProps {
  variant?: 'hero' | 'section'
  intensity?: 'low' | 'medium' | 'high'
}

/**
 * AnimatedGradientBackground Component
 * 
 * Creates cinematic animated gradient blobs inspired by modern AI studio designs.
 * 
 * @param variant - 'hero' for larger, more prominent blobs | 'section' for subtler background
 * @param intensity - Controls blob size and opacity: 'low' | 'medium' | 'high'
 * 
 * To adjust gradient colors, modify the background gradient values in the blob divs.
 * To tweak animation duration, change the 'duration' values in the animate props (currently 20-30s).
 * To adjust intensity, modify the size (w-[XXXpx]) and opacity values based on the intensity prop.
 */
export default function AnimatedGradientBackground({ 
  variant = 'section', 
  intensity = 'medium' 
}: AnimatedGradientBackgroundProps) {
  const sizeMap = {
    low: { blob1: 400, blob2: 500, blob3: 450 },
    medium: { blob1: 600, blob2: 700, blob3: 650 },
    high: { blob1: 800, blob2: 900, blob3: 850 },
  }

  const opacityMap = {
    low: { blob1: 0.15, blob2: 0.12, blob3: 0.1 },
    medium: { blob1: 0.25, blob2: 0.2, blob3: 0.15 },
    high: { blob1: 0.35, blob2: 0.3, blob3: 0.25 },
  }

  const sizes = variant === 'hero' ? sizeMap.high : sizeMap[intensity]
  const opacities = variant === 'hero' ? { blob1: 0.3, blob2: 0.25, blob3: 0.2 } : opacityMap[intensity]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 - Orange to Gold */}
      <motion.div
        className={`absolute rounded-full blur-[120px]`}
        style={{
          width: `${sizes.blob1}px`,
          height: `${sizes.blob1}px`,
          background: 'radial-gradient(circle, rgba(255,106,61,0.6) 0%, rgba(255,179,71,0.4) 50%, transparent 70%)',
          top: variant === 'hero' ? '10%' : '20%',
          left: variant === 'hero' ? '10%' : '15%',
          opacity: opacities.blob1,
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.2, 0.9, 1],
          rotate: [0, 45, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 2 - Gold to Yellow */}
      <motion.div
        className={`absolute rounded-full blur-[140px]`}
        style={{
          width: `${sizes.blob2}px`,
          height: `${sizes.blob2}px`,
          background: 'radial-gradient(circle, rgba(255,179,71,0.5) 0%, rgba(255,215,95,0.3) 50%, transparent 70%)',
          bottom: variant === 'hero' ? '15%' : '25%',
          right: variant === 'hero' ? '15%' : '20%',
          opacity: opacities.blob2,
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -35, 0],
          scale: [1, 0.8, 1.3, 1],
          rotate: [0, -60, 45, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 3 - Red to Orange */}
      <motion.div
        className={`absolute rounded-full blur-[100px]`}
        style={{
          width: `${sizes.blob3}px`,
          height: `${sizes.blob3}px`,
          background: 'radial-gradient(circle, rgba(255,77,77,0.4) 0%, rgba(255,106,61,0.3) 50%, transparent 70%)',
          top: variant === 'hero' ? '50%' : '60%',
          left: variant === 'hero' ? '50%' : '55%',
          opacity: opacities.blob3,
        }}
        animate={{
          x: [0, 35, -45, 0],
          y: [0, -25, 40, 0],
          scale: [1, 1.1, 0.95, 1],
          rotate: [0, 30, -45, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

