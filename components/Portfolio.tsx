'use client'

import { useEffect, useRef } from 'react'
import { animateSectionReveal } from '@/lib/gsapClient'
import { type SupportedLang } from '@/lib/i18n'
import PortfolioCard from './portfolio/PortfolioCard'
import { portfolioSamples } from '@/content/portfolioSamples'

interface PortfolioProps {
  lang?: SupportedLang
}

/**
 * Portfolio Section Component
 * 
 * Displays a grid of portfolio items (case studies) with bilingual support.
 * Uses PortfolioCard component for each item.
 */
export default function Portfolio({ lang }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Use lang from props or default to 'fa'
  const currentLang: SupportedLang = lang || 'fa'
  
  // UI texts (bilingual)
  const uiTexts = currentLang === 'fa' 
    ? {
        title: 'کارهای ما',
        subtitle: 'چند نمونه از تیپ پروژه‌هایی که برای کسب‌وکارها طراحی و اجرا می‌کنیم.',
        cta: 'مشاهده همه پروژه‌ها',
      }
    : {
        title: 'Selected work',
        subtitle: 'A few example project types we design and build for our clients.',
        cta: 'View all projects',
      }

  useEffect(() => {
    if (sectionRef.current) {
      animateSectionReveal(sectionRef, {
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      }).catch(() => {
        // Fallback: show section immediately if GSAP fails
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
      id="portfolio"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-surface-alt"
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
              <h2 className={`text-h1 font-semibold text-text-primary mb-4 ${currentLang === 'fa' ? 'rtl:text-right' : ''}`}>
                {uiTexts.title}
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className={`text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed ${currentLang === 'fa' ? 'rtl:text-right' : ''}`}>
              {uiTexts.subtitle}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioSamples.map((item) => (
              <div key={item.id} data-animate-child>
                <PortfolioCard lang={currentLang} item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
