'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Magnetic } from '@/components/ui/Magnetic'

export function ConnectCTA() {
  return (
    <section className="relative py-24 md:py-36">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          className="w-[700px] h-[400px] rounded-full"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.1) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="container-wide relative">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-display text-platinum mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            Let&apos;s build something{' '}
            <span className="text-gradient-blue">together.</span>
          </h2>
          <p className="text-body-lg text-silver mb-10" style={{ fontWeight: 300, lineHeight: 1.75 }}>
            Whether it&apos;s a product, a collaboration, or a brand deal — I&apos;m always open to conversations that lead to great work.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.28}>
              <Link href="/connect" className="btn-primary">
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.28}>
              <a href="mailto:anshumansp16@gmail.com" className="btn-ghost">
                anshumansp16@gmail.com
              </a>
            </Magnetic>
          </div>

          {/* Social links */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { label: 'YouTube', href: 'https://youtube.com/@anshumanparmar' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/anshumansp' },
              { label: 'GitHub', href: 'https://github.com/anshumansp' },
              { label: 'Twitter', href: 'https://twitter.com/anshumansp' },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-graphite hover:text-platinum transition-colors duration-200 relative group"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-blue/50 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
