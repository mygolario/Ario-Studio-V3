"use client";

import { useState, useEffect } from "react";
import { useLenisScroll } from "@/hooks/useLenisScroll";
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
import Footer from "@/components/shared/Footer";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useLenisScroll();

  const handleProjectRequest = () => {
    setIsModalOpen(true);
  };

  const handleViewPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen">
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
      <Footer />

      <ProjectRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
