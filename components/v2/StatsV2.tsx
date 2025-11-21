'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageV2FA } from '@/content/homepage-v2.fa'
import { homepageV2EN } from '@/content/homepage-v2.en'

/**
 * Stats Section V2
 */
export default function StatsV2() {
  const { language } = useLanguage()
  const content = language === 'fa' ? homepageV2FA : homepageV2EN

  return (
    <section className="py-20 border-t border-white/10 border-b border-white/10">
      <div className="container mx-auto px-8 max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {content.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-[3.5rem] font-[900] bg-gradient-to-br from-[#FF6B35] to-[#FFA552] bg-clip-text text-transparent mb-2">
                {stat.num}
              </div>
              <div className="text-[#a0a0a0] text-base uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

