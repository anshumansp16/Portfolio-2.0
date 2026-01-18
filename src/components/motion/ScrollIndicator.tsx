'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useMagneticCursor } from '@/lib/hooks/useMagneticCursor'

export function ScrollIndicator() {
  const { handleMouseMove, handleMouseLeave, style } = useMagneticCursor(0.5)

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <motion.button
      className="group relative flex flex-col items-center gap-2 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={style}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      {/* Label */}
      <span className="text-label text-graphite group-hover:text-silver transition-colors duration-300">
        SCROLL TO EXPLORE
      </span>

      {/* Animated Line */}
      <div className="relative w-px h-16 bg-graphite/30 overflow-hidden">
        <motion.div
          className="absolute w-full h-8 bg-gradient-to-b from-transparent via-accent-gold to-transparent"
          animate={{
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Arrow */}
      <motion.svg
        className="w-4 h-4 text-graphite group-hover:text-accent-gold transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        animate={{
          y: [0, 4, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </motion.svg>
    </motion.button>
  )
}
