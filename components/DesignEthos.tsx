'use client'

import { motion } from 'framer-motion'
import { Target, Code, Eye } from 'lucide-react'

export default function DesignEthos() {
  const features = [
    {
      icon: Target,
      title: 'Strategy-led approach',
      description: 'Every decision is informed by clear objectives and measurable outcomes.',
    },
    {
      icon: Code,
      title: 'Clean, structured engineering',
      description: 'Scalable architecture built with precision and maintainability in mind.',
    },
    {
      icon: Eye,
      title: 'Detail-oriented design',
      description: 'Thoughtful execution that elevates both form and function.',
    },
  ]

  return (
    <section
      id="philosophy"
      className="relative py-32 overflow-hidden bg-pure-white"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-h1 font-semibold text-text-primary mb-4">
                  Our Philosophy
                </h2>
                {/* Section accent line */}
                <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full" />
              </div>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                We focus on clarity, precision and thoughtful execution.  
                Everything we create is structured, scalable and purpose-driven.
              </p>
            </motion.div>

            {/* RIGHT COLUMN - Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-pure-white border border-border-subtle rounded-2xl p-6 hover:shadow-card transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center group-hover:border-orange transition-colors">
                        <Icon size={24} className="text-text-secondary group-hover:text-orange transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-h5 font-semibold text-text-primary mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-body text-text-secondary">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
