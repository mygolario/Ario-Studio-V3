"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Website & Landing Design",
    subtitle: "Visual Excellence",
    description:
      "We craft visually stunning, high-converting landing pages and websites that tell your brand's story with precision and elegance.",
    color: "bg-accent-purple",
  },
  {
    id: "02",
    title: "Brand & Visual System",
    subtitle: "Identity Design",
    description:
      "Complete design systems, logo design, and brand guidelines that ensure consistency and premium positioning across all touchpoints.",
    color: "bg-accent-blue",
  },
  {
    id: "03",
    title: "UX for Real-Life Goals",
    subtitle: "User Experience",
    description:
      "User-centric design that focuses on clarity, usability, and achieving tangible business goals through intuitive interfaces.",
    color: "bg-pink-500",
  },
];

export function Services() {
  return (
    <Section id="services" className="bg-black/50">
      <Container>
        <div className="mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Our Expertise
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full" />
        </div>

        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative border-t border-white/10 py-12 md:py-16 transition-colors hover:bg-white/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-2 flex items-center gap-4">
                  <span className="text-sm font-mono text-white/40 group-hover:text-white/80 transition-colors">
                    {service.id}
                  </span>
                  <div
                    className={`h-px w-12 ${service.color} opacity-50 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_currentColor]`}
                  />
                </div>

                <div className="md:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <span className="text-sm text-accent-purple/80 font-medium uppercase tracking-wider">
                    {service.subtitle}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <p className="text-white/60 text-lg leading-relaxed group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </Container>
    </Section>
  );
}
