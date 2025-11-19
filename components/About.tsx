'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { animateSectionReveal } from '@/lib/gsapClient'
import { useTranslation } from '@/lib/useTranslation'
import { Highlight } from '@prisma/client'

interface AboutProps {
  highlights?: Highlight[]
}

export default function About({ highlights: dbHighlights = [] }: AboutProps) {
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-surface-alt"
    >
      {/* Enhanced background with soft neon gradients */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange/5 to-transparent opacity-30 pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
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
                  {t.about.label}
                </span>
              </motion.div>
              <h2 className="text-h1 font-semibold text-text-primary mb-4">
                {t.about.title}
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'power3.out', delay: 0.2 }}
              className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
            >
              {t.about.subtitle}
            </motion.p>
          </div>

          {/* Principles Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'power3.out', delay: 0.4 }}
            className="bg-surface border border-border-subtle rounded-xl p-8 md:p-12"
          >
            <h3 className="text-h4 font-semibold text-text-primary mb-6">
              {t.about.subSectionTitle}
            </h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {(dbHighlights.length > 0
                ? dbHighlights.map((h) => h.title)
                : t.about.principles
              ).map((principle, index) => (
                <motion.li
                  key={principle}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: 'power3.out',
                    delay: 0.5 + (index * 0.1),
                  }}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle2 
                    size={20} 
                    className="text-orange flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" 
                  />
                  <span className="text-body text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                    {principle}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
