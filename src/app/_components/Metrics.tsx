'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface ProofProps {
  metric: string
  consequence: string
  qualifier: string
  size?: 'large' | 'small'
  index: number
}

function Proof({ metric, consequence, qualifier, size = 'small', index }: ProofProps) {
  const isLarge = size === 'large'

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Ultra-soft border */}
      <div className="absolute inset-0 border border-white/[0.03] rounded-lg" />

      <div className={`relative ${isLarge ? 'p-12 md:p-16' : 'p-8 md:p-10'}`}>
        {/* Metric */}
        <div
          className={`font-mono text-platinum mb-4 ${
            isLarge ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'
          }`}
          style={{
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          {metric}
        </div>

        {/* Consequence */}
        <p
          className={`text-platinum/90 mb-3 ${
            isLarge ? 'text-body-lg md:text-headline-sm' : 'text-body'
          }`}
          style={{
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1.6,
          }}
        >
          {consequence}
        </p>

        {/* Qualifier */}
        <p
          className="text-silver/50 text-body-sm"
          style={{
            fontWeight: 300,
            letterSpacing: '0.01em',
          }}
        >
          {qualifier}
        </p>
      </div>
    </motion.div>
  )
}

const proofs = [
  {
    metric: '50k+',
    consequence: 'automated tasks/day',
    qualifier: 'enterprise browser automation with 99.9% reliability',
    size: 'large' as const,
  },
  {
    metric: '60%',
    consequence: 'cost reduction',
    qualifier: 'through intelligent automation & cloud optimization',
    size: 'small' as const,
  },
  {
    metric: '25+',
    consequence: 'production apps',
    qualifier: 'delivered with 99% client satisfaction',
    size: 'small' as const,
  },
]

export function Metrics() {
  return (
    <section className="relative py-32 md:py-40">
      <Container>
        {/* Asymmetric Layout: 1 big left, 2 stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Large Proof */}
          <Proof {...proofs[0]} index={0} />

          {/* Stacked Small Proofs */}
          <div className="grid grid-cols-1 gap-6 lg:gap-8">
            <Proof {...proofs[1]} index={1} />
            <Proof {...proofs[2]} index={2} />
          </div>
        </div>
      </Container>
    </section>
  )
}
