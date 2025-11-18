import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import PageTransition from '@/components/ui/PageTransition'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ario-studio-v3.vercel.app'),
  title: {
    default: 'Ario Studio — Design • Build • Automate',
    template: '%s | Ario Studio',
  },
  description:
    'Cinematic UX, high-performance engineering, and AI-driven innovation. Ario Studio builds modern, expressive, and intelligent web experiences.',
  keywords: [
    'Web Design',
    'Next.js',
    'AI Automation',
    'Cinematic UX',
    'Full-stack Developer',
    'Ario Studio',
    'Web Development',
    'AI Integration',
    'Motion Design',
    'Production Engineering',
  ],
  openGraph: {
    title: 'Ario Studio — Design • Build • Automate',
    description:
      'Cinematic UX, high-performance engineering, and AI-driven innovation. Ario Studio builds modern, expressive, and intelligent web experiences.',
    url: 'https://ario-studio-v3.vercel.app',
    siteName: 'Ario Studio',
    images: [
      {
        url: '/og/og-main.png',
        width: 1200,
        height: 630,
        alt: 'Ario Studio — Design • Build • Automate',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ario Studio — Design • Build • Automate',
    description:
      'Cinematic UX, high-performance engineering, and AI-driven innovation.',
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
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <head>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ario Studio',
              url: 'https://ario-studio-v3.vercel.app',
              logo: 'https://ario-studio-v3.vercel.app/og/og-main.png',
              description:
                'Cinematic UX, high-performance engineering, and AI-driven innovation. Ario Studio builds modern, expressive, and intelligent web experiences.',
              sameAs: [],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@ariostudio.net',
                contactType: 'Customer Service',
              },
            }),
          }}
        />
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Ario Studio',
              url: 'https://ario-studio-v3.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://ario-studio-v3.vercel.app/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased transition-colors duration-300`}>
        <LanguageProvider>
          <ThemeProvider>
            <PageTransition>
              {children}
            </PageTransition>
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}

