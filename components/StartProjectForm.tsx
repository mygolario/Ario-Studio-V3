'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { servicesConfig } from '@/config/services'
import Button from './Button'

interface FormData {
  name: string
  email: string
  projectType: string
  projectTypeOther: string
  budget: string
  deadline: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  projectType?: string
  budget?: string
  deadline?: string
  message?: string
}

interface StartProjectFormProps {
  lang: 'fa' | 'en'
}

export default function StartProjectForm({ lang }: StartProjectFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    projectTypeOther: '',
    budget: '',
    deadline: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  // Prefill project type from URL query param
  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam && servicesConfig.some(s => s.slug === typeParam)) {
      setFormData(prev => ({ ...prev, projectType: typeParam }))
    }
  }, [searchParams])

  const isEN = lang === 'en'

  // Project type options from services config
  const projectTypeOptions = servicesConfig.map(service => ({
    value: service.slug,
    label: isEN ? service.title.en : service.title.fa,
  }))

  // Translations
  const t = {
    name: { label: isEN ? 'Full name' : 'نام و نام خانوادگی', placeholder: isEN ? 'John Doe' : 'علی احمدی' },
    email: { label: isEN ? 'Email' : 'ایمیل', placeholder: isEN ? 'your.email@example.com' : 'your.email@example.com' },
    projectType: { label: isEN ? 'Project type' : 'نوع پروژه', placeholder: isEN ? 'Select a project type' : 'نوع پروژه را انتخاب کنید' },
    projectTypeOther: { label: isEN ? 'Other (please specify)' : 'سایر (لطفاً مشخص کنید)', placeholder: isEN ? 'Describe your project type' : 'نوع پروژه خود را توضیح دهید' },
    budget: { label: isEN ? 'Approximate budget' : 'بودجه حدودی', placeholder: isEN ? 'e.g., $5,000 - $10,000' : 'مثلاً ۵۰ تا ۱۰۰ میلیون تومان' },
    deadline: { label: isEN ? 'Ideal timeline / deadline' : 'ددلاین / زمان‌بندی موردنظر', placeholder: isEN ? 'e.g., 3 months' : 'مثلاً ۳ ماه' },
    message: { label: isEN ? 'Project details / message' : 'جزئیات پروژه / پیام', placeholder: isEN ? 'Tell us about your project...' : 'درباره پروژه خود به ما بگویید...' },
    submit: isEN ? 'Submit Request' : 'ارسال درخواست',
    submitting: isEN ? 'Sending...' : 'در حال ارسال...',
    success: isEN 
      ? "Thank you — we've received your project request. We'll get back to you soon."
      : 'ممنون، درخواست پروژه شما ثبت شد. خیلی زود با شما تماس می‌گیریم.',
    error: isEN
      ? 'Something went wrong. Please try again or email us directly.'
      : 'خطایی رخ داد. لطفاً دوباره تلاش کنید یا مستقیماً به ما ایمیل بزنید.',
    required: isEN ? 'Required' : 'الزامی',
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t.required
    }

    if (!formData.email.trim()) {
      newErrors.email = t.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isEN ? 'Please enter a valid email address' : 'لطفاً یک آدرس ایمیل معتبر وارد کنید'
    }

    if (!formData.projectType && !formData.projectTypeOther.trim()) {
      newErrors.projectType = t.required
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/start-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          lang,
          url: pathname,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setSubmitMessage(t.success)
        // Clear form
        setFormData({
          name: '',
          email: '',
          projectType: '',
          projectTypeOther: '',
          budget: '',
          deadline: '',
          message: '',
        })
        setErrors({})
      } else {
        setSubmitStatus('error')
        setSubmitMessage(data.message || t.error)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage(t.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing (only for fields that can have errors)
    if (field in errors && errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof FormErrors]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${isEN ? '' : 'rtl'}`}>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-body-sm font-medium text-text-primary mb-2">
          {t.name.label} <span className="text-orange">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
            errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-border-subtle'
          }`}
          placeholder={t.name.placeholder}
        />
        {errors.name && (
          <p className="mt-1 text-body-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-body-sm font-medium text-text-primary mb-2">
          {t.email.label} <span className="text-orange">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
            errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-border-subtle'
          }`}
          placeholder={t.email.placeholder}
        />
        {errors.email && (
          <p className="mt-1 text-body-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-body-sm font-medium text-text-primary mb-2">
          {t.projectType.label} <span className="text-orange">*</span>
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={(e) => handleChange('projectType', e.target.value)}
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
            errors.projectType
              ? 'border-red-500 focus:ring-red-500'
              : 'border-border-subtle'
          }`}
        >
          <option value="">{t.projectType.placeholder}</option>
          {projectTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          <option value="other">{isEN ? 'Other' : 'سایر'}</option>
        </select>
        {errors.projectType && (
          <p className="mt-1 text-body-sm text-red-500">{errors.projectType}</p>
        )}

        {/* Other project type input */}
        {formData.projectType === 'other' && (
          <div className="mt-3">
            <label htmlFor="projectTypeOther" className="block text-body-sm font-medium text-text-primary mb-2">
              {t.projectTypeOther.label}
            </label>
            <input
              type="text"
              id="projectTypeOther"
              name="projectTypeOther"
              value={formData.projectTypeOther}
              onChange={(e) => handleChange('projectTypeOther', e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg border border-border-subtle transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange"
              placeholder={t.projectTypeOther.placeholder}
            />
          </div>
        )}
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="block text-body-sm font-medium text-text-primary mb-2">
          {t.budget.label}
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={(e) => handleChange('budget', e.target.value)}
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-lg border border-border-subtle transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange"
          placeholder={t.budget.placeholder}
        />
      </div>

      {/* Deadline */}
      <div>
        <label htmlFor="deadline" className="block text-body-sm font-medium text-text-primary mb-2">
          {t.deadline.label}
        </label>
        <input
          type="text"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={(e) => handleChange('deadline', e.target.value)}
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-lg border border-border-subtle transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange"
          placeholder={t.deadline.placeholder}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-body-sm font-medium text-text-primary mb-2">
          {t.message.label}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          disabled={isSubmitting}
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-border-subtle transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none"
          placeholder={t.message.placeholder}
        />
      </div>

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full"
          icon={false}
        >
          {isSubmitting ? t.submitting : t.submit}
        </Button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-body-sm text-green-500">{submitMessage}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-body-sm text-red-500">{submitMessage}</p>
        </div>
      )}
    </form>
  )
}

