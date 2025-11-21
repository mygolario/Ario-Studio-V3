'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageFA } from '@/content/homepage.fa'
import { homepageEN } from '@/content/homepage.en'
import { Search, Palette, Code, Sparkles, Zap } from 'lucide-react'

/**
 * Process Section - Apple Feature Rows Style
 * 
 * Each step displayed as a feature row with step number, title, description,
 * and minimal abstract geometric visual on the opposite side.
 */
export default function Process() {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const content = language === 'fa' ? homepageFA : homepageEN

  const stepIcons = [Search, Palette, Code, Sparkles, Zap]

  return (
    <section
      id="process"
      className={`relative bg-white py-24 lg:py-32 ${isRTL ? 'rtl' : ''}`}
    >
      <div className="container-custom px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-center mb-20 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {content.process.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {content.process.subtitle}
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-0">
            {content.process.steps.map((step, index) => {
              const Icon = stepIcons[index] || Search
              const stepNumber = String(index + 1).padStart(2, '0')
              const localizedNumber = isRTL
                ? stepNumber.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])
                : stepNumber
              const isLast = index === content.process.steps.length - 1

              return (
                <div key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-16 py-16 lg:py-20 ${
                      isRTL ? 'xl:rtl:grid-cols-12' : ''
                    }`}
                  >
                    {/* Left/Right Column - Step Info */}
                    <div className={`xl:col-span-6 ${isRTL ? 'xl:rtl:col-span-6' : ''}`}>
                      <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {/* Step Number */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-orange">{localizedNumber}</span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="flex-1">
                          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
                            {step.title}
                          </h3>
                          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right/Left Column - Abstract Visual */}
                    <div className={`xl:col-span-6 ${isRTL ? 'xl:rtl:col-span-6' : ''}`}>
                      <div className="relative h-full min-h-[200px] flex items-center justify-center">
                        {/* Abstract Geometric Visual */}
                        <div className="relative w-full h-full">
                          {/* Background Circle */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange/5 rounded-full" />

                          {/* Icon Container */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white border border-orange/20 rounded-2xl flex items-center justify-center shadow-lg">
                            <Icon className="w-12 h-12 text-orange" strokeWidth={1} />
                          </div>

                          {/* Decorative Elements */}
                          <div className="absolute top-8 right-8 w-3 h-3 bg-orange/30 rounded-full" />
                          <div className="absolute bottom-8 left-8 w-2 h-2 bg-orange/20 rounded-full" />
                          {!isRTL && (
                            <>
                              <div className="absolute top-12 left-12 w-2 h-2 bg-orange/20 rounded-full" />
                              <div className="absolute bottom-12 right-12 w-3 h-3 bg-orange/30 rounded-full" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Divider */}
                  {!isLast && (
                    <div className="h-px bg-gray-200" style={{ backgroundColor: '#eaeaea' }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

