'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageV2FA } from '@/content/homepage-v2.fa'
import { homepageV2EN } from '@/content/homepage-v2.en'

/**
 * Hero Section V2 - Dark Theme
 * 
 * Two-column layout with animated visual elements
 */
export default function HeroV2() {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const content = language === 'fa' ? homepageV2FA : homepageV2EN

  return (
    <section className="min-h-screen flex items-center py-32 px-8 relative">
      <div className="container mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`space-y-8 ${isRTL ? 'lg:text-right' : ''}`}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full text-[#FF6B35] text-sm font-semibold uppercase tracking-wider"
            >
              <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse-dot" />
              <span>{content.badge}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-[5.5rem] font-[900] leading-none mb-6 bg-gradient-to-b from-white to-[#a0a0a0] bg-clip-text text-transparent tracking-[-0.03em] ${
                isRTL ? 'font-iran' : ''
              }`}
            >
              {content.hero.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[1.35rem] text-[#a0a0a0] leading-relaxed max-w-[600px] mb-12"
            >
              {content.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
            >
              <a
                href="#contact"
                className="px-10 py-5 rounded-[14px] font-bold text-base bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white no-underline inline-flex items-center gap-3 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(255,107,53,0.5)] relative overflow-hidden group"
              >
                <span className="relative z-10">{content.hero.ctaPrimary}</span>
                <span className="relative z-10">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </a>
              <a
                href="#work"
                className="px-10 py-5 rounded-[14px] font-bold text-base bg-white/5 text-white border border-white/10 no-underline inline-flex items-center gap-3 transition-all duration-400 hover:bg-white/10 hover:border-[#FF6B35]/50"
              >
                {content.hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative h-[600px] hidden lg:block"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Orb Layers */}
              <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#FFA552]/10 border-2 border-[#FF6B35]/30 animate-orbit" />
              <div className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#FFA552]/10 border-2 border-[#FF6B35]/30 animate-orbit-reverse" />
              <div className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#FFA552]/10 border-2 border-[#FF6B35]/30 animate-orbit" />

              {/* Core Shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-gradient-to-br from-[#FF6B35] to-[#FFA552] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] animate-morph-shape shadow-[0_0_80px_rgba(255,107,53,0.6)]" />

              {/* Particles */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#FF6B35] rounded-full animate-particle-float"
                  style={{
                    top: `${[20, 60, 80, 30][i]}%`,
                    left: `${[15, 80, 30, 70][i]}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

