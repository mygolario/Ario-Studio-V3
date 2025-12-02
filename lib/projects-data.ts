import {
  allProjects as staticProjects,
  getProjectBySlug as getStaticProjectBySlug,
  Project as StaticProject,
} from "./projects";
import { sanityClient } from "./sanity";
import { PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY, FEATURED_PROJECTS_QUERY } from "./sanity-queries";
import type { SanityDocument } from "next-sanity";

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

// Helper to map Sanity project to our unified Project type
function mapSanityProject(sanityProject: any): Project {
  return {
    id: sanityProject._id,
    slug: sanityProject.slug || sanityProject.slug?.current || "",
    title: sanityProject.title || "",
    excerpt: sanityProject.excerpt || sanityProject.description || "",
    description: sanityProject.description || "",
    content: sanityProject.content || "",
    coverImageUrl: sanityProject.coverImageUrl || "",
    category: sanityProject.category || "",
    client: sanityProject.client || "",
    year: sanityProject.year || "",
    services: sanityProject.services || [],
    challenge: sanityProject.challenge || "",
    solution: sanityProject.solution || "",
    results: sanityProject.results || "",
    gradient: sanityProject.gradient || "",
    images: sanityProject.images || [],
    approachVisuals: sanityProject.approachVisuals || [],
    thumbnailImage: sanityProject.thumbnailImageUrl || null,
  };
}

// Helper to map StaticProject to our unified Project type
function mapStaticProject(p: StaticProject): Project {
  return {
    ...p,
    content: "",
    excerpt: p.description,
    coverImageUrl: p.images?.[0] || "",
  };
}

// Fetch all projects from Sanity with fallback to static data
export async function getAllProjects(): Promise<Project[]> {
  try {
    const sanityProjects = await sanityClient.fetch<SanityDocument[]>(
      PROJECTS_QUERY,
      {},
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );
    
    console.log('[getAllProjects] Fetched projects from Sanity:', sanityProjects?.length || 0);
    
    if (sanityProjects && sanityProjects.length > 0) {
      const mapped = sanityProjects.map(mapSanityProject);
      console.log('[getAllProjects] Mapped projects:', mapped.length);
      return mapped;
    }
    
    // Fallback to static data if no Sanity projects found
    console.log('[getAllProjects] No Sanity projects found, using static data');
    return staticProjects.map(mapStaticProject);
  } catch (error) {
    console.error('[getAllProjects] Error fetching from Sanity, using static data:', error);
    return staticProjects.map(mapStaticProject);
  }
}

// Fetch project by slug from Sanity with fallback to static data
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const sanityProject = await sanityClient.fetch<SanityDocument>(
      PROJECT_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: 60 } }
    );
    
    if (sanityProject) {
      return mapSanityProject(sanityProject);
    }
    
    // Fallback to static data
    console.log(`[getProjectBySlug] No Sanity project found for slug: ${slug}, using static data`);
    const staticProject = getStaticProjectBySlug(slug);
    if (!staticProject) {
      console.warn(`[getProjectBySlug] No project found for slug: ${slug}`);
      return null;
    }
    return mapStaticProject(staticProject);
  } catch (error) {
    console.error(`[getProjectBySlug] Error fetching from Sanity for slug: ${slug}, using static data:`, error);
    const staticProject = getStaticProjectBySlug(slug);
    if (!staticProject) {
      return null;
    }
    return mapStaticProject(staticProject);
  }
}

// Fetch featured projects from Sanity with fallback to static data
export async function getFeaturedProjects(limit: number = 4): Promise<Project[]> {
  try {
    const sanityProjects = await sanityClient.fetch<SanityDocument[]>(FEATURED_PROJECTS_QUERY);
    
    if (sanityProjects && sanityProjects.length > 0) {
      return sanityProjects.slice(0, limit).map(mapSanityProject);
    }
    
    // Fallback to static data
    console.log('[getFeaturedProjects] No featured Sanity projects found, using static data');
    return staticProjects.slice(0, limit).map(mapStaticProject);
  } catch (error) {
    console.error('[getFeaturedProjects] Error fetching from Sanity, using static data:', error);
    return staticProjects.slice(0, limit).map(mapStaticProject);
  }
}
