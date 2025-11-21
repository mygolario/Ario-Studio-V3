import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-ario-bg">
      <Header />
      {/* فاصله برای اینکه Hero زیر هدر ثابت قایم نشه */}
      <div className="pt-24 md:pt-28">
        <Hero />
        <Services />
      </div>
    </main>
  );
}
