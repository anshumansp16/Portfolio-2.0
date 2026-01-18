'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const testimonials = [
  {
    quote: "Anshuman delivered a production-ready RAG system that exceeded our expectations. His understanding of AI architecture is exceptional.",
    author: "Technical Lead",
    company: "Enterprise Client",
    highlight: "40% accuracy improvement",
  },
  {
    quote: "The browser automation platform he built handles 50K+ daily tasks with remarkable reliability. True engineering excellence.",
    author: "Director of Operations",
    company: "Marketing Tech",
    highlight: "99.9% uptime",
  },
  {
    quote: "Rare to find someone who understands both the technical depth and business impact. Anshuman bridges that gap effortlessly.",
    author: "Product Manager",
    company: "SaaS Startup",
    highlight: "60% cost reduction",
  },
]

export function Testimonials() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-gold/[0.02] to-transparent" />

      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-label text-graphite mb-4">TRUST</p>
          <h2 className="text-headline-lg md:text-display-sm font-display text-platinum">
            Words from the field
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                {/* Highlight badge */}
                <div className="inline-block px-3 py-1 mb-6 rounded-full bg-accent-gold/10 border border-accent-gold/20">
                  <span className="text-label-sm text-accent-gold">{testimonial.highlight}</span>
                </div>

                {/* Quote */}
                <p className="text-body text-silver/80 leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="mt-auto">
                  <p className="text-body-sm text-platinum font-medium">{testimonial.author}</p>
                  <p className="text-label-sm text-graphite">{testimonial.company}</p>
                </div>

                {/* Decorative quote mark */}
                <div className="absolute top-6 right-6 text-6xl font-serif text-white/[0.03] select-none">
                  "
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
