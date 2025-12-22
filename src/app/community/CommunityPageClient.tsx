"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HubSpotPopup from "../components/HubSpotPopup/HubSpotPopup";
import type {
  CommunityPageData,
  PressRelease,
  BlogPost,
} from "./communityData";

import waveInContact from "@/app/_assets/shared/waves/wave-in-contact.svg";
import waveInCommunity from "@/app/_assets/shared/waves/wave-in-community.svg";
import recordImage from "@/app/_assets/shared/brand/record.png";

type CommunityPageClientProps = {
  data: CommunityPageData;
};

export default function CommunityPageClient({
  data,
}: CommunityPageClientProps) {
  const [isHubSpotPopupOpen, setIsHubSpotPopupOpen] = useState(false);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 8.74%, #4DAAB5 48.82%, #05365F 72.13%)",
      }}
    >
      {/* Hero Section */}
      <HeroSection data={data} />

      {/* Press Section */}
      <PressSection data={data} />

      {/* Blog Section */}
      <BlogSection data={data} />

      {/* Contact Section - sits ON TOP of gradient with its own background */}
      <ContactSection
        data={data}
        onOpenPopup={() => setIsHubSpotPopupOpen(true)}
      />

      <HubSpotPopup
        isOpen={isHubSpotPopupOpen}
        onClose={() => setIsHubSpotPopupOpen(false)}
      />
    </div>
  );
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection({ data }: { data: CommunityPageData }) {
  return (
    <section className="relative min-h-[650px] overflow-hidden px-5 pb-16 pt-[140px] md:px-[100px] md:pt-[160px]">
      {/* Background wave decoration - desktop only */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <Image
          src={waveInCommunity}
          alt=""
          fill
          className="object-cover opacity-30"
          style={{
            transform: "rotate(-30deg) scale(1.5)",
            transformOrigin: "center center",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1088px]">
        {/* Heading and description */}
        <div className="mb-8 flex flex-col gap-3">
          <h1 className="font-heading text-[40px] font-bold uppercase leading-[100%] text-[#05365f] md:text-[59px]">
            {data.hero.heading}
          </h1>
          <p className="max-w-[554px] font-body text-[16px] font-light leading-[1.5] text-[#05365f] md:text-[18px]">
            {data.hero.description}
          </p>
        </div>

        {/* Hero photos strip */}
        <div className="mt-8 flex gap-[2px] overflow-hidden rounded-[5px] border border-[#666]">
          {data.heroPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative h-[200px] flex-1 md:h-[318px]"
              style={{
                flex: index === 3 ? "1.3" : "1",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 270px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PRESS SECTION
// ============================================

function PressSection({ data }: { data: CommunityPageData }) {
  return (
    <section className="px-5 py-16 md:px-[116px] md:py-[60px]">
      <div className="mx-auto max-w-[1055px]">
        {/* Section heading */}
        <h2 className="mb-12 font-heading text-[40px] font-bold uppercase text-[#05365f] md:text-[64px]">
          {data.press.heading}
        </h2>

        {/* 2x2 Grid of press cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-10">
          {data.press.items.map((item) => (
            <PressCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PressCard({ item }: { item: PressRelease }) {
  const CardContent = (
    <div className="group flex flex-col gap-[9px]">
      {/* Image */}
      <div className="relative h-[250px] overflow-hidden rounded-[5px] md:h-[334px]">
        <Image
          src={item.featuredImage}
          alt={item.featuredImageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 514px"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2 pt-2">
        <h3 className="font-body text-[24px] font-semibold leading-[1.3] text-[#05365f] md:text-[36px]">
          {item.title}
        </h3>
        <p className="font-body text-[14px] font-light leading-[1.5] text-[#05365f] md:text-[16px]">
          {item.excerpt}
        </p>
        {item.sourceName && (
          <p className="mt-1 font-body text-[12px] text-[#05365f]/60">
            Source: {item.sourceName}
          </p>
        )}
      </div>
    </div>
  );

  if (item.externalUrl) {
    return (
      <a
        href={item.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-opacity hover:opacity-90"
      >
        {CardContent}
      </a>
    );
  }

  return <div>{CardContent}</div>;
}

// ============================================
// BLOG SECTION
// ============================================

function BlogSection({ data }: { data: CommunityPageData }) {
  // Get featured post (first one or first with featured flag)
  const featuredPost =
    data.blog.items.find((post) => post.featured) || data.blog.items[0];
  // Get secondary posts (exclude featured)
  const secondaryPosts = data.blog.items
    .filter((post) => post.slug !== featuredPost?.slug)
    .slice(0, 2);

  return (
    <section className="px-5 py-16 md:px-[116px] md:py-[60px]">
      <div className="mx-auto max-w-[1084px]">
        {/* Section header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-[40px] font-bold uppercase text-white md:text-[64px]">
            {data.blog.heading}
          </h2>
          <Link
            href={data.blog.seeAllLink}
            className="font-body text-[16px] font-semibold text-white underline transition-opacity hover:opacity-80 md:text-[24px]"
          >
            {data.blog.seeAllText}
          </Link>
        </div>

        {/* Blog cards container */}
        <div className="flex flex-col gap-3 rounded-[5px] shadow-lg md:flex-row">
          {/* Featured (large) blog card - takes full width if no secondary posts */}
          {featuredPost && (
            <div className={secondaryPosts.length > 0 ? "flex-[1.8]" : "w-full"}>
              <BlogCardLarge post={featuredPost} />
            </div>
          )}

          {/* Secondary (small) blog cards - only show if there are any */}
          {secondaryPosts.length > 0 && (
            <div className="flex flex-1 flex-col gap-3">
              {secondaryPosts.map((post) => (
                <BlogCardSmall key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BlogCardLarge({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/community/blog/${post.slug}`}
      className="group block h-full overflow-hidden rounded-[5px] bg-transparent p-5 pb-10"
    >
      <div className="flex h-full flex-col gap-5">
        {/* Image */}
        <div className="relative h-[300px] overflow-hidden rounded-[5px] md:h-[502px]">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 642px"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="font-body text-[14px] font-semibold text-white md:text-[16px]">
              {post.formattedDate}
            </p>
            <h3 className="font-body text-[24px] font-semibold leading-[1.2] text-white md:text-[36px]">
              {post.title}
            </h3>
          </div>
          <p className="font-body text-[14px] font-normal leading-[1.5] text-white md:text-[16px]">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}

function BlogCardSmall({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/community/blog/${post.slug}`}
      className="group block overflow-hidden rounded-[5px] bg-transparent p-5 pb-10"
    >
      <div className="flex flex-col gap-5">
        {/* Image */}
        <div className="relative h-[180px] overflow-hidden rounded-[5px] md:h-[235px]">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 341px"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-1">
          <p className="font-body text-[14px] font-semibold text-white md:text-[16px]">
            {post.formattedDate}
          </p>
          <h3 className="font-body text-[24px] font-semibold leading-[1.2] text-white md:text-[36px]">
            {post.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

// ============================================
// CONTACT SECTION
// ============================================

function ContactSection({
  data,
  onOpenPopup,
}: {
  data: CommunityPageData;
  onOpenPopup: () => void;
}) {
  return (
    <section
      className="relative overflow-hidden py-[80px] md:h-[55vh] md:py-0"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #97EFF1 68.05%)",
      }}
    >
      {/* Background wave */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image src={waveInContact} alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-start px-5 md:px-[124px]">
        <div className="flex max-w-[657px] flex-col gap-[18px]">
          <h2 className="font-heading text-[36px] font-bold uppercase leading-[100%] text-[#05365f] md:text-[64px]">
            {data.contact.heading}
          </h2>
          <p className="font-body text-[16px] leading-normal text-[#05365f] md:text-[20px]">
            {data.contact.description}
          </p>
          <button
            onClick={onOpenPopup}
            className="relative z-10 mt-2 flex h-[58px] w-[310px] items-center justify-center rounded-[5px] bg-[#05365f] font-heading text-[20px] text-white transition-opacity hover:opacity-90 md:text-[22px]"
          >
            {data.contact.ctaText}
          </button>
        </div>

        {/* Decorative record image */}
        <div className="absolute right-[-150px] top-[100%] hidden h-[750px] w-[750px] -translate-y-1/2 md:block">
          <Image
            src={recordImage}
            alt="Vinyl record"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
