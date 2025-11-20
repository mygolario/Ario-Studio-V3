import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 3600

const serviceSlugs = ['full-website', 'landing-page', 'ai-automation', 'brand-refresh']

const serviceData: Record<string, { fa: { title: string; description: string }; en: { title: string; description: string } }> = {
  'full-website': {
    fa: {
      title: 'وب‌سایت کامل',
      description: 'طراحی و ساخت وب‌سایت کامل با تمام ویژگی‌های مورد نیاز',
    },
    en: {
      title: 'Full Website',
      description: 'Complete website design and development with all required features',
    },
  },
  'landing-page': {
    fa: {
      title: 'صفحه فرود',
      description: 'طراحی و ساخت صفحات فرود بهینه برای تبدیل',
    },
    en: {
      title: 'Landing Page',
      description: 'Optimized landing page design and development for conversion',
    },
  },
  'ai-automation': {
    fa: {
      title: 'اتوماسیون هوش مصنوعی',
      description: 'ادغام سیستم‌های هوش مصنوعی و اتوماسیون در کسب‌وکار شما',
    },
    en: {
      title: 'AI Automation',
      description: 'AI systems and automation integration for your business',
    },
  },
  'brand-refresh': {
    fa: {
      title: 'بازطراحی برند',
      description: 'بازطراحی و مدرن‌سازی هویت بصری برند شما',
    },
    en: {
      title: 'Brand Refresh',
      description: 'Redesign and modernize your brand visual identity',
    },
  },
}

/**
 * Service detail page (FA)
 * 
 * Navigation & i18n:
 * - FA route: /services/[slug] (always Farsi, route determines language)
 * - EN route: /en/services/[slug]
 * - Route path determines language, not user preference cookie
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  const service = serviceData[params.slug]
  
  if (!service) {
    return {}
  }

  // This is a FA route, always use Farsi data
  const data = service.fa
  
  return {
    title: `${data.title} | آریو استودیو`,
    description: data.description,
    alternates: {
      canonical: `${baseUrl}/services/${params.slug}`,
      languages: {
        'fa-IR': `${baseUrl}/services/${params.slug}`,
        'en-US': `${baseUrl}/en/services/${params.slug}`,
      },
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  // This is a FA route, always use Farsi language
  const lang = 'fa'
  
  if (!serviceSlugs.includes(params.slug)) {
    notFound()
  }

  const service = serviceData[params.slug]
  const data = service[lang]

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center text-body text-text-secondary hover:text-orange mb-8 transition-colors"
          >
            ← {lang === 'fa' ? 'بازگشت به خدمات' : 'Back to Services'}
          </Link>

          <h1 className="text-h1 font-semibold text-text-primary mb-6">
            {data.title}
          </h1>
          
          <div className="prose prose-lg max-w-none text-text-secondary space-y-4 mb-12">
            <p>{data.description}</p>
            <p>
              {lang === 'fa' 
                ? 'جزئیات کامل این سرویس به زودی اضافه خواهد شد.'
                : 'Full service details will be added soon.'}
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border-subtle">
            <Link
              href={lang === 'fa' ? '/start-project' : '/en/start-project'}
              className="inline-flex items-center px-8 py-4 bg-orange text-pure-white font-medium rounded-lg hover:bg-orange/90 transition-colors"
            >
              {lang === 'fa' ? 'شروع پروژه' : 'Start a Project'}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

