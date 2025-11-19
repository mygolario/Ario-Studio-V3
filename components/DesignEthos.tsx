'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { animateSectionReveal } from '@/lib/gsapClient'
import { useTranslation } from '@/lib/useTranslation'
import { ProcessStep } from '@prisma/client'

interface DesignEthosProps {
  processSteps?: ProcessStep[]
}

export default function DesignEthos({ processSteps: dbSteps = [] }: DesignEthosProps) {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      animateSectionReveal(sectionRef, {
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      }).catch(() => {
        if (sectionRef.current) {
          sectionRef.current.style.opacity = '1'
          sectionRef.current.style.transform = 'translateY(0)'
        }
      })
    }
  }, [])

  // Handle connector line fill on hover (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) return

    const stepCards = document.querySelectorAll('[data-step-index]')
    const connector = document.getElementById('process-connector')

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const index = parseInt(target.getAttribute('data-step-index') || '0')
      if (connector) {
        const width = ((index + 1) / stepCards.length) * 100
        connector.style.width = `${width}%`
      }
    }

    const handleMouseLeave = () => {
      if (connector) {
        connector.style.width = '0%'
      }
    }

    stepCards.forEach((card) => {
      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      stepCards.forEach((card) => {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // Use database process steps if available, otherwise fallback to translations
  // Database steps allow admins to customize the process, while translations provide
  // localized fallback when no database steps are configured
  const processSteps = dbSteps.length > 0
    ? dbSteps.map((step, index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: step.title,
        description: step.description,
      }))
    : t.process.steps

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-base"
    >
      {/* Subtle background enhancement */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-orange/5 opacity-20 pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16" data-animate-child>
            <div className="mb-6">
              {/* Section Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'power3.out' }}
                className="mb-4"
              >
                <span className="text-label text-orange uppercase tracking-wider font-medium">
                  {t.process.label}
                </span>
              </motion.div>
              <h2 className="text-h1 font-semibold text-text-primary mb-4">
                {t.process.title}
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {t.process.subtitle}
            </p>
          </div>

          {/* Process Steps */}
          <div>
                
            {/* Desktop: Horizontal Stepper */}
            <div className="hidden xl:block">
              <div className="relative">
                {/* Connector Line */}
                <div className="absolute top-12 left-0 right-0 h-0.5 bg-border-subtle" />
                <motion.div
                  className="absolute top-12 left-0 h-0.5 bg-gradient-to-r from-orange via-orange-light to-orange transition-all duration-500"
                  style={{ width: '0%' }}
                  id="process-connector"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(255, 106, 61, 0)',
                      '0 0 8px rgba(255, 106, 61, 0.3)',
                      '0 0 0px rgba(255, 106, 61, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 relative">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      data-animate-child
                      data-step-index={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        ease: 'power3.out',
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                      }}
                      className="group relative"
                    >
                      <div className="bg-surface border border-border-subtle rounded-xl p-6 hover:shadow-card-hover hover:border-orange/50 transition-all duration-300 cursor-pointer relative overflow-hidden">
                        {/* Subtle inner glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange/0 via-orange/0 to-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
                        
                        <div className="relative z-10">
                          {/* Step Number */}
                          <div className="w-12 h-12 rounded-lg bg-orange/10 border border-orange/20 flex items-center justify-center mb-4 group-hover:bg-orange/20 group-hover:border-orange group-hover:scale-105 transition-all duration-300">
                            <span className="text-orange font-semibold text-lg">{step.number}</span>
                          </div>
                          <h4 className="text-h5 font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors duration-300">
                            {step.title}
                          </h4>
                          <p className="text-body-sm text-text-secondary leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile/Tablet: Vertical Timeline */}
            <div className="xl:hidden space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  data-animate-child
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: 'power3.out',
                    delay: index * 0.1,
                  }}
                  className="group relative pl-6 sm:pl-8"
                >
                  {/* Timeline Line */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-2 sm:left-3 top-12 bottom-0 w-0.5 bg-border-subtle" />
                  )}
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-3 w-6 h-6 rounded-full bg-orange/10 border-2 border-orange/30 flex items-center justify-center group-hover:bg-orange/20 group-hover:border-orange group-hover:scale-110 transition-all duration-300">
                    <span className="text-orange text-xs font-semibold">{step.number}</span>
                  </div>
                  
                  <div className="bg-surface border border-border-subtle rounded-xl p-4 sm:p-6 hover:shadow-card hover:-translate-y-1 hover:border-orange/50 transition-all duration-300">
                    <h4 className="text-h5 font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-body-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
