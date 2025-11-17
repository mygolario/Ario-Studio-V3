'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, Clock, Code2, Sparkles, Users } from 'lucide-react'
import { animateSectionReveal } from '@/lib/gsapClient'
import { Copy } from '@/content/copy'

/**
 * Trust & Guarantees Section
 * 
 * Communicates reliability and professionalism.
 * 
 * To add/modify trust items:
 * - Edit the `trustItems` array below
 * - Each item needs: icon, title, description
 * - Icons available from lucide-react
 */
export default function TrustGuarantees() {
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

  const iconMap: Record<string, typeof Clock> = {
    'Clear timelines & communication': Clock,
    'Production-grade engineering': Code2,
    'Cinematic UX & motion systems': Sparkles,
    'AI-native architecture': CheckCircle2,
    'Founder-friendly execution': Users,
  }

  const trustItems = Copy.trust.items.map((item) => ({
    ...item,
    icon: iconMap[item.title] || CheckCircle2,
  }))

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="relative py-32 overflow-hidden bg-base"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <h2 className="text-h1 font-semibold text-text-primary mb-4">
                {Copy.trust.title}
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {Copy.trust.subtitle}
            </p>
          </div>

          {/* Trust Items Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {trustItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  data-animate-child
                  className="group bg-surface border border-border-subtle rounded-xl p-6 hover:shadow-card hover:-translate-y-1 hover:border-orange/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-border-subtle flex items-center justify-center bg-orange/5 group-hover:border-orange group-hover:bg-orange/10 transition-all duration-200">
                      <Icon size={24} className="text-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-h5 font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-body text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

