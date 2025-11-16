'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Award, Users, Globe, Zap, Network, Cpu, Layers, Sparkles } from 'lucide-react'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  const stats = [
    { icon: Award, value: 150, suffix: '+', label: 'Projects Delivered', color: 'ai-amber' },
    { icon: Users, value: 50, suffix: '+', label: 'Happy Clients', color: 'ai-gold' },
    { icon: Globe, value: 12, suffix: '', label: 'Countries Served', color: 'ai-coral' },
    { icon: Zap, value: 10, suffix: '+', label: 'Years Experience', color: 'ai-sky' },
  ]

  const values = [
    {
      icon: Network,
      title: 'Systems Thinking',
      description: 'We design interconnected experiences that work as living ecosystems, not isolated components.',
    },
    {
      icon: Cpu,
      title: 'Intelligent Design',
      description: 'Every decision is data-informed and strategically aligned, creating solutions that evolve with your needs.',
    },
    {
      icon: Layers,
      title: 'Layered Excellence',
      description: 'From strategy to execution, we build experiences with depth, nuance, and intentional complexity.',
    },
    {
      icon: Sparkles,
      title: 'Creative Innovation',
      description: 'We push boundaries while maintaining clarity, balancing bold creativity with practical intelligence.',
    },
  ]

  function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
    const [count, setCount] = useState(0)
    const counterRef = useRef(null)
    const isInView = useInView(counterRef, { once: true, margin: '-50px' })

    useEffect(() => {
      if (!isInView) return
      
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, [isInView, value])

    const gradientMap: Record<string, string> = {
      'ai-amber': 'from-ai-amber to-ai-gold',
      'ai-gold': 'from-ai-gold to-ai-coral',
      'ai-coral': 'from-ai-coral to-ai-amber',
      'ai-sky': 'from-ai-sky to-ai-lavender',
    }

    return (
      <div ref={counterRef} className="text-h2 font-display font-bold mb-2">
        <span className={`bg-gradient-to-r ${gradientMap[color]} bg-clip-text text-transparent`}>
          {count}{suffix}
        </span>
      </div>
    )
  }

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Scene Background - Warm Neutral with Accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-pure-white via-warm-gray-50 to-pure-white">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] opacity-12"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,66,0.2) 0%, rgba(255,184,77,0.15) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 8,
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
              About Us
            </motion.span>
            <h2 className="text-h1 font-display font-bold text-text-primary mb-8">
              Studio Identity
            </h2>
            <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              We are a global creative studio dedicated to elevating brands through 
              exceptional design, strategic thinking, and flawless execution. Every project 
              is a living system designed to evolve.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group text-center"
                >
                  <motion.div
                    className={`w-16 h-16 rounded-large flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                      stat.color === 'ai-amber' ? 'bg-ai-amber/10 border-ai-amber/20' :
                      stat.color === 'ai-gold' ? 'bg-ai-gold/10 border-ai-gold/20' :
                      stat.color === 'ai-coral' ? 'bg-ai-coral/10 border-ai-coral/20' :
                      'bg-ai-sky/10 border-ai-sky/20'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className={
                      stat.color === 'ai-amber' ? 'text-ai-amber' :
                      stat.color === 'ai-gold' ? 'text-ai-gold' :
                      stat.color === 'ai-coral' ? 'text-ai-coral' :
                      'text-ai-sky'
                    } size={32} />
                  </motion.div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} color={stat.color} />
                  <div className="text-body-sm text-text-secondary">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-surface-elevated p-8 rounded-large border border-border-subtle hover:border-ai-amber/50 transition-all duration-500 hover:shadow-warm overflow-hidden"
                  whileHover={{ y: -8 }}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-ai-amber/5 via-transparent to-ai-gold/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10 w-14 h-14 bg-ai-amber/10 text-ai-amber rounded-large flex items-center justify-center mb-6 border border-ai-amber/20">
                    <Icon size={28} />
                  </div>
                  <h3 className="relative z-10 text-h4 font-display font-bold text-text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="relative z-10 text-body text-text-secondary">
                    {value.description}
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
