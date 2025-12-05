import { sanityClient } from "./sanity";
import { HOMEPAGE_QUERY } from "./sanity-queries";

export type HomepageContent = {
  hero?: {
    headline?: { en?: string; fa?: string };
    description?: { en?: string; fa?: string };
    primaryCTA?: { textEn?: string; textFa?: string; link?: string };
    secondaryCTA?: { textEn?: string; textFa?: string; link?: string };
  };
  about?: {
    title?: { en?: string; fa?: string };
    description?: { en?: any[]; fa?: any[] };
  };
  contactCTA?: {
    headline?: { en?: string; fa?: string };
    description?: { en?: string; fa?: string };
    email?: string;
  };
};

/**
 * Get homepage content from Sanity
 * Returns null if no content is found (components will use defaults)
 */
export async function getHomepageContent(): Promise<HomepageContent | null> {
  try {
    const homepage = await sanityClient.fetch<HomepageContent>(HOMEPAGE_QUERY);
    return homepage || null;
  } catch (error) {
    console.error('[getHomepageContent] Error fetching from Sanity:', error);
    return null;
  }
}

