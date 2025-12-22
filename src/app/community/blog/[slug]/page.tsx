import { fetchBlogPostBySlug, getAssetUrl, getAssetAlt } from "@/lib/contentful";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export const revalidate = 3600; // 1 hour

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Transform data on server before passing to client
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
