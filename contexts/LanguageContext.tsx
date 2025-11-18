'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'fa' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fa') // Default to Farsi
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved preference, default to 'fa' if none exists
    const savedLanguage = localStorage.getItem('language') as Language | null
    if (savedLanguage === 'fa' || savedLanguage === 'en') {
      setLanguageState(savedLanguage)
    } else {
      setLanguageState('fa') // Default to Farsi
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Apply language to document
      const html = document.documentElement
      if (language === 'fa') {
        html.setAttribute('dir', 'rtl')
        html.setAttribute('lang', 'fa')
      } else {
        html.setAttribute('dir', 'ltr')
        html.setAttribute('lang', 'en')
      }
      // Save preference
      localStorage.setItem('language', language)
    }
  }, [language, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'fa' ? 'en' : 'fa'))
  }

  // Prevent flash of unstyled content
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Return default values during SSR or when provider is not available
    return {
      language: 'fa' as Language,
      toggleLanguage: () => {},
      setLanguage: () => {},
    }
  }
  return context
}

