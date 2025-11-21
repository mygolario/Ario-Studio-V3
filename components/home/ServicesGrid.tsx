'use client'

import { useEffect, useRef } from 'react'
import { type LocalizedContent } from '@/lib/content/types'
import { type SupportedLang } from '@/lib/i18n'
import { 
  Sparkles, 
  Code, 
  Palette, 
  Zap, 
  Globe, 
  Layers,
  Brain,
  Rocket
} from 'lucide-react'

interface ServicesGridProps {
  servicesContent?: LocalizedContent[]
  lang?: SupportedLang
}

/**
 * Services Grid Component
 * 
 * Motion-heavy services section with cinematic card animations.
 * Cards enter from left/right with rotation, shadow, and fade effects.
 */
export default function ServicesGrid({ servicesContent = [], lang }: ServicesGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const currentLang: SupportedLang = lang || 'fa'
  const isRTL = currentLang === 'fa'

  // Service icons mapping
  const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'full-website': Globe,
    'landing-page': Rocket,
    'ai-automation': Brain,
    'brand-refresh': Palette,
    'web-design': Layers,
    'development': Code,
    'automation': Zap,
    default: Sparkles,
  }

  // Get icon for service
  const getServiceIcon = (slug: string) => {
    const Icon = serviceIcons[slug] || serviceIcons.default
    return Icon
  }

  // UI texts
  const uiTexts = isRTL
    ? {
        title: 'سرویس‌ها',
        subtitle: 'آنچه برای ساخت تجربه‌های وب سینمایی انجام می‌دهیم.',
        emptyState: 'سرویس‌ها به‌زودی اینجا اضافه می‌شوند.',
      }
    : {
        title: 'Services',
        subtitle: 'What we do to craft cinematic, AI-powered web experiences.',
        emptyState: 'Services will be added here soon.',
      }

  // Filter only service type content
  const services = servicesContent.filter((item) => item.type === 'service')

  // GSAP animations
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

      // Animate cards on scroll
      const cards = section.querySelectorAll('[data-service-card]')
      cards.forEach((card, index) => {
        const isEven = index % 2 === 0
        const direction = isRTL ? (isEven ? 1 : -1) : (isEven ? -1 : 1)

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: direction * 100,
            y: 30,
            rotation: direction * 3,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      })

      // Animate section header
      const header = section.querySelector('[data-section-header]')
      if (header) {
        gsap.fromTo(
          header,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
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
  }, [services.length, isRTL])

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-base ${isRTL ? 'rtl' : ''}`}
    >
      {/* Enhanced background with subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-orange/5 opacity-30 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            data-section-header
            className={`text-center mb-16 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <div className="mb-6">
              <h2 className={`text-h1 font-semibold text-text-primary mb-4 ${isRTL ? 'rtl:text-right' : ''}`}>
                {uiTexts.title}
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className={`text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed ${isRTL ? 'rtl:text-right' : ''}`}>
              {uiTexts.subtitle}
            </p>
          </div>

          {/* Services Grid */}
          {services.length === 0 ? (
            <div className={`text-center py-16 ${isRTL ? 'rtl:text-right' : ''}`}>
              <p className="text-text-secondary">{uiTexts.emptyState}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = getServiceIcon(service.slug)
                return (
                  <div
                    key={service.slug}
                    data-service-card
                    className="group relative"
                  >
                    {/* Enhanced Service Card with Motion */}
                    <div className="relative h-full bg-surface border border-border-subtle rounded-xl p-6 sm:p-8 transition-all duration-500 overflow-hidden hover:scale-105 hover:shadow-2xl hover:border-orange/50">
                      {/* Subtle inner glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange/0 via-orange/0 to-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />

                      {/* Icon with abstract AI-style design */}
                      <div className="relative z-10 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-orange/10 border border-orange/30 flex items-center justify-center group-hover:bg-orange/20 group-hover:border-orange/50 transition-all duration-300">
                          <Icon className="w-7 h-7 text-orange" />
                        </div>
                      </div>

                      {/* Service Title with subtle movement on hover */}
                      <h3
                        className={`relative z-10 text-h4 font-semibold text-text-primary mb-3 group-hover:text-orange transition-all duration-300 group-hover:translate-y-[-2px] ${
                          isRTL ? 'text-right' : 'text-left'
                        }`}
                      >
                        {service.title}
                      </h3>

                      {/* Excerpt */}
                      {service.excerpt && (
                        <p
                          className={`relative z-10 text-body-sm text-text-secondary mb-6 leading-relaxed ${
                            isRTL ? 'text-right' : 'text-left'
                          }`}
                        >
                          {service.excerpt}
                        </p>
                      )}

                      {/* CTA Link */}
                      <div className="relative z-10">
                        <a
                          href={`/#contact?service=${service.slug}`}
                          className="block w-full text-center py-3 px-6 rounded-lg bg-orange/10 border border-orange/30 text-orange font-medium hover:bg-orange hover:text-white transition-all duration-200"
                        >
                          {isRTL ? 'شروع این نوع پروژه' : 'Start this type of project'}
                        </a>
                      </div>

                      {/* Depth shadow on hover */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          boxShadow: '0 20px 60px -15px rgba(255, 106, 61, 0.3), 0 0 0 1px rgba(255, 106, 61, 0.1)',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

