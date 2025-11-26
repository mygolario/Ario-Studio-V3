"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";

export default function ProjectDetails({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ariostudio.net",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://ariostudio.net/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://ariostudio.net/projects/${project.slug}`,
      },
    ],
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <Section className="pb-0">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link
              href="/projects"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
            <span className="block text-accent-purple font-mono text-sm mb-4 tracking-wider uppercase">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tighter">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Project Metadata Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-border/40 py-8 mb-16"
          >
            <div>
              <h3 className="text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                Client
              </h3>
              <p className="text-foreground font-medium">{project.client}</p>
            </div>
            <div>
              <h3 className="text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                Year
              </h3>
              <p className="text-foreground font-medium">{project.year}</p>
            </div>
            <div className="col-span-2 md:col-span-2">
              <h3 className="text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-foreground/80"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cover Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`w-full aspect-video rounded-3xl border border-border/10 mb-24 relative overflow-hidden bg-gradient-to-br ${project.gradient}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-foreground/20 text-lg font-mono">
                Project Cover Image
              </span>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Case Study Content */}
      <Section className="bg-muted/20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold mb-6 sticky top-32">
                The Challenge
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold mb-6 sticky top-32">
                Our Approach & Solution
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                {project.solution}
              </p>
              
              {/* Visual Showcase Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                 <div className="aspect-[4/3] bg-muted rounded-2xl border border-border/10 flex items-center justify-center">
                    <span className="text-muted-foreground/40 text-sm">Visual 1</span>
                 </div>
                 <div className="aspect-[4/3] bg-muted rounded-2xl border border-border/10 flex items-center justify-center">
                    <span className="text-muted-foreground/40 text-sm">Visual 2</span>
                 </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-accent-purple/5 border-y border-accent-purple/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold mb-6">The Results</h2>
            </div>
            <div className="md:col-span-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-accent-purple flex-shrink-0 mt-1" />
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  {project.results}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Next Project CTA */}
      <Section>
        <Container>
          <div className="border-t border-border/40 pt-24 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to build something similar?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Let's collaborate to bring your vision to life with the same level of
              precision and passion.
            </p>
            <Button size="lg" asChild className="h-14 px-8 text-lg">
              <Link href="/contact">
                Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
