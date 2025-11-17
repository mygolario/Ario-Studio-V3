'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  onClick?: (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  className?: string
  icon?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
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
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = `group relative px-8 py-4 font-medium rounded-full transition-all duration-200 flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`
  
  const primaryClasses = 'bg-orange text-pure-white shadow-soft hover:shadow-card hover:scale-105 active:scale-[0.97] hover:brightness-105 hover:border-orange/50 disabled:hover:scale-100 disabled:hover:shadow-soft relative overflow-hidden'
  const secondaryClasses = 'bg-transparent border-2 border-border-subtle text-text-primary hover:border-orange hover:text-orange hover:scale-105 active:scale-[0.97] hover:bg-orange/5 disabled:hover:scale-100 relative group/underline overflow-hidden'

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick()
    }
    
    // Handle smooth scrolling for internal links
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const headerHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={handleAnchorClick}
        className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`}
        whileHover={disabled ? {} : { scale: 1.05 }}
        whileTap={disabled ? {} : { scale: 0.97 }}
      >
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-light/20 via-orange/30 to-orange-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ filter: 'blur(8px)' }}
          />
        )}
        <span className="relative z-10">{children}</span>
        {variant === 'secondary' && (
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        )}
        {icon && !disabled && (
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
        )}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-light/20 via-orange/30 to-orange-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ filter: 'blur(8px)' }}
        />
      )}
      <span className="relative z-10">{children}</span>
      {variant === 'secondary' && (
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />
      )}
      {icon && !disabled && (
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
      )}
    </motion.button>
  )
}
