'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import AnimatedGradientBackground from './AnimatedGradientBackground'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 100 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const xPos = (e.clientX - rect.left) / rect.width - 0.5
      const yPos = (e.clientY - rect.top) / rect.height - 0.5
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
      <AnimatedGradientBackground variant="hero" intensity="high" />
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-pure-white/60 via-pure-white/40 to-pure-white/60 pointer-events-none z-10" />

      <div className="container-custom relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT COLUMN - Text + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-label text-sunset-orange uppercase tracking-wider font-medium"
            >
              Ario Studio · AI-Native Web Design
            </motion.span>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[48px] leading-[56px] md:text-[64px] md:leading-[72px] lg:text-[72px] lg:leading-[80px] font-bold text-text-primary"
            >
              Cinematic AI-driven websites for{' '}
              <span className="bg-gradient-sunset bg-clip-text text-transparent">
                ambitious products.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-body-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
            >
              We craft high-end, animated experiences powered by AI agents and modern product thinking.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#contact"
                className="group relative px-8 py-4 bg-gradient-sunset text-pure-white font-semibold rounded-large overflow-hidden shadow-warm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Book a Free Discovery Call</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sunset-red via-sunset-orange to-sunset-gold opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <motion.a
                href="#portfolio"
                className="group flex items-center gap-2 px-8 py-4 border-2 border-sunset-orange/30 text-text-primary font-semibold rounded-large hover:border-sunset-orange hover:bg-sunset-orange/5 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Selected Projects</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div
              ref={cardRef}
              className="relative w-full max-w-md aspect-square"
              style={{ perspective: '1000px' }}
            >
              {/* 3D Card/Cube */}
              <motion.div
                className="relative w-full h-full"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                {/* Front face */}
                <div
                  className="absolute inset-0 rounded-xlarge bg-gradient-sunset p-8 shadow-2xl"
                  style={{
                    transform: 'translateZ(40px)',
                  }}
                >
                  <div className="h-full flex flex-col justify-between text-pure-white">
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-pure-white/20 backdrop-blur-sm mb-4" />
                      <h3 className="text-2xl font-bold mb-2">AI Studio</h3>
                      <p className="text-sm opacity-90">Cinematic experiences</p>
                    </div>
                    <div className="flex gap-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="flex-1 h-2 rounded-full bg-pure-white/30"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Side faces for 3D effect */}
                <div
                  className="absolute inset-0 rounded-xlarge bg-gradient-to-r from-sunset-red to-sunset-orange opacity-60"
                  style={{
                    transform: 'translateZ(-40px) translateX(20px)',
                  }}
                />
                <div
                  className="absolute inset-0 rounded-xlarge bg-gradient-to-b from-sunset-yellow to-sunset-gold opacity-40"
                  style={{
                    transform: 'translateZ(-40px) translateY(20px)',
                  }}
                />
              </motion.div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gradient-sunset opacity-60"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
