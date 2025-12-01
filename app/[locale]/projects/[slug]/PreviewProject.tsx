'use client';

import { useLiveQuery } from 'next-sanity/preview';
import { getProjectBySlug } from '@/sanity/queries';
import ProjectDetailsClient from './ProjectDetailsClient';
import type { ProjectDetail } from '@/sanity/queries';

type PreviewProjectProps = {
  project: ProjectDetail | null;
  slug: string;
};

export function PreviewProject({ project: initialProject, slug }: PreviewProjectProps) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    clientName,
    industry,
    summary,
    "thumbnail": thumbnail.asset->url,
    liveUrl,
    orderRank,
    problem,
    solution,
    result
  }`;
  
  const [project] = useLiveQuery(initialProject, query, { slug });

  if (!project) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4">
          <p className="text-text-muted-custom">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 p-3 bg-yellow-500/10 border-b border-yellow-500/20 text-sm text-yellow-600 dark:text-yellow-400 text-center">
        🔴 Draft Mode: You are viewing unpublished content
      </div>
      <ProjectDetailsClient project={project} />
    </>
  );
}

