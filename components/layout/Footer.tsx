'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Linkedin, Twitter, Instagram, Github, Mail } from 'lucide-react'

/**
 * Footer Component - Minimal Design
 * 
 * Structured but minimal footer with logo, tagline, navigation links, email, and legal links.
 */
export default function Footer() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const isRTL = language === 'fa'
  const isEN = pathname.startsWith('/en')
  const localePrefix = isEN ? '/en' : ''
  const currentYear = new Date().getFullYear()

  const getRoute = (route: string) => `${localePrefix}${route}`

  const footerContent = isRTL
    ? {
        tagline: 'طراحی و مهندسی مبتنی بر هوش مصنوعی',
        description: 'تجربیات دیجیتالی سینمایی، ساختاریافته و قابل اعتماد.',
        links: {
          studio: {
            title: 'استودیو',
            items: [
              { label: 'درباره', href: getRoute('/about') },
              { label: 'نمونه‌کارها', href: getRoute('/work') },
            ],
          },
          services: {
            title: 'خدمات',
            items: [
              { label: 'خدمات', href: getRoute('/services') },
            ],
          },
          resources: {
            title: 'منابع',
            items: [
              { label: 'سوالات متداول', href: getRoute('/faq') },
            ],
          },
          legal: {
            title: 'قانونی',
            items: [
              { label: 'سیاست حریم خصوصی', href: getRoute('/privacy') },
              { label: 'شرایط استفاده', href: getRoute('/terms') },
            ],
          },
        },
        copyright: `© ${currentYear} آریو استودیو. تمامی حقوق محفوظ است.`,
      }
    : {
        tagline: 'AI-powered design and engineering',
        description: 'Cinematic, structured, and reliable digital experiences.',
        links: {
          studio: {
            title: 'Studio',
            items: [
              { label: 'About', href: getRoute('/about') },
              { label: 'Work', href: getRoute('/work') },
            ],
          },
          services: {
            title: 'Services',
            items: [
              { label: 'Services', href: getRoute('/services') },
            ],
          },
          resources: {
            title: 'Resources',
            items: [
              { label: 'FAQ', href: getRoute('/faq') },
            ],
          },
          legal: {
            title: 'Legal',
            items: [
              { label: 'Privacy Policy', href: getRoute('/privacy') },
              { label: 'Terms of Service', href: getRoute('/terms') },
            ],
          },
        },
        copyright: `© ${currentYear} Ario Studio. All rights reserved.`,
      }

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  return (
    <footer className="relative bg-white border-t border-gray-100">
      <div className="container-custom py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  {isRTL ? 'آریو استودیو' : 'Ario Studio'}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {footerContent.description}
                </p>
                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600 hover:text-orange hover:bg-orange/5 transition-all duration-300"
                      >
                        <Icon size={18} />
                      </a>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerContent.links).map(([key, category], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  {category.title}
                </h4>
                <ul className="space-y-3">
                  {category.items.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-orange transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
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
            className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-gray-500 text-center md:text-left">
              {footerContent.copyright}
            </p>
            <p className="text-sm text-gray-500 text-center md:text-left">
              {footerContent.tagline}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

