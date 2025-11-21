'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageV2FA } from '@/content/homepage-v2.fa'
import { homepageV2EN } from '@/content/homepage-v2.en'

/**
 * Showcase/Work Section V2
 */
export default function ShowcaseV2() {
  const { language } = useLanguage()
  const content = language === 'fa' ? homepageV2FA : homepageV2EN

  return (
    <section
      id="work"
      className="py-32 px-8 bg-gradient-to-b from-transparent via-[#FF6B35]/5 to-transparent"
    >
      <div className="container mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full text-[#FF6B35] text-xs font-semibold uppercase tracking-wider mb-6">
            {content.work.label}
          </div>
          <h2 className="text-[4rem] font-[900] mb-6 tracking-[-0.02em]">{content.work.title}</h2>
          <p className="text-xl text-[#a0a0a0] max-w-[700px] mx-auto">{content.work.subtitle}</p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.work.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="aspect-[16/10] bg-white/3 border border-white/10 rounded-3xl overflow-hidden relative cursor-pointer transition-all duration-400 hover:border-[#FF6B35]/50 hover:shadow-[0_30px_80px_rgba(255,107,53,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-transparent to-transparent flex flex-col justify-end p-10">
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <div className="text-[#FF6B35] text-sm font-semibold uppercase tracking-wider">
                  {item.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

