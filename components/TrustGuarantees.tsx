'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, Clock, Code2, Sparkles } from 'lucide-react'
import { animateSectionReveal } from '@/lib/gsapClient'

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

  const trustItems = [
    {
      icon: Clock,
      title: 'Clear timelines & communication',
      description: 'Structured workflow with regular updates and transparent milestones.',
    },
    {
      icon: Code2,
      title: 'Production-ready architecture',
      description: 'Next.js engineering standards built for scale and long-term maintenance.',
    },
    {
      icon: Sparkles,
      title: 'Cinematic UX & motion-first design',
      description: 'Experiences that feel alive, with thoughtful animations and interactions.',
    },
    {
      icon: CheckCircle2,
      title: 'AI-native workflows in mind',
      description: 'Built with automation and intelligent systems as core considerations.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="relative py-32 overflow-hidden bg-pure-white dark:bg-slate-900"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <h2 className="text-h1 font-semibold text-text-primary dark:text-slate-100 mb-4">
                Why teams work with us
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Built for real projects. Clear processes, reliable delivery, and long-term value.
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
                  className="group bg-pure-white dark:bg-slate-800 border border-border-subtle dark:border-slate-700 rounded-xl p-6 hover:shadow-card dark:hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-1 hover:border-orange/30 dark:hover:border-orange/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-gray-200 dark:border-slate-600 flex items-center justify-center bg-orange/5 dark:bg-orange/10 group-hover:border-orange group-hover:bg-orange/10 dark:group-hover:bg-orange/20 transition-all duration-200">
                      <Icon size={24} className="text-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-h5 font-semibold text-text-primary dark:text-slate-100 mb-2 group-hover:text-orange transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-body text-text-secondary dark:text-slate-300">
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

