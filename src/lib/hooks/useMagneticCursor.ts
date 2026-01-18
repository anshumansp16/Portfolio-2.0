import { useState, useCallback, RefObject } from 'react'

interface Position {
  x: number
  y: number
}

/**
 * Magnetic cursor effect hook
 * Creates a magnetic pull effect when hovering over an element
 *
 * @param strength - Strength of the magnetic effect (0-1)
 * @returns position and event handlers
 */
export function useMagneticCursor(strength: number = 0.3) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * strength
      const y = (e.clientY - rect.top - rect.height / 2) * strength
      setPosition({ x, y })
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
  }

  return {
    position,
    handleMouseMove,
    handleMouseLeave,
    style,
  }
}
