'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const glowPos = useRef({ x: -200, y: -200 })
  const raf = useRef<number>(0)

  useEffect(() => {
    // hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
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
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
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
      {/* Tiny sharp dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full"
        style={{
          background: 'rgba(96,165,250,0.9)',
          boxShadow: '0 0 6px rgba(96,165,250,0.8)',
          willChange: 'transform',
          transition: 'opacity 0.2s',
        }}
      />
    </>
  )
}
