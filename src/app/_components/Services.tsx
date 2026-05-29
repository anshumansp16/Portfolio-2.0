'use client'

import { motion } from 'framer-motion'
import { useContent } from '@/lib/content'

const iconPaths: Record<string, string> = {
  cpu: 'M9 3H7a2 2 0 00-2 2v2M9 3h6m-6 0V1m6 2h2a2 2 0 012 2v2m0 0V9m0 0h2M15 9h2m-2 0v6m2-6H9m8 6v2a2 2 0 01-2 2h-2m0 0H9m4 0v2m-4-2H7a2 2 0 01-2-2v-2m0 0H3M5 15H3m2-6H3',
  layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  cloud: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
}

export function Services() {
  const { content } = useContent()

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-chip mb-6">What I Build</div>
          <h2
            className="text-display-sm md:text-display-md font-display text-platinum max-w-2xl mx-auto"
            style={{ fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.15 }}
          >
            Three ways I create
            <span className="text-gradient-blue"> real value</span>
          </h2>
          <p className="text-body-lg text-silver mt-5 max-w-lg mx-auto" style={{ fontWeight: 300 }}>
            Not prototypes. Not MVPs that don't scale. Production systems that handle real traffic.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {content.services.map((service, i) => (
            <motion.div
              key={i}
              className="glass-card p-8 md:p-10 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Number */}
              <div
                className="absolute top-5 right-6 font-mono text-xs"
                style={{ color: 'rgba(59,130,246,0.2)', letterSpacing: '0.08em' }}
              >
                0{i + 1}
              </div>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}
              >
                <svg className="w-5 h-5 text-accent-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[service.icon] || iconPaths.cpu} />
                </svg>
              </div>

              <h3 className="text-headline-sm text-platinum mb-3" style={{ fontWeight: 500, letterSpacing: '-0.015em' }}>
                {service.title}
              </h3>
              <p className="text-body text-silver mb-6" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-label px-2 py-1 rounded font-mono"
                    style={{ background: 'rgba(59,130,246,0.07)', color: 'rgba(96,165,250,0.7)', border: '1px solid rgba(59,130,246,0.1)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Blue glow on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
