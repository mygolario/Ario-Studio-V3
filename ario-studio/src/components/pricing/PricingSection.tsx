"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import MagneticButton from "../shared/MagneticButton";
import { content } from "@/lib/content/fa";

interface PricingSectionProps {
  onProjectRequest: () => void;
}

export default function PricingSection({
  onProjectRequest,
}: PricingSectionProps) {
  return (
    <SectionWrapper id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          پکیج‌های ما
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {content.packages.map((pkg, idx) => (
            <PricingCard
              key={pkg.id}
              pkg={pkg}
              index={idx}
              onProjectRequest={onProjectRequest}
            />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            مقایسه پکیج‌ها
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-start py-4">ویژگی</th>
                  <th className="text-center py-4">استارتر</th>
                  <th className="text-center py-4">پروفشنال</th>
                  <th className="text-center py-4">پریمیوم</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="py-4">تعداد صفحات</td>
                  <td className="text-center py-4">۱ صفحه</td>
                  <td className="text-center py-4">تا ۱۰ صفحه</td>
                  <td className="text-center py-4">نامحدود</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4">انیمیشن‌ها</td>
                  <td className="text-center py-4">پایه</td>
                  <td className="text-center py-4">پیشرفته</td>
                  <td className="text-center py-4">سفارشی</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4">CMS</td>
                  <td className="text-center py-4">—</td>
                  <td className="text-center py-4">✓</td>
                  <td className="text-center py-4">✓</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4">پشتیبانی</td>
                  <td className="text-center py-4">۳ ماه</td>
                  <td className="text-center py-4">۶ ماه</td>
                  <td className="text-center py-4">۱۲ ماه</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Snippet */}
        <div className="mt-16 glass rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">سوالات متداول درباره قیمت</h3>
          <div className="space-y-6">
            {content.faq
              .filter((faq) =>
                faq.question.includes("قیمت") ||
                faq.question.includes("پرداخت") ||
                faq.question.includes("بودجه")
              )
              .slice(0, 3)
              .map((faq, idx) => (
                <div key={idx}>
                  <h4 className="font-bold mb-2 text-brand-300">{faq.question}</h4>
                  <p className="text-slate-400 text-sm">{faq.answer}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function PricingCard({
  pkg,
  index,
  onProjectRequest,
}: {
  pkg: typeof content.packages[0];
  index: number;
  onProjectRequest: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`glass rounded-2xl p-8 relative ${
        pkg.popular
          ? "border-2 border-brand-500 scale-105 md:scale-110"
          : "border border-slate-700"
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 start-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-500 text-white text-sm font-bold">
          پرفروش‌ترین
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
        <p className="text-slate-400 text-sm mb-4">{pkg.description}</p>
        <div className="text-3xl font-bold text-brand-400">{pkg.price}</div>
      </div>

      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
            <span className="text-brand-500 mt-1">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <MagneticButton
        onClick={onProjectRequest}
        variant={pkg.popular ? "primary" : "secondary"}
        className="w-full"
      >
        درخواست همین پکیج
      </MagneticButton>
    </motion.div>
  );
}

