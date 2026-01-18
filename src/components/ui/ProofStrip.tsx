'use client'

import { motion } from 'framer-motion'

const proofs = [
  'Systems shipped',
  'Automation at scale',
  'Operational leverage',
]

export function ProofStrip() {
  return (
    <motion.div
      className="relative py-12 border-y border-white/[0.03]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-wide">
        <div className="flex items-center justify-center gap-8 md:gap-12">
          {proofs.map((proof, index) => (
            <motion.div
              key={proof}
              className="flex items-center gap-8 md:gap-12"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
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
              {index < proofs.length - 1 && (
                <span className="text-graphite/40">•</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
