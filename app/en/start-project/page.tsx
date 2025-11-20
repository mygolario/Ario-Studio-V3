import type { Metadata } from 'next'
import Header from '@/components/Header'
import MultiStepProjectForm from '@/components/MultiStepProjectForm'
import { generateSEOMetadata } from '@/lib/seo'

export const revalidate = 3600

/**
 * Start Project / Request a Project page (EN)
 * 
 * Navigation & i18n:
 * - FA route: /start-project
 * - EN route: /en/start-project
 * - Fullscreen modal-style experience
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('en', {
    title: 'Start a Project',
    description: "Let's build your next digital experience. Submit your project request and get in touch with us.",
    url: `${baseUrl}/en/start-project`,
  })
}

export default async function StartProjectPageEN() {
  const lang = 'en'

  return (
    <main className="relative min-h-screen bg-base flex items-center justify-center p-4">
      {/* Fullscreen backdrop - no header/footer in modal style */}
      <div className="fixed inset-0 bg-base" />
      
      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-[720px] bg-surface border border-border-subtle rounded-2xl shadow-2xl p-8 md:p-12">
        <MultiStepProjectForm lang={lang} />
      </div>
    </main>
  )
}
