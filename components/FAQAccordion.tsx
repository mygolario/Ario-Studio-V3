'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  lang: 'fa' | 'en'
}

export default function FAQAccordion({ items, lang }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isRTL = lang === 'fa'

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={index}
            className="bg-surface border border-border-subtle rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left rtl:text-right transition-colors hover:bg-surface-alt ${
                isOpen ? 'bg-surface-alt' : ''
              }`}
            >
              <span className="text-h5 font-semibold text-text-primary pr-4 rtl:pr-0 rtl:pl-4">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                className={`text-text-secondary flex-shrink-0 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                } ${isRTL ? 'rtl:rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className={`px-6 py-4 pt-0 ${isRTL ? 'rtl' : ''}`}>
                    <p className="text-body text-text-secondary leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

