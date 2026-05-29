'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useContent } from '@/lib/content'

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

export function Footer() {
  const { content } = useContent()
  const year = new Date().getFullYear()

  const socials = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/anshumansp16', Icon: LinkedInIcon },
    { name: 'GitHub', href: 'https://github.com/anshumansp', Icon: GitHubIcon },
    { name: 'Twitter', href: 'https://x.com/anshumansp16', Icon: XIcon },
    { name: 'Email', href: 'mailto:anshumansp16@gmail.com', Icon: EmailIcon },
  ]

  return (
    <footer className="relative border-t overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.04)', background: '#020204' }}>
      {/* Top blue line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.25) 50%, transparent 100%)' }} />

      <div className="container-wide py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
                <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" stroke="rgba(59,130,246,0.3)" fill="rgba(9,9,18,0.9)" />
                <path d="M9 25L14 11L19 25" stroke="rgba(238,237,245,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M10.8 21H17.2" stroke="rgba(96,165,250,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M21 25V11" stroke="rgba(238,237,245,0.75)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M21 11H24.5C26.4 11 28 12.3 28 14.5C28 16.7 26.4 18 24.5 18H21" stroke="rgba(238,237,245,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span className="text-sm font-medium text-platinum/70 group-hover:text-platinum/90 transition-colors">Anshuman Parmar</span>
            </Link>
            <p className="text-body-sm text-graphite" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              {content.footer.tagline}
            </p>
            <div className="flex items-center gap-1.5 mt-4">
              <span className="glow-dot" />
              <span className="text-body-sm" style={{ color: 'rgba(110,231,183,0.7)' }}>Available for work</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2.5">
            {['Work', 'About', 'Connect', 'Insights'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-body-sm text-graphite hover:text-platinum transition-colors duration-200 w-fit"
                style={{ fontWeight: 400 }}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex flex-col gap-2.5">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-body-sm text-graphite hover:text-platinum transition-colors duration-200 w-fit"
                style={{ fontWeight: 400 }}
              >
                <Icon />
                {name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
          <p className="text-body-sm text-graphite" style={{ fontWeight: 300 }}>
            © {year} {content.footer.copyright}
          </p>
          <Link href="/admin" className="text-label text-graphite hover:text-platinum transition-colors" style={{ letterSpacing: '0.06em' }}>
            ADMIN
          </Link>
        </div>
      </div>
    </footer>
  )
}
