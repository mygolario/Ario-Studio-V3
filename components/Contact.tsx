'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, Calendar } from 'lucide-react'

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-h1 font-display font-bold text-text-primary mb-6">
              Let's Create Something Extraordinary
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Ready to elevate your brand? Get in touch and let's discuss how 
              we can bring your vision to life.
            </p>
          </motion.div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Mail,
                title: 'Email Us',
                description: 'hello@ariostudio.com',
                href: 'mailto:hello@ariostudio.com',
              },
              {
                icon: MessageCircle,
                title: 'Start a Chat',
                description: 'Quick conversation',
                href: '#',
              },
              {
                icon: Calendar,
                title: 'Book a Call',
                description: 'Schedule a meeting',
                href: '#',
              },
            ].map((option, index) => {
              const Icon = option.icon
              return (
                <motion.a
                  key={option.title}
                  href={option.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-surface-elevated p-6 rounded-large border border-border-subtle hover:border-electric-blue/50 hover:shadow-glow transition-all duration-300 text-center group"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 bg-electric-blue/10 rounded-medium flex items-center justify-center mx-auto mb-4 group-hover:bg-electric-blue/20 transition-colors">
                    <Icon className="text-electric-blue" size={24} />
                  </div>
                  <h3 className="text-h5 font-display font-bold text-text-primary mb-2">
                    {option.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary">
                    {option.description}
                  </p>
                </motion.a>
              )
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <motion.a
              href="mailto:hello@ariostudio.com"
              className="inline-block px-12 py-5 bg-gradient-to-r from-electric-blue to-violet text-text-primary font-display font-bold text-h5 rounded-medium hover:shadow-glow-hover transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Today
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

