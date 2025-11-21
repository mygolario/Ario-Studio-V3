"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import { content } from "@/lib/content/fa";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual API call
    setTimeout(() => {
      console.log("Contact Form:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        contact: "",
        projectType: "",
        budget: "",
        message: "",
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <SectionWrapper id="contact" className="py-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {content.contact.headline}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            {content.contact.subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm text-slate-300">نام</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg glass border border-slate-700 focus:border-brand-500 focus:outline-none"
                placeholder="نام شما"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                ایمیل یا آیدی تلگرام / واتساپ
              </label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg glass border border-slate-700 focus:border-brand-500 focus:outline-none"
                placeholder="example@email.com یا @telegram"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                نوع پروژه
              </label>
              <select
                value={formData.projectType}
                onChange={(e) =>
                  setFormData({ ...formData, projectType: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg glass border border-slate-700 focus:border-brand-500 focus:outline-none"
              >
                <option value="">انتخاب کنید</option>
                <option value="landing">لندینگ پیج</option>
                <option value="website">وبسایت کامل</option>
                <option value="ecommerce">فروشگاه آنلاین</option>
                <option value="saas">پلتفرم SaaS</option>
                <option value="other">سایر</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                بودجه حدودی
              </label>
              <select
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg glass border border-slate-700 focus:border-brand-500 focus:outline-none"
              >
                <option value="">انتخاب کنید</option>
                <option value="20-40">۲۰ تا ۴۰ میلیون تومان</option>
                <option value="40-80">۴۰ تا ۸۰ میلیون تومان</option>
                <option value="80+">بالای ۸۰ میلیون تومان</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                توضیحات (اختیاری)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg glass border border-slate-700 focus:border-brand-500 focus:outline-none resize-none"
                placeholder="هر اطلاعات اضافی که فکر می‌کنید مفید است..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
            </button>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm text-center"
              >
                پیام شما با موفقیت ارسال شد. به زودی با شما تماس می‌گیریم.
              </motion.div>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 border border-slate-800 hover:border-slate-700 transition-colors">
              <h3 className="text-xl font-bold mb-6">راه‌های ارتباطی</h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass border border-slate-700 hover:border-brand-500 transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <div className="font-medium">واتساپ</div>
                    <div className="text-sm text-slate-400">ارسال پیام</div>
                  </div>
                </a>

                <a
                  href="https://t.me/ariostudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass border border-slate-700 hover:border-brand-500 transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✈️</span>
                  </div>
                  <div>
                    <div className="font-medium">تلگرام</div>
                    <div className="text-sm text-slate-400">@ariostudio</div>
                  </div>
                </a>

                <a
                  href="mailto:info@ariostudio.com"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass border border-slate-700 hover:border-brand-500 transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <div className="font-medium">ایمیل</div>
                    <div className="text-sm text-slate-400">
                      info@ariostudio.com
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-colors">
              {content.contact.reassurance.map((text, i) => (
                <div key={i} className="flex items-start gap-3 text-slate-400 text-sm mb-3">
                  <span className="text-brand-400">✓</span>
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

