'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageV2FA } from '@/content/homepage-v2.fa'
import { homepageV2EN } from '@/content/homepage-v2.en'

/**
 * Services Section V2
 */
export default function ServicesV2() {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const content = language === 'fa' ? homepageV2FA : homepageV2EN

  return (
    <section id="services" className="py-32 px-8">
      <div className="container mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full text-[#FF6B35] text-xs font-semibold uppercase tracking-wider mb-6">
            {content.services.label}
          </div>
          <h2 className="text-[4rem] font-[900] mb-6 tracking-[-0.02em]">{content.services.title}</h2>
          <p className="text-xl text-[#a0a0a0] max-w-[700px] mx-auto">{content.services.subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.services.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/2 border border-white/10 rounded-3xl p-12 transition-all duration-400 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#FFA552] scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
              <div className="w-15 h-15 bg-gradient-to-br from-[#FF6B35]/20 to-[#FFA552]/10 rounded-2xl flex items-center justify-center mb-8 text-3xl">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-[#a0a0a0] leading-relaxed mb-8">{service.description}</p>
              <ul className="list-none mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 mb-3 text-[#c0c0c0] text-sm">
                    <span className="text-[#FF6B35] font-bold">→</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="text-[#FF6B35] font-semibold no-underline inline-flex items-center gap-2 hover:gap-3 transition-all"
              >
                Learn More →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

