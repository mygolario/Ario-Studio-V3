'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use default theme during SSR
  const currentTheme = mounted ? theme : 'day'

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle dark:border-slate-700 bg-pure-white dark:bg-slate-800 hover:border-orange dark:hover:border-orange transition-all duration-300 cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Switch to ${currentTheme === 'day' ? 'night' : 'day'} mode`}
    >
      {currentTheme === 'day' ? (
        <>
          <Sun size={16} className="text-text-secondary dark:text-slate-300 group-hover:text-orange transition-colors" />
          <span className="text-body-sm font-medium text-text-secondary dark:text-slate-300 group-hover:text-orange transition-colors hidden sm:inline">
            Day
          </span>
        </>
      ) : (
        <>
          <Moon size={16} className="text-text-secondary dark:text-slate-300 group-hover:text-orange transition-colors" />
          <span className="text-body-sm font-medium text-text-secondary dark:text-slate-300 group-hover:text-orange transition-colors hidden sm:inline">
            Night
          </span>
        </>
      )}
    </motion.button>
  )
}

