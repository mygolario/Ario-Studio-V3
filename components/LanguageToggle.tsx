'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { trackEvent } from '@/lib/analytics/trackEvent'

/**
 * Language Toggle Component
 * 
 * Navigation & i18n:
 * - Maintains semantic page when switching languages
 * - /services → /en/services
 * - /en/about → /about
 * - / → /en (or vice versa)
 */
export default function LanguageToggle() {
  const { language, toggleLanguage, setLanguage } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
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
    
    // Map current pathname to equivalent in other language
    let newPath = pathname
    
    if (pathname.startsWith('/en')) {
      // Currently on EN, switch to FA
      newPath = pathname.replace('/en', '') || '/'
    } else {
      // Currently on FA, switch to EN
      if (pathname === '/') {
        newPath = '/en'
      } else {
        newPath = `/en${pathname}`
      }
    }
    
    // Navigate first, then update language context after navigation completes
    // This prevents race condition where language context updates before pathname changes
    router.push(newPath)
    
    // Update language context after navigation
    // Use setTimeout to ensure navigation happens first
    setTimeout(() => {
      setLanguage(toLang)
    }, 0)
  }
  
  // Sync language context with current pathname on mount and pathname changes
  // This ensures language context always matches the route
  useEffect(() => {
    if (mounted) {
      const routeLang = pathname.startsWith('/en') ? 'en' : 'fa'
      if (language !== routeLang) {
        setLanguage(routeLang)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, mounted])

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

