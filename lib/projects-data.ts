import {
  allProjects as staticProjects,
  getProjectBySlug as getStaticProjectBySlug,
  Project as StaticProject,
} from "./projects";

// Define a unified Project type that covers both sources
export type Project = {
  id: number | string;
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
  content?: string;
  coverImageUrl?: string;
  category?: string;
  client?: string;
  year?: string;
  services?: string[];
  challenge?: string;
  solution?: string;
  results?: string;
  gradient?: string;
  images?: string[];
  approachVisuals?: { id: string; label: string; imageUrl: string }[];
  thumbnailImage?: string | null;
};

// Helper to map StaticProject to our unified Project type
function mapStaticProject(p: StaticProject): Project {
  return {
    ...p,
    // Ensure all required fields are present or mapped
    content: "", // Static projects might not have full content field if not in interface
    excerpt: p.description, // Use description as excerpt
    coverImageUrl: p.images?.[0] || "", // Use first image as cover if not explicit
  };
}

export function getAllProjects(): Project[] {
  return staticProjects.map(mapStaticProject);
}

export function getProjectBySlug(slug: string): Project | null {
  const staticProject = getStaticProjectBySlug(slug);
  if (!staticProject) {
    console.warn('[getProjectBySlug] No project found for slug:', slug);
    return null;
  }
  return mapStaticProject(staticProject);
}
