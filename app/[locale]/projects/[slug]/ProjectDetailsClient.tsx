"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Link } from "@/lib/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { ProjectDetail } from "@/sanity/queries";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

interface ProjectDetailsClientProps {
  project: ProjectDetail;
}

// Portable Text components for project content
const portableTextComponents: Partial<PortableTextComponents> = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Project image"}
            width={1200}
            height={630}
            className="rounded-lg w-full h-auto"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-text-muted-custom">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-text-main">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: any) => {
      if (!value?.href) return <>{children}</>;
      return (
        <a
          href={value.href}
          className="text-accent-purple hover:text-accent-blue underline"
          target={value.href.startsWith("http") ? "_blank" : undefined}
          rel={value.href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export default function ProjectDetailsClient({
  project,
}: ProjectDetailsClientProps) {
  const t = useTranslations("projects.detail");

  const locale = useLocale();
  const isRtl = locale === "fa";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isRtl ? "خانه" : "Home",
            item: `https://www.ariostudio.net/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isRtl ? "پروژه‌ها" : "Projects",
            item: `https://www.ariostudio.net/${locale}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `https://www.ariostudio.net/${locale}/projects/${project.slug.current}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `https://www.ariostudio.net/${locale}/projects/${project.slug.current}#creativework`,
        name: project.title,
        description: project.summary || "",
        url: `https://www.ariostudio.net/${locale}/projects/${project.slug.current}`,
        creator: {
          "@type": "Organization",
          name: isRtl ? "آریو استودیو" : "Ario Studio",
          url: "https://www.ariostudio.net",
        },
        image: project.thumbnail,
        keywords: project.industry,
        inLanguage: locale === "fa" ? "fa-IR" : "en-US",
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
            {project.industry && (
              <span className="block text-accent-purple font-mono text-sm mb-4 tracking-wider uppercase">
                {project.industry}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-text-main mb-6 sm:mb-8 tracking-tighter">
              {project.title}
            </h1>
            {project.summary && (
              <p className="text-lg sm:text-xl md:text-2xl text-text-muted-custom max-w-3xl leading-relaxed">
                {project.summary}
              </p>
            )}
          </motion.div>

          {/* Project Metadata Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 border-y border-border-subtle py-6 sm:py-8 mb-12 sm:mb-16"
          >
            {project.clientName && (
              <div>
                <h3 className="text-sm font-mono text-text-muted-custom mb-2 uppercase tracking-wider">
                  {t("meta.client")}
                </h3>
                <p className="text-text-main font-medium">{project.clientName}</p>
              </div>
            )}
            {project.liveUrl && (
              <div>
                <h3 className="text-sm font-mono text-text-muted-custom mb-2 uppercase tracking-wider">
                  Live Site
                </h3>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-purple hover:text-accent-blue inline-flex items-center gap-1"
                >
                  Visit <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Cover Image */}
          {project.thumbnail && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full aspect-video rounded-2xl sm:rounded-3xl border border-border-subtle mb-12 sm:mb-16 md:mb-24 relative overflow-hidden bg-gradient-to-br from-gray-500/20 to-slate-500/20"
            >
              <Image
                src={project.thumbnail}
                alt={isRtl ? `تصویر کاور پروژه ${project.title}` : `Cover image for ${project.title} project`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
          )}
        </Container>
      </Section>

      {/* Problem/Challenge Section */}
      {project.problem && (
        <Section className="bg-page-elevated">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-4">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:sticky md:top-32 text-text-main">
                  {t("challenge")}
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <PortableText value={project.problem} components={portableTextComponents} />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Solution Section */}
      {project.solution && (
        <Section>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-4">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:sticky md:top-32 text-text-main">
                  {t("solution")}
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <PortableText value={project.solution} components={portableTextComponents} />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Results Section */}
      {project.result && (
        <Section className="bg-accent-purple/5 border-y border-accent-purple/10">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-4">
                <h2 className="text-3xl font-bold mb-6 text-text-main">
                  {t("results")}
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-accent-purple flex-shrink-0 mt-1" />
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={project.result} components={portableTextComponents} />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Next Project CTA */}
      <Section>
        <Container>
          <div className="border-t border-border-subtle pt-24 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-text-main">
              {t("nextCta.title")}
            </h2>
            <p className="text-lg sm:text-xl text-text-muted-custom max-w-2xl mx-auto mb-8 sm:mb-12">
              {t("nextCta.description")}
            </p>
            <Button size="lg" asChild className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg min-h-[44px]">
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
