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
 * Minimal, professional button with subtle animations.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  className = '',
  icon = true,
}: ButtonProps) {
  const baseClasses = 'group relative px-8 py-4 font-medium rounded-full transition-all duration-300 flex items-center gap-2 justify-center'
  
  const primaryClasses = 'bg-orange text-pure-white shadow-soft hover:shadow-card'
  const secondaryClasses = 'bg-transparent border-2 border-gray-200 text-text-primary hover:border-orange hover:text-orange'

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`}
      whileHover={{ 
        scale: 1.01,
      }}
      whileTap={{ scale: 0.99 }}
    >
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
      )}
    </Component>
  )
}
