'use client'

import { motion } from 'framer-motion'

interface SpineMarkerProps {
  top: string
  label?: string
}

function SpineMarker({ top, label }: SpineMarkerProps) {
  return (
    <motion.div
      className="absolute left-0"
      style={{ top }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-4">
        {/* Dot marker */}
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: 'rgba(233, 230, 223, 0.12)',
            boxShadow: '0 0 8px rgba(233, 230, 223, 0.08)',
          }}
        />
        {label && (
          <span
            className="font-mono text-graphite"
            style={{ fontSize: '9px', letterSpacing: '0.1em' }}
          >
            {label}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export function MuseumSpine() {
  return (
    <div
      className="fixed left-8 md:left-12 top-0 bottom-0 pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {/* The continuous spine */}
      <motion.div
        className="absolute left-0 top-20 bottom-20 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(233, 230, 223, 0.1) 10%, rgba(233, 230, 223, 0.1) 90%, transparent 100%)',
          filter: 'blur(0.5px)',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 2,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Section markers */}
      <SpineMarker top="20%" />
      <SpineMarker top="35%" />
      <SpineMarker top="50%" />
      <SpineMarker top="65%" />
      <SpineMarker top="80%" />
    </div>
  )
}
