"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Project } from "@/lib/projects-data";

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const t = useTranslations("projects.page");

  return (
    <div className="pt-20">
      <Section>
        <Container>
          <div className="mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-text-main mb-6"
            >
              {t("title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-muted-custom max-w-2xl"
            >
              {t("description")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block space-y-4"
                >
                  <div
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${
                      project.gradient || "from-gray-500/20 to-slate-500/20"
                    } border border-border-subtle group-hover:border-border-subtle/50 transition-all duration-500`}
                  >
                    {project.coverImageUrl && (
                      <img
                        src={project.coverImageUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-text-main group-hover:text-accent-purple transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-sm font-mono text-text-muted-custom">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-text-muted-custom text-sm md:text-base line-clamp-2">
                      {project.description || project.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
