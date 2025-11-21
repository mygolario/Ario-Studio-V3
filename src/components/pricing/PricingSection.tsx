"use client";

import { motion } from "framer-motion";
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
    <SectionWrapper id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">پکیج‌های ما</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            راه‌حل‌های متنوع برای نیازهای مختلف کسب‌وکار شما
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 glass border-2 ${
                pkg.popular
                  ? "border-brand-500 scale-105 md:scale-110"
                  : "border-slate-800"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-brand-500 text-white text-sm font-medium">
                  پرفروش‌ترین
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{pkg.description}</p>
                {pkg.price && (
                  <div className="text-brand-400 font-bold text-xl">
                    {pkg.price}
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-brand-400 mt-1">✓</span>
                    <span className="text-sm">{feature}</span>
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
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 overflow-x-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">
              مقایسه پکیج‌ها
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-right p-4">ویژگی</th>
                  <th className="text-center p-4">استارتر</th>
                  <th className="text-center p-4">پروفشنال</th>
                  <th className="text-center p-4">پریمیوم</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800/50">
                  <td className="p-4">تعداد صفحات</td>
                  <td className="text-center p-4">1</td>
                  <td className="text-center p-4">تا 10</td>
                  <td className="text-center p-4">نامحدود</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="p-4">انیمیشن‌ها</td>
                  <td className="text-center p-4">پایه</td>
                  <td className="text-center p-4">پیشرفته</td>
                  <td className="text-center p-4">سفارشی</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="p-4">پشتیبانی</td>
                  <td className="text-center p-4">3 ماه</td>
                  <td className="text-center p-4">6 ماه</td>
                  <td className="text-center p-4">12 ماه</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

