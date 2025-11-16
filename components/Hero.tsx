'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Living Background Gradient - Warm AI Amber/Gold/Coral */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-gray-50 via-pure-white to-warm-gray-50">
        {/* Animated gradient orb */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,66,0.4) 0%, rgba(255,184,77,0.3) 50%, rgba(255,107,107,0.2) 100%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Secondary warm gradient */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,184,77,0.3) 0%, rgba(255,140,66,0.2) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Subtle AI pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,140,66,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,66,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-10"
          >
            <motion.h1
              className="text-[64px] leading-[72px] md:text-[80px] md:leading-[88px] lg:text-[96px] lg:leading-[104px] font-display font-bold text-text-primary mb-8"
            >
              Welcome to
              <br />
              <span className="relative inline-block">
                <motion.span
                  className="bg-gradient-to-r from-ai-amber via-ai-gold to-ai-coral bg-clip-text text-transparent bg-[length:200%_100%]"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  Ario Studio
                </motion.span>
                <motion.span
                  className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-ai-amber via-ai-gold to-ai-coral opacity-40 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-body-lg md:text-xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We design experiences that evolve. A warm, intelligent creative studio 
            crafting living systems for brands that want to grow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="#contact"
              className="group relative px-10 py-5 bg-gradient-to-r from-ai-amber to-ai-gold text-pure-white font-display font-bold text-lg rounded-large overflow-hidden shadow-warm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Start Your Project</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-ai-gold to-ai-coral opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#portfolio"
              className="px-10 py-5 border-2 border-ai-amber/30 text-text-primary font-display font-bold text-lg rounded-large hover:border-ai-amber hover:bg-ai-amber/5 hover:shadow-warm transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Work
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.a
          href="#philosophy"
          className="flex flex-col items-center gap-3 text-text-secondary hover:text-ai-amber transition-colors group"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-label uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={20} className="text-ai-amber group-hover:text-ai-coral transition-colors" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  )
}
