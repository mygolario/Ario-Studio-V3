import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

// Mock blog post data - replace with actual static data if needed
const mockBlogPosts: Array<{
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: string;
  publishedAt: string;
  tags?: string[];
}> = [
  {
    slug: "example-post",
    title: "Example Blog Post",
    excerpt: "This is an example blog post. Replace with actual static content.",
    content: "<p>Blog content goes here. This is a placeholder.</p>",
    publishedAt: new Date().toISOString(),
    tags: ["example"],
  },
];

function getBlogPostBySlug(slug: string) {
  return mockBlogPosts.find((post) => post.slug === slug) || null;
}

function getAllBlogPostSlugs() {
  return mockBlogPosts.map((post) => ({ slug: post.slug }));
}


export function generateStaticParams() {
  const slugs = getAllBlogPostSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Metadata {
  const post = getBlogPostBySlug(params.slug);
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

export default function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

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
          <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
      </Container>
    </article>
  );
}
