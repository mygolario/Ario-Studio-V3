"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import { content } from "@/lib/content/fa";

export default function ValuesSection() {
  return (
    <SectionWrapper id="values" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          چرا آریو استودیو؟
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.values.map((value, idx) => (
            <ValueCard key={idx} value={value} index={idx} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ValueCard({
  value,
  index,
}: {
  value: { title: string; description: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass rounded-2xl p-6 hover:border-brand-500/50 transition-all cursor-pointer group relative overflow-hidden"
    >
      {/* Geometric background effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-0 start-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-0 w-24 h-24 bg-brand-400/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-3 text-brand-300 group-hover:text-brand-400 transition-colors">
          {value.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {value.description}
        </p>
      </div>
    </motion.div>
  );
}

