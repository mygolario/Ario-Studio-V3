'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics/trackEvent'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use default language during SSR
  const currentLanguage = mounted ? language : 'fa'

  const handleLanguageSwitch = () => {
    const fromLang = currentLanguage
    const toLang = currentLanguage === 'fa' ? 'en' : 'fa'
    
    trackEvent('language_switch', {
      fromLang,
      toLang,
    })
    
    toggleLanguage()
  }

  return (
    <motion.button
      onClick={handleLanguageSwitch}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface hover:border-orange transition-all duration-250 cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Switch to ${currentLanguage === 'fa' ? 'English' : 'Farsi'}`}
    >
      {currentLanguage === 'fa' ? (
        <>
          <span className="text-body-sm font-medium text-text-secondary group-hover:text-orange transition-colors duration-250">
            FA
          </span>
          <span className="text-body-sm font-medium text-text-secondary group-hover:text-orange transition-colors duration-250 hidden sm:inline opacity-50">
            / EN
          </span>
        </>
      ) : (
        <>
          <span className="text-body-sm font-medium text-text-secondary group-hover:text-orange transition-colors duration-250 hidden sm:inline opacity-50">
            FA /
          </span>
          <span className="text-body-sm font-medium text-text-secondary group-hover:text-orange transition-colors duration-250">
            EN
          </span>
        </>
      )}
    </motion.button>
  )
}

