# Test Queries for Sanity Vision

Copy and paste these queries into the Vision tool to test your Sanity setup.

## 1. Test if projects exist (simple)
```
*[_type == "project"]{ _id, title, "slug": slug.current }
```

## 2. Test published projects only
```
*[_type == "project" && !(_id in path("drafts.**"))]{ _id, title, "slug": slug.current }
```

## 3. Test projects with slug (what the website uses)
```
*[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))] | order(order asc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  description,
  category
}
```

## 4. Full project query (matches website query)
```
*[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))] | order(order asc, publishedAt desc) {
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
  challenge,
  solution,
  results,
  gradient,
  "images": images[].asset->url,
  approachVisuals,
  publishedAt,
  featured,
  order
}
```

## 5. Test services
```
*[_type == "service"] | order(order asc) {
  _id,
  title,
  titleEn,
  titleFa,
  subtitle,
  description,
  color,
  order
}
```

## Important Notes:
- Make sure to change the PERSPECTIVE dropdown from "Drafts" to "Published" to see published content
- If you see empty results `[]`, it means no published documents exist yet
- Drafts have `_id` starting with `drafts.` - these are filtered out by the queries

