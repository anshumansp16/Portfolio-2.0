'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export function ConnectCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir-primary via-transparent to-transparent" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[400px] bg-accent-gold/[0.03] rounded-full blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center"
        >
          {/* Main headline */}
          <h2 className="text-display-sm md:text-display-md font-display text-platinum mb-6">
            Let's build something
            <span className="block text-accent-gold">that lasts.</span>
          </h2>

          {/* Subtext */}
          <p className="text-body-lg text-silver/60 max-w-lg mx-auto mb-10">
            Available for AI systems, automation platforms, and
            high-impact engineering projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/connect" className="luxury-button group">
              <span className="relative z-10">Start a conversation</span>
            </Link>
            <Link
              href="/work"
              className="px-6 py-3 text-body-sm text-silver/70 hover:text-platinum transition-colors"
            >
              View my work →
            </Link>
          </div>

          {/* Quick info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-body-sm text-graphite"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for projects
            </span>
            <span>Based in India</span>
            <span>Remote-first</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
