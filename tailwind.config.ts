import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Foundation
        'deep-black': '#0A0A0A',
        'charcoal': '#1A1A1A',
        'slate': '#2A2A2A',
        
        // Accent System
        'electric-blue': '#3B82F6',
        'violet': '#8B5CF6',
        'amber': '#F59E0B',
        'emerald': '#10B981',
        
        // Semantic Colors
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1AA',
        'text-tertiary': '#71717A',
        'border-subtle': '#27272A',
        'surface-elevated': '#18181B',
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'display': ['var(--font-display)', 'system-ui', 'sans-serif'],
        'serif': ['var(--font-serif)', 'serif'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '80px', fontWeight: '700', letterSpacing: '-2px' }],
        'h1': ['56px', { lineHeight: '64px', fontWeight: '700', letterSpacing: '-1px' }],
        'h2': ['40px', { lineHeight: '48px', fontWeight: '700', letterSpacing: '-0.5px' }],
        'h3': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h5': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h6': ['18px', { lineHeight: '24px', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '16px', fontWeight: '500', letterSpacing: '0.5px' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'small': '4px',
        'medium': '8px',
        'large': '12px',
        'xlarge': '16px',
      },
      boxShadow: {
        'level-1': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'level-2': '0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
        'level-3': '0 10px 15px rgba(0, 0, 0, 0.5), 0 4px 6px rgba(0, 0, 0, 0.4)',
        'level-4': '0 20px 25px rgba(0, 0, 0, 0.6), 0 10px 10px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-hover': '0 0 30px rgba(59, 130, 246, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

