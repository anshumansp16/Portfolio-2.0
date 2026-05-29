'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '13.3%', label: 'Average CTR', highlight: true, note: 'Top 1% on YouTube' },
  { value: '385+', label: 'Subscribers', highlight: false, note: 'Growing organically' },
  { value: '30+', label: 'Videos Published', highlight: false, note: 'AI Tools & Dev Content' },
  { value: '1', label: 'Brand Collaboration', highlight: false, note: 'Thumbs.ai' },
]

export function MediaKit() {
  return (
    <section className="relative py-24 md:py-32" id="media-kit">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)' }} />
      </div>

      <div className="container-wide relative">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-chip mb-5">Media Kit</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-display-sm md:text-display-md font-display text-platinum" style={{ fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Content Creator Stats
              </h2>
              <p className="text-body-lg text-silver mt-3 max-w-xl" style={{ fontWeight: 300 }}>
                Tech content in Hindi & English. AI tools, developer workflows, and building in public.
              </p>
            </div>
            <a href="mailto:anshumansp16@gmail.com"
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm text-silver hover:text-platinum transition-colors self-start"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              Brand Deal
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, overflow: 'hidden' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center p-5 md:p-10 relative group"
              style={{ background: '#05050A' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div
                className={`text-3xl md:text-5xl font-mono font-bold mb-2 ${stat.highlight ? 'text-accent-cyan' : 'text-accent-electric'}`}
                style={{ letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </div>
              <div className="text-body-sm text-platinum mb-1.5" style={{ fontWeight: 500 }}>
                {stat.label}
              </div>
              <div className="text-label text-graphite">{stat.note}</div>
              {stat.highlight && (
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at center, rgba(34,211,238,0.04) 0%, transparent 70%)' }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Media kit card */}
        <motion.div
          className="glass-card p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ background: 'rgba(9,9,18,0.7)' }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left */}
            <div>
              <h3 className="text-headline-sm text-platinum mb-4" style={{ fontWeight: 500 }}>Channel Details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Channel', value: 'Anshuman Parmar' },
                  { label: 'Niche', value: 'AI Tools, Hindi Tech, Dev Content' },
                  { label: 'Audience', value: 'Indian Developers, 18-30' },
                  { label: 'Languages', value: 'Hindi & English' },
                  { label: 'Previous Brand', value: 'Thumbs.ai' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-label text-graphite w-24 flex-shrink-0 pt-0.5">{item.label}</span>
                    <span className="text-body-sm text-silver">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div>
              <h3 className="text-headline-sm text-platinum mb-4" style={{ fontWeight: 500 }}>Why Work With Me</h3>
              <ul className="space-y-2.5">
                {[
                  '13.3% CTR — most 100K creators can\'t match this',
                  'Authentic tech audience that trusts recommendations',
                  'AI/Dev niche = high-intent, high-value viewers',
                  'Full product reviews with real usage demos',
                  'Cross-promotion across products & platforms',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-body-sm text-silver" style={{ fontWeight: 300 }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-label text-graphite mb-2">CONTACT FOR COLLABORATIONS</div>
                <a href="mailto:anshumansp16@gmail.com" className="text-body-sm text-accent-electric hover:text-accent-cyan transition-colors">
                  anshumansp16@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
