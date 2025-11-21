'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/Button'
import { trackEvent } from '@/lib/analytics/trackEvent'

/**
 * Hero Timeline Component
 * 
 * Cinematic scroll-driven timeline with 4 steps:
 * 1. Cinematic Websites
 * 2. AI in the Web
 * 3. Brand Design
 * 4. Modern Digital Experience
 */
export default function HeroTimeline() {
  const t = useTranslation()
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  // Timeline steps content
  const steps = useMemo(
    () =>
      isRTL
        ? [
            {
              id: 'cinematic',
              title: 'وب‌سایت‌های سینمایی',
              description: 'تجربه‌های وب که مثل فیلم هستند. انیمیشن‌های روان، روایت بصری و تعاملات سینمایی.',
            },
            {
              id: 'ai',
              title: 'هوش مصنوعی در وب',
              description: 'ادغام هوش مصنوعی در تجربه کاربری. چت‌بات‌ها، اتوماسیون‌ها و عامل‌های هوشمند.',
            },
            {
              id: 'brand',
              title: 'طراحی برند',
              description: 'هویت بصری مدرن و منسجم. طراحی که برند شما را به زندگی می‌آورد.',
            },
            {
              id: 'digital',
              title: 'تجربه دیجیتال مدرن',
              description: 'رابط‌های کاربری پیشرفته، عملکرد بالا و تجربه‌های دیجیتالی که کاربران را تحت تأثیر قرار می‌دهند.',
            },
          ]
        : [
            {
              id: 'cinematic',
              title: 'Cinematic Websites',
              description: 'Web experiences that feel like films. Smooth animations, visual storytelling, and cinematic interactions.',
            },
            {
              id: 'ai',
              title: 'AI in the Web',
              description: 'Integrating AI into user experiences. Chatbots, automations, and intelligent agents.',
            },
            {
              id: 'brand',
              title: 'Brand Design',
              description: 'Modern and cohesive visual identity. Design that brings your brand to life.',
            },
            {
              id: 'digital',
              title: 'Modern Digital Experience',
              description: 'Advanced user interfaces, high performance, and digital experiences that captivate users.',
            },
          ],
    [isRTL]
  )

  // Hero content
  const heroContent = isRTL
    ? {
        title: 'وب‌سایت‌های سینمایی و هوشمند برای برندهای مدرن.',
        subtitle: 'آریو استودیو تجربه‌های وب را با سینما، هوش مصنوعی و طراحی مدرن می‌سازد.',
        cta: 'شروع پروژه',
        ctaLink: '/start-project',
      }
    : {
        title: 'Cinematic and intelligent websites for modern brands.',
        subtitle: 'Ario Studio builds web experiences that blend cinematic storytelling, AI, and modern branding.',
        cta: 'Start a Project',
        ctaLink: '/en/start-project',
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

      // Pin the timeline section
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Animate each step
      steps.forEach((step, index) => {
        const stepElement = timeline.querySelector(`[data-step="${step.id}"]`)
        const stepNode = timeline.querySelector(`[data-node="${step.id}"]`)
        const stepContent = timeline.querySelector(`[data-content="${step.id}"]`)

        if (!stepElement || !stepNode || !stepContent) return

        // Calculate progress points
        const startProgress = index / steps.length
        const endProgress = (index + 1) / steps.length
        const midProgress = (startProgress + endProgress) / 2

        // Step activation animation
        pinTimeline.to(
          stepElement,
          {
            scale: 1.1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.3,
            ease: 'power2.out',
          },
          startProgress
        )

        // Node glow animation
        pinTimeline.to(
          stepNode,
          {
            scale: 1.2,
            boxShadow: '0 0 30px rgba(255, 106, 61, 0.6)',
            duration: 0.3,
            ease: 'power2.out',
          },
          startProgress
        )

        // Content line-by-line reveal
        const lines = stepContent.querySelectorAll('[data-line]')
        lines.forEach((line, lineIndex) => {
          pinTimeline.fromTo(
            line,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: 'power2.out',
            },
            startProgress + lineIndex * 0.1
          )
        })

        // Deactivate previous steps
        if (index > 0) {
          const prevStep = timeline.querySelector(`[data-step="${steps[index - 1].id}"]`)
          const prevNode = timeline.querySelector(`[data-node="${steps[index - 1].id}"]`)
          if (prevStep && prevNode) {
            pinTimeline.to(
              [prevStep, prevNode],
              {
                scale: 1,
                opacity: 0.3,
                filter: 'blur(4px)',
                boxShadow: '0 0 0px rgba(255, 106, 61, 0)',
                duration: 0.2,
                ease: 'power2.in',
              },
              startProgress
            )
          }
        }
      })

      // Update active step state
      const progressTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const stepIndex = Math.min(Math.floor(progress * steps.length), steps.length - 1)
          setActiveStep(stepIndex)
        },
      })

      return () => {
        // Cleanup ScrollTriggers
        if (pinTimeline) {
          pinTimeline.kill()
        }
        if (progressTrigger) {
          progressTrigger.kill()
        }
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === section) {
            trigger.kill()
          }
        })
      }
    }

    loadGSAP().catch(console.error)
  }, [steps, isRTL, language])

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-base ${isRTL ? 'rtl' : ''}`}
    >
      {/* AI-style Grid Background with Parallax */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 106, 61, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 106, 61, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Radial Orange Glow Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 106, 61, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Title & Subtitle */}
          <div className={`text-center mb-16 ${isRTL ? 'rtl:text-right' : ''}`}>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-hero lg:text-[64px] lg:leading-[72px] font-semibold text-text-primary mb-6 ${
                isRTL ? 'rtl:!leading-[1.5] rtl:md:!leading-[1.5] rtl:!tracking-wide' : ''
              }`}
            >
              {heroContent.title}
            </h1>
            <p className="text-base sm:text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {heroContent.subtitle}
            </p>
          </div>

          {/* Timeline Container */}
          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange/30 to-transparent transform -translate-y-1/2 hidden lg:block" />

            {/* Steps */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 relative">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  data-step={step.id}
                  className={`relative flex flex-col items-center text-center ${
                    activeStep === index ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    opacity: activeStep === index ? 1 : 0.3,
                    filter: activeStep === index ? 'blur(0px)' : 'blur(4px)',
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                  }}
                >
                  {/* Step Node */}
                  <div
                    data-node={step.id}
                    className="relative w-16 h-16 rounded-full bg-orange/20 border-2 border-orange flex items-center justify-center mb-6 transition-all duration-300"
                    style={{
                      transform: activeStep === index ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: activeStep === index
                        ? '0 0 30px rgba(255, 106, 61, 0.6)'
                        : '0 0 0px rgba(255, 106, 61, 0)',
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-orange" />
                  </div>

                  {/* Step Content */}
                  <div data-content={step.id} className="space-y-3">
                    <h3
                      data-line
                      className="text-h5 font-semibold text-text-primary"
                    >
                      {step.title}
                    </h3>
                    <p
                      data-line
                      className="text-body-sm text-text-secondary leading-relaxed"
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-16">
            <Button
              href={heroContent.ctaLink}
              variant="primary"
              onClick={() => {
                trackEvent('cta_click', {
                  location: 'hero_timeline',
                  lang: language,
                  ctaType: 'primary',
                })
              }}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {heroContent.cta}
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isRTL ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                  />
                </svg>
              </span>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

