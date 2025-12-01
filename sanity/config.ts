/**
 * Sanity Configuration
 * 
 * This file exports the core Sanity configuration values
 * used throughout the application.
 */

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
} as const;

// Validate required environment variables
if (!sanityConfig.projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
}

if (!sanityConfig.dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET');
}
