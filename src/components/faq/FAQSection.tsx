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
    <SectionWrapper id="faq" className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            سوالات متداول
          </h2>
          <p className="text-slate-400 text-lg">
            پاسخ سوالات رایج شما درباره خدمات ما
          </p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {content.faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-lg border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-right flex items-center justify-between hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-medium text-lg">{item.question}</span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  className="w-5 h-5 text-slate-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-300 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center glass rounded-2xl p-8 border border-slate-800"
        >
          <p className="text-slate-300 mb-6 mb-4">
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

