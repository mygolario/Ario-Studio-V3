'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Header Component - Minimal Navigation
 * 
 * Sticky header with smooth scroll navigation and language toggle.
 * Supports RTL/LTR layouts.
 */
export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Detect language from pathname
  const isEN = pathname.startsWith('/en')
  const currentLang = isEN ? 'en' : 'fa'
  const isRTL = currentLang === 'fa'
  const localePrefix = isEN ? '/en' : ''

  // Sync language context with pathname
  useEffect(() => {
    if (currentLang !== language) {
      setLanguage(currentLang)
    }
  }, [pathname, currentLang, language, setLanguage])

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setIsMobileMenuOpen(false)
    }
  }

  // Handle language toggle
  const handleLanguageToggle = () => {
    const newLang = currentLang === 'fa' ? 'en' : 'fa'
    setLanguage(newLang)

    // Navigate to appropriate route
    if (newLang === 'en' && !pathname.startsWith('/en')) {
      const newPath = pathname === '/' ? '/en' : `/en${pathname}`
      router.push(newPath)
    } else if (newLang === 'fa' && pathname.startsWith('/en')) {
      const newPath = pathname.replace('/en', '') || '/'
      router.push(newPath)
    }
  }

  // Navigation items
  const navItems = isRTL
    ? [
        { label: 'خدمات', action: () => scrollToSection('services') },
        { label: 'فرآیند', action: () => scrollToSection('process') },
        { label: 'درباره', action: () => scrollToSection('about-preview') },
        { label: 'نمونه‌کارها', href: `${localePrefix}/work` },
        { label: 'تماس', action: () => scrollToSection('cta') },
      ]
    : [
        { label: 'Services', action: () => scrollToSection('services') },
        { label: 'Process', action: () => scrollToSection('process') },
        { label: 'About', action: () => scrollToSection('about-preview') },
        { label: 'Work', href: `${localePrefix}/work` },
        { label: 'Contact', action: () => scrollToSection('cta') },
      ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={localePrefix || '/'}
            className="text-xl font-semibold text-gray-900 transition-colors duration-200 hover:text-orange"
          >
            {isRTL ? 'آریو استودیو' : 'Ario Studio'}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm font-medium text-gray-700 hover:text-orange transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}

            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              className="text-sm font-medium text-gray-700 hover:text-orange transition-colors duration-200 px-3 py-1.5 rounded-md border border-gray-200 hover:border-orange"
            >
              {currentLang === 'fa' ? 'EN' : 'FA'}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <nav className="container-custom py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="block w-full text-left text-base font-medium text-gray-700 hover:text-orange transition-colors duration-200 py-2"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleLanguageToggle}
                className="block w-full text-left text-base font-medium text-gray-700 hover:text-orange transition-colors duration-200 py-2 border-t border-gray-100 mt-4 pt-4"
              >
                {currentLang === 'fa' ? 'English (EN)' : 'فارسی (FA)'}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

