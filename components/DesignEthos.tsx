'use client'

import { useEffect, useRef } from 'react'
import { Target, Code, Eye } from 'lucide-react'
import { animateSectionReveal } from '@/lib/gsapClient'
import { Copy } from '@/content/copy'

export default function DesignEthos() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      animateSectionReveal(sectionRef, {
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
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

  const processSteps = Copy.process.steps

  const iconMap = {
    'Strategy-led approach': Target,
    'Clean, structured engineering': Code,
    'Detail-oriented design': Eye,
  }

  const features = Copy.process.features.map((feature) => ({
    ...feature,
    icon: iconMap[feature.title as keyof typeof iconMap] || Target,
  }))

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-32 overflow-hidden bg-base"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <div>
                <h2 className="text-h1 font-semibold text-text-primary mb-4">
                  {Copy.process.title}
                </h2>
                {/* Section accent line */}
                <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full" />
              </div>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                {Copy.process.subtitle}
              </p>
            </div>

            {/* RIGHT COLUMN - Process Journey & Feature Cards */}
            <div className="space-y-12">
              {/* Process Visual Journey */}
              <div>
                <h3 className="text-h4 font-semibold text-text-primary mb-8">
                  {Copy.process.journeyTitle}
                </h3>
                
                {/* Desktop: Horizontal Stepper */}
                <div className="hidden lg:block">
                  <div className="relative">
                    {/* Connector Line */}
                    <div className="absolute top-12 left-0 right-0 h-0.5 bg-border-subtle" />
                    <div className="absolute top-12 left-0 h-0.5 bg-gradient-to-r from-orange to-orange-light transition-all duration-500" 
                         style={{ width: '0%' }} 
                         id="process-connector" />
                    
                    {/* Steps */}
                    <div className="grid grid-cols-4 gap-4 relative">
                      {processSteps.map((step, index) => (
                        <div
                          key={step.number}
                          data-animate-child
                          data-step-index={index}
                          className="group relative"
                        >
                          <div className="bg-surface border border-border-subtle rounded-xl p-6 hover:shadow-card hover:-translate-y-1 hover:border-orange/30 transition-all duration-200 cursor-pointer">
                            {/* Step Number */}
                            <div className="w-12 h-12 rounded-lg bg-orange/10 border border-orange/20 flex items-center justify-center mb-4 group-hover:bg-orange/20 group-hover:border-orange group-hover:scale-105 transition-all duration-200">
                              <span className="text-orange font-semibold text-lg">{step.number}</span>
                            </div>
                            <h4 className="text-h5 font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors duration-200">
                              {step.title}
                            </h4>
                            <p className="text-body-sm text-text-secondary">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile: Vertical Timeline */}
                <div className="lg:hidden space-y-6">
                  {processSteps.map((step, index) => (
                    <div
                      key={step.number}
                      data-animate-child
                      className="group relative pl-8"
                    >
                      {/* Timeline Line */}
                      {index < processSteps.length - 1 && (
                        <div className="absolute left-3 top-12 bottom-0 w-0.5 bg-border-subtle" />
                      )}
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-3 w-6 h-6 rounded-full bg-orange/10 border-2 border-orange/30 flex items-center justify-center group-hover:bg-orange/20 group-hover:border-orange group-hover:scale-110 transition-all duration-200">
                        <span className="text-orange text-xs font-semibold">{step.number}</span>
                      </div>
                      
                      <div className="bg-surface border border-border-subtle rounded-xl p-6 hover:shadow-card hover:-translate-y-1 hover:border-orange/30 transition-all duration-200">
                        <h4 className="text-h5 font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors duration-200">
                          {step.title}
                        </h4>
                        <p className="text-body-sm text-text-secondary">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Cards */}
              <div>
                <h3 className="text-h4 font-semibold text-text-primary mb-6">
                  {Copy.process.approachTitle}
                </h3>
                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <div
                        key={feature.title}
                        data-animate-child
                        className="group bg-surface border border-border-subtle rounded-2xl p-6 hover:shadow-card hover:-translate-y-2 hover:border-orange/30 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-border-subtle flex items-center justify-center group-hover:border-orange transition-colors">
                            <Icon size={24} className="text-text-secondary group-hover:text-orange transition-colors" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-h5 font-semibold text-text-primary mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-body text-text-secondary">
                              {feature.description}
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
        </div>
      </div>
    </section>
  )
}
