'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { processSteps } from '@/content/processSteps'
import { 
  Search, 
  Palette, 
  Code, 
  Sparkles, 
  Zap,
  ChevronDown
} from 'lucide-react'

interface ProcessTimelineProps {
  processSteps?: any[]
}

/**
 * Process Timeline Component
 * 
 * Scroll-driven timeline with focus on center card.
 * Steps blur and shrink, then zoom in when active.
 */
export default function ProcessTimeline({ processSteps: dbSteps = [] }: ProcessTimelineProps) {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const currentLang = language as 'fa' | 'en'
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  // Process step icons
  const stepIcons = [Search, Palette, Code, Sparkles, Zap]

  // Use database steps if provided, otherwise fallback to centralized config
  const steps: Array<{
    id: number | string
    number: string
    title: string
    description: string
  }> = (dbSteps.length > 0 ? dbSteps : processSteps).map((step: any, index: number) => {
    const stepNumber = String(index + 1).padStart(2, '0')
    const localizedNumber = isRTL
      ? stepNumber.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])
      : stepNumber

    const isDbStep = dbSteps.length > 0
    const title = isDbStep ? step.title : step.title[currentLang]
    const description = isDbStep ? step.description : step.description[currentLang]
    const id = isDbStep ? step.id : step.id

    return {
      id,
      number: localizedNumber,
      title,
      description,
    }
  })

  // Localized section header
  const sectionHeader = isRTL
    ? {
        title: 'فرآیند ما',
        subtitle: 'مراحل ساخت یک تجربه دیجیتالی حرفه‌ای برای کسب‌وکار شما.',
      }
    : {
        title: 'Our Process',
        subtitle: 'How we design and build high-quality digital experiences.',
      }

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !timelineRef.current) return

    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const timeline = timelineRef.current
      if (!section || !timeline) return

      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      // Mobile: Simple vertical animation
      const isMobile = window.innerWidth < 1024
      if (isMobile) {
        const cards = timeline.querySelectorAll('[data-process-step]')
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
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
        return
      }

      // Desktop: Scroll-driven focus timeline
      const cards = timeline.querySelectorAll('[data-process-step]')
      const totalSteps = cards.length

      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const stepIndex = Math.min(Math.floor(progress * totalSteps), totalSteps - 1)
          setActiveStep(stepIndex)

          cards.forEach((card, index) => {
            const stepElement = card as HTMLElement
            const isActive = index === stepIndex
            const distance = Math.abs(index - stepIndex)

            if (isActive) {
              // Active step: zoom in
              gsap.to(stepElement, {
                scale: 1.1,
                opacity: 1,
                filter: 'blur(0px)',
                zIndex: 10,
                duration: 0.3,
                ease: 'power2.out',
              })
            } else {
              // Inactive steps: blur and shrink
              const blurAmount = Math.min(distance * 2, 8)
              const scaleAmount = 1 - distance * 0.1
              const opacityAmount = 1 - distance * 0.3

              gsap.to(stepElement, {
                scale: Math.max(scaleAmount, 0.7),
                opacity: Math.max(opacityAmount, 0.2),
                filter: `blur(${blurAmount}px)`,
                zIndex: 5 - distance,
                duration: 0.3,
                ease: 'power2.out',
              })
            }
          })
        },
      })
    }

    loadGSAP().catch(console.error)
  }, [isRTL, currentLang, dbSteps.length])

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-base ${isRTL ? 'rtl' : ''}`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-0 right-0 h-px opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(247, 105, 58, 0.6) 20%, rgba(248, 116, 73, 0.6) 50%, rgba(247, 105, 58, 0.6) 80%, transparent 100%)',
            transform: 'translateY(-50%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-20 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <h2 className="text-h1 font-semibold text-text-primary mb-4">
              {sectionHeader.title}
            </h2>
            <p className="text-center max-w-3xl mx-auto mt-4 font-medium text-text-secondary">
              {sectionHeader.subtitle}
            </p>
          </div>

          {/* Process Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Desktop: Horizontal scroll timeline */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-6 relative">
              {steps.map((step, index) => {
                const Icon = stepIcons[index] || Search
                const isActive = activeStep === index

                return (
                  <div
                    key={step.id}
                    data-process-step
                    className={`relative flex flex-col items-center text-center rounded-2xl p-8 backdrop-blur-sm bg-surface/95 border border-border-subtle/50 shadow-lg transition-all duration-500 ${
                      isActive ? 'z-10' : 'z-0'
                    }`}
                    style={{
                      minWidth: isActive ? '280px' : '240px',
                      maxWidth: isActive ? '320px' : '260px',
                    }}
                  >
                    {/* Step Icon */}
                    <div
                      className={`w-16 h-16 rounded-xl bg-orange/10 border border-orange/30 flex items-center justify-center mb-6 transition-all duration-300 ${
                        isActive ? 'bg-orange/20 border-orange/50 scale-110' : ''
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 text-orange transition-all duration-300 ${
                          isActive ? 'scale-110' : ''
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Step Number */}
                    <div className="mb-4">
                      <span
                        className="text-3xl font-black tracking-wider"
                        style={{
                          background: 'linear-gradient(135deg, #F7693A 0%, #F87449 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-h5 font-semibold text-text-primary mb-3 leading-tight">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-body-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full" />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Mobile: Simple vertical stack */}
            <div className="lg:hidden space-y-5">
              {steps.map((step, index) => {
                const Icon = stepIcons[index] || Search

                return (
                  <div
                    key={step.id}
                    data-process-step
                    className="relative rounded-2xl p-6 backdrop-blur-sm bg-surface/95 border border-border-subtle/50 shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Icon */}
                      <div className="w-12 h-12 rounded-xl bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-orange" strokeWidth={1.5} />
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="mb-2">
                          <span
                            className="text-2xl font-black tracking-wider"
                            style={{
                              background: 'linear-gradient(135deg, #F7693A 0%, #F87449 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}
                          >
                            {step.number}
                          </span>
                        </div>
                        <h3 className="text-h5 font-semibold text-text-primary mb-2 leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-body-sm text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

