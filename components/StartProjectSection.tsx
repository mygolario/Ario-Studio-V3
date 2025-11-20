'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from './Button'

/**
 * Start Project Section - Final CTA
 * 
 * A clean, cinematic CTA section at the bottom of the homepage.
 * Pure CTA with text + buttons, no forms.
 */
export default function StartProjectSection() {
  const t = useTranslation()
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const lang = language === 'fa' ? 'fa' : 'en'

  // Route paths
  const primaryCtaLink = lang === 'fa' ? '/start-project' : '/en/start-project'
  const contactEmail = 'info@ariostudio.net'

  return (
    <section
      id="start-project"
      className={`relative py-24 sm:py-32 lg:py-40 overflow-hidden ${isRTL ? 'rtl' : ''}`}
    >
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#F87449]/8 via-[#F7693A]/5 to-transparent pointer-events-none" />
      
      {/* Additional subtle radial gradient blobs */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 pointer-events-none hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(248, 116, 73, 0.2) 0%, rgba(247, 105, 58, 0.1) 50%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 pointer-events-none hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(247, 105, 58, 0.15) 0%, rgba(248, 116, 73, 0.08) 50%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      {/* Subtle top border for separation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`text-center ${isRTL ? 'rtl:text-right' : ''}`}
          >
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="mb-4"
            >
              <span className="text-label text-orange uppercase tracking-wider font-medium">
                {t.startProject.label}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="text-h1 sm:text-[48px] lg:text-[56px] font-semibold text-text-primary mb-6 leading-tight"
            >
              {t.startProject.title}
            </motion.h2>

            {/* Section accent line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto mb-8"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="text-body-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12"
            >
              {t.startProject.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {/* Primary CTA */}
              <Button 
                href={primaryCtaLink} 
                variant="primary" 
                className="!px-10 !py-5 !text-lg"
              >
                {t.startProject.ctaPrimary}
              </Button>

              {/* Secondary CTA */}
              <Button 
                href={`mailto:${contactEmail}`} 
                variant="secondary" 
                icon={false}
                className="!px-10 !py-5 !text-lg"
              >
                {t.startProject.ctaSecondary}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
