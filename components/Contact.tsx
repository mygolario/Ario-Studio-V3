'use client'

import { motion } from 'framer-motion'
import Button from './Button'

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden bg-pure-white dark:bg-slate-900"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-h1 font-semibold text-text-primary dark:text-slate-100 mb-4">
                Let&apos;s build something with long-term value.
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary dark:text-slate-300 leading-relaxed mb-8">
              Clear timelines, structured communication, and a professional workflow.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button href="mailto:hello@ariostudio.com" variant="primary" className="!px-12 !py-5">
                Start Your Project
              </Button>
            </div>

            {/* Email */}
            <div className="pt-4">
              <a
                href="mailto:hello@ariostudio.com"
                className="text-body-lg text-text-secondary dark:text-slate-300 hover:text-orange transition-colors"
              >
                hello@ariostudio.com
              </a>
            </div>

            {/* Note */}
            <p className="text-body-sm text-text-muted dark:text-slate-400 pt-2">
              We respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
