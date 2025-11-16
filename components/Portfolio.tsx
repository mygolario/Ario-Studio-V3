'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'

export default function Portfolio() {
  const projects = [
    {
      title: 'Luxury Fashion Brand',
      category: 'Brand Identity',
      description: 'Complete brand transformation for a high-end fashion label, including visual identity and digital presence.',
      image: 'bg-gradient-to-br from-electric-blue/20 to-violet/20',
      tags: ['Branding', 'Web Design', 'Strategy'],
    },
    {
      title: 'Tech Startup Platform',
      category: 'Web Development',
      description: 'Modern SaaS platform with intuitive UX and powerful functionality for growing businesses.',
      image: 'bg-gradient-to-br from-amber/20 to-electric-blue/20',
      tags: ['Web App', 'UI/UX', 'Development'],
    },
    {
      title: 'Global E-Commerce',
      category: 'Digital Strategy',
      description: 'End-to-end digital transformation for an international retail brand, driving 300% growth.',
      image: 'bg-gradient-to-br from-violet/20 to-emerald/20',
      tags: ['Strategy', 'Design', 'E-commerce'],
    },
    {
      title: 'Creative Agency Rebrand',
      category: 'Brand Identity',
      description: 'Bold new identity system that reflects the agency\'s innovative approach and creative vision.',
      image: 'bg-gradient-to-br from-emerald/20 to-electric-blue/20',
      tags: ['Branding', 'Motion', 'Identity'],
    },
    {
      title: 'Healthcare Innovation',
      category: 'UI/UX Design',
      description: 'Patient-centered digital experience that simplifies complex healthcare information and processes.',
      image: 'bg-gradient-to-br from-electric-blue/20 to-amber/20',
      tags: ['UX Design', 'Healthcare', 'Accessibility'],
    },
    {
      title: 'Financial Services App',
      category: 'Web Development',
      description: 'Secure, elegant mobile-first application for managing investments and financial planning.',
      image: 'bg-gradient-to-br from-violet/20 to-amber/20',
      tags: ['Mobile App', 'FinTech', 'Design'],
    },
  ]

  return (
    <section
      id="portfolio"
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
            Our Work
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Explore our portfolio of transformative projects that have helped 
            brands achieve their goals and stand out in their markets.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-surface-elevated rounded-large border border-border-subtle hover:border-electric-blue/50 overflow-hidden transition-all duration-300 hover:shadow-glow cursor-pointer"
              whileHover={{ y: -4 }}
            >
              {/* Image Placeholder */}
              <div className={`h-48 md:h-64 ${project.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-label text-text-secondary uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-h4 font-display font-bold text-text-primary mb-3">
                  {project.title}
                </h3>
                <p className="text-body-sm text-text-secondary mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-label text-text-tertiary bg-charcoal px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-electric-blue group-hover:gap-3 transition-all">
                  <span className="text-body-sm font-medium">View Case Study</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

