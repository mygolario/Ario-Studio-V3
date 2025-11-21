'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageFA } from '@/content/homepage.fa'
import { homepageEN } from '@/content/homepage.en'
import Button from '@/components/Button'
import { trackEvent } from '@/lib/analytics/trackEvent'

/**
 * CTA Section
 * 
 * Visually distinct block with gradient background, heading, subtitle, and CTAs.
 */
export default function CTA() {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const content = language === 'fa' ? homepageFA : homepageEN

  return (
    <section
      id="cta"
      className={`relative py-24 lg:py-32 overflow-hidden ${isRTL ? 'rtl' : ''}`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-white to-orange/5" />

      <div className="container-custom px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`text-center space-y-8 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
              {content.cta.title}
            </h2>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {content.cta.subtitle}
            </p>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button
                href={isRTL ? '/start-project' : '/en/start-project'}
                variant="primary"
                onClick={() => {
                  trackEvent('cta_click', {
                    location: 'cta_section',
                    lang: language,
                    ctaType: 'primary',
                  })
                }}
                className="px-8 py-4 text-lg"
              >
                {content.cta.ctaPrimary}
              </Button>
              <Button
                href={`mailto:info@ariostudio.net`}
                variant="secondary"
                onClick={() => {
                  trackEvent('cta_click', {
                    location: 'cta_section',
                    lang: language,
                    ctaType: 'secondary',
                  })
                }}
                className="px-8 py-4 text-lg"
              >
                {content.cta.ctaSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

