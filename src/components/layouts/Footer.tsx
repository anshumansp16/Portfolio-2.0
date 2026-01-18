'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// Social Icons as inline SVGs
const LinkedInIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const EmailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
)

const navigation = {
  main: [
    { name: 'Work', href: '/work' },
    { name: 'Insights', href: '/insights' },
    { name: 'About', href: '/about' },
    { name: 'Connect', href: '/connect' },
  ],
  social: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/anshumansp16', icon: LinkedInIcon },
    { name: 'GitHub', href: 'https://github.com/anshumansp', icon: GitHubIcon },
    { name: 'Twitter', href: 'https://x.com/AnshumanSP16', icon: XIcon },
    { name: 'Email', href: 'mailto:anshumansp16@gmail.com', icon: EmailIcon },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-noir-void border-t border-white/[0.03] overflow-hidden">
      <div className="container-wide relative z-10 py-16 md:py-20">
        {/* Signature Layout: Left - Center - Right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Left: Name + Role */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <span
                className="text-platinum/60 transition-colors duration-300 group-hover:text-platinum/80 relative"
                style={{
                  fontFamily: 'var(--font-signature)',
                  fontSize: '2.2rem',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                Anshuman
                {/* The Line motif - final frame */}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-graphite/40 via-graphite/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </Link>
            <p className="text-body-sm text-silver/50" style={{ fontWeight: 300 }}>
              Senior Full Stack Developer | AI & Automation Engineer
            </p>
          </div>

          {/* Center: Navigation */}
          <nav className="flex flex-col gap-2">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-body-sm text-silver/60 hover:text-platinum/80 transition-colors duration-300 w-fit"
                style={{ fontWeight: 300 }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: Contact Links */}
          <div className="flex flex-col gap-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-body-sm text-silver/60 hover:text-platinum/80 transition-colors duration-300 w-fit"
                style={{ fontWeight: 300 }}
              >
                <item.icon />
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright - Minimal */}
        <div className="mt-16 pt-8 border-t border-white/[0.02]">
          <p className="text-body-sm text-graphite/60" style={{ fontWeight: 300 }}>
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}
