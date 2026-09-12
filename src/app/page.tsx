import { Hero } from './_components/Hero'
import { TechMarquee } from './_components/TechMarquee'
import { FeaturedProject } from './_components/FeaturedProject'
import { Metrics } from './_components/Metrics'
import { SelectedSystems } from './_components/SelectedSystems'
import { MediaKit } from './_components/MediaKit'
import { TechStack } from './_components/TechStack'
import { Testimonials } from './_components/Testimonials'
import { LatestInsights } from './_components/LatestInsights'
import { ConnectCTA } from './_components/ConnectCTA'
import { blogPosts } from '@/data/blogs'

export default function HomePage() {
  const latestPosts = blogPosts.slice(0, 3)

  return (
    <main className="relative">
      <Hero />
      <TechMarquee />
      <FeaturedProject />
      <Metrics />
      <SelectedSystems />
      <MediaKit />
      <TechStack />
      <Testimonials />
      <LatestInsights posts={latestPosts} />
      <ConnectCTA />
    </main>
  )
}
