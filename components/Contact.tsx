'use client'

import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import ProjectRequestForm from './ProjectRequestForm'

/**
 * Contact Section
 * 
 * Full-screen modal style form for project requests.
 */
export default function Contact() {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const lang = language === 'fa' ? 'fa' : 'en'

  return (
    <section
      id="contact"
      className={`relative min-h-screen flex items-center justify-center py-16 sm:py-24 lg:py-32 overflow-hidden ${isRTL ? 'rtl' : ''}`}
    >
      {/* Semi-dark overlay */}
      <div className="fixed inset-0 bg-black/60 z-0" />

      {/* Form container - centered modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg mx-auto px-4"
      >
        <div className="bg-surface border border-border-subtle rounded-2xl shadow-2xl p-8 md:p-12">
          <ProjectRequestForm lang={lang} />
        </div>
      </motion.div>
    </section>
  )
}
