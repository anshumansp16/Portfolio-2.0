'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/data/blogs'

interface LatestInsightsProps {
  posts: BlogPost[]
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export function LatestInsights({ posts }: LatestInsightsProps) {
  if (!posts.length) return null

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-chip mb-7">Insights</div>
            <h2
              className="font-display text-platinum"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.08 }}
            >
              Latest <span className="text-gradient-blue">writing</span>
            </h2>
            <p className="text-body-lg text-silver max-w-md mt-5" style={{ fontWeight: 300, lineHeight: 1.8 }}>
              Notes on building production AI systems, shipped products, and the tradeoffs behind them.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link href="/insights" className="btn-ghost whitespace-nowrap">
              All articles
              <ArrowIcon />
            </Link>
          </motion.div>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/insights/${post.slug}`} className="group block h-full">
                <article className="glass-card h-full flex flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir-primary via-noir-primary/10 to-transparent" />
                    <span
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(5,5,10,0.75)', backdropFilter: 'blur(8px)', color: 'rgba(147,197,253,0.9)', border: '1px solid rgba(59,130,246,0.25)' }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-headline-sm font-display text-platinum mb-3 line-clamp-2 group-hover:text-accent-electric transition-colors" style={{ letterSpacing: '-0.01em' }}>
                      {post.title}
                    </h3>
                    <p className="text-body-sm text-silver/70 mb-5 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-graphite font-mono pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
