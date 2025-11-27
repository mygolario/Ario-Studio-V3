import { MetadataRoute } from "next";
import { allProjects } from "@/lib/projects";
import { getAllProjects } from "@/lib/projects-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ariostudio.net";
  const locales = ['en', 'fa'];

  // Static routes
  const staticPaths = ["", "/projects", "/contact"];
  
  const staticRoutes = locales.flatMap(locale => 
    staticPaths.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  let projectSlugs: string[] = [];

  try {
    // Fetch all projects using the unified data layer
    const projects = await getAllProjects();
    projectSlugs = projects.map((p) => p.slug);
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    // Fallback to static data
    projectSlugs = allProjects.map((p) => p.slug);
  }

  const projectRoutes = locales.flatMap(locale => 
    projectSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  return [...staticRoutes, ...projectRoutes];
}
