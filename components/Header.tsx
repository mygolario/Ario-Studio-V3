'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Button from './Button'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { useActiveSection } from '@/lib/useActiveSection'
import { useTranslation } from '@/lib/useTranslation'

export default function Header() {
  const pathname = usePathname()
  const t = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const activeSection = useActiveSection()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      // Close mega menu on scroll
      if (activeMegaMenu) {
        setActiveMegaMenu(null)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeMegaMenu])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeMegaMenu) {
        setActiveMegaMenu(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [activeMegaMenu])

  // Get mega menu content from translations
  const megaMenuContent = {
    'Services': {
      columns: t.megaMenu.columns.map((column) => ({
        title: column.title,
        description: column.description,
        items: column.items.map((item) => ({
          text: item,
          href: '#services', // All mega menu items scroll to services section
        })),
      })),
    },
  }

  const handleMegaMenuItemClick = (href: string) => {
    setActiveMegaMenu(null)
    setIsMobileMenuOpen(false) // Close mobile menu if open
    const element = document.querySelector(href)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const navItems = [
    { label: t.nav.services, href: '#services', hasMegaMenu: true, id: 'services' },
    { label: t.nav.work, href: '#portfolio', id: 'portfolio' },
    { label: t.nav.process, href: '#philosophy', id: 'philosophy' },
    { label: t.nav.about, href: '#about', id: 'about' },
    { label: t.nav.contact, href: '#contact', id: 'contact' },
  ]

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (label === 'Services') {
      setActiveMegaMenu('Services')
    }
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 300) // Increased delay to prevent flicker
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
      setActiveMegaMenu(null)
    }
  }

  useEffect(() => {
    if (activeMegaMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeMegaMenu])

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
        onMouseLeave={handleMouseLeave}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-xl font-semibold text-text-primary transition-colors duration-250 relative group"
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t.brand.name}</span>
              <motion.span
                className="absolute inset-0 bg-orange/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ transform: 'scale(1.5)' }}
              />
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => {
                // For case study pages, highlight "Work" nav item
                const isActive = pathname.startsWith('/work') 
                  ? item.id === 'portfolio'
                  : activeSection === item.id
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => item.hasMegaMenu && handleMouseEnter(item.label)}
                  >
                    {item.hasMegaMenu ? (
                      <motion.button
                        onClick={(e) => {
                          // Scroll to section when clicked
                          if (item.href.startsWith('#')) {
                            e.preventDefault()
                            const element = document.querySelector(item.href)
                            if (element) {
                              const headerHeight = 80
                              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                              const offsetPosition = elementPosition - headerHeight
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth',
                              })
                            }
                          }
                          // Also toggle mega menu
                          setActiveMegaMenu(activeMegaMenu === 'Services' ? null : 'Services')
                        }}
                        className={`relative text-body font-medium transition-all duration-200 cursor-pointer group/nav ${
                          activeMegaMenu === 'Services' ? 'text-orange' : 'text-text-secondary hover:text-orange'
                        }`}
                        whileHover={{ y: -1 }}
                      >
                        <span className="relative z-10">{item.label}</span>
                        <ChevronDown 
                          size={14} 
                          className={`inline-block ml-1 rtl:ml-0 rtl:mr-1 transition-transform duration-200 relative z-10 ${
                            activeMegaMenu === 'Services' ? 'rotate-180' : ''
                          }`}
                        />
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 bg-orange"
                          initial={{ width: 0 }}
                          animate={{ width: activeMegaMenu === 'Services' ? '100%' : 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        />
                        <motion.span
                          className="absolute inset-0 bg-orange/5 rounded-md opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200"
                          style={{ transform: 'scale(1.2)' }}
                        />
                      </motion.button>
                    ) : (
                      <motion.a
                        href={item.href}
                        onClick={(e) => {
                          // Handle internal links with hash
                          if (item.href.startsWith('#')) {
                            e.preventDefault()
                            const element = document.querySelector(item.href)
                            if (element) {
                              const headerHeight = 80
                              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                              const offsetPosition = elementPosition - headerHeight
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth',
                              })
                            }
                          }
                          // External links (like /#portfolio) will navigate normally
                        }}
                        className={`relative text-body font-medium transition-all duration-200 group/nav ${
                          isActive ? 'text-text-primary' : 'text-text-secondary hover:text-orange'
                        }`}
                        whileHover={{ y: -1 }}
                      >
                        <span className="relative z-10">{item.label}</span>
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
                      </motion.a>
                    )}
                  </div>
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
                <Button href="#contact" variant="secondary" className="!px-6 !py-3 relative group/cta" icon={false}>
                  <span className="relative z-10">{t.startProject.ctaPrimary}</span>
                  <motion.span
                    className="absolute inset-0 bg-orange/10 rounded-full opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"
                    style={{ transform: 'scale(1.1)' }}
                  />
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-text-primary p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMegaMenu && megaMenuContent[activeMegaMenu as keyof typeof megaMenuContent] && (
            <motion.div
              ref={megaMenuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-50"
              onMouseEnter={() => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current)
                  timeoutRef.current = null
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="container-custom py-8">
                <div className="max-w-6xl mx-auto">
                  {/* Floating Panel */}
                  <div 
                    className="bg-surface rounded-2xl border border-border-subtle overflow-hidden"
                    style={{
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {/* Header Row */}
                    <div className="px-8 pt-6 pb-4 border-b border-border-subtle flex items-center justify-between">
                      <p className="text-body-sm font-medium text-text-secondary">
                        {t.megaMenu.header}
                      </p>
                      <span className="text-label text-orange bg-orange/10 border border-orange/20 px-3 py-1 rounded-full font-medium">
                        {t.megaMenu.aiNative}
                      </span>
                    </div>

                    {/* Columns Grid */}
                    <div className="px-8 py-6">
                      <div className="grid md:grid-cols-3 gap-8">
                        {megaMenuContent[activeMegaMenu as keyof typeof megaMenuContent].columns.map((column, index) => (
                          <motion.div
                            key={column.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                          >
                            {/* Vertical Divider (except last column) */}
                            {index < 2 && (
                              <div className="absolute right-0 top-0 bottom-0 w-px bg-border-subtle rtl:right-auto rtl:left-0" />
                            )}

                            {/* Column Content */}
                            <div className="pr-8 rtl:pr-0 rtl:pl-8">
                              <h3 className="text-h5 font-semibold text-text-primary mb-3">
                                {column.title}
                              </h3>
                              <p className="text-body-sm text-text-secondary mb-6 leading-relaxed">
                                {column.description}
                              </p>
                              
                              {/* Service Button Cards */}
                              <div className="space-y-2.5">
                                {column.items.map((item) => (
                                  <motion.button
                                    key={item.text}
                                    onClick={() => handleMegaMenuItemClick(item.href)}
                                    className="w-full text-left rtl:text-right group/item"
                                    whileHover={{ y: -1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className="flex items-center gap-3 rtl:flex-row-reverse px-4 py-3 rounded-xl bg-surface-alt border border-border-subtle hover:bg-orange/5 hover:border-orange/30 transition-all duration-200">
                                      {/* Visual Marker */}
                                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-orange opacity-60 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all" />
                                      
                                      {/* Text */}
                                      <span className="text-body-sm font-medium text-text-primary group-hover/item:text-orange transition-colors">
                                        {item.text}
                                      </span>
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-base border-t border-border-subtle max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="container-custom py-6 space-y-4">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.hasMegaMenu ? (
                  <div>
                    <button
                      onClick={() => {
                        // Toggle mobile services mega menu
                        setMobileServicesOpen(!mobileServicesOpen)
                      }}
                      className="flex items-center justify-between w-full text-body text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {mobileServicesOpen && megaMenuContent['Services'] && (
                      <div className="mt-4 ml-4 rtl:ml-0 rtl:mr-4 space-y-6">
                        {megaMenuContent['Services'].columns.map((column) => (
                          <div key={column.title}>
                            <h4 className="text-body font-semibold text-text-primary mb-2">
                              {column.title}
                            </h4>
                            <p className="text-body-sm text-text-secondary mb-3">
                              {column.description}
                            </p>
                            <div className="space-y-2">
                              {column.items.map((item) => (
                                <button
                                  key={item.text}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    setMobileServicesOpen(false)
                                    handleMegaMenuItemClick(item.href)
                                  }}
                                  className="w-full text-left rtl:text-right flex items-center gap-3 rtl:flex-row-reverse px-4 py-2.5 rounded-lg bg-surface-alt border border-border-subtle hover:bg-orange/5 hover:border-orange/30 transition-all"
                                >
                                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-orange opacity-60" />
                                  <span className="text-body-sm font-medium text-text-primary">
                                    {item.text}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block text-body text-text-secondary hover:text-text-primary transition-colors"
                    onClick={(e) => {
                      // Handle internal links with hash
                      if (item.href.startsWith('#')) {
                        e.preventDefault()
                        setIsMobileMenuOpen(false)
                        const element = document.querySelector(item.href)
                        if (element) {
                          const headerHeight = 80
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                          const offsetPosition = elementPosition - headerHeight
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth',
                          })
                        }
                      } else {
                        // External links (like /#portfolio) will navigate normally
                        setIsMobileMenuOpen(false)
                      }
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <div className="mt-4 space-y-3">
              <div onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <Button href="#contact" variant="primary" className="w-full" icon={false}>
                  {t.startProject.ctaPrimary}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
}
