'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function Card({
  children,
  className,
  hover = true,
  glow = true,
}: CardProps) {
  return (
    <motion.div
      className={cn('luxury-card relative', className)}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
    >
      {glow && <div className="glow" />}
      {children}
    </motion.div>
  )
}
