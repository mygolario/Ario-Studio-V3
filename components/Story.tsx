'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Lightbulb, Target } from 'lucide-react'

export default function Story() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  const principles = [
    {
      icon: Sparkles,
      title: 'Creative Excellence',
      description: 'We push boundaries and challenge conventions to deliver work that stands out in a crowded marketplace.',
    },
    {
      icon: Lightbulb,
      title: 'Strategic Thinking',
      description: 'Every design decision is backed by research, insight, and a deep understanding of your business goals.',
    },
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'We believe great design serves a purpose. Every pixel, every interaction, every moment is intentional.',
    },
  ]

  return (
    <section
      id="story"
      ref={ref}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="container-custom">
        <motion.div
          style={{ opacity, y }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-h1 font-display font-bold text-text-primary mb-6">
              Our Philosophy
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              At Ario Studio, we believe that exceptional design is born from the 
              perfect marriage of creativity and strategy. We don&apos;t just create 
              beautiful things—we craft experiences that resonate, inspire, and drive results.
            </p>
          </motion.div>

          {/* Principles Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-surface-elevated p-8 rounded-large border border-border-subtle hover:border-electric-blue/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-electric-blue/10 rounded-medium flex items-center justify-center mb-6">
                    <Icon className="text-electric-blue" size={24} />
                  </div>
                  <h3 className="text-h4 font-display font-bold text-text-primary mb-4">
                    {principle.title}
                  </h3>
                  <p className="text-body text-text-secondary">
                    {principle.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-electric-blue/10 via-violet/10 to-electric-blue/10 rounded-xlarge p-12 border border-electric-blue/20">
              <blockquote className="text-h3 font-serif text-text-primary text-center italic mb-6">
                &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
              </blockquote>
              <p className="text-body text-text-secondary text-center">
                — Steve Jobs
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

