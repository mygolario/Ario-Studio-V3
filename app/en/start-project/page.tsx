import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'

export const revalidate = 3600

/**
 * Start Project / Request a Project page (EN)
 * 
 * Navigation & i18n:
 * - FA route: /start-project
 * - EN route: /en/start-project
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  return {
    title: 'Start a Project | Ario Studio',
    description: "Let's build your next digital experience",
    alternates: {
      canonical: `${baseUrl}/en/start-project`,
      languages: {
        'fa-IR': `${baseUrl}/start-project`,
        'en-US': `${baseUrl}/en/start-project`,
      },
    },
  }
}

export default async function StartProjectPageEN() {
  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              Start a Project
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Let&apos;s build your next digital experience
            </p>
          </div>

          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  )
}

