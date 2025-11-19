'use client'

import { useState, useEffect, useRef, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Button from './Button'
import { animateSectionReveal } from '@/lib/gsapClient'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { createLeadAction, type CreateLeadActionResult } from '@/app/actions/create-lead'
import { type SupportedLang } from '@/lib/i18n'
import { type LocalizedContent } from '@/lib/content/types'
import { trackEvent } from '@/lib/analytics/trackEvent'

/**
 * Start Project Section
 * 
 * A high-quality contact/project initiation form with validation and user feedback.
 * Supports bilingual (FA/EN) form submission and error messages.
 * 
 * TODO: Future improvements
 *   - [ ] Add CAPTCHA for spam prevention
 *   - [ ] Add rate limiting UI feedback
 *   - [ ] Add file upload support for project briefs
 *   - [ ] Add form field validation on blur (not just submit)
 *   - [ ] Add auto-save draft functionality
 */
export default function StartProjectSection() {
  const t = useTranslation()
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const sectionRef = useRef<HTMLElement>(null)
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<CreateLeadActionResult | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [servicesList, setServicesList] = useState<LocalizedContent[]>([])
  const [loadingServices, setLoadingServices] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    serviceSlug: '',
    projectType: '',
    budget: '',
    budgetRange: '',
    timeline: '',
    businessType: '',
    message: '',
  })

  const services = t.startProject.services
  const projectTypes = t.projectTypes
  const budgetRanges = t.budgetRanges
  const lang: SupportedLang = language === 'fa' ? 'fa' : 'en'

  // Helper functions for option labels (bilingual)
  // For FA locale, use Toman ranges from translations; for EN, use USD
  const getBudgetRangeLabel = (value: string): string => {
    if (lang === 'fa') {
      // Map USD keys to Toman ranges from translations
      const tomanMapping: Record<string, string> = {
        'under-1000': 'کمتر از ۵ میلیون تومان',
        '1000-3000': '۵ تا ۱۵ میلیون تومان',
        '3000-6000': '۱۵ تا ۳۰ میلیون تومان',
        'above-6000': '۳۰ تا ۸۰ میلیون تومان',
      }
      return tomanMapping[value] || value
    } else {
      // English: USD format
      const labels: Record<string, string> = {
        'under-1000': 'Under $1,000',
        '1000-3000': '$1,000 - $3,000',
        '3000-6000': '$3,000 - $6,000',
        'above-6000': 'Above $6,000',
      }
      return labels[value] || value
    }
  }

  const getTimelineLabel = (value: string): string => {
    const labels: Record<string, { fa: string; en: string }> = {
      'asap': { fa: 'هرچه سریع‌تر', en: 'ASAP' },
      '1-3-months': { fa: '۱ تا ۳ ماه', en: '1-3 months' },
      'flexible': { fa: 'انعطاف‌پذیر', en: 'Flexible' },
    }
    return labels[value]?.[lang] || value
  }

  const getBusinessTypeLabel = (value: string): string => {
    const labels: Record<string, { fa: string; en: string }> = {
      'startup': { fa: 'استارتاپ', en: 'Startup' },
      'personal-brand': { fa: 'برند شخصی', en: 'Personal Brand' },
      'agency': { fa: 'آژانس', en: 'Agency' },
      'local-business': { fa: 'بیزنس محلی', en: 'Local Business' },
      'other': { fa: 'سایر', en: 'Other' },
    }
    return labels[value]?.[lang] || value
  }

  const budgetRangeOptions = ['under-1000', '1000-3000', '3000-6000', 'above-6000']
  const timelineOptions = ['asap', '1-3-months', 'flexible']
  const businessTypeOptions = ['startup', 'personal-brand', 'agency', 'local-business', 'other']

  // Load services from API
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoadingServices(true)
        const response = await fetch(`/api/services?lang=${lang}`)
        const data = await response.json()
        if (data.success && data.items) {
          setServicesList(data.items)
        }
      } catch (error) {
        console.error('Failed to load services:', error)
      } finally {
        setLoadingServices(false)
      }
    }
    loadServices()
  }, [lang])

  // Read serviceSlug from URL query params
  useEffect(() => {
    const serviceSlug = searchParams.get('service')
    if (serviceSlug) {
      setFormData((prev) => ({ ...prev, serviceSlug }))
    }
  }, [searchParams])

  useEffect(() => {
    if (sectionRef.current) {
      animateSectionReveal(sectionRef, {
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      }).catch(() => {
        if (sectionRef.current) {
          sectionRef.current.style.opacity = '1'
          sectionRef.current.style.transform = 'translateY(0)'
        }
      })
    }
  }, [])

  // Extract errors from result
  const errors = result && !result.success ? result.errors || {} : {}
  const isSuccess = result?.success === true

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (result && !result.success && result.errors?.[name as keyof typeof result.errors]) {
      setResult(null)
    }
  }

  const handleServiceClick = (service: string) => {
    setSelectedService(service)
    // Map service to project type
    const serviceToProjectType: Record<string, string> = {
      'Cinematic web experiences': 'Full website',
      'Next.js engineering': 'Frontend only',
      'AI agents & automations': 'AI automation',
      'UX & motion systems': 'Consulting',
    }
    const mappedType = serviceToProjectType[service] || ''
    if (mappedType) {
      setFormData((prev) => ({ ...prev, projectType: mappedType }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Build servicesNeeded array from selectedService
    const servicesNeeded = selectedService ? [selectedService] : []

    // Create FormData
    const formDataObj = new FormData()
    formDataObj.append('name', formData.name)
    formDataObj.append('email', formData.email)
    formDataObj.append('message', formData.message)
    if (formData.company) {
      formDataObj.append('companyName', formData.company)
    }
    if (formData.website) {
      formDataObj.append('website', formData.website)
    }
    if (formData.serviceSlug) {
      formDataObj.append('serviceSlug', formData.serviceSlug)
    }
    if (formData.projectType) {
      formDataObj.append('projectType', formData.projectType)
    }
    if (formData.budget || formData.budgetRange) {
      formDataObj.append('budgetRange', formData.budgetRange || formData.budget)
    }
    if (formData.timeline) {
      formDataObj.append('timeline', formData.timeline)
    }
    if (formData.businessType) {
      formDataObj.append('businessType', formData.businessType)
    }
    if (servicesNeeded.length > 0) {
      formDataObj.append('servicesNeeded', servicesNeeded.join(','))
    }
    formDataObj.append('source', 'start_project_form')
    // Add language to FormData for server action
    formDataObj.append('lang', lang)

    startTransition(async () => {
      const actionResult = await createLeadAction(formDataObj)
      setResult(actionResult)

      if (actionResult.success) {
        // Track successful submission
        trackEvent('contact_submit_success', {
          lang,
          serviceSlug: formData.serviceSlug || '',
          budgetRange: formData.budgetRange || formData.budget || '',
          timeline: formData.timeline || '',
          businessType: formData.businessType || '',
        })

        // Clear form on success (keep serviceSlug if it came from URL)
        const serviceSlugFromUrl = searchParams.get('service')
        setFormData({ 
          name: '', 
          email: '', 
          company: '',
          website: '',
          serviceSlug: serviceSlugFromUrl || '',
          projectType: '', 
          budget: '',
          budgetRange: '',
          timeline: '',
          businessType: '',
          message: '' 
        })
        setSelectedService(null)
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setResult(null)
        }, 5000)
      } else {
        // Track error
        trackEvent('contact_submit_error', {
          lang,
          errorType: actionResult.errors ? 'validation' : 'server',
        })
      }
    })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden bg-base"
    >
      {/* Enhanced background with cinematic glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange/5 to-transparent opacity-30 pointer-events-none" />
      
      {/* Subtle vertical light streak */}
      <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-orange/20 to-transparent opacity-50 pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header with CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
            className="text-center mb-20"
          >
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'power3.out' }}
              className="mb-4"
            >
              <span className="text-label text-orange uppercase tracking-wider font-medium">
                {t.startProject.label}
              </span>
            </motion.div>

            {/* Main Heading with cinematic glow */}
            <div className="relative inline-block mb-6">
              {/* Glow effect behind heading */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange/20 via-orange/10 to-orange/20 blur-3xl opacity-50 -z-10" />
              <h2 className="text-h1 md:text-[56px] md:leading-[64px] font-semibold text-text-primary mb-4 relative z-10">
                {t.startProject.title}
              </h2>
            </div>
            
            {/* Section accent line */}
            <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto mb-6" />
            
            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'power3.out', delay: 0.2 }}
              className="text-body-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12"
            >
              {t.startProject.subtitle}
            </motion.p>

            {/* CTA Buttons - Staggered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'power3.out', delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'power3.out', delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button href="#contact-form" variant="primary" className="!px-10 !py-5 !text-lg">
                  {t.startProject.ctaPrimary}
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'power3.out', delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button href="#contact-form" variant="secondary" icon={false} className="!px-10 !py-5 !text-lg">
                  {t.startProject.ctaSecondary}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'power3.out', delay: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* LEFT COLUMN - Services Pills */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-h4 font-semibold text-text-primary mb-6">
                    {t.form.whatWeCanHelp}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {services.map((service, index) => (
                      <motion.button
                        key={service}
                        data-animate-child
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                        onClick={() => handleServiceClick(service)}
                        className={`px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-200 border ${
                          selectedService === service
                            ? 'bg-orange text-pure-white border-orange shadow-soft'
                            : 'bg-surface text-text-secondary border-border-subtle hover:border-orange hover:text-orange hover:bg-orange/5'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {service}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-8 border-t border-border-subtle">
                  <p className="text-body-sm text-text-muted mb-4">
                    {t.form.weRespond}
                  </p>
                  <a
                    href="mailto:info@ariostudio.net"
                    className="text-body-lg text-text-secondary hover:text-orange transition-colors"
                  >
                    info@ariostudio.net
                  </a>
                </div>
              </div>

              {/* RIGHT COLUMN - Form */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-surface border border-border-subtle rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-200"
                >
                {isSuccess ? (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-4"
                    >
                      <svg
                        className="w-8 h-8 text-orange"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <h3 className="text-h4 font-semibold text-text-primary mb-2">
                      {t.form.thanksForReachingOut}
                    </h3>
                    <p className="text-body text-text-secondary">
                      {t.form.weWillGetBack}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        {t.form.name} <span className="text-orange">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-border-subtle'
                        }`}
                        placeholder={t.form.yourName}
                      />
                      {errors.name && (
                        <p className="mt-1 text-body-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        {t.form.email} <span className="text-orange">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-border-subtle'
                        }`}
                        placeholder={t.form.yourEmail}
                      />
                      {errors.email && (
                        <p className="mt-1 text-body-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        {lang === 'fa' ? 'نام برند/بیزنس' : 'Company/Brand Name'}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
                        placeholder={lang === 'fa' ? 'نام برند یا شرکت شما' : 'Your company or brand name'}
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label
                        htmlFor="website"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        {lang === 'fa' ? 'لینک سایت فعلی' : 'Current Website'}
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                          errors.website
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-border-subtle'
                        }`}
                        placeholder={lang === 'fa' ? 'https://example.com' : 'https://example.com'}
                      />
                      {errors.website && (
                        <p className="mt-1 text-body-sm text-red-500">{errors.website}</p>
                      )}
                    </div>

                    {/* Service Slug */}
                    <div>
                      <label
                        htmlFor="serviceSlug"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        {lang === 'fa' ? 'سرویس مورد نظر' : 'Service'}
                      </label>
                      <select
                        id="serviceSlug"
                        name="serviceSlug"
                        value={formData.serviceSlug}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
                      >
                        <option value="">{lang === 'fa' ? 'انتخاب سرویس' : loadingServices ? 'Loading...' : 'Select a service'}</option>
                        {servicesList.map((service) => (
                          <option key={service.slug} value={service.slug}>
                            {service.title}
                          </option>
                        ))}
                        {servicesList.length === 0 && !loadingServices && (
                          <option value="">{lang === 'fa' ? 'هنوز مطمئن نیستم' : "I'm not sure"}</option>
                        )}
                      </select>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        {t.form.projectType}
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
                      >
                        <option value="">{t.form.selectType}</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label
                        htmlFor="budgetRange"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        {lang === 'fa' ? 'رنج بودجه' : 'Budget Range'}
                      </label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
                      >
                        <option value="">{lang === 'fa' ? 'انتخاب بودجه' : 'Select budget range'}</option>
                        {budgetRangeOptions.map((value) => (
                          <option key={value} value={value}>
                            {getBudgetRangeLabel(value)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label
                        htmlFor="timeline"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        {lang === 'fa' ? 'بازه زمانی' : 'Timeline'}
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
                      >
                        <option value="">{lang === 'fa' ? 'انتخاب بازه زمانی' : 'Select timeline'}</option>
                        {timelineOptions.map((value) => (
                          <option key={value} value={value}>
                            {getTimelineLabel(value)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Business Type */}
                    <div>
                      <label
                        htmlFor="businessType"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        {lang === 'fa' ? 'نوع بیزنس' : 'Business Type'}
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
                      >
                        <option value="">{lang === 'fa' ? 'انتخاب نوع بیزنس' : 'Select business type'}</option>
                        {businessTypeOptions.map((value) => (
                          <option key={value} value={value}>
                            {getBusinessTypeLabel(value)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        {t.form.projectDetails} <span className="text-orange">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none ${
                          errors.message
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-border-subtle'
                        }`}
                        placeholder={t.form.tellUsAbout}
                      />
                      {errors.message && (
                        <p className="mt-1 text-body-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full group relative px-8 py-4 font-medium rounded-full transition-all duration-200 flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 bg-orange text-pure-white shadow-soft hover:shadow-card hover:scale-105 active:scale-[0.97] hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-soft"
                      >
                        {isPending ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            {t.form.submitting}
                          </span>
                        ) : (
                          <>
                            <span>{t.form.startYourProject}</span>
                            <svg
                              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>

                    {result && !result.success && result.message && (
                      <p className="text-body-sm text-red-500 text-center">{result.message}</p>
                    )}
                    {result && !result.success && result.errors?._form && (
                      <p className="text-body-sm text-red-500 text-center">{result.errors._form}</p>
                    )}
                  </form>
                )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

