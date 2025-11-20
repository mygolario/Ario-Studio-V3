'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { servicesConfig } from '@/config/services'

/**
 * Services Overview Component
 * 
 * Displays 3-4 service cards on the Home page.
 * Uses centralized services config for consistency.
 * 
 * Navigation & i18n:
 * - Detects locale from pathname (/en = EN, / = FA)
 * - All links are locale-aware
 */
export default function ServicesOverview() {
  const pathname = usePathname()
  const isEN = pathname.startsWith('/en')
  const localePrefix = isEN ? '/en' : ''
  
  const getRoute = (route: string) => `${localePrefix}${route}`

  // Use services from centralized config
  const services = servicesConfig.map(service => ({
    slug: service.slug,
    title: isEN ? service.title.en : service.title.fa,
    description: isEN ? service.shortDescription.en : service.shortDescription.fa,
    bullets: isEN ? service.bullets.en.slice(0, 3) : service.bullets.fa.slice(0, 3),
  }))

  const viewDetailsLabel = isEN ? 'View details' : 'مشاهده جزئیات'

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-surface-alt">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 ${isEN ? '' : 'rtl'}`}>
            <h2 className="text-h1 font-semibold text-text-primary mb-4">
              {isEN ? 'Services' : 'خدمات'}
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              {isEN 
                ? 'What we do to craft cinematic, AI-powered web experiences.'
                : 'آنچه برای ساخت تجربه‌های وب سینمایی انجام می‌دهیم.'}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-surface border border-border-subtle rounded-xl p-6 hover:border-orange/50 hover:shadow-card-hover transition-all"
              >
                <h3 className="text-h4 font-semibold text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-body text-text-secondary mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <ul className={`space-y-2 mb-6 ${isEN ? '' : 'rtl'}`}>
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-body-sm text-text-secondary">
                      <span className="text-orange mt-1.5 flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* View Details Link */}
                <Link
                  href={getRoute(`/services/${service.slug}`)}
                  className="inline-flex items-center gap-2 text-body-sm font-medium text-orange hover:gap-3 transition-all group/link"
                >
                  <span>{viewDetailsLabel}</span>
                  <ArrowRight 
                    size={16} 
                    className={`transition-transform group-hover/link:translate-x-1 ${isEN ? '' : 'rtl:rotate-180'}`}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

