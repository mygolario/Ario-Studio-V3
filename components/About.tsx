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
      {/* Background Visual Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
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

        {/* Soft orange-peach gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F87449]/8 via-transparent to-[#F7693A]/5 opacity-50" />
        
        {/* Additional subtle radial gradient blobs */}
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(248, 116, 73, 0.15) 0%, rgba(247, 105, 58, 0.1) 50%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 hidden md:block"
          style={{
            background: 'radial-gradient(circle, rgba(247, 105, 58, 0.12) 0%, rgba(248, 116, 73, 0.08) 50%, transparent 70%)',
            transform: 'translate(-30%, 30%)',
          }}
        />

        {/* AI-coded geometric patterns - thin node-lines and dots */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] hidden md:block"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal lines */}
          <line x1="0" y1="25%" x2="100%" y2="23%" stroke="#F87449" strokeWidth="0.5" />
          <line x1="0" y1="55%" x2="100%" y2="57%" stroke="#F7693A" strokeWidth="0.5" />
          <line x1="0" y1="85%" x2="100%" y2="83%" stroke="#F87449" strokeWidth="0.5" />
          
          {/* Vertical lines */}
          <line x1="20%" y1="0" x2="22%" y2="100%" stroke="#F87449" strokeWidth="0.5" />
          <line x1="50%" y1="0" x2="48%" y2="100%" stroke="#F7693A" strokeWidth="0.5" />
          <line x1="80%" y1="0" x2="78%" y2="100%" stroke="#F87449" strokeWidth="0.5" />
          
          {/* Subtle diagonal curves */}
          <path
            d="M 15% 35% Q 35% 25%, 55% 35% T 95% 35%"
            stroke="#F87449"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M 5% 75% Q 25% 85%, 45% 75% T 85% 75%"
            stroke="#F7693A"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
          
          {/* Connection points / dots */}
          <circle cx="20%" cy="25%" r="1.5" fill="#F87449" opacity="0.25" />
          <circle cx="50%" cy="55%" r="1.5" fill="#F7693A" opacity="0.25" />
          <circle cx="80%" cy="85%" r="1.5" fill="#F87449" opacity="0.25" />
          <circle cx="35%" cy="65%" r="1" fill="#F7693A" opacity="0.2" />
          <circle cx="65%" cy="45%" r="1" fill="#F87449" opacity="0.2" />
        </svg>

        {/* Simplified geometry for mobile */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03] md:hidden"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#F87449" strokeWidth="0.5" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#F7693A" strokeWidth="0.5" />
          <circle cx="50%" cy="50%" r="1" fill="#F87449" opacity="0.2" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
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
