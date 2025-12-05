// Debug utility to test Sanity connection
import { sanityClient } from "./sanity";

export async function debugSanityProjects() {
  try {
    // Simple query to get all projects (including drafts for debugging)
    const allProjects = await sanityClient.fetch(`*[_type == "project"] {
      _id,
      title,
      "slug": slug.current,
      "isDraft": _id match "drafts.*",
      publishedAt
    }`);
    
    console.log('=== SANITY DEBUG ===');
    console.log('Total projects found:', allProjects?.length || 0);
    console.log('Projects:', JSON.stringify(allProjects, null, 2));
    
    // Check published projects only
    const publishedProjects = await sanityClient.fetch(`*[_type == "project" && !(_id in path("drafts.**"))] {
      _id,
      title,
      "slug": slug.current,
      publishedAt
    }`);
    
    console.log('Published projects:', publishedProjects?.length || 0);
    console.log('Published:', JSON.stringify(publishedProjects, null, 2));
    
    return { allProjects, publishedProjects };
  } catch (error) {
    console.error('Sanity debug error:', error);
    return null;
  }
}

