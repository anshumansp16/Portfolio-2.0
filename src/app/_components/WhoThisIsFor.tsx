'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const goodFit = [
  'Businesses ready to integrate AI into operations',
  'Teams seeking custom AI solutions for specific needs',
  'Companies wanting AI without the hiring overhead',
  'Organizations needing production-grade AI systems',
  'Businesses looking to leverage AI for competitive advantage',
]

const notFit = [
  'Looking for quick demos or experiments only',
  'Want consulting without implementation',
  'Need someone local or in-office only',
  'Exploring AI without clear business goals',
  'Looking for the cheapest possible option',
]

export function WhoThisIsFor() {
  return (
    <section className="relative py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p
            className="font-mono text-graphite/60 mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.1em' }}
          >
            WHO I WORK WITH
          </p>
          <h2
            className="text-headline-md md:text-headline-lg lg:text-display-sm font-display text-platinum max-w-2xl mx-auto"
            style={{
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
            }}
          >
            Is This a Good Fit?
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Good Fit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Card */}
              <div className="absolute inset-0 border border-white/[0.04] rounded-lg" />

              <div className="relative p-8 md:p-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-green-500/80"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-headline-sm font-display text-platinum"
                    style={{
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Good Fit
                  </h3>
                </div>

                {/* List */}
                <ul className="space-y-4">
                  {goodFit.map((item, index) => (
                    <motion.li
                      key={index}
                      className="text-body text-silver/80 flex items-start gap-3"
                      style={{
                        fontWeight: 300,
                        letterSpacing: '0.01em',
                        lineHeight: 1.6,
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="text-green-500/60 mt-1 text-xs">✓</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Not a Fit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Card */}
              <div className="absolute inset-0 border border-white/[0.04] rounded-lg" />

              <div className="relative p-8 md:p-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-red-500/80"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-headline-sm font-display text-platinum"
                    style={{
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Probably Not a Fit
                  </h3>
                </div>

                {/* List */}
                <ul className="space-y-4">
                  {notFit.map((item, index) => (
                    <motion.li
                      key={index}
                      className="text-body text-silver/60 flex items-start gap-3"
                      style={{
                        fontWeight: 300,
                        letterSpacing: '0.01em',
                        lineHeight: 1.6,
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="text-red-500/60 mt-1 text-xs">✗</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        </div>

        {/* Bottom Note */}
        <motion.p
          className="text-center text-body text-silver/50 mt-10 md:mt-12 max-w-2xl mx-auto"
          style={{
            fontWeight: 300,
            letterSpacing: '0.01em',
            fontStyle: 'italic',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          I work with a small number of clients at a time to design and ship systems that last.
          If you're experiencing real operational pain, let's talk.
        </motion.p>
      </Container>
    </section>
  )
}
