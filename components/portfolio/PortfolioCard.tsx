'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type PortfolioSample } from '@/content/portfolioSamples'
import { type SupportedLang } from '@/lib/i18n'
import { trackEvent } from '@/lib/analytics/trackEvent'

interface PortfolioCardProps {
  lang: SupportedLang
  item: PortfolioSample
}

/**
 * PortfolioCard Component
 * 
 * A reusable card component for displaying portfolio items.
 * Supports both Farsi and English with proper RTL/LTR handling.
 */
export default function PortfolioCard({ lang, item }: PortfolioCardProps) {
  const isRTL = lang === 'fa'
  
  // Localized content
  const title = item.title[lang]
  const description = item.description[lang]
  const tags = item.tags[lang]
  
  const uiTexts = lang === 'fa' 
    ? {
        label: 'نمونه نمایشی',
        cta: 'مشاهده جزئیات',
      }
    : {
        label: 'Sample project',
        cta: 'View details',
      }

  const handleClick = () => {
    trackEvent('portfolio_card_click', {
      lang,
      slug: item.slug,
      category: 'sample',
    })
  }

  return (
    <Link
      href={`/${lang}/work/${item.slug}`}
      onClick={handleClick}
      className="group flex bg-surface rounded-2xl overflow-hidden border border-border-subtle hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex-col"
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-[16/10] bg-surface-alt overflow-hidden w-full">
        {/* Placeholder Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-surface-alt group-hover:scale-105 transition-transform duration-500 ease-out" />
        
        {/* Optional: Overlay Title for placeholder look */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <span className="text-4xl font-bold text-text-primary">{title.charAt(0)}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className={`p-6 flex flex-col flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Label */}
        <div className={`mb-3 flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs font-medium text-orange bg-orange/10 px-2 py-1 rounded-md">
            {uiTexts.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-h4 font-bold text-text-primary mb-3 group-hover:text-orange transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-body text-text-secondary mb-6 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className={`flex flex-wrap gap-2 mb-6 mt-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-text-muted bg-surface-alt border border-border-subtle px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className={`flex items-center text-sm font-medium text-text-primary group-hover:text-orange transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span>{uiTexts.cta}</span>
          <svg 
            className={`w-4 h-4 ${isRTL ? 'mr-1 rotate-180' : 'ml-1'} transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

