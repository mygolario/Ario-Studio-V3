'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageFA } from '@/content/homepage.fa'
import { homepageEN } from '@/content/homepage.en'
import { ArrowRight } from 'lucide-react'

/**
 * Services Section - Service Cards Grid
 * 
 * Grid of service cards with tag, title, description, duration, price, and CTA.
 */
export default function Services() {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const content = language === 'fa' ? homepageFA : homepageEN

  return (
    <section
      id="services"
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
            className={`text-center mb-16 ${isRTL ? 'rtl:text-right' : ''}`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {content.services.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {content.services.subtitle}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.services.items.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-orange/30 transition-all duration-300"
              >
                {/* Tag */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-orange bg-orange/10 rounded-full border border-orange/20">
                    {service.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-orange transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Duration & Price */}
                <div className={`flex items-center gap-4 mb-6 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{service.duration}</span>
                  <span>•</span>
                  <span>{service.price}</span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    const element = document.getElementById('cta')
                    if (element) {
                      const headerHeight = 80
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - headerHeight
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                      })
                    }
                  }}
                  className={`flex items-center gap-2 text-orange font-medium hover:gap-3 transition-all duration-300 ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}
                >
                  {service.cta}
                  <ArrowRight
                    className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`}
                    strokeWidth={2}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

