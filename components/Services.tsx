'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { 
  Palette, 
  Code, 
  Smartphone, 
  BarChart3, 
  Video, 
  PenTool 
} from 'lucide-react'

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  const services = [
    {
      icon: Palette,
      title: 'Brand Identity',
      description: 'Complete brand systems including logos, color palettes, typography, and brand guidelines.',
      color: 'ai-amber',
      gradient: 'from-ai-amber to-ai-gold',
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      color: 'ai-sky',
      gradient: 'from-ai-sky to-ai-lavender',
    },
    {
      icon: Smartphone,
      title: 'UI/UX Design',
      description: 'User-centered design that creates intuitive, beautiful, and effective digital experiences.',
      color: 'ai-coral',
      gradient: 'from-ai-coral to-ai-mint',
    },
    {
      icon: BarChart3,
      title: 'Digital Strategy',
      description: 'Data-driven strategies that align design with business objectives and user needs.',
      color: 'ai-gold',
      gradient: 'from-ai-gold to-ai-amber',
    },
    {
      icon: Video,
      title: 'Motion Design',
      description: 'Cinematic animations and motion graphics that bring your brand to life.',
      color: 'ai-lavender',
      gradient: 'from-ai-lavender to-ai-sky',
    },
    {
      icon: PenTool,
      title: 'Creative Direction',
      description: 'End-to-end creative direction for campaigns, launches, and brand transformations.',
      color: 'ai-mint',
      gradient: 'from-ai-mint to-ai-coral',
    },
  ]

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Scene Background - Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pure-white via-warm-gray-50 to-pure-white">
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,66,0.2) 0%, rgba(74,144,226,0.15) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
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
              className="inline-block text-label text-ai-amber uppercase tracking-wider mb-6"
            >
              Our Services
            </motion.span>
            <h2 className="text-h1 font-display font-bold text-text-primary mb-8">
              What We Offer
            </h2>
            <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              We offer a comprehensive suite of creative services designed to evolve with your needs. 
              Each capability is a living system, ready to adapt and grow.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-surface-elevated p-8 rounded-large border border-border-subtle hover:border-ai-amber/50 transition-all duration-500 hover:shadow-warm cursor-pointer overflow-hidden"
                  whileHover={{ y: -12, scale: 1.02 }}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5`}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-large opacity-0 group-hover:opacity-100"
                    style={{
                      background: service.color === 'ai-amber' 
                        ? 'linear-gradient(135deg, rgba(255,140,66,0.1), transparent)' 
                        : service.color === 'ai-sky'
                        ? 'linear-gradient(135deg, rgba(74,144,226,0.1), transparent)'
                        : service.color === 'ai-coral'
                        ? 'linear-gradient(135deg, rgba(255,107,107,0.1), transparent)'
                        : 'linear-gradient(135deg, rgba(255,184,77,0.1), transparent)',
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className={`relative z-10 w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-large flex items-center justify-center mb-6 shadow-warm transition-all duration-300 group-hover:scale-110`}>
                    <Icon className="text-pure-white" size={32} />
                  </div>
                  <h3 className="relative z-10 text-h4 font-display font-bold text-text-primary mb-4">
                    {service.title}
                  </h3>
                  <p className="relative z-10 text-body text-text-secondary">
                    {service.description}
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
