import { Metadata } from 'next'
import { AboutContent } from './AboutContent'

export const metadata: Metadata = {
  title: 'About — Anshuman Parmar',
  description: 'AI Engineer, Tech Content Creator, and Entrepreneur. Building production AI systems, creating Hindi tech content with 13.3% CTR, and shipping ideas from code to customers.',
  keywords: ['Anshuman Parmar', 'AI Engineer', 'Content Creator', 'KreatorOS', 'ScrapeHub', 'TATVA', 'YouTube', 'Hindi Tech'],
  alternates: { canonical: 'https://anshumansp.com/about' },
  openGraph: {
    title: 'About — Anshuman Parmar',
    description: 'AI Engineer, Tech Content Creator, and Entrepreneur building real products.',
    url: 'https://anshumansp.com/about',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anshuman Parmar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Anshuman Parmar',
    description: 'AI Engineer, Tech Content Creator, and Entrepreneur building real products.',
    images: ['/og-image.jpg'],
  },
}

export default function AboutPage() {
  return <AboutContent />
}
