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
  const baseClasses = 'group relative px-8 py-4 font-medium rounded-full transition-all duration-200 flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 dark:focus:ring-offset-slate-900'
  
  const primaryClasses = 'bg-orange text-pure-white shadow-soft hover:shadow-card hover:scale-105 active:scale-[0.97] hover:brightness-105'
  const secondaryClasses = 'bg-transparent border-2 border-gray-200 dark:border-slate-600 text-text-primary dark:text-slate-100 hover:border-orange hover:text-orange hover:scale-105 active:scale-[0.97] hover:bg-orange/5 dark:hover:bg-orange/10'

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
        whileHover={{ 
          scale: 1.05,
        }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="relative z-10">{children}</span>
        {icon && (
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`}
      whileHover={{ 
        scale: 1.05,
      }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
      )}
    </motion.button>
  )
}
