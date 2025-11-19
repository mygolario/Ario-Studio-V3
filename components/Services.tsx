'use client'

import { useEffect, useRef } from 'react'
import { animateSectionReveal } from '@/lib/gsapClient'
import { type LocalizedContent } from '@/lib/content/types'
import { type SupportedLang } from '@/lib/i18n'
import ServiceCard from './services/ServiceCard'

interface ServicesProps {
  servicesContent?: LocalizedContent[]
  lang?: SupportedLang
}

export default function Services({ servicesContent = [], lang }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Use lang from props or default to 'fa'
  const currentLang: SupportedLang = lang || 'fa'

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
  
  // UI texts (bilingual)
  const uiTexts = currentLang === 'fa' 
    ? {
        title: 'سرویس‌ها',
        subtitle: 'آنچه برای ساخت تجربه‌های وب سینمایی انجام می‌دهیم.',
        emptyState: 'سرویس‌ها به‌زودی اینجا اضافه می‌شوند.',
      }
    : {
        title: 'Services',
        subtitle: 'What we do to craft cinematic, AI-powered web experiences.',
        emptyState: 'Services will be added here soon.',
      }
  
  // Filter only service type content
  const services = servicesContent.filter(item => item.type === 'service')

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 overflow-hidden bg-base"
    >
      {/* Enhanced background with subtle neon accents */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-orange/5 opacity-30 pointer-events-none" />
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 ${currentLang === 'fa' ? 'rtl:text-right' : ''}`} data-animate-child>
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

          {/* Services Grid */}
          {services.length === 0 ? (
            <div className={`text-center py-16 ${currentLang === 'fa' ? 'rtl:text-right' : ''}`}>
              <p className="text-text-secondary">{uiTexts.emptyState}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.slug} data-animate-child>
                  <ServiceCard lang={currentLang} item={service} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
