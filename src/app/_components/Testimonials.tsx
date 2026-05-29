'use client'

import { motion } from 'framer-motion'
import { ShuffleTestimonials } from '@/components/ui/TestimonialCards'

const testimonials = [
  {
    id: 1,
    testimonial: "I highly recommend Anshuman for his outstanding contributions as a frontend developer. His proficiency in frontend technologies, ability to design sophisticated interfaces, and expertise in API integration made him an invaluable asset to our team.",
    author: "Prameya Uppalapati",
    role: "Director",
    company: "New IT Nest Ltd.",
  },
  {
    id: 2,
    testimonial: "I highly recommend Anshuman for their contributions in backend development. Their expertise in creating and optimizing databases greatly helped me in my project.",
    author: "Sanket Ghorpade",
    role: "Deputy Manager — Business Solutions",
    company: "Axis Bank",
  },
  {
    id: 3,
    testimonial: "Working with Anshuman was a game-changer for our startup. His technical expertise and problem-solving skills delivered a robust platform that exceeded our expectations. Highly recommended!",
    author: "Emma Johnson",
    role: "Founder & CEO",
    company: "TechVenture Inc.",
  },
  {
    id: 4,
    testimonial: "Anshuman's work on our e-commerce platform was exceptional. His attention to detail and innovative solutions significantly improved our user experience and conversion rates.",
    author: "Michael Schmidt",
    role: "CTO",
    company: "Global Solutions GmbH",
  },
]

const stats = [
  { value: '7+',   label: 'Products Built', color: '#60A5FA' },
  { value: '99%',  label: 'Satisfaction',   color: '#22D3EE' },
  { value: '25+',  label: 'Apps Delivered',  color: '#34D399' },
]

const sectors = ['SaaS', 'Banking', 'E-Commerce', 'Dev Tools']

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-0 w-[350px] h-[350px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left — heading + stats */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-chip mb-7">Testimonials</div>
            <h2
              className="font-display text-platinum mb-7"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.08 }}
            >
              What clients<br />
              <span className="text-gradient-blue">actually say</span>
            </h2>
            <p className="text-body-lg text-silver max-w-md mb-10" style={{ fontWeight: 300, lineHeight: 1.8 }}>
              Real words from founders, directors, and engineers I&apos;ve built with. No fluff — just results.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  className="rounded-2xl p-4 text-center"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                  whileHover={{ y: -4, borderColor: `${s.color}50` }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl md:text-3xl font-mono font-semibold mb-1" style={{ color: s.color, letterSpacing: '-0.03em' }}>{s.value}</div>
                  <div className="text-xs text-graphite font-mono tracking-wide leading-snug">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Sector tags */}
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => (
                <span key={sector} className="px-3 py-1.5 rounded-lg text-xs font-mono text-silver/50"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {sector}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — shuffle card deck */}
          <motion.div
            className="flex justify-center lg:justify-end lg:pr-8 pt-8 lg:pt-0"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <ShuffleTestimonials testimonials={testimonials} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
