'use client'

import { motion } from 'framer-motion'
import { GradientMesh } from '@/components/motion/GradientMesh'

export function Hero() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Gradient Mesh Background */}
      <GradientMesh />

      {/* Enhanced Visual Layer - Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.15) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Subtle Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[1200px] h-[600px] opacity-[0.03]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Content - Shifted left by 3% (museum trick) */}
      <div className="relative z-10 container-wide">
        <div className="flex flex-col items-center text-center">
          {/* Subtle accent line */}
          <motion.div
            className="mb-8 md:mb-10"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '80px' }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <div
              className="h-[1px] w-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)',
              }}
            />
          </motion.div>

          {/* Dominant Anchor Statement - Serif Authority */}
          <motion.h1
            className="text-platinum font-display max-w-4xl mb-8 md:mb-12"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            AI systems<br />that actually work.
          </motion.h1>

          {/* Single Supporting Line - Founder Energy */}
          <motion.p
            className="text-body md:text-body-lg text-silver/50 max-w-2xl mb-10 md:mb-14 px-4 md:px-0"
            style={{
              fontWeight: 300,
              letterSpacing: '0.01em',
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Production AI handling 50K+ daily tasks. Custom integrations. 60% cost reduction.
            <span className="block mt-2">No demos—systems that stay shipped.</span>
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
              <span className="relative z-10">See How It Works</span>
            </a>
            <a
              href="/connect"
              className="luxury-button-refined luxury-button-secondary group"
            >
              <span className="relative z-10">Book Free Consultation</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Subtle Grid Overlay - Enhanced */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </section>
  )
}
