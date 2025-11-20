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
 * Redesigned with 3 subsections:
 * 1. Intro Section (Hero About) - Professional short story
 * 2. Values Grid - 3-4 value cards
 * 3. Mission/Vision Block - Highlighted statements
 */
export default function About({ highlights: dbHighlights = [] }: AboutProps) {
  const t = useTranslation()
  const { language } = useLanguage()
  const isRTL = language === 'fa'

  return (
    <section
      id="about"
      className={`relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-base ${isRTL ? 'rtl' : ''}`}
    >
      {/* Geometric Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Very faint grid / mesh background */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            color: '#000',
          }}
        />

        {/* Soft pastel orange gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F87449]/5 via-transparent to-[#F7693A]/3 opacity-40" />

        {/* AI-coded geometric patterns - thin node-lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal lines */}
          <line x1="0" y1="20%" x2="100%" y2="18%" stroke="#F87449" strokeWidth="0.5" />
          <line x1="0" y1="50%" x2="100%" y2="52%" stroke="#F7693A" strokeWidth="0.5" />
          <line x1="0" y1="80%" x2="100%" y2="78%" stroke="#F87449" strokeWidth="0.5" />
          
          {/* Vertical lines */}
          <line x1="15%" y1="0" x2="17%" y2="100%" stroke="#F87449" strokeWidth="0.5" />
          <line x1="50%" y1="0" x2="48%" y2="100%" stroke="#F7693A" strokeWidth="0.5" />
          <line x1="85%" y1="0" x2="83%" y2="100%" stroke="#F87449" strokeWidth="0.5" />
          
          {/* Diagonal curves */}
          <path
            d="M 10% 30% Q 30% 20%, 50% 30% T 90% 30%"
            stroke="#F87449"
            strokeWidth="0.5"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M 10% 70% Q 30% 80%, 50% 70% T 90% 70%"
            stroke="#F7693A"
            strokeWidth="0.5"
            fill="none"
            opacity="0.4"
          />
          
          {/* Connection points / dots */}
          <circle cx="15%" cy="20%" r="1.5" fill="#F87449" opacity="0.3" />
          <circle cx="50%" cy="50%" r="1.5" fill="#F7693A" opacity="0.3" />
          <circle cx="85%" cy="80%" r="1.5" fill="#F87449" opacity="0.3" />
          <circle cx="30%" cy="60%" r="1" fill="#F7693A" opacity="0.25" />
          <circle cx="70%" cy="40%" r="1" fill="#F87449" opacity="0.25" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* A) Intro Section (Hero About) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`text-center mb-16 sm:mb-20 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <p className="text-body-lg sm:text-body-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {t.about.intro}
            </p>
          </motion.div>

          {/* B) Values Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="mb-16 sm:mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.about.values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="group h-full"
                >
                  <div className="bg-surface border border-gray-100 rounded-xl p-6 h-full shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-h5 font-semibold text-text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary leading-relaxed">
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
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className={`text-center ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <div className="max-w-3xl mx-auto">
              <p className="text-h4 sm:text-h3 font-semibold text-text-primary leading-tight">
                {t.about.mission}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
