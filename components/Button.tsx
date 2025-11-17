'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
  icon?: boolean
}

/**
 * Button Component
 * 
 * Professional, creative button with 3D effects and sunset gradient theme.
 * 
 * To adjust button styling:
 * - Gradient colors: Edit `bg-gradient-sunset` in Tailwind config
 * - Hover effects: Modify `whileHover` props (scale, shadow)
 * - Border radius: Change `rounded-full` to adjust pill shape
 * - Animation duration: Modify transition duration values
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  className = '',
  icon = true,
}: ButtonProps) {
  const baseClasses = 'group relative px-8 py-4 font-semibold rounded-full transition-all duration-300 flex items-center gap-2 justify-center'
  
  const primaryClasses = 'bg-gradient-sunset text-pure-white shadow-warm'
  const secondaryClasses = 'bg-transparent border-2 border-sunset-orange/30 text-text-primary hover:border-sunset-orange hover:bg-sunset-orange/5'

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`}
      whileHover={{ 
        scale: 1.03, 
        y: -2,
        boxShadow: variant === 'primary' 
          ? '0 8px 30px rgba(255, 106, 61, 0.25)' 
          : '0 4px 15px rgba(255, 106, 61, 0.15)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-sunset-red via-sunset-orange to-sunset-gold opacity-0 group-hover:opacity-100 rounded-full"
          transition={{ duration: 0.3 }}
        />
      )}
      <span className="relative z-10">{children}</span>
      {icon && (
        <motion.span
          className="relative z-10"
          animate={{ x: [0, 3, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </motion.span>
      )}
    </Component>
  )
}

