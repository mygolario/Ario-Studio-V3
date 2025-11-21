'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/Button'
import { trackEvent } from '@/lib/analytics/trackEvent'

/**
 * Final CTA Component
 * 
 * Cinematic closing scene with radial orange glow,
 * line-by-line text animation, and glowing CTA buttons.
 */
export default function FinalCTA() {
  const t = useTranslation()
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const sectionRef = useRef<HTMLElement>(null)
  const lang = language === 'fa' ? 'fa' : 'en'

  // Route paths
  const primaryCtaLink = lang === 'fa' ? '/start-project' : '/en/start-project'
  const contactEmail = 'info@ariostudio.net'

  // GSAP animations for line-by-line text
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      if (!section) return

      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      // Animate title line-by-line
      const titleLines = section.querySelectorAll('[data-title-line]')
      if (titleLines.length > 0) {
        gsap.fromTo(
          titleLines,
          {
            opacity: 0,
            y: 30,
            clipPath: 'inset(0 0 100% 0)',
          },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }

      // Animate subtitle
      const subtitle = section.querySelector('[data-subtitle]')
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.5,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }

      // Animate buttons
      const buttons = section.querySelectorAll('[data-cta-button]')
      if (buttons.length > 0) {
        gsap.fromTo(
          buttons,
          {
            opacity: 0,
            scale: 0.9,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.7,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }
    }

    loadGSAP().catch(console.error)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="start-project"
      className={`relative py-24 sm:py-32 lg:py-40 overflow-hidden ${isRTL ? 'rtl' : ''}`}
    >
      {/* Radial Orange Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255, 106, 61, 0.4) 0%, rgba(247, 105, 58, 0.2) 50%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(248, 116, 73, 0.3) 0%, rgba(255, 106, 61, 0.15) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Subtle top border for separation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center ${isRTL ? 'rtl:text-right' : ''}`}>
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-4"
            >
              <span className="text-label text-orange uppercase tracking-wider font-medium">
                {t.startProject.label}
              </span>
            </motion.div>

            {/* Main Heading - Line by Line */}
            <h2
              className={`text-h1 sm:text-[48px] lg:text-[56px] font-semibold text-text-primary mb-6 leading-tight ${
                isRTL ? 'rtl:text-right' : ''
              }`}
            >
              {t.startProject.title.split(' ').map((word, index, array) => (
                <span
                  key={index}
                  data-title-line
                  className="inline-block"
                  style={{
                    opacity: 0,
                  }}
                >
                  {word}
                  {index < array.length - 1 && '\u00A0'}
                </span>
              ))}
            </h2>

            {/* Section accent line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto mb-8"
            />

            {/* Subtitle */}
            <p
              data-subtitle
              className="text-body-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12"
              style={{
                opacity: 0,
              }}
            >
              {t.startProject.subtitle}
            </p>

            {/* CTA Buttons with Glow */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary CTA */}
              <motion.div
                data-cta-button
                className="relative group"
                style={{
                  opacity: 0,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  href={primaryCtaLink}
                  variant="primary"
                  className="!px-10 !py-5 !text-lg relative overflow-hidden"
                  onClick={() => {
                    trackEvent('cta_click', {
                      location: 'final_cta',
                      lang: language,
                      ctaType: 'primary',
                    })
                  }}
                >
                  <span className="relative z-10">{t.startProject.ctaPrimary}</span>
                  {/* Pulse glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-20"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(255, 106, 61, 0)',
                        '0 0 30px rgba(255, 106, 61, 0.6)',
                        '0 0 0px rgba(255, 106, 61, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </Button>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                data-cta-button
                className="relative group"
                style={{
                  opacity: 0,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  href={`mailto:${contactEmail}`}
                  variant="secondary"
                  icon={false}
                  className="!px-10 !py-5 !text-lg relative overflow-hidden"
                  onClick={() => {
                    trackEvent('cta_click', {
                      location: 'final_cta',
                      lang: language,
                      ctaType: 'secondary',
                    })
                  }}
                >
                  <span className="relative z-10">{t.startProject.ctaSecondary}</span>
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

