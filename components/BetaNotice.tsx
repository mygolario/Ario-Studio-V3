'use client'

import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Beta Notice Component
 * 
 * A subtle, clean notice indicating the site is in beta version.
 * Only shown in Farsi version.
 */
export default function BetaNotice() {
  const t = useTranslation()
  const { language } = useLanguage()
  
  // Only show in Farsi version
  if (language !== 'fa') {
    return null
  }

  return (
    <div className="container-custom py-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface-alt border border-border-subtle rounded-xl px-6 py-4 text-center rtl:text-right">
          <p className="text-body-sm text-text-secondary leading-relaxed">
            {t.common.betaNotice}
          </p>
        </div>
      </div>
    </div>
  )
}

