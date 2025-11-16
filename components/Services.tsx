'use client'

import { motion } from 'framer-motion'
import { 
  Palette, 
  Code, 
  Smartphone, 
  BarChart3, 
  Video, 
  PenTool 
} from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Palette,
      title: 'Brand Identity',
      description: 'Complete brand systems including logos, color palettes, typography, and brand guidelines.',
      color: 'neon-cyan',
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      color: 'electric-magenta',
    },
    {
      icon: Smartphone,
      title: 'UI/UX Design',
      description: 'User-centered design that creates intuitive, beautiful, and effective digital experiences.',
      color: 'laser-green',
    },
    {
      icon: BarChart3,
      title: 'Digital Strategy',
      description: 'Data-driven strategies that align design with business objectives and user needs.',
      color: 'amber-pulse',
    },
    {
      icon: Video,
      title: 'Motion Design',
      description: 'Cinematic animations and motion graphics that bring your brand to life.',
      color: 'neon-cyan',
    },
    {
      icon: PenTool,
      title: 'Creative Direction',
      description: 'End-to-end creative direction for campaigns, launches, and brand transformations.',
      color: 'electric-magenta',
    },
  ]

  const colorMap: Record<string, string> = {
    'neon-cyan': 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
    'electric-magenta': 'bg-electric-magenta/10 text-electric-magenta border-electric-magenta/20',
    'laser-green': 'bg-laser-green/10 text-laser-green border-laser-green/20',
    'amber-pulse': 'bg-amber-pulse/10 text-amber-pulse border-amber-pulse/20',
  }

  return (
    <section
      id="services"
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-charcoal/50 to-void-black" />

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
            Our Services
          </motion.span>
          <h2 className="text-h1 font-display font-bold text-text-primary mb-8">
            Capabilities That
            <br />
            <span className="bg-gradient-to-r from-neon-cyan via-electric-magenta to-laser-green bg-clip-text text-transparent">
              Adapt
            </span>
          </h2>
          <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We offer a comprehensive suite of creative services designed to evolve with your needs. 
            Each capability is a living system, ready to adapt and grow.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const colorClasses = colorMap[service.color] || colorMap['neon-cyan']
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-surface-elevated p-8 rounded-large border border-border-subtle hover:border-neon-cyan/50 transition-all duration-500 hover:shadow-glow cursor-pointer overflow-hidden"
                whileHover={{ y: -12, scale: 1.02 }}
              >
                {/* Hover gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color === 'neon-cyan' ? 'from-neon-cyan/10' : service.color === 'electric-magenta' ? 'from-electric-magenta/10' : service.color === 'laser-green' ? 'from-laser-green/10' : 'from-amber-pulse/10'} via-transparent to-transparent opacity-0 group-hover:opacity-100`}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-large opacity-0 group-hover:opacity-100"
                  style={{
                    background: service.color === 'neon-cyan' 
                      ? 'linear-gradient(135deg, rgba(0,245,255,0.2), transparent)' 
                      : service.color === 'electric-magenta'
                      ? 'linear-gradient(135deg, rgba(255,0,245,0.2), transparent)'
                      : service.color === 'laser-green'
                      ? 'linear-gradient(135deg, rgba(0,255,136,0.2), transparent)'
                      : 'linear-gradient(135deg, rgba(255,184,0,0.2), transparent)',
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className={`relative z-10 w-16 h-16 ${colorClasses.split(' ')[0]} rounded-large flex items-center justify-center mb-6 border ${colorClasses.split(' ')[2]} transition-all duration-300 group-hover:scale-110`}>
                  <Icon size={32} />
                </div>
                <h3 className="relative z-10 text-h4 font-display font-bold text-text-primary mb-4">
                  {service.title}
                </h3>
                <p className="relative z-10 text-body text-text-secondary">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
