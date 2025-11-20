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
 * Displays the 5-step process in a cinematic, AI-inspired layout with neon glow effects.
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
      className={`relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-base ${isRTL ? 'rtl' : ''}`}
    >
      {/* Animated gradient background line behind cards */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-px opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) 20%, rgba(139, 92, 246, 0.5) 50%, rgba(59, 130, 246, 0.5) 80%, transparent 100%)',
            transform: 'translateY(-50%)',
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`text-center mb-20 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <h2 className="text-h1 font-semibold text-text-primary mb-4">
              {sectionHeader.title}
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {sectionHeader.subtitle}
            </p>
          </motion.div>

          {/* Process Steps Grid */}
          {/* Desktop: 5 columns - smooth horizontal layout */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: index * 0.1,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group h-full"
              >
                <div className="relative h-full flex flex-col rounded-2xl p-7 sm:p-8 backdrop-blur-sm bg-surface/95 border border-border-subtle/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Subtle glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                  
                  {/* Neon glow border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(139, 92, 246, 0.15)',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Step Number - Bold, spaced, cinematic */}
                    <div className="mb-6">
                      <span 
                        className="text-4xl font-black tracking-wider"
                        style={{
                          background: isRTL 
                            ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                            : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          letterSpacing: isRTL ? '0.05em' : '0.1em',
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Title - 1-line, clean, modern */}
                    <h3 className="text-h5 font-semibold text-text-primary mb-4 leading-tight">
                      {step.title}
                    </h3>

                    {/* Description - shorter, elegant */}
                    <p className="text-body-sm text-text-secondary leading-relaxed flex-grow">
                      {step.description}
                    </p>
                  </div>

                  {/* Depth shadow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tablet: 2-column grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: index * 0.1,
                }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group h-full"
              >
                <div className="relative h-full flex flex-col rounded-2xl p-6 backdrop-blur-sm bg-surface/95 border border-border-subtle/50 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Subtle glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                  
                  {/* Neon glow border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)',
                      boxShadow: '0 0 15px rgba(59, 130, 246, 0.15), 0 0 30px rgba(139, 92, 246, 0.1)',
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-5">
                      <span 
                        className="text-3xl font-black tracking-wider"
                        style={{
                          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          letterSpacing: isRTL ? '0.05em' : '0.1em',
                        }}
                      >
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-h5 font-semibold text-text-primary mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary leading-relaxed flex-grow">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Stacked, still cinematic */}
          <div className="md:hidden space-y-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <div className="relative rounded-2xl p-6 backdrop-blur-sm bg-surface/95 border border-border-subtle/50 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Subtle glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                  
                  {/* Neon glow border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                      boxShadow: '0 0 10px rgba(59, 130, 246, 0.1)',
                    }}
                  />

                  <div className="relative z-10">
                    <div className="mb-4">
                      <span 
                        className="text-3xl font-black tracking-wider"
                        style={{
                          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          letterSpacing: isRTL ? '0.05em' : '0.1em',
                        }}
                      >
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-h5 font-semibold text-text-primary mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
