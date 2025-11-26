"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

export function ContactCTA() {
  const t = useTranslations("contact.cta");

  return (
    <Section className="py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-page-elevated border border-border-subtle p-12 md:p-24 text-center shadow-sm"
        >
          {/* Subtle Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-accent-blue/5 opacity-100" />
          
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent-purple/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-text-main tracking-tight">
              {t("headline.prefix")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
                {t("headline.highlight")}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-text-muted-custom">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" variant="glow" asChild className="w-full sm:w-auto">
                <Link href="/contact">{t("buttons.request")}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto bg-transparent border-border-subtle hover:bg-surface-hover text-text-main"
              >
                <Link href="mailto:info@ariostudio.net">{t("buttons.email")}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
