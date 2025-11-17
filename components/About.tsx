'use client'

import { motion } from 'framer-motion'
import { Award, Users, Workflow, TrendingUp } from 'lucide-react'

export default function About() {
  const stats = [
    {
      icon: Award,
      title: 'High-quality engineering standards',
      description: 'Code that stands the test of time.',
    },
    {
      icon: Users,
      title: '8+ years combined experience',
      description: 'Proven track record of delivery.',
    },
    {
      icon: Workflow,
      title: 'Structured, efficient workflow',
      description: 'Clear processes from start to finish.',
    },
    {
      icon: TrendingUp,
      title: 'Long-term, scalable solutions',
      description: 'Built to grow with your business.',
    },
  ]

  return (
    <section
      id="about"
      className="relative py-32 overflow-hidden bg-gray-50"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-h1 font-semibold text-text-primary mb-6">
              About Ario Studio
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              We combine modern design, precise engineering and streamlined workflows to deliver clean and reliable digital products.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-xl border border-gray-200 flex items-center justify-center mx-auto mb-4 bg-pure-white">
                    <Icon size={28} className="text-text-secondary" />
                  </div>
                  <h3 className="text-h5 font-semibold text-text-primary mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary">
                    {stat.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Optional Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="relative w-full h-64 bg-gray-200 rounded-xl overflow-hidden">
              {/* Placeholder for professional photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-text-muted text-sm">Professional workspace photo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
