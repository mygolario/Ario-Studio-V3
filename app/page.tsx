import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ario-bg">
      <Header />
      <div className="pt-24 md:pt-28">
        <Hero />
        <Services />
        <Process />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
