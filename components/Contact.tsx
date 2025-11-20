'use client'

import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Contact Section
 * 
 * Simple, clean contact section with email link and placeholder for future form.
 */
export default function Contact() {
  const t = useTranslation()
  const { language } = useLanguage()
  const isRTL = language === 'fa'

  // Contact email
  const contactEmail = 'info@ariostudio.net'

  // Localized content
  const content = isRTL
    ? {
        title: 'تماس با ما',
        description: 'برای همکاری یا پرسش، می‌توانید از طریق ایمیل با ما در ارتباط باشید.',
        placeholder: 'نسخه جدید فرم به‌زودی در این بخش قرار می‌گیرد.',
      }
    : {
        title: 'Contact Us',
        description: 'For collaborations or questions, you can reach us by email.',
        placeholder: 'The new project request form will appear here soon.',
      }

  return (
    <section
      id="contact"
      className={`relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-base ${isRTL ? 'rtl' : ''}`}
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className={`text-center space-y-8 ${isRTL ? 'rtl:text-right' : ''}`}>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-h1 font-semibold text-text-primary mb-4">
                {content.title}
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>

            {/* Description */}
            <p className="text-body-lg text-text-secondary leading-relaxed mb-8">
              {content.description}
            </p>

            {/* Email Contact */}
            <div className="pt-4">
              <a
                href={`mailto:${contactEmail}`}
                className="text-body-lg text-text-secondary hover:text-orange transition-colors"
              >
                {contactEmail}
              </a>
            </div>

            {/* Placeholder for future form */}
            <div className="pt-8">
              <div className="bg-surface border border-border-subtle rounded-xl p-8 text-center">
                <p className="text-body text-text-muted">
                  {content.placeholder}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
