"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import PortfolioFilters from "./PortfolioFilters";
import CaseStudyModal from "./CaseStudyModal";
import { content, PortfolioProject } from "@/lib/content/fa";

export default function PortfolioSection({
  onProjectRequest,
}: {
  onProjectRequest: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects =
    activeFilter === "all"
      ? content.portfolioProjects
      : content.portfolioProjects.filter((p) =>
          p.tags.some((tag) => tag === activeFilter)
        );

  const openModal = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const nextProject = () => {
    if (!selectedProject) return;
    const currentIndex = content.portfolioProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const nextIndex = (currentIndex + 1) % content.portfolioProjects.length;
    setSelectedProject(content.portfolioProjects[nextIndex]);
  };

  const prevProject = () => {
    if (!selectedProject) return;
    const currentIndex = content.portfolioProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const prevIndex =
      (currentIndex - 1 + content.portfolioProjects.length) %
      content.portfolioProjects.length;
    setSelectedProject(content.portfolioProjects[prevIndex]);
  };

  return (
    <>
      <SectionWrapper id="portfolio" className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            نمونه‌کارهای ما
          </motion.h2>

          <PortfolioFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onClick={() => openModal(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </SectionWrapper>

      <CaseStudyModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={nextProject}
        onPrev={prevProject}
        onProjectRequest={onProjectRequest}
      />
    </>
  );
}

function PortfolioCard({
  project,
  index,
  onClick,
}: {
  project: PortfolioProject;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="glass rounded-2xl overflow-hidden cursor-pointer group relative"
    >
      {/* Image */}
      <div className="relative h-64 bg-slate-800 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/600x400/1e293b/94a3b8?text=" +
              encodeURIComponent(project.name);
          }}
        />

        {/* Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 20 }}
                className="text-center"
              >
                <p className="text-brand-400 font-bold mb-4 text-lg">
                  {project.shortResult}
                </p>
                <ul className="text-sm text-slate-300 mb-6 space-y-2">
                  {project.highlights.slice(0, 2).map((highlight, idx) => (
                    <li key={idx}>• {highlight}</li>
                  ))}
                </ul>
                <button className="px-6 py-2 rounded-full bg-brand-500 text-white hover:bg-brand-400 transition-colors">
                  مشاهده جزئیات
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded text-xs bg-brand-500/20 text-brand-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

