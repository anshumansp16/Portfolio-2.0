import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  decimals?: number
  start?: number
  startOnMount?: boolean
}

/**
 * Animate a number counting up
 * @param options - Configuration options
 * @returns current count value and trigger function
 */
export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  start = 0,
  startOnMount = false,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start)
  const [isAnimating, setIsAnimating] = useState(false)
  const frameRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number | undefined>(undefined)

  const animate = (currentTime: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = currentTime
    }

    const progress = Math.min((currentTime - startTimeRef.current) / duration, 1)

    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    const currentCount = start + (end - start) * easeProgress
    setCount(parseFloat(currentCount.toFixed(decimals)))

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate)
    } else {
      setIsAnimating(false)
      startTimeRef.current = undefined
    }
  }

  const startAnimation = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCount(start)
    startTimeRef.current = undefined
    frameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (startOnMount) {
      startAnimation()
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [startOnMount])

  return {
    count,
    isAnimating,
    start: startAnimation,
  }
}
