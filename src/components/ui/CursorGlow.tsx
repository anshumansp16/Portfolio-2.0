'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const glowPos = useRef({ x: -200, y: -200 })
  const raf = useRef<number>(0)

  useEffect(() => {
    // hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`
      }
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"]')
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px) scale(${isInteractive ? 2.5 : 1})`
        dotRef.current.style.opacity = isInteractive ? '1' : '0.9'
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = isInteractive ? '0.6' : '0.3'
        ringRef.current.style.transform = `translate(${mouse.current.x - 16}px, ${mouse.current.y - 16}px) scale(${isInteractive ? 1.8 : 1})`
      }
    }

    const animate = () => {
      glowPos.current.x += (mouse.current.x - glowPos.current.x) * 0.06
      glowPos.current.y += (mouse.current.y - glowPos.current.y) * 0.06
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x - 200}px, ${glowPos.current.y - 200}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      {/* Large ambient glow that lazily follows cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[1] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, rgba(59,130,246,0.02) 50%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
      />
      {/* Outer ring — scales up on hover */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full"
        style={{
          border: '1px solid rgba(96,165,250,0.35)',
          willChange: 'transform',
          transition: 'transform 0.15s ease, opacity 0.2s ease',
          opacity: 0.3,
        }}
      />
      {/* Tiny sharp dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full"
        style={{
          background: 'rgba(96,165,250,0.95)',
          boxShadow: '0 0 8px rgba(96,165,250,0.9)',
          willChange: 'transform',
          transition: 'transform 0.12s ease, opacity 0.15s ease',
        }}
      />
    </>
  )
}
