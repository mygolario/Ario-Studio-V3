"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import MagneticButton from "../shared/MagneticButton";
import { content } from "@/lib/content/fa";

interface FAQSectionProps {
  onProjectRequest: () => void;
}

export default function FAQSection({ onProjectRequest }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq" className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          سوالات متداول
        </motion.h2>

        <div className="space-y-4 mb-12">
          {content.faq.map((faq, idx) => (
            <FAQItem
              key={idx}
              faq={faq}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={() => toggleFAQ(idx)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 text-center"
        >
          <p className="text-slate-300 mb-6">
            اگر هنوز سوالی دارید، همین حالا درخواست پروژه بفرستید – در کمتر از
            ۲۴ ساعت پاسخ می‌دهیم.
          </p>
          <MagneticButton onClick={onProjectRequest} variant="primary">
            درخواست پروژه
          </MagneticButton>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-start flex items-center justify-between hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-bold text-lg text-slate-200">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-2xl text-brand-400"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-slate-400 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

