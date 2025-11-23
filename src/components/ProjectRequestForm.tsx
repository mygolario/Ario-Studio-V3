'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  fullName: string;
  brandName: string;
  email: string;
  phone: string;
  projectTypes: string[];
  budget: string;
  deadline: string;
  details: string;
}

export default function ProjectRequestForm({ lang }: { lang: 'en' | 'fa' }) {
  const isFa = lang === 'fa';
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    brandName: '',
    email: '',
    phone: '',
    projectTypes: [],
    budget: '',
    deadline: '',
    details: ''
  });

  const updateData = (key: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleProjectType = (type: string) => {
    setFormData(prev => {
      const types = prev.projectTypes.includes(type)
        ? prev.projectTypes.filter(t => t !== type)
        : [...prev.projectTypes, type];
      return { ...prev, projectTypes: types };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/project-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang }),
      });
      
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const labels = {
    step1: {
      title: isFa ? "اطلاعات پایه" : "Basic Info",
      name: isFa ? "نام کامل" : "Full Name",
      brand: isFa ? "نام برند / شرکت" : "Brand / Company Name",
      email: isFa ? "ایمیل کاری" : "Work Email",
      phone: isFa ? "شماره تماس (اختیاری)" : "Phone (Optional)",
    },
    step2: {
      title: isFa ? "نوع پروژه" : "Project Type",
      options: isFa 
        ? ["طراحی و توسعه وبسایت", "طراحی UI/UX محصول دیجیتال", "برندسازی (نام، لوگو، هویت بصری)", "اتوماسیون و ادغام هوش مصنوعی", "مشاوره استراتژی دیجیتال"]
        : ["Website design & development", "UI/UX for digital product", "Brand identity (naming, logo, visual system)", "AI automation & integrations", "Digital strategy consultation"]
    },
    step3: {
      title: isFa ? "محدوده و زمان‌بندی" : "Scope & Timeline",
      budget: isFa ? "بودجه تقریبی" : "Approximate Budget",
      budgetOptions: isFa ? ["کم", "متوسط", "زیاد"] : ["Small", "Medium", "Large"],
      deadline: isFa ? "تاریخ شروع / ددلاین ایده‌آل" : "Ideal Start Date / Deadline",
    },
    step4: {
      title: isFa ? "جزئیات پروژه" : "Project Details",
      placeholder: isFa ? "هر چیزی که فکر می‌کنید برای درک بهتر پروژه مهم است اینجا بنویسید." : "Share any context, goals, or links that help us understand your project.",
    },
    step5: {
      title: isFa ? "بازبینی و ارسال" : "Review & Submit",
      confirm: isFa ? "تأیید می‌کنم اطلاعات فوق صحیح است." : "I confirm the information above is accurate.",
      submit: isFa ? "ارسال درخواست" : "Submit Request",
    },
    success: {
      title: isFa ? "درخواست شما ثبت شد." : "Request submitted.",
      message: isFa ? "طی یک تا دو روز کاری با شما تماس می‌گیریم تا جزئیات پروژه را با هم مرور کنیم." : "We’ll get back to you within 1–2 business days to dive deeper into your project.",
      home: isFa ? "بازگشت به خانه" : "Back to Home"
    },
    nav: {
      next: isFa ? "بعدی" : "Next",
      back: isFa ? "قبلی" : "Back"
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl w-full bg-surface p-12 rounded-3xl border border-white/10 text-center space-y-8">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto text-4xl">
          ✓
        </div>
        <h2 className="text-3xl font-bold">{labels.success.title}</h2>
        <p className="text-gray-400 text-lg">{labels.success.message}</p>
        <button 
          onClick={() => router.push(`/${lang}`)}
          className="px-8 py-3 bg-white text-background rounded-full font-bold hover:bg-gray-200 transition-colors"
        >
          {labels.success.home}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full">
      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-12">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-white/10'}`} />
        ))}
      </div>

      <div className="bg-surface p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-8">{labels.step1.title}</h2>
            <input
              type="text"
              placeholder={labels.step1.name}
              value={formData.fullName}
              onChange={e => updateData('fullName', e.target.value)}
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="text"
              placeholder={labels.step1.brand}
              value={formData.brandName}
              onChange={e => updateData('brandName', e.target.value)}
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="email"
              placeholder={labels.step1.email}
              value={formData.email}
              onChange={e => updateData('email', e.target.value)}
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="tel"
              placeholder={labels.step1.phone}
              value={formData.phone}
              onChange={e => updateData('phone', e.target.value)}
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-8">{labels.step2.title}</h2>
            <div className="space-y-3">
              {labels.step2.options.map(opt => (
                <label key={opt} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.projectTypes.includes(opt)}
                    onChange={() => toggleProjectType(opt)}
                    className="w-5 h-5 rounded border-gray-500 text-primary focus:ring-primary"
                  />
                  <span className="text-lg">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-8">{labels.step3.title}</h2>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">{labels.step3.budget}</label>
              <div className="flex gap-4">
                {labels.step3.budgetOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => updateData('budget', opt)}
                    className={`flex-1 py-4 rounded-xl border transition-all ${
                      formData.budget === opt 
                        ? 'bg-primary border-primary text-white' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">{labels.step3.deadline}</label>
              <input
                type="text"
                value={formData.deadline}
                onChange={e => updateData('deadline', e.target.value)}
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-8">{labels.step4.title}</h2>
            <textarea
              rows={6}
              placeholder={labels.step4.placeholder}
              value={formData.details}
              onChange={e => updateData('details', e.target.value)}
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-8">{labels.step5.title}</h2>
            <div className="space-y-4 text-gray-400 bg-background/50 p-6 rounded-xl">
              <p><strong className="text-white">{labels.step1.name}:</strong> {formData.fullName}</p>
              <p><strong className="text-white">{labels.step1.email}:</strong> {formData.email}</p>
              <p><strong className="text-white">{labels.step2.title}:</strong> {formData.projectTypes.join(', ')}</p>
            </div>
            
            <label className="flex items-center gap-4 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-500 text-primary" />
              <span className="text-sm">{labels.step5.confirm}</span>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-12 pt-8 border-t border-white/5">
          {step > 1 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
            >
              {labels.nav.back}
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="px-8 py-3 bg-white text-background rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              {labels.nav.next}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '...' : labels.step5.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
