'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '@/lib/content'

export function FAQ() {
  const { content } = useContent()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-narrow">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-chip mb-6">FAQs</div>
          <h2 className="text-display-sm md:text-display-md font-display text-platinum" style={{ fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Common questions
          </h2>
        </motion.div>

        <div className="space-y-2">
          {content.faq.map((item, i) => (
            <motion.div
              key={i}
              className="dev-card overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-body-lg text-platinum pr-4" style={{ fontWeight: 450, letterSpacing: '-0.01em' }}>
                  {item.q}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: open === i ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${open === i ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2.5v7M2.5 6h7" stroke={open === i ? '#60A5FA' : 'rgba(238,237,245,0.4)'} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-6 text-body text-silver" style={{ fontWeight: 300, lineHeight: 1.75 }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
