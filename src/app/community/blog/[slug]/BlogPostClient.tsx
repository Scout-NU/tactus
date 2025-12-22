"use client";

import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Block, Inline } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";

type BlogPostClientProps = {
  post: {
    title: string;
    excerpt: string;
    publicationDate: string;
    authorName?: string;
    body: Document;
    featuredImageUrl: string | null;
    featuredImageAlt: string;
  };
};

// Rich text rendering options
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
      <p className="mb-4 font-body text-[16px] leading-[1.8] text-[#333] md:text-[18px]">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => (
      <h1 className="mb-6 mt-8 font-heading text-[32px] font-bold text-[#05365f] md:text-[48px]">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => (
      <h2 className="mb-4 mt-6 font-heading text-[28px] font-bold text-[#05365f] md:text-[36px]">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => (
      <h3 className="mb-3 mt-5 font-heading text-[24px] font-semibold text-[#05365f] md:text-[28px]">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node: Block | Inline, children: React.ReactNode) => (
      <h4 className="mb-3 mt-4 font-heading text-[20px] font-semibold text-[#05365f] md:text-[24px]">
        {children}
      </h4>
    ),
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 font-body text-[16px] text-[#333] md:text-[18px]">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 font-body text-[16px] text-[#333] md:text-[18px]">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => (
      <li>{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: Block | Inline, children: React.ReactNode) => (
      <blockquote className="my-6 border-l-4 border-[#4DAAB5] pl-4 italic text-[#555]">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-[#eee]" />,
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={(node.data as { uri?: string }).uri || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#4DAAB5] underline hover:text-[#05365f]"
      >
        {children}
      </a>
    ),
  },
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

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section with featured image */}
      <div className="relative h-[300px] w-full md:h-[500px]">
        {post.featuredImageUrl && (
          <Image
            src={post.featuredImageUrl}
            alt={post.featuredImageAlt}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <article className="mx-auto max-w-[800px] px-5 py-12 md:px-8">
        {/* Back link */}
        <Link
          href="/community"
          className="mb-8 inline-flex items-center gap-2 font-body text-[14px] text-[#4DAAB5] transition-colors hover:text-[#05365f]"
        >
          ← Back to Community
        </Link>

        {/* Meta info */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-body text-[14px] text-[#666]">
            {formatDate(post.publicationDate)}
          </span>
          {post.authorName && (
            <>
              <span className="text-[#ccc]">•</span>
              <span className="font-body text-[14px] text-[#666]">
                {post.authorName}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-6 font-heading text-[32px] font-bold leading-[1.2] text-[#05365f] md:text-[48px]">
          {post.title}
        </h1>

        {/* Excerpt as lead paragraph */}
        <p className="mb-8 font-body text-[18px] font-light leading-[1.6] text-[#555] md:text-[20px]">
          {post.excerpt}
        </p>

        <hr className="mb-8 border-[#eee]" />

        {/* Body - Rich Text from Contentful */}
        <div className="prose-tactus">
          {documentToReactComponents(post.body, richTextOptions)}
        </div>

        {/* Back to community link at bottom */}
        <div className="mt-12 border-t border-[#eee] pt-8">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 rounded-[5px] bg-[#05365f] px-6 py-3 font-heading text-[16px] text-white transition-opacity hover:opacity-90"
          >
            ← Back to Community
          </Link>
        </div>
      </article>
    </div>
  );
}
