import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ario Studio — World-Class Creative Agency',
  description: 'A premium creative studio delivering exceptional design, strategy, and digital experiences.',
  keywords: ['creative agency', 'design studio', 'branding', 'digital design'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} font-display antialiased`}>
        {children}
      </body>
    </html>
  )
}

