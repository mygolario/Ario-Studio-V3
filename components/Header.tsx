'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Button from './Button'
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
          title: 'We Design',
          description: 'Clean, structured design systems',
          items: [
            'Clean UI/UX systems',
            'Brand identity & visual frameworks',
            'High-clarity interface layouts',
          ],
        },
        {
          title: 'We Build',
          description: 'Reliable, scalable engineering',
          items: [
            'Next.js engineering',
            'Performance & SEO standards',
            'Reliable, scalable architecture',
          ],
        },
        {
          title: 'We Automate',
          description: 'Intelligent workflow systems',
          items: [
            'AI workflows & integrations',
            'Custom automation agents',
            'System intelligence setup',
          ],
        },
      ],
    },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-pure-white/95 backdrop-blur-sm shadow-header border-b border-border-subtle'
            : 'bg-pure-white'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-xl font-semibold text-text-primary"
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
                    <motion.a
                      href={item.href}
                      className={`relative text-body font-medium transition-colors duration-300 ${
                        isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                      } ${item.hasMegaMenu && activeMegaMenu === 'Services' ? 'text-text-primary' : ''}`}
                      whileHover={{ y: -1 }}
                    >
                      {item.label}
                      {item.hasMegaMenu && (
                        <ChevronDown 
                          size={14} 
                          className={`inline-block ml-1 transition-transform duration-300 ${
                            activeMegaMenu === 'Services' ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-orange"
                        initial={{ width: 0 }}
                        animate={{ width: isActive || (item.hasMegaMenu && activeMegaMenu === 'Services') ? '100%' : 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </motion.a>
                  </div>
                )
              })}
            </nav>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <Button href="#contact" variant="secondary" className="!px-6 !py-3" icon={false}>
                Start a Project
              </Button>
            </motion.div>

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
              className="absolute top-full left-0 right-0 bg-pure-white border-b border-border-subtle shadow-card rounded-b-xl"
              onMouseEnter={() => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current)
                  timeoutRef.current = null
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="container-custom py-12">
                <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto" onMouseEnter={() => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                    timeoutRef.current = null
                  }
                }}>
                  {megaMenuContent[activeMegaMenu as keyof typeof megaMenuContent].columns.map((column, index) => (
                    <motion.div
                      key={column.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-h5 font-semibold text-text-primary mb-2">
                        {column.title}
                      </h3>
                      <p className="text-body-sm text-text-secondary mb-4">
                        {column.description}
                      </p>
                      <ul className="space-y-2">
                        {column.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-orange mt-1.5">•</span>
                            <span className="text-body-sm text-text-secondary">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
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
          className="lg:hidden overflow-hidden bg-pure-white border-t border-border-subtle"
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
                      <div className="mt-3 ml-4 space-y-4">
                        {megaMenuContent['Services'].columns.map((column) => (
                          <div key={column.title}>
                            <h4 className="text-body font-medium text-text-primary mb-2">
                              {column.title}
                            </h4>
                            <ul className="space-y-1.5 ml-4">
                              {column.items.map((item) => (
                                <li key={item} className="text-body-sm text-text-secondary">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block text-body text-text-secondary hover:text-text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <div className="mt-4" onClick={() => setIsMobileMenuOpen(false)}>
              <Button href="#contact" variant="primary" className="w-full" icon={false}>
                Start a Project
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
}
