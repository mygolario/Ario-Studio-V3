'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import { animateSectionReveal } from '@/lib/gsapClient'
import { Copy } from '@/content/copy'

/**
 * Start Project Section
 * 
 * A high-quality contact/project initiation form with validation and user feedback.
 * 
 * To adjust form fields:
 * - Edit the formFields state and validation logic
 * - Update the handleSubmit function to process new fields
 * 
 * To hook up to a real API:
 * - Replace the setTimeout in handleSubmit with an actual API call
 * - Handle success/error responses appropriately
 */
export default function StartProjectSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  })

  const services = Copy.startProject.services

  const projectTypes = [
    'Full website',
    'Frontend only',
    'AI automation',
    'Consulting',
    'Other',
  ]

  const budgetRanges = [
    '< $2k',
    '$2k–$5k',
    '$5k–$10k',
    '$10k+',
    'Not sure yet',
  ]

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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    // TODO: Replace this with actual API call
    // Example:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   })
    //   if (response.ok) {
    //     setIsSuccess(true)
    //     setFormData({ name: '', email: '', projectType: '', budget: '', message: '' })
    //   } else {
    //     setErrors({ submit: 'Something went wrong. Please try again.' })
    //   }
    // } catch (error) {
    //   setErrors({ submit: 'Network error. Please try again.' })
    // } finally {
    //   setIsSubmitting(false)
    // }

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true)
      setIsSubmitting(false)
      setFormData({ name: '', email: '', projectType: '', budget: '', message: '' })
      setSelectedService(null)
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 1500)
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
                {Copy.startProject.label}
              </span>
            </motion.div>

            {/* Main Heading with cinematic glow */}
            <div className="relative inline-block mb-6">
              {/* Glow effect behind heading */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange/20 via-orange/10 to-orange/20 blur-3xl opacity-50 -z-10" />
              <h2 className="text-h1 md:text-[56px] md:leading-[64px] font-semibold text-text-primary mb-4 relative z-10">
                {Copy.startProject.title}
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
              {Copy.startProject.subtitle}
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
                  {Copy.startProject.ctaPrimary}
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
                  {Copy.startProject.ctaSecondary}
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
                    What we can help with
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
                    We respond within 24 hours.
                  </p>
                  <a
                    href="mailto:hello@ariostudio.com"
                    className="text-body-lg text-text-secondary hover:text-orange transition-colors"
                  >
                    hello@ariostudio.com
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
                      Thanks for reaching out!
                    </h3>
                    <p className="text-body text-text-secondary">
                      We&apos;ll get back to you soon.
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
                        Name <span className="text-orange">*</span>
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
                        placeholder="Your name"
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
                        Email <span className="text-orange">*</span>
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
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-body-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    {/* Project Type */}
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        Project type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
                      >
                        <option value="">Select a type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-body-sm font-medium text-text-primary mb-2"
                      >
                        Approximate budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
                      >
                        <option value="">Select a range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
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
                        Project details <span className="text-orange">*</span>
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
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-body-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group relative px-8 py-4 font-medium rounded-full transition-all duration-200 flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 bg-orange text-pure-white shadow-soft hover:shadow-card hover:scale-105 active:scale-[0.97] hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-soft"
                      >
                        {isSubmitting ? (
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
                            Sending...
                          </span>
                        ) : (
                          <>
                            <span>Start Your Project</span>
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

                    {errors.submit && (
                      <p className="text-body-sm text-red-500 text-center">{errors.submit}</p>
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

