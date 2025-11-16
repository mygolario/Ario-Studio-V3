'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 100 }
  const x = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig)
  const y = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const xPos = (e.clientX - rect.left) / rect.width
      const yPos = (e.clientY - rect.top) / rect.height
      mouseX.set(xPos)
      mouseY.set(yPos)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-void-black">
        {/* Animated gradient orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, rgba(255,0,245,0.3) 50%, transparent 70%)',
            x,
            y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Secondary gradient layer */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,136,0.3) 0%, transparent 60%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,245,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <motion.h1
              className="text-[56px] leading-[64px] md:text-[72px] md:leading-[80px] lg:text-[96px] lg:leading-[104px] font-display font-bold text-text-primary mb-6"
              style={{ x, y: useTransform(y, (val) => val * 0.5) }}
            >
              We Design
              <br />
              <span className="relative inline-block">
                <motion.span
                  className="bg-gradient-to-r from-neon-cyan via-electric-magenta to-neon-cyan bg-clip-text text-transparent bg-[length:200%_100%]"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  Experiences That Evolve
                </motion.span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-electric-magenta to-neon-cyan opacity-50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-body-lg md:text-xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            At Ario Studio, we craft living systems—digital experiences that breathe, 
            respond, and grow with your brand. Where intuition meets intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="#contact"
              className="group relative px-10 py-5 bg-gradient-to-r from-neon-cyan to-electric-magenta text-void-black font-display font-bold text-lg rounded-medium overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Start Your Project</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-electric-magenta to-neon-cyan opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 shadow-glow-hover opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#portfolio"
              className="px-10 py-5 border-2 border-neon-cyan/50 text-text-primary font-display font-bold text-lg rounded-medium hover:border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-glow transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Work
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.a
          href="#story"
          className="flex flex-col items-center gap-3 text-text-secondary hover:text-neon-cyan transition-colors group"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-label uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={20} className="text-neon-cyan group-hover:text-electric-magenta transition-colors" />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Ambient particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {typeof window !== 'undefined' && [...Array(20)].map((_, i) => {
          const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)
          const startY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)
          const endY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-20"
              initial={{
                x: startX,
                y: startY,
              }}
              animate={{
                y: [startY, endY, startY],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )
        })}
      </div>
    </section>
  )
}
