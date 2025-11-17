'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Instagram, Github } from 'lucide-react'
import { Copy } from '@/content/copy'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  const footerLinks = {
    Company: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Contact', href: '#contact' },
    ],
    Resources: [
      { label: 'Blog', href: '#' },
      { label: 'Case Studies', href: '#portfolio' },
      { label: 'Careers', href: '#' },
      { label: 'Press Kit', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  }

  return (
    <footer className="relative border-t border-border-subtle bg-surface-alt">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'power3.out' }}
              className="relative"
            >
              <div className="relative">
                <h3 className="text-2xl font-semibold text-text-primary mb-4 relative z-10">
                  Ario Studio
                </h3>
                <motion.div
                  className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-orange/30 to-transparent opacity-50"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <p className="text-body-sm text-text-secondary mb-6">
                {Copy.footer.description}
              </p>
              {/* Social Links */}
              <div className="flex gap-4">
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
                  className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                        style={{ transformOrigin: 'left' }}
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
                      <p className="text-body-sm text-text-muted">
                        © {currentYear} Ario Studio. All rights reserved.
                      </p>
                      <p className="text-body-sm text-text-muted">
                        {Copy.footer.tagline}
                      </p>
        </motion.div>
      </div>
    </footer>
  )
}
