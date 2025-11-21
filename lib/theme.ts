/**
 * Design System Theme Configuration
 * Centralized design tokens for Ario Studio
 */

export const theme = {
  colors: {
    // Base Colors (Light & Expressive)
    pureWhite: '#FFFFFF',
    warmGray50: '#FAFAF9',
    warmGray100: '#F5F5F4',
    warmGray200: '#E7E5E4',
    warmGray600: '#78716C',
    warmGray800: '#292524',
    
    // Warm AI Accent System
    aiAmber: '#FF8C42',
    aiGold: '#FFB84D',
    aiCoral: '#FF6B6B',
    aiSky: '#4A90E2',
    aiLavender: '#9B7EDE',
    aiMint: '#6BCF9F',
    
    // Semantic Colors
    textPrimary: '#292524',
    textSecondary: '#78716C',
    textTertiary: '#A8A29E',
    borderSubtle: '#E7E5E4',
    surfaceElevated: '#FAFAF9',
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

