'use client'

import { useState } from 'react'
import { User, Mail, FileText, MessageSquare } from 'lucide-react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    // Clear error for this field when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call - replace with your actual submission logic
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For now, just log the form data
      console.log('Form submitted:', formData)

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-label text-graphite mb-2">
          Name
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <User className="w-4 h-4 text-graphite" />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full pl-11 pr-4 py-3 bg-ink border rounded text-platinum placeholder:text-silver/40 focus:outline-none transition-colors ${
              errors.name
                ? 'border-red-500 focus:border-red-500'
                : 'border-white/10 focus:border-accent-gold/50'
            }`}
            placeholder="Your name"
          />
        </div>
        {errors.name && (
          <p id="name-error" className="mt-1 text-body-sm text-red-500" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-label text-graphite mb-2">
          Email
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Mail className="w-4 h-4 text-graphite" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full pl-11 pr-4 py-3 bg-ink border rounded text-platinum placeholder:text-silver/40 focus:outline-none transition-colors ${
              errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-white/10 focus:border-accent-gold/50'
            }`}
            placeholder="your.email@example.com"
          />
        </div>
        {errors.email && (
          <p id="email-error" className="mt-1 text-body-sm text-red-500" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-label text-graphite mb-2">
          Subject
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <FileText className="w-4 h-4 text-graphite" />
          </div>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={`w-full pl-11 pr-4 py-3 bg-ink border rounded text-platinum placeholder:text-silver/40 focus:outline-none transition-colors ${
              errors.subject
                ? 'border-red-500 focus:border-red-500'
                : 'border-white/10 focus:border-accent-gold/50'
            }`}
            placeholder="What would you like to discuss?"
          />
        </div>
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-body-sm text-red-500" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-label text-graphite mb-2">
          Message
        </label>
        <div className="relative">
          <div className="absolute left-4 top-4 pointer-events-none">
            <MessageSquare className="w-4 h-4 text-graphite" />
          </div>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full pl-11 pr-4 py-3 bg-ink border rounded text-platinum placeholder:text-silver/40 focus:outline-none transition-colors resize-none ${
              errors.message
                ? 'border-red-500 focus:border-red-500'
                : 'border-white/10 focus:border-accent-gold/50'
            }`}
            placeholder="Tell me about your project or idea..."
          />
        </div>
        {errors.message && (
          <p id="message-error" className="mt-1 text-body-sm text-red-500" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500/50 rounded" role="status">
          <p className="text-body-sm text-green-500">
            Message sent successfully! I'll get back to you soon.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded" role="alert">
          <p className="text-body-sm text-red-500">
            Something went wrong. Please try again or email me directly.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="luxury-button disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        aria-busy={isSubmitting}
      >
        <span className="relative z-10">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </span>
      </button>
    </form>
  )
}
