'use client'

import { motion } from 'framer-motion'
import Button from './Button'

/**
 * Hero Section
 * 
 * Minimal, professional hero with premium orange card.
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pure-white">
      {/* Subtle Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-custom relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* LEFT COLUMN - Text + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Main Heading */}
            <h1 className="text-hero md:text-[64px] md:leading-[72px] font-semibold text-text-primary">
              We Design, Build & Automate Modern Digital Experiences.
            </h1>

            {/* Subtext */}
            <p className="text-body-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
              A clean, structured, and trustworthy studio focused on clarity, performance, and long-term value.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button href="#contact" variant="primary">
                Start Your Project
              </Button>
              <Button href="#portfolio" variant="secondary" icon={false}>
                View Our Work
              </Button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Premium Orange Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Premium Orange Card */}
              <motion.div
                className="relative bg-gradient-orange rounded-2xl p-12 shadow-card"
                whileHover={{ 
                  scale: 1.01,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-full flex flex-col justify-between text-pure-white">
                  <div>
                    <div className="w-16 h-16 rounded-xl bg-pure-white/20 backdrop-blur-sm mb-6" />
                    <h3 className="text-2xl font-semibold mb-3">Ario Studio</h3>
                    <p className="text-base opacity-90 leading-relaxed">
                      Modern digital experiences built with precision and purpose.
                    </p>
                  </div>
                  <div className="flex gap-3 mt-8">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-2 rounded-full bg-pure-white/30"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
