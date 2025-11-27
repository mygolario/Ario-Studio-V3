"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { Project } from "@/lib/projects-data";

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
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-main mb-4"
            >
              {t("title")}
            </motion.h2>
            <p className="text-text-muted-custom max-w-md">
              {t("description")}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/projects" className="group">
              {t("viewAll")}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block relative z-10">
                <div
                  className={`relative aspect-[16/9] rounded-2xl overflow-hidden bg-page-elevated border border-border-subtle group-hover:border-accent-purple/30 group-hover:shadow-lg transition-all duration-500`}
                >
                  {/* Thumbnail Image (if available) */}
                  {project.thumbnailImage && (
                    <Image
                      src={project.thumbnailImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${project.gradient || 'from-gray-500/20 to-slate-500/20'} ${project.thumbnailImage ? 'opacity-60' : 'opacity-50'} group-hover:opacity-70 transition-opacity duration-500`} />
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/80" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                    <span className="text-sm font-medium text-text-main/80 dark:text-white/80 mb-2 block">
                      {project.category}
                    </span>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-text-main dark:text-white">
                        {project.title}
                      </h3>
                      <span className="text-text-main dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-sm font-medium">
                        {t("preview")} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
