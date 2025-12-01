import { Metadata } from "next";
import { getProjectBySlug, getAllProjectSlugs } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { Suspense } from "react";
import { PreviewProvider } from "@/sanity/PreviewProvider";
import { PreviewProject } from "./PreviewProject";
import ProjectDetailsClient from "./ProjectDetailsClient";

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const project = await getProjectBySlug(params.slug, isEnabled);
  const isFa = params.locale === "fa";

  if (!project) {
    return {
      title: isFa ? "پروژه یافت نشد | آریو استودیو" : "Project Not Found | Ario Studio",
    };
  }

  const title = isFa ? `${project.title} | آریو استودیو` : `${project.title} | Ario Studio`;

  const description = project.summary || (isFa ? `پروژه ${project.title} توسط آریو استودیو` : `${project.title} project by Ario Studio`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.ariostudio.net/${params.locale}/projects/${params.slug}`,
      type: "website",
      locale: isFa ? "fa_IR" : "en_US",
      siteName: isFa ? "آریو استودیو" : "Ario Studio",
      images: project.thumbnail
        ? [
            {
              url: project.thumbnail,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : [
            {
              url: `/projects/${params.slug}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.thumbnail ? [project.thumbnail] : [`/projects/${params.slug}/opengraph-image`],
    },
    alternates: {
      canonical: `https://www.ariostudio.net/${params.locale}/projects/${params.slug}`,
      languages: {
        en: `https://www.ariostudio.net/en/projects/${params.slug}`,
        fa: `https://www.ariostudio.net/fa/projects/${params.slug}`,
        "x-default": `https://www.ariostudio.net/fa/projects/${params.slug}`,
      },
    },
  };
}

export default async function ProjectDetails({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { isEnabled } = draftMode();
  const project = await getProjectBySlug(params.slug, isEnabled);

  if (!project) {
    notFound();
  }

  // If draft mode is enabled, use preview component with live query
  if (isEnabled) {
    const token = process.env.SANITY_API_READ_TOKEN;
    if (!token) {
      throw new Error('Missing SANITY_API_READ_TOKEN for preview mode');
    }
    
    return (
      <PreviewProvider token={token}>
        <Suspense fallback={<div className="pt-20"><div className="container mx-auto px-4"><p>Loading preview...</p></div></div>}>
          <PreviewProject project={project} slug={params.slug} />
        </Suspense>
      </PreviewProvider>
    );
  }

  // Normal published content
  return <ProjectDetailsClient project={project} />;
}
