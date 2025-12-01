import {
  allProjects as staticProjects,
  getProjectBySlug as getStaticProjectBySlug,
  Project as StaticProject,
} from "./projects";
import {
  getAllProjects as getSanityProjects,
  getProjectBySlug as getSanityProjectBySlug,
} from "@/sanity/queries";
import type { ProjectDetail as SanityProject } from "@/sanity/queries";

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

// Helper to map SanityProject to our unified Project type
function mapSanityProject(p: SanityProject): Project {
  return {
    id: p._id,
    slug: p.slug.current,
    title: p.title,
    excerpt: p.summary,
    description: p.summary,
    content: undefined, // Sanity uses problem/solution/result instead
    coverImageUrl: p.thumbnail,
    category: p.industry,
    client: p.clientName,
    year: undefined,
    services: undefined,
    challenge: undefined, // Use problem field from Sanity
    solution: undefined, // Use solution field from Sanity
    results: undefined, // Use result field from Sanity
    gradient: undefined,
    images: undefined,
    approachVisuals: undefined,
    thumbnailImage: p.thumbnail,
  };
}

export async function getAllProjects(draftMode = false): Promise<Project[]> {
  try {
    const sanityProjects = await getSanityProjects(draftMode);
    if (sanityProjects.length > 0) {
      return sanityProjects.map(mapSanityProject);
    }
  } catch (e) {
    console.error("Failed to fetch projects from Sanity, falling back to static data", e);
  }
  
  // Fallback to static data
  return staticProjects.map(mapStaticProject);
}

export async function getProjectBySlug(slug: string, draftMode = false): Promise<Project | null> {
  try {
    const sanityProject = await getSanityProjectBySlug(slug, draftMode);
    if (sanityProject) {
      return mapSanityProject(sanityProject);
    }
  } catch (e) {
    console.error(`Failed to fetch project ${slug} from Sanity, falling back to static data`, e);
  }
  
  // Fallback to static data
  const staticProject = getStaticProjectBySlug(slug);
  if (!staticProject) {
    console.warn('[getProjectBySlug] No project found for slug:', slug);
  }
  return staticProject ? mapStaticProject(staticProject) : null;
}
