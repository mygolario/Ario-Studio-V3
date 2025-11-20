'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Button from './Button'
import { animateHeroIntro, applyHeroParallax, prefersReducedMotion } from '@/lib/gsapClient'
import HeroBackground from './HeroBackground'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackEvent } from '@/lib/analytics/trackEvent'

/**
 * Hero Section
 * 
 * Cinematic, AI-studio style hero with layered background, smooth motion, and clear CTAs.
 */
export default function Hero() {
  const t = useTranslation()
  const { language } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardWrapperRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const supportingLineRef = useRef<HTMLParagraphElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
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
  const [hasScrolled, setHasScrolled] = useState(false)
  const heroSectionRef = useRef<HTMLElement>(null)

  // Track scroll to fade scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hero intro animation on page load
  useEffect(() => {
    animateHeroIntro({
      eyebrow: eyebrowRef,
      heading: headingRef,
      subheading: subheadingRef,
      supportingLine: supportingLineRef,
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
    }).catch(() => {
      // Silently fail if parallax can't be applied
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base"
    >
      {/* Cinematic Animated Background */}
      <HeroBackground />

      <div className="container-custom relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* LEFT COLUMN - Text + CTAs */}
          <motion.div 
            className="space-y-6"
            style={{
              x: heroParallaxX,
              y: heroParallaxY,
            }}
          >
            {/* Eyebrow / Label */}
            <motion.div
              ref={eyebrowRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-block"
            >
              <span className="text-label text-orange uppercase tracking-wider font-medium">
                {t.hero.eyebrow}
              </span>
            </motion.div>

            {/* Main Heading - Layer 1 (closest) */}
            <h1 
              ref={headingRef}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-hero lg:text-[64px] lg:leading-[72px] font-semibold text-text-primary ${
                language === 'fa' ? 'rtl:!leading-[1.5] rtl:md:!leading-[1.5] rtl:!tracking-wide' : ''
              }`}
            >
              {t.hero.title}
            </h1>

            {/* Subtext - Layer 2 */}
            <p 
              ref={subheadingRef}
              className="text-base sm:text-body-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
            >
              {t.hero.subtitle}
            </p>


            {/* Visual Chips - Layer 2 */}
            <div ref={chipsRef} className="flex flex-wrap gap-3 pt-2">
              {t.hero.chips.map((chip) => (
                <span
                  key={chip}
                  data-chip
                  className="text-body-sm font-medium text-text-secondary border border-border-subtle px-4 py-1.5 rounded-full bg-surface hover:border-orange hover:text-orange hover:bg-orange/5 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Buttons - Layer 1 (closest) */}
            <div ref={buttonsRef} className="flex flex-col gap-4 pt-4">
              <div data-button>
                <Button 
                  href={t.hero.ctaPrimaryLink || (language === 'fa' ? '/start-project' : '/en/start-project')}
                  variant="primary"
                  onClick={() => {
                    trackEvent('cta_click', {
                      location: 'hero',
                      lang: language,
                      ctaType: 'primary',
                    })
                  }}
                >
                  {t.hero.ctaPrimary}
                </Button>
              </div>
              {/* Services Line */}
              {t.hero.servicesLine && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                  className="text-body-sm text-text-muted pt-2"
                >
                  {t.hero.servicesLine}
                </motion.p>
              )}
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
                    
                    <h3 className="text-2xl font-semibold mb-2">{t.hero.cardTitle}</h3>
                    <p className="text-base opacity-90">{t.hero.cardDescription}</p>
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

      {/* Scroll Indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.span
          className="text-body-sm text-text-muted font-medium"
          animate={{ opacity: hasScrolled ? 0 : [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t.hero.scrollIndicator}
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={20} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  )
}
