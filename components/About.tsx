'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Award, Users, Globe, Zap, Network, Cpu, Layers, Sparkles } from 'lucide-react'

export default function About() {
  const stats = [
    { icon: Award, value: 150, suffix: '+', label: 'Projects Delivered', color: 'neon-cyan' },
    { icon: Users, value: 50, suffix: '+', label: 'Happy Clients', color: 'electric-magenta' },
    { icon: Globe, value: 12, suffix: '', label: 'Countries Served', color: 'laser-green' },
    { icon: Zap, value: 10, suffix: '+', label: 'Years Experience', color: 'amber-pulse' },
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

  const colorClasses: Record<string, string> = {
    'neon-cyan': 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
    'electric-magenta': 'bg-electric-magenta/10 text-electric-magenta border-electric-magenta/20',
    'laser-green': 'bg-laser-green/10 text-laser-green border-laser-green/20',
    'amber-pulse': 'bg-amber-pulse/10 text-amber-pulse border-amber-pulse/20',
  }

  function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

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

    return (
      <div ref={ref} className="text-h2 font-display font-bold mb-2">
        <span className={`bg-gradient-to-r ${color === 'neon-cyan' ? 'from-neon-cyan to-electric-magenta' : color === 'electric-magenta' ? 'from-electric-magenta to-neon-cyan' : color === 'laser-green' ? 'from-laser-green to-neon-cyan' : 'from-amber-pulse to-laser-green'} bg-clip-text text-transparent`}>
          {count}{suffix}
        </span>
      </div>
    )
  }

  return (
    <section
      id="about"
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-slate/30 to-void-black" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,245,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container-custom relative z-10">
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
            className="inline-block text-label text-neon-cyan uppercase tracking-wider mb-6"
          >
            About Us
          </motion.span>
          <h2 className="text-h1 font-display font-bold text-text-primary mb-8">
            A Studio That Thinks
            <br />
            <span className="bg-gradient-to-r from-neon-cyan via-electric-magenta to-laser-green bg-clip-text text-transparent">
              In Systems
            </span>
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
            const colors = colorClasses[stat.color]
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
                  className={`w-16 h-16 ${colors.split(' ')[0]} rounded-large flex items-center justify-center mx-auto mb-4 border ${colors.split(' ')[2]} transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon size={32} />
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
                className="group relative bg-surface-elevated p-8 rounded-large border border-border-subtle hover:border-neon-cyan/50 transition-all duration-500 hover:shadow-glow overflow-hidden"
                whileHover={{ y: -8 }}
              >
                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-magenta/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10 w-14 h-14 bg-neon-cyan/10 text-neon-cyan rounded-large flex items-center justify-center mb-6 border border-neon-cyan/20">
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
      </div>
    </section>
  )
}
