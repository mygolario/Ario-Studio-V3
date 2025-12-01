/**
 * Sanity Image Helper
 * 
 * Utility function for generating optimized image URLs from Sanity image sources.
 * Uses @sanity/image-url to build responsive, optimized image URLs.
 */

import imageUrlBuilder from '@sanity/image-url';
import { sanityPublicClient } from './client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(sanityPublicClient);

/**
 * Generates an optimized image URL from a Sanity image source
 * 
 * @param source - Sanity image source (from a document field)
 * @returns Image URL builder instance with chainable methods
 * 
 * @example
 * ```ts
 * const imageUrl = urlFor(imageField).width(800).height(600).url();
 * ```
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
