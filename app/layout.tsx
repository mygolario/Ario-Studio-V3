import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import PageTransition from '@/components/ui/PageTransition'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ario-studio-v3.vercel.app'),
  title: {
    default: 'Ario Studio – Cinematic AI-Native Experiences',
    template: '%s | Ario Studio',
  },
  description:
    'We design and build cinematic AI-native web experiences, motion-first interfaces, and production-grade Next.js systems for modern founders.',
  keywords: [
    'AI Studio',
    'Cinematic Web Design',
    'Next.js Agency',
    'Web Motion',
    'Ario Studio',
    'AI Automation',
    'Founder Tools',
  ],
  openGraph: {
    title: 'Ario Studio',
    description:
      'Cinematic AI-native experiences. Next.js engineering. Motion-first design.',
    url: 'https://ario-studio-v3.vercel.app',
    siteName: 'Ario Studio',
    images: [
      {
        url: '/og/og-main.png',
        width: 1200,
        height: 630,
        alt: 'Ario Studio – Cinematic AI Experiences',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ario Studio',
    description:
      'Cinematic AI-native experiences for modern founders.',
    images: ['/og/og-main.png'],
  },
  alternates: {
    canonical: 'https://ario-studio-v3.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}

