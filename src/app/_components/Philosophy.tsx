'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const principles = [
  'I build AI systems that scale in production.',
  'I automate what should never be manual.',
  'I ship reliable code with 99.9% uptime.',
]

export function Philosophy() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* The Line - Vertical Seam */}
      <motion.div
        className="absolute left-12 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-graphite/30 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <Container size="narrow">
        <div className="relative">
          {/* Principles */}
          <div className="space-y-8 md:space-y-10">
            {principles.map((principle, index) => (
              <motion.p
                key={index}
                className="text-headline-sm md:text-headline-md font-display text-platinum/90"
                style={{
                  fontWeight: 300,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.5,
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {principle}
              </motion.p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
