"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import Link from "next/link";

export function ContactCTA() {
  return (
    <Section className="py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent-purple/20 to-accent-blue/10 border border-white/10 p-12 md:p-24 text-center"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent-purple/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Ready to build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
                extraordinary?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/70">
              Let&apos;s turn your vision into a world-class digital experience.
              Schedule a discovery call with us today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" variant="glow" asChild className="w-full sm:w-auto">
                <Link href="/contact">Project Request Form</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="mailto:hello@ariostudio.com">hello@ariostudio.com</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
