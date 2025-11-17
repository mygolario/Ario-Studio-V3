'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import AnimatedGradientBackground from './AnimatedGradientBackground'
import FeatureIcon3D from './FeatureIcon3D'

export default function DesignEthos() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  const pillars = [
    {
      icon: 'cube' as const,
      title: 'Cinematic First',
      description: 'Every interaction is a scene. We design experiences that feel like moving through a carefully crafted film.',
    },
    {
      icon: 'brain' as const,
      title: 'AI-Native Logic',
      description: 'Intelligent systems that adapt and learn. We build with AI agents that enhance user experiences.',
    },
    {
      icon: 'chart' as const,
      title: 'Real Business Outcomes',
      description: 'Beautiful design that drives results. Every pixel serves a purpose in achieving your goals.',
    },
  ]

  return (
    <section
      id="design-ethos"
      ref={ref}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Animated Gradient Background - Toned Down */}
      <AnimatedGradientBackground variant="section" intensity="low" />
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-pure-white/80 pointer-events-none z-10" />

      <div className="container-custom relative z-20">
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
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-label text-sunset-orange uppercase tracking-wider mb-6 font-medium"
            >
              Design Ethos
            </motion.span>
            <h2 className="text-h1 font-bold text-text-primary mb-8">
              How We Design
            </h2>
            <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              We blend cinematic visuals, AI-driven systems, and product thinking to design 
              experiences that actually move people.
            </p>
          </motion.div>

          {/* Pillars Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative bg-surface-elevated p-8 rounded-xlarge border border-border-subtle hover:border-sunset-orange/50 transition-all duration-500 hover:shadow-warm overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-sunset-soft opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon */}
                <div className="relative z-10 flex justify-center mb-6">
                  <FeatureIcon3D variant={pillar.icon} size="lg" />
                </div>
                
                <h3 className="relative z-10 text-h4 font-bold text-text-primary mb-4 text-center">
                  {pillar.title}
                </h3>
                <p className="relative z-10 text-body text-text-secondary text-center">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Central Animated Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <motion.div
              className="relative w-64 h-64 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Gradient orb */}
              <div className="absolute inset-0 rounded-full bg-gradient-sunset-radial opacity-20 blur-3xl" />
              
              {/* Network pattern overlay */}
              <div className="absolute inset-0 rounded-full border-2 border-sunset-orange/20" />
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, transparent 40%, rgba(255,106,61,0.1) 100%)',
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

