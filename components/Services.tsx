'use client'

import { motion } from 'framer-motion'
import { Palette, Code, Zap } from 'lucide-react'

export default function Services() {
  const serviceGroups = [
    {
      icon: Palette,
      title: 'Design',
      items: [
        'Clean UI/UX systems',
        'Brand identity & visual frameworks',
        'High-clarity interface layouts',
      ],
    },
    {
      icon: Code,
      title: 'Build',
      items: [
        'Next.js engineering',
        'Performance & SEO standards',
        'Reliable, scalable architecture',
      ],
    },
    {
      icon: Zap,
      title: 'Automate',
      items: [
        'AI workflows & integrations',
        'Custom automation agents',
        'System intelligence setup',
      ],
    },
  ]

  return (
    <section
      id="services"
      className="relative py-32 overflow-hidden bg-pure-white"
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
              Our Services
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Comprehensive solutions from design to deployment, built for long-term success.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {serviceGroups.map((group, index) => {
              const Icon = group.icon
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-pure-white border border-border-subtle rounded-xl p-8 hover:shadow-card transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center mb-6 group-hover:border-orange transition-colors">
                    <Icon size={28} className="text-text-secondary group-hover:text-orange transition-colors" />
                  </div>
                  <h3 className="text-h4 font-semibold text-text-primary mb-6">
                    {group.title}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-orange mt-1.5">•</span>
                        <span className="text-body text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
