import { fetchBlogPostBySlug, getAssetUrl, getAssetAlt } from "@/lib/contentful";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import { getStaticBlogPost } from "../staticBlogPosts";
import laurieImage from "@/app/_assets/community/blog/Laurie.png";

export const revalidate = 3600; // 1 hour

// Map of static image slugs to their imports
const staticImages: Record<string, string> = {
  "a-collaborative-journey-with-prof-laurie-achin": laurieImage.src,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  // Try Contentful first
  const post = await fetchBlogPostBySlug(slug);

  if (post) {
    // Transform Contentful data
    const transformedPost = {
      title: post.title,
      excerpt: post.excerpt,
      publicationDate: post.publicationDate,
      authorName: post.authorName,
      body: post.body,
      featuredImageUrl: getAssetUrl(post.featuredImage),
      featuredImageAlt: getAssetAlt(post.featuredImage) || post.title,
    };
    return <BlogPostClient post={transformedPost} />;
  }

  // Try static fallback
  const staticPost = getStaticBlogPost(slug);
  
  if (staticPost) {
    const transformedPost = {
      title: staticPost.title,
      excerpt: staticPost.excerpt,
      publicationDate: staticPost.publicationDate,
      authorName: staticPost.authorName,
      body: staticPost.body,
      featuredImageUrl: staticImages[slug] || staticPost.featuredImageUrl,
      featuredImageAlt: staticPost.featuredImageAlt,
    };
    return <BlogPostClient post={transformedPost} />;
  }

  // Neither found
  notFound();
}
