'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Palette, Code, Zap } from 'lucide-react'

export default function Capabilities() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  const capabilities = [
    {
      icon: Palette,
      title: 'We Design',
      description: 'Beautiful, intuitive interfaces that users love. Every pixel crafted with intention and care.',
      gradient: 'from-sunset-orange to-sunset-gold',
      color: 'sunset-orange',
    },
    {
      icon: Code,
      title: 'We Build',
      description: 'Robust, scalable digital products. Modern tech stack, clean code, flawless execution.',
      gradient: 'from-sunset-gold to-sunset-yellow',
      color: 'sunset-gold',
    },
    {
      icon: Zap,
      title: 'We Automate',
      description: 'Intelligent systems that work for you. AI-enhanced workflows that evolve and adapt.',
      gradient: 'from-sunset-red to-sunset-orange',
      color: 'sunset-red',
    },
  ]

  return (
    <section
      id="capabilities"
      ref={ref}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Scene Background - Warm to Cool Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pure-white via-warm-gray-50 to-pure-white">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,66,0.25) 0%, rgba(74,144,226,0.2) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-label text-sunset-orange uppercase tracking-wider mb-6 font-medium"
            >
              Our Capabilities
            </motion.span>
            <h2 className="text-h1 font-display font-bold text-text-primary mb-8">
              What We Do
            </h2>
            <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Three core capabilities, one unified approach. We design, build, and automate 
              experiences that evolve with your brand.
            </p>
          </motion.div>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon
              
              return (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group relative bg-surface-elevated p-10 rounded-xlarge border border-border-subtle hover:border-sunset-orange/50 transition-all duration-500 hover:shadow-warm overflow-hidden"
                  whileHover={{ y: -12, scale: 1.02 }}
                >
                  {/* Gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-10`}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon */}
                  <div className={`relative z-10 w-20 h-20 bg-gradient-to-br ${capability.gradient} rounded-large flex items-center justify-center mb-6 shadow-warm`}>
                    <Icon className="text-pure-white" size={40} />
                  </div>
                  
                  <h3 className="relative z-10 text-h2 font-display font-bold text-text-primary mb-4">
                    {capability.title}
                  </h3>
                  <p className="relative z-10 text-body-lg text-text-secondary leading-relaxed">
                    {capability.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

