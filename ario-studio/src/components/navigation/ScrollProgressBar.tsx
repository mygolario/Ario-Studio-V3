"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 start-0 w-full h-1 z-[100] bg-slate-900/50">
      <motion.div
        className="h-full bg-gradient-to-r from-brand-500 to-brand-600"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

