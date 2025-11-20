'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

/**
 * Services Overview Component
 * 
 * Displays 3-4 service cards on the Home page.
 * Content is organized for easy migration to CMS later.
 * 
 * Navigation & i18n:
 * - Detects locale from pathname (/en = EN, / = FA)
 * - All links are locale-aware
 */
export default function ServicesOverview() {
  const pathname = usePathname()
  const isEN = pathname.startsWith('/en')
  const localePrefix = isEN ? '/en' : ''
  
  const getRoute = (route: string) => `${localePrefix}${route}`

  // Service definitions - organized for easy CMS migration
  // TODO: Move to CMS/config file in future
  const services = isEN
    ? [
        {
          slug: 'full-website',
          title: 'Full Website Design & Build',
          description: 'Complete website solutions from design to deployment. Modern, fast, and scalable sites built with Next.js and best practices.',
          bullets: [
            'A cohesive, fast, modern site',
            'Growing brands, SaaS, local businesses',
            'Next.js, Vercel, AI tooling',
          ],
        },
        {
          slug: 'landing-page',
          title: 'Cinematic Landing Page',
          description: 'High-converting landing pages with cinematic design and smooth animations. Built for campaigns, product launches, and conversions.',
          bullets: [
            'High-converting, visually striking pages',
            'Product launches, campaigns, lead generation',
            'Next.js, GSAP, Tailwind CSS',
          ],
        },
        {
          slug: 'ai-automation',
          title: 'AI Automation & Integration',
          description: 'Intelligent automation systems and AI integrations that reduce manual work and enhance user experiences.',
          bullets: [
            'Automated workflows and AI-powered features',
            'SaaS, e-commerce, service businesses',
            'OpenAI, LangChain, custom integrations',
          ],
        },
        {
          slug: 'brand-refresh',
          title: 'Brand & Visual Refresh',
          description: 'Modernize your brand identity and visual system. Redesign websites with fresh aesthetics while maintaining brand essence.',
          bullets: [
            'Refreshed brand identity and visual system',
            'Established brands, rebranding projects',
            'Design systems, component libraries',
          ],
        },
      ]
    : [
        {
          slug: 'full-website',
          title: 'طراحی و ساخت وب‌سایت کامل',
          description: 'راه‌حل‌های کامل وب‌سایت از طراحی تا راه‌اندازی. سایت‌های مدرن، سریع و مقیاس‌پذیر ساخته شده با Next.js و بهترین روش‌ها.',
          bullets: [
            'سایت منسجم، سریع و مدرن',
            'برندهای در حال رشد، SaaS، کسب‌وکارهای محلی',
            'Next.js، Vercel، ابزارهای هوش مصنوعی',
          ],
        },
        {
          slug: 'landing-page',
          title: 'صفحه فرود سینمایی',
          description: 'صفحات فرود با نرخ تبدیل بالا با طراحی سینمایی و انیمیشن‌های روان. ساخته شده برای کمپین‌ها، راه‌اندازی محصول و تبدیل.',
          bullets: [
            'صفحات با نرخ تبدیل بالا و بصری چشمگیر',
            'راه‌اندازی محصول، کمپین‌ها، تولید لید',
            'Next.js، GSAP، Tailwind CSS',
          ],
        },
        {
          slug: 'ai-automation',
          title: 'اتوماسیون و ادغام هوش مصنوعی',
          description: 'سیستم‌های اتوماسیون هوشمند و ادغام‌های هوش مصنوعی که کار دستی را کاهش می‌دهند و تجربیات کاربری را بهبود می‌بخشند.',
          bullets: [
            'گردش‌های کاری خودکار و ویژگی‌های مبتنی بر هوش مصنوعی',
            'SaaS، تجارت الکترونیک، کسب‌وکارهای خدماتی',
            'OpenAI، LangChain، ادغام‌های سفارشی',
          ],
        },
        {
          slug: 'brand-refresh',
          title: 'نوسازی برند و بصری',
          description: 'هویت برند و سیستم بصری خود را مدرن کنید. بازطراحی وب‌سایت‌ها با زیبایی‌شناسی تازه در حالی که جوهره برند حفظ می‌شود.',
          bullets: [
            'هویت برند و سیستم بصری تازه',
            'برندهای تثبیت شده، پروژه‌های بازطراحی برند',
            'سیستم‌های طراحی، کتابخانه‌های کامپوننت',
          ],
        },
      ]

  const viewDetailsLabel = isEN ? 'View details' : 'مشاهده جزئیات'

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-surface-alt">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 ${isEN ? '' : 'rtl'}`}>
            <h2 className="text-h1 font-semibold text-text-primary mb-4">
              {isEN ? 'Services' : 'خدمات'}
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              {isEN 
                ? 'What we do to craft cinematic, AI-powered web experiences.'
                : 'آنچه برای ساخت تجربه‌های وب سینمایی انجام می‌دهیم.'}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-surface border border-border-subtle rounded-xl p-6 hover:border-orange/50 hover:shadow-card-hover transition-all"
              >
                <h3 className="text-h4 font-semibold text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-body text-text-secondary mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <ul className={`space-y-2 mb-6 ${isEN ? '' : 'rtl'}`}>
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-body-sm text-text-secondary">
                      <span className="text-orange mt-1.5 flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* View Details Link */}
                <Link
                  href={getRoute(`/services/${service.slug}`)}
                  className="inline-flex items-center gap-2 text-body-sm font-medium text-orange hover:gap-3 transition-all group/link"
                >
                  <span>{viewDetailsLabel}</span>
                  <ArrowRight 
                    size={16} 
                    className={`transition-transform group-hover/link:translate-x-1 ${isEN ? '' : 'rtl:rotate-180'}`}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

