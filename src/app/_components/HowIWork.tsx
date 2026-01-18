'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const broughtInFor = [
  'build production-grade AI & RAG systems',
  'architect browser automation at scale',
  'design FastAPI microservices for high concurrency',
  'deliver full-stack apps with measurable outcomes',
]

const dontDo = [
  'systems without proper error handling',
  'automation without reliability guarantees',
  'architecture without scalability in mind',
]

export function HowIWork() {
  return (
    <section className="relative py-32 md:py-40">
      {/* Drawing line (The Line motif) */}
      <motion.div
        className="absolute left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-graphite/20 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />

      <Container size="narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* Left: Brought in for */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-label font-mono text-graphite mb-8"
              style={{ letterSpacing: '0.08em' }}
            >
              I'M BROUGHT IN TO
            </p>

            <ul className="space-y-6">
              {broughtInFor.map((item, index) => (
                <motion.li
                  key={index}
                  className="text-body-lg text-platinum/90"
                  style={{
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.7,
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Don't do */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-label font-mono text-graphite mb-8"
              style={{ letterSpacing: '0.08em' }}
            >
              I DON'T DO
            </p>

            <ul className="space-y-6">
              {dontDo.map((item, index) => (
                <motion.li
                  key={index}
                  className="text-body-lg text-silver/60"
                  style={{
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.7,
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
