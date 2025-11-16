'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, Calendar, ArrowRight } from 'lucide-react'

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-charcoal/50 to-void-black">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, rgba(255,0,245,0.3) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-label text-neon-cyan uppercase tracking-wider mb-6"
            >
              Get In Touch
            </motion.span>
            <h2 className="text-h1 md:text-[72px] md:leading-[80px] font-display font-bold text-text-primary mb-8">
              Let&apos;s Build Something
              <br />
              <span className="bg-gradient-to-r from-neon-cyan via-electric-magenta to-laser-green bg-clip-text text-transparent">
                That Evolves
              </span>
            </h2>
            <p className="text-body-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Ready to create an experience that grows with your brand? 
              Get in touch and let&apos;s discuss how we can bring your vision to life.
            </p>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {[
              {
                icon: Mail,
                title: 'Email Us',
                description: 'hello@ariostudio.com',
                href: 'mailto:hello@ariostudio.com',
                color: 'neon-cyan',
              },
              {
                icon: MessageCircle,
                title: 'Start a Chat',
                description: 'Quick conversation',
                href: '#',
                color: 'electric-magenta',
              },
              {
                icon: Calendar,
                title: 'Book a Call',
                description: 'Schedule a meeting',
                href: '#',
                color: 'laser-green',
              },
            ].map((option, index) => {
              const Icon = option.icon
              const colorClasses: Record<string, string> = {
                'neon-cyan': 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20 hover:bg-neon-cyan/20',
                'electric-magenta': 'bg-electric-magenta/10 text-electric-magenta border-electric-magenta/20 hover:bg-electric-magenta/20',
                'laser-green': 'bg-laser-green/10 text-laser-green border-laser-green/20 hover:bg-laser-green/20',
              }
              const colors = colorClasses[option.color]
              
              return (
                <motion.a
                  key={option.title}
                  href={option.href}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative bg-surface-elevated p-8 rounded-large border ${colors.split(' ')[2]} hover:shadow-glow transition-all duration-500 text-center overflow-hidden`}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 ${colors.split(' ')[0]} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className={`relative z-10 w-14 h-14 ${colors.split(' ')[0]} rounded-large flex items-center justify-center mx-auto mb-4 border ${colors.split(' ')[2]} transition-all duration-300 group-hover:scale-110`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="relative z-10 text-h5 font-display font-bold text-text-primary mb-2">
                    {option.title}
                  </h3>
                  <p className="relative z-10 text-body-sm text-text-secondary">
                    {option.description}
                  </p>
                </motion.a>
              )
            })}
          </motion.div>

          {/* Main CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <motion.a
              href="mailto:hello@ariostudio.com"
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-neon-cyan via-electric-magenta to-neon-cyan text-void-black font-display font-bold text-xl rounded-large overflow-hidden"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get Started Today</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowRight size={24} />
              </motion.div>
              
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-electric-magenta via-neon-cyan to-electric-magenta opacity-0 group-hover:opacity-100"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 shadow-glow-hover opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
