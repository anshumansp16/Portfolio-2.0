'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useMagneticCursor } from '@/lib/hooks/useMagneticCursor'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'sm' | 'md' | 'lg'
  magnetic?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  magnetic = true,
  className,
  children,
  ...props
}: ButtonProps) {
  const { handleMouseMove, handleMouseLeave, style } = useMagneticCursor(0.3)

  const baseStyles = 'luxury-button relative inline-flex items-center justify-center font-medium tracking-wider transition-all duration-300 ease-luxury'

  const variants = {
    primary: 'border-platinum text-platinum hover:border-accent-gold hover:text-noir-void',
    secondary: 'border-graphite text-silver hover:border-silver hover:text-platinum',
    text: 'border-transparent text-platinum hover:text-accent-gold underline-offset-4',
  }

  const sizes = {
    sm: 'px-6 py-2 text-xs rounded-full',
    md: 'px-8 py-4 text-sm rounded-full',
    lg: 'px-10 py-5 text-base rounded-full',
  }

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onMouseMove={magnetic ? handleMouseMove : undefined}
      onMouseLeave={magnetic ? handleMouseLeave : undefined}
      style={magnetic ? style : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
