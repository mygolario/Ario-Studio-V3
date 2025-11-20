'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { servicesConfig } from '@/config/services'
import { Check } from 'lucide-react'
import Button from './Button'
import type { ProjectRequestPayload, ProjectRequestLocale } from '@/types/project-request'

interface MultiStepProjectFormProps {
  lang: ProjectRequestLocale
}

type Step = 1 | 2 | 3 | 4

interface FormErrors {
  name?: string
  email?: string
  projectType?: string
  budgetRange?: string
  deadline?: string
  message?: string
}

export default function MultiStepProjectForm({ lang }: MultiStepProjectFormProps) {
  const pathname = usePathname()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  const [formData, setFormData] = useState<ProjectRequestPayload>({
    name: '',
    email: '',
    projectType: '',
    projectTypeOther: '',
    budgetRange: '',
    deadline: '',
    message: '',
    locale: lang,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isEN = lang === 'en'

  // Budget range options
  const budgetRanges = isEN
    ? [
        { value: 'under-1000', label: 'Under $1,000' },
        { value: '1000-2000', label: '$1,000 – $2,000' },
        { value: '2000-4000', label: '$2,000 – $4,000' },
        { value: 'above-4000', label: 'Above $4,000' },
      ]
    : [
        { value: 'under-20m', label: 'زیر ۲۰ میلیون' },
        { value: '20-40m', label: '۲۰ تا ۴۰ میلیون' },
        { value: '40-80m', label: '۴۰ تا ۸۰ میلیون' },
        { value: 'above-80m', label: 'بیشتر از ۸۰ میلیون' },
      ]

  // Project type options
  const projectTypeOptions = servicesConfig.map(service => ({
    value: service.slug,
    label: isEN ? service.title.en : service.title.fa,
  }))

  // Translations
  const t = {
    stepIndicator: (step: number, total: number) => 
      isEN ? `Step ${step} of ${total}` : `مرحله ${step} از ${total}`,
    step1: {
      title: isEN ? 'Basic information' : 'اطلاعات اولیه',
      name: { label: isEN ? 'Full name' : 'نام و نام خانوادگی', placeholder: isEN ? 'John Doe' : 'علی احمدی' },
      email: { label: isEN ? 'Email' : 'ایمیل', placeholder: isEN ? 'your.email@example.com' : 'your.email@example.com' },
    },
    step2: {
      title: isEN ? 'Project details' : 'جزئیات پروژه',
      projectType: { label: isEN ? 'Project type' : 'نوع پروژه', placeholder: isEN ? 'Select a project type' : 'نوع پروژه را انتخاب کنید' },
      projectTypeOther: { label: isEN ? 'Other (please specify)' : 'سایر (لطفاً مشخص کنید)', placeholder: isEN ? 'Describe your project type' : 'نوع پروژه خود را توضیح دهید' },
      budgetRange: { label: isEN ? 'Approximate budget' : 'بودجه حدودی', placeholder: isEN ? 'Select budget range' : 'محدوده بودجه را انتخاب کنید' },
      deadline: { label: isEN ? 'Ideal timeline / deadline' : 'زمان‌بندی / ددلاین موردنظر', placeholder: isEN ? 'e.g., 3 months' : 'مثلاً ۳ ماه' },
    },
    step3: {
      title: isEN ? 'Goals & message' : 'اهداف و پیام',
      message: { 
        label: isEN ? 'Project goals / message' : 'اهداف پروژه / پیام',
        placeholder: isEN ? 'What are you trying to achieve with this website or project?' : 'با این وب‌سایت یا پروژه دقیقاً می‌خواهید به چه هدفی برسید؟',
        helper: isEN ? 'What are you trying to achieve with this website or project?' : 'با این وب‌سایت یا پروژه دقیقاً می‌خواهید به چه هدفی برسید؟',
      },
    },
    step4: {
      title: isEN ? 'Review & submit' : 'بررسی و ارسال',
      review: {
        name: isEN ? 'Name' : 'نام',
        email: isEN ? 'Email' : 'ایمیل',
        projectType: isEN ? 'Project type' : 'نوع پروژه',
        budgetRange: isEN ? 'Budget range' : 'محدوده بودجه',
        deadline: isEN ? 'Deadline' : 'ددلاین',
        message: isEN ? 'Message' : 'پیام',
      },
    },
    buttons: {
      next: isEN ? 'Next' : 'بعدی',
      back: isEN ? 'Back' : 'قبلی',
      submit: isEN ? 'Submit project request' : 'ارسال درخواست پروژه',
      submitting: isEN ? 'Sending...' : 'در حال ارسال...',
    },
    validation: {
      required: isEN ? 'Required' : 'الزامی',
      invalidEmail: isEN ? 'Please enter a valid email address' : 'لطفاً یک آدرس ایمیل معتبر وارد کنید',
    },
    success: {
      title: isEN ? 'Request received' : 'درخواست شما ثبت شد',
      message: isEN 
        ? "Thank you — we've received your project request. We'll review it and get back to you soon."
        : 'ممنون! درخواست پروژه شما با موفقیت ثبت شد. خیلی زود آن را بررسی می‌کنیم و با شما تماس می‌گیریم.',
      subtext: isEN
        ? "If you need to share additional details, you can reply directly to the confirmation email you'll receive shortly."
        : 'اگر جزئیات بیشتری لازم است، می‌توانید مستقیماً به ایمیل تأییدیه‌ای که برای شما ارسال می‌شود پاسخ بدهید.',
      backHome: isEN ? 'Back to homepage' : 'بازگشت به صفحه اصلی',
    },
    error: {
      message: isEN
        ? 'Something went wrong while sending your request. Please try again, or email us directly.'
        : 'در هنگام ارسال درخواست مشکلی پیش آمد. لطفاً دوباره تلاش کنید یا مستقیماً به ما ایمیل بزنید.',
    },
  }

  // Validation functions
  const validateStep = (step: Step): boolean => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = t.validation.required
      }
      if (!formData.email.trim()) {
        newErrors.email = t.validation.required
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t.validation.invalidEmail
      }
    }

    if (step === 2) {
      if (!formData.projectType && !formData.projectTypeOther?.trim()) {
        newErrors.projectType = t.validation.required
      }
      if (!formData.budgetRange) {
        newErrors.budgetRange = t.validation.required
      }
    }

    if (step === 3) {
      if (!formData.message.trim()) {
        newErrors.message = t.validation.required
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => (prev + 1) as Step)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
      // Clear errors when going back
      setErrors({})
    }
  }

  const handleChange = (field: keyof ProjectRequestPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (field in errors && errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field as keyof FormErrors]: undefined }))
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/start-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          url: pathname,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.message || t.error.message)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(t.error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getProjectTypeLabel = (): string => {
    if (formData.projectType === 'other') {
      return formData.projectTypeOther || (isEN ? 'Other' : 'سایر')
    }
    const service = servicesConfig.find(s => s.slug === formData.projectType)
    return service ? (isEN ? service.title.en : service.title.fa) : formData.projectType
  }

  const getBudgetRangeLabel = (): string => {
    const range = budgetRanges.find(r => r.value === formData.budgetRange)
    return range ? range.label : formData.budgetRange
  }

  // Progress bar percentage
  const progressPercentage = ((currentStep - 1) / 3) * 100

  return (
    <div className={`w-full ${isEN ? '' : 'rtl'}`}>
      {/* Success State */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8"
          >
            {/* Animated Checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative inline-flex items-center justify-center w-20 h-20 mb-6"
            >
              {/* Glow effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute inset-0 bg-orange/20 rounded-full blur-xl"
              />
              {/* Checkmark circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="relative w-20 h-20 bg-orange rounded-full flex items-center justify-center"
              >
                <Check size={40} className="text-pure-white" strokeWidth={3} />
              </motion.div>
            </motion.div>

            <h2 className="text-h3 font-semibold text-text-primary mb-4">
              {t.success.title}
            </h2>
            <p className="text-body text-text-secondary mb-2 max-w-md mx-auto">
              {t.success.message}
            </p>
            <p className="text-body-sm text-text-muted mb-8 max-w-md mx-auto">
              {t.success.subtext}
            </p>

            <Button
              href={isEN ? '/en' : '/'}
              variant="primary"
            >
              {t.success.backHome}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Steps */}
      {submitStatus !== 'success' && (
        <>
          {/* Step Indicator & Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-body-sm text-text-muted">
                {t.stepIndicator(currentStep, 4)}
              </span>
              <span className="text-body-sm text-text-muted">
                {currentStep}/4
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-orange to-orange-light rounded-full"
              />
            </div>

            {/* Step Title */}
            <h2 className="text-h4 font-semibold text-text-primary mt-6 mb-6" id="step-title">
              {currentStep === 1 && t.step1.title}
              {currentStep === 2 && t.step2.title}
              {currentStep === 3 && t.step3.title}
              {currentStep === 4 && t.step4.title}
            </h2>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: isEN ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isEN ? -20 : 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-body-sm font-medium text-text-primary mb-2">
                      {t.step1.name.label} <span className="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                        errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-border-subtle'
                      }`}
                      placeholder={t.step1.name.placeholder}
                    />
                    {errors.name && (
                      <p className="mt-1 text-body-sm text-red-500" role="alert" aria-live="polite">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-body-sm font-medium text-text-primary mb-2">
                      {t.step1.email.label} <span className="text-orange">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-border-subtle'
                      }`}
                      placeholder={t.step1.email.placeholder}
                    />
                    {errors.email && (
                      <p className="mt-1 text-body-sm text-red-500" role="alert" aria-live="polite">{errors.email}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="projectType" className="block text-body-sm font-medium text-text-primary mb-2">
                      {t.step2.projectType.label} <span className="text-orange">*</span>
                    </label>
                    <select
                      id="projectType"
                      value={formData.projectType}
                      onChange={(e) => handleChange('projectType', e.target.value)}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                        errors.projectType
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-border-subtle'
                      }`}
                    >
                      <option value="">{t.step2.projectType.placeholder}</option>
                      {projectTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                      <option value="other">{isEN ? 'Other' : 'سایر'}</option>
                    </select>
                    {errors.projectType && (
                      <p className="mt-1 text-body-sm text-red-500" role="alert" aria-live="polite">{errors.projectType}</p>
                    )}

                    {formData.projectType === 'other' && (
                      <div className="mt-3">
                        <label htmlFor="projectTypeOther" className="block text-body-sm font-medium text-text-primary mb-2">
                          {t.step2.projectTypeOther.label}
                        </label>
                        <input
                          type="text"
                          id="projectTypeOther"
                          value={formData.projectTypeOther}
                          onChange={(e) => handleChange('projectTypeOther', e.target.value)}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-lg border border-border-subtle transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange"
                          placeholder={t.step2.projectTypeOther.placeholder}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="budgetRange" className="block text-body-sm font-medium text-text-primary mb-2">
                      {t.step2.budgetRange.label} <span className="text-orange">*</span>
                    </label>
                    <select
                      id="budgetRange"
                      value={formData.budgetRange}
                      onChange={(e) => handleChange('budgetRange', e.target.value)}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                        errors.budgetRange
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-border-subtle'
                      }`}
                    >
                      <option value="">{t.step2.budgetRange.placeholder}</option>
                      {budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                    {errors.budgetRange && (
                      <p className="mt-1 text-body-sm text-red-500" role="alert" aria-live="polite">{errors.budgetRange}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="deadline" className="block text-body-sm font-medium text-text-primary mb-2">
                      {t.step2.deadline.label}
                    </label>
                    <input
                      type="text"
                      id="deadline"
                      value={formData.deadline}
                      onChange={(e) => handleChange('deadline', e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange"
                      placeholder={t.step2.deadline.placeholder}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Goals & Message */}
              {currentStep === 3 && (
                <div>
                  <label htmlFor="message" className="block text-body-sm font-medium text-text-primary mb-2">
                    {t.step3.message.label} <span className="text-orange">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    disabled={isSubmitting}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-border-subtle'
                    }`}
                    placeholder={t.step3.message.placeholder}
                  />
                  {errors.message && (
                    <p className="mt-1 text-body-sm text-red-500" role="alert" aria-live="polite">{errors.message}</p>
                  )}
                  <p className="mt-2 text-body-sm text-text-muted">
                    {t.step3.message.helper}
                  </p>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-surface-alt border border-border-subtle rounded-lg p-6 space-y-4">
                    <div>
                      <span className="text-body-sm text-text-muted">{t.step4.review.name}:</span>
                      <p className="text-body text-text-primary mt-1">{formData.name}</p>
                    </div>
                    <div>
                      <span className="text-body-sm text-text-muted">{t.step4.review.email}:</span>
                      <p className="text-body text-text-primary mt-1">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-body-sm text-text-muted">{t.step4.review.projectType}:</span>
                      <p className="text-body text-text-primary mt-1">{getProjectTypeLabel()}</p>
                    </div>
                    <div>
                      <span className="text-body-sm text-text-muted">{t.step4.review.budgetRange}:</span>
                      <p className="text-body text-text-primary mt-1">{getBudgetRangeLabel()}</p>
                    </div>
                    {formData.deadline && (
                      <div>
                        <span className="text-body-sm text-text-muted">{t.step4.review.deadline}:</span>
                        <p className="text-body text-text-primary mt-1">{formData.deadline}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-body-sm text-text-muted">{t.step4.review.message}:</span>
                      <p className="text-body text-text-secondary mt-1 whitespace-pre-wrap">{formData.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-subtle">
            <div>
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  icon={false}
                >
                  {t.buttons.back}
                </Button>
              )}
            </div>
            <div>
              {currentStep < 4 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  {t.buttons.next}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  icon={false}
                >
                  {isSubmitting ? t.buttons.submitting : t.buttons.submit}
                </Button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <p className="text-body-sm text-red-500">{errorMessage}</p>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}

