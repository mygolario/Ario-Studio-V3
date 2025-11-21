'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/Button'
import { trackEvent } from '@/lib/analytics/trackEvent'
import { Film, Brain, Palette, Zap } from 'lucide-react'

/**
 * Hero Section - Minimal Cinematic Hybrid
 * 
 * Apple-inspired minimal design with subtle cinematic touches.
 * Soft peach glow, mesh-blur, and abstract AI-style elements.
 */
export default function HeroTimeline() {
  const t = useTranslation()
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const sectionRef = useRef<HTMLElement>(null)

  // Feature panels content
  const featurePanels = useMemo(
    () =>
      isRTL
        ? [
            {
              id: 'cinematic',
              icon: Film,
              title: 'وب‌سایت‌های سینمایی',
              description: 'تجربه‌های وب که مثل فیلم هستند. انیمیشن‌های روان و روایت بصری.',
            },
            {
              id: 'ai',
              icon: Brain,
              title: 'هوش مصنوعی در وب',
              description: 'ادغام هوش مصنوعی در تجربه کاربری. چت‌بات‌ها و اتوماسیون‌های هوشمند.',
            },
            {
              id: 'brand',
              icon: Palette,
              title: 'طراحی برند',
              description: 'هویت بصری مدرن و منسجم. طراحی که برند شما را به زندگی می‌آورد.',
            },
            {
              id: 'digital',
              icon: Zap,
              title: 'تجربه دیجیتال مدرن',
              description: 'رابط‌های کاربری پیشرفته و تجربه‌های دیجیتالی تأثیرگذار.',
            },
          ]
        : [
            {
              id: 'cinematic',
              icon: Film,
              title: 'Cinematic Websites',
              description: 'Web experiences that feel like films. Smooth animations and visual storytelling.',
            },
            {
              id: 'ai',
              icon: Brain,
              title: 'AI in the Web',
              description: 'Integrating AI into user experiences. Chatbots and intelligent automations.',
            },
            {
              id: 'brand',
              icon: Palette,
              title: 'Brand Design',
              description: 'Modern and cohesive visual identity. Design that brings your brand to life.',
            },
            {
              id: 'digital',
              icon: Zap,
              title: 'Modern Digital Experience',
              description: 'Advanced user interfaces and captivating digital experiences.',
            },
          ],
    [isRTL]
  )

  // Hero content
  const heroContent = isRTL
    ? {
        title: 'وب‌سایت‌های سینمایی و هوشمند برای برندهای مدرن',
        subtitle: 'ما تجربه‌های وب می‌سازیم که با ظرافت اپل و انرژی سینمایی ترکیب شده‌اند.',
        cta: 'شروع پروژه',
        ctaLink: '/start-project',
      }
    : {
        title: 'Cinematic and intelligent websites for modern brands',
        subtitle: 'We build web experiences that blend Apple elegance with cinematic energy.',
        cta: 'Start a Project',
        ctaLink: '/en/start-project',
      }

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      if (!section) return

      const ctx = gsap.context(() => {
        // Hero header fade-in
        const header = section.querySelector('[data-hero-header]')
        if (header) {
          gsap.fromTo(
            header,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
            }
          )
        }

        // Subtitle fade + slide-up with delay
        const subtitle = section.querySelector('[data-hero-subtitle]')
        if (subtitle) {
          gsap.fromTo(
            subtitle,
            {
              opacity: 0,
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: 0.1,
            }
          )
        }

        // Feature panels staggered entrance
        const panels = section.querySelectorAll('[data-feature-panel]')
        panels.forEach((panel, index) => {
          gsap.fromTo(
            panel,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.2 + index * 0.1,
              scrollTrigger: {
                trigger: panel,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )
        })
      }, section)

      return () => ctx.revert()
    }

    loadGSAP().catch(console.error)
  }, [featurePanels.length])

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white overflow-hidden ${isRTL ? 'rtl' : ''}`}
    >
      {/* Soft peach radial glow behind headline */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 140, 107, 0.08) 0%, transparent 70%)',
          opacity: 0.6,
        }}
      />

      {/* Optional soft mesh-blur peach layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 140, 107, 0.06) 0%, transparent 50%)',
          opacity: 0.7,
        }}
      />

      {/* Abstract AI-style line in corner */}
      <div
        className={`absolute ${isRTL ? 'left-8 top-20' : 'right-8 top-20'} w-32 h-px pointer-events-none`}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 140, 107, 0.15), transparent)',
          transform: isRTL ? 'rotate(-15deg)' : 'rotate(15deg)',
          opacity: 0.3,
        }}
      />

      <div className="container-custom py-32 sm:py-40 lg:py-48 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div
            data-hero-header
            className={`text-center mb-32 lg:mb-48 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-10 leading-tight tracking-tight ${
                isRTL ? 'rtl:!leading-[1.2] font-vazir' : ''
              }`}
            >
              {heroContent.title}
            </h1>
            <p
              data-hero-subtitle
              className="text-lg sm:text-xl text-[#6b6b6b] max-w-3xl mx-auto leading-relaxed"
            >
              {heroContent.subtitle}
            </p>
          </div>

          {/* Feature Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {featurePanels.map((panel) => {
              const Icon = panel.icon
              return (
                <div
                  key={panel.id}
                  data-feature-panel
                  className="group relative bg-white border border-[#eeeeee] rounded-2xl p-8 lg:p-10 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-orange/30 hover:-translate-y-1"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  {/* Icon - Minimal abstract AI-style */}
                  <div className="mb-8">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-orange" strokeWidth={1} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
                    {panel.title}
                  </h3>

                  {/* Description - 1-2 lines */}
                  <p className="text-base text-gray-600 leading-relaxed">
                    {panel.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-24 lg:mt-32">
            <Button
              href={heroContent.ctaLink}
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
              {heroContent.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
