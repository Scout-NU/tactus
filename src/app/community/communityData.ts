import type { StaticImageData } from "next/image";
import {
  fetchPressReleases,
  fetchBlogPosts,
  getAssetUrl,
  getAssetAlt,
} from "@/lib/contentful";

// Community hero images
import communityImage1 from "@/app/_assets/community/community-image-1.jpg";
import communityImage2 from "@/app/_assets/community/community-image-2.jpg";
import communityImage3 from "@/app/_assets/community/community-image-3.jpg";
import communityImage4 from "@/app/_assets/community/community-image-4.jpg";

// Press release images
import JeremyChow from "@/app/_assets/community/press/jeremy-chow.jpg";
import DTTP from "@/app/_assets/community/press/DTTP.jpeg";
import Bostinno from "@/app/_assets/community/press/Bostinno.jpg";
import FashionUnited from "@/app/_assets/community/press/FashionUnited.avif";

// Blog fallback image
import mission1 from "@/app/_assets/about/mission/jeremy-with-community.jpg";
import laurieImage from "@/app/_assets/community/blog/Laurie.png";

// ============================================
// TYPES
// ============================================

export type HeroPhoto = {
  src: StaticImageData | string;
  alt: string;
};

export type PressRelease = {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: StaticImageData | string;
  featuredImageAlt: string;
  publicationDate: string;
  externalUrl?: string;
  sourceName?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: StaticImageData | string;
  featuredImageAlt: string;
  publicationDate: string;
  formattedDate: string;
  authorName?: string;
  featured?: boolean;
};

export type CommunityPageData = {
  hero: {
    heading: string;
    description: string;
  };
  heroPhotos: HeroPhoto[];
  press: {
    heading: string;
    items: PressRelease[];
  };
  blog: {
    heading: string;
    seeAllText: string;
    seeAllLink: string;
    items: BlogPost[];
  };
  contact: {
    heading: string;
    description: string;
    ctaText: string;
  };
};

// ============================================
// STATIC FALLBACK CONTENT
// ============================================

const STATIC_CONTENT = {
  hero: {
    heading: "BE PART OF THE TACTUS COMMUNITY",
    description:
      "Share your experiences with other members of the community and help us improve our product to better fit your needs.",
  },
  press: {
    heading: "PRESS",
  },
  blog: {
    heading: "BLOG",
    seeAllText: "See all blogs →",
    seeAllLink: "/community/blog",
  },
  contact: {
    heading: "DON'T MISS A BEAT",
    description:
      "Stay connected for early access to news from the Tactus team.",
    ctaText: "STAY IN TOUCH",
  },
} as const;

const STATIC_HERO_PHOTOS: HeroPhoto[] = [
  { src: communityImage1, alt: "Tactus community member" },
  { src: communityImage2, alt: "Tactus community event" },
  { src: communityImage3, alt: "Tactus community gathering" },
  { src: communityImage4, alt: "Tactus at Deaflympics" },
];

const STATIC_PRESS_RELEASES: PressRelease[] = [
  {
    slug: "tactus-cic-2025",
    title: "Bringing Music to Life Through Touch: A Conversation with Tactus Founder Jeremy Chow",
    excerpt:
      "Meet Jeremy Chow, founder of Tactus, a startup redefining how deaf and hard-of-hearing individuals experience music through wearable technology.",
    featuredImage: JeremyChow,
    featuredImageAlt: "Jeremy Chow",
    publicationDate: "2025-11-03",
    externalUrl: "https://cic.com/blog/bringing-music-to-life-through-touch-a-conversation-with-tactus-founder-jeremy-chow/",
    sourceName: "CIC",
  },
  {
    slug: "tactus-fashion-united",
    title: "How Tactus Makes Music Accessible",
    excerpt:
      "FashionUnited explores how Tactus is revolutionizing the way Deaf and hard of hearing individuals experience music through wearable technology.",
    featuredImage: FashionUnited,
    featuredImageAlt: "Tactus fashion article",
    publicationDate: "2023-03-14",
    externalUrl:
      "https://fashionunited.in/news/fashion/how-tactus-makes-music-more-accessible-to-the-deaf-community-with-a-vibrating-shirt/2023031438946",
    sourceName: "FashionUnited",
  },
  {
    slug: "tactus-boston-innovation",
    title: "Meet Tactus, the startup behind smart clothing that translates music into vibrations",
    excerpt:
      "Boston Business Journal profiles Tactus and its innovative approach to making music accessible through haptic technology.",
    featuredImage: Bostinno,
    featuredImageAlt: "Tactus in Boston",
    publicationDate: "2020-09-22",
    externalUrl: "https://www.bizjournals.com/boston/inno/stories/profiles/2020/09/22/exclusive-tactus-deaf-startup-smart-clothing-music.html",
    sourceName: "Boston Business Journal",
  },
  {
    slug: "tactus-dttproductions",
    title: "Tactus Music!",
    excerpt:
      "Have you ever been in a club or at a concert and you could feel the music in your chest? Well there’s soon going to be a way to do that without damaging your hearing.",
    featuredImage: DTTP,
    featuredImageAlt: "DTTP",
    publicationDate: "2025-11-10",
    externalUrl: "https://dttproductions.com/2025/11/10/tactus-music/",
    sourceName: "DTTP",
  },
];

/**
 * Format date string to readable format (e.g., "December 2nd, 2025")
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatted = date.toLocaleDateString("en-US", options);

  // Add ordinal suffix to day
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

const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    slug: "a-collaborative-journey-with-prof-laurie-achin",
    title: "A Collaborative Journey With Prof. Laurie Achin",
    excerpt:
      "The Deaf Music Enthusiast that started it all. In our pursuit of making music accessible and inclusive for the Deaf community, we embarked on an inspiring collaboration with Prof. Laurie Achin, a Deaf professor, dancer, and choreographer.",
    featuredImage: laurieImage,
    featuredImageAlt: "Prof. Laurie Achin",
    publicationDate: "2023-06-22",
    formattedDate: formatDate("2023-06-22"),
    authorName: "Tactus Team",
    featured: true,
  },
];

// ============================================
// DATA FETCHER
// ============================================

export async function getCommunityPageData(): Promise<CommunityPageData> {
  // Fetch from Contentful in parallel
  const [pressReleaseFields, blogPostFields] = await Promise.all([
    fetchPressReleases(),
    fetchBlogPosts(),
  ]);

  // Transform press releases from Contentful or use static fallbacks
  let pressReleases: PressRelease[] = STATIC_PRESS_RELEASES;
  if (pressReleaseFields.length > 0) {
    pressReleases = pressReleaseFields.map((fields, index) => ({
      slug: fields.slug,
      title: fields.title,
      excerpt: fields.excerpt,
      featuredImage:
        getAssetUrl(fields.featuredImage) ||
        STATIC_PRESS_RELEASES[index]?.featuredImage ||
        mission1,
      featuredImageAlt:
        getAssetAlt(fields.featuredImage) || fields.title,
      publicationDate: fields.publicationDate,
      externalUrl: fields.externalUrl,
      sourceName: fields.sourceName,
    }));
  }

  // Transform blog posts from Contentful or use static fallbacks
  let blogPosts: BlogPost[] = STATIC_BLOG_POSTS;
  if (blogPostFields.length > 0) {
    blogPosts = blogPostFields.map((fields, index) => ({
      slug: fields.slug,
      title: fields.title,
      excerpt: fields.excerpt,
      featuredImage:
        getAssetUrl(fields.featuredImage) ||
        STATIC_BLOG_POSTS[index]?.featuredImage ||
        mission1,
      featuredImageAlt:
        getAssetAlt(fields.featuredImage) || fields.title,
      publicationDate: fields.publicationDate,
      formattedDate: formatDate(fields.publicationDate),
      authorName: fields.authorName,
      featured: fields.featured,
    }));
  }

  return {
    hero: {
      heading: STATIC_CONTENT.hero.heading,
      description: STATIC_CONTENT.hero.description,
    },
    heroPhotos: STATIC_HERO_PHOTOS,
    press: {
      heading: STATIC_CONTENT.press.heading,
      items: pressReleases.slice(0, 4), // Show max 4 on community page
    },
    blog: {
      heading: STATIC_CONTENT.blog.heading,
      seeAllText: STATIC_CONTENT.blog.seeAllText,
      seeAllLink: STATIC_CONTENT.blog.seeAllLink,
      items: blogPosts.slice(0, 3), // Show max 3 on community page (1 featured + 2 secondary)
    },
    contact: { ...STATIC_CONTENT.contact },
  };
}
