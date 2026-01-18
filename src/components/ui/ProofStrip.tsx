'use client'

import { motion } from 'framer-motion'

const proofs = [
  'Systems shipped',
  'Automation at scale',
  'Operational leverage',
  'Production-grade AI',
  'Enterprise reliability',
  'End-to-end delivery',
  'RAG pipelines',
  'Browser automation',
  'Cost optimization',
  'Scalable architecture',
]

export function ProofStrip() {
  // Double the items for seamless loop
  const items = [...proofs, ...proofs]

  return (
    <div className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgb(10, 10, 10) 0%, rgba(10, 10, 10, 0.8) 30%, rgba(10, 10, 10, 0) 100%)' }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, rgb(10, 10, 10) 0%, rgba(10, 10, 10, 0.8) 30%, rgba(10, 10, 10, 0) 100%)' }}
          />

          <motion.div
            className="flex items-center gap-6 md:gap-10"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                duration: 18,
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
