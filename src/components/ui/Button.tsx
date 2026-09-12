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

  const baseStyles = 'relative inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 ease-luxury border'

  const variants = {
    primary: 'border-transparent text-platinum bg-gradient-to-br from-accent-blue to-[#2563EB] shadow-blue-sm hover:shadow-blue-glow hover:-translate-y-0.5',
    secondary: 'border-white/10 text-silver bg-white/[0.03] hover:border-white/20 hover:text-platinum hover:bg-white/[0.06]',
    text: 'border-transparent text-platinum hover:text-accent-electric underline-offset-4 px-0',
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
