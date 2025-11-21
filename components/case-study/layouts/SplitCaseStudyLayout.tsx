/**
 * Split Case Study Layout
 * 
 * A two-column layout with text on one side and images/highlights on the other.
 * Desktop: Two columns side by side
 * Mobile: Stacked vertically
 * 
 * Structure:
 * - Hero (title, excerpt)
 * - Split sections: Left (text) | Right (images/gallery)
 * - CTA
 */

import Image from 'next/image'
import Link from 'next/link'
import { type LocalizedContent } from '@/lib/content/types'
import { type SupportedLang } from '@/lib/i18n'
import Button from '@/components/Button'

interface SplitCaseStudyLayoutProps {
  lang: SupportedLang
  item: LocalizedContent
}

/**
 * UI strings for the split layout (bilingual)
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

export default function SplitCaseStudyLayout({ lang, item }: SplitCaseStudyLayoutProps) {
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

  // Get gallery images for right column
  const galleryImages = item.galleryImages || []
  const hasGallery = galleryImages.length > 0

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
          <div className="max-w-4xl mx-auto text-center">
            {/* Status Badge */}
            <div className="mb-6">
              <span className="inline-block text-label text-text-muted bg-surface-alt border border-border-subtle px-4 py-1.5 rounded-full">
                {status}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-hero md:text-[64px] md:leading-[72px] font-semibold text-text-primary mb-6">
              {item.title}
            </h1>

            {/* Subtitle/Excerpt */}
            {item.excerpt && (
              <p className="text-body-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                {item.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {item.featuredImage && (
        <div className="relative w-full h-[50vh] min-h-[400px] bg-surface-alt overflow-hidden">
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Split Sections */}
      <div className="relative bg-surface-alt">
        {/* Overview Section - Split */}
        {sections.overview && (
          <section className="relative py-16 md:py-24 overflow-hidden">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left: Text */}
                <div className={isRTL ? 'lg:order-2' : ''}>
                  <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {ui.overview}
                  </h2>
                  <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                    {sections.overview}
                  </div>
                </div>
                {/* Right: Image/Content */}
                <div className={isRTL ? 'lg:order-1' : ''}>
                  {hasGallery && galleryImages[0] && (
                    <div className="relative aspect-[4/3] bg-surface border border-border-subtle rounded-lg overflow-hidden">
                      <Image
                        src={galleryImages[0]}
                        alt={`${item.title} - Overview`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Problem Section - Split */}
        {sections.problem && (
          <section className="relative py-16 md:py-24 overflow-hidden bg-base">
            <div className="container-custom">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* Left: Image/Content */}
                <div className={isRTL ? 'lg:order-2' : ''}>
                  {hasGallery && galleryImages[1] && (
                    <div className="relative aspect-[4/3] bg-surface-alt border border-border-subtle rounded-lg overflow-hidden">
                      <Image
                        src={galleryImages[1]}
                        alt={`${item.title} - Problem`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                {/* Right: Text */}
                <div className={isRTL ? 'lg:order-1' : ''}>
                  <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {ui.problem}
                  </h2>
                  <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                    {sections.problem}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Solution Section - Split */}
        {sections.solution && (
          <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left: Text */}
                <div className={isRTL ? 'lg:order-2' : ''}>
                  <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {ui.solution}
                  </h2>
                  <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                    {sections.solution}
                  </div>
                </div>
                {/* Right: Image/Content */}
                <div className={isRTL ? 'lg:order-1' : ''}>
                  {hasGallery && galleryImages[2] && (
                    <div className="relative aspect-[4/3] bg-surface border border-border-subtle rounded-lg overflow-hidden">
                      <Image
                        src={galleryImages[2]}
                        alt={`${item.title} - Solution`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Process Section - Split */}
        {sections.process && (
          <section className="relative py-16 md:py-24 overflow-hidden bg-base">
            <div className="container-custom">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* Left: Image/Content */}
                <div className={isRTL ? 'lg:order-2' : ''}>
                  {hasGallery && galleryImages[3] && (
                    <div className="relative aspect-[4/3] bg-surface-alt border border-border-subtle rounded-lg overflow-hidden">
                      <Image
                        src={galleryImages[3]}
                        alt={`${item.title} - Process`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                {/* Right: Text */}
                <div className={isRTL ? 'lg:order-1' : ''}>
                  <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {ui.process}
                  </h2>
                  <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                    {sections.process}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Result Section - Split */}
        {sections.result && (
          <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left: Text */}
                <div className={isRTL ? 'lg:order-2' : ''}>
                  <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {ui.result}
                  </h2>
                  <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                    {sections.result}
                  </div>
                </div>
                {/* Right: Image/Content */}
                <div className={isRTL ? 'lg:order-1' : ''}>
                  {hasGallery && galleryImages[4] && (
                    <div className="relative aspect-[4/3] bg-surface border border-border-subtle rounded-lg overflow-hidden">
                      <Image
                        src={galleryImages[4]}
                        alt={`${item.title} - Result`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Gallery Section - Full Grid */}
      {hasGallery && galleryImages.length > 5 && (
        <section className="relative py-16 md:py-24 overflow-hidden bg-base">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-h2 font-semibold text-text-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.gallery}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.slice(5).map((imageUrl, index) => (
                  <div
                    key={index + 5}
                    className="relative aspect-video bg-surface-alt border border-border-subtle rounded-lg overflow-hidden"
                  >
                    <Image
                      src={imageUrl}
                      alt={`${item.title} - Gallery ${index + 6}`}
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

