'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'day' | 'night'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('day')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved preference, default to 'day' if none exists
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme === 'day' || savedTheme === 'night') {
      setTheme(savedTheme)
    } else {
      setTheme('day') // Default to day mode
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Apply theme to document
      if (theme === 'night') {
        document.documentElement.classList.add('night-mode')
      } else {
        document.documentElement.classList.remove('night-mode')
      }
      // Save preference
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'day' ? 'night' : 'day'))
  }

  // Prevent flash of unstyled content
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return default values during SSR or when provider is not available
    return {
      theme: 'day' as Theme,
      toggleTheme: () => {},
    }
  }
  return context
}

