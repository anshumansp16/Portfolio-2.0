'use client'

import * as React from 'react'
import { motion, type PanInfo } from 'framer-motion'

interface TestimonialData {
  id: number
  testimonial: string
  author: string
  role: string
  company: string
}

interface ShuffleTestimonialsProps {
  testimonials: TestimonialData[]
}

export function ShuffleTestimonials({ testimonials }: ShuffleTestimonialsProps) {
  const [cards, setCards] = React.useState<TestimonialData[]>(testimonials.slice(0, 3))
  const dragRef = React.useRef(0)

  const handleShuffle = () => {
    setCards((prev) => {
      const next = [...prev]
      const first = next.shift()
      if (first) next.push(first)
      return next
    })
  }

  React.useEffect(() => {
    const t = setInterval(handleShuffle, 4500)
    return () => clearInterval(t)
  }, [])

  const configs = [
    { rotate: -6, x: 0,  y: 0,   scale: 1,    zIndex: 30, opacity: 1 },
    { rotate:  3, x: 32, y: -10, scale: 0.94, zIndex: 20, opacity: 0.75 },
    { rotate: 10, x: 60, y: -20, scale: 0.88, zIndex: 10, opacity: 0.5 },
  ]

  return (
    <div className="relative w-[min(340px,85vw)]" style={{ height: 380 }}>
      {cards.map((card, index) => {
        const cfg = configs[index] ?? configs[2]
        const isFront = index === 0

        return (
          <motion.div
            key={card.id}
            className={`absolute inset-0 rounded-3xl overflow-hidden select-none ${isFront ? 'cursor-grab active:cursor-grabbing' : ''}`}
            style={{
              zIndex: cfg.zIndex,
              background: 'linear-gradient(145deg, rgba(14,14,30,0.98) 0%, rgba(6,6,18,0.99) 100%)',
              border: '1px solid rgba(59,130,246,0.16)',
              boxShadow: isFront
                ? '0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
                : '0 16px 40px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(24px)',
            }}
            animate={{ rotate: cfg.rotate, x: cfg.x, y: cfg.y, scale: cfg.scale, opacity: cfg.opacity }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            drag={isFront}
            dragElastic={0.12}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            onDragStart={(_e, info: PanInfo) => { dragRef.current = info.point.x }}
            onDragEnd={(_e, info: PanInfo) => {
              if (Math.abs(dragRef.current - info.point.x) > 70) handleShuffle()
              dragRef.current = 0
            }}
            onClick={isFront ? handleShuffle : undefined}
          >
            {/* Top blue tint */}
            <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(59,130,246,0.07) 0%, transparent 100%)' }} />

            <div className="p-8 h-full flex flex-col justify-between">
              {/* Stars */}
              <div className="flex justify-center gap-1.5">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-4 h-4" viewBox="0 0 16 16">
                    <path
                      d="M8 1l1.854 4.146L14 5.73l-3.083 2.857.728 4.137L8 10.5l-3.645 2.224.728-4.137L2 5.73l4.146-.584z"
                      fill="#60A5FA" opacity={s < 5 ? 1 : 0.3}
                    />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1 flex items-center text-center text-sm mt-7"
                style={{ fontStyle: 'italic', color: 'rgba(238,237,245,0.85)', lineHeight: 1.9 }}>
                &ldquo;{card.testimonial}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="text-center mt-7 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-sm font-semibold text-white block mb-0.5">{card.author}</span>
                <span className="text-xs font-mono" style={{ color: 'rgba(34,211,238,0.65)' }}>
                  {card.role}, {card.company}
                </span>
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Shuffle hint */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap"
        style={{ fontSize: '11px', color: 'rgba(238,237,245,0.25)', fontFamily: 'monospace' }}
        animate={{ x: [-4, 4, -4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>←</span><span>Drag to shuffle</span><span>→</span>
      </motion.div>
    </div>
  )
}
