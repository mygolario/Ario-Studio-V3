'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Palette, Code, Zap } from 'lucide-react'
import { animateSectionReveal } from '@/lib/gsapClient'
import { useTranslation } from '@/lib/useTranslation'
import { Service } from '@prisma/client'

interface ServicesProps {
  services?: Service[]
}

export default function Services({ services = [] }: ServicesProps) {
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
  
  const serviceIcons = [Palette, Code, Zap]
  
  // Use database services if available, otherwise fallback to translations
  const serviceGroups = services.length > 0
    ? services.map((service, index) => {
        const items = Array.isArray(service.items) ? service.items : []
        return {
          id: service.slug || service.title.toLowerCase().replace(/\s+/g, '-'),
          icon: serviceIcons[index] || Palette,
          title: service.title,
          description: service.subtitle || '',
          items: items as string[],
          pillLabel: service.pillLabel || service.title,
        }
      })
    : t.services.items.map((item, index) => ({
        id: item.title.toLowerCase().replace(/\s+/g, '-'),
        icon: serviceIcons[index] || Palette,
        title: item.title,
        description: item.description,
        items: item.bullets,
        pillLabel: item.title,
      }))
  
  // Don't render section if no services
  if (serviceGroups.length === 0) {
    return null
  }

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
                  {t.services.label}
                </span>
              </motion.div>
              <h2 className="text-h1 font-semibold text-text-primary mb-4">
                {t.services.title}
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {serviceGroups.map((group, index) => {
              const Icon = group.icon
              return (
                <motion.div
                  key={group.title}
                  id={group.id}
                  data-animate-child
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                        delay: index * 0.1,
                      }}
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                  }}
                  className="group relative bg-surface border border-border-subtle rounded-xl p-8 hover:shadow-card-hover hover:border-orange/50 transition-all duration-300 cursor-pointer scroll-mt-24 overflow-hidden"
                >
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/0 via-orange/0 to-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
                  
                  {/* Subtle light streak effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div 
                      className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent"
                      style={{
                        transform: 'translateY(-50%)',
                      }}
                    />
                  </div>

                  {/* Icon Container */}
                  <div className="relative z-10 w-14 h-14 rounded-xl border border-border-subtle flex items-center justify-center mb-6 group-hover:border-orange group-hover:bg-orange/5 transition-all duration-300">
                    <Icon size={28} className="text-text-secondary group-hover:text-orange transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Pill Label */}
                    {group.pillLabel && (
                      <div className="mb-3">
                        <span className="inline-block text-label text-orange/80 uppercase tracking-wider font-medium text-xs mb-2">
                          {group.pillLabel}
                        </span>
                      </div>
                    )}
                    
                    <h3 className="text-h4 font-semibold text-text-primary mb-3">
                      {group.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary mb-6 leading-relaxed">
                      {group.description}
                    </p>
                    <ul className="space-y-3">
                      {group.items.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeOut',
                        delay: (index * 0.1) + (itemIndex * 0.08) + 0.3,
                      }}
                          className="flex items-start gap-3 group/item"
                        >
                          <span className="text-orange mt-1.5 group-hover/item:scale-110 transition-transform duration-200 flex-shrink-0">•</span>
                          <span className="text-body text-text-secondary group-hover/item:text-text-primary transition-colors duration-200">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
