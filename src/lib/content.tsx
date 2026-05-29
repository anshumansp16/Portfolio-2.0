'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

// ─── Default Content ──────────────────────────────────────────────────────────

export const defaultContent = {
  hero: {
    badge: 'Available for Projects',
    headline1: 'I build products,',
    headline2: '& ship ideas.',
    subtext: 'AI Engineer building real products. Tech Content Creator with 13.3% CTR and a brand deal before 400 subs. Shipping AI tools that actually work.',
    cta1: 'See My Work',
    cta2: 'Media Kit',
  },
  about: {
    tagline: 'AI Engineer · Content Creator · Entrepreneur',
    bio: 'I build AI products, create tech content in Hindi & English, and ship ideas that reach thousands. From KreatorOS to brand deals — always building.',
    location: 'India · Remote',
  },
  services: [
    {
      icon: 'cpu',
      title: 'AI Automation',
      description: 'Custom AI pipelines, LLM integrations, RAG systems, and intelligent agents that solve real business problems.',
      tags: ['OpenAI', 'LangChain', 'RAG', 'Agents'],
    },
    {
      icon: 'layers',
      title: 'Full-Stack Apps',
      description: 'Production Next.js and FastAPI applications with proper architecture, auth, payments, and deployment.',
      tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis'],
    },
    {
      icon: 'cloud',
      title: 'Cloud & DevOps',
      description: 'Kubernetes, Docker, AWS, GCP — infrastructure that handles real traffic and stays online.',
      tags: ['K8s', 'Docker', 'AWS', 'GCP'],
    },
  ],
  metrics: [
    { number: '7+', label: 'Products Shipped', sublabel: 'Live SaaS, AI tools, e-commerce' },
    { number: '385+', label: 'Subscribers', sublabel: 'Growing organically' },
    { number: '30+', label: 'Videos Created', sublabel: 'Hindi tech & AI content' },
    { number: '13.3%', label: 'Avg CTR', sublabel: 'Top 1% on YouTube' },
  ],
  process: [
    { step: '01', title: 'Discovery', description: 'Understand the problem, the stack, and what success looks like.' },
    { step: '02', title: 'Architecture', description: 'Design a system that handles real traffic and scales cleanly.' },
    { step: '03', title: 'Build & Ship', description: 'Production-quality code with proper testing, CI/CD, and monitoring.' },
  ],
  techStack: {
    ai: ['OpenAI', 'Claude', 'LangChain', 'Pinecone', 'RAG', 'Agents'],
    backend: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'GraphQL'],
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    infra: ['Kubernetes', 'Docker', 'AWS EC2', 'GCP', 'Nginx', 'CI/CD'],
  },
  cta: {
    headline: "Let's build something together.",
    subtext: "Whether it's a product, a collaboration, or a brand deal — I'm always open to conversations that lead to great work.",
    primaryBtn: 'Get in Touch',
    secondaryBtn: 'Media Kit',
  },
  navigation: {
    logo: 'AP',
    items: ['Work', 'About', 'Connect'],
    ctaLabel: 'Let\'s Talk',
  },
  footer: {
    tagline: 'AI Engineer · Content Creator · Entrepreneur',
    copyright: 'Anshuman Parmar',
  },
  testimonials: [
    {
      quote: 'Anshuman built our entire AI pipeline from scratch — it handled 10K+ requests daily from day one.',
      author: 'CTO, SaaS Startup',
      avatar: 'CTO',
    },
    {
      quote: 'Delivered production-grade infrastructure on AWS in 3 weeks. The system has had zero downtime.',
      author: 'Founder, Tech Agency',
      avatar: 'FND',
    },
    {
      quote: 'The custom AI automation he built cut our processing time from 8 hours to 12 minutes.',
      author: 'Head of Ops, eCommerce',
      avatar: 'HOE',
    },
  ],
  faq: [
    {
      q: 'What kind of projects do you take on?',
      a: 'Full-stack applications, AI/ML integrations, cloud infrastructure, and automation systems. I focus on production-ready work — not throwaway prototypes.',
    },
    {
      q: 'Are you available for freelance/contract work?',
      a: 'Yes — both short-term contracts and longer engagements. I work with startups, agencies, and established companies remotely.',
    },
    {
      q: 'What tech stack do you prefer?',
      a: 'Next.js + FastAPI/Node.js on the backend, PostgreSQL + Redis for data, Kubernetes/Docker for infra, and OpenAI/LangChain for AI. But I adapt to your stack.',
    },
    {
      q: 'Can you handle the full project — design to deployment?',
      a: 'Yes. I can take a project from architecture design to production deployment including CI/CD, monitoring, and ongoing maintenance.',
    },
    {
      q: 'How do I get started working with you?',
      a: 'Send a message via the Connect page. A quick call is usually the fastest way to understand scope and see if we\'re a good fit.',
    },
  ],
}

export type SiteContent = typeof defaultContent

// ─── Context ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'portfolio_content_v1'

interface ContentContextValue {
  content: SiteContent
  updateContent: (updates: Partial<SiteContent>) => void
  resetContent: () => void
  isAdmin: boolean
  setAdmin: (v: boolean) => void
}

const ContentContext = createContext<ContentContextValue>({
  content: defaultContent,
  updateContent: () => {},
  resetContent: () => {},
  isAdmin: false,
  setAdmin: () => {},
})

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [isAdmin, setIsAdmin] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setContent((prev) => deepMerge(prev, parsed))
      }
    } catch {}

    // Check admin session
    const adminSession = sessionStorage.getItem('admin_authed')
    if (adminSession === 'true') setIsAdmin(true)
  }, [])

  const updateContent = useCallback((updates: Partial<SiteContent>) => {
    setContent((prev) => {
      const next = deepMerge(prev, updates)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const resetContent = useCallback(() => {
    setContent(defaultContent)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  const setAdmin = useCallback((v: boolean) => {
    setIsAdmin(v)
    if (v) sessionStorage.setItem('admin_authed', 'true')
    else sessionStorage.removeItem('admin_authed')
  }, [])

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isAdmin, setAdmin }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(target: any, source: any): any {
  if (typeof source !== 'object' || source === null) return source
  if (Array.isArray(source)) return source
  const result = { ...target }
  for (const key of Object.keys(source)) {
    const s = source[key]
    const t = result[key]
    result[key] = typeof s === 'object' && s !== null && !Array.isArray(s) ? deepMerge(t, s) : s
  }
  return result
}
