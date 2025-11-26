import { MetadataRoute } from "next";
import { allProjects } from "@/lib/projects";
import { getAllProjectSlugs } from "@/sanity/queries";

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
    // Try to fetch from Sanity first
    const sanitySlugs = await getAllProjectSlugs();
    projectSlugs = sanitySlugs && sanitySlugs.length > 0 ? sanitySlugs : allProjects.map((p) => p.slug);
  } catch (error) {
    console.error("Error fetching project slugs from Sanity:", error);
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
