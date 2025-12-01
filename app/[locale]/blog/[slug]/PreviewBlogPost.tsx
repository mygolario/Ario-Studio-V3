'use client';

import { useLiveQuery } from 'next-sanity/preview';
import { getBlogPostBySlug } from '@/sanity/queries';
import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { Container } from '@/components/ui/Container';
import { urlFor } from '@/sanity/image';
import type { BlogPost } from '@/sanity/queries';

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

type PreviewBlogPostProps = {
  post: BlogPost | null;
  slug: string;
};

export function PreviewBlogPost({ post: initialPost, slug }: PreviewBlogPostProps) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt,
    content,
    author,
    tags,
    categories
  }`;
  
  const [post] = useLiveQuery(initialPost, query, { slug });

  if (!post) {
    return (
      <div className="pt-20 pb-16">
        <Container className="max-w-4xl">
          <p className="text-text-muted-custom">Post not found</p>
        </Container>
      </div>
    );
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="pt-20 pb-16">
      <Container className="max-w-4xl">
        {/* Draft Mode Banner */}
        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm text-yellow-600 dark:text-yellow-400">
          🔴 Draft Mode: You are viewing unpublished content
        </div>

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

