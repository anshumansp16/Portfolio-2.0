'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const techCategories = [
  {
    label: 'AI & ML',
    items: ['OpenAI', 'Claude', 'LangChain', 'RAG', 'Pinecone'],
  },
  {
    label: 'Backend',
    items: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Three.js'],
  },
  {
    label: 'Infrastructure',
    items: ['AWS', 'Docker', 'Kubernetes', 'Vercel', 'GCP'],
  },
]

export function TechStack() {
  return (
    <section className="relative py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-label text-graphite mb-4">TOOLKIT</p>
          <h2 className="text-headline-lg md:text-display-sm font-display text-platinum">
            Technologies I work with
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="text-left"
            >
              <p className="text-label text-accent-gold mb-3 md:mb-4">{category.label}</p>
              <div className="flex flex-wrap justify-start gap-1.5 md:gap-2">
                {category.items.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + techIndex * 0.05 }}
                    className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs md:text-body-sm text-silver/70 hover:text-platinum hover:border-white/[0.12] transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
