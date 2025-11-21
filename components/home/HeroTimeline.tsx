'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/Button'
import { trackEvent } from '@/lib/analytics/trackEvent'
import { Film, Brain, Palette, Zap } from 'lucide-react'

/**
 * Hero Section - Apple Style
 * 
 * Minimal, clean hero with feature panels in Apple product style.
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
        subtitle: 'ما تجربه‌های وب می‌سازیم که ترکیبی از طراحی مینیمال، هوشمندی و کیفیت سینمایی هستند.',
        cta: 'شروع پروژه',
        ctaLink: '/start-project',
      }
    : {
        title: 'Cinematic and intelligent websites for modern brands',
        subtitle: 'We build web experiences that combine minimal design, intelligence, and cinematic quality.',
        cta: 'Start a Project',
        ctaLink: '/en/start-project',
      }

  // Subtle fade + slide up animation
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
            delay: index * 0.05,
            scrollTrigger: {
              trigger: panel,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      })

      // Animate header
      const header = section.querySelector('[data-hero-header]')
      if (header) {
        gsap.fromTo(
          header,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
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
  }, [featurePanels.length])

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white overflow-hidden ${isRTL ? 'rtl' : ''}`}
    >
      <div className="container-custom py-24 sm:py-32 lg:py-40 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div
            data-hero-header
            className={`text-center mb-24 lg:mb-40 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight ${
                isRTL ? 'rtl:!leading-[1.2]' : ''
              }`}
            >
              {heroContent.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {heroContent.subtitle}
            </p>
          </div>

          {/* Feature Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {featurePanels.map((panel) => {
              const Icon = panel.icon
              return (
                <div
                  key={panel.id}
                  data-feature-panel
                  className="group relative bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm hover:border-orange/20"
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-orange" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
                    {panel.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-600 leading-relaxed">
                    {panel.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-20 lg:mt-32">
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
