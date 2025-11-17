'use client'

import { motion } from 'framer-motion'
import { Palette, Code, Zap } from 'lucide-react'

export default function Services() {
  const serviceGroups = [
    {
      id: 'ai-native-product-websites',
      icon: Palette,
      title: 'AI-Native Product Websites',
      description: 'Full-stack experiences with AI at the core',
      items: [
        'Cinematic marketing sites',
        'Agent-integrated product pages',
        'Launch-ready frontends',
      ],
    },
    {
      id: 'mvps-dashboards',
      icon: Code,
      title: 'MVPs & Dashboards',
      description: 'Fast validation and internal tools',
      items: [
        'Early-stage MVP & landing pages',
        'Agent-ready internal dashboards',
        'Fast validation builds',
      ],
    },
    {
      id: 'long-term-design-systems',
      icon: Zap,
      title: 'Long-term Design Systems',
      description: 'Ongoing design partnerships',
      items: [
        'UI/UX systems & motion direction',
        'Ongoing design partnerships',
        'Strategic design support',
      ],
    },
  ]

  return (
    <section
      id="services"
      className="relative py-32 overflow-hidden bg-pure-white dark:bg-slate-900"
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
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
              <h2 className="text-h1 font-semibold text-text-primary dark:text-slate-100 mb-4">
                Our Services
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
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
                  id={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-pure-white dark:bg-slate-800 border border-border-subtle dark:border-slate-700 rounded-xl p-8 hover:shadow-card dark:hover:shadow-lg dark:hover:shadow-black/20 transition-all duration-300 scroll-mt-24"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-14 h-14 rounded-xl border border-gray-200 dark:border-slate-600 flex items-center justify-center mb-6 group-hover:border-orange transition-colors">
                    <Icon size={28} className="text-text-secondary dark:text-slate-300 group-hover:text-orange transition-colors" />
                  </div>
                  <h3 className="text-h4 font-semibold text-text-primary dark:text-slate-100 mb-2">
                    {group.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary dark:text-slate-300 mb-6">
                    {group.description}
                  </p>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-orange mt-1.5">•</span>
                        <span className="text-body text-text-secondary dark:text-slate-300">{item}</span>
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
