import type { Metadata } from 'next'
import { Inter, Lora, JetBrains_Mono, Allura } from 'next/font/google'
import '@/styles/globals.css'
import { Navigation } from '@/components/layouts/Navigation'
import { SmoothScroll } from '@/components/layouts/SmoothScroll'
import { Footer } from '@/components/layouts/Footer'

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
  title: 'Anshuman Parmar — AI Architect & Systems Builder',
  description: 'Building the future of AI-driven enterprise solutions. Architecting systems that transform how businesses operate in the AI-first era.',
  keywords: ['AI', 'Machine Learning', 'Enterprise Solutions', 'Cloud Architecture', 'Full Stack Development'],
  authors: [{ name: 'Anshuman Parmar' }],
  creator: 'Anshuman Parmar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anshumansp.com',
    siteName: 'Anshuman Parmar',
    title: 'Anshuman Parmar — AI Architect & Systems Builder',
    description: 'Building the future of AI-driven enterprise solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anshuman Parmar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anshuman Parmar — AI Architect & Systems Builder',
    description: 'Building the future of AI-driven enterprise solutions.',
    images: ['/og-image.jpg'],
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
        <SmoothScroll />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
