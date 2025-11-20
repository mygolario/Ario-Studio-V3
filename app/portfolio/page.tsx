import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { getAllProjects } from '@/lib/portfolio'
import { generateSEOMetadata } from '@/lib/seo'

export const revalidate = 3600

/**
 * Portfolio page (FA)
 * 
 * Navigation & i18n:
 * - FA route: /portfolio (always Farsi, route determines language)
 * - EN route: /en/portfolio
 * - Route path determines language, not user preference cookie
 * - Note: Real projects will be added soon
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('fa', {
    title: 'نمونه‌کارها',
    description: 'نمونه‌کارها و کیس استادی‌های آریو استودیو. پروژه‌های طراحی وب، لندینگ پیج و اتوماسیون‌های هوش مصنوعی.',
    url: `${baseUrl}/portfolio`,
  })
}

export default async function PortfolioPage() {
  // This is a FA route, always use Farsi language
  const lang = 'fa'
  const projects = getAllProjects('fa')

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-16 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 rtl">
            <h1 className="text-h1 sm:text-h1 font-semibold text-text-primary mb-4 sm:mb-6">
              نمونه‌کارها
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-4 leading-relaxed">
              نمونه‌کارها و کیس استادی‌های آریو استودیو
            </p>
            <p className="text-body text-text-secondary max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed">
              نمونه‌کارها و کیس استادی‌های آریو استودیو به‌زودی در این بخش منتشر می‌شوند. در حال حاضر تمرکز ما روی ساخت اولین پروژه‌های زنده برای مشتریان است.
            </p>
            <p className="text-body-sm text-text-muted">
              می‌توانید از طریق صفحه «شروع پروژه» با ما تماس بگیرید.
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-surface rounded-xl overflow-hidden border border-border-subtle hover:shadow-card-hover hover:-translate-y-1 hover:border-orange/50 transition-all duration-300 relative rtl"
                >
                  {project.thumbnailUrl && (
                    <div className="relative h-64 bg-surface-alt overflow-hidden rounded-t-xl">
                      <Image
                        src={project.thumbnailUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-h4 font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-body text-text-secondary mb-3">
                      {project.shortDescription}
                    </p>
                    {project.status === 'coming-soon' && (
                      <span className="inline-block text-body-sm text-text-muted bg-surface-alt border border-border-subtle px-3 py-1 rounded-full">
                        به‌زودی
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          
          <div className="text-center rtl">
            <p className="text-body text-text-secondary max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed">
              نمونه‌کارها و کیس استادی‌های کامل به‌زودی در این بخش منتشر می‌شوند.
            </p>
            <p className="text-body-sm text-text-muted">
              می‌توانید از طریق صفحه «شروع پروژه» با ما تماس بگیرید.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

