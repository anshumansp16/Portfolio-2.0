'use client'

import { motion } from 'framer-motion'

const proofs = [
  'Systems shipped',
  'AI at scale',
  'Operational leverage',
  'Production-grade AI',
  'Enterprise reliability',
  'End-to-end delivery',
  'RAG pipelines',
  'Intelligent agents',
  'Cost optimization',
  'Scalable architecture',
]

export function ProofStrip() {
  // Double the items for seamless loop
  const items = [...proofs, ...proofs]

  return (
    <div className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
          }}
        >
          <motion.div
            className="flex items-center gap-6 md:gap-10"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {items.map((proof, index) => (
              <div
                key={`${proof}-${index}`}
                className="flex items-center gap-6 md:gap-10 shrink-0"
              >
                <span
                  className="text-body-sm text-silver/50 whitespace-nowrap"
                  style={{
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                  }}
                >
                  {proof}
                </span>
                <span className="text-graphite/40">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
