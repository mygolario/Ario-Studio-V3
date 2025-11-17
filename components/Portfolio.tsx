'use client'

import { motion } from 'framer-motion'

export default function Portfolio() {
  const projects = [
    {
      title: 'Tech Startup Platform',
      description: 'Modern SaaS platform with intuitive UX and powerful functionality.',
      tags: ['UI/UX', 'Web', 'Next.js'],
    },
    {
      title: 'E-Commerce Experience',
      description: 'Streamlined shopping experience with focus on conversion and performance.',
      tags: ['Web', 'E-commerce', 'Automation'],
    },
    {
      title: 'Brand Identity System',
      description: 'Complete visual identity and design system for growing company.',
      tags: ['Design', 'Branding', 'UI/UX'],
    },
    {
      title: 'Internal Dashboard',
      description: 'Custom dashboard for team productivity and data visualization.',
      tags: ['Web', 'Automation', 'Dashboard'],
    },
  ]

  return (
    <section
      id="portfolio"
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
              Our Work
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Selected projects showcasing clean design and reliable engineering.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-pure-white rounded-xl overflow-hidden border border-border-subtle hover:shadow-card-hover transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                {/* Image Placeholder */}
                <div className="relative h-64 bg-gray-200 overflow-hidden rounded-t-xl">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-text-muted text-sm">Project mockup</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-h4 font-semibold text-text-primary mb-3">
                    {project.title}
                  </h3>
                  <p className="text-body text-text-secondary mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-label text-text-muted bg-gray-50 border border-gray-200 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
