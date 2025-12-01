import { groq } from 'next-sanity';

// Project queries
export const projectsQuery = groq`*[_type == "project" && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  description,
  excerpt,
  client,
  year,
  services,
  challenge,
  solution,
  results,
  gradient,
  thumbnailImage,
  coverImage,
  images,
  approachVisuals[] {
    id,
    label,
    "imageUrl": image.asset->url
  },
  publishedAt,
  featured
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  description,
  excerpt,
  client,
  year,
  services,
  challenge,
  solution,
  results,
  gradient,
  thumbnailImage,
  coverImage,
  images,
  approachVisuals[] {
    id,
    label,
    "imageUrl": image.asset->url
  },
  publishedAt,
  featured
}`;

// Service queries
export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  id,
  title,
  subtitle,
  description,
  color,
  order
}`;

// Testimonial queries
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc) {
  _id,
  name,
  role,
  company,
  quote,
  avatar,
  rating,
  featured,
  order
}`;

export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc) {
  _id,
  name,
  role,
  company,
  quote,
  avatar,
  rating,
  featured,
  order
}`;

// Blog post queries
export const blogPostsQuery = groq`*[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  content,
  coverImage,
  author,
  publishedAt,
  categories,
  tags
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  coverImage,
  author,
  publishedAt,
  categories,
  tags
}`;

// Site settings query
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  _id,
  title,
  description,
  logo,
  ogImage,
  contactEmail,
  socialLinks
}`;

