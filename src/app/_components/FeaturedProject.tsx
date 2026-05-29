'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function FeaturedProject() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" id="projects">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="section-chip mb-4">Featured Product</div>
              <h2 className="text-display-sm font-display text-platinum" style={{ fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                KreatorOS
              </h2>
              <p className="text-body text-silver mt-3 max-w-lg" style={{ fontWeight: 300 }}>
                AI-powered content creation platform. Captions in 12+ languages, smart clips, trending ideas, and multi-platform publishing.
              </p>
            </div>
            <a href="https://instagram.com/kreatoros.ai" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-silver hover:text-platinum transition-colors self-start flex-shrink-0"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @kreatoros.ai
            </a>
          </div>
        </motion.div>

        {/* Showcase - full width */}
        <motion.a
          href="https://creative.anshumansp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Dark-theme container — no raw light screenshot on full bleed */}
          <div className="relative overflow-hidden rounded-2xl"
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'linear-gradient(135deg, rgba(10,10,24,0.98) 0%, rgba(6,6,18,1) 100%)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}>

            {/* Ambient glow behind screenshot */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[80%] rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            </div>

            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 relative"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex gap-1.5">
                {['rgba(255,95,87,0.6)', 'rgba(255,189,46,0.6)', 'rgba(39,201,63,0.6)'].map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(39,201,63,0.7)' }} />
                  <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>creative.anshumansp.com</span>
                </div>
              </div>
            </div>

            {/* Screenshot — contained at native ratio, padded, not stretched */}
            <div className="relative flex items-center justify-center px-4 py-5 md:px-14 md:py-10">
              <div className="relative w-full overflow-hidden rounded-xl transition-transform duration-700 group-hover:scale-[1.015]"
                style={{
                  boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
                  maxHeight: '460px',
                }}>
                <Image
                  src="/images/assets/kreatoros-dashboard.png"
                  alt="KreatorOS — Content creation, reimagined"
                  width={1024}
                  height={558}
                  className="w-full h-auto block"
                  sizes="(max-width: 768px) 100vw, 900px"
                  quality={100}
                  priority
                />
                {/* Soft bottom fade to blend with dark card */}
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(6,6,18,0.6) 0%, transparent 100%)' }} />
              </div>

              {/* Hover CTA overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: 'rgba(4,4,14,0.45)', backdropFilter: 'blur(3px)' }}>
                <div className="flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium"
                  style={{ background: 'rgba(59,130,246,0.92)', color: 'white', boxShadow: '0 8px 32px rgba(59,130,246,0.45)' }}>
                  Visit KreatorOS
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.a>

        {/* Compact stats + tags row */}
        <motion.div
          className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Stats inline */}
          <div className="flex flex-wrap items-center gap-5">
            {[
              { value: '12+', label: 'Languages' },
              { value: '7+', label: 'AI Tools' },
              { value: 'Live', label: 'In Production' },
            ].map((stat, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span className="text-lg font-mono font-semibold text-accent-electric">{stat.value}</span>
                <span className="text-label text-graphite">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'AI/ML', 'SaaS'].map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded font-mono text-label"
                style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.1)', color: 'rgba(96,165,250,0.6)' }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
