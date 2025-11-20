'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

interface AboutProps {
  highlights?: any[] // Legacy prop, not used in new design
}

/**
 * About Section Component
 * 
 * Structure with 3 subsections:
 * 1. Section Title
 * 2. Intro Section (Hero About) - Professional short story
 * 3. Values Grid - 4 value cards
 * 4. Mission/Vision Block - Highlighted statements
 */
export default function About({ highlights: dbHighlights = [] }: AboutProps) {
  const t = useTranslation()
  const { language } = useLanguage()
  const isRTL = language === 'fa'

  // Section title
  const sectionTitle = isRTL ? 'درباره آریو استودیو' : 'About Ario Studio'

  return (
    <section
      id="about"
      className={`relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-base ${isRTL ? 'rtl' : ''}`}
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`text-center mb-16 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <h2 className="text-h1 font-semibold text-text-primary mb-4">
              {sectionTitle}
            </h2>
          </motion.div>

          {/* A) Intro Section (Hero About) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className={`mb-20 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <p className="text-body-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {t.about.intro}
            </p>
          </motion.div>

          {/* B) Values Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.about.values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="group h-full"
                >
                  <div className="bg-surface border border-gray-100 rounded-xl p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className={`text-h5 font-semibold text-text-primary mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {value.title}
                    </h3>
                    <p className={`text-body-sm text-text-secondary leading-relaxed flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* C) Mission / Vision Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="text-center"
          >
            <div className="max-w-3xl mx-auto">
              <p className={`text-h4 sm:text-h3 font-semibold text-text-primary leading-tight ${isRTL ? 'rtl:text-right' : ''}`}>
                {t.about.mission}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
