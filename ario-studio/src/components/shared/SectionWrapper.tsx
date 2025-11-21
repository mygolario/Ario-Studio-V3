"use client";

import { ReactNode, useRef, useEffect } from "react";
import { useInView } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  id,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.classList.add("visible");
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      id={id}
      className={`opacity-0 transition-opacity duration-1000 ${className}`}
    >
      {children}
    </section>
  );
}

