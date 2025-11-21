"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

interface ProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectTypes = [
  { id: "landing", label: "لندینگ پیج", icon: "📄" },
  { id: "website", label: "وبسایت کامل", icon: "🌐" },
  { id: "ecommerce", label: "فروشگاه آنلاین", icon: "🛒" },
  { id: "saas", label: "پلتفرم SaaS", icon: "💼" },
  { id: "brand", label: "برندینگ", icon: "🎨" },
  { id: "other", label: "سایر", icon: "✨" },
];

const budgetRanges = [
  { id: "20-40", label: "۲۰ تا ۴۰ میلیون تومان" },
  { id: "40-80", label: "۴۰ تا ۸۰ میلیون تومان" },
  { id: "80+", label: "بالای ۸۰ میلیون تومان" },
];

const timelineOptions = [
  { id: "urgent", label: "فوری (کمتر از ۲ هفته)" },
  { id: "normal", label: "عادی (۲ تا ۴ هفته)" },
  { id: "flexible", label: "انعطاف‌پذیر (بیش از ۴ هفته)" },
];

export default function ProjectRequestModal({
  isOpen,
  onClose,
}: ProjectRequestModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    projectType: "",
    budget: "",
    timeline: "",
    comment: "",
  });

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("projectRequest");
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      localStorage.setItem("projectRequest", JSON.stringify(formData));
    }
  }, [formData, isOpen]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Project Request:", formData);
    localStorage.removeItem("projectRequest");
    setStep(5); // Success step
    setTimeout(() => {
      onClose();
      setStep(1);
      setFormData({
        name: "",
        contact: "",
        projectType: "",
        budget: "",
        timeline: "",
        comment: "",
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Progress Indicator */}
          {step < 5 && (
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    s <= step ? "bg-brand-500" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Step 1: Name & Contact */}
          {step === 1 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">اطلاعات تماس</h2>
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
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
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg glass border border-slate-700 focus:border-brand-500 focus:outline-none"
                  placeholder="example@email.com یا @telegram"
                />
              </div>
              <button
                onClick={handleNext}
                disabled={!formData.name || !formData.contact}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ادامه
              </button>
            </motion.div>
          )}

          {/* Step 2: Project Type */}
          {step === 2 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">نوع پروژه</h2>
              <div className="grid grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() =>
                      setFormData({ ...formData, projectType: type.id })
                    }
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.projectType === type.id
                        ? "border-brand-500 bg-brand-500/10"
                        : "border-slate-700 glass hover:border-slate-600"
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg glass border border-slate-700"
                >
                  بازگشت
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.projectType}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium disabled:opacity-50"
                >
                  ادامه
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">بودجه حدودی</h2>
              <div className="space-y-3">
                {budgetRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() =>
                      setFormData({ ...formData, budget: range.id })
                    }
                    className={`w-full p-4 rounded-lg border-2 text-start transition-all ${
                      formData.budget === range.id
                        ? "border-brand-500 bg-brand-500/10"
                        : "border-slate-700 glass hover:border-slate-600"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg glass border border-slate-700"
                >
                  بازگشت
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.budget}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium disabled:opacity-50"
                >
                  ادامه
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Timeline & Comment */}
          {step === 4 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">زمان‌بندی و توضیحات</h2>
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  زمان‌بندی پروژه
                </label>
                <div className="space-y-3">
                  {timelineOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        setFormData({ ...formData, timeline: option.id })
                      }
                      className={`w-full p-4 rounded-lg border-2 text-start transition-all ${
                        formData.timeline === option.id
                          ? "border-brand-500 bg-brand-500/10"
                          : "border-slate-700 glass hover:border-slate-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  توضیحات اضافی (اختیاری)
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg glass border border-slate-700 focus:border-brand-500 focus:outline-none resize-none"
                  placeholder="هر اطلاعات اضافی که فکر می‌کنید مفید است..."
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg glass border border-slate-700"
                >
                  بازگشت
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.timeline}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium disabled:opacity-50"
                >
                  ارسال درخواست
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-brand-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">
                درخواست شما ثبت شد
              </h2>
              <p className="text-slate-300">
                حداکثر تا ۲۴ ساعت آینده با شما تماس می‌گیریم.
              </p>
            </motion.div>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 rounded-full glass border border-slate-700 flex items-center justify-center hover:border-slate-600 transition-colors"
            aria-label="بستن"
          >
            ×
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

