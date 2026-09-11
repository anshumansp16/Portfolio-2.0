import type { Metadata } from 'next'
import { Inter, Lora, JetBrains_Mono, Allura } from 'next/font/google'
import '@/styles/globals.css'
import { Navigation } from '@/components/layouts/Navigation'
import { SmoothScroll } from '@/components/layouts/SmoothScroll'
import { PageTransition } from '@/components/layouts/PageTransition'
import { Footer } from '@/components/layouts/Footer'
import { ChatPopup } from '@/components/ui/ChatPopup'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { Analytics } from '@/components/Analytics'
import { rootJsonLd } from '@/lib/seo'

// Font configurations with display swap for optimal loading
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const allura = Allura({
  subsets: ['latin'],
  variable: '--font-signature',
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Anshuman Parmar — AI Engineer, Content Creator & Entrepreneur',
  description: 'Building AI products, creating tech content with 13.3% CTR, and shipping ideas that reach thousands. Creator of KreatorOS, ScrapeHub, and more.',
  keywords: ['AI Engineer', 'Content Creator', 'Entrepreneur', 'KreatorOS', 'ScrapeHub', 'LegalMind', 'TATVA', 'AI Tools', 'Hindi Tech', 'Anshuman Parmar'],
  metadataBase: new URL('https://anshumansp.com'),
  authors: [{ name: 'Anshuman Parmar', url: 'https://anshumansp.com' }],
  creator: 'Anshuman Parmar',
  alternates: { canonical: 'https://anshumansp.com' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anshumansp.com',
    siteName: 'Anshuman Parmar',
    title: 'Anshuman Parmar — AI Engineer, Content Creator & Entrepreneur',
    description: 'Building AI products, creating tech content with 13.3% CTR, and shipping ideas that reach thousands.',
    images: [
      {
        url: '/images/assets/anshuman-portrait.png',
        width: 1200,
        height: 630,
        alt: 'Anshuman Parmar — AI Engineer, Content Creator & Entrepreneur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anshuman Parmar — AI Engineer, Content Creator & Entrepreneur',
    description: 'Building AI products, creating tech content with 13.3% CTR, and shipping ideas that reach thousands.',
    images: ['/images/assets/anshuman-portrait.png'],
    creator: '@anshumansp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Fill these in once you create the properties in Google Search Console
  // and Bing Webmaster Tools — each gives you a verification token/meta tag.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable} ${allura.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd()) }}
        />
        <SmoothScroll />
        <CursorGlow />
        <Navigation />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
        <ChatPopup />
        <Analytics />
      </body>
    </html>
  )
}
