import { Hero } from './_components/Hero'
import { TechMarquee } from './_components/TechMarquee'
import { FeaturedProject } from './_components/FeaturedProject'
import { Metrics } from './_components/Metrics'
import { SelectedSystems } from './_components/SelectedSystems'
import { MediaKit } from './_components/MediaKit'
import { TechStack } from './_components/TechStack'
import { Testimonials } from './_components/Testimonials'
import { ConnectCTA } from './_components/ConnectCTA'

export default function HomePage() {
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
      <ConnectCTA />
    </main>
  )
}
