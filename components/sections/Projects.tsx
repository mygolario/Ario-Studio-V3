"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { Project } from "@/sanity/queries";
import { cn } from "@/lib/utils";

// Lightweight View All Projects Button - CSS only hover effects
function ViewAllButton({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center justify-center gap-2 overflow-hidden",
        "rounded-full px-6 py-3 font-medium",
        "backdrop-blur-md text-text-main border",
        // Light mode
        "bg-black/5 border-black/10",
        "hover:bg-black/10 hover:border-black/20",
        // Dark mode
        "dark:bg-white/5 dark:border-white/10",
        "dark:hover:bg-white/10 dark:hover:border-white/20",
        "shadow-md shadow-black/5 dark:shadow-black/20",
        "transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02]"
      )}
    >
      <span className="relative z-10 flex items-center gap-2 text-sm font-medium tracking-wide">
        {text}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  const t = useTranslations("home.projects");
  
  // Show first 4 projects
  const featuredProjects = projects.slice(0, 4);

  return (
    <Section id="projects">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 md:mb-20 gap-4 sm:gap-6">
          <div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-main mb-3 sm:mb-4"
            >
              {t("title")}
            </h2>
            <p className="text-text-muted-custom max-w-md">
              {t("description")}
            </p>
          </div>
          <ViewAllButton href="/projects" text={t("viewAll")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project._id}
            >
              <Link href={`/projects/${project.slug.current}`} className="group block relative z-10">
                <div
                  className={`relative aspect-[16/9] rounded-2xl overflow-hidden bg-page-elevated border border-border-subtle group-hover:border-accent-purple/30 group-hover:shadow-lg transition-all duration-500`}
                >
                  {/* Thumbnail Image (if available) */}
                  {project.thumbnail && (
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} - ${project.industry || 'Project'}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index < 2 ? "eager" : "lazy"}
                      priority={index < 2}
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 pointer-events-none bg-gradient-to-br from-gray-500/20 to-slate-500/20 ${project.thumbnail ? 'opacity-60' : 'opacity-50'} group-hover:opacity-70 transition-opacity duration-500`} />
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/80" />

                  {/* Text Overlay with Dark Background */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                    {/* Dark gradient overlay behind text for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-transparent dark:from-black/90 dark:via-black/70" />
                    
                    {/* Text content */}
                    <div className="relative z-10">
                      <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-white/95 mb-2 block">
                        {project.industry || 'Project'}
                      </span>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                          {project.title}
                        </h3>
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-xs sm:text-sm font-medium flex-shrink-0">
                          {t("preview")} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
