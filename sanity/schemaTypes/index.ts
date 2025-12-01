/**
 * Sanity Schema Types
 * 
 * This file exports all schema type definitions for the Sanity Studio.
 * Import this array in sanity.config.ts to register all schemas.
 */

import { service } from './service';
import { project } from './project';
import { testimonial } from './testimonial';
import { blogPost } from './blogPost';
import { siteSettings } from './siteSettings';

export const schemaTypes = [
  service,
  project,
  testimonial,
  blogPost,
  siteSettings,
];

