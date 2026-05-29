'use client'

import { motion } from 'framer-motion'
import { useContent } from '@/lib/content'

export function TechStack() {
  const { content } = useContent()
  const { techStack } = content

  const categories = [
    { label: 'AI & ML', items: techStack.ai, color: '#22D3EE' },
    { label: 'Backend', items: techStack.backend, color: '#60A5FA' },
    { label: 'Frontend', items: techStack.frontend, color: '#A78BFA' },
    { label: 'Infrastructure', items: techStack.infra, color: '#34D399' },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-wide">
        <motion.div
          className="mb-14 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-chip mb-6">Toolkit</div>
          <h2 className="text-display-sm font-display text-platinum" style={{ fontWeight: 400, letterSpacing: '-0.025em' }}>
            Production-grade stack
          </h2>
          <p className="text-body text-silver mt-3 max-w-md" style={{ fontWeight: 300 }}>
            Every tool I use is one I&apos;ve shipped to production — under real traffic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              className="dev-card p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                <span className="text-label uppercase tracking-widest" style={{ color: cat.color, opacity: 0.8 }}>
                  {cat.label}
                </span>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((tech, ti) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: ci * 0.1 + ti * 0.04 }}
                    className="px-3 py-1.5 rounded-lg text-body-sm font-mono"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: 'rgba(238,237,245,0.6)',
                      cursor: 'default',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
