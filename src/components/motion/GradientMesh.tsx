'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Gradient mesh animation
    let animationFrame: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const drawGradient = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create multiple radial gradients
      const gradient1 = ctx.createRadialGradient(
        mouseX * 0.3,
        mouseY * 0.3,
        0,
        mouseX * 0.3,
        mouseY * 0.3,
        canvas.width * 0.5
      )
      gradient1.addColorStop(0, 'rgba(212, 197, 169, 0.02)')
      gradient1.addColorStop(0.5, 'rgba(212, 197, 169, 0.005)')
      gradient1.addColorStop(1, 'transparent')

      const gradient2 = ctx.createRadialGradient(
        canvas.width - mouseX * 0.2,
        canvas.height - mouseY * 0.2,
        0,
        canvas.width - mouseX * 0.2,
        canvas.height - mouseY * 0.2,
        canvas.width * 0.4
      )
      gradient2.addColorStop(0, 'rgba(251, 246, 238, 0.03)')
      gradient2.addColorStop(0.5, 'rgba(251, 246, 238, 0.01)')
      gradient2.addColorStop(1, 'transparent')

      // Draw gradients
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrame = requestAnimationFrame(drawGradient)
    }

    drawGradient()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}
