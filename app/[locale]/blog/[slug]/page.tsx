import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPostSlugs } from "@/sanity/queries";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Container } from "@/components/ui/Container";
import { urlFor } from "@/sanity/image";
import { draftMode } from "next/headers";
import { Suspense } from "react";
import { PreviewBlogPost } from "./PreviewBlogPost";
import { PreviewProvider } from "@/sanity/PreviewProvider";

// Portable Text components configuration
const portableTextComponents: Partial<PortableTextComponents> = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Blog post image"}
            width={1200}
            height={630}
            className="rounded-lg w-full h-auto"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: any) => {
      if (!value?.href) return <>{children}</>;
      return (
        <a
          href={value.href}
          className="text-accent-purple hover:text-accent-blue underline"
          target={value.href.startsWith("http") ? "_blank" : undefined}
          rel={value.href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
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
  const post = await getBlogPostBySlug(params.slug, isEnabled);
  const isFa = params.locale === "fa";

  if (!post) {
    return {
      title: isFa ? "مقاله یافت نشد | آریو استودیو" : "Post Not Found | Ario Studio",
    };
  }

  const title = isFa ? `${post.title} | آریو استودیو` : `${post.title} | Ario Studio`;

  return {
    title,
    description: post.excerpt || "",
    openGraph: {
      title,
      description: post.excerpt || "",
      url: `https://www.ariostudio.net/${params.locale}/blog/${params.slug}`,
      type: "article",
      locale: isFa ? "fa_IR" : "en_US",
      siteName: isFa ? "آریو استودیو" : "Ario Studio",
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt || "",
      images: post.coverImage ? [post.coverImage] : [],
    },
    alternates: {
      canonical: `https://www.ariostudio.net/${params.locale}/blog/${params.slug}`,
      languages: {
        en: `https://www.ariostudio.net/en/blog/${params.slug}`,
        fa: `https://www.ariostudio.net/fa/blog/${params.slug}`,
        "x-default": `https://www.ariostudio.net/fa/blog/${params.slug}`,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { isEnabled } = draftMode();
  const post = await getBlogPostBySlug(params.slug, isEnabled);

  if (!post) {
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
        <Suspense fallback={<div className="pt-20 pb-16"><Container className="max-w-4xl"><p>Loading preview...</p></Container></div>}>
          <PreviewBlogPost post={post} slug={params.slug} />
        </Suspense>
      </PreviewProvider>
    );
  }

  // Normal published content
  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="pt-20 pb-16">
      <Container className="max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-main mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-text-muted-custom mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted-custom">
            <time dateTime={post.publishedAt}>{publishedDate}</time>
            {post.author && (
              <>
                <span>•</span>
                <span>By {post.author}</span>
              </>
            )}
            {post.tags && post.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </div>
        )}

        {/* Content */}
        {post.content && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>
        )}
      </Container>
    </article>
  );
}
