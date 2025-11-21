'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageV2FA } from '@/content/homepage-v2.fa'
import { homepageV2EN } from '@/content/homepage-v2.en'

/**
 * Process Section V2
 */
export default function ProcessV2() {
  const { language } = useLanguage()
  const isRTL = language === 'fa'
  const content = language === 'fa' ? homepageV2FA : homepageV2EN

  return (
    <section id="process" className="py-32 px-8">
      <div className="container mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full text-[#FF6B35] text-xs font-semibold uppercase tracking-wider mb-6">
            {content.process.label}
          </div>
          <h2 className="text-[4rem] font-[900] mb-6 tracking-[-0.02em]">{content.process.title}</h2>
          <p className="text-xl text-[#a0a0a0] max-w-[700px] mx-auto">{content.process.subtitle}</p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {content.process.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ x: isRTL ? -10 : 10 }}
              className="relative p-10 bg-white/2 border border-white/10 rounded-2xl transition-all duration-400 hover:bg-white/5 hover:border-[#FF6B35]/30"
            >
              <div className="absolute -top-5 left-10 w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-xl flex items-center justify-center text-xl font-[900] text-white">
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4">{step.title}</h3>
              <p className="text-[#a0a0a0] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

