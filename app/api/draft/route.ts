import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const type = searchParams.get('type') || 'project';

  // Validate the secret token
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  // Enable Draft Mode
  draftMode().enable();

  // Determine the redirect path based on type and slug
  let path = '/';
  if (type === 'project' && slug) {
    path = `/projects/${slug}`;
  } else if (type === 'blog' && slug) {
    path = `/blog/${slug}`;
  } else if (slug) {
    // Generic slug handling
    path = `/${slug}`;
  }

  // Redirect to the path with draft mode enabled
  redirect(path);
}
