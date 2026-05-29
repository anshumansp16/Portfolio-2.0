'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface ProblemProps {
  title: string
  pain: string
  solution: string
  index: number
}

function Problem({ title, pain, solution, index }: ProblemProps) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Card with subtle border */}
      <div className="relative h-full">
        <div className="absolute inset-0 border border-white/[0.04] rounded-lg" />

        <div className="relative p-8 md:p-10 h-full flex flex-col">
          {/* Title */}
          <h3
            className="text-headline-sm font-display text-platinum mb-4"
            style={{
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>

          {/* Pain Point */}
          <p
            className="text-body text-silver/60 mb-6 flex-grow"
            style={{
              fontWeight: 300,
              letterSpacing: '0.01em',
              lineHeight: 1.7,
            }}
          >
            {pain}
          </p>

          {/* Solution with arrow */}
          <div className="flex items-start gap-3 pt-4 border-t border-white/[0.04]">
            <span className="text-accent-gold/60 mt-1 text-sm">→</span>
            <p
              className="text-body text-platinum/90"
              style={{
                fontWeight: 400,
                letterSpacing: '-0.01em',
                lineHeight: 1.6,
              }}
            >
              {solution}
            </p>
          </div>
        </div>

        {/* Subtle hover glow */}
        <div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  )
}

const problems = [
  {
    title: 'Content Creation Bottleneck',
    pain: 'Each client needs 30+ social posts monthly. Your team spends 15+ hours per client on content alone, leaving no time for strategy.',
    solution: 'AI generates 30 posts, 10 ad variations, and landing page copy in 2 minutes per client—consistent brand voice guaranteed.',
  },
  {
    title: 'Every Client Needs Unique Voice',
    pain: 'Templates don\'t work. Each brand has different tone, style, and messaging requirements. Manual customization doesn\'t scale.',
    solution: 'AI learns each client\'s brand voice from examples, generating authentic content that sounds like them—not generic AI.',
  },
  {
    title: 'Quality Review Takes Forever',
    pain: 'Even with tools, content needs heavy editing. Your team becomes full-time editors instead of strategists.',
    solution: 'Brand-trained AI produces 80% ready content. Your team spends time on high-value edits and approval, not creation.',
  },
]

export function ProblemsISolve() {
  return (
    <section className="relative py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p
            className="font-mono text-graphite/60 mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.1em' }}
          >
            AGENCY PAIN POINTS
          </p>
          <h2
            className="text-headline-md md:text-headline-lg lg:text-display-sm font-display text-platinum max-w-3xl mx-auto"
            style={{
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
            }}
          >
            What We Solve for Agencies
          </h2>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, index) => (
            <Problem key={problem.title} {...problem} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
