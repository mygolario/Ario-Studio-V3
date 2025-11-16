'use client'

import { motion } from 'framer-motion'
import { Award, Users, Globe, Zap } from 'lucide-react'

export default function About() {
  const stats = [
    { icon: Award, value: '150+', label: 'Projects Delivered' },
    { icon: Users, value: '50+', label: 'Happy Clients' },
    { icon: Globe, value: '12', label: 'Countries Served' },
    { icon: Zap, value: '10+', label: 'Years Experience' },
  ]

  const values = [
    {
      title: 'Innovation First',
      description: 'We stay ahead of trends and embrace emerging technologies to deliver cutting-edge solutions.',
    },
    {
      title: 'Client Partnership',
      description: 'Your success is our success. We work as an extension of your team, deeply invested in your goals.',
    },
    {
      title: 'Quality Obsessed',
      description: 'We sweat the details. Every interaction, every pixel, every line of code is crafted to perfection.',
    },
    {
      title: 'Transparent Process',
      description: 'No surprises, no hidden agendas. Clear communication and honest collaboration at every step.',
    },
  ]

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 lg:py-40 bg-charcoal/50"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-h1 font-display font-bold text-text-primary mb-6">
            About Ario Studio
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            We are a global creative studio dedicated to elevating brands through 
            exceptional design, strategic thinking, and flawless execution.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-electric-blue/10 rounded-large flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-electric-blue" size={32} />
                </div>
                <div className="text-h2 font-display font-bold text-text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-body-sm text-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-surface-elevated p-8 rounded-large border border-border-subtle hover:border-electric-blue/50 transition-all duration-300"
            >
              <h3 className="text-h4 font-display font-bold text-text-primary mb-4">
                {value.title}
              </h3>
              <p className="text-body text-text-secondary">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

