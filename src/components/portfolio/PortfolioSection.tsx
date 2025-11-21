"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import PortfolioFilters from "./PortfolioFilters";
import CaseStudyModal from "./CaseStudyModal";
import { content } from "@/lib/content/fa";
import { PortfolioProject } from "@/lib/content/fa";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioSectionProps {
  onProjectRequest: () => void;
}

export default function PortfolioSection({
  onProjectRequest,
}: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeFilter === "all"
      ? content.portfolioProjects
      : content.portfolioProjects.filter(
          (p) => p.type === activeFilter || p.tags.includes(activeFilter)
        );

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.children;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardsRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (cardsRef.current) {
      const cards = Array.from(cardsRef.current.children);
      gsap.to(cards, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        onComplete: () => {
          gsap.to(cards, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
          });
        },
      });
    }
  };

  const openModal = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const currentIndex = selectedProject
    ? content.portfolioProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0) {
      const nextIndex =
        (currentIndex + 1) % content.portfolioProjects.length;
      setSelectedProject(content.portfolioProjects[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (currentIndex >= 0) {
      const prevIndex =
        (currentIndex - 1 + content.portfolioProjects.length) %
        content.portfolioProjects.length;
      setSelectedProject(content.portfolioProjects[prevIndex]);
    }
  };

  return (
    <SectionWrapper id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            نمونه‌کارهای ما
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            پروژه‌هایی که با دقت و خلاقیت طراحی و توسعه داده‌ایم
          </p>
        </motion.div>

        <PortfolioFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden glass border border-slate-800 cursor-pointer"
              onClick={() => openModal(project)}
            >
              {/* Image Placeholder */}
              <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-slate-600 text-sm">{project.name}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-brand-500/20 text-brand-400 text-xs">
                    {project.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {project.shortResult}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-brand-400 text-sm font-medium">
                    مشاهده جزئیات →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CaseStudyModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={handleNext}
        onPrev={handlePrev}
        onProjectRequest={onProjectRequest}
      />
    </SectionWrapper>
  );
}

