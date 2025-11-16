'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Sparkles, Target, Zap } from 'lucide-react'

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

  const principles = [
    {
      icon: Brain,
      title: 'Intelligent Design',
      description: 'Every decision is backed by data, insight, and strategic thinking. We design with purpose.',
      color: 'ai-amber',
    },
    {
      icon: Sparkles,
      title: 'Creative Excellence',
      description: 'We push boundaries while maintaining clarity. Bold creativity balanced with practical intelligence.',
      color: 'ai-gold',
    },
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'Every pixel, every interaction, every moment serves a clear purpose in the user journey.',
      color: 'ai-coral',
    },
    {
      icon: Zap,
      title: 'Living Systems',
      description: 'Our designs evolve. They adapt, respond, and grow—creating experiences that feel alive.',
      color: 'ai-sky',
    },
  ]

  const colorClasses: Record<string, string> = {
    'ai-amber': 'bg-ai-amber/10 text-ai-amber border-ai-amber/20',
    'ai-gold': 'bg-ai-gold/10 text-ai-gold border-ai-gold/20',
    'ai-coral': 'bg-ai-coral/10 text-ai-coral border-ai-coral/20',
    'ai-sky': 'bg-ai-sky/10 text-ai-sky border-ai-sky/20',
  }

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Scene Background - Soft Blue-Purple Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pure-white via-warm-gray-50 to-pure-white">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(74,144,226,0.3) 0%, rgba(155,126,222,0.2) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.25, 0.2],
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
              className="inline-block text-label text-ai-amber uppercase tracking-wider mb-6"
            >
              Our Philosophy
            </motion.span>
            <h2 className="text-h1 font-display font-bold text-text-primary mb-8">
              How We Think
            </h2>
            <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              At Ario Studio, we believe exceptional design is born from the perfect 
              marriage of creativity and intelligence. We don&apos;t just create beautiful 
              things—we craft experiences that resonate, inspire, and evolve.
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
                  className="group relative bg-surface-elevated p-8 rounded-large border border-border-subtle hover:border-ai-amber/50 transition-all duration-500 hover:shadow-warm overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-ai-amber/5 via-transparent to-ai-gold/5 opacity-0 group-hover:opacity-100"
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
            <div className="relative bg-gradient-to-r from-ai-amber/10 via-ai-gold/10 to-ai-coral/10 rounded-xlarge p-12 md:p-16 border border-ai-amber/20 overflow-hidden">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-ai-amber/5 via-ai-gold/5 to-ai-coral/5"
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

