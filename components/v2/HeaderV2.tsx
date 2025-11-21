'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageV2FA } from '@/content/homepage-v2.fa'
import { homepageV2EN } from '@/content/homepage-v2.en'
import { Menu, X } from 'lucide-react'

/**
 * Header V2 - Dark Theme Navigation
 * 
 * Fixed navigation with blur effect on scroll
 */
export default function HeaderV2() {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isRTL = language === 'fa'
  const isEN = pathname.startsWith('/en')
  const localePrefix = isEN ? '/en' : ''
  const content = language === 'fa' ? homepageV2FA : homepageV2EN

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLanguageToggle = (lang: 'fa' | 'en') => {
    setLanguage(lang)
    if (lang === 'en' && !pathname.startsWith('/en')) {
      router.push(`/en${pathname}`)
    } else if (lang === 'fa' && pathname.startsWith('/en')) {
      router.push(pathname.replace('/en', '') || '/')
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-400 ${
        isScrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-[20px] py-4 border-b border-[#FF6B35]/10'
          : 'py-6'
      }`}
    >
      <div className="container mx-auto px-8 max-w-[1400px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href={localePrefix || '/'}
            className="text-[1.75rem] font-[900] bg-gradient-to-br from-[#FF6B35] to-[#FFA552] bg-clip-text text-transparent no-underline tracking-[-0.02em]"
          >
            ARIO
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-12 list-none">
            <li>
              <button
                onClick={() => scrollToSection('services')}
                className="text-[#a0a0a0] no-underline font-medium text-[0.95rem] relative transition-colors duration-300 hover:text-[#FF6B35] after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FF6B35] after:to-[#FFA552] after:transition-all after:duration-300 hover:after:w-full"
              >
                {content.nav.services}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('process')}
                className="text-[#a0a0a0] no-underline font-medium text-[0.95rem] relative transition-colors duration-300 hover:text-[#FF6B35] after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FF6B35] after:to-[#FFA552] after:transition-all after:duration-300 hover:after:w-full"
              >
                {content.nav.process}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('work')}
                className="text-[#a0a0a0] no-underline font-medium text-[0.95rem] relative transition-colors duration-300 hover:text-[#FF6B35] after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FF6B35] after:to-[#FFA552] after:transition-all after:duration-300 hover:after:w-full"
              >
                {content.nav.work}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-[#a0a0a0] no-underline font-medium text-[0.95rem] relative transition-colors duration-300 hover:text-[#FF6B35] after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FF6B35] after:to-[#FFA552] after:transition-all after:duration-300 hover:after:w-full"
              >
                {content.nav.contact}
              </button>
            </li>
          </ul>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-6">
            <div className="flex gap-1 bg-white/5 p-2 rounded-xl border border-white/10">
              <button
                onClick={() => handleLanguageToggle('en')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white'
                    : 'bg-transparent text-[#a0a0a0] hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageToggle('fa')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  language === 'fa'
                    ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white'
                    : 'bg-transparent text-[#a0a0a0] hover:text-white'
                }`}
              >
                FA
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white text-2xl bg-transparent border-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-white/10 pt-6">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-[#a0a0a0] hover:text-[#FF6B35] transition-colors"
                >
                  {content.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('process')}
                  className="text-[#a0a0a0] hover:text-[#FF6B35] transition-colors"
                >
                  {content.nav.process}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('work')}
                  className="text-[#a0a0a0] hover:text-[#FF6B35] transition-colors"
                >
                  {content.nav.work}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-[#a0a0a0] hover:text-[#FF6B35] transition-colors"
                >
                  {content.nav.contact}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

