import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import Capabilities from '@/components/Capabilities'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Philosophy />
      <Capabilities />
      <Portfolio />
      <About />
      <Services />
      <Contact />
      <Footer />
    </main>
  )
}

