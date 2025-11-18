'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Instagram, Github } from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'

export default function Footer() {
  const t = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  const footerLinks = {
    [t.footerLinks.company]: [
      { label: t.footerLinks.about, href: '#about' },
      { label: t.footerLinks.services, href: '#services' },
      { label: t.footerLinks.portfolio, href: '#portfolio' },
      { label: t.footerLinks.contact, href: '#contact' },
    ],
    [t.footerLinks.resources]: [
      { label: t.footerLinks.blog, href: '#' },
      { label: t.footerLinks.caseStudies, href: '#portfolio' },
      { label: t.footerLinks.careers, href: '#' },
      { label: t.footerLinks.pressKit, href: '#' },
    ],
    [t.footerLinks.legal]: [
      { label: t.footerLinks.privacyPolicy, href: '#' },
      { label: t.footerLinks.termsOfService, href: '#' },
      { label: t.footerLinks.cookiePolicy, href: '#' },
    ],
  }

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
                  Ario Studio
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
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <div className="relative">
                <h4 className="text-h6 font-semibold text-text-primary mb-4 relative z-10">
                  {category}
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
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-body-sm text-text-secondary hover:text-orange transition-colors relative inline-block group/link"
                      whileHover={{ x: 2 }}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ transformOrigin: 'var(--dir, left)' }}
                      />
                    </motion.a>
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
          className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-body-sm text-text-muted text-center md:text-left">
            © {currentYear} Ario Studio. {t.common.allRightsReserved}.
          </p>
          <p className="text-body-sm text-text-muted text-center md:text-right">
            {t.footer.tagline}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
