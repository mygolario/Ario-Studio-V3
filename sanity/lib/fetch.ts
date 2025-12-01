import { client, previewClient } from './client';
import type { Project, Service, Testimonial, BlogPost, SiteSettings } from './types';
import {
  projectsQuery,
  projectBySlugQuery,
  servicesQuery,
  testimonialsQuery,
  featuredTestimonialsQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  siteSettingsQuery,
} from './queries';
import { urlFor } from './image';

// Helper to transform project images
function transformProjectImages(project: any): Project {
  return {
    id: project._id,
    slug: project.slug?.current || '',
    title: project.title || '',
    excerpt: project.excerpt || project.description || '',
    description: project.description || '',
    content: project.content || '',
    coverImageUrl: project.coverImage
      ? urlFor(project.coverImage).width(1200).height(630).url()
      : project.images?.[0]
        ? urlFor(project.images[0]).width(1200).height(630).url()
        : undefined,
    category: project.category || '',
    client: project.client || '',
    year: project.year || '',
    services: project.services || [],
    challenge: project.challenge || '',
    solution: project.solution || '',
    results: project.results || '',
    gradient: project.gradient || '',
    images: project.images
      ? project.images.map((img: any) => urlFor(img).width(1920).url())
      : [],
    approachVisuals: project.approachVisuals
      ? project.approachVisuals.map((visual: any) => ({
          id: visual.id || '',
          label: visual.label || '',
          imageUrl: visual.imageUrl || '',
        }))
      : [],
    thumbnailImage: project.thumbnailImage
      ? urlFor(project.thumbnailImage).width(800).height(450).url()
      : project.images?.[0]
        ? urlFor(project.images[0]).width(800).height(450).url()
        : null,
  };
}

// Helper to transform service
function transformService(service: any): Service {
  return {
    id: service.id || '',
    title: service.title || '',
    subtitle: service.subtitle || '',
    description: service.description || '',
    color: service.color || '',
    order: service.order || 0,
  };
}

// Helper to transform testimonial
function transformTestimonial(testimonial: any): Testimonial {
  return {
    id: testimonial._id,
    name: testimonial.name || '',
    role: testimonial.role || '',
    company: testimonial.company || '',
    quote: testimonial.quote || '',
    avatar: testimonial.avatar
      ? urlFor(testimonial.avatar).width(100).height(100).url()
      : undefined,
    rating: testimonial.rating || undefined,
    featured: testimonial.featured || false,
    order: testimonial.order || 0,
  };
}

// Helper to transform blog post
function transformBlogPost(post: any): BlogPost {
  return {
    id: post._id,
    slug: post.slug?.current || '',
    title: post.title || '',
    excerpt: post.excerpt || '',
    content: post.content || '',
    coverImage: post.coverImage
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : undefined,
    author: post.author || '',
    publishedAt: post.publishedAt || '',
    categories: post.categories || [],
    tags: post.tags || [],
  };
}

// Fetch functions
export async function getAllProjects(draftMode = false): Promise<Project[]> {
  const data = await (draftMode ? previewClient : client).fetch(projectsQuery);
  return data.map(transformProjectImages);
}

export async function getProjectBySlug(
  slug: string,
  draftMode = false
): Promise<Project | null> {
  const data = await (draftMode ? previewClient : client).fetch(projectBySlugQuery, {
    slug,
  });
  return data ? transformProjectImages(data) : null;
}

export async function getAllServices(): Promise<Service[]> {
  const data = await client.fetch(servicesQuery);
  return data.map(transformService);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const data = await client.fetch(testimonialsQuery);
  return data.map(transformTestimonial);
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const data = await client.fetch(featuredTestimonialsQuery);
  return data.map(transformTestimonial);
}

export async function getAllBlogPosts(draftMode = false): Promise<BlogPost[]> {
  const data = await (draftMode ? previewClient : client).fetch(blogPostsQuery);
  return data.map(transformBlogPost);
}

export async function getBlogPostBySlug(
  slug: string,
  draftMode = false
): Promise<BlogPost | null> {
  const data = await (draftMode ? previewClient : client).fetch(blogPostBySlugQuery, {
    slug,
  });
  return data ? transformBlogPost(data) : null;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const data = await client.fetch(siteSettingsQuery);
  if (!data) return null;
  return {
    title: data.title || '',
    description: data.description || '',
    logo: data.logo ? urlFor(data.logo).width(200).url() : undefined,
    ogImage: data.ogImage ? urlFor(data.ogImage).width(1200).height(630).url() : undefined,
    contactEmail: data.contactEmail || undefined,
    socialLinks: data.socialLinks || {},
  };
}

