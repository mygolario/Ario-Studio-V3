import { getProjectBySlug } from "@/lib/projects-data";
import { notFound } from "next/navigation";
import ProjectDetailsClient from "./ProjectDetailsClient";

export default async function ProjectDetails({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
