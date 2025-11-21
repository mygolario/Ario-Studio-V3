"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "../shared/MagneticButton";
import { PortfolioProject } from "@/lib/content/fa";

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onProjectRequest: () => void;
}

export default function CaseStudyModal({
  project,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onProjectRequest,
}: CaseStudyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project || !isOpen) return null;

  const images = project.images || [project.image];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 end-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            ✕
          </button>

          {/* Image Carousel */}
          <div className="relative h-96 bg-slate-800 rounded-t-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={images[currentImageIndex]}
                alt={project.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/800x600/1e293b/94a3b8?text=" +
                    encodeURIComponent(project.name);
                }}
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(
                      (prev) => (prev - 1 + images.length) % images.length
                    );
                  }}
                  className="absolute start-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-brand-500 transition-colors"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev + 1) % images.length);
                  }}
                  className="absolute end-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-brand-500 transition-colors"
                >
                  ›
                </button>
              </>
            )}

            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 start-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? "bg-brand-500 w-8"
                        : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-slate-300 mb-6 leading-relaxed">
              {project.longDescription}
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">نتایج پروژه</h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <span className="text-brand-500 mt-1">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="border-t border-slate-700 pt-6 mt-6">
              <p className="text-slate-400 mb-4 text-center">
                می‌خوای پروژه‌ای شبیه این داشته باشی؟
              </p>
              <div className="flex gap-4">
                <MagneticButton
                  onClick={(e) => {
                    e?.stopPropagation();
                    onProjectRequest();
                  }}
                  variant="primary"
                  className="flex-1"
                >
                  درخواست پروژه
                </MagneticButton>
              </div>
            </div>

            {/* Project Navigation */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                  setCurrentImageIndex(0);
                }}
                className="px-4 py-2 rounded-lg glass text-slate-300 hover:text-brand-400 transition-colors"
              >
                ← پروژه قبلی
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                  setCurrentImageIndex(0);
                }}
                className="px-4 py-2 rounded-lg glass text-slate-300 hover:text-brand-400 transition-colors"
              >
                پروژه بعدی →
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

