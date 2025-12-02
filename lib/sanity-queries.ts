// GROQ queries for fetching data from Sanity

// Projects queries
export const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))] | order(order asc, publishedAt desc) {
  _id,
  title,
  titleFa,
  "slug": slug.current,
  excerpt,
  excerptFa,
  description,
  descriptionFa,
  "coverImageUrl": coverImage.asset->url,
  "thumbnailImageUrl": thumbnailImage.asset->url,
  category,
  client,
  year,
  services,
  gradient,
  publishedAt,
  featured,
  order
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id,
  title,
  titleFa,
  "slug": slug.current,
  excerpt,
  excerptFa,
  description,
  descriptionFa,
  content,
  contentFa,
  "coverImageUrl": coverImage.asset->url,
  "thumbnailImageUrl": thumbnailImage.asset->url,
  category,
  client,
  year,
  services,
  challenge,
  challengeFa,
  solution,
  solutionFa,
  results,
  resultsFa,
  gradient,
  "images": images[].asset->url,
  approachVisuals,
  code,
  publishedAt,
  featured,
  order
}`;

export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true && defined(slug.current) && !(_id in path("drafts.**"))] | order(order asc, publishedAt desc)[0...4] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  description,
  "coverImageUrl": coverImage.asset->url,
  "thumbnailImageUrl": thumbnailImage.asset->url,
  category,
  client,
  year,
  services,
  gradient,
  publishedAt,
  featured,
  order
}`;

// Services queries
export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  titleEn,
  titleFa,
  subtitle,
  subtitleEn,
  subtitleFa,
  description,
  descriptionEn,
  descriptionFa,
  color,
  order,
  icon
}`;

// Homepage query
export const HOMEPAGE_QUERY = `*[_type == "homepage"][0] {
  _id,
  title,
  hero {
    headline {
      en,
      fa
    },
    description {
      en,
      fa
    },
    primaryCTA {
      textEn,
      textFa,
      link
    },
    secondaryCTA {
      textEn,
      textFa,
      link
    }
  },
  about {
    title {
      en,
      fa
    },
    description {
      en,
      fa
    }
  },
  contactCTA {
    headline {
      en,
      fa
    },
    description {
      en,
      fa
    },
    email
  }
}`;

