import { Metadata } from "next";
import { getProjectBySlug } from "@/lib/projects-data";
import { notFound } from "next/navigation";
import ProjectDetailsClient from "./ProjectDetailsClient";

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string; locale: string } 
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  const isFa = params.locale === 'fa';
  
  if (!project) {
    return {
      title: isFa ? "پروژه یافت نشد | آریو استودیو" : "Project Not Found | Ario Studio",
    };
  }

  const title = isFa 
    ? `${project.title} | آریو استودیو`
    : `${project.title} | Ario Studio`;
  
  const description = project.description || project.excerpt || 
    (isFa 
      ? `پروژه ${project.title} توسط آریو استودیو`
      : `${project.title} project by Ario Studio`);

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
      images: [
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
      images: [`/projects/${params.slug}/opengraph-image`],
    },
    alternates: {
      canonical: `https://www.ariostudio.net/${params.locale}/projects/${params.slug}`,
      languages: {
        'en': `https://www.ariostudio.net/en/projects/${params.slug}`,
        'fa': `https://www.ariostudio.net/fa/projects/${params.slug}`,
        'x-default': `https://www.ariostudio.net/en/projects/${params.slug}`,
      },
    },
  };
}

export default async function ProjectDetails({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
