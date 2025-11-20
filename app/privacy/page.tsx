import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  // This is a FA route, always return Farsi metadata
  return {
    title: 'سیاست حریم خصوصی | آریو استودیو',
    description: 'سیاست حریم خصوصی آریو استودیو',
    alternates: {
      canonical: `${baseUrl}/privacy`,
      languages: {
        'fa-IR': `${baseUrl}/privacy`,
        'en-US': `${baseUrl}/en/privacy`,
      },
    },
  }
}

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-3xl mx-auto rtl">
          <h1 className="text-h1 font-semibold text-text-primary mb-4">سیاست حریم خصوصی</h1>
          <p className="text-body-sm text-text-muted mb-12">
            آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary">
            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">چه داده‌هایی جمع می‌شود</h2>
              <p className="mb-3">
                زمانی که با ما تماس می‌گیرید یا از طریق فرم‌های ما درخواست پروژه ارسال می‌کنید، این اطلاعات را جمع‌آوری می‌کنیم:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 rtl:list-none rtl:pr-6">
                <li>نام و آدرس ایمیل شما</li>
                <li>اطلاعات پروژه (نوع، بودجه، ددلاین، پیام)</li>
                <li>هر اطلاعات دیگری که شما انتخاب می‌کنید به اشتراک بگذارید</li>
              </ul>
              <p>
                در صورت فعال بودن آنالیتیکس، ممکن است داده‌های استفاده پایه مانند بازدید صفحات، نوع دستگاه و اطلاعات مرورگر را نیز جمع‌آوری کنیم تا نحوه استفاده بازدیدکنندگان از وب‌سایت را درک کنیم.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">برای چه اهدافی استفاده می‌شود</h2>
              <p className="mb-3">
                از اطلاعاتی که ارائه می‌دهید برای موارد زیر استفاده می‌کنیم:
              </p>
              <ul className="list-disc pl-6 space-y-2 rtl:list-none rtl:pr-6">
                <li>پاسخ به درخواست‌های پروژه شما و ارتباط درباره خدمات ما</li>
                <li>بهبود وب‌سایت و درک نحوه تعامل بازدیدکنندگان با آن</li>
                <li>ارسال به‌روزرسانی‌ها درباره پروژه شما یا خدمات ما (فقط با رضایت شما)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">داده‌ها فروخته نمی‌شود</h2>
              <p className="mb-3">
                ما به حریم خصوصی شما احترام می‌گذاریم:
              </p>
              <ul className="list-disc pl-6 space-y-2 rtl:list-none rtl:pr-6">
                <li>داده‌های شما را به اشخاص ثالث نمی‌فروشیم یا معامله نمی‌کنیم</li>
                <li>جزئیات پروژه شما را بدون رضایت صریح شما به صورت عمومی به اشتراک نمی‌گذاریم</li>
                <li>از اطلاعات شما برای اهداف بازاریابی استفاده نمی‌کنیم مگر اینکه شما انتخاب کرده باشید</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">نگهداری داده</h2>
              <p>
                ارسال‌های فرم و سوابق ارتباطی را تا زمانی که برای همکاری و سوابق تجاری پایه لازم است نگه می‌داریم. اگر می‌خواهید اطلاعات شما حذف شود، می‌توانید در هر زمان درخواست دهید.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">امکان درخواست حذف/ویرایش اطلاعات</h2>
              <p>
                می‌توانید از طریق ایمیل با آریو استودیو تماس بگیرید تا حذف یا اصلاح اطلاعات خود را درخواست کنید. ما در یک بازه زمانی معقول به درخواست شما پاسخ خواهیم داد.
              </p>
              <p className="mt-4">
                با ما تماس بگیرید:{' '}
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
