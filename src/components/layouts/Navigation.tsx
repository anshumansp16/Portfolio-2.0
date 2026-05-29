'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useContent } from '@/lib/content'

function APMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" stroke="rgba(59,130,246,0.35)" fill="rgba(9,9,18,0.9)" />
      <path d="M9 25L14 11L19 25" stroke="rgba(238,237,245,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M10.8 21H17.2" stroke="rgba(96,165,250,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M21 25V11" stroke="rgba(238,237,245,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M21 11H24.5C26.4 11 28 12.3 28 14.5C28 16.7 26.4 18 24.5 18H21" stroke="rgba(238,237,245,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="33" cy="3" r="2.5" fill="#3B82F6" opacity="0.8"/>
    </svg>
  )
}

const navLinks = ['Work', 'About', 'Connect']

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [maxScroll, setMaxScroll] = useState(1000)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { content } = useContent()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    const updateMax = () => setMaxScroll(document.documentElement.scrollHeight - window.innerHeight)
    updateMax()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateMax, { passive: true })
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', updateMax) }
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-500', scrolled ? 'py-3' : 'py-5')}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glass nav background */}
        <div
          className={cn(
            'absolute inset-0 -z-10 transition-all duration-500',
            scrolled || menuOpen ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background: 'rgba(5, 5, 10, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        />

        <div className="container-wide">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setMenuOpen(false)}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                <APMark />
              </motion.div>
              <span
                className="hidden sm:block text-sm font-medium text-platinum/80 group-hover:text-platinum transition-colors duration-200"
                style={{ letterSpacing: '-0.01em' }}
              >
                Anshuman
              </span>
            </Link>

            {/* Desktop nav + CTA */}
            <div className="flex items-center gap-7 md:gap-8">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="nav-link hidden md:block"
                >
                  {item}
                </Link>
              ))}

              <Link href="/connect" className="btn-primary text-sm !py-2 !px-4 hidden md:inline-flex">
                Let&apos;s Talk
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg transition-colors"
                style={{ background: menuOpen ? 'rgba(59,130,246,0.1)' : 'transparent' }}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <motion.span
                  className="block w-5 h-px rounded-full bg-platinum"
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block w-5 h-px rounded-full bg-platinum"
                  animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-5 h-px rounded-full bg-platinum"
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
                  transition={{ duration: 0.25 }}
                />
              </button>
            </div>
          </nav>
        </div>

        {/* Scroll progress */}
        <motion.div
          className="absolute bottom-0 left-0 h-px origin-left"
          style={{
            scaleX: useTransform(scrollY, [0, maxScroll], [0, 1]),
            background: 'linear-gradient(90deg, transparent, #3B82F6 30%, #22D3EE 70%, transparent)',
          }}
        />
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col pt-24 px-6 pb-10"
            style={{ background: 'rgba(4,4,12,0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-1 flex-1">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.35 }}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="block py-4 text-2xl font-display text-platinum/80 hover:text-platinum border-b transition-colors"
                    style={{ borderColor: 'rgba(255,255,255,0.06)', fontWeight: 400, letterSpacing: '-0.02em' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.35 }}
            >
              <Link
                href="/connect"
                className="btn-primary w-full justify-center text-base py-3.5"
                onClick={() => setMenuOpen(false)}
              >
                Let&apos;s Talk
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
