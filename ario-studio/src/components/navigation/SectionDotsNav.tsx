"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
      const scrollPosition = window.scrollY + 200;

      // Check sections in reverse order to get the topmost visible section
      const reversedSections = [...sections].reverse();
      for (const section of reversedSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
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
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed end-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative"
            aria-label={section.label}
          >
            <motion.div
              className={`w-3 h-3 rounded-full transition-all ${
                activeSection === section.id
                  ? "bg-brand-500 scale-125"
                  : "bg-slate-600 group-hover:bg-slate-500"
              }`}
              whileHover={{ scale: 1.3 }}
            />
            <span
              className={`absolute end-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm transition-opacity ${
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
    </div>
  );
}

