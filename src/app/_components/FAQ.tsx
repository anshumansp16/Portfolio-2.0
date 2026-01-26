'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useState } from 'react'

interface FAQItemProps {
  question: string
  answer: string
  index: number
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="relative border-b border-white/[0.04]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 md:py-6 flex items-start justify-between gap-4 text-left group"
      >
        {/* Question */}
        <h3
          className="text-body md:text-body-lg text-platinum group-hover:text-accent-gold transition-colors duration-300"
          style={{
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.5,
          }}
        >
          {question}
        </h3>

        {/* Toggle Icon */}
        <div className="flex-shrink-0 mt-1">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg
              className="w-4 h-4 text-graphite group-hover:text-accent-gold transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 md:pb-6 pr-8">
              <p
                className="text-body-sm text-silver/70"
                style={{
                  fontWeight: 300,
                  letterSpacing: '0.01em',
                  lineHeight: 1.6,
                }}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const faqs = [
  {
    question: 'Do I need technical knowledge?',
    answer: 'No. I build user-friendly systems and provide team training so you can use them confidently.',
  },
  {
    question: 'How long does implementation take?',
    answer: 'Most projects launch in 2-4 weeks. Smaller AI solutions can go live in days.',
  },
  {
    question: 'Can you integrate with my existing tools?',
    answer: 'Yes. I work with most CRMs, databases, and business platforms.',
  },
  {
    question: 'What\'s the investment range?',
    answer: 'Projects start at $2K for focused AI solutions. Complex systems range from $5K-$15K. Custom quotes after discovery.',
  },
  {
    question: 'What if I only need help with one specific task?',
    answer: 'Perfect. We start small, prove value, then scale as you see results.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes. I offer maintenance plans and am available for optimization as your needs evolve.',
  },
]

export function FAQ() {
  return (
    <section className="relative py-12 md:py-16">
      <Container>
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 md:mb-12 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p
            className="font-mono text-graphite/60 mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.1em' }}
          >
            QUESTIONS
          </p>
          <h2
            className="text-headline-md md:text-headline-lg lg:text-display-sm font-display text-platinum max-w-2xl mx-auto"
            style={{
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
            }}
          >
            Common Questions
          </h2>
        </motion.div>

        {/* FAQ Items - Two Column Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} index={index} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10 md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p
            className="text-body-sm text-silver/60 mb-5"
            style={{
              fontWeight: 300,
              letterSpacing: '0.01em',
            }}
          >
            Don't see your question?
          </p>
          <a
            href="/connect"
            className="luxury-button-refined luxury-button-secondary group inline-flex"
          >
            <span className="relative z-10">Get in Touch</span>
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
