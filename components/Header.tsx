'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Button from './Button'
import ThemeToggle from './ThemeToggle'
import { useActiveSection } from '@/lib/useActiveSection'

export default function Header() {
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

  const megaMenuContent = {
    'Services': {
      columns: [
        {
          title: 'AI-Native Product Websites',
          description: 'Full-stack experiences with AI at the core',
          sectionId: 'ai-native-product-websites',
          items: [
            { text: 'Cinematic marketing sites', href: '#ai-native-product-websites' },
            { text: 'Agent-integrated product pages', href: '#ai-native-product-websites' },
            { text: 'Launch-ready frontends', href: '#ai-native-product-websites' },
          ],
        },
        {
          title: 'MVPs & Dashboards',
          description: 'Fast validation and internal tools',
          sectionId: 'mvps-dashboards',
          items: [
            { text: 'Early-stage MVP & landing pages', href: '#mvps-dashboards' },
            { text: 'Agent-ready internal dashboards', href: '#mvps-dashboards' },
            { text: 'Fast validation builds', href: '#mvps-dashboards' },
          ],
        },
        {
          title: 'Long-term Design Systems',
          description: 'Ongoing design partnerships',
          sectionId: 'long-term-design-systems',
          items: [
            { text: 'UI/UX systems & motion direction', href: '#long-term-design-systems' },
            { text: 'Ongoing design partnerships', href: '#long-term-design-systems' },
            { text: 'Strategic design support', href: '#long-term-design-systems' },
          ],
        },
      ],
    },
  }

  const handleMegaMenuItemClick = (href: string) => {
    setActiveMegaMenu(null)
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
    { label: 'Services', href: '#services', hasMegaMenu: true, id: 'services' },
    { label: 'Work', href: '#portfolio', id: 'portfolio' },
    { label: 'Process', href: '#philosophy', id: 'philosophy' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${
          isScrolled
            ? 'bg-base/95 backdrop-blur-sm shadow-header border-b border-border-subtle'
            : 'bg-base'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-xl font-semibold text-text-primary transition-colors duration-250"
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.98 }}
            >
              Ario Studio
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => item.hasMegaMenu && handleMouseEnter(item.label)}
                  >
                    {item.hasMegaMenu ? (
                      <motion.button
                        onClick={() => setActiveMegaMenu(activeMegaMenu === 'Services' ? null : 'Services')}
                        className={`relative text-body font-medium transition-all duration-200 cursor-pointer ${
                          activeMegaMenu === 'Services' ? 'text-orange' : 'text-text-secondary hover:text-orange'
                        }`}
                        whileHover={{ y: -1 }}
                      >
                        {item.label}
                        <ChevronDown 
                          size={14} 
                          className={`inline-block ml-1 transition-transform duration-200 ${
                            activeMegaMenu === 'Services' ? 'rotate-180' : ''
                          }`}
                        />
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 bg-orange"
                          initial={{ width: 0 }}
                          animate={{ width: activeMegaMenu === 'Services' ? '100%' : 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        />
                      </motion.button>
                    ) : (
                      <motion.a
                        href={item.href}
                        onClick={(e) => {
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
                        }}
                        className={`relative text-body font-medium transition-all duration-200 ${
                          isActive ? 'text-text-primary' : 'text-text-secondary hover:text-orange'
                        }`}
                        whileHover={{ y: -1 }}
                      >
                        {item.label}
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 bg-orange"
                          initial={{ width: 0 }}
                          animate={{ width: isActive ? '100%' : 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        />
                      </motion.a>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Theme Toggle & CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <Button href="#contact" variant="secondary" className="!px-6 !py-3" icon={false}>
                Start a Project
              </Button>
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
                        What we can build for you
                      </p>
                      <span className="text-label text-orange bg-orange/10 border border-orange/20 px-3 py-1 rounded-full font-medium">
                        AI-native
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
                              <div className="absolute right-0 top-0 bottom-0 w-px bg-border-subtle" />
                            )}

                            {/* Column Content */}
                            <div className="pr-8">
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
                                    className="w-full text-left group/item"
                                    whileHover={{ y: -1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-alt border border-border-subtle hover:bg-orange/5 hover:border-orange/30 transition-all duration-200">
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
          className="lg:hidden overflow-hidden bg-base border-t border-border-subtle"
        >
          <div className="container-custom py-6 space-y-4">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.hasMegaMenu ? (
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between w-full text-body text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {mobileServicesOpen && megaMenuContent['Services'] && (
                      <div className="mt-4 ml-4 space-y-6">
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
                                  className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg bg-surface-alt border border-border-subtle hover:bg-orange/5 hover:border-orange/30 transition-all"
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
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <div className="mt-4 space-y-3">
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <ThemeToggle />
              </div>
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <Button href="#contact" variant="primary" className="w-full" icon={false}>
                  Start a Project
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
}
