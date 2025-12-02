import { Metadata } from "next";
import { getAllProjects } from "@/lib/projects-data";
import ProjectsClient from "./ProjectsClient";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isFa = locale === 'fa';
  
  return {
    title: isFa 
      ? "پروژه‌ها | آریو استودیو" 
      : "Projects | Ario Studio",
    description: isFa
      ? "نمونه کارهای آریو استودیو: تجربه‌های دیجیتال سینمایی و آینده‌نگرانه برای برندهای پیشرو. مشاهده پروژه‌های ما در طراحی وب، اپلیکیشن و برندینگ."
      : "Ario Studio portfolio: cinematic, future-ready digital experiences for forward-thinking brands. View our projects in web design, applications, and branding.",
    openGraph: {
      title: isFa 
        ? "پروژه‌ها | آریو استودیو" 
        : "Projects | Ario Studio",
      description: isFa
        ? "نمونه کارهای آریو استودیو: تجربه‌های دیجیتال سینمایی و آینده‌نگرانه."
        : "Ario Studio portfolio: cinematic, future-ready digital experiences.",
      url: `https://www.ariostudio.net/${locale}/projects`,
      type: "website",
      locale: isFa ? "fa_IR" : "en_US",
      siteName: isFa ? "آریو استودیو" : "Ario Studio",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: isFa ? "پروژه‌های آریو استودیو" : "Ario Studio Projects",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFa ? "پروژه‌ها | آریو استودیو" : "Projects | Ario Studio",
      description: isFa
        ? "نمونه کارهای آریو استودیو: تجربه‌های دیجیتال سینمایی و آینده‌نگرانه."
        : "Ario Studio portfolio: cinematic, future-ready digital experiences.",
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: `https://www.ariostudio.net/${locale}/projects`,
      languages: {
        'en': 'https://www.ariostudio.net/en/projects',
        'fa': 'https://www.ariostudio.net/fa/projects',
        'x-default': 'https://www.ariostudio.net/fa/projects',
      },
    },
  };
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsClient projects={projects} />;
}
