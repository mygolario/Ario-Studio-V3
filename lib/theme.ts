/**
 * Design System Theme Configuration
 * Centralized design tokens for Ario Studio
 */

export const theme = {
  colors: {
    // Primary Foundation (Neon Noir)
    voidBlack: '#000000',
    charcoal: '#0F0F0F',
    slate: '#1A1A1A',
    graphite: '#252525',
    
    // Primary Accent System
    neonCyan: '#00F5FF',
    electricMagenta: '#FF00F5',
    laserGreen: '#00FF88',
    amberPulse: '#FFB800',
    
    // Semantic Colors
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#707070',
    borderSubtle: '#2A2A2A',
    surfaceElevated: '#151515',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
    '6xl': '64px',
    '7xl': '80px',
    '8xl': '96px',
    '9xl': '128px',
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
    full: '9999px',
  },
  
  shadows: {
    level1: '0 1px 2px rgba(0, 0, 0, 0.3)',
    level2: '0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
    level3: '0 10px 15px rgba(0, 0, 0, 0.5), 0 4px 6px rgba(0, 0, 0, 0.4)',
    level4: '0 20px 25px rgba(0, 0, 0, 0.6), 0 10px 10px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(59, 130, 246, 0.3)',
    glowHover: '0 0 30px rgba(59, 130, 246, 0.5)',
  },
  
  animations: {
    duration: {
      micro: '150ms',
      standard: '300ms',
      moderate: '500ms',
      slow: '800ms',
    },
    easing: {
      easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px',
  },
} as const

