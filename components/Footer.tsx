'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Instagram, Github } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useMemo, useCallback } from 'react'

/**
 * Footer Component
 * 
 * Navigation & i18n:
 * - Detects locale from pathname (/en = EN, / = FA)
 * - All footer links are locale-aware
 * - Link groups: Studio, Services, Resources, Legal & Contact
 */
export default function Footer() {
  const pathname = usePathname()
  const t = useTranslation()
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  // Detect if we're on EN locale
  const isEN = pathname.startsWith('/en')
  const localePrefix = isEN ? '/en' : ''

  // Helper to get locale-aware route
  // Memoized to prevent unnecessary recalculations and ensure stable reference
  const getRoute = useCallback((route: string) => `${localePrefix}${route}`, [localePrefix])

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  // Footer link groups according to requirements
  // Use stable keys to prevent React remounting on language change
  // Structure: stable category keys with dynamic labels
  // Keys are stable ('studio', 'services', 'resources', 'legal') to prevent remounting
  const footerLinksStructure = useMemo(() => {
    // Define stable category order and keys - these never change
    return [
      {
        key: 'studio', // Stable key - never changes
        label: language === 'fa' ? 'استودیو' : 'Studio',
        links: [
          { 
            label: language === 'fa' ? 'درباره' : 'About', 
            href: getRoute('/about') 
          },
          { 
            label: language === 'fa' ? 'نمونه‌کارها' : 'Portfolio', 
            href: getRoute('/portfolio') 
          },
          { 
            label: language === 'fa' ? 'بلاگ' : 'Blog', 
            href: getRoute('/blog') 
          },
        ],
      },
      {
        key: 'services', // Stable key - never changes
        label: language === 'fa' ? 'خدمات' : 'Services',
        links: [
          { 
            label: language === 'fa' ? 'خدمات' : 'Services', 
            href: getRoute('/services') 
          },
          { 
            label: language === 'fa' ? 'وب‌سایت کامل' : 'Full Website', 
            href: getRoute('/services/full-website') 
          },
          { 
            label: language === 'fa' ? 'صفحه فرود' : 'Landing Pages', 
            href: getRoute('/services/landing-page') 
          },
          { 
            label: language === 'fa' ? 'اتوماسیون هوش مصنوعی' : 'AI Automations', 
            href: getRoute('/services/ai-automation') 
          },
          { 
            label: language === 'fa' ? 'بازطراحی برند' : 'Brand Refresh', 
            href: getRoute('/services/brand-refresh') 
          },
        ],
      },
      {
        key: 'resources', // Stable key - never changes
        label: language === 'fa' ? 'منابع' : 'Resources',
        links: [
          { 
            label: language === 'fa' ? 'سوالات متداول' : 'FAQ', 
            href: getRoute('/faq') 
          },
          { 
            label: language === 'fa' ? 'قیمت‌گذاری' : 'Pricing', 
            href: getRoute('/pricing') 
          },
          // Future: Case Studies / Templates (commented for now)
          // { label: language === 'fa' ? 'مطالعات موردی' : 'Case Studies', href: getRoute('/case-studies') },
          // { label: language === 'fa' ? 'قالب‌ها' : 'Templates', href: getRoute('/templates') },
        ],
      },
      {
        key: 'legal', // Stable key - never changes
        label: language === 'fa' ? 'قانونی و تماس' : 'Legal & Contact',
        links: [
          { 
            label: language === 'fa' ? 'سیاست حریم خصوصی' : 'Privacy Policy', 
            href: getRoute('/privacy') 
          },
          { 
            label: language === 'fa' ? 'شرایط استفاده' : 'Terms of Service', 
            href: getRoute('/terms') 
          },
        ],
      },
    ]
  }, [language, getRoute])

  // Contact email (use configured email or placeholder)
  const contactEmail = 'info@ariostudio.net'

  return (
    <footer className="relative border-t border-border-subtle bg-surface-alt">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'power3.out' }}
              className="relative"
            >
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 relative z-10">
                  {t.brand.name}
                </h3>
                <motion.div
                  className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-orange/30 to-transparent opacity-50 rtl:left-auto rtl:-right-4"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <p className="text-body-sm text-text-secondary mb-6">
                {t.footer.description}
              </p>
              {/* Social Links */}
              <div className="flex gap-3 md:gap-4 flex-wrap">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-surface rounded-medium flex items-center justify-center text-text-secondary hover:text-orange hover:bg-orange/5 transition-all duration-300 border border-border-subtle"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={18} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Link Columns */}
          {footerLinksStructure.map((categoryData, categoryIndex) => (
            <motion.div
              key={categoryData.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <div className="relative">
                <h4 className="text-h6 font-semibold text-text-primary mb-4 relative z-10">
                  {categoryData.label}
                </h4>
                <motion.div
                  className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rtl:left-auto rtl:-right-2"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 + 0.3 }}
                />
              </div>
              <ul className="space-y-3">
                {categoryData.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-secondary hover:text-orange transition-colors relative inline-block group/link"
                    >
                      <motion.span
                        className="relative z-10"
                        whileHover={{ x: 2 }}
                      >
                        {link.label}
                      </motion.span>
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ transformOrigin: 'var(--dir, left)' }}
                      />
                    </Link>
                  </li>
                ))}
                {/* Contact email for Legal & Contact group */}
                {categoryData.key === 'legal' && (
                  <li>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-body-sm text-text-secondary hover:text-orange transition-colors relative inline-block group/link"
                    >
                      <motion.span
                        className="relative z-10"
                        whileHover={{ x: 2 }}
                      >
                        {contactEmail}
                      </motion.span>
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ transformOrigin: 'var(--dir, left)' }}
                      />
                    </a>
                  </li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-body-sm text-text-muted text-center md:text-left">
            © {currentYear} {t.brand.name}. {t.common.allRightsReserved}.
          </p>
          <p className="text-body-sm text-text-muted text-center md:text-left">
            {t.footer.tagline}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
