"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Link } from "@/lib/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { Project } from "@/lib/projects-data";
import Image from "next/image";
import { PortableText } from "next-sanity";

interface ProjectDetailsClientProps {
  project: Project;
}

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
            item: `https://www.ariostudio.net/${locale}/projects/${project.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `https://www.ariostudio.net/${locale}/projects/${project.slug}#creativework`,
        name: project.title,
        description: project.excerpt || project.description || "",
        url: `https://www.ariostudio.net/${locale}/projects/${project.slug}`,
        creator: {
          "@type": "Organization",
          name: isRtl ? "آریو استودیو" : "Ario Studio",
          url: "https://www.ariostudio.net",
        },
        image: project.coverImageUrl,
        keywords: project.category,
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
            {project.category && (
              <span className="block text-accent-purple font-mono text-sm mb-4 tracking-wider uppercase">
                {project.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-text-main mb-6 sm:mb-8 tracking-tighter">
              {project.title}
            </h1>
            {project.excerpt && (
              <p className="text-lg sm:text-xl md:text-2xl text-text-muted-custom max-w-3xl leading-relaxed mb-4">
                {project.excerpt}
              </p>
            )}
            {project.description && (
              <p className="text-base sm:text-lg text-text-muted-custom max-w-3xl leading-relaxed">
                {project.description}
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
            {project.client && (
              <div>
                <h3 className="text-sm font-mono text-text-muted-custom mb-2 uppercase tracking-wider">
                  {t("meta.client")}
                </h3>
                <p className="text-text-main font-medium">{project.client}</p>
              </div>
            )}
            {project.year && (
              <div>
                <h3 className="text-sm font-mono text-text-muted-custom mb-2 uppercase tracking-wider">
                  {isRtl ? "سال" : "Year"}
                </h3>
                <p className="text-text-main font-medium">{project.year}</p>
              </div>
            )}
            {project.services && project.services.length > 0 && (
              <div>
                <h3 className="text-sm font-mono text-text-muted-custom mb-2 uppercase tracking-wider">
                  {isRtl ? "خدمات" : "Services"}
                </h3>
                <p className="text-text-main font-medium">
                  {project.services.join(', ')}
                </p>
              </div>
            )}
            {project.category && (
              <div>
                <h3 className="text-sm font-mono text-text-muted-custom mb-2 uppercase tracking-wider">
                  {isRtl ? "دسته‌بندی" : "Category"}
                </h3>
                <p className="text-text-main font-medium">{project.category}</p>
              </div>
            )}
          </motion.div>

          {/* Thumbnail Image (if no cover image) */}
          {!project.coverImageUrl && project.thumbnailImage && project.thumbnailImage.startsWith('http') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full aspect-video rounded-2xl sm:rounded-3xl border border-border-subtle mb-12 sm:mb-16 md:mb-24 relative overflow-hidden bg-gradient-to-br from-gray-500/20 to-slate-500/20"
            >
              <Image
                src={project.thumbnailImage}
                alt={isRtl ? `تصویر کوچک پروژه ${project.title}` : `Thumbnail image for ${project.title} project`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
          )}

          {/* Cover Image */}
          {project.coverImageUrl && project.coverImageUrl.startsWith('http') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`w-full aspect-video rounded-2xl sm:rounded-3xl border border-border-subtle mb-12 sm:mb-16 md:mb-24 relative overflow-hidden ${
                project.gradient 
                  ? project.gradient 
                  : 'bg-gradient-to-br from-gray-500/20 to-slate-500/20'
              }`}
              style={project.gradient && !project.gradient.startsWith('bg-') ? { background: project.gradient } : {}}
            >
              <Image
                src={project.coverImageUrl}
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

      {/* Challenge Section */}
      {project.challenge && (
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
                  <p className="mb-4 leading-relaxed text-text-muted-custom">{project.challenge}</p>
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
                  <p className="mb-4 leading-relaxed text-text-muted-custom">{project.solution}</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Results Section */}
      {project.results && (
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
                    <p className="mb-4 leading-relaxed text-text-muted-custom">{project.results}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Content Section (Full Content) */}
      {project.content && Array.isArray(project.content) && project.content.length > 0 && (
        <Section>
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-text-main">
                {isRtl ? "محتوای کامل" : "Full Content"}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <PortableText value={project.content} />
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Gallery Images Section */}
      {project.images && project.images.length > 0 && (
        <Section>
          <Container>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-text-main text-center">
              {isRtl ? "گالری تصاویر" : "Gallery"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {project.images
                .filter((img) => img && img.startsWith('http'))
                .map((imageUrl, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-500/20 to-slate-500/20 border border-border-subtle group-hover:border-border-subtle/50 transition-all duration-500"
                  >
                    <Image
                      src={imageUrl}
                      alt={`${project.title} - Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Approach Visuals Section */}
      {project.approachVisuals && project.approachVisuals.length > 0 && (
        <Section className="bg-page-elevated">
          <Container>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-text-main text-center">
              {isRtl ? "تصاویر رویکرد" : "Approach Visuals"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {project.approachVisuals.map((visual, index) => (
                <motion.div
                  key={visual.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-500/20 to-slate-500/20 border border-border-subtle group-hover:border-border-subtle/50 transition-all duration-500">
                    {visual.imageUrl && visual.imageUrl.startsWith('http') && (
                      <Image
                        src={visual.imageUrl}
                        alt={visual.label || `Approach visual ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                    )}
                  </div>
                  {visual.label && (
                    <p className="mt-4 text-sm font-medium text-text-muted-custom text-center">
                      {visual.label}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Code Section */}
      {project.code && project.code.code && (
        <Section className="bg-page-elevated">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-text-main">
                {isRtl ? "کد" : "Code"}
              </h2>
              <div className="relative">
                {project.code.filename && (
                  <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-4 py-2 rounded-t-lg border-b border-gray-700">
                    <span className="text-sm font-mono text-gray-300">
                      {project.code.filename}
                    </span>
                    {project.code.language && (
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        {project.code.language}
                      </span>
                    )}
                  </div>
                )}
                <pre
                  className={`overflow-x-auto ${
                    project.code.filename
                      ? 'rounded-b-lg'
                      : 'rounded-lg'
                  } bg-gray-900 dark:bg-gray-950 border border-gray-800 dark:border-gray-800 p-4 sm:p-6`}
                >
                  <code
                    className={`block text-sm sm:text-base font-mono text-gray-100 leading-relaxed ${
                      project.code.language ? `language-${project.code.language}` : ''
                    }`}
                  >
                    {project.code.code}
                  </code>
                </pre>
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
