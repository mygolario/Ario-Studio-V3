'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type LocalizedContent } from '@/lib/content/types'
import { type SupportedLang } from '@/lib/i18n'

interface PortfolioCardProps {
  lang: SupportedLang
  item: LocalizedContent
}

/**
 * PortfolioCard Component
 * 
 * A reusable card component for displaying portfolio items.
 * Supports both Farsi and English with proper RTL/LTR handling.
 */
export default function PortfolioCard({ lang, item }: PortfolioCardProps) {
  const isRTL = lang === 'fa'
  
  // Determine status from tags
  let status: 'Live' | 'In development' | 'Concept' | 'Internal project' = 'In development'
  
  if (item.tags && item.tags.length > 0) {
    const statusTag = item.tags.find(tag => 
      tag.toLowerCase().includes('live') || 
      tag.toLowerCase().includes('فعال') ||
      tag.toLowerCase().includes('concept') ||
      tag.toLowerCase().includes('کانسپت')
    )
    if (statusTag) {
      if (statusTag.toLowerCase().includes('live') || statusTag.includes('فعال')) {
        status = 'Live'
      } else if (statusTag.toLowerCase().includes('concept') || statusTag.includes('کانسپت')) {
        status = 'Concept'
      }
    }
  }

  // Status labels (bilingual)
  const statusLabels: Record<string, { fa: string; en: string }> = {
    'Live': { fa: 'فعال', en: 'Live' },
    'In development': { fa: 'در حال توسعه', en: 'In development' },
    'Concept': { fa: 'کانسپت', en: 'Concept' },
    'Internal project': { fa: 'پروژه داخلی', en: 'Internal project' },
  }

  const statusLabel = statusLabels[status]?.[lang] || status

  return (
    <Link
      href={`/${lang}/work/${item.slug}`}
      className="group bg-surface rounded-xl overflow-hidden border border-border-subtle hover:shadow-card-hover hover:-translate-y-2 hover:border-orange/50 transition-all duration-300 cursor-pointer block relative"
    >
      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange/0 via-orange/0 to-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl z-0" />
      
      {/* Subtle light streak effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent"
          style={{
            transform: 'translateY(-50%)',
          }}
        />
      </div>
      
      {/* Image Section */}
      <div className="relative h-64 bg-surface-alt overflow-hidden rounded-t-xl z-10">
        {item.featuredImage ? (
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-alt to-elevated group-hover:scale-110 transition-transform duration-500 ease-out" />
        )}
        
        {/* Overlay - appears on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex items-center justify-center">
          <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center px-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-pure-white text-body font-medium mb-2">{item.title}</p>
            {item.excerpt && (
              <p className="text-pure-white/80 text-body-sm">{item.excerpt}</p>
            )}
          </div>
        </div>
        
        {/* Default content - hidden on hover */}
        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200">
          <p className={`text-text-muted text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
            {lang === 'fa' ? 'مشاهده جزئیات' : 'View case study'}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className={`flex items-start justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h3 className={`text-h4 font-semibold text-text-primary group-hover:text-orange transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>
            {item.title}
          </h3>
          <span className={`text-label text-text-muted bg-surface-alt border border-border-subtle px-2 py-1 rounded text-xs ${isRTL ? 'ml-2 mr-0' : 'mr-2 ml-0'}`}>
            {statusLabel}
          </span>
        </div>
        
        {(item.excerpt || item.subtitle) && (
          <p className={`text-body text-text-secondary mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {item.excerpt || item.subtitle}
          </p>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {item.tags
              .filter(tag => !tag.toLowerCase().includes('live') && 
                           !tag.toLowerCase().includes('فعال') &&
                           !tag.toLowerCase().includes('concept') &&
                           !tag.toLowerCase().includes('کانسپت'))
              .map((tag) => (
                <span
                  key={tag}
                  className="text-label text-text-muted bg-surface-alt border border-border-subtle px-3 py-1 rounded-full hover:border-orange hover:text-orange hover:bg-orange/5 transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
          </div>
        )}
      </div>
    </Link>
  )
}

