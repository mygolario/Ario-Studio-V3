/**
 * Preview URL Helper
 * 
 * Generates preview URLs for Sanity Studio documents
 */

const previewUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const previewSecret = process.env.SANITY_PREVIEW_SECRET || '';

export function buildPreviewUrl(doc: { _type?: string; slug?: { current?: string } }): string {
  const slug = doc?.slug?.current;
  const type = doc?._type;

  if (!slug) return `${previewUrl}/`;

  let path = '/';
  if (type === 'project') {
    path = `/projects/${slug}`;
  } else if (type === 'blogPost') {
    path = `/blog/${slug}`;
  }

  return `${previewUrl}/api/draft?secret=${previewSecret}&slug=${slug}&type=${type}`;
}

