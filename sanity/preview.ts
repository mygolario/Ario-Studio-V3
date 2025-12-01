/**
 * Preview Utilities
 * 
 * Helper functions for handling draft preview mode
 */

import { draftMode } from 'next/headers';
import { sanityPreviewClient, sanityPublicClient } from './client';

/**
 * Get the appropriate client based on draft mode status
 * Returns preview client if draft mode is enabled, otherwise public client
 */
export async function getClient() {
  const { isEnabled } = draftMode();
  
  if (isEnabled) {
    return sanityPreviewClient;
  }
  
  return sanityPublicClient;
}

/**
 * Check if draft mode is currently enabled
 */
export async function isDraftMode() {
  const { isEnabled } = draftMode();
  return isEnabled;
}

