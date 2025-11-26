import { client } from "./client";

export interface SanityProject {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: string;
  description: string;
  gradient: string;
  client: string;
  year: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string;
  coverImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  images?: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
  }>;
  featured?: boolean;
  order?: number;
}

export async function getAllProjects(): Promise<SanityProject[]> {
  const query = `*[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    gradient,
    client,
    year,
    services,
    challenge,
    solution,
    results,
    coverImage,
    images,
    featured,
    order
  }`;

  return client.fetch(query);
}

export async function getProjectBySlug(
  slug: string
): Promise<SanityProject | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    description,
    gradient,
    client,
    year,
    services,
    challenge,
    solution,
    results,
    coverImage,
    images,
    featured,
    order
  }`;

  return client.fetch(query, { slug });
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  const query = `*[_type == "project" && featured == true] | order(order asc) [0...4] {
    _id,
    title,
    slug,
    category,
    description,
    gradient,
    client,
    year,
    services,
    challenge,
    solution,
    results,
    coverImage,
    images,
    featured,
    order
  }`;

  return client.fetch(query);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const query = `*[_type == "project"].slug.current`;
  return client.fetch(query);
}
