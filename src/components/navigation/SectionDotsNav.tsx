"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const sections = [
  { id: "hero", label: "خانه" },
  { id: "portfolio", label: "نمونه‌کارها" },
  { id: "pricing", label: "پکیج‌ها" },
  { id: "faq", label: "سوالات" },
  { id: "contact", label: "تماس" },
];

export default function SectionDotsNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="hidden lg:flex fixed right-6 xl:right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 xl:gap-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center"
          aria-label={section.label}
        >
          <motion.div
            className={`w-3 h-3 rounded-full transition-all ${
              activeSection === section.id
                ? "bg-brand-500 scale-125"
                : "bg-slate-600 hover:bg-slate-500"
            }`}
            whileHover={{ scale: 1.3 }}
          />
          <span
            className={`absolute right-6 whitespace-nowrap text-sm transition-opacity ${
              activeSection === section.id
                ? "opacity-100 text-brand-400"
                : "opacity-0 group-hover:opacity-100 text-slate-400"
            }`}
          >
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
}

