'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity/sanity.config';

// Note: Route segment config (dynamic, revalidate) cannot be exported from client components
// However, the Studio route will be dynamic by default since it's a client component
// that requires server-side rendering for the initial load

export default function StudioPage() {
  return <NextStudio config={config} />;
}
