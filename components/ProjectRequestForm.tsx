'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from './Button'
import type { ProjectRequestPayload, ProjectRequestLocale } from '@/types/project-request'

interface ProjectRequestFormProps {
  lang: ProjectRequestLocale
}

type Step = 1 | 2 | 3 | 4

interface FormErrors {
  name?: string
  email?: string
  projectType?: string
  budgetRange?: string
  deadline?: string
}

/**
 * Project Request Form - Multi-step form for project requests
 * 
 * Full-screen modal style form with 4 steps:
 * 1. Basic Info (Name, Email, Optional Phone)
 * 2. Project Type (radio/card selection)
 * 3. Budget Range (locale-specific)
 * 4. Deadline (dropdown)
 */
export default function ProjectRequestForm({ lang }: ProjectRequestFormProps) {
  const pathname = usePathname()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  const [formData, setFormData] = useState<ProjectRequestPayload & { phone?: string }>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    projectTypeOther: '',
    budgetRange: '',
    deadline: '',
    message: '',
    locale: lang,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isRTL = lang === 'fa'

  // Project type options
  const projectTypeOptions = isRTL
    ? [
        { value: 'full-website', label: 'طراحی و ساخت وب‌سایت کامل' },
        { value: 'landing-page', label: 'طراحی و ساخت لندینگ پیج' },
        { value: 'ai-automation', label: 'اتوماسیون و ادغام هوش مصنوعی' },
        { value: 'brand-refresh', label: 'به‌روزرسانی برند و طراحی بصری' },
      ]
    : [
        { value: 'full-website', label: 'Full website design & build' },
        { value: 'landing-page', label: 'Landing page design & build' },
        { value: 'ai-automation', label: 'AI automation & integrations' },
        { value: 'brand-refresh', label: 'Brand & visual refresh' },
      ]

  // Budget range options
  const budgetRanges = isRTL
    ? [
        { value: 'under-20m', label: 'زیر ۲۰ میلیون' },
        { value: '20-40m', label: '۲۰ تا ۴۰ میلیون' },
        { value: '40-80m', label: '۴۰ تا ۸۰ میلیون' },
        { value: 'above-80m', label: 'بیش از ۸۰ میلیون' },
      ]
    : [
        { value: 'under-2000', label: 'Under $2,000' },
        { value: '2000-4000', label: '$2,000–$4,000' },
        { value: '4000-8000', label: '$4,000–$8,000' },
        { value: 'above-8000', label: 'Above $8,000' },
      ]

  // Deadline options
  const deadlineOptions = isRTL
    ? [
        { value: '1-month', label: 'یک ماه' },
        { value: '2-months', label: 'دو ماه' },
        { value: '3-months', label: 'سه ماه' },
        { value: 'flexible', label: 'نامشخص' },
      ]
    : [
        { value: '1-month', label: '1 month' },
        { value: '2-months', label: '2 months' },
        { value: '3-months', label: '3 months' },
        { value: 'flexible', label: 'Flexible' },
      ]

  // Translations
  const t = {
    stepIndicator: (step: number, total: number) => 
      isRTL ? `مرحله ${step} از ${total}` : `Step ${step} of ${total}`,
    step1: {
      title: isRTL ? 'اطلاعات اولیه' : 'Basic information',
      description: isRTL ? 'لطفاً اطلاعات تماس خود را وارد کنید.' : 'Please provide your contact information.',
      name: { label: isRTL ? 'نام و نام خانوادگی' : 'Full name', placeholder: isRTL ? 'علی احمدی' : 'John Doe' },
      email: { label: isRTL ? 'ایمیل' : 'Email', placeholder: isRTL ? 'your.email@example.com' : 'your.email@example.com' },
      phone: { label: isRTL ? 'شماره تماس (اختیاری)' : 'Phone (optional)', placeholder: isRTL ? '09123456789' : '+1 (555) 123-4567' },
    },
    step2: {
      title: isRTL ? 'نوع پروژه' : 'Project type',
      description: isRTL ? 'نوع پروژه موردنظر خود را انتخاب کنید.' : 'Select the type of project you need.',
    },
    step3: {
      title: isRTL ? 'محدوده بودجه' : 'Budget range',
      description: isRTL ? 'محدوده بودجه تقریبی پروژه را انتخاب کنید.' : 'Select your approximate budget range.',
    },
    step4: {
      title: isRTL ? 'ددلاین' : 'Deadline',
      description: isRTL ? 'زمان‌بندی موردنظر برای پروژه را انتخاب کنید.' : 'Select your preferred timeline.',
    },
    buttons: {
      next: isRTL ? 'بعدی' : 'Next',
      back: isRTL ? 'قبلی' : 'Back',
      submit: isRTL ? 'ارسال درخواست' : 'Submit request',
      submitting: isRTL ? 'در حال ارسال...' : 'Sending...',
    },
    validation: {
      required: isRTL ? 'الزامی' : 'Required',
      invalidEmail: isRTL ? 'لطفاً یک آدرس ایمیل معتبر وارد کنید' : 'Please enter a valid email address',
    },
    success: {
      title: isRTL ? 'درخواست شما با موفقیت ارسال شد' : 'Your request has been sent successfully',
      message: isRTL 
        ? 'درخواست شما با موفقیت ارسال شد. به‌زودی با شما تماس می‌گیریم.'
        : "Your request has been sent successfully. We'll contact you soon.",
    },
    error: {
      message: isRTL
        ? 'در هنگام ارسال درخواست مشکلی پیش آمد. لطفاً دوباره تلاش کنید.'
        : 'Something went wrong while sending your request. Please try again.',
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
      if (!formData.projectType) {
        newErrors.projectType = t.validation.required
      }
    }

    if (step === 3) {
      if (!formData.budgetRange) {
        newErrors.budgetRange = t.validation.required
      }
    }

    if (step === 4) {
      if (!formData.deadline) {
        newErrors.deadline = t.validation.required
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
      setErrors({})
    }
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
      // Prepare payload (exclude phone from API, add to message if provided)
      const deadlineLabel = deadlineOptions.find(opt => opt.value === formData.deadline)?.label || formData.deadline
      const projectTypeLabel = projectTypeOptions.find(opt => opt.value === formData.projectType)?.label || formData.projectType
      const budgetLabel = budgetRanges.find(range => range.value === formData.budgetRange)?.label || formData.budgetRange
      
      // Build message with form details
      const messageParts: string[] = []
      if (formData.phone) {
        messageParts.push(isRTL ? `شماره تماس: ${formData.phone}` : `Phone: ${formData.phone}`)
      }
      messageParts.push(isRTL ? `نوع پروژه: ${projectTypeLabel}` : `Project Type: ${projectTypeLabel}`)
      messageParts.push(isRTL ? `بودجه: ${budgetLabel}` : `Budget: ${budgetLabel}`)
      messageParts.push(isRTL ? `ددلاین: ${deadlineLabel}` : `Deadline: ${deadlineLabel}`)
      
      const payload: ProjectRequestPayload = {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        projectTypeOther: formData.projectTypeOther,
        budgetRange: formData.budgetRange,
        deadline: formData.deadline,
        message: messageParts.join('\n'),
        locale: lang,
        url: pathname,
      }

      const response = await fetch('/api/start-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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

  // Progress percentage
  const progressPercentage = ((currentStep - 1) / 3) * 100

  return (
    <div className={`w-full ${isRTL ? 'rtl' : ''}`}>
      {/* Success State */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center py-12"
          >
            {/* Animated Checkmark with Glow */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative inline-flex items-center justify-center w-24 h-24 mb-8"
            >
              {/* Glow effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute inset-0 bg-orange/30 rounded-full blur-2xl"
              />
              {/* Checkmark circle */}
              <div className="relative w-24 h-24 bg-orange rounded-full flex items-center justify-center shadow-lg">
                <Check size={48} className="text-pure-white" strokeWidth={3} />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-h3 font-semibold text-text-primary mb-4"
            >
              {t.success.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-body text-text-secondary mb-8 max-w-md mx-auto"
            >
              {t.success.message}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Button
                href={isRTL ? '/' : '/en'}
                variant="primary"
              >
                {isRTL ? 'بازگشت به صفحه اصلی' : 'Back to homepage'}
              </Button>
            </motion.div>
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
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Step Title & Description */}
              <div className="mb-8">
                <h2 className="text-h4 font-semibold text-text-primary mb-2">
                  {currentStep === 1 && t.step1.title}
                  {currentStep === 2 && t.step2.title}
                  {currentStep === 3 && t.step3.title}
                  {currentStep === 4 && t.step4.title}
                </h2>
                <p className="text-body-sm text-text-secondary">
                  {currentStep === 1 && t.step1.description}
                  {currentStep === 2 && t.step2.description}
                  {currentStep === 3 && t.step3.description}
                  {currentStep === 4 && t.step4.description}
                </p>
              </div>

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
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-body-sm text-red-500" role="alert" aria-live="polite">
                        {errors.name}
                      </p>
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
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-body-sm text-red-500" role="alert" aria-live="polite">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-body-sm font-medium text-text-primary mb-2">
                      {t.step1.phone.label}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      disabled={isSubmitting}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange"
                      placeholder={t.step1.phone.placeholder}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Project Type */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectTypeOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => handleChange('projectType', option.value)}
                        disabled={isSubmitting}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left rtl:text-right ${
                          formData.projectType === option.value
                            ? 'border-orange bg-orange/5 shadow-sm'
                            : 'border-border-subtle bg-surface hover:border-orange/50 hover:bg-orange/5'
                        } ${errors.projectType ? 'border-red-500' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-body font-medium text-text-primary">
                          {option.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  {errors.projectType && (
                    <p className="mt-2 text-body-sm text-red-500" role="alert" aria-live="polite">
                      {errors.projectType}
                    </p>
                  )}
                </div>
              )}

              {/* Step 3: Budget Range */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {budgetRanges.map((range) => (
                      <motion.button
                        key={range.value}
                        type="button"
                        onClick={() => handleChange('budgetRange', range.value)}
                        disabled={isSubmitting}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left rtl:text-right ${
                          formData.budgetRange === range.value
                            ? 'border-orange bg-orange/5 shadow-sm'
                            : 'border-border-subtle bg-surface hover:border-orange/50 hover:bg-orange/5'
                        } ${errors.budgetRange ? 'border-red-500' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-body font-medium text-text-primary">
                          {range.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  {errors.budgetRange && (
                    <p className="mt-2 text-body-sm text-red-500" role="alert" aria-live="polite">
                      {errors.budgetRange}
                    </p>
                  )}
                </div>
              )}

              {/* Step 4: Deadline */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="deadline" className="block text-body-sm font-medium text-text-primary mb-2">
                      {t.step4.title} <span className="text-orange">*</span>
                    </label>
                    <select
                      id="deadline"
                      value={formData.deadline}
                      onChange={(e) => handleChange('deadline', e.target.value)}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                        errors.deadline
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-border-subtle'
                      }`}
                      aria-invalid={!!errors.deadline}
                      aria-describedby={errors.deadline ? 'deadline-error' : undefined}
                    >
                      <option value="">{isRTL ? 'انتخاب کنید...' : 'Select...'}</option>
                      {deadlineOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.deadline && (
                      <p id="deadline-error" className="mt-1 text-body-sm text-red-500" role="alert" aria-live="polite">
                        {errors.deadline}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className={`flex items-center justify-between mt-8 pt-6 border-t border-border-subtle ${isRTL ? 'flex-row-reverse' : ''}`}>
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

