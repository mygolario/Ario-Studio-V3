/**
 * Basic Case Study Layout
 * 
 * A simple, clean layout for case studies with standard sections.
 * Suitable for regular projects with standard content structure.
 * 
 * Structure:
 * - Hero (title, excerpt, featured image)
 * - Overview → Problem → Solution → Process → Result
 * - Gallery
 * - CTA
 */

import Image from 'next/image'
import Link from 'next/link'
import { type LocalizedContent } from '@/lib/content/types'
import { type SupportedLang } from '@/lib/i18n'
import Button from '@/components/Button'

interface BasicCaseStudyLayoutProps {
  lang: SupportedLang
  item: LocalizedContent
}

/**
 * UI strings for the basic layout (bilingual)
 */
function getUITexts(lang: SupportedLang) {
  return {
    backToWork: lang === 'fa' ? 'بازگشت به کارها' : 'Back to work',
    startProject: lang === 'fa' ? 'شروع پروژه' : 'Start a project',
    overview: lang === 'fa' ? 'نمای کلی' : 'Overview',
    problem: lang === 'fa' ? 'چالش' : 'Problem',
    solution: lang === 'fa' ? 'راه‌حل' : 'Solution',
    process: lang === 'fa' ? 'فرآیند' : 'Process',
    result: lang === 'fa' ? 'نتیجه' : 'Result',
    gallery: lang === 'fa' ? 'گالری تصاویر' : 'Gallery',
    startYourProject: lang === 'fa' ? 'شروع پروژه شما' : 'Start Your Project',
    readyToStart: lang === 'fa' ? 'آماده شروع پروژه خود هستید؟' : 'Ready to start your project?',
    letsBuild: lang === 'fa' ? 'بیایید چیزی با ارزش بلندمدت بسازیم.' : "Let's build something with long-term value.",
    placeholderContent: lang === 'fa' ? '(این بخش هنوز تکمیل نشده است)' : '(This section is not yet completed)',
    placeholderImage: lang === 'fa' ? 'تصویر' : 'Image',
    role: lang === 'fa' ? 'نقش' : 'Role',
    stack: lang === 'fa' ? 'تکنولوژی' : 'Stack',
  }
}

export default function BasicCaseStudyLayout({ lang, item }: BasicCaseStudyLayoutProps) {
  const ui = getUITexts(lang)
  const isRTL = lang === 'fa'
  const dir = isRTL ? 'rtl' : 'ltr'

  // Extract sections
  const sections = {
    overview: item.bodyIntro ?? null,
    problem: item.bodyProblem ?? null,
    solution: item.bodySolution ?? null,
    process: item.bodyProcess ?? null,
    result: item.bodyResult ?? null,
  }

  // Determine status from tags
  let status: string = item.tags?.find(tag => 
    tag.toLowerCase().includes('live') || 
    tag.toLowerCase().includes('فعال') ||
    tag.toLowerCase().includes('concept') ||
    tag.toLowerCase().includes('کانسپت') ||
    tag.toLowerCase().includes('development') ||
    tag.toLowerCase().includes('توسعه')
  ) || (lang === 'fa' ? 'در حال توسعه' : 'In development')

  // Extract role and stack from tags
  const roleTag = item.tags?.find(tag => tag.toLowerCase().includes('role') || tag.toLowerCase().includes('نقش'))
  const role = roleTag || (lang === 'fa' ? 'طراحی و ساخت' : 'Design & Build')
  
  const stackTags = item.tags?.filter(tag => 
    !tag.toLowerCase().includes('live') &&
    !tag.toLowerCase().includes('فعال') &&
    !tag.toLowerCase().includes('concept') &&
    !tag.toLowerCase().includes('کانسپت') &&
    !tag.toLowerCase().includes('development') &&
    !tag.toLowerCase().includes('توسعه') &&
    !tag.toLowerCase().includes('role') &&
    !tag.toLowerCase().includes('نقش')
  ) || []

  return (
    <main className="relative min-h-screen bg-base" dir={dir}>
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-base/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="container-custom">
          <div className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link
              href={`/${lang}/work`}
              className="text-body-sm text-text-secondary hover:text-orange transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                />
              </svg>
              {ui.backToWork}
            </Link>
            <Link
              href="/#contact"
              className="text-body-sm text-text-secondary hover:text-orange transition-colors"
            >
              {ui.startProject}
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-base">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Status Badge */}
            <div className="mb-6">
              <span className="inline-block text-label text-text-muted bg-surface-alt border border-border-subtle px-4 py-1.5 rounded-full">
                {status}
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-hero md:text-[64px] md:leading-[72px] font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {item.title}
            </h1>

            {/* Subtitle/Excerpt */}
            {item.excerpt && (
              <p className={`text-body-lg md:text-xl text-text-secondary mb-8 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {item.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className={`flex flex-wrap items-center gap-6 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {role && (
                <>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <span className="text-body-sm text-text-muted">{ui.role}</span>
                    <p className="text-body font-medium text-text-primary">{role}</p>
                  </div>
                  {stackTags.length > 0 && (
                    <div className="w-px h-8 bg-border-subtle" />
                  )}
                </>
              )}
              {stackTags.length > 0 && (
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <span className="text-body-sm text-text-muted">{ui.stack}</span>
                  <p className="text-body font-medium text-text-primary">{stackTags.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="relative w-full h-[60vh] min-h-[400px] bg-surface-alt overflow-hidden">
        {item.featuredImage ? (
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-alt to-surface border-b border-border-subtle border-dashed">
            <span className="text-body-lg text-text-muted">{ui.placeholderImage}</span>
          </div>
        )}
      </div>

      {/* Overview Section */}
      {sections.overview && (
        <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.overview}
              </h2>
              <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.overview}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Problem Section */}
      {sections.problem && (
        <section className="relative py-16 md:py-24 overflow-hidden bg-base">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.problem}
              </h2>
              <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.problem}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Solution Section */}
      {sections.solution && (
        <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.solution}
              </h2>
              <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.solution}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {sections.process && (
        <section className="relative py-16 md:py-24 overflow-hidden bg-base">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.process}
              </h2>
              <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.process}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Result Section */}
      {sections.result && (
        <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.result}
              </h2>
              <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.result}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {item.galleryImages && item.galleryImages.length > 0 && (
        <section className="relative py-16 md:py-24 overflow-hidden bg-base">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-h2 font-semibold text-text-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.gallery}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {item.galleryImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-video bg-surface-alt border border-border-subtle rounded-lg overflow-hidden"
                  >
                    <Image
                      src={imageUrl}
                      alt={`${item.title} - Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call-to-Action Section */}
      <section className="relative py-32 overflow-hidden bg-surface-alt">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-h1 font-semibold text-text-primary mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {ui.readyToStart}
            </h2>
            <p className={`text-body-lg text-text-secondary mb-8 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {ui.letsBuild}
            </p>
            <Button href="/#contact" variant="primary" className="!px-12 !py-5">
              {ui.startYourProject}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

