"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function About() {
  return (
    <Section id="about" className="bg-white/[0.02]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              A small studio built for <span className="text-accent-purple">focused work</span>.
            </h2>
            <div className="space-y-6 text-lg text-white/60 leading-relaxed">
              <p>
                We don&apos;t believe in factory-line production. Ario Studio was
                founded on the principle that exceptional digital products require
                deep focus, obsession with detail, and a personal touch.
              </p>
              <p>
                Our team is small by design. This allows us to partner closely
                with a select few clients each year, treating their businesses as
                if they were our own. No account managers, no layers of
                bureaucracy—just direct collaboration with the creators.
              </p>
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
              <h3 className="text-xl font-bold text-white mb-6">How we work</h3>
              <ul className="space-y-4">
                {[
                  "Deep dive discovery sessions",
                  "Iterative design & feedback loops",
                  "Pixel-perfect development",
                  "Performance-first engineering",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70">
                    <div className="mt-1 w-5 h-5 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                      <Check className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Who we fit</h3>
              <ul className="space-y-4">
                {[
                  "Early-stage startups needing a strong debut",
                  "Established brands looking for a refresh",
                  "Companies valuing design as a differentiator",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70">
                    <div className="mt-1 w-5 h-5 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                      <Check className="w-3 h-3" />
                    </div>
                    {item}
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
