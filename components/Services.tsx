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
      color: 'electric-blue',
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      color: 'violet',
    },
    {
      icon: Smartphone,
      title: 'UI/UX Design',
      description: 'User-centered design that creates intuitive, beautiful, and effective digital experiences.',
      color: 'amber',
    },
    {
      icon: BarChart3,
      title: 'Digital Strategy',
      description: 'Data-driven strategies that align design with business objectives and user needs.',
      color: 'emerald',
    },
    {
      icon: Video,
      title: 'Motion Design',
      description: 'Cinematic animations and motion graphics that bring your brand to life.',
      color: 'electric-blue',
    },
    {
      icon: PenTool,
      title: 'Creative Direction',
      description: 'End-to-end creative direction for campaigns, launches, and brand transformations.',
      color: 'violet',
    },
  ]

  const colorMap: Record<string, string> = {
    'electric-blue': 'bg-electric-blue/10 text-electric-blue border-electric-blue/20',
    'violet': 'bg-violet/10 text-violet border-violet/20',
    'amber': 'bg-amber/10 text-amber border-amber/20',
    'emerald': 'bg-emerald/10 text-emerald border-emerald/20',
  }

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 lg:py-40"
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
            Our Services
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            We offer a comprehensive suite of creative services to help your brand 
            stand out and achieve its goals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const colorClasses = colorMap[service.color] || colorMap['electric-blue']
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-surface-elevated p-8 rounded-large border border-border-subtle hover:border-electric-blue/50 transition-all duration-300 hover:shadow-glow cursor-pointer"
                whileHover={{ y: -4 }}
              >
                <div className={`w-14 h-14 ${colorClasses.split(' ')[0]} rounded-large flex items-center justify-center mb-6 border ${colorClasses.split(' ')[2]}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-h4 font-display font-bold text-text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-body text-text-secondary">
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

