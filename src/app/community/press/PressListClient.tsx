"use client";

import Image from "next/image";
import Link from "next/link";

type PressReleaseSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publicationDate: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string;
  externalUrl?: string;
  sourceName?: string;
};

type PressListClientProps = {
  releases: PressReleaseSummary[];
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

export default function PressListClient({ releases }: PressListClientProps) {
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
            PRESS
          </h1>
          <p className="mt-3 max-w-[500px] font-body text-[15px] leading-[1.6] text-white/80 md:text-[16px]">
            News, features, and media coverage about Tactus
          </p>
        </div>
      </div>

      {/* Press releases grid */}
      <div className="px-5 py-12 md:px-[100px] md:py-16">
        <div className="mx-auto max-w-[1200px]">
          {releases.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-body text-[15px] text-[#666]">
                No press releases yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {releases.map((release) => {
                const CardContent = (
                  <div className="group flex h-full flex-col overflow-hidden rounded-[8px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    {/* Image */}
                    <div className="relative h-[200px] w-full overflow-hidden md:h-[240px]">
                      {release.featuredImageUrl ? (
                        <Image
                          src={release.featuredImageUrl}
                          alt={release.featuredImageAlt}
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
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      {/* Meta */}
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-body text-[11px] text-[#888]">
                          {formatDate(release.publicationDate)}
                        </span>
                        {release.sourceName && (
                          <>
                            <span className="text-[#ddd]">•</span>
                            <span className="font-body text-[11px] font-medium text-[#4DAAB5]">
                              {release.sourceName}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="mb-2 font-heading text-[18px] font-bold leading-[1.3] text-[#05365f] transition-colors group-hover:text-[#4DAAB5] md:text-[20px]">
                        {release.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="mb-3 line-clamp-3 flex-1 font-body text-[13px] leading-[1.6] text-[#666]">
                        {release.excerpt}
                      </p>

                      {/* External link indicator */}
                      {release.externalUrl && (
                        <div className="mt-auto flex items-center gap-1 font-body text-[12px] font-semibold text-[#4DAAB5]">
                          Read article
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                );

                // If there's an external URL, wrap in anchor tag
                if (release.externalUrl) {
                  return (
                    <a
                      key={release.slug}
                      href={release.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {CardContent}
                    </a>
                  );
                }

                // Otherwise just render the card
                return <div key={release.slug}>{CardContent}</div>;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

