'use client'

import { useEffect, useRef } from 'react'
import { Target, Code, Eye } from 'lucide-react'
import { animateSectionReveal } from '@/lib/gsapClient'

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

  const features = [
    {
      icon: Target,
      title: 'Strategy-led approach',
      description: 'Every decision is informed by clear objectives and measurable outcomes.',
    },
    {
      icon: Code,
      title: 'Clean, structured engineering',
      description: 'Scalable architecture built with precision and maintainability in mind.',
    },
    {
      icon: Eye,
      title: 'Detail-oriented design',
      description: 'Thoughtful execution that elevates both form and function.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-32 overflow-hidden bg-pure-white dark:bg-slate-900"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <div>
                <h2 className="text-h1 font-semibold text-text-primary dark:text-slate-100 mb-4">
                  Our Philosophy
                </h2>
                {/* Section accent line */}
                <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full" />
              </div>
              <p className="text-body-lg text-text-secondary dark:text-slate-300 leading-relaxed">
                We focus on clarity, precision and thoughtful execution.  
                Everything we create is structured, scalable and purpose-driven.
              </p>
            </div>

            {/* RIGHT COLUMN - Feature Cards */}
            <div className="space-y-6">
              {/* 3-Step Process Visual Row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Discover', icon: '1' },
                  { label: 'Design', icon: '2' },
                  { label: 'Build & Automate', icon: '3' },
                ].map((step, index) => (
                  <div
                    key={step.label}
                    className="group relative bg-pure-white dark:bg-slate-800 border border-border-subtle dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-card dark:hover:shadow-lg dark:hover:shadow-black/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange/10 dark:bg-orange/20 border border-orange/20 dark:border-orange/30 flex items-center justify-center mx-auto mb-2 group-hover:bg-orange/20 dark:group-hover:bg-orange/30 transition-colors">
                      <span className="text-orange font-semibold text-sm">{step.icon}</span>
                    </div>
                    <p className="text-body-sm font-medium text-text-primary dark:text-slate-100">{step.label}</p>
                  </div>
                ))}
              </div>
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    data-animate-child
                    className="group bg-pure-white dark:bg-slate-800 border border-border-subtle dark:border-slate-700 rounded-2xl p-6 hover:shadow-card dark:hover:shadow-lg dark:hover:shadow-black/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-gray-200 dark:border-slate-600 flex items-center justify-center group-hover:border-orange transition-colors">
                        <Icon size={24} className="text-text-secondary dark:text-slate-300 group-hover:text-orange transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-h5 font-semibold text-text-primary dark:text-slate-100 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-body text-text-secondary dark:text-slate-300">
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
    </section>
  )
}
