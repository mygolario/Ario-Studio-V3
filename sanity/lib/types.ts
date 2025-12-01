export interface Project {
  id: string;
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
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatar?: string;
  rating?: number;
  featured: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: any;
  coverImage?: string;
  author?: string;
  publishedAt: string;
  categories?: string[];
  tags?: string[];
}

export interface SiteSettings {
  title: string;
  description: string;
  logo?: string;
  ogImage?: string;
  contactEmail?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
}

