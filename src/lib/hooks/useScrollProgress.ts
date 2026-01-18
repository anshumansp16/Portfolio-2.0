import { useState, useEffect } from 'react'
import { throttle } from '../utils'

/**
 * Track scroll progress as a percentage (0-100)
 * @returns current scroll progress percentage
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalHeight) * 100
      setProgress(Math.min(Math.max(currentProgress, 0), 100))
    }, 100)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
