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
  content?: any; // PortableText array (array of blocks)
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
  order?: number;
  code?: {
    code: string;
    language?: string;
    filename?: string;
  };
};

// Helper to map Sanity project to our unified Project type
function mapSanityProject(sanityProject: any, locale: string = 'en'): Project {
  const isFa = locale === 'fa';
  // Validate and clean image URLs
  const cleanImageUrl = (url: string | null | undefined | object): string => {
    if (!url) return '';
    // If it's already a string, validate it
    if (typeof url === 'string') {
      try {
        new URL(url);
        return url;
      } catch {
        return '';
      }
    }
    // If it's an object (Sanity image reference), try to extract URL
    if (typeof url === 'object' && url !== null) {
      // Handle Sanity image object structure
      if ('asset' in url && url.asset && typeof url.asset === 'object' && 'url' in url.asset) {
        const assetUrl = (url.asset as any).url;
        if (typeof assetUrl === 'string') {
          try {
            new URL(assetUrl);
            return assetUrl;
          } catch {
            return '';
          }
        }
      }
    }
    return '';
  };

  // Ensure slug is a string (GROQ query already extracts slug.current as slug)
  const getSlug = (): string => {
    // The GROQ query already extracts slug.current as "slug", so it should be a string
    if (typeof sanityProject.slug === 'string') {
      return sanityProject.slug;
    }
    // Fallback in case the query didn't extract it properly
    if (sanityProject.slug && typeof sanityProject.slug === 'object' && 'current' in sanityProject.slug) {
      return sanityProject.slug.current || '';
    }
    return '';
  };

  // Clean approachVisuals - ensure imageUrl is valid
  const cleanApproachVisuals = (visuals: any[]): { id: string; label: string; imageUrl: string }[] => {
    if (!Array.isArray(visuals)) return [];
    return visuals
      .filter((v: any) => v && typeof v === 'object')
      .map((v: any) => ({
        id: v.id || '',
        label: v.label || '',
        imageUrl: cleanImageUrl(v.imageUrl),
      }))
      .filter((v) => v.imageUrl); // Only include visuals with valid image URLs
  };

  // Helper to extract localized string value
  const getLocalizedString = (field: any): string => {
    if (!field) return "";
    if (typeof field === 'string') return field; // Fallback for old data structure
    if (typeof field === 'object' && field !== null) {
      const lang = isFa ? 'fa' : 'en';
      return field[lang] || field.en || field.fa || "";
    }
    return "";
  };

  // Helper to extract localized text value
  const getLocalizedText = (field: any): string => {
    if (!field) return "";
    if (typeof field === 'string') return field; // Fallback for old data structure
    if (typeof field === 'object' && field !== null) {
      const lang = isFa ? 'fa' : 'en';
      return field[lang] || field.en || field.fa || "";
    }
    return "";
  };

  // Helper to extract localized block content
  const getLocalizedContent = (field: any): any => {
    if (!field) return null;
    if (Array.isArray(field)) return field; // Fallback for old data structure
    if (typeof field === 'object' && field !== null) {
      const lang = isFa ? 'fa' : 'en';
      const content = field[lang] || field.en || field.fa;
      return Array.isArray(content) && content.length > 0 ? content : null;
    }
    return null;
  };

  return {
    id: sanityProject._id || '',
    slug: getSlug(),
    title: getLocalizedString(sanityProject.title),
    excerpt: getLocalizedText(sanityProject.excerpt) || getLocalizedText(sanityProject.description),
    description: getLocalizedText(sanityProject.description),
    content: getLocalizedContent(sanityProject.content),
    coverImageUrl: cleanImageUrl(sanityProject.coverImageUrl),
    category: sanityProject.category || "",
    client: sanityProject.client || "",
    year: sanityProject.year || "",
    services: Array.isArray(sanityProject.services) ? sanityProject.services : [],
    challenge: getLocalizedText(sanityProject.challenge),
    solution: getLocalizedText(sanityProject.solution),
    results: getLocalizedText(sanityProject.results),
    gradient: sanityProject.gradient || "",
    images: Array.isArray(sanityProject.images) ? sanityProject.images.filter((img: any) => img && typeof img === 'string') : [],
    approachVisuals: cleanApproachVisuals(sanityProject.approachVisuals),
    thumbnailImage: cleanImageUrl(sanityProject.thumbnailImageUrl) || null,
    order: typeof sanityProject.order === 'number' ? sanityProject.order : undefined,
    code: sanityProject.code && typeof sanityProject.code === 'object' && 'code' in sanityProject.code
      ? {
          code: sanityProject.code.code || '',
          language: sanityProject.code.language || 'text',
          filename: sanityProject.code.filename || undefined,
        }
      : undefined,
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
export async function getAllProjects(locale: string = 'en'): Promise<Project[]> {
  try {
    const sanityProjects = await sanityClient.fetch<SanityDocument[]>(
      PROJECTS_QUERY,
      {},
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );
    
    console.log('[getAllProjects] Fetched projects from Sanity:', sanityProjects?.length || 0);
    
    if (sanityProjects && sanityProjects.length > 0) {
      const mapped = sanityProjects.map((p) => mapSanityProject(p, locale));
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
export async function getProjectBySlug(slug: string, locale: string = 'en'): Promise<Project | null> {
  try {
    const sanityProject = await sanityClient.fetch<SanityDocument>(
      PROJECT_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: 60 } }
    );
    
    if (sanityProject) {
      return mapSanityProject(sanityProject, locale);
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
export async function getFeaturedProjects(limit: number = 4, locale: string = 'en'): Promise<Project[]> {
  try {
    const sanityProjects = await sanityClient.fetch<SanityDocument[]>(FEATURED_PROJECTS_QUERY);
    
    if (sanityProjects && sanityProjects.length > 0) {
      return sanityProjects.slice(0, limit).map((p) => mapSanityProject(p, locale));
    }
    
    // Fallback to static data
    console.log('[getFeaturedProjects] No featured Sanity projects found, using static data');
    return staticProjects.slice(0, limit).map(mapStaticProject);
  } catch (error) {
    console.error('[getFeaturedProjects] Error fetching from Sanity, using static data:', error);
    return staticProjects.slice(0, limit).map(mapStaticProject);
  }
}
