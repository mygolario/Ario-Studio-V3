'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { processSteps } from '@/content/processSteps'
import { Search, Palette, Code, Sparkles, Zap } from 'lucide-react'

interface ProcessTimelineProps {
  processSteps?: any[]
}

/**
 * Process Section - Apple Feature Rows Style + Ario Cinematic Timeline
 * 
 * Clean, minimal rows with a subtle vertical peach timeline line
 * that fills as user scrolls through the section.
 */
export default function ProcessTimeline({ processSteps: dbSteps = [] }: ProcessTimelineProps) {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const currentLang = language as 'fa' | 'en'
  const sectionRef = useRef<HTMLElement>(null)
  const timelineLineRef = useRef<HTMLDivElement>(null)

  // Process step icons
  const stepIcons = [Search, Palette, Code, Sparkles, Zap]

  // Use database steps if provided, otherwise fallback to centralized config
  const steps: Array<{
    id: number | string
    title: string
    shortDescription: string
    fullDescription: string
  }> = (dbSteps.length > 0 ? dbSteps : processSteps).map((step: any, index: number) => {
    const isDbStep = dbSteps.length > 0
    const title = isDbStep ? step.title : step.title[currentLang]
    const description = isDbStep ? step.description : step.description[currentLang]
    const id = isDbStep ? step.id : step.id

    // Split description into short and full
    const shortDesc = description.split('.')[0] + '.'
    const fullDesc = description

    return {
      id,
      title,
      shortDescription: shortDesc,
      fullDescription: fullDesc,
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

  // GSAP animations with timeline line fill
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !timelineLineRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const timelineLine = timelineLineRef.current
      if (!section || !timelineLine) return

      const ctx = gsap.context(() => {
        // Animate header
        const header = section.querySelector('[data-process-header]')
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

        // Animate rows with fade + slide-up
        const rows = section.querySelectorAll('[data-process-row]')
        rows.forEach((row, index) => {
          gsap.fromTo(
            row,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: index * 0.1,
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )

          // Subtle icon float animation on hover
          const icon = row.querySelector('[data-process-icon]')
          if (icon) {
            const iconElement = icon as HTMLElement
            iconElement.addEventListener('mouseenter', () => {
              gsap.to(iconElement, {
                y: -2,
                duration: 0.3,
                ease: 'power2.out',
              })
            })
            iconElement.addEventListener('mouseleave', () => {
              gsap.to(iconElement, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
              })
            })
          }
        })

        // Timeline line fill animation on scroll
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            gsap.set(timelineLine, {
              scaleY: progress,
              transformOrigin: 'top',
            })
          },
        })
      }, section)

      return () => ctx.revert()
    }

    loadGSAP().catch(console.error)
  }, [steps.length])

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`relative bg-white overflow-hidden ${isRTL ? 'rtl' : ''}`}
    >
      <div className="container-custom py-32 sm:py-40 lg:py-48 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto relative">
          {/* Cinematic Timeline Line - Vertical peach line on left */}
          <div
            className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-px hidden xl:block`}
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 140, 107, 0.12), rgba(255, 140, 107, 0.12))',
              opacity: 0.15,
            }}
          >
            {/* Filling line */}
            <div
              ref={timelineLineRef}
              className="absolute top-0 left-0 w-full h-full origin-top"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 140, 107, 0.3), rgba(255, 140, 107, 0.3))',
                transform: 'scaleY(0)',
                opacity: 0.18,
              }}
            />
          </div>

          {/* Section Header */}
          <div
            data-process-header
            className={`text-center mb-32 lg:mb-48 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              {sectionHeader.title}
            </h2>
            <p className="text-lg sm:text-xl text-[#6b6b6b] max-w-3xl mx-auto leading-relaxed">
              {sectionHeader.subtitle}
            </p>
          </div>

          {/* Process Rows */}
          <div className="space-y-0">
            {steps.map((step, index) => {
              const Icon = stepIcons[index] || Search
              const isLast = index === steps.length - 1

              return (
                <div key={step.id}>
                  <div
                    data-process-row
                    className={`grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-16 py-20 lg:py-24 group ${
                      isRTL ? 'xl:rtl:grid-cols-12' : ''
                    }`}
                  >
                    {/* Left Column - Title & Icon */}
                    <div className={`xl:col-span-5 ${isRTL ? 'xl:rtl:col-span-5' : ''}`}>
                      <div className="flex items-start gap-4">
                        {/* Icon - Minimal, thin stroke */}
                        <div className="flex-shrink-0 mt-1">
                          <div
                            data-process-icon
                            className="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:shadow-sm"
                          >
                            <Icon className="w-5 h-5 text-orange" strokeWidth={1} />
                          </div>
                        </div>

                        {/* Title */}
                        <div className="flex-1">
                          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                            {step.title}
                          </h3>
                          <p className="text-base text-[#6b6b6b] leading-relaxed">
                            {step.shortDescription}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Full Description */}
                    <div className={`xl:col-span-7 ${isRTL ? 'xl:rtl:col-span-7' : ''}`}>
                      <p className="text-base lg:text-lg text-[#8a8a8a] leading-relaxed">
                        {step.fullDescription}
                      </p>
                    </div>
                  </div>

                  {/* Divider Line (Apple style) */}
                  {!isLast && (
                    <div
                      className="h-px"
                      style={{ backgroundColor: '#eaeaea' }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
