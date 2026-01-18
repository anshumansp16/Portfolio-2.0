'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMagneticCursor } from '@/lib/hooks/useMagneticCursor'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Connect', href: '/connect' },
]

function NavItem({ label, href }: { label: string; href: string }) {
  const { handleMouseMove, handleMouseLeave, style } = useMagneticCursor(0.4)

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <Link
        href={href}
        className="luxury-link relative text-sm font-medium text-platinum transition-colors duration-200"
      >
        {label}
      </Link>
    </motion.div>
  )
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [maxScroll, setMaxScroll] = useState(1000)
  const { scrollY } = useScroll()

  // Transform background opacity based on scroll - appear after scroll, 30-35% max
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.35])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const updateMaxScroll = () => {
      setMaxScroll(document.documentElement.scrollHeight - window.innerHeight)
    }

    // Calculate initial max scroll
    updateMaxScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateMaxScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateMaxScroll)
    }
  }, [])

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'py-4' : 'py-6'
      )}
    >
      <motion.div
        className="absolute inset-0 -z-10 glass"
        style={{
          opacity: backgroundOpacity,
        }}
      />

      <div className="container-wide">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative group"
          >
            <motion.span
              className="text-platinum transition-colors duration-200 group-hover:text-accent-gold"
              style={{
                fontFamily: 'var(--font-signature)',
                fontSize: '2.2rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Anshuman
            </motion.span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-10">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        </nav>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent origin-left"
        style={{
          scaleX: useTransform(
            scrollY,
            [0, maxScroll],
            [0, 1]
          ),
        }}
      />
    </motion.header>
  )
}
