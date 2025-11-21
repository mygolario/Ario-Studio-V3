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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  // Since we don't use [lang] segments, we'll use the same URL for both languages
  // The language is determined by cookie/context
  const urlFa = baseUrl // Same URL, language detected from context
  const urlEn = baseUrl

  if (lang === 'fa') {
    return {
      metadataBase: new URL(baseUrl),
      title: {
        default: 'آریو استودیو — طراحی، ساخت و اتوماسیون',
        template: '%s | آریو استودیو',
      },
      description:
        'آریو استودیو تجربه‌های وب سینمایی، متحرک و مبتنی بر هوش مصنوعی طراحی و پیاده‌سازی می‌کند. از هر پیکسل، یک تجربه می‌سازیم.',
      keywords: [
        'طراحی وب',
        'Next.js',
        'اتوماسیون هوش مصنوعی',
        'تجربه کاربری سینمایی',
        'توسعه‌دهنده فول‌استک',
        'آریو استودیو',
        'توسعه وب',
        'ادغام هوش مصنوعی',
        'طراحی موشن',
        'مهندسی تولید',
      ],
      openGraph: {
        title: 'آریو استودیو — طراحی، ساخت و اتوماسیون',
        description:
          'تجربه‌های وبی که حس می‌شوند، نه فقط دیده. طراحی سینمایی، مهندسی مدرن و سیستم‌های هوشمند.',
        url: urlFa,
        siteName: 'آریو استودیو',
        images: [
          {
            url: '/og/og-main.png',
            width: 1200,
            height: 630,
            alt: 'آریو استودیو — طراحی، ساخت و اتوماسیون',
          },
        ],
        locale: 'fa_IR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'آریو استودیو — طراحی، ساخت و اتوماسیون',
        description:
          'تجربه‌های وبی که حس می‌شوند، نه فقط دیده.',
        images: ['/og/og-main.png'],
      },
      alternates: {
        canonical: urlFa,
        languages: {
          'fa-IR': urlFa,
          'en-US': urlEn,
        },
      },
    }
  }

  // English version
  return {
    metadataBase: new URL(baseUrl),
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
      url: urlEn,
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
      canonical: urlEn,
      languages: {
        'fa-IR': urlFa,
        'en-US': urlEn,
      },
    },
  }
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
      </body>
    </html>
  )
}

