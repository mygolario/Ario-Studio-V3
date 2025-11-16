'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Portfolio() {
  const projects = [
    {
      title: 'Luxury Fashion Brand',
      category: 'Brand Identity',
      description: 'Complete brand transformation for a high-end fashion label, including visual identity and digital presence.',
      gradient: 'from-neon-cyan/30 via-electric-magenta/20 to-neon-cyan/30',
      tags: ['Branding', 'Web Design', 'Strategy'],
    },
    {
      title: 'Tech Startup Platform',
      category: 'Web Development',
      description: 'Modern SaaS platform with intuitive UX and powerful functionality for growing businesses.',
      gradient: 'from-amber-pulse/30 via-neon-cyan/20 to-amber-pulse/30',
      tags: ['Web App', 'UI/UX', 'Development'],
    },
    {
      title: 'Global E-Commerce',
      category: 'Digital Strategy',
      description: 'End-to-end digital transformation for an international retail brand, driving 300% growth.',
      gradient: 'from-electric-magenta/30 via-laser-green/20 to-electric-magenta/30',
      tags: ['Strategy', 'Design', 'E-commerce'],
    },
    {
      title: 'Creative Agency Rebrand',
      category: 'Brand Identity',
      description: 'Bold new identity system that reflects the agency&apos;s innovative approach and creative vision.',
      gradient: 'from-laser-green/30 via-neon-cyan/20 to-laser-green/30',
      tags: ['Branding', 'Motion', 'Identity'],
    },
    {
      title: 'Healthcare Innovation',
      category: 'UI/UX Design',
      description: 'Patient-centered digital experience that simplifies complex healthcare information and processes.',
      gradient: 'from-neon-cyan/30 via-amber-pulse/20 to-neon-cyan/30',
      tags: ['UX Design', 'Healthcare', 'Accessibility'],
    },
    {
      title: 'Financial Services App',
      category: 'Web Development',
      description: 'Secure, elegant mobile-first application for managing investments and financial planning.',
      gradient: 'from-electric-magenta/30 via-amber-pulse/20 to-electric-magenta/30',
      tags: ['Mobile App', 'FinTech', 'Design'],
    },
  ]

  return (
    <section
      id="portfolio"
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-slate/30 to-void-black" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-label text-neon-cyan uppercase tracking-wider mb-6"
          >
            Portfolio
          </motion.span>
          <h2 className="text-h1 font-display font-bold text-text-primary mb-8">
            Work That Lives
            <br />
            <span className="bg-gradient-to-r from-neon-cyan via-electric-magenta to-laser-green bg-clip-text text-transparent">
              And Breathes
            </span>
          </h2>
          <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of transformative projects that have helped 
            brands achieve their goals and stand out in their markets. Each project 
            is a living system designed to evolve.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-surface-elevated rounded-large border border-border-subtle hover:border-neon-cyan/50 overflow-hidden transition-all duration-500 hover:shadow-glow cursor-pointer"
              whileHover={{ y: -12, scale: 1.02 }}
            >
              {/* Image Placeholder with animated gradient */}
              <div className={`h-56 md:h-72 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/60 to-transparent"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 0.6 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100`}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />
                
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <span className="text-label text-neon-cyan uppercase tracking-wider font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                <h3 className="text-h4 font-display font-bold text-text-primary mb-3 group-hover:text-neon-cyan transition-colors">
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
                      className="text-label text-text-tertiary bg-charcoal/50 border border-border-subtle px-3 py-1 rounded-full group-hover:border-neon-cyan/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-neon-cyan group-hover:gap-3 transition-all">
                  <span className="text-body-sm font-medium">View Case Study</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-large opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(0, 245, 255, 0.1)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
