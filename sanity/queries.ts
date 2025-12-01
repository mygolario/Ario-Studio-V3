/**
 * Sanity Query Helpers
 * 
 * Strongly-typed GROQ queries for fetching content from Sanity.
 * All functions are async and can be consumed from server components.
 */

import { groq } from 'next-sanity';
import { sanityPublicClient, sanityClient, sanityPreviewClient } from './client';

// Type definitions for query results
export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  tier?: 'Starter' | 'Growth' | 'Elite';
  priceFrom?: number;
  deliveryTime?: string;
  isFeatured?: boolean;
  orderRank?: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  clientName?: string;
  industry?: string;
  summary?: string;
  thumbnail?: string;
  liveUrl?: string;
  orderRank?: number;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  roleOrCompany?: string;
  quote: string;
  avatar?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: string;
  publishedAt: string;
  content?: any; // Portable text content
  author?: string;
  tags?: string[];
  categories?: string[];
}

export interface ProjectDetail {
  _id: string;
  title: string;
  slug: { current: string };
  clientName?: string;
  industry?: string;
  summary?: string;
  thumbnail?: string;
  liveUrl?: string;
  orderRank?: number;
  problem?: any; // Portable text content
  solution?: any; // Portable text content
  result?: any; // Portable text content
}

export interface SiteSettings {
  _id: string;
  siteTitle?: string;
  tagline?: string;
  description?: string;
  mainEmail?: string;
  whatsappLink?: string;
  socialLinks?: Array<{
    label: string;
    url: string;
  }>;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroCtaLabel?: string;
  heroCtaLink?: string;
}

/**
 * Get all services ordered by orderRank ascending, then title
 */
export async function getAllServices(): Promise<Service[]> {
  const query = groq`*[_type == "service"] | order(orderRank asc, title asc) {
    _id,
    title,
    slug,
    shortDescription,
    tier,
    priceFrom,
    deliveryTime,
    isFeatured,
    orderRank
  }`;

  return await sanityPublicClient.fetch<Service[]>(query);
}

/**
 * Get featured services (isFeatured == true)
 */
export async function getFeaturedServices(): Promise<Service[]> {
  const query = groq`*[_type == "service" && isFeatured == true] | order(orderRank asc, title asc) {
    _id,
    title,
    slug,
    shortDescription,
    tier,
    priceFrom,
    deliveryTime,
    isFeatured,
    orderRank
  }`;

  return await sanityPublicClient.fetch<Service[]>(query);
}

/**
 * Get all projects ordered by orderRank ascending
 * @param draftMode - Whether to fetch draft content (default: false)
 */
export async function getAllProjects(draftMode = false): Promise<Project[]> {
  const query = groq`*[_type == "project"] | order(orderRank asc) {
    _id,
    title,
    slug,
    clientName,
    industry,
    summary,
    "thumbnail": thumbnail.asset->url,
    liveUrl,
    orderRank
  }`;

  const client = draftMode ? sanityPreviewClient : sanityPublicClient;
  return await client.fetch<Project[]>(query);
}

/**
 * Get all testimonials ordered by creation date descending
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  const query = groq`*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    clientName,
    roleOrCompany,
    quote,
    "avatar": avatar.asset->url
  }`;

  return await sanityPublicClient.fetch<Testimonial[]>(query);
}

/**
 * Get recent blog posts ordered by publishedAt descending
 * @param limit - Maximum number of posts to return (default: 6)
 */
export async function getRecentBlogPosts(limit: number = 6): Promise<BlogPost[]> {
  const query = groq`*[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt
  }`;

  return await sanityPublicClient.fetch<BlogPost[]>(query, { limit });
}

/**
 * Get site settings (singleton document)
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = groq`*[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    tagline,
    description,
    mainEmail,
    whatsappLink,
    socialLinks,
    heroHeadline,
    heroSubheadline,
    heroCtaLabel,
    heroCtaLink
  }`;

  return await sanityPublicClient.fetch<SiteSettings | null>(query);
}

/**
 * Get blog post by slug
 * @param slug - The blog post slug
 * @param draftMode - Whether to fetch draft content (default: false)
 */
export async function getBlogPostBySlug(slug: string, draftMode = false): Promise<BlogPost | null> {
  const query = groq`*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt,
    content,
    author,
    tags,
    categories
  }`;

  const client = draftMode ? sanityPreviewClient : sanityPublicClient;
  return await client.fetch<BlogPost | null>(query, { slug });
}

/**
 * Get all blog post slugs for static generation
 */
export async function getAllBlogPostSlugs(): Promise<Array<{ slug: string }>> {
  const query = groq`*[_type == "blogPost" && defined(slug.current)] {
    "slug": slug.current
  }`;

  return await sanityPublicClient.fetch<Array<{ slug: string }>>(query);
}

/**
 * Get project by slug
 * @param slug - The project slug
 * @param draftMode - Whether to fetch draft content (default: false)
 */
export async function getProjectBySlug(slug: string, draftMode = false): Promise<ProjectDetail | null> {
  const query = groq`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    clientName,
    industry,
    summary,
    "thumbnail": thumbnail.asset->url,
    liveUrl,
    orderRank,
    problem,
    solution,
    result
  }`;

  const client = draftMode ? sanityPreviewClient : sanityPublicClient;
  return await client.fetch<ProjectDetail | null>(query, { slug });
}

/**
 * Get all project slugs for static generation
 */
export async function getAllProjectSlugs(): Promise<Array<{ slug: string }>> {
  const query = groq`*[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }`;

  return await sanityPublicClient.fetch<Array<{ slug: string }>>(query);
}

