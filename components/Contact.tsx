'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Mail, MessageCircle, Calendar } from 'lucide-react'
import Button from './Button'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Scene Background - Warm Climax Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pure-white via-warm-gray-50 to-pure-white">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,66,0.4) 0%, rgba(255,107,107,0.3) 50%, rgba(255,184,77,0.2) 100%)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.35, 0.25],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="max-w-4xl mx-auto"
        >
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
              className="inline-block text-label text-ai-amber uppercase tracking-wider mb-6"
            >
              Get In Touch
            </motion.span>
            <h2 className="text-h1 md:text-[72px] md:leading-[80px] font-display font-bold text-text-primary mb-8">
              Let&apos;s Create
              <br />
              <span className="bg-gradient-to-r from-ai-amber via-ai-gold to-ai-coral bg-clip-text text-transparent">
                Something Together
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
                color: 'ai-amber',
                gradient: 'from-ai-amber to-ai-gold',
              },
              {
                icon: MessageCircle,
                title: 'Start a Chat',
                description: 'Quick conversation',
                href: '#',
                color: 'ai-coral',
                gradient: 'from-ai-coral to-ai-amber',
              },
              {
                icon: Calendar,
                title: 'Book a Call',
                description: 'Schedule a meeting',
                href: '#',
                color: 'ai-gold',
                gradient: 'from-ai-gold to-ai-coral',
              },
            ].map((option, index) => {
              const Icon = option.icon
              
              return (
                <motion.a
                  key={option.title}
                  href={option.href}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative bg-surface-elevated p-8 rounded-large border hover:shadow-warm transition-all duration-500 text-center overflow-hidden ${
                    option.color === 'ai-amber' ? 'border-ai-amber/20 hover:border-ai-amber/50' :
                    option.color === 'ai-coral' ? 'border-ai-coral/20 hover:border-ai-coral/50' :
                    'border-ai-gold/20 hover:border-ai-gold/50'
                  }`}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10`}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className={`relative z-10 w-14 h-14 bg-gradient-to-br ${option.gradient} rounded-large flex items-center justify-center mx-auto mb-4 shadow-warm transition-all duration-300 group-hover:scale-110`}>
                    <Icon className="text-pure-white" size={28} />
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
            <Button 
              href="mailto:hello@ariostudio.com" 
              variant="primary"
              className="!px-12 !py-6 !text-xl"
            >
              Get Started Today
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
