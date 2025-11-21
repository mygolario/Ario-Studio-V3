'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Lightbulb, Target, Zap } from 'lucide-react'

export default function Story() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [80, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

  const principles = [
    {
      icon: Sparkles,
      title: 'Creative Excellence',
      description: 'We push boundaries and challenge conventions to deliver work that stands out in a crowded marketplace.',
      color: 'neon-cyan',
    },
    {
      icon: Lightbulb,
      title: 'Strategic Intelligence',
      description: 'Every design decision is backed by research, insight, and a deep understanding of your business goals.',
      color: 'electric-magenta',
    },
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'We believe great design serves a purpose. Every pixel, every interaction, every moment is intentional.',
      color: 'laser-green',
    },
    {
      icon: Zap,
      title: 'Living Systems',
      description: 'Our designs evolve. They adapt, respond, and grow—creating experiences that feel alive, not static.',
      color: 'amber-pulse',
    },
  ]

  const colorClasses: Record<string, string> = {
    'neon-cyan': 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
    'electric-magenta': 'bg-electric-magenta/10 text-electric-magenta border-electric-magenta/20',
    'laser-green': 'bg-laser-green/10 text-laser-green border-laser-green/20',
    'amber-pulse': 'bg-amber-pulse/10 text-amber-pulse border-amber-pulse/20',
  }

  return (
    <section
      id="story"
      ref={ref}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-charcoal to-void-black" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)',
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          style={{ opacity, y, scale }}
          className="max-w-5xl mx-auto"
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
              className="inline-block text-label text-neon-cyan uppercase tracking-wider mb-6"
            >
              Our Philosophy
            </motion.span>
            <h2 className="text-h1 font-display font-bold text-text-primary mb-8">
              Where Intuition Meets
              <br />
              <span className="bg-gradient-to-r from-neon-cyan via-electric-magenta to-neon-cyan bg-clip-text text-transparent">
                Intelligence
              </span>
            </h2>
            <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              At Ario Studio, we believe that exceptional design is born from the 
              perfect marriage of creativity and strategy. We don&apos;t just create 
              beautiful things—we craft experiences that resonate, inspire, and drive results.
            </p>
          </motion.div>

          {/* Principles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              const colors = colorClasses[principle.color]
              
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative bg-surface-elevated p-8 rounded-large border border-border-subtle hover:border-neon-cyan/50 transition-all duration-500 hover:shadow-glow overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-magenta/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className={`relative z-10 w-14 h-14 ${colors.split(' ')[0]} rounded-large flex items-center justify-center mb-6 border ${colors.split(' ')[2]}`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="relative z-10 text-h4 font-display font-bold text-text-primary mb-4">
                    {principle.title}
                  </h3>
                  <p className="relative z-10 text-body text-text-secondary">
                    {principle.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-r from-neon-cyan/10 via-electric-magenta/10 to-neon-cyan/10 rounded-xlarge p-12 md:p-16 border border-neon-cyan/20 overflow-hidden">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-electric-magenta/5 to-neon-cyan/5"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
              
              <blockquote className="relative z-10 text-h3 md:text-[40px] font-serif text-text-primary text-center italic mb-6 leading-tight">
                &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
              </blockquote>
              <p className="relative z-10 text-body-lg text-text-secondary text-center">
                — Steve Jobs
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
