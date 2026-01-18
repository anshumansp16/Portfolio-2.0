'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from './Card'

interface ProjectCardProps {
  title: string
  description: string
  category: string
  tags: string[]
  link: string
  metrics?: {
    label: string
    value: string
  }[]
  index: number
}

export function ProjectCard({
  title,
  description,
  category,
  tags,
  link,
  metrics,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={link} className="block group">
        <Card className="h-full">
          {/* Category Label */}
          <p className="text-label text-accent-gold mb-3">{category}</p>

          {/* Title */}
          <h3 className="text-headline-sm font-display text-platinum mb-4 group-hover:text-accent-gold transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-body-sm text-silver/70 mb-6">
            {description}
          </p>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-6 pb-6 border-b border-white/[0.06]">
              {metrics.map((metric) => (
                <div key={metric.label} className="min-w-0">
                  <p className="text-sm font-semibold text-platinum mb-1 truncate">
                    {metric.value}
                  </p>
                  <p className="text-label-sm text-graphite truncate">{metric.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-noir-subtle border border-white/[0.06] rounded-full text-label-sm text-silver"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hover Arrow */}
          <div className="flex items-center gap-2 text-accent-gold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
            <span className="text-body-sm font-medium">View Details</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
