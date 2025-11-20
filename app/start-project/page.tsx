import type { Metadata } from 'next'
import Header from '@/components/Header'
import MultiStepProjectForm from '@/components/MultiStepProjectForm'
import { generateSEOMetadata } from '@/lib/seo'

export const revalidate = 3600

/**
 * Start Project / Request a Project page (FA)
 * 
 * Navigation & i18n:
 * - FA route: /start-project (always Farsi, route determines language)
 * - EN route: /en/start-project
 * - Route path determines language, not user preference cookie
 * - This is the main CTA target
 * - Fullscreen modal-style experience
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('fa', {
    title: 'شروع پروژه',
    description: 'بیایید تجربه دیجیتالی بعدی شما را بسازیم. درخواست پروژه خود را ارسال کنید و با ما تماس بگیرید.',
    url: `${baseUrl}/start-project`,
  })
}

export default async function StartProjectPage() {
  // This is a FA route, always use Farsi language
  const lang = 'fa'

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
