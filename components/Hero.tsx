'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import AnimatedGradientBackground from './AnimatedGradientBackground'
import Button from './Button'

/**
 * Hero Section
 * 
 * To update the hero copy/slogan:
 * - Main heading: Edit the h1 text (line ~70)
 * - Subheading: Edit the paragraph text (line ~85)
 * - Eyebrow: Edit the span text (line ~60)
 * 
 * To adjust animations:
 * - Entrance delay: Modify delay values in motion components (currently 0.2-0.5s)
 * - 3D card rotation: Adjust rotateX/rotateY ranges in useTransform (line ~15-16)
 * - Orbiting speed: Change duration in orbiting elements animate props
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 100 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const xPos = (e.clientX - rect.left) / rect.width - 0.5
      const yPos = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(xPos)
      mouseY.set(yPos)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground variant="hero" intensity="high" />
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-pure-white/60 via-pure-white/40 to-pure-white/60 pointer-events-none z-10" />

      <div className="container-custom relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT COLUMN - Text + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-label text-sunset-orange uppercase tracking-wider font-medium"
            >
              Ario Studio · AI-Native Web Design
            </motion.span>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[48px] leading-[56px] md:text-[64px] md:leading-[72px] lg:text-[72px] lg:leading-[80px] font-bold text-text-primary"
            >
              We design AI-native websites that feel{' '}
              <span className="bg-gradient-sunset bg-clip-text text-transparent">
                cinematic and ship fast.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-body-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
            >
              Ario Studio builds interactive, agent-ready web experiences that turn early-stage ideas into launch-ready products.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="#contact" variant="primary">
                Start a Project
              </Button>
              <Button href="#portfolio" variant="secondary" icon={false}>
                View Selected Work
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Enhanced 3D Visual with Orbiting Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div
              ref={cardRef}
              className="relative w-full max-w-md aspect-square"
              style={{ perspective: '1000px' }}
            >
              {/* 3D Card/Cube with Layered Panels */}
              <motion.div
                className="relative w-full h-full"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                {/* Front face - Main Dashboard */}
                <div
                  className="absolute inset-0 rounded-xlarge bg-gradient-sunset p-8 shadow-2xl"
                  style={{
                    transform: 'translateZ(50px)',
                  }}
                >
                  <div className="h-full flex flex-col justify-between text-pure-white">
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-pure-white/20 backdrop-blur-sm mb-4" />
                      <h3 className="text-2xl font-bold mb-2">AI Studio</h3>
                      <p className="text-sm opacity-90">Agent-ready dashboard</p>
                    </div>
                    <div className="flex gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="flex-1 h-2 rounded-full bg-pure-white/30"
                          animate={{
                            scaleX: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back panel - Secondary Layer */}
                <div
                  className="absolute inset-0 rounded-xlarge bg-gradient-to-r from-sunset-red to-sunset-orange opacity-70"
                  style={{
                    transform: 'translateZ(-30px) translateX(15px)',
                  }}
                />

                {/* Side panel - Third Layer */}
                <div
                  className="absolute inset-0 rounded-xlarge bg-gradient-to-b from-sunset-yellow to-sunset-gold opacity-50"
                  style={{
                    transform: 'translateZ(-30px) translateY(15px)',
                  }}
                />
              </motion.div>

              {/* Orbiting AI Agent Dots */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180)
                const radius = 180
                return (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-gradient-sunset shadow-warm"
                    style={{
                      left: '50%',
                      top: '50%',
                      x: '-50%',
                      y: '-50%',
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
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 8 + i * 0.5,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.2,
                    }}
                  />
                )
              })}

              {/* Floating particles around the card */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-gradient-sunset opacity-40"
                  style={{
                    left: `${15 + i * 18}%`,
                    top: `${25 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
