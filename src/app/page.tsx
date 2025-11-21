"use client";

import { useState } from "react";
import Header from "@/components/header/Header";
import ScrollProgressBar from "@/components/navigation/ScrollProgressBar";
import SectionDotsNav from "@/components/navigation/SectionDotsNav";
import Hero from "@/components/hero/Hero";
import ValuesSection from "@/components/portfolio/ValuesSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import PricingSection from "@/components/pricing/PricingSection";
import FAQSection from "@/components/faq/FAQSection";
import ContactSection from "@/components/contact/ContactSection";
import FloatingCTA from "@/components/shared/FloatingCTA";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import ProjectRequestModal from "@/components/shared/ProjectRequestModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectRequest = () => {
    setIsModalOpen(true);
  };

  const handleViewPortfolio = () => {
    const portfolio = document.getElementById("portfolio");
    if (portfolio) {
      const offset = 100;
      const elementPosition = portfolio.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="relative">
      <Header onProjectRequest={handleProjectRequest} />
      <ScrollProgressBar />
      <SectionDotsNav />
      <Hero
        onProjectRequest={handleProjectRequest}
        onViewPortfolio={handleViewPortfolio}
      />
      <ValuesSection />
      <PortfolioSection onProjectRequest={handleProjectRequest} />
      <PricingSection onProjectRequest={handleProjectRequest} />
      <FAQSection onProjectRequest={handleProjectRequest} />
      <ContactSection />
      <FloatingCTA onClick={handleProjectRequest} />
      <ScrollToTopButton />
      <ProjectRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <span className="text-white font-bold">آ</span>
            </div>
            <span className="font-bold">آریو استودیو</span>
          </div>
          <p className="text-slate-500 text-sm">
            استودیوی دیجیتال و هوش مصنوعی
          </p>
          <p className="text-slate-600 text-xs mt-4">
            © {new Date().getFullYear()} آریو استودیو. تمام حقوق محفوظ است.
          </p>
        </div>
      </footer>
    </main>
  );
}
