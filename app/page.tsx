import Header from '@/components/Header'
import Hero from '@/components/Hero'
import DesignEthos from '@/components/DesignEthos'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <DesignEthos />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}

