import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import PageTransition from '@/components/ui/PageTransition'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getServerLang } from '@/lib/i18n'
import { getDefaultMetadata } from '@/lib/seo'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazir',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  adjustFontFallback: false,
})

/**
 * Generate metadata for root layout (bilingual)
 * Note: This is a fallback. Page-specific metadata should use generateMetadata in each page.
 */
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang()
  return getDefaultMetadata(lang)
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Detect language from server context
  const lang = await getServerLang()
  const htmlLang = lang === 'fa' ? 'fa' : 'en'
  const htmlDir = lang === 'fa' ? 'rtl' : 'ltr'

  return (
    <html lang={htmlLang} dir={htmlDir} className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* IRANSans Font for Farsi */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
        />
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
      <body className={`${inter.variable} ${vazirmatn.variable} font-sans antialiased transition-colors duration-300`}>
        <LanguageProvider>
          <ThemeProvider>
            <PageTransition>
              {children}
            </PageTransition>
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  )
}

