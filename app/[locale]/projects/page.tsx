import { getAllProjects } from "@/lib/projects-data";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsClient projects={projects} />;
}
