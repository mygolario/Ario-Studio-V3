"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const t = useTranslations("contact.page");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    // Step 1
    projectType: "",
    businessName: "",
    currentWebsite: "",
    // Step 2
    primaryGoal: "",
    projectSummary: "",
    timeline: "",
    // Step 3
    budgetRange: "",
    fullName: "",
    email: "",
    socialLink: "",
    extraNotes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    if (step === 1) {
      return !!formData.projectType;
    }
    if (step === 2) {
      return !!formData.primaryGoal && !!formData.projectSummary;
    }
    if (step === 3) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !!formData.budgetRange && !!formData.fullName && emailRegex.test(formData.email);
    }
    return false;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t("form.error"));
      }

      setStatus("success");
      // Don't reset form immediately so user can see what they sent if needed, 
      // or we just show success state.
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t("form.error"));
    }
  };

  return (
    <div className="pt-20 min-h-screen flex flex-col justify-center">
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left Side: Intro & Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 sm:space-y-8 lg:sticky lg:top-32"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-text-main tracking-tight">
                {t("title.prefix")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
                  {t("title.highlight")}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-text-muted-custom max-w-md leading-relaxed">
                {t("description")}
              </p>

              <div className="space-y-4 pt-8 border-t border-border-subtle">
                <div className="flex flex-col">
                  <span className="text-sm text-text-muted-custom mb-1">
                    {t("emailMeta")}
                  </span>
                  <a
                    href="mailto:info@ariostudio.net"
                    className="text-2xl text-text-main hover:text-accent-purple transition-colors"
                  >
                    info@ariostudio.net
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Multi-step Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card-glass backdrop-blur-xl border border-border-subtle p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative overflow-hidden"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-6 min-h-[400px]">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-text-main">
                    {t("form.success.title")}
                  </h3>
                  <p className="text-text-muted-custom max-w-xs mx-auto">
                    {t("form.success.description")}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                        setStatus("idle");
                        setCurrentStep(1);
                        setFormData({
                            projectType: "",
                            businessName: "",
                            currentWebsite: "",
                            primaryGoal: "",
                            projectSummary: "",
                            timeline: "",
                            budgetRange: "",
                            fullName: "",
                            email: "",
                            socialLink: "",
                            extraNotes: "",
                        });
                    }}
                    className="mt-4"
                  >
                    {t("form.success.another")}
                  </Button>
                </div>
              ) : (
                <>
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            step === currentStep
                              ? "w-8 bg-accent-purple"
                              : step < currentStep
                              ? "w-8 bg-accent-purple/50"
                              : "w-2 bg-border-subtle"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-text-muted-custom">
                      {t(`steps.${currentStep}`)}
                    </span>
                  </div>

                  <div className="min-h-[400px] flex flex-col">
                    <AnimatePresence mode="wait">
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6 flex-1"
                        >
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-main">
                              {t("form.fields.projectType.label")} <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                              {Object.keys(t.raw("form.fields.projectType.options")).map((optionKey) => (
                                <button
                                  key={optionKey}
                                  type="button"
                                  onClick={() => handleInputChange("projectType", optionKey)}
                                  className={cn(
                                    "p-3 rounded-xl border text-sm text-start transition-all",
                                    formData.projectType === optionKey
                                      ? "border-accent-purple bg-accent-purple/10 text-text-main"
                                      : "border-border-subtle bg-page-elevated text-text-muted-custom hover:border-accent-purple/50"
                                  )}
                                >
                                  {t(`form.fields.projectType.options.${optionKey}`)}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-main">
                              {t("form.fields.businessName.label")}
                            </label>
                            <input
                              type="text"
                              value={formData.businessName}
                              onChange={(e) => handleInputChange("businessName", e.target.value)}
                              className="w-full bg-page-elevated border border-border-subtle rounded-xl px-4 py-3 text-text-main placeholder:text-text-muted-custom/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all"
                              placeholder={t("form.fields.businessName.placeholder")}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-main">
                              {t("form.fields.currentWebsite.label")}
                            </label>
                            <input
                              type="url"
                              value={formData.currentWebsite}
                              onChange={(e) => handleInputChange("currentWebsite", e.target.value)}
                              className="w-full bg-page-elevated border border-border-subtle rounded-xl px-4 py-3 text-text-main placeholder:text-text-muted-custom/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all"
                              placeholder={t("form.fields.currentWebsite.placeholder")}
                            />
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6 flex-1"
                        >
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-main">
                              {t("form.fields.primaryGoal.label")} <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={formData.primaryGoal}
                              onChange={(e) => handleInputChange("primaryGoal", e.target.value)}
                              className="w-full bg-page-elevated border border-border-subtle rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all appearance-none"
                            >
                              <option value="" disabled>{t("form.fields.primaryGoal.placeholder")}</option>
                              {Object.keys(t.raw("form.fields.primaryGoal.options")).map((optionKey) => (
                                <option key={optionKey} value={optionKey}>
                                  {t(`form.fields.primaryGoal.options.${optionKey}`)}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-main">
                              {t("form.fields.projectSummary.label")} <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={4}
                              value={formData.projectSummary}
                              onChange={(e) => handleInputChange("projectSummary", e.target.value)}
                              className="w-full bg-page-elevated border border-border-subtle rounded-xl px-4 py-3 text-text-main placeholder:text-text-muted-custom/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all resize-none"
                              placeholder={t("form.fields.projectSummary.placeholder")}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-main">
                              {t("form.fields.timeline.label")}
                            </label>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                              {Object.keys(t.raw("form.fields.timeline.options")).map((optionKey) => (
                                <button
                                  key={optionKey}
                                  type="button"
                                  onClick={() => handleInputChange("timeline", optionKey)}
                                  className={cn(
                                    "p-3 rounded-xl border text-sm transition-all",
                                    formData.timeline === optionKey
                                      ? "border-accent-purple bg-accent-purple/10 text-text-main"
                                      : "border-border-subtle bg-page-elevated text-text-muted-custom hover:border-accent-purple/50"
                                  )}
                                >
                                  {t(`form.fields.timeline.options.${optionKey}`)}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6 flex-1"
                        >
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-main">
                              {t("form.fields.budgetRange.label")} <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-3">
                              {Object.keys(t.raw("form.fields.budgetRange.options")).map((optionKey) => (
                                <button
                                  key={optionKey}
                                  type="button"
                                  onClick={() => handleInputChange("budgetRange", optionKey)}
                                  className={cn(
                                    "p-3 rounded-xl border text-sm text-start transition-all",
                                    formData.budgetRange === optionKey
                                      ? "border-accent-purple bg-accent-purple/10 text-text-main"
                                      : "border-border-subtle bg-page-elevated text-text-muted-custom hover:border-accent-purple/50"
                                  )}
                                >
                                  {t(`form.fields.budgetRange.options.${optionKey}`)}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-text-main">
                                {t("form.fields.fullName.label")} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange("fullName", e.target.value)}
                                className="w-full bg-page-elevated border border-border-subtle rounded-xl px-4 py-3 text-text-main placeholder:text-text-muted-custom/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all"
                                placeholder={t("form.fields.fullName.placeholder")}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-text-main">
                                {t("form.fields.email.label")} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="w-full bg-page-elevated border border-border-subtle rounded-xl px-4 py-3 text-text-main placeholder:text-text-muted-custom/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all"
                                placeholder={t("form.fields.email.placeholder")}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-main">
                              {t("form.fields.socialLink.label")}
                            </label>
                            <input
                              type="url"
                              value={formData.socialLink}
                              onChange={(e) => handleInputChange("socialLink", e.target.value)}
                              className="w-full bg-page-elevated border border-border-subtle rounded-xl px-4 py-3 text-text-main placeholder:text-text-muted-custom/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all"
                              placeholder={t("form.fields.socialLink.placeholder")}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-main">
                              {t("form.fields.extraNotes.label")}
                            </label>
                            <textarea
                              rows={2}
                              value={formData.extraNotes}
                              onChange={(e) => handleInputChange("extraNotes", e.target.value)}
                              className="w-full bg-page-elevated border border-border-subtle rounded-xl px-4 py-3 text-text-main placeholder:text-text-muted-custom/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all resize-none"
                              placeholder={t("form.fields.extraNotes.placeholder")}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg mt-4">
                        <AlertCircle className="w-4 h-4" />
                        {errorMessage}
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border-subtle">
                      {currentStep > 1 ? (
                        <Button
                          variant="outline"
                          onClick={handleBack}
                          disabled={status === "loading"}
                          className="text-text-muted-custom hover:text-text-main w-full sm:w-auto min-h-[44px]"
                        >
                          {isRtl ? <ChevronRight className="w-4 h-4 ml-2" /> : <ChevronLeft className="w-4 h-4 mr-2" />}
                          {t("form.back")}
                        </Button>
                      ) : (
                        <div />
                      )}

                      {currentStep < 3 ? (
                        <Button
                          variant="glow"
                          onClick={handleNext}
                          disabled={!validateStep(currentStep)}
                          className="w-full sm:w-auto min-h-[44px]"
                        >
                          {t("form.next")}
                          {isRtl ? <ChevronLeft className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
                        </Button>
                      ) : (
                        <Button
                          variant="glow"
                          onClick={handleSubmit}
                          disabled={!validateStep(3) || status === "loading"}
                          className="w-full sm:w-auto min-h-[44px]"
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              {t("form.sending")}
                            </>
                          ) : (
                            t("form.submit")
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
