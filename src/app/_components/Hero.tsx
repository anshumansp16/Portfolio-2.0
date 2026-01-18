'use client'

import { motion } from 'framer-motion'
import { GradientMesh } from '@/components/motion/GradientMesh'

export function Hero() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Gradient Mesh Background */}
      <GradientMesh />

      {/* Content - Shifted left by 3% (museum trick) */}
      <div className="relative z-10 container-wide">
        <div className="flex flex-col items-center text-center">
          {/* Dominant Anchor Statement - Serif Authority */}
          <motion.h1
            className="text-platinum font-display max-w-5xl mb-8 md:mb-12"
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            I build production systems<br />with Generative AI at scale.
          </motion.h1>

          {/* Single Supporting Line - Founder Energy */}
          <motion.p
            className="text-body text-silver/45 max-w-2xl mb-10 md:mb-14"
            style={{
              fontWeight: 300,
              letterSpacing: '0.01em',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Senior Full Stack Developer specializing in RAG, LLMs, and enterprise automation.
          </motion.p>

          {/* CTA Buttons - Primary Dominant */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <a
              href="/work"
              className="luxury-button-refined luxury-button-primary group"
            >
              <span className="relative z-10">View Selected Systems</span>
            </a>
            <a
              href="/connect"
              className="luxury-button-refined luxury-button-secondary group"
            >
              <span className="relative z-10">Discuss an Engagement</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(229, 231, 235, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(229, 231, 235, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </section>
  )
}
