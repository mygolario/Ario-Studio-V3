/**
 * Case Study Template Component
 * 
 * A fixed, professional template for case study detail pages.
 * This component provides a consistent structure regardless of content availability.
 * 
 * Features:
 * - Hero Section with title, excerpt, and featured image
 * - Project Overview Section
 * - Problem, Solution, Process, Result Sections
 * - Gallery Section (if images available)
 * - Call-to-Action Section
 * - Full bilingual support (FA/EN) with RTL/LTR
 * - Placeholder support for missing content
 */

import Image from 'next/image'
import Link from 'next/link'
import { type LocalizedContent } from '@/lib/content/types'
import { type SupportedLang } from '@/lib/i18n'
import Button from '@/components/Button'

interface CaseStudyTemplateProps {
  item: LocalizedContent
  lang: SupportedLang
}

/**
 * UI strings for the case study template (bilingual)
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
    placeholderContent: lang === 'fa' ? '(هنوز محتوای این بخش تکمیل نشده است)' : '(Content for this section is not yet available)',
    placeholderImage: lang === 'fa' ? 'تصویر' : 'Image',
    role: lang === 'fa' ? 'نقش' : 'Role',
    stack: lang === 'fa' ? 'تکنولوژی' : 'Stack',
    status: lang === 'fa' ? 'وضعیت' : 'Status',
  }
}

/**
 * Extract section content from body or tags
 * This is a helper to parse structured content from the body field
 */
function extractSectionContent(body: string | null | undefined, sectionKey: string): string | null {
  if (!body) return null
  
  // Look for markdown-style headers or structured content
  // Format: ## Problem\n...content...\n## Solution\n...content...
  const regex = new RegExp(`##\\s+${sectionKey}[\\s\\S]*?(?=##|$)`, 'i')
  const match = body.match(regex)
  
  if (match) {
    // Remove the header and return the content
    return match[0].replace(new RegExp(`##\\s+${sectionKey}\\s*`, 'i'), '').trim()
  }
  
  return null
}

/**
 * Parse body content into sections
 * Supports both structured format (## Problem, ## Solution, etc.) and plain text
 */
function parseBodySections(body: string | null | undefined) {
  if (!body) {
    return {
      overview: null,
      problem: null,
      solution: null,
      process: null,
      result: null,
    }
  }

  // Try to extract structured sections
  const problem = extractSectionContent(body, 'Problem') || extractSectionContent(body, 'چالش')
  const solution = extractSectionContent(body, 'Solution') || extractSectionContent(body, 'راه‌حل')
  const process = extractSectionContent(body, 'Process') || extractSectionContent(body, 'فرآیند')
  const result = extractSectionContent(body, 'Result') || extractSectionContent(body, 'نتیجه')

  // If no structured sections found, use body as overview
  const hasStructuredSections = problem || solution || process || result
  const overview = hasStructuredSections ? null : body

  return {
    overview,
    problem,
    solution,
    process,
    result,
  }
}

export default function CaseStudyTemplate({ item, lang }: CaseStudyTemplateProps) {
  const ui = getUITexts(lang)
  const isRTL = lang === 'fa'
  const dir = isRTL ? 'rtl' : 'ltr'
  
  // Use new structured fields if available, otherwise fallback to parsing body
  const sections = {
    overview: item.bodyIntro ?? null,
    problem: item.bodyProblem ?? null,
    solution: item.bodySolution ?? null,
    process: item.bodyProcess ?? null,
    result: item.bodyResult ?? null,
  }
  
  // If structured fields are not available, try parsing body as fallback
  if (!sections.overview && !sections.problem && !sections.solution && !sections.process && !sections.result) {
    const parsedSections = parseBodySections(item.body)
    Object.assign(sections, parsedSections)
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

  // Extract role and stack from tags (if available)
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

  // Placeholder image URL (can be replaced with actual placeholder)
  const placeholderImageUrl = '/placeholder-case-study.jpg'

  return (
    <main className="relative min-h-screen bg-base" dir={dir}>
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-base/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="container-custom">
          <div className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link
              href="/#portfolio"
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

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-body-sm font-medium text-text-secondary bg-surface-alt border border-border-subtle px-4 py-1.5 rounded-full hover:border-orange hover:text-orange transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Image - Show featuredImage if available, otherwise placeholder */}
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-alt to-surface border-b border-border-subtle">
            <span className="text-body-lg text-text-muted">{ui.placeholderImage}</span>
          </div>
        )}
      </div>

      {/* Project Overview Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {ui.overview}
            </h2>
            {sections.overview ? (
              <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.overview}
              </div>
            ) : item.subtitle ? (
              <p className={`text-body-lg text-text-secondary leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {item.subtitle}
              </p>
            ) : (
              <p className={`text-body-lg text-text-secondary/50 italic ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.placeholderContent}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-base">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {ui.problem}
            </h2>
            {sections.problem ? (
              <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.problem}
              </div>
            ) : (
              <p className={`text-body-lg text-text-secondary/50 italic ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.placeholderContent}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {ui.solution}
            </h2>
            {sections.solution ? (
              <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.solution}
              </div>
            ) : (
              <p className={`text-body-lg text-text-secondary/50 italic ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.placeholderContent}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Process Section - Always show, with placeholder if empty */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-base">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {ui.process}
            </h2>
            {sections.process ? (
              <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.process}
              </div>
            ) : (
              <p className={`text-body-lg text-text-secondary/50 italic ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.placeholderContent}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Result Section - Always show, with placeholder if empty */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-h2 font-semibold text-text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {ui.result}
            </h2>
            {sections.result ? (
              <div className={`text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                {sections.result}
              </div>
            ) : (
              <p className={`text-body-lg text-text-secondary/50 italic ${isRTL ? 'text-right' : 'text-left'}`}>
                {ui.placeholderContent}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section - Show galleryImages if available, otherwise placeholder grid */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-base">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-h2 font-semibold text-text-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              {ui.gallery}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item.galleryImages && item.galleryImages.length > 0 ? (
                item.galleryImages.map((imageUrl, index) => (
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
                ))
              ) : (
                // Placeholder grid if no images
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-video bg-surface-alt border border-border-subtle rounded-lg flex items-center justify-center"
                  >
                    <span className="text-body-sm text-text-muted">{ui.placeholderImage}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

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

