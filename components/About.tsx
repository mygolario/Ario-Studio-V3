'use client'

import { useEffect, useRef } from 'react'
import { Award, Users, Workflow, TrendingUp } from 'lucide-react'
import { animateSectionReveal } from '@/lib/gsapClient'
import { Copy } from '@/content/copy'

export default function About() {
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
  const iconMap: Record<string, typeof Award> = {
    'High-quality engineering standards': Award,
    '8+ years combined experience': Users,
    'Structured, efficient workflow': Workflow,
    'Long-term, scalable solutions': TrendingUp,
  }

  const stats = Copy.about.stats.map((stat) => ({
    ...stat,
    icon: iconMap[stat.title] || Award,
  }))

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 overflow-hidden bg-surface-alt"
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <h2 className="text-h1 font-semibold text-text-primary mb-4">
                {Copy.about.title}
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {Copy.about.subtitle}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.title}
                  data-animate-child
                  className="text-center relative group"
                >
                  {/* Subtle UI element - floating pill */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-orange/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 rounded-xl border border-border-subtle flex items-center justify-center mx-auto mb-4 bg-surface shadow-soft group-hover:shadow-card group-hover:-translate-y-1 group-hover:border-orange group-hover:scale-105 transition-all duration-200">
                    <Icon size={28} className="text-text-secondary group-hover:text-orange transition-colors duration-200" />
                  </div>
                  <h3 className="text-h5 font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors duration-200">
                    {stat.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                    {stat.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
