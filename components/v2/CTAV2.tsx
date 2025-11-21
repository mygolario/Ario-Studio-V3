'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { homepageV2FA } from '@/content/homepage-v2.fa'
import { homepageV2EN } from '@/content/homepage-v2.en'

/**
 * CTA Section V2
 */
export default function CTAV2() {
  const { language } = useLanguage()
  const content = language === 'fa' ? homepageV2FA : homepageV2EN

  return (
    <section id="contact" className="py-32 px-8">
      <div className="container mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-[32px] p-24 text-center overflow-hidden"
        >
          {/* Rotating Gradient Background */}
          <div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-rotate-gradient"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <h2 className="text-[4rem] font-[900] mb-6 text-white tracking-[-0.02em]">
              {content.cta.title}
            </h2>
            <p className="text-[1.35rem] mb-12 text-white/90 max-w-[700px] mx-auto">
              {content.cta.subtitle}
            </p>
            <a
              href={language === 'fa' ? '/start-project' : '/en/start-project'}
              className="inline-flex items-center gap-4 px-12 py-6 bg-white text-[#FF6B35] rounded-2xl font-extrabold text-lg no-underline transition-all duration-400 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
            >
              <span>{content.cta.button}</span>
              <span>→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

