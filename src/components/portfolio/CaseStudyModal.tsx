"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioProject } from "@/lib/content/fa";
import MagneticButton from "../shared/MagneticButton";

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
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass rounded-2xl p-6 sm:p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 rounded-full glass border border-slate-700 flex items-center justify-center hover:border-slate-600 transition-colors"
            aria-label="بستن"
          >
            ×
          </button>

          {/* Image Carousel */}
          <div className="relative mb-8 rounded-lg overflow-hidden">
            <div className="relative h-96 bg-slate-800 flex items-center justify-center">
              <div className="text-slate-500">تصویر پروژه: {project.name}</div>
            </div>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(
                      (prev) => (prev - 1 + images.length) % images.length
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-slate-700 flex items-center justify-center hover:border-brand-500"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev + 1) % images.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-slate-700 flex items-center justify-center hover:border-brand-500"
                >
                  →
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(i);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentImageIndex
                          ? "bg-brand-500 w-6"
                          : "bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-sm">
                  {project.type}
                </span>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full glass text-slate-400 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
              <p className="text-slate-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">نقش آریو استودیو</h3>
              <p className="text-slate-300 leading-relaxed">
                طراحی و توسعه کامل این پروژه با تمرکز بر UX/UI، بهینه‌سازی
                عملکرد و ایجاد تجربه کاربری استثنایی.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">نتایج</h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-brand-400 mt-1">✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <MagneticButton
                onClick={() => {
                  onProjectRequest();
                  onClose();
                }}
                variant="primary"
                className="w-full"
              >
                می‌خوای پروژه‌ای شبیه این داشته باشی؟ → درخواست پروژه
              </MagneticButton>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-800">
            <button
              onClick={onPrev}
              className="px-4 py-2 rounded-lg glass border border-slate-700 hover:border-brand-500 transition-colors"
            >
              ← پروژه قبلی
            </button>
            <button
              onClick={onNext}
              className="px-4 py-2 rounded-lg glass border border-slate-700 hover:border-brand-500 transition-colors"
            >
              پروژه بعدی →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

