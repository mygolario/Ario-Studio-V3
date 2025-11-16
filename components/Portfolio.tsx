'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  const projects = [
    {
      title: 'Luxury Fashion Brand',
      category: 'Brand Identity',
      description: 'Complete brand transformation for a high-end fashion label, including visual identity and digital presence.',
      gradient: 'from-ai-amber/20 via-ai-gold/20 to-ai-coral/20',
      tags: ['Branding', 'Web Design', 'Strategy'],
    },
    {
      title: 'Tech Startup Platform',
      category: 'Web Development',
      description: 'Modern SaaS platform with intuitive UX and powerful functionality for growing businesses.',
      gradient: 'from-ai-sky/20 via-ai-lavender/20 to-ai-sky/20',
      tags: ['Web App', 'UI/UX', 'Development'],
    },
    {
      title: 'Global E-Commerce',
      category: 'Digital Strategy',
      description: 'End-to-end digital transformation for an international retail brand, driving 300% growth.',
      gradient: 'from-ai-coral/20 via-ai-mint/20 to-ai-coral/20',
      tags: ['Strategy', 'Design', 'E-commerce'],
    },
    {
      title: 'Creative Agency Rebrand',
      category: 'Brand Identity',
      description: 'Bold new identity system that reflects the agency&apos;s innovative approach and creative vision.',
      gradient: 'from-ai-gold/20 via-ai-amber/20 to-ai-gold/20',
      tags: ['Branding', 'Motion', 'Identity'],
    },
    {
      title: 'Healthcare Innovation',
      category: 'UI/UX Design',
      description: 'Patient-centered digital experience that simplifies complex healthcare information and processes.',
      gradient: 'from-ai-lavender/20 via-ai-sky/20 to-ai-lavender/20',
      tags: ['UX Design', 'Healthcare', 'Accessibility'],
    },
    {
      title: 'Financial Services App',
      category: 'Web Development',
      description: 'Secure, elegant mobile-first application for managing investments and financial planning.',
      gradient: 'from-ai-mint/20 via-ai-coral/20 to-ai-mint/20',
      tags: ['Mobile App', 'FinTech', 'Design'],
    },
  ]

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Scene Background - Dynamic Multi-Color */}
      <div className="absolute inset-0 bg-gradient-to-b from-pure-white via-warm-gray-50 to-pure-white">
        <motion.div
          className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full blur-[120px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,66,0.2) 0%, rgba(74,144,226,0.15) 50%, rgba(255,107,107,0.1) 100%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
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
              className="inline-block text-label text-ai-amber uppercase tracking-wider mb-6"
            >
              Our Work
            </motion.span>
            <h2 className="text-h1 font-display font-bold text-text-primary mb-8">
              Portfolio
            </h2>
            <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of transformative projects that have helped 
              brands achieve their goals and stand out in their markets.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-surface-elevated rounded-xlarge border border-border-subtle hover:border-ai-amber/50 overflow-hidden transition-all duration-500 hover:shadow-warm cursor-pointer"
                whileHover={{ y: -12, scale: 1.02 }}
              >
                {/* Image Placeholder with animated gradient */}
                <div className={`h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-warm-gray-800/60 via-warm-gray-800/20 to-transparent"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.4 }}
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
                    <span className="text-label text-ai-amber uppercase tracking-wider font-medium bg-pure-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <h3 className="text-h4 font-display font-bold text-text-primary mb-3 group-hover:text-ai-amber transition-colors">
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
                        className="text-label text-text-tertiary bg-warm-gray-100 border border-border-subtle px-3 py-1 rounded-full group-hover:border-ai-amber/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-ai-amber group-hover:gap-3 transition-all">
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
                  className="absolute inset-0 rounded-xlarge opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 60px rgba(255, 140, 66, 0.08)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
