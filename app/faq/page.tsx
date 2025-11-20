import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordion from '@/components/FAQAccordion'
import { generateSEOMetadata } from '@/lib/seo'

export const revalidate = 3600

/**
 * FAQ page (FA)
 * 
 * Navigation & i18n:
 * - FA route: /faq (always Farsi, route determines language)
 * - EN route: /en/faq
 * - Route path determines language, not user preference cookie
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('fa', {
    title: 'سوالات متداول',
    description: 'سوالات متداول درباره آریو استودیو، خدمات، فرآیند کار و تکنولوژی‌های استفاده شده.',
    url: `${baseUrl}/faq`,
  })
}

export default async function FAQPage() {
  // This is a FA route, always use Farsi language
  const lang = 'fa'

  const faqItems = [
    {
      question: 'آیا از هوش مصنوعی برای ساخت وب‌سایت‌ها استفاده می‌کنید؟',
      answer: 'بله، اما هوش مصنوعی نقش ابزار کمکی و سرعت‌دهنده دارد، نه جایگزین متخصص. آریو استودیو از هوش مصنوعی برای سرعت بخشیدن به توسعه، کاوش گزینه‌های طراحی و خودکارسازی کارهای تکراری استفاده می‌کند. با این حال، استراتژی، تصمیم‌گیری‌های طراحی و کنترل کیفیت نهایی همه توسط انسان انجام می‌شود. ما از "مولدهای یک کلیکی وب‌سایت با هوش مصنوعی" استفاده نمی‌کنیم — ما راه‌حل‌های سفارشی می‌سازیم که تخصص انسانی را با کارایی هوش مصنوعی ترکیب می‌کنند.',
    },
    {
      question: 'زمان پروژه‌ها چقدر است؟',
      answer: 'زمان‌بندی پروژه‌ها بر اساس محدوده و پیچیدگی متفاوت است. یک صفحه فرود ساده ممکن است چند هفته طول بکشد، در حالی که یک ری‌دیزاین کامل وب‌سایت می‌تواند چند ماه طول بکشد. بعد از جلسه اولیه، ما یک زمان‌بندی واضح بر اساس نیازهای خاص پروژه شما ارائه می‌دهیم. ما از قبل به زمان‌بندی‌های ثابت متعهد نمی‌شویم چون هر پروژه منحصر به فرد است.',
    },
    {
      question: 'آیا با مشتریان بین‌المللی کار می‌کنید؟',
      answer: 'بله، آریو استودیو هم با کسب‌وکارهای ایرانی و هم بین‌المللی کار می‌کند. تا زمانی که همکاری از راه دور امکان‌پذیر است و می‌توانیم به طور مؤثر ارتباط برقرار کنیم (به انگلیسی یا فارسی)، خوشحال می‌شویم با کسب‌وکارهایی از هر جای دنیا کار کنیم.',
    },
    {
      question: 'بعد از تحویل، یک دوره پشتیبانی کوتاه وجود دارد و امکان ادامه همکاری هست؟',
      answer: 'بله. ما یک دوره پشتیبانی کوتاه بعد از تحویل ارائه می‌دهیم تا هرگونه مشکل فوری یا سوال را برطرف کنیم. علاوه بر آن، می‌توانیم درباره پشتیبانی مداوم، نگهداری یا بهبودهای آینده بر اساس نیازهای شما صحبت کنیم. شرایط پشتیبانی هر پروژه در توافق پروژه تعریف می‌شود.',
    },
    {
      question: 'تکنولوژی‌های مدرن استفاده می‌کنید؟',
      answer: 'ما از یک پشته مدرن و متمرکز بر عملکرد استفاده می‌کنیم: Next.js برای فریمورک، Vercel برای میزبانی، TypeScript برای امنیت نوع، و Tailwind CSS برای استایل. برای انیمیشن‌ها، از Framer Motion و GSAP استفاده می‌کنیم. همچنین ابزارهای هوش مصنوعی را برای گردش‌های کاری، اتوماسیون‌ها و شتاب توسعه ادغام می‌کنیم. پشته فناوری دقیق به نیازهای پروژه شما بستگی دارد.',
    },
    {
      question: 'آیا مالکیت نهایی وب‌سایت برای کلاینت است؟',
      answer: 'بله. بعد از پرداخت نهایی، شما مالک وب‌سایت و محتوای آن هستید. می‌توانید با تیم‌های دیگر ادامه دهید، خودتان تغییرات ایجاد کنید (اگر قابلیت فنی دارید)، یا برای به‌روزرسانی‌های آینده به ما برگردید. ممکن است اجازه نمایش پروژه شما در نمونه‌کارهایمان را درخواست کنیم، اما شما همیشه تصمیم نهایی را دارید.',
    },
  ]

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 rtl">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              سوالات متداول
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              سوالات متداول آریو استودیو
            </p>
          </div>

          <FAQAccordion items={faqItems} lang={lang} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
