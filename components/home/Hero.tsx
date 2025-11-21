'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageFA } from '@/content/homepage.fa'
import { homepageEN } from '@/content/homepage.en'
import Button from '@/components/Button'
import { trackEvent } from '@/lib/analytics/trackEvent'
import { Sparkles, Layers, Zap } from 'lucide-react'

/**
 * Hero Section - Two Column Layout
 * 
 * Left: Badge, heading, subtitle, CTAs, caption
 * Right: Cinematic visual block with AI-core symbol and floating panels
 */
export default function Hero() {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const content = language === 'fa' ? homepageFA : homepageEN
  const visualRef = useRef<HTMLDivElement>(null)

  // Parallax effect for visual block
  useEffect(() => {
    if (typeof window === 'undefined' || !visualRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!visualRef.current) return
      const rect = visualRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const xPos = (e.clientX - centerX) / (rect.width / 2)
      const yPos = (e.clientY - centerY) / (rect.height / 2)

      visualRef.current.style.transform = `perspective(1000px) rotateY(${xPos * 5}deg) rotateX(${-yPos * 5}deg)`
    }

    const handleMouseLeave = () => {
      if (visualRef.current) {
        visualRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
      }
    }

    const visual = visualRef.current
    visual.addEventListener('mousemove', handleMouseMove)
    visual.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      visual.removeEventListener('mousemove', handleMouseMove)
      visual.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section
      id="hero"
      className={`relative bg-white overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 ${isRTL ? 'rtl' : ''}`}
    >
      <div className="container-custom px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`space-y-8 ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="inline-block px-4 py-2 text-xs font-medium text-orange bg-orange/10 rounded-full border border-orange/20">
                  {content.hero.badge}
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight ${
                  isRTL ? 'font-iran' : 'font-sans'
                }`}
              >
                {content.hero.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl"
              >
                {content.hero.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              >
                <Button
                  href={isRTL ? '/start-project' : '/en/start-project'}
                  variant="primary"
                  onClick={() => {
                    trackEvent('cta_click', {
                      location: 'hero',
                      lang: language,
                      ctaType: 'primary',
                    })
                  }}
                  className="px-8 py-4 text-lg"
                >
                  {content.hero.ctaPrimary}
                </Button>
                <Button
                  href="#services"
                  variant="secondary"
                  onClick={() => {
                    trackEvent('cta_click', {
                      location: 'hero',
                      lang: language,
                      ctaType: 'secondary',
                    })
                    const element = document.getElementById('services')
                    if (element) {
                      const headerHeight = 80
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - headerHeight
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                      })
                    }
                  }}
                  className="px-8 py-4 text-lg"
                >
                  {content.hero.ctaSecondary}
                </Button>
              </motion.div>

              {/* Caption */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-sm text-gray-500"
              >
                {content.hero.caption}
              </motion.p>
            </motion.div>

            {/* Right Column - Cinematic Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div
                ref={visualRef}
                className="relative w-full h-[500px] transition-transform duration-300 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Main Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange/10 to-orange/5 rounded-3xl border border-orange/20 shadow-2xl">
                  {/* AI Core Symbol */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange to-orange/60 rounded-2xl rotate-45 shadow-lg" />
                      <div className="absolute inset-4 bg-white rounded-xl flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-orange" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Floating Panels */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-8 right-8 w-24 h-24 bg-white/80 backdrop-blur-sm rounded-xl border border-orange/20 shadow-lg flex items-center justify-center"
                  >
                    <Layers className="w-8 h-8 text-orange" strokeWidth={1.5} />
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                    className="absolute bottom-8 left-8 w-20 h-20 bg-white/80 backdrop-blur-sm rounded-xl border border-orange/20 shadow-lg flex items-center justify-center"
                  >
                    <Zap className="w-6 h-6 text-orange" strokeWidth={1.5} />
                  </motion.div>

                  {/* Soft Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange/5 via-transparent to-orange/10 rounded-3xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

