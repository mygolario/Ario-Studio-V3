'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageFA } from '@/content/homepage.fa'
import { homepageEN } from '@/content/homepage.en'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * About Preview Section
 * 
 * Short section with heading, description, bullet points, and link to full About page.
 */
export default function AboutPreview() {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const content = language === 'fa' ? homepageFA : homepageEN
  const localePrefix = language === 'fa' ? '' : '/en'

  return (
    <section
      id="about-preview"
      className={`relative bg-gray-50 py-24 lg:py-32 ${isRTL ? 'rtl' : ''}`}
    >
      <div className="container-custom px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              {content.about.title}
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {content.about.description}
            </p>

            {/* Values List */}
            <ul className="space-y-4">
              {content.about.values.map((value, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-orange mt-2" />
                  <span className="text-base text-gray-700">{value}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href={`${localePrefix}/about`}
                className={`inline-flex items-center gap-2 text-orange font-medium hover:gap-3 transition-all duration-300 ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}
              >
                {content.about.cta}
                <ArrowRight
                  className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`}
                  strokeWidth={2}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

