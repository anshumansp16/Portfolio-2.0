'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 20, mass: 1 })
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (isInView) mv.set(value)
  }, [isInView, mv, value])

  return <span ref={ref}><motion.span>{display}</motion.span>{suffix}</span>
}

const metrics = [
  { raw: 7, display: '7+', label: 'Products Shipped', sublabel: 'Live SaaS, AI tools, e-commerce' },
  { raw: 385, display: '385+', label: 'Subscribers', sublabel: 'Growing organically' },
  { raw: 30, display: '30+', label: 'Videos Created', sublabel: 'Hindi tech & AI content' },
  { raw: 13.3, display: '13.3%', label: 'Avg CTR', sublabel: 'Top 1% on YouTube' },
]

export function Metrics() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[300px] rounded-full" style={{
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <div className="container-wide">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-chip mb-5">By the Numbers</div>
          <h2 className="text-display-sm md:text-headline-lg font-display text-platinum" style={{ fontWeight: 400, letterSpacing: '-0.025em' }}>
            Building, creating, shipping.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 18, overflow: 'hidden' }}>
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center p-6 md:p-12 relative group"
              style={{ background: '#04040C' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="text-3xl md:text-5xl font-mono font-semibold mb-3"
                style={{ letterSpacing: '-0.03em', color: '#60A5FA' }}
              >
                {metric.display}
              </div>
              <div className="text-body-sm text-platinum mb-2" style={{ fontWeight: 500, letterSpacing: '-0.01em' }}>
                {metric.label}
              </div>
              <div className="text-label text-graphite" style={{ lineHeight: 1.5 }}>
                {metric.sublabel}
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
