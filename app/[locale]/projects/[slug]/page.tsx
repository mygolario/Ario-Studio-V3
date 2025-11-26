"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Link } from "@/lib/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getProjectBySlug, SanityProject } from "@/sanity/queries";
import { getProjectBySlug as getStaticProject } from "@/lib/projects";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ProjectDetails({
  params,
}: {
  params: { slug: string };
}) {
  const t = useTranslations("projects.detail");
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const sanityProject = await getProjectBySlug(params.slug);
        if (sanityProject) {
          // Map Sanity project to our format
          const mappedProject = {
            title: sanityProject.title,
            category: sanityProject.category,
            description: sanityProject.description,
            gradient: sanityProject.gradient,
            client: sanityProject.client,
            year: sanityProject.year,
            services: sanityProject.services,
            challenge: sanityProject.challenge,
            solution: sanityProject.solution,
            results: sanityProject.results,
            slug: sanityProject.slug.current,
            coverImage: sanityProject.coverImage,
            images: sanityProject.images,
          };
          setProject(mappedProject);
        } else {
          // Fallback to static data
          const staticProject = getStaticProject(params.slug);
          if (staticProject) {
            setProject(staticProject);
          }
        }
      } catch (error) {
        console.error("Error fetching project from Sanity:", error);
        // Fallback to static data
        const staticProject = getStaticProject(params.slug);
        if (staticProject) {
          setProject(staticProject);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-pink animate-pulse blur-xl opacity-50" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-pink animate-spin-slow opacity-80" />
          <div className="absolute inset-1 bg-background rounded-full" />
        </div>
      </div>
    );
  }

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
              className="inline-flex items-center text-sm text-text-muted-custom hover:text-text-main transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t("back")}
            </Link>
            <span className="block text-accent-purple font-mono text-sm mb-4 tracking-wider uppercase">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-8 tracking-tighter">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-text-muted-custom max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Project Metadata Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-border-subtle py-8 mb-16"
          >
            <div>
              <h3 className="text-sm font-mono text-text-muted-custom mb-2 uppercase tracking-wider">
                {t("meta.client")}
              </h3>
              <p className="text-text-main font-medium">{project.client}</p>
            </div>
            <div>
              <h3 className="text-sm font-mono text-text-muted-custom mb-2 uppercase tracking-wider">
                {t("meta.year")}
              </h3>
              <p className="text-text-main font-medium">{project.year}</p>
            </div>
            <div className="col-span-2 md:col-span-2">
              <h3 className="text-sm font-mono text-text-muted-custom mb-2 uppercase tracking-wider">
                {t("meta.services")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service: string) => (
                  <span
                    key={service}
                    className="inline-block px-3 py-1 rounded-full bg-page-elevated border border-border-subtle text-xs text-text-main/80"
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
            className={`w-full aspect-video rounded-3xl border border-border-subtle mb-24 relative overflow-hidden bg-gradient-to-br ${project.gradient}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-text-muted-custom/50 text-lg font-mono">
                Project Cover Image
              </span>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Case Study Content */}
      <Section className="bg-page-elevated">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold mb-6 sticky top-32 text-text-main">
                {t("challenge")}
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl text-text-muted-custom leading-relaxed">
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
              <h2 className="text-3xl font-bold mb-6 sticky top-32 text-text-main">
                {t("solution")}
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl text-text-muted-custom leading-relaxed mb-8">
                {project.solution}
              </p>

              {/* Visual Showcase Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="aspect-[4/3] bg-page-elevated rounded-2xl border border-border-subtle flex items-center justify-center">
                  <span className="text-text-muted-custom/40 text-sm">
                    Visual 1
                  </span>
                </div>
                <div className="aspect-[4/3] bg-page-elevated rounded-2xl border border-border-subtle flex items-center justify-center">
                  <span className="text-text-muted-custom/40 text-sm">
                    Visual 2
                  </span>
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
              <h2 className="text-3xl font-bold mb-6 text-text-main">{t("results")}</h2>
            </div>
            <div className="md:col-span-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-accent-purple flex-shrink-0 mt-1" />
                <p className="text-lg md:text-xl text-text-main leading-relaxed">
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
          <div className="border-t border-border-subtle pt-24 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-text-main">
              {t("nextCta.title")}
            </h2>
            <p className="text-xl text-text-muted-custom max-w-2xl mx-auto mb-12">
              {t("nextCta.description")}
            </p>
            <Button size="lg" asChild className="h-14 px-8 text-lg">
              <Link href="/contact">
                {t("nextCta.button")} <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
