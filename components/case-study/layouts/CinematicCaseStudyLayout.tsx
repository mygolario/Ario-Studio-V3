/**
 * Cinematic Case Study Layout
 * 
 * A cinematic, full-width layout with emphasis on visuals and spacing.
 * Suitable for high-impact case studies with rich media content.
 * 
 * Structure:
 * - Full-width hero with title overlay
 * - Large spacing between sections
 * - Emphasis on images and visual content
 * - Scroll-based sections with more breathing room
 */

import Image from 'next/image'
import Link from 'next/link'
import { type LocalizedContent } from '@/lib/content/types'
import { type SupportedLang } from '@/lib/i18n'
import Button from '@/components/Button'

interface CinematicCaseStudyLayoutProps {
  lang: SupportedLang
  item: LocalizedContent
}

/**
 * UI strings for the cinematic layout (bilingual)
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
  }
}

export default function CinematicCaseStudyLayout({ lang, item }: CinematicCaseStudyLayoutProps) {
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
    tag.toLowerCase().includes('کانسپت')
  ) || (lang === 'fa' ? 'در حال توسعه' : 'In development')

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

      {/* Full-Width Hero with Title Overlay */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {item.featuredImage ? (
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-alt via-surface to-base" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-base/95 via-base/50 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 container-custom text-center">
          <div className="max-w-4xl mx-auto">
            {/* Status Badge */}
            <div className="mb-8">
              <span className="inline-block text-label text-text-muted bg-base/80 backdrop-blur-sm border border-border-subtle px-4 py-1.5 rounded-full">
                {status}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-hero md:text-[80px] md:leading-[90px] font-semibold text-text-primary mb-8">
              {item.title}
            </h1>

            {/* Subtitle/Excerpt */}
            {item.excerpt && (
              <p className="text-body-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                {item.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Overview Section - Large Spacing */}
      {sections.overview && (
        <section className="relative py-32 md:py-48 overflow-hidden bg-base">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-h1 font-semibold text-text-primary mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.overview}
              </h2>
              <div className={`text-body-xl text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.overview}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Problem Section */}
      {sections.problem && (
        <section className="relative py-32 md:py-48 overflow-hidden bg-surface-alt">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-h1 font-semibold text-text-primary mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.problem}
              </h2>
              <div className={`text-body-xl text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.problem}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Solution Section */}
      {sections.solution && (
        <section className="relative py-32 md:py-48 overflow-hidden bg-base">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-h1 font-semibold text-text-primary mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.solution}
              </h2>
              <div className={`text-body-xl text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.solution}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {sections.process && (
        <section className="relative py-32 md:py-48 overflow-hidden bg-surface-alt">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-h1 font-semibold text-text-primary mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.process}
              </h2>
              <div className={`text-body-xl text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.process}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Result Section */}
      {sections.result && (
        <section className="relative py-32 md:py-48 overflow-hidden bg-base">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-h1 font-semibold text-text-primary mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.result}
              </h2>
              <div className={`text-body-xl text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.result}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section - Full Width */}
      {item.galleryImages && item.galleryImages.length > 0 && (
        <section className="relative py-32 overflow-hidden bg-surface-alt">
          <div className="container-custom">
            <div className="max-w-7xl mx-auto">
              <h2 className={`text-h1 font-semibold text-text-primary mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.gallery}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {item.galleryImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] bg-surface border border-border-subtle rounded-xl overflow-hidden"
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
      <section className="relative py-48 overflow-hidden bg-base">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-h1 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {ui.readyToStart}
            </h2>
            <p className={`text-body-xl text-text-secondary mb-12 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {ui.letsBuild}
            </p>
            <Button href="/#contact" variant="primary" className="!px-16 !py-6 text-lg">
              {ui.startYourProject}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

