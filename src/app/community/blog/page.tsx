import { fetchBlogPosts, getAssetUrl, getAssetAlt } from "@/lib/contentful";
import BlogListClient from "./BlogListClient";

export const revalidate = 3600; // 1 hour

export default async function BlogListPage() {
  const posts = await fetchBlogPosts();

  // Transform data on server before passing to client
  const transformedPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publicationDate: post.publicationDate,
    authorName: post.authorName,
    featuredImageUrl: getAssetUrl(post.featuredImage),
    featuredImageAlt: getAssetAlt(post.featuredImage) || post.title,
    featured: post.featured,
    category: post.category,
  }));

  return <BlogListClient posts={transformedPosts} />;
}

