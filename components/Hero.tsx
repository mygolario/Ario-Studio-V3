'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Button from './Button'

/**
 * Hero Section
 * 
 * Minimal, professional hero with premium 3D orange card with mouse tilt.
 */
export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 100 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)
  const translateZ = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 15]), springConfig)

  // Back layer transforms (parallax effect)
  const backRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig)
  const backRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const xPos = (e.clientX - centerX) / (rect.width / 2)
      const yPos = (e.clientY - centerY) / (rect.height / 2)
      mouseX.set(Math.max(-0.5, Math.min(0.5, xPos)))
      mouseY.set(Math.max(-0.5, Math.min(0.5, yPos)))
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    const card = cardRef.current
    if (card) {
      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pure-white">
      {/* Subtle Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-custom relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* LEFT COLUMN - Text + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Main Heading */}
            <h1 className="text-hero md:text-[64px] md:leading-[72px] font-semibold text-text-primary">
              We Design, Build & Automate Modern Digital Experiences.
            </h1>

            {/* Subtext */}
            <p className="text-body-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
              A clean, structured, and trustworthy studio focused on clarity, performance, and long-term value.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button href="#contact" variant="primary">
                Start Your Project
              </Button>
              <Button href="#portfolio" variant="secondary" icon={false}>
                View Our Work
              </Button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - 3D Orange Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex items-center justify-center"
          >
            <div 
              ref={containerRef}
              className="relative w-full max-w-md"
              style={{ perspective: '1000px' }}
            >
              {/* Back Layer 1 - Darker Orange/Coral */}
              <motion.div
                className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-orange-dark to-orange opacity-60"
                style={{
                  transform: 'translate(15px, 20px)',
                  rotateX: backRotateX,
                  rotateY: backRotateY,
                  transformStyle: 'preserve-3d',
                }}
              />

              {/* Back Layer 2 - Medium Orange */}
              <motion.div
                className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-orange to-orange-light opacity-70"
                style={{
                  transform: 'translate(8px, 12px)',
                  rotateX: backRotateX,
                  rotateY: backRotateY,
                  transformStyle: 'preserve-3d',
                }}
              />

              {/* Main Orange Card */}
              <motion.div
                ref={cardRef}
                className="relative rounded-[28px] p-12 shadow-card cursor-pointer"
                style={{
                  background: 'linear-gradient(to top, #FF6A3D 0%, #FFB347 50%, #FFD75F 100%)',
                  rotateX,
                  rotateY,
                  translateZ,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Decorative Dots/Bubbles */}
                <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
                  {[...Array(12)].map((_, i) => {
                    const size = Math.random() * 8 + 4
                    const left = Math.random() * 100
                    const top = Math.random() * 100
                    const opacity = Math.random() * 0.3 + 0.1
                    return (
                      <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          left: `${left}%`,
                          top: `${top}%`,
                          opacity,
                        }}
                      />
                    )
                  })}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between text-pure-white">
                  <div>
                    {/* Top-left square block */}
                    <div className="w-14 h-14 rounded-xl bg-white/30 backdrop-blur-sm mb-6" />
                    
                    <h3 className="text-2xl font-semibold mb-2">AI Studio</h3>
                    <p className="text-base opacity-90">Agent-ready dashboard</p>
                  </div>
                  
                  {/* Bottom decorative bar */}
                  <div className="flex gap-3 mt-8">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1.5 rounded-full bg-white/20"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
