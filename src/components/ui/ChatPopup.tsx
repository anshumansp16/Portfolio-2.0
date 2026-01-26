'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, Zap, TrendingUp, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  showActions?: boolean
}

interface LeadFormData {
  name: string
  email: string
  company: string
  budget: string
  timeline: string
}

const SUGGESTED_QUESTIONS = [
  "How can automation help my business?",
  "What does your process look like?"
]

export function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [leadFormData, setLeadFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSubmit = async (e?: React.FormEvent, suggestedQuestion?: string) => {
    e?.preventDefault()

    const questionText = suggestedQuestion || message.trim()
    if (!questionText || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: questionText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage('')
    setShowWelcome(false)
    setIsLoading(true)

    // Add empty assistant message that we'll update with streaming content
    const assistantMessageIndex = messages.length + 1
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        showActions: false,
      },
    ])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      })

      if (!response.ok || !response.body) {
        throw new Error('Failed to get response')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') {
              setIsLoading(false)
              // Show action buttons after first response
              setMessages((prev) =>
                prev.map((msg, idx) =>
                  idx === assistantMessageIndex
                    ? { ...msg, showActions: assistantMessageIndex >= 2 }
                    : msg
                )
              )
              break
            }
            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                fullContent += parsed.content
                // Update the assistant message with streaming content
                setMessages((prev) =>
                  prev.map((msg, idx) =>
                    idx === assistantMessageIndex
                      ? { ...msg, content: fullContent }
                      : msg
                  )
                )
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === assistantMessageIndex
            ? {
                ...msg,
                content: "I apologize, but I'm having trouble connecting right now. Please email me directly at anshumansp16@gmail.com",
              }
            : msg
        )
      )
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSubmit(undefined, question)
  }

  const handleGetStarted = () => {
    setShowLeadForm(true)
    setShowWelcome(false)
  }

  const handleScheduleCall = () => {
    setShowLeadForm(true)
    setShowWelcome(false)
  }

  const handleLeadFormChange = (field: keyof LeadFormData, value: string) => {
    setLeadFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingLead(true)

    try {
      // Prepare conversation transcript
      const transcript = messages
        .map((msg) => `${msg.role === 'user' ? 'Visitor' : 'AI'}: ${msg.content}`)
        .join('\n\n')

      const emailContent = `
NEW LEAD FROM AI CHATBOT
========================

CONTACT INFORMATION:
--------------------
Name: ${leadFormData.name}
Email: ${leadFormData.email}
Company: ${leadFormData.company}
Budget Range: ${leadFormData.budget}
Timeline: ${leadFormData.timeline}

CONVERSATION TRANSCRIPT:
------------------------
${transcript}

===========================
Sent from: AI Automation Chatbot
Time: ${new Date().toLocaleString()}
      `.trim()

      // Submit directly to Web3Forms (client-side)
      const formDataToSend = new FormData()
      formDataToSend.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '')
      formDataToSend.append('name', leadFormData.name)
      formDataToSend.append('email', leadFormData.email)
      formDataToSend.append('subject', `🚀 New Lead: ${leadFormData.company} - ${leadFormData.timeline}`)
      formDataToSend.append('message', emailContent)
      formDataToSend.append('botcheck', '') // Anti-spam honeypot

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      console.log('Lead form response:', { status: response.status, data })

      if (data.success) {
        // Show success message
        const successMessage: Message = {
          role: 'assistant',
          content: `Thank you, ${leadFormData.name}! 🎉\n\nI've received your information and conversation details. I'll review our chat and get back to you within 24 hours at ${leadFormData.email}.\n\nLooking forward to discussing how we can transform your business with AI automation!`,
          timestamp: new Date(),
          showActions: false,
        }
        setMessages((prev) => [...prev, successMessage])
        setShowLeadForm(false)
        setLeadFormData({
          name: '',
          email: '',
          company: '',
          budget: '',
          timeline: '',
        })
      } else {
        console.error('Lead form submission failed:', data.message)
        throw new Error(data.message || 'Failed to submit')
      }
    } catch (error) {
      console.error('Lead submission error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but there was an issue submitting your information. Please email me directly at anshumansp16@gmail.com with your details.",
        timestamp: new Date(),
        showActions: false,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsSubmittingLead(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          delay: 0.3,
        }}
      >
        <motion.div
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'message'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <X className="w-5 h-5 text-ink" strokeWidth={2.5} />
              ) : (
                <MessageCircle className="w-5 h-5 text-ink" strokeWidth={2.5} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute bottom-full right-0 mb-3 px-4 py-2.5 rounded-xl whitespace-nowrap shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.98) 0%, rgba(10, 10, 10, 0.98) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ delay: 1.5 }}
            >
              <p className="text-sm text-platinum font-medium">
                Want to automate your business? 💡
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Container */}
            <motion.div
              className="fixed bottom-4 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-[440px] rounded-xl overflow-hidden flex flex-col"
              style={{
                height: showWelcome && messages.length === 0 ? 'auto' : '600px',
                maxHeight: '85vh',
                background: 'linear-gradient(180deg, rgba(15, 15, 15, 0.98) 0%, rgba(10, 10, 10, 0.98) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(40px)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 255, 255, 0.1)',
              }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Header */}
              <div
                className="px-5 py-3.5 flex-shrink-0 relative"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
                    }}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-ink" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-platinum">
                      AI Assistant
                    </h3>
                  </div>
                </div>
              </div>

              {/* Messages or Welcome Screen */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
                {showWelcome && messages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Welcome Message */}
                    <div className="text-center">
                      <h4 className="text-base font-medium text-platinum mb-2">
                        Hi there! 👋
                      </h4>
                      <p className="text-silver/60 text-xs">
                        I'm here to help. What would you like to know?
                      </p>
                    </div>

                    {/* Suggested Questions */}
                    <div className="space-y-2">
                      {SUGGESTED_QUESTIONS.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="w-full text-center px-4 py-2.5 rounded-lg text-sm text-platinum/80 hover:text-platinum transition-colors"
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : showLeadForm ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="text-center mb-4">
                      <h4 className="text-sm font-medium text-platinum mb-1">
                        Share Your Details
                      </h4>
                      <p className="text-xs text-silver/60">
                        I'll send you a personalized proposal
                      </p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                      <input
                        type="text"
                        value={leadFormData.name}
                        onChange={(e) => handleLeadFormChange('name', e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-platinum placeholder:text-silver/40 focus:outline-none focus:border-accent-gold/40 text-sm"
                        placeholder="Your name"
                      />

                      <input
                        type="email"
                        value={leadFormData.email}
                        onChange={(e) => handleLeadFormChange('email', e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-platinum placeholder:text-silver/40 focus:outline-none focus:border-accent-gold/40 text-sm"
                        placeholder="Email address"
                      />

                      <input
                        type="text"
                        value={leadFormData.company}
                        onChange={(e) => handleLeadFormChange('company', e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-platinum placeholder:text-silver/40 focus:outline-none focus:border-accent-gold/40 text-sm"
                        placeholder="Company name"
                      />

                      <select
                        value={leadFormData.budget}
                        onChange={(e) => handleLeadFormChange('budget', e.target.value)}
                        className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-platinum focus:outline-none focus:border-accent-gold/40 text-sm"
                      >
                        <option value="">Budget range</option>
                        <option value="Under $5K">Under $5K</option>
                        <option value="$5K - $15K">$5K - $15K</option>
                        <option value="$15K - $30K">$15K - $30K</option>
                        <option value="$30K+">$30K+</option>
                      </select>

                      <select
                        value={leadFormData.timeline}
                        onChange={(e) => handleLeadFormChange('timeline', e.target.value)}
                        className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-platinum focus:outline-none focus:border-accent-gold/40 text-sm"
                      >
                        <option value="">Timeline</option>
                        <option value="Urgent (1-2 weeks)">Urgent (1-2 weeks)</option>
                        <option value="Soon (1 month)">Soon (1 month)</option>
                        <option value="Planning (2-3 months)">Planning (2-3 months)</option>
                        <option value="Exploring">Just exploring</option>
                      </select>

                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowLeadForm(false)}
                          className="flex-1 px-3 py-2 rounded-lg border border-white/[0.08] text-silver/80 text-xs hover:border-white/[0.15] transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmittingLead || !leadFormData.name || !leadFormData.email || !leadFormData.company}
                          className="flex-1 px-3 py-2 rounded-lg text-ink text-xs font-medium disabled:opacity-50"
                          style={{
                            background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                          }}
                        >
                          {isSubmittingLead ? 'Sending...' : 'Submit'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                          <div
                            className={`max-w-[85%] px-3 py-2 rounded-xl ${
                              msg.role === 'user'
                                ? 'rounded-br-sm'
                                : 'rounded-bl-sm'
                            }`}
                            style={
                              msg.role === 'user'
                                ? {
                                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                                    color: '#0a0a0a',
                                  }
                                : {
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    color: '#e5e7eb',
                                  }
                            }
                          >
                            <p className="text-xs leading-relaxed whitespace-pre-wrap">
                              {msg.content}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {msg.role === 'assistant' && msg.showActions && index === messages.length - 1 && !isLoading && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-2 mb-3 justify-center"
                          >
                            <button
                              onClick={handleGetStarted}
                              className="px-4 py-1.5 rounded-lg text-xs font-medium text-platinum hover:text-accent-gold transition-colors"
                              style={{
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                              }}
                            >
                              Get Started
                            </button>

                            <button
                              onClick={handleScheduleCall}
                              className="px-4 py-1.5 rounded-lg text-xs font-medium text-platinum hover:text-accent-gold transition-colors"
                              style={{
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                              }}
                            >
                              Schedule Call
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div
                          className="px-3 py-2 rounded-xl rounded-bl-sm"
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                          }}
                        >
                          <div className="flex gap-1">
                            {[0, 0.2, 0.4].map((delay, i) => (
                              <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                                }}
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input */}
              {!showLeadForm && (
                <form onSubmit={handleSubmit} className="px-4 py-3 flex-shrink-0 relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask about automation..."
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-platinum placeholder:text-silver/40 focus:outline-none focus:border-accent-gold/40 text-xs disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim() || isLoading}
                      className="px-3 py-2 rounded-lg flex items-center justify-center disabled:opacity-50"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                      }}
                    >
                      <Send className="w-4 h-4 text-ink" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </>
  )
}
