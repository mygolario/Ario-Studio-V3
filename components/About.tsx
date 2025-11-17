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
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
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
            <div className="mb-6">
              <h2 className="text-h1 font-semibold text-text-primary mb-4">
                About Ario Studio
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
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
                  className="text-center relative group"
                >
                  {/* Subtle UI element - floating pill */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-orange/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 rounded-xl border border-gray-200 flex items-center justify-center mx-auto mb-4 bg-pure-white shadow-soft group-hover:shadow-card transition-all duration-300">
                    <Icon size={28} className="text-text-secondary group-hover:text-orange transition-colors" />
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
        </div>
      </div>
    </section>
  )
}
