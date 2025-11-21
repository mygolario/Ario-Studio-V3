'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { homepageV2FA } from '@/content/homepage-v2.fa'
import { homepageV2EN } from '@/content/homepage-v2.en'

/**
 * Footer V2 - Dark Theme
 */
export default function FooterV2() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const isRTL = language === 'fa'
  const isEN = pathname.startsWith('/en')
  const localePrefix = isEN ? '/en' : ''
  const content = language === 'fa' ? homepageV2FA : homepageV2EN

  const getRoute = (route: string) => `${localePrefix}${route}`

  const socialLinks = [
    { label: 'Twitter', icon: '𝕏' },
    { label: 'LinkedIn', icon: 'in' },
    { label: 'Instagram', icon: '📷' },
    { label: 'Dribbble', icon: '🏀' },
  ]

  return (
    <footer className="border-t border-white/10 py-20 px-8">
      <div className="container mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-[2rem] font-[900] bg-gradient-to-br from-[#FF6B35] to-[#FFA552] bg-clip-text text-transparent mb-4">
              ARIO
            </div>
            <p className="text-[#a0a0a0] leading-relaxed mb-8">{content.footer.tagline}</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-[10px] flex items-center justify-center text-[#a0a0a0] no-underline transition-all duration-300 hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#FFA552] hover:text-white hover:border-transparent hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">{content.footer.services.title}</h4>
            <ul className="list-none space-y-4">
              {content.footer.services.links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={getRoute('/services')}
                    className="text-[#a0a0a0] no-underline transition-colors duration-300 hover:text-[#FF6B35]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-6">{content.footer.company.title}</h4>
            <ul className="list-none space-y-4">
              {content.footer.company.links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={getRoute('/about')}
                    className="text-[#a0a0a0] no-underline transition-colors duration-300 hover:text-[#FF6B35]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold mb-6">{content.footer.legal.title}</h4>
            <ul className="list-none space-y-4">
              {content.footer.legal.links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={getRoute('/privacy')}
                    className="text-[#a0a0a0] no-underline transition-colors duration-300 hover:text-[#FF6B35]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 text-center text-[#6a6a6a] text-sm">
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

