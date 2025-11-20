import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StartProjectForm from '@/components/StartProjectForm'
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
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 rtl">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              شروع یک پروژه
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              بیایید تجربه دیجیتالی بعدی شما را بسازیم
            </p>
          </div>

          <div className="bg-surface border border-border-subtle rounded-xl p-8">
            <StartProjectForm lang={lang} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

