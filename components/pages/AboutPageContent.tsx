'use client'

import { motion } from 'framer-motion'
import { aboutFA } from '@/content/about.fa'
import { aboutEN } from '@/content/about.en'
import Button from '@/components/Button'
import { CheckCircle2 } from 'lucide-react'

interface AboutPageContentProps {
  lang: 'fa' | 'en'
}

export default function AboutPageContent({ lang }: AboutPageContentProps) {
  const isRTL = lang === 'fa'
  const content = lang === 'fa' ? aboutFA : aboutEN
  const localePrefix = lang === 'fa' ? '' : '/en'

  return (
    <>
      {/* Hero Section */}
      <section className={`relative pt-32 pb-20 px-4 sm:px-6 ${isRTL ? 'rtl' : ''}`}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 ${
                isRTL ? 'font-iran' : 'font-sans'
              }`}
            >
              {content.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              {content.hero.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : ''}`}
            >
              {content.mission.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="prose prose-lg max-w-none text-gray-600 space-y-4"
            >
              <p>{content.mission.description}</p>
              <p>{content.mission.paragraph}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-12 ${isRTL ? 'text-right' : ''}`}
            >
              {content.values.title}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.values.items.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 bg-white border border-gray-200 rounded-xl"
                >
                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle2 className="w-6 h-6 text-orange flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-base text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : ''}`}
            >
              {content.capabilities.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 mb-8"
            >
              {content.capabilities.description}
            </motion.p>
            <div className="space-y-6">
              {content.capabilities.items.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{capability.title}</h3>
                  <p className="text-base text-gray-600">{capability.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-orange/5 via-white to-orange/5">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              {content.cta.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 mb-8"
            >
              {content.cta.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button href={`${localePrefix}/start-project`} variant="primary" className="px-8 py-4 text-lg">
                {content.cta.button}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

