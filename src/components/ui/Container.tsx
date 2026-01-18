import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide' | 'full'
  as?: React.ElementType
}

export function Container({
  children,
  className,
  size = 'default',
  as: Component = 'div',
}: ContainerProps) {
  const sizes = {
    default: 'container max-w-content',
    narrow: 'container-narrow',
    wide: 'container-wide',
    full: 'w-full px-6 md:px-8 lg:px-12',
  }

  return (
    <Component className={cn(sizes[size], className)}>
      {children}
    </Component>
  )
}
