export type WPProject = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
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

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;
const WORDPRESS_PROJECTS_ENDPOINT =
  process.env.WORDPRESS_PROJECTS_ENDPOINT ?? "/project";
const WORDPRESS_TIMEOUT_MS = Number(
  process.env.WORDPRESS_TIMEOUT_MS ?? "10000"
);

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}

async function fetchAPI(endpoint: string, params: Record<string, string> = {}) {
  if (!WORDPRESS_API_URL) {
    throw new Error("WORDPRESS_API_URL is not defined");
  }

  const url = new URL(`${WORDPRESS_API_URL}${endpoint}`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), WORDPRESS_TIMEOUT_MS);

  try {
    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch API: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

function mapProject(item: any): WPProject {
  // Map approach visuals from ACF fields
  const approachVisuals: { id: string; label: string; imageUrl: string }[] = [];
  
  if (item.acf?.approach_visual_1) {
    approachVisuals.push({
      id: "approach_visual_1",
      label: "Visual 1",
      imageUrl: item.acf.approach_visual_1,
    });
  }
  
  if (item.acf?.approach_visual_2) {
    approachVisuals.push({
      id: "approach_visual_2",
      label: "Visual 2",
      imageUrl: item.acf.approach_visual_2,
    });
  }

  // Handle thumbnail_image - can be string URL or object with url property
  const thumbRaw = item.acf?.thumbnail_image;
  let thumbnailImage: string | null = null;
  
  if (thumbRaw) {
    if (typeof thumbRaw === 'string') {
      thumbnailImage = thumbRaw;
    } else if (typeof thumbRaw === 'object' && thumbRaw.url) {
      thumbnailImage = thumbRaw.url;
    }
  }

  return {
    id: item.id,
    slug: item.slug || "",
    title: item.title?.rendered ?? "",
    excerpt: stripHtml(item.excerpt?.rendered),
    content: item.content?.rendered ?? "",
    coverImageUrl: item.featured_media_url || item.acf?.cover_image || null,
    category: item.acf?.category || "Uncategorized",
    client: item.acf?.client || "",
    year: item.acf?.year || "",
    services: item.acf?.services ? item.acf.services.split(",") : [],
    challenge: item.acf?.challenge || "",
    solution: item.acf?.solution || "",
    results: item.acf?.results || "",
    gradient: item.acf?.gradient || "from-gray-500/20 to-slate-500/20", // Fallback gradient
    images: item.acf?.images || [],
    approachVisuals: approachVisuals.length > 0 ? approachVisuals : undefined,
    thumbnailImage,
  };
}

export async function fetchAllProjectsFromWP(): Promise<WPProject[]> {
  try {
    const data = await fetchAPI(WORDPRESS_PROJECTS_ENDPOINT, {
      per_page: "100",
      _embed: "true",
    });
    return Array.isArray(data) ? data.map(mapProject).filter(p => p.slug) : [];
  } catch (error) {
    console.error("Error fetching all projects from WP:", error);
    throw error;
  }
}

export async function fetchProjectBySlugFromWP(
  slug: string
): Promise<WPProject | null> {
  console.log('[fetchProjectBySlugFromWP] Fetching slug:', slug);
  console.log('[fetchProjectBySlugFromWP] Endpoint:', WORDPRESS_PROJECTS_ENDPOINT);
  
  try {
    const data = await fetchAPI(WORDPRESS_PROJECTS_ENDPOINT, {
      slug,
      _embed: "true",
    });
    
    console.log('[fetchProjectBySlugFromWP] Response:', Array.isArray(data) ? `Array with ${data.length} items` : typeof data);
    
    if (Array.isArray(data) && data.length > 0) {
      console.log('[fetchProjectBySlugFromWP] Found project:', data[0].title?.rendered);
      console.log('[fetchProjectBySlugFromWP] ACF thumbnail_image:', data[0].acf?.thumbnail_image);
      return mapProject(data[0]);
    }
    
    console.log('[fetchProjectBySlugFromWP] No project found for slug:', slug);
    return null;
  } catch (error) {
    console.error(`Error fetching project by slug ${slug} from WP:`, error);
    throw error;
  }
}
