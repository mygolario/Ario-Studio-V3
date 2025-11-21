import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '.night-mode'],
  theme: {
    extend: {
      colors: {
        // Theme Token Colors (use CSS variables)
        'base': 'var(--color-base)',
        'surface': 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        'elevated': 'var(--color-elevated)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'border-subtle': 'var(--color-border-subtle)',
        'border-medium': 'var(--color-border-medium)',
        
        // Accent Colors (consistent across themes)
        'orange': 'var(--color-accent)',
        'orange-light': 'var(--color-accent-light)',
        'orange-dark': 'var(--color-accent-dark)',
        
        // Legacy support (deprecated, use tokens above)
        'pure-white': '#FFFFFF',
        'gray-50': '#FAFAFA',
        'gray-100': '#F5F5F5',
        'gray-200': '#EAEAEA',
        'gray-400': '#9CA3AF',
        'gray-600': '#4B5563',
        'gray-800': '#1F2937',
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'display': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'vazir': ['var(--font-vazir)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FF6A3D 0%, #FF8C6B 100%)',
      },
      fontSize: {
        'hero': ['56px', { lineHeight: '64px', fontWeight: '600', letterSpacing: '-1px' }],
        'h1': ['48px', { lineHeight: '56px', fontWeight: '600', letterSpacing: '-0.5px' }],
        'h2': ['36px', { lineHeight: '44px', fontWeight: '600', letterSpacing: '-0.5px' }],
        'h3': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h5': ['20px', { lineHeight: '28px', fontWeight: '500' }],
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
        'section': '120px', // Consistent section spacing
      },
      borderRadius: {
        'small': '4px',
        'medium': '8px',
        'large': '12px',
        'xlarge': '16px',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'header': '0 2px 10px rgba(0, 0, 0, 0.04)',
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

