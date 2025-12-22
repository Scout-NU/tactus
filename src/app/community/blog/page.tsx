import { fetchBlogPosts, getAssetUrl, getAssetAlt } from "@/lib/contentful";
import BlogListClient from "./BlogListClient";
import laurieImage from "@/app/_assets/community/blog/Laurie.png";

export const revalidate = 3600; // 1 hour

// Static fallback blog posts
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

  // Use Contentful data if available, otherwise use static fallbacks
  const transformedPosts =
    posts.length > 0
      ? posts.map((post) => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          publicationDate: post.publicationDate,
          authorName: post.authorName,
          featuredImageUrl: getAssetUrl(post.featuredImage),
          featuredImageAlt: getAssetAlt(post.featuredImage) || post.title,
          featured: post.featured,
        }))
      : STATIC_BLOG_POSTS;

  return <BlogListClient posts={transformedPosts} />;
}
