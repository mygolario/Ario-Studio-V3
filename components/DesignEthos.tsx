'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { processSteps } from '@/content/processSteps'
import type { ProcessStep } from '@/content/processSteps'

interface DesignEthosProps {
  processSteps?: any[] // Legacy prop for database steps (optional)
}

/**
 * Process Section Component
 * 
 * Displays the 5-step process in a cinematic, minimal layout.
 * Uses centralized config from content/processSteps.ts
 */
export default function DesignEthos({ processSteps: dbSteps = [] }: DesignEthosProps) {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const currentLang = language as 'fa' | 'en'

  // Use database steps if provided, otherwise fallback to centralized config
  // Database steps override the config file when available
  const steps: Array<{
    id: number | string
    number: string
    title: string
    description: string
  }> = (dbSteps.length > 0 ? dbSteps : processSteps).map((step: any, index: number) => {
    const stepNumber = String(index + 1).padStart(2, '0')
    // Use Persian numerals for FA, English for EN
    const localizedNumber = isRTL 
      ? stepNumber.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])
      : stepNumber

    // Database steps have simple title/description strings (not localized)
    // Config steps have title: { fa: string; en: string } structure
    const isDbStep = dbSteps.length > 0
    const title = isDbStep ? step.title : step.title[currentLang]
    const description = isDbStep ? step.description : step.description[currentLang]
    const id = isDbStep ? step.id : step.id

    return {
      id,
      number: localizedNumber,
      title,
      description,
    }
  })

  // Localized section header
  const sectionHeader = isRTL
    ? {
        title: 'فرآیند ما',
        subtitle: 'مراحل ساخت یک تجربه دیجیتالی حرفه‌ای برای کسب‌وکار شما.',
      }
    : {
        title: 'Our process',
        subtitle: 'How we design and build high-quality digital experiences.',
      }

  return (
    <section
      id="process"
      className={`relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-base ${isRTL ? 'rtl' : ''}`}
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`text-center mb-16 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <h2 className="text-h1 font-semibold text-text-primary mb-4">
              {sectionHeader.title}
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {sectionHeader.subtitle}
            </p>
          </motion.div>

          {/* Process Steps Grid */}
          {/* Desktop: 5 columns */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className="group h-full"
              >
                <div className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-7 h-full flex flex-col hover:shadow-lg hover:border-orange/30 transition-all duration-300">
                  {/* Step Number */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-text-primary opacity-90">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-h5 font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body text-text-secondary leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet: 1 column vertical stack */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <div className="bg-surface border border-border-subtle rounded-xl p-6 hover:shadow-md hover:border-orange/30 transition-all duration-300">
                  {/* Step Number */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-text-primary opacity-90">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-h5 font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
