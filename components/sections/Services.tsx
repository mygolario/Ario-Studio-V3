"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useTranslations } from "next-intl";

export function Services() {
  const t = useTranslations("home.services");

  const services = [
    {
      id: "01",
      title: t("items.01.title"),
      subtitle: t("items.01.subtitle"),
      description: t("items.01.description"),
      color: "bg-accent-purple",
    },
    {
      id: "02",
      title: t("items.02.title"),
      subtitle: t("items.02.subtitle"),
      description: t("items.02.description"),
      color: "bg-accent-blue",
    },
    {
      id: "03",
      title: t("items.03.title"),
      subtitle: t("items.03.subtitle"),
      description: t("items.03.description"),
      color: "bg-pink-500",
    },
  ];

  return (
    <Section id="services" className="bg-page-elevated">
      <Container>
        <div className="mb-16 md:mb-24">
          <h2
            className="text-3xl md:text-4xl font-bold text-text-main mb-4"
          >
            {t("title")}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full" />
        </div>

        <div className="space-y-0">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative border-t border-border-subtle py-8 sm:py-12 md:py-16 transition-colors hover:bg-surface-hover"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                <div className="md:col-span-2 flex items-center gap-4">
                  <span className="text-sm font-mono text-text-muted-custom group-hover:text-text-main transition-colors">
                    {service.id}
                  </span>
                  <div
                    className={`h-px w-12 ${service.color} opacity-50 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_currentColor]`}
                  />
                </div>

                <div className="md:col-span-5">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-main mb-2 group-hover:translate-x-0 sm:group-hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <span className="text-sm text-accent-purple/80 font-medium uppercase tracking-wider">
                    {service.subtitle}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <p className="text-text-muted-custom text-base sm:text-lg leading-relaxed group-hover:text-text-main transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-border-subtle" />
        </div>
      </Container>
    </Section>
  );
}
