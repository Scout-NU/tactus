"use client";

import Image from "next/image";
import Link from "next/link";

type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publicationDate: string;
  authorName?: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string;
  featured?: boolean;
  category?: string;
};

type BlogListClientProps = {
  posts: BlogPostSummary[];
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatted = date.toLocaleDateString("en-US", options);
  const day = date.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
          ? "rd"
          : "th";
  return formatted.replace(/\d+,/, `${day}${suffix},`);
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero section - solid dark blue */}
      <div className="bg-[#05365F] px-5 pb-16 pt-[140px] md:px-[100px] md:pb-20 md:pt-[180px]">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/community"
            className="mb-4 inline-flex items-center gap-2 font-body text-[13px] text-white/70 transition-colors hover:text-white"
          >
            ← Back to Community
          </Link>
          <h1 className="font-heading text-[36px] font-bold leading-[1.1] text-white md:text-[56px]">
            BLOG
          </h1>
          <p className="mt-3 max-w-[500px] font-body text-[15px] leading-[1.6] text-white/80 md:text-[16px]">
            Stories, insights, and updates from the Tactus community
          </p>
        </div>
      </div>

      {/* Blog posts grid */}
      <div className="px-5 py-12 md:px-[100px] md:py-16">
        <div className="mx-auto max-w-[1200px]">
          {posts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-body text-[15px] text-[#666]">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/community/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-[8px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative h-[180px] w-full overflow-hidden">
                    {post.featuredImageUrl ? (
                      <Image
                        src={post.featuredImageUrl}
                        alt={post.featuredImageAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#05365F]">
                        <span className="font-heading text-[20px] text-white/30">
                          TACTUS
                        </span>
                      </div>
                    )}
                    {post.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#4DAAB5] px-2.5 py-0.5 font-body text-[11px] font-semibold text-white">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Meta */}
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-body text-[11px] text-[#888]">
                        {formatDate(post.publicationDate)}
                      </span>
                      {post.category && (
                        <>
                          <span className="text-[#ddd]">•</span>
                          <span className="font-body text-[11px] font-medium text-[#4DAAB5]">
                            {post.category}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="mb-2 font-heading text-[16px] font-bold leading-[1.3] text-[#05365f] transition-colors group-hover:text-[#4DAAB5] md:text-[17px]">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mb-3 line-clamp-2 font-body text-[13px] leading-[1.6] text-[#666]">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    {post.authorName && (
                      <p className="font-body text-[11px] text-[#999]">
                        By {post.authorName}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
