import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import DesignEthos from '@/components/DesignEthos'
import About from '@/components/About'
import StartProjectSection from '@/components/StartProjectSection'
import Footer from '@/components/Footer'
import BetaNotice from '@/components/BetaNotice'
import { getServices, getFeaturedProjects, getProcessSteps, getHighlights } from '@/lib/db'

// Revalidate homepage every 60 seconds
export const revalidate = 60

export default async function Home() {
  // Fetch all data from database
  const [services, featuredProjects, processSteps, highlights] = await Promise.all([
    getServices().catch(() => []),
    getFeaturedProjects().catch(() => []),
    getProcessSteps().catch(() => []),
    getHighlights('about').catch(() => []),
  ])

  // Use featured projects, or fallback to first 3 projects if no featured
  const projects = featuredProjects.length > 0 
    ? featuredProjects.slice(0, 3)
    : []

  return (
    <main className="relative">
      <Header />
      {/* Scene 1: HERO */}
      <Hero />
      {/* Beta Notice (Farsi only) */}
      <BetaNotice />
      {/* Scene 2: WHAT WE DO */}
      <Services services={services} />
      {/* Scene 3: OUR WORK */}
      <Portfolio projects={projects} />
      {/* Scene 4: OUR PROCESS */}
      <DesignEthos processSteps={processSteps} />
      {/* Scene 5: ABOUT ARIO STUDIO */}
      <About highlights={highlights} />
      {/* Scene 6: FINAL CTA */}
      <StartProjectSection />
      <Footer />
    </main>
  )
}

