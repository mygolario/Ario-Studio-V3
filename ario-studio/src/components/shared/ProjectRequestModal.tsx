"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

interface ProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectTypes = [
  { id: "landing", label: "لندینگ پیج", icon: "📄" },
  { id: "website", label: "وب‌سایت کامل", icon: "🌐" },
  { id: "ecommerce", label: "فروشگاه آنلاین", icon: "🛒" },
  { id: "saas", label: "پلتفرم SaaS", icon: "⚡" },
  { id: "brand", label: "برندینگ", icon: "🎨" },
  { id: "other", label: "سایر", icon: "✨" },
];

const budgetRanges = [
  "زیر ۲۰ میلیون",
  "۲۰-۴۰ میلیون",
  "۴۰-۸۰ میلیون",
  "۸۰-۱۵۰ میلیون",
  "بالای ۱۵۰ میلیون",
];

const timelines = [
  "فوری (کمتر از ۲ هفته)",
  "عادی (۲-۴ هفته)",
  "انعطاف‌پذیر (۴-۸ هفته)",
  "بدون محدودیت زمانی",
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
    localStorage.setItem("projectRequest", JSON.stringify(formData));
  }, [formData]);

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
          className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8"
        >
          {/* Progress Indicator */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  s <= step ? "bg-brand-500" : "bg-slate-700"
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-4">اطلاعات تماس</h2>
              <div>
                <label className="block mb-2 text-sm">نام</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-brand-500 focus:outline-none"
                  placeholder="نام شما"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">
                  ایمیل یا آیدی تلگرام / واتساپ
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-brand-500 focus:outline-none"
                  placeholder="example@email.com یا @telegram"
                />
              </div>
              <div className="flex gap-4">
                <MagneticButton onClick={handleNext} className="flex-1">
                  بعدی
                </MagneticButton>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-4">نوع پروژه</h2>
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
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm">{type.label}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <MagneticButton onClick={handleBack} variant="secondary" className="flex-1">
                  قبلی
                </MagneticButton>
                <MagneticButton
                  onClick={handleNext}
                  className="flex-1"
                  disabled={!formData.projectType}
                >
                  بعدی
                </MagneticButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-4">بودجه حدودی</h2>
              <div className="space-y-3">
                {budgetRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setFormData({ ...formData, budget: range })}
                    className={`w-full p-4 rounded-lg border-2 text-start transition-all ${
                      formData.budget === range
                        ? "border-brand-500 bg-brand-500/10"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <MagneticButton onClick={handleBack} variant="secondary" className="flex-1">
                  قبلی
                </MagneticButton>
                <MagneticButton
                  onClick={handleNext}
                  className="flex-1"
                  disabled={!formData.budget}
                >
                  بعدی
                </MagneticButton>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-4">زمان‌بندی</h2>
              <div className="space-y-3">
                {timelines.map((timeline) => (
                  <button
                    key={timeline}
                    onClick={() =>
                      setFormData({ ...formData, timeline })
                    }
                    className={`w-full p-4 rounded-lg border-2 text-start transition-all ${
                      formData.timeline === timeline
                        ? "border-brand-500 bg-brand-500/10"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    {timeline}
                  </button>
                ))}
              </div>
              <div>
                <label className="block mb-2 text-sm">توضیحات اضافی (اختیاری)</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-brand-500 focus:outline-none"
                  placeholder="هر اطلاعات اضافی که فکر می‌کنید مفید است..."
                />
              </div>
              <div className="flex gap-4">
                <MagneticButton onClick={handleBack} variant="secondary" className="flex-1">
                  قبلی
                </MagneticButton>
                <MagneticButton onClick={handleSubmit} className="flex-1">
                  ارسال درخواست
                </MagneticButton>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold mb-4">درخواست شما ثبت شد</h2>
              <p className="text-slate-400">
                حداکثر تا ۲۴ ساعت آینده با شما تماس می‌گیریم.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

