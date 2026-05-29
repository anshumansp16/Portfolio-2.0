'use client'

import { motion } from 'framer-motion'
import { useContent } from '@/lib/content'
import Link from 'next/link'

export function ProcessSection() {
  const { content } = useContent()

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Left-side vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.1) 20%, rgba(59,130,246,0.1) 80%, transparent)' }} />

      <div className="container-wide">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-chip mb-6">How I Work</div>
          <h2 className="text-display-sm md:text-display-md font-display text-platinum" style={{ fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Simple. Focused. Shipped.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          {content.process.map((step, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="dev-card p-8 h-full">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-sm"
                    style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60A5FA' }}
                  >
                    {step.step}
                  </div>
                  {i < content.process.length - 1 && (
                    <div className="hidden md:block flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(59,130,246,0.15), transparent)' }} />
                  )}
                </div>

                <h3 className="text-headline-sm text-platinum mb-3" style={{ fontWeight: 500, letterSpacing: '-0.015em' }}>
                  {step.title}
                </h3>
                <p className="text-body text-silver" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
