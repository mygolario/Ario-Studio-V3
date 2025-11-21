/**
 * Case Study Template Component
 * 
 * Layout router for case study pages.
 * Selects the appropriate layout component based on item.layoutType.
 * 
 * Supported Layouts:
 * - basic: Simple, clean layout (default)
 * - cinematic: Full-width, cinematic layout with emphasis on visuals
 * - split: Two-column layout with text and images side by side
 * - story: Story-driven layout (future implementation)
 * 
 * Features:
 * - Dynamic layout selection based on content metadata
 * - Full bilingual support (FA/EN) with RTL/LTR
 * - Fallback to basic layout if layoutType is not specified
 */

import { type LocalizedContent } from '@/lib/content/types'
import { type SupportedLang } from '@/lib/i18n'
import BasicCaseStudyLayout from './layouts/BasicCaseStudyLayout'
import CinematicCaseStudyLayout from './layouts/CinematicCaseStudyLayout'
import SplitCaseStudyLayout from './layouts/SplitCaseStudyLayout'

interface CaseStudyTemplateProps {
  item: LocalizedContent
  lang: SupportedLang
}

/**
 * Layout Router for Case Study Pages
 * 
 * Selects the appropriate layout component based on item.layoutType.
 * Falls back to 'basic' layout if layoutType is not specified.
 */
export default function CaseStudyTemplate({ item, lang }: CaseStudyTemplateProps) {
  const layoutType = item.layoutType ?? 'basic'

  switch (layoutType) {
    case 'cinematic':
      return <CinematicCaseStudyLayout lang={lang} item={item} />
    
    case 'split':
      return <SplitCaseStudyLayout lang={lang} item={item} />
    
    case 'story':
      // TODO: Implement StoryCaseStudyLayout in the future
      // For now, fallback to basic
      return <BasicCaseStudyLayout lang={lang} item={item} />
    
    case 'basic':
    default:
      return <BasicCaseStudyLayout lang={lang} item={item} />
  }
}

