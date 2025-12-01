/**
 * Sanity Client
 * 
 * This file exports the Sanity client instances for fetching data.
 * - sanityClient: Server-side client with token for authenticated requests
 * - sanityPublicClient: Public client without token, using CDN for published content
 * - sanityPreviewClient: Preview client for draft content (used in draft mode)
 */

import { createClient, type ClientConfig } from '@sanity/client';
import { sanityConfig } from './config';

/**
 * Server-side Sanity client with authentication token
 * Use this for server components and API routes that need access to draft content
 */
export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: false, // Never use CDN for authenticated requests
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
} satisfies ClientConfig);

/**
 * Preview client for fetching draft content
 * Use this when draftMode is enabled
 */
export const sanityPreviewClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: false, // Never use CDN for preview content
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
} satisfies ClientConfig);

/**
 * Public Sanity client without authentication token
 * Use this for public, published content with CDN caching enabled
 */
export const sanityPublicClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: true, // Use CDN for public content
  perspective: 'published',
} satisfies ClientConfig);
