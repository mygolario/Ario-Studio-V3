'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { animateHeroIntro, applyHeroParallax, prefersReducedMotion } from '@/lib/gsapClient'
import HeroBackground from './HeroBackground'

/**
 * Hero Section
 * 
 * Minimal, professional hero with premium 3D orange card with mouse tilt.
 */
export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardWrapperRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 100 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)
  const translateZ = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 15]), springConfig)

  // Back layer transforms (parallax effect)
  const backRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig)
  const backRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig)

  const [introComplete, setIntroComplete] = useState(false)
  const heroSectionRef = useRef<HTMLElement>(null)

  // Hero intro animation on page load
  useEffect(() => {
    animateHeroIntro({
      heading: headingRef,
      subheading: subheadingRef,
      chips: chipsRef,
      buttons: buttonsRef,
      card: cardWrapperRef,
    })
    
    // Mark intro as complete after animation duration
    const timer = setTimeout(() => {
      setIntroComplete(true)
    }, 2000) // Allow time for intro animation to complete

    return () => clearTimeout(timer)
  }, [])

  // Apply scroll-based parallax after intro completes
  useEffect(() => {
    if (!introComplete) return

    applyHeroParallax({
      heading: { ref: headingRef, speed: 0.2 }, // Slowest - closest layer
      subheading: { ref: subheadingRef, speed: 0.4 },
      chips: { ref: chipsRef, speed: 0.5 },
      buttons: { ref: buttonsRef, speed: 0.6 },
      card: { ref: cardWrapperRef, speed: 0.3 },
    })
  }, [introComplete])

  // Mouse-based parallax for Hero content (desktop only, after intro)
  const heroMouseX = useMotionValue(0)
  const heroMouseY = useMotionValue(0)
  const heroParallaxX = useSpring(useTransform(heroMouseX, [-1, 1], [-8, 8]), { damping: 30, stiffness: 150 })
  const heroParallaxY = useSpring(useTransform(heroMouseY, [-1, 1], [-8, 8]), { damping: 30, stiffness: 150 })

  useEffect(() => {
    if (!introComplete || prefersReducedMotion()) return
    if (typeof window === 'undefined') return

    // Only enable on desktop (screen width > 1024px)
    const isDesktop = window.innerWidth > 1024
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroSectionRef.current) return
      const rect = heroSectionRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const xPos = (e.clientX - centerX) / (rect.width / 2)
      const yPos = (e.clientY - centerY) / (rect.height / 2)
      heroMouseX.set(Math.max(-1, Math.min(1, xPos * 0.3))) // Very subtle movement
      heroMouseY.set(Math.max(-1, Math.min(1, yPos * 0.3)))
    }

    const handleMouseLeave = () => {
      heroMouseX.set(0)
      heroMouseY.set(0)
    }

    const section = heroSectionRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
      section.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove)
        section.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [introComplete, heroMouseX, heroMouseY])

  // 3D card mouse tilt effect
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
    <section 
      ref={heroSectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pure-white dark:bg-slate-900"
    >
      {/* Cinematic Animated Background */}
      <HeroBackground />

      <div className="container-custom relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* LEFT COLUMN - Text + CTAs */}
          <motion.div 
            className="space-y-8"
            style={{
              x: heroParallaxX,
              y: heroParallaxY,
            }}
          >
            {/* Main Heading - Layer 1 (closest) */}
            <h1 
              ref={headingRef}
              className="text-hero md:text-[64px] md:leading-[72px] font-semibold text-text-primary dark:text-slate-100"
            >
              We Design, Build & Automate Modern Digital Experiences.
            </h1>

            {/* Subtext - Layer 2 */}
            <p 
              ref={subheadingRef}
              className="text-body-lg md:text-xl text-text-secondary dark:text-slate-300 max-w-xl leading-relaxed"
            >
              A clean, structured, and trustworthy studio focused on clarity, performance, and long-term value.
            </p>

            {/* Visual Chips - Layer 2 */}
            <div ref={chipsRef} className="flex flex-wrap gap-3 pt-2">
              {['AI-native', 'Cinematic UX', 'Agent-ready'].map((chip) => (
                <span
                  key={chip}
                  data-chip
                  className="text-body-sm font-medium text-text-secondary dark:text-slate-300 border border-gray-200 dark:border-slate-700 px-4 py-1.5 rounded-full bg-pure-white dark:bg-slate-800 hover:border-orange hover:text-orange hover:bg-orange/5 dark:hover:bg-orange/10 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Buttons - Layer 1 (closest) */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <div data-button>
                <Button href="#contact" variant="primary">
                  Start Your Project
                </Button>
              </div>
              <div data-button>
                <Button href="#portfolio" variant="secondary" icon={false}>
                  View Our Work
                </Button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - 3D Orange Card - Layer 3 */}
          <motion.div
            ref={cardWrapperRef}
            className="hidden lg:flex items-center justify-center"
            style={{
              x: heroParallaxX,
              y: heroParallaxY,
            }}
          >
            <div 
              ref={containerRef}
              className="relative w-full max-w-md"
              style={{ perspective: '1000px' }}
            >
              {/* Back Layer 1 - Darker Orange */}
              <motion.div
                className="absolute inset-0 rounded-[24px] opacity-40"
                style={{
                  background: '#E55A2D', // Darker shade of orange
                  transform: 'translate(15px, 20px)',
                  rotateX: backRotateX,
                  rotateY: backRotateY,
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 10px 30px rgba(229, 90, 45, 0.2)',
                }}
              />

              {/* Back Layer 2 - Medium Orange */}
              <motion.div
                className="absolute inset-0 rounded-[24px] opacity-50"
                style={{
                  background: '#FF8C6B', // Lighter shade of orange
                  transform: 'translate(8px, 12px)',
                  rotateX: backRotateX,
                  rotateY: backRotateY,
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 8px 25px rgba(255, 140, 107, 0.15)',
                }}
              />

              {/* Main Orange Card - Matching Primary Button Color */}
              <motion.div
                ref={cardRef}
                className="relative rounded-[24px] p-12 cursor-pointer"
                style={{
                  background: '#FF6A3D', // Same as primary button
                  boxShadow: '0 18px 40px rgba(255, 106, 61, 0.25)',
                  rotateX,
                  rotateY,
                  translateZ,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Subtle inner glow overlay */}
                <div 
                  className="absolute inset-0 rounded-[24px] pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)',
                  }}
                />
                
                {/* Very subtle tone-on-tone depth circles (optional, minimal) */}
                <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
                  <div 
                    className="absolute rounded-full opacity-[0.08]"
                    style={{
                      width: '120px',
                      height: '120px',
                      background: 'rgba(229, 90, 45, 0.3)',
                      top: '20%',
                      right: '15%',
                      filter: 'blur(40px)',
                    }}
                  />
                  <div 
                    className="absolute rounded-full opacity-[0.06]"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'rgba(255, 140, 66, 0.3)',
                      bottom: '25%',
                      left: '20%',
                      filter: 'blur(30px)',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between text-pure-white">
                  <div>
                    {/* Top-left square block - refined */}
                    <div 
                      className="w-14 h-14 rounded-xl mb-6"
                      style={{
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(8px)',
                      }}
                    />
                    
                    <h3 className="text-2xl font-semibold mb-2">AI Studio</h3>
                    <p className="text-base opacity-90">Agent-ready dashboard</p>
                  </div>
                  
                  {/* Bottom decorative bar - simplified */}
                  <div className="flex gap-3 mt-8">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full"
                        style={{
                          background: 'rgba(255, 255, 255, 0.25)',
                        }}
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
