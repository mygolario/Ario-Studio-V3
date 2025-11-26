"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("home.about");

  return (
    <Section id="about" className="bg-page-elevated">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-main leading-tight">
              {t.rich("title", {
                highlight: (chunks) => <span className="text-accent-purple">{chunks}</span>
              })}
            </h2>
            <div className="space-y-6 text-lg text-text-muted-custom leading-relaxed">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>
          </motion.div>

          {/* Right: Lists */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-xl font-bold text-text-main mb-6">{t("howWeWork.title")}</h3>
              <ul className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-text-muted-custom">
                    <div className="mt-1 w-5 h-5 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                      <Check className="w-3 h-3" />
                    </div>
                    {t(`howWeWork.items.${i}`)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-main mb-6">{t("whoWeFit.title")}</h3>
              <ul className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-text-muted-custom">
                    <div className="mt-1 w-5 h-5 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                      <Check className="w-3 h-3" />
                    </div>
                    {t(`whoWeFit.items.${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
