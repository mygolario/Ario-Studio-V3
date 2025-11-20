import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Button from '@/components/Button'
import { generateSEOMetadata } from '@/lib/seo'

export const revalidate = 3600

/**
 * Pricing page (FA)
 * 
 * Navigation & i18n:
 * - FA route: /pricing (always Farsi, route determines language)
 * - EN route: /en/pricing
 * - Route path determines language, not user preference cookie
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('fa', {
    title: 'قیمت‌گذاری',
    description: 'چطور آریو استودیو پروژه‌ها را قیمت‌گذاری می‌کند. پروژه‌های اختصاصی، نه پکیج ارزان.',
    url: `${baseUrl}/pricing`,
  })
}

export default async function PricingPage() {
  // This is a FA route, always use Farsi language
  const lang = 'fa'

  const engagementTypes = [
    {
      name: 'Launch',
      phrase: 'برای ایده‌ها و کسب‌وکارهایی که یک لندینگ یا وب‌سایت سبک برای شروع می‌خواهند.',
      bullets: [
        'محدوده معمول: یک صفحه کلیدی یا مجموعه کوچکی از صفحات',
        'صفحه فرود سینمایی برای محصول، کمپین، یا MVP',
        'ادغام‌های پایه (فرم‌ها، آنالیتیکس، پیام‌رسانی)',
        'طراحی و ساخت با Next.js، Vercel و گردش‌های کاری با کمک هوش مصنوعی',
      ],
    },
    {
      name: 'Grow',
      phrase: 'برای کسب‌وکارهایی که به یک وب‌سایت چند صفحه‌ای منسجم و کمی اتوماسیون نیاز دارند.',
      bullets: [
        'وب‌سایت چند صفحه‌ای یا سایت بازاریابی کوچک',
        'ساختار محتوا و ناوبری بهتر',
        'اتوماسیون‌های کلیدی (ایمیل، جذب لید، گردش‌های کاری ساده)',
        'مناسب برای کسب‌وکارهای محلی و آنلاین در حال رشد',
      ],
    },
    {
      name: 'Elevate',
      phrase: 'برای ری‌دیزاین عمیق، استوری‌تلینگ قوی‌تر، یا پروژه‌های پیچیده‌تر.',
      bullets: [
        'ری‌دیزاین استراتژیک یک سایت یا برند موجود',
        'صفحات، بخش‌ها و تعاملات پیچیده با استوری‌تلینگ',
        'اتوماسیون‌ها و ادغام‌های پیشرفته‌تر',
        'همکاری نزدیک‌تر و فرآیند شبیه به ورکشاپ',
      ],
    },
  ]

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-6xl mx-auto">
          {/* Hero/Intro Section */}
          <div className="text-center mb-16 rtl">
            <h1 className="text-h1 font-semibold text-text-primary mb-6">
              چطور پروژه‌ها را قیمت‌گذاری می‌کنیم؟
            </h1>
            <p className="text-body-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              پروژه‌ها بر اساس اهداف، پیچیدگی و زمان‌بندی شما قیمت‌گذاری می‌شوند. آریو استودیو پکیج ارزان و از پیش‌تعریف‌شده نمی‌فروشد — ما بر اساس کسب‌وکار شما طراحی و قیمت‌گذاری می‌کنیم.
            </p>
          </div>

          {/* Engagement Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {engagementTypes.map((engagement, index) => (
              <div
                key={engagement.name}
                className="bg-surface border border-border-subtle rounded-xl p-6 hover:border-orange/50 hover:shadow-card-hover transition-all rtl"
              >
                <h2 className="text-h4 font-semibold text-text-primary mb-3">
                  {engagement.name}
                </h2>
                <p className="text-body-sm text-text-secondary mb-4 italic">
                  {engagement.phrase}
                </p>
                <ul className="space-y-2">
                  {engagement.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-body-sm text-text-secondary">
                      <span className="text-orange mt-1.5 flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="max-w-3xl mx-auto mb-12 rtl">
            <p className="text-body text-text-secondary text-center leading-relaxed">
              هر پروژه بعد از صحبت کوتاه و شناخت بیزنس شما به‌صورت اختصاصی تعریف و قیمت‌گذاری می‌شود. قبل از شروع، یک پروپوزال شفاف برایتان ارسال می‌کنیم.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button href="/start-project" variant="primary">
              گفتگو درباره پروژه شما
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
