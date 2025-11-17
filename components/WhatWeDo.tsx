'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import AnimatedGradientBackground from './AnimatedGradientBackground'
import FeatureIcon3D from './FeatureIcon3D'
import Button from './Button'

/**
 * What We Do Section
 * 
 * To add/edit service items:
 * - Add new objects to the `services` array (line ~20)
 * - Each service needs: title, description, icon variant, gradient
 * - Icon variants: 'brain', 'cube', 'graph', 'chart', 'stack', 'orbit'
 * 
 * To adjust animations:
 * - Card entrance: Modify delay values in staggerChildren (line ~80)
 * - Hover effects: Adjust rotateX/rotateY values in whileHover (line ~120)
 * - Micro line animation: Change duration in animate props (line ~150)
 */
export default function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [150, 0])

  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const services = [
    {
      title: 'AI-Native Product Websites',
      description: 'Full-stack web experiences built with AI agents at the core. Interactive, intelligent, and ready to scale.',
      icon: 'brain' as const,
      gradient: 'from-sunset-orange to-sunset-gold',
      detail: 'We integrate AI agents directly into your product architecture, creating websites that learn, adapt, and respond intelligently to user behavior.',
    },
    {
      title: 'MVP & Landing Pages for Early-Stage Startups',
      description: 'Ship fast, ship beautiful. Cinematic landing pages and MVPs that convert visitors into customers from day one.',
      icon: 'cube' as const,
      gradient: 'from-sunset-gold to-sunset-yellow',
      detail: 'From concept to launch in weeks, not months. We build high-converting landing pages and functional MVPs that validate your idea and attract investors.',
    },
    {
      title: 'Agent-Ready Dashboards & Internal Tools',
      description: 'Internal tools that feel premium. Dashboards designed for AI agents to operate autonomously and efficiently.',
      icon: 'graph' as const,
      gradient: 'from-sunset-red to-sunset-orange',
      detail: 'Build internal tools that your AI agents can navigate and operate. Beautiful, functional dashboards that enhance productivity and decision-making.',
    },
    {
      title: 'Ongoing Design Systems & Motion Direction',
      description: 'Evolving design systems that grow with your product. Continuous motion direction and design refinement.',
      icon: 'chart' as const,
      gradient: 'from-sunset-yellow to-sunset-gold',
      detail: 'Long-term design partnerships. We maintain and evolve your design system, ensuring consistency and innovation as your product scales.',
    },
  ]

  return (
    <section
      id="what-we-do"
      ref={ref}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground variant="section" intensity="medium" />
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-pure-white/70 pointer-events-none z-10" />

      <div className="container-custom relative z-20">
        <motion.div
          style={{ opacity, y }}
          className="max-w-7xl mx-auto"
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
              What We Do
            </motion.span>
            <h2 className="text-h1 font-bold text-text-primary mb-8">
              From AI-Native MVPs to Fully Cinematic Product Sites
            </h2>
            <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              We ship experiences that feel alive. Every project is built with cinematic visuals, 
              AI-driven intelligence, and product thinking that drives real results.
            </p>
          </motion.div>

          {/* Services Grid with Heavy Animations */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                },
              },
            }}
            className="grid md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 80,
                    scale: 0.9,
                    rotateX: -15,
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="group relative"
                onMouseEnter={() => setExpandedCard(index)}
                onMouseLeave={() => setExpandedCard(null)}
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  className="relative bg-surface-elevated p-10 rounded-xlarge border border-border-subtle overflow-hidden h-full"
                  whileHover={{
                    y: -16,
                    scale: 1.02,
                    rotateX: expandedCard === index ? 2 : 0,
                    rotateY: expandedCard === index ? -2 : 0,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    boxShadow: expandedCard === index
                      ? '0 20px 60px rgba(255, 106, 61, 0.2)'
                      : '0 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 rounded-xlarge`}
                    animate={{
                      opacity: expandedCard === index ? 0.2 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Micro animated line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-sunset"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: expandedCard === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: 'left' }}
                  />

                  {/* Icon with pulse animation */}
                  <div className="relative z-10 flex justify-center mb-6">
                    <motion.div
                      animate={{
                        scale: expandedCard === index ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: expandedCard === index ? Infinity : 0,
                      }}
                    >
                      <FeatureIcon3D variant={service.icon} size="lg" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-h3 font-bold text-text-primary mb-4 text-center group-hover:text-sunset-orange transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-body-lg text-text-secondary mb-4 text-center leading-relaxed">
                      {service.description}
                    </p>

                    {/* Expandable detail */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedCard === index ? 'auto' : 0,
                        opacity: expandedCard === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-body text-text-secondary mt-4 text-center">
                        {service.detail}
                      </p>
                    </motion.div>

                    {/* Hover indicator */}
                    <motion.div
                      className="flex justify-center mt-6"
                      animate={{
                        opacity: expandedCard === index ? 1 : 0,
                        y: expandedCard === index ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-gradient-sunset"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xlarge opacity-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, rgba(255, 106, 61, 0.1) 0%, transparent 70%)`,
                    }}
                    animate={{
                      opacity: expandedCard === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Button href="#contact" variant="primary">
              Start Your Project
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

