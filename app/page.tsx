import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import DesignEthos from '@/components/DesignEthos'
import About from '@/components/About'
import StartProjectSection from '@/components/StartProjectSection'
import Footer from '@/components/Footer'
import { getServices, getFeaturedProjects, getProcessSteps, getHighlights } from '@/lib/db'

export default async function Home() {
  // Fetch all data from database
  const [services, projects, processSteps, highlights] = await Promise.all([
    getServices().catch(() => []),
    getFeaturedProjects().catch(() => []),
    getProcessSteps().catch(() => []),
    getHighlights('about').catch(() => []),
  ])

  return (
    <main className="relative">
      <Header />
      {/* Scene 1: HERO */}
      <Hero />
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

