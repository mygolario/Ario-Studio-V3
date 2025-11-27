import {
  allProjects as staticProjects,
  getProjectBySlug as getStaticProjectBySlug,
  Project as StaticProject,
} from "./projects";
import {
  fetchAllProjectsFromWP,
  fetchProjectBySlugFromWP,
  WPProject,
} from "./cms/wordpress";

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

// Helper to map WPProject to our unified Project type
function mapWPProject(p: WPProject): Project {
  return {
    ...p,
    id: p.id.toString(), // Ensure ID is string or consistent
  };
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const wpProjects = await fetchAllProjectsFromWP();
    if (wpProjects.length > 0) {
      console.log('[getAllProjects] Fetched', wpProjects.length, 'projects from WordPress');
      const mapped = wpProjects.map(mapWPProject);
      // Log thumbnail info for first project
      if (mapped[0]) {
        console.log('[getAllProjects] First project:', mapped[0].title, 'thumbnailImage:', mapped[0].thumbnailImage);
      }
      return mapped;
    }
  } catch (e) {
    console.error("Failed to fetch projects from WordPress, falling back to static data", e);
  }
  
  // Fallback to static data
  console.log('[getAllProjects] Using static fallback data');
  return staticProjects.map(mapStaticProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  console.log('[getProjectBySlug] Fetching slug:', slug);
  
  try {
    const wpProject = await fetchProjectBySlugFromWP(slug);
    if (wpProject) {
      const mappedProject = mapWPProject(wpProject);
      console.log('[getProjectBySlug] Found project:', mappedProject.title, 'thumbnailImage:', mappedProject.thumbnailImage);
      return mappedProject;
    }
  } catch (e) {
    console.error(`Failed to fetch project ${slug} from WordPress, falling back to static data`, e);
  }
  
  // Fallback to static data
  const staticProject = getStaticProjectBySlug(slug);
  if (staticProject) {
    console.log('[getProjectBySlug] Using static fallback for:', slug);
  } else {
    console.log('[getProjectBySlug] No project found for slug:', slug);
  }
  return staticProject ? mapStaticProject(staticProject) : null;
}
