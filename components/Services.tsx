'use client'

import { useEffect, useRef } from 'react'
import { Palette, Code, Zap } from 'lucide-react'
import { animateSectionReveal } from '@/lib/gsapClient'

export default function Services() {
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
  const serviceGroups = [
    {
      id: 'ai-native-product-websites',
      icon: Palette,
      title: 'AI-Native Product Websites',
      description: 'Full-stack experiences with AI at the core',
      items: [
        'Cinematic marketing sites',
        'Agent-integrated product pages',
        'Launch-ready frontends',
      ],
    },
    {
      id: 'mvps-dashboards',
      icon: Code,
      title: 'MVPs & Dashboards',
      description: 'Fast validation and internal tools',
      items: [
        'Early-stage MVP & landing pages',
        'Agent-ready internal dashboards',
        'Fast validation builds',
      ],
    },
    {
      id: 'long-term-design-systems',
      icon: Zap,
      title: 'Long-term Design Systems',
      description: 'Ongoing design partnerships',
      items: [
        'UI/UX systems & motion direction',
        'Ongoing design partnerships',
        'Strategic design support',
      ],
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 overflow-hidden bg-base"
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <h2 className="text-h1 font-semibold text-text-primary mb-4">
                Our Services
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Comprehensive solutions from design to deployment, built for long-term success.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {serviceGroups.map((group, index) => {
              const Icon = group.icon
              return (
                <div
                  key={group.title}
                  id={group.id}
                  data-animate-child
                  className="group bg-surface border border-border-subtle rounded-xl p-8 hover:shadow-card hover:-translate-y-1 hover:border-orange/30 transition-all duration-200 cursor-pointer scroll-mt-24"
                >
                  <div className="w-14 h-14 rounded-xl border border-border-subtle flex items-center justify-center mb-6 group-hover:border-orange transition-colors">
                    <Icon size={28} className="text-text-secondary group-hover:text-orange transition-colors" />
                  </div>
                  <h3 className="text-h4 font-semibold text-text-primary mb-2">
                    {group.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary mb-6">
                    {group.description}
                  </p>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 group/item">
                        <span className="text-orange mt-1.5 group-hover/item:scale-110 transition-transform duration-200">•</span>
                        <span className="text-body text-text-secondary group-hover/item:text-text-primary transition-colors duration-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
