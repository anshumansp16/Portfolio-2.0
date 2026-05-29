'use client'

import { motion, Variants, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Magnetic } from '@/components/ui/Magnetic'

const rotatingWords = ['Ideas', 'Products', 'Content', 'Businesses']

function RotatingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          className="inline-block text-gradient-blue"
          initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-80%', opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.7, delay: 0.6 + i * 0.12, ease: 'easeOut' as const },
  }),
}

function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

function StarField() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-star-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function DevOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Main blue orb */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ top: '-15%', left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div
          className="w-[560px] h-[560px] md:w-[780px] md:h-[780px] rounded-full"
          animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(59,130,246,0.45) 0%, rgba(34,211,238,0.18) 45%, rgba(96,165,250,0.05) 70%, transparent 100%)',
            filter: 'blur(70px)',
          }}
        />
      </motion.div>
      {/* Secondary accent orb — bottom-right */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.6 }}
        style={{ bottom: '5%', right: '5%' }}
      >
        <motion.div
          className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full"
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(59,130,246,0.08) 60%, transparent 100%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>
    </div>
  )
}

const roles = [
  { label: 'AI Engineer', icon: null },
  { label: 'Content Creator', icon: null },
  { label: 'Entrepreneur', icon: null },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <StarField />
      <DevOrb />

      <div className="relative z-10 container-wide">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto px-4 pt-20 md:pt-28">

          {/* Role pills */}
          <motion.div
            className="mb-8 md:mb-10 flex flex-wrap items-center justify-center gap-2 md:gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {roles.map((role, i) => (
              <motion.div
                key={role.label}
                className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm"
                style={{
                  background: 'rgba(59, 130, 246, 0.06)',
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  color: 'rgba(147, 197, 253, 0.9)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                {role.label}
              </motion.div>
            ))}
          </motion.div>

          {/* Headline with rotating text */}
          <motion.h1
            className="font-display mb-6 md:mb-8"
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-platinum">I Create & Ship</span>
            <br />
            <RotatingText />
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-body md:text-body-lg text-silver max-w-2xl mb-10 md:mb-12 px-2 md:px-0"
            style={{ fontWeight: 300, lineHeight: 1.75 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            AI Engineer building real products. Tech Content Creator with 13.3% CTR and a brand deal before 400 subs. Shipping AI tools that actually work.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Magnetic strength={0.3}>
              <Link href="#projects" className="btn-primary">
                See My Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2V12M7 12L12 7M7 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link href="#media-kit" className="btn-ghost">
                Media Kit
              </Link>
            </Magnetic>
          </motion.div>

          {/* Quick stats strip */}
          <motion.div
            className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-3xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.0 }}
          >
            {[
              { value: '13.3%', label: 'Avg CTR' },
              { value: '30+', label: 'Videos' },
              { value: '7+', label: 'Products Built' },
              { value: '385+', label: 'Subscribers' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.1 + i * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-mono font-semibold text-accent-electric" style={{ letterSpacing: '-0.03em' }}>
                  {stat.value}
                </div>
                <div className="text-label text-graphite mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-12 md:mt-16 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.8 }}
          >
            <span className="text-xs text-graphite/50 tracking-widest uppercase" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>scroll</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-accent-blue/40 to-transparent"
              animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #05050A)' }}
      />
    </section>
  )
}
