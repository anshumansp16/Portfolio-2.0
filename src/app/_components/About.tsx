'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const aboutLines = [
  "A Full Stack Developer with over half a decade of experience in building production-grade AI systems, browser automation platforms, and scalable web applications.",
  "I specialize in Generative AI, modern JavaScript frameworks, and Python backend development, with a proven track record of delivering enterprise solutions.",
]

export function About() {
  return (
    <section className="relative py-32 md:py-40">
      <Container size="narrow">
        <div className="relative">
          {/* Optional label */}
          <motion.p
            className="text-label font-mono text-graphite mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            BACKGROUND
          </motion.p>

          {/* About lines */}
          <div className="space-y-6 md:space-y-8">
            {aboutLines.map((line, index) => (
              <motion.p
                key={index}
                className="text-headline-sm md:text-headline-md font-display text-platinum/85"
                style={{
                  fontWeight: 300,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.6,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
