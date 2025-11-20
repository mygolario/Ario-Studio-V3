'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Button from './Button'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { useActiveSection } from '@/lib/useActiveSection'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Header Component
 * 
 * Navigation & i18n:
 * - Detects locale from pathname (/en = EN, / = FA)
 * - All navigation links are locale-aware
 * - Logo links to home (locale-aware)
 * - CTA button links to /start-project or /en/start-project
 * - Services mega menu links to service detail pages
 */
export default function Header() {
  const pathname = usePathname()
  const t = useTranslation()
  const { language } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const activeSection = useActiveSection()

  // Detect if we're on EN locale (pathname starts with /en)
  const isEN = pathname.startsWith('/en')
  const localePrefix = isEN ? '/en' : ''

  // Helper to get locale-aware route
  const getRoute = (route: string) => {
    return `${localePrefix}${route}`
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  // Navigation items - locale-aware routes
  // Simplified: Home, Services, Portfolio, About (Blog removed per Phase 2 requirements)
  const navItems = [
    { 
      label: language === 'fa' ? 'خانه' : 'Home', 
      href: getRoute('/'), 
      id: 'home',
      isHome: true 
    },
    { 
      label: language === 'fa' ? 'خدمات' : 'Services', 
      href: getRoute('/services'), 
      hasMegaMenu: false, 
      id: 'services' 
    },
    { 
      label: language === 'fa' ? 'نمونه‌کارها' : 'Portfolio', 
      href: getRoute('/portfolio'), 
      id: 'portfolio' 
    },
    { 
      label: language === 'fa' ? 'درباره استودیو' : 'About', 
      href: getRoute('/about'), 
      id: 'about' 
    },
  ]


  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-base/95 backdrop-blur-md shadow-header border-b border-border-subtle'
            : 'bg-base/80 backdrop-blur-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href={getRoute('/')}
              className="text-xl font-semibold text-text-primary transition-colors duration-250 relative group"
            >
              <motion.span
                className="relative z-10"
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.brand.name}
              </motion.span>
              <motion.span
                className="absolute inset-0 bg-orange/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ transform: 'scale(1.5)' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => {
                // Check if current route is active
                const isActive = pathname === item.href || 
                  (item.id === 'portfolio' && (pathname.startsWith('/work') || pathname.startsWith('/en/work') || pathname.startsWith('/portfolio') || pathname.startsWith('/en/portfolio'))) ||
                  (item.id === 'services' && (pathname.startsWith('/services') || pathname.startsWith('/en/services'))) ||
                  (item.id === 'about' && (pathname.startsWith('/about') || pathname.startsWith('/en/about'))) ||
                  (item.isHome && (pathname === '/' || pathname === '/en'))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-body font-medium transition-all duration-200 group/nav ${
                      isActive ? 'text-text-primary' : 'text-text-secondary hover:text-orange'
                    }`}
                  >
                    <motion.span
                      className="relative z-10"
                      whileHover={{ y: -1 }}
                    >
                      {item.label}
                    </motion.span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-orange"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? '100%' : 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                    <motion.span
                      className="absolute inset-0 bg-orange/5 rounded-md opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200"
                      style={{ transform: 'scale(1.2)' }}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Language Toggle, Theme Toggle & CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageToggle />
              <ThemeToggle />
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button href={getRoute('/start-project')} variant="secondary" className="!px-6 !py-3 relative group/cta" icon={false}>
                  <span className="relative z-10">{language === 'fa' ? 'شروع پروژه' : 'Request a Project'}</span>
                  <motion.span
                    className="absolute inset-0 bg-orange/10 rounded-full opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"
                    style={{ transform: 'scale(1.1)' }}
                  />
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden text-text-primary p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-base border-t border-border-subtle max-h-[calc(100vh-80px)] overflow-y-auto"
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="container-custom py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-body text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 space-y-3">
              <div onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <Button href={getRoute('/start-project')} variant="primary" className="w-full" icon={false}>
                  {language === 'fa' ? 'شروع پروژه' : 'Request a Project'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
}
