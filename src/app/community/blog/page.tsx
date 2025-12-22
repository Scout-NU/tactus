import { fetchBlogPosts, getAssetUrl, getAssetAlt } from "@/lib/contentful";
import BlogListClient from "./BlogListClient";
import laurieImage from "@/app/_assets/community/blog/Laurie.png";

export const revalidate = 3600; // 1 hour

// Static fallback blog posts (always shown unless duplicated in Contentful)
const STATIC_BLOG_POSTS = [
  {
    slug: "a-collaborative-journey-with-prof-laurie-achin",
    title: "A Collaborative Journey With Prof. Laurie Achin",
    excerpt:
      "The Deaf Music Enthusiast that started it all. In our pursuit of making music accessible and inclusive for the Deaf community, we embarked on an inspiring collaboration with Prof. Laurie Achin.",
    publicationDate: "2023-06-22",
    authorName: "Tactus Team",
    featuredImageUrl: laurieImage.src,
    featuredImageAlt: "Prof. Laurie Achin",
    featured: true,
  },
];

export default async function BlogListPage() {
  const posts = await fetchBlogPosts();

  // Transform Contentful posts
  const contentfulPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publicationDate: post.publicationDate,
    authorName: post.authorName,
    featuredImageUrl: getAssetUrl(post.featuredImage),
    featuredImageAlt: getAssetAlt(post.featuredImage) || post.title,
    featured: post.featured,
  }));

  // Get slugs of Contentful posts to avoid duplicates
  const contentfulSlugs = new Set(contentfulPosts.map((p) => p.slug));

  // Add static posts that aren't already in Contentful
  const staticPostsToAdd = STATIC_BLOG_POSTS.filter(
    (post) => !contentfulSlugs.has(post.slug)
  );

  // Merge: Contentful posts first (sorted by date), then static fallbacks
  const allPosts = [...contentfulPosts, ...staticPostsToAdd].sort(
    (a, b) =>
      new Date(b.publicationDate).getTime() -
      new Date(a.publicationDate).getTime()
  );

  return <BlogListClient posts={allPosts} />;
}
