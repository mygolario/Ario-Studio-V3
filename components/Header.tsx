'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import AnimatedGradientBackground from './AnimatedGradientBackground'
import FeatureIcon3D from './FeatureIcon3D'

interface MegaMenuItem {
  title: string
  description: string
  href: string
  icon?: 'brain' | 'cube' | 'graph' | 'chart'
}

interface NavItem {
  label: string
  href: string
  megaMenu?: {
    title: string
    items: MegaMenuItem[]
  }
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: NavItem[] = [
    {
      label: 'Services',
      href: '#services',
      megaMenu: {
        title: 'Our Services',
        items: [
          {
            title: 'AI-Native Web Design',
            description: 'Websites powered by intelligent agents',
            href: '#services',
            icon: 'brain',
          },
          {
            title: 'Cinematic UI/UX',
            description: 'Experiences that feel like films',
            href: '#services',
            icon: 'cube',
          },
          {
            title: 'Product Strategy',
            description: 'Data-driven growth systems',
            href: '#services',
            icon: 'chart',
          },
        ],
      },
    },
    {
      label: 'Work',
      href: '#portfolio',
      megaMenu: {
        title: 'Selected Projects',
        items: [
          {
            title: 'Tech Startup Platform',
            description: 'SaaS product with AI integration',
            href: '#portfolio',
            icon: 'graph',
          },
          {
            title: 'Luxury Fashion Brand',
            description: 'Cinematic e-commerce experience',
            href: '#portfolio',
            icon: 'cube',
          },
          {
            title: 'Healthcare Innovation',
            description: 'Patient-centered digital platform',
            href: '#portfolio',
            icon: 'brain',
          },
        ],
      },
    },
    { label: 'Process', href: '#design-ethos' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-pure-white/80 backdrop-blur-md shadow-soft border-b border-border-subtle'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-2xl font-bold bg-gradient-sunset bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ario Studio
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <div
                  key={item.href}
                  onMouseEnter={() => item.megaMenu && setActiveMegaMenu(item.label)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                  className="relative"
                >
                  <motion.a
                    href={item.href}
                    className="text-body text-text-secondary hover:text-text-primary relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sunset-orange group-hover:w-full transition-all duration-300" />
                  </motion.a>
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              className="hidden lg:block px-6 py-3 bg-gradient-sunset text-pure-white font-semibold rounded-large hover:shadow-warm transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Let&apos;s Talk
            </motion.a>

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
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-pure-white/95 backdrop-blur-lg border-b border-border-subtle shadow-2xl"
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <div className="container-custom py-12">
                <div className="relative">
                  {/* Subtle animated background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <AnimatedGradientBackground variant="section" intensity="low" />
                  </div>

                  {navItems
                    .find((item) => item.label === activeMegaMenu)
                    ?.megaMenu && (
                    <div className="relative z-10">
                      <h3 className="text-h3 font-bold text-text-primary mb-8">
                        {navItems.find((item) => item.label === activeMegaMenu)?.megaMenu?.title}
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {navItems
                          .find((item) => item.label === activeMegaMenu)
                          ?.megaMenu?.items.map((menuItem, index) => (
                            <motion.a
                              key={menuItem.href}
                              href={menuItem.href}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="group relative bg-surface-elevated p-6 rounded-large border border-border-subtle hover:border-sunset-orange/50 transition-all duration-300 hover:shadow-warm overflow-hidden"
                              whileHover={{ y: -4, scale: 1.02 }}
                              style={{
                                transformStyle: 'preserve-3d',
                                perspective: '1000px',
                              }}
                            >
                              {/* Hover gradient overlay */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-sunset-soft opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.3 }}
                              />

                              {/* Icon */}
                              {menuItem.icon && (
                                <div className="relative z-10 mb-4">
                                  <FeatureIcon3D variant={menuItem.icon} size="md" />
                                </div>
                              )}

                              <h4 className="relative z-10 text-h5 font-bold text-text-primary mb-2 group-hover:text-sunset-orange transition-colors">
                                {menuItem.title}
                              </h4>
                              <p className="relative z-10 text-body-sm text-text-secondary mb-4">
                                {menuItem.description}
                              </p>
                              <div className="relative z-10 flex items-center gap-2 text-sunset-orange text-sm font-medium">
                                <span>Learn more</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                            </motion.a>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-pure-white border-t border-border-subtle shadow-soft"
            >
              <div className="container-custom py-6 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-body text-text-secondary hover:text-sunset-orange transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="block mt-4 px-6 py-3 bg-gradient-sunset text-pure-white font-semibold rounded-large text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Let&apos;s Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

