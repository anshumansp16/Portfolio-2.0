'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface TextRevealProps {
  children: string
  delay?: number
  className?: string
}

export function TextReveal({ children, delay = 0, className }: TextRevealProps) {
  const words = children.split(' ')

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={child}
            style={{ display: 'inline-block' }}
          >
            {word}
            {index < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
