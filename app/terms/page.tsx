import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  // This is a FA route, always return Farsi metadata
  return {
    title: 'شرایط استفاده | آریو استودیو',
    description: 'شرایط استفاده از آریو استودیو',
    alternates: {
      canonical: `${baseUrl}/terms`,
      languages: {
        'fa-IR': `${baseUrl}/terms`,
        'en-US': `${baseUrl}/en/terms`,
      },
    },
  }
}

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-3xl mx-auto rtl">
          <h1 className="text-h1 font-semibold text-text-primary mb-4">شرایط استفاده</h1>
          <p className="text-body-sm text-text-muted mb-12">
            آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary">
            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">استفاده از این وب‌سایت</h2>
              <p>
                با استفاده از این وب‌سایت و ارسال فرم درخواست پروژه، شما موافقت می‌کنید که:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 rtl:list-none rtl:pr-6">
                <li>ما می‌توانیم با استفاده از اطلاعات تماسی که ارائه می‌دهید با شما تماس بگیریم</li>
                <li>درک می‌کنید که محتوای وب‌سایت (طراحی، متن، تصاویر) متعلق به آریو استودیو است مگر اینکه خلاف آن ذکر شده باشد</li>
                <li>قراردادها، قیمت‌گذاری و تحویل‌های خاص هر پروژه در پروپوزال یا توافق جداگانه تعریف می‌شود</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">محتوای وب‌سایت</h2>
              <p>
                تمام محتوای این وب‌سایت، از جمله طراحی، متن، گرافیک و تصاویر، متعلق به آریو استودیو است. شما نمی‌توانید بدون اجازه کتبی ما هیچ محتوایی را کپی، بازتولید یا استفاده کنید.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">جزییات هر پروژه در قرارداد/توافق جداگانه مشخص می‌شود</h2>
              <p>
                هر پروژه محدوده، زمان‌بندی، قیمت‌گذاری و تحویل‌های خاص خود را دارد. این جزئیات قبل از شروع کار در یک پروپوزال یا توافق جداگانه به وضوح تعریف می‌شود. شرایط موجود در آن توافق بر این شرایط کلی اولویت دارد.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">ممکن است این شرایط در آینده به‌روزرسانی شود</h2>
              <p>
                ممکن است این وب‌سایت و این شرایط را از زمان به زمان به‌روزرسانی کنیم. تغییرات در این صفحه منتشر می‌شود. ادامه استفاده شما از وب‌سایت پس از انتشار تغییرات به معنای پذیرش شرایط به‌روزرسانی شده است.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">تماس</h2>
              <p>
                اگر سوالی درباره این شرایط استفاده دارید، لطفاً با ما تماس بگیرید:{' '}
                <a href="mailto:info@ariostudio.net" className="text-orange hover:underline">
                  info@ariostudio.net
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border-subtle">
            <Link
              href="/"
              className="inline-flex items-center text-body text-orange hover:underline"
            >
              ← بازگشت به خانه
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
