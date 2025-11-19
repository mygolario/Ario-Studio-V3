'use client'

import Link from 'next/link'
import { type LocalizedContent, type ServiceLevel } from '@/lib/content/types'
import { type SupportedLang } from '@/lib/i18n'

interface ServiceCardProps {
  lang: SupportedLang
  item: LocalizedContent // type should be 'service'
}

/**
 * ServiceCard Component
 * 
 * A reusable card component for displaying service items.
 * Supports pricing, duration, level, and CTA with bilingual support.
 */
export default function ServiceCard({ lang, item }: ServiceCardProps) {
  const isRTL = lang === 'fa'
  
  // Service level labels (bilingual)
  const levelLabels: Record<ServiceLevel, { fa: string; en: string }> = {
    starter: { fa: 'پکیج استارتر', en: 'Starter Package' },
    pro: { fa: 'پکیج حرفه‌ای', en: 'Pro Package' },
    premium: { fa: 'پکیج پریمیوم', en: 'Premium Package' },
  }

  // Format price with currency
  const formatPrice = (price: number | null | undefined, currency: string | null | undefined): string | null => {
    if (!price) return null
    
    const currencySymbol: Record<string, { fa: string; en: string }> = {
      USD: { fa: '$', en: '$' },
      IRR: { fa: 'تومان', en: 'IRR' },
    }
    
    const symbol = currencySymbol[currency || 'USD']?.[lang] || (currency || 'USD')
    
    if (lang === 'fa') {
      return `شروع از ${price.toLocaleString('fa-IR')} ${symbol}`
    }
    return `Starting from ${symbol}${price.toLocaleString('en-US')}`
  }

  // Format duration label
  const formatDuration = (duration: string | null | undefined): string | null => {
    if (!duration) return null
    return lang === 'fa' ? `مدت اجرا: ${duration}` : `Timeline: ${duration}`
  }

  const priceText = formatPrice(item.servicePriceFrom, item.serviceCurrency)
  const durationText = formatDuration(item.serviceDuration)
  const levelLabel = item.serviceLevel ? levelLabels[item.serviceLevel]?.[lang] : null

  // CTA link - link to homepage contact section with service query param
  const ctaLink = `/#contact?service=${item.slug}`
  const ctaText = lang === 'fa' ? 'شروع این نوع پروژه' : 'Start this project'

  return (
    <div className="group relative bg-surface border border-border-subtle rounded-xl p-8 hover:shadow-card-hover hover:border-orange/50 transition-all duration-300 overflow-hidden">
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

      {/* Content */}
      <div className="relative z-10">
        {/* Service Level Badge */}
        {levelLabel && (
          <div className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-wide bg-orange/10 border border-orange/30 text-orange font-medium">
              {levelLabel}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className={`text-h4 font-semibold text-text-primary mb-3 group-hover:text-orange transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>
          {item.title}
        </h3>

        {/* Excerpt */}
        {item.excerpt && (
          <p className={`text-body-sm text-text-secondary mb-6 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
            {item.excerpt}
          </p>
        )}

        {/* Service Details */}
        <div className={`space-y-3 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Duration */}
          {durationText && (
            <div className="flex items-center gap-2 text-body-sm text-text-secondary">
              <span className="text-orange">•</span>
              <span>{durationText}</span>
            </div>
          )}

          {/* Price */}
          {priceText && (
            <div className="flex items-center gap-2 text-body-sm text-text-secondary">
              <span className="text-orange">•</span>
              <span>{priceText}</span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={ctaLink}
          className={`block w-full text-center py-3 px-6 rounded-lg bg-orange/10 border border-orange/30 text-orange font-medium hover:bg-orange hover:text-white transition-all duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {ctaText}
        </Link>
      </div>
    </div>
  )
}

