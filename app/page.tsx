import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import DesignEthos from '@/components/DesignEthos'
import About from '@/components/About'
import StartProjectSection from '@/components/StartProjectSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Header />
      {/* Scene 1: HERO */}
      <Hero />
      {/* Scene 2: WHAT WE DO */}
      <Services />
      {/* Scene 3: OUR WORK */}
      <Portfolio />
      {/* Scene 4: OUR PROCESS */}
      <DesignEthos />
      {/* Scene 5: ABOUT ARIO STUDIO */}
      <About />
      {/* Scene 6: FINAL CTA */}
      <StartProjectSection />
      <Footer />
    </main>
  )
}

