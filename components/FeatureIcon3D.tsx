'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FeatureIcon3DProps {
  variant: 'brain' | 'cube' | 'graph' | 'chart' | 'stack' | 'orbit'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * FeatureIcon3D Component
 * 
 * Creates 3D-feeling animated icons for features using gradients and transforms.
 * 
 * @param variant - Icon type: 'brain' (network), 'cube' (stacked cards), 'graph' (node network), 'chart' (rising)
 * @param size - Size variant: 'sm' | 'md' | 'lg'
 * 
 * To add new variants, add a new case in the switch statement and create the corresponding JSX structure.
 * To adjust animation speed, modify the 'duration' in animate props (currently 3-6s).
 * To change hover effects, modify the whileHover props.
 */
export default function FeatureIcon3D({ variant, size = 'md' }: FeatureIcon3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  }

  const containerClass = `relative ${sizeMap[size]} perspective-1000`

  const renderIcon = () => {
    switch (variant) {
      case 'brain':
        return (
          <div className="relative w-full h-full">
            {/* Network nodes */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180)
              const radius = 35
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              return (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-gradient-sunset"
                  style={{
                    left: `calc(50% + ${x}%)`,
                    top: `calc(50% + ${y}%)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              )
            })}
            {/* Center node */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-sunset"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        )

      case 'cube':
        return (
          <div className="relative w-full h-full" style={{ perspective: '200px' }}>
            {/* Stacked cards with 3D effect */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-full h-full rounded-lg bg-gradient-sunset opacity-60"
                style={{
                  transform: `translateZ(${i * 10}px) rotateX(${i * 5}deg) rotateY(${i * 3}deg)`,
                  zIndex: 3 - i,
                }}
                animate={{
                  y: [0, -5, 0],
                  rotateX: [i * 5, i * 5 + 2, i * 5],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        )

      case 'graph':
        return (
          <div className="relative w-full h-full">
            {/* Node graph */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {[20, 50, 80].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={30 + i * 20}
                  r="4"
                  fill="url(#sunset-gradient)"
                  animate={{
                    r: [4, 6, 4],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
              <defs>
                <linearGradient id="sunset-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6A3D" />
                  <stop offset="50%" stopColor="#FFB347" />
                  <stop offset="100%" stopColor="#FFD75F" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )

      case 'chart':
        return (
          <div className="relative w-full h-full">
            {/* Rising bars */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 rounded-t-sm bg-gradient-sunset"
                style={{
                  left: `${i * 25}%`,
                  width: '20%',
                  height: `${30 + i * 20}%`,
                }}
                animate={{
                  height: [`${30 + i * 20}%`, `${40 + i * 20}%`, `${30 + i * 20}%`],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )

      case 'stack':
        return (
          <div className="relative w-full h-full" style={{ perspective: '150px' }}>
            {/* Stacked screens/cards */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-full h-full rounded-md bg-gradient-sunset opacity-70 border-2 border-pure-white/20"
                style={{
                  transform: `translateZ(${i * 8}px) translateY(${i * 4}px)`,
                  zIndex: 3 - i,
                }}
                animate={{
                  y: [i * 4, i * 4 - 2, i * 4],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: 2.5 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )

      case 'orbit':
        return (
          <div className="relative w-full h-full">
            {/* Center node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-sunset" />
            {/* Orbiting dots */}
            {[...Array(5)].map((_, i) => {
              const angle = (i * 72) * (Math.PI / 180)
              const radius = 30
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gradient-sunset"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [
                      Math.cos(angle) * radius,
                      Math.cos(angle + Math.PI * 2) * radius,
                    ],
                    y: [
                      Math.sin(angle) * radius,
                      Math.sin(angle + Math.PI * 2) * radius,
                    ],
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.1,
                  }}
                />
              )
            })}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      className={containerClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, rotateZ: 5 }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      style={{
        filter: isHovered ? 'drop-shadow(0 10px 20px rgba(255,106,61,0.3))' : 'none',
      }}
    >
      {renderIcon()}
    </motion.div>
  )
}

