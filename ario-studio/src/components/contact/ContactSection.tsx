"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import MagneticButton from "../shared/MagneticButton";
import { content } from "@/lib/content/fa";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    projectType: "",
    budget: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Contact Form:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        contact: "",
        projectType: "",
        budget: "",
        description: "",
      });
    }, 5000);
  };

  return (
    <SectionWrapper id="contact" className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {content.contact.headline}
          </h2>
          <p className="text-slate-400 text-lg">
            {content.contact.subtext}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm font-medium">
                {content.contact.form.name}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-brand-500 focus:outline-none"
                placeholder="نام شما"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                {content.contact.form.contact}
              </label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-brand-500 focus:outline-none"
                placeholder="example@email.com یا @telegram"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                {content.contact.form.projectType}
              </label>
              <select
                required
                value={formData.projectType}
                onChange={(e) =>
                  setFormData({ ...formData, projectType: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-brand-500 focus:outline-none"
              >
                <option value="">انتخاب کنید</option>
                <option value="landing">لندینگ پیج</option>
                <option value="website">وب‌سایت کامل</option>
                <option value="ecommerce">فروشگاه آنلاین</option>
                <option value="saas">پلتفرم SaaS</option>
                <option value="brand">برندینگ</option>
                <option value="other">سایر</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                {content.contact.form.budget}
              </label>
              <select
                required
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-brand-500 focus:outline-none"
              >
                <option value="">انتخاب کنید</option>
                <option value="under-20">زیر ۲۰ میلیون</option>
                <option value="20-40">۲۰-۴۰ میلیون</option>
                <option value="40-80">۴۰-۸۰ میلیون</option>
                <option value="80-150">۸۰-۱۵۰ میلیون</option>
                <option value="over-150">بالای ۱۵۰ میلیون</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                {content.contact.form.description}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-brand-500 focus:outline-none"
                placeholder="توضیحات پروژه..."
              />
            </div>

            <MagneticButton
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting || isSubmitted}
            >
              {isSubmitting
                ? "در حال ارسال..."
                : isSubmitted
                ? "✓ ارسال شد"
                : content.contact.form.submit}
            </MagneticButton>
          </motion.form>

          {/* Alternative Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">راه‌های دیگر تماس</h3>

            <div className="space-y-4">
              <a
                href="https://wa.me/989123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  💬
                </div>
                <div>
                  <div className="font-bold">{content.contact.alternatives.whatsapp}</div>
                  <div className="text-sm text-slate-400">مستقیماً در واتساپ</div>
                </div>
              </a>

              <a
                href="https://t.me/ariostudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ✈️
                </div>
                <div>
                  <div className="font-bold">{content.contact.alternatives.telegram}</div>
                  <div className="text-sm text-slate-400">کانال تلگرام ما</div>
                </div>
              </a>

              <a
                href="mailto:info@ariostudio.com"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ✉️
                </div>
                <div>
                  <div className="font-bold">{content.contact.alternatives.email}</div>
                  <div className="text-sm text-slate-400">info@ariostudio.com</div>
                </div>
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700 space-y-2 text-sm text-slate-400">
              {content.contact.reassurance.map((text, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-brand-500">✓</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

