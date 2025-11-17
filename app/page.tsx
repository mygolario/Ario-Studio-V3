import Header from '@/components/Header'
import Hero from '@/components/Hero'
import DesignEthos from '@/components/DesignEthos'
import TrustGuarantees from '@/components/TrustGuarantees'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <DesignEthos />
      <TrustGuarantees />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}

