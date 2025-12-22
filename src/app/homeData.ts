// ============================================
// HOMEPAGE DATA - Centralized content structure
// ============================================
// This file is the SINGLE SOURCE OF TRUTH for homepage data.
// It fetches from Contentful and falls back to static content.

import type { StaticImageData } from "next/image";
import {
  fetchHomepageFields,
  getAssetUrl,
  getAssetAlt,
} from "@/lib/contentful";

// ============================================
// STATIC ASSET IMPORTS (Fallback)
// ============================================

// Video poster imports
import firstVideoPoster from "@/app/_assets/home/videos/First_Video-poster.jpg";
import secondVideoPoster from "@/app/_assets/home/videos/Second_Video-poster.jpg";
import dancingPoster from "@/app/_assets/home/videos/Dancing_Testing-poster.jpg";
import signPoster from "@/app/_assets/home/videos/Sign_Tactus-poster.jpg";

// Sponsor images
import sponsor1 from "@/app/_assets/shared/sponsor-images/sponsor-1.png";
import sponsor2 from "@/app/_assets/shared/sponsor-images/sponsor-2.png";
import sponsor3 from "@/app/_assets/shared/sponsor-images/sponsor-3.png";
import sponsor4 from "@/app/_assets/shared/sponsor-images/sponsor-4.png";
import sponsor5 from "@/app/_assets/shared/sponsor-images/sponsor-5.png";
import sponsor6 from "@/app/_assets/shared/sponsor-images/sponsor-6.png";
import sponsor7 from "@/app/_assets/shared/sponsor-images/sponsor-7.png";
import sponsor8 from "@/app/_assets/shared/sponsor-images/sponsor-8.png";
import sponsor9 from "@/app/_assets/shared/sponsor-images/sponsor-9.png";
import sponsor10 from "@/app/_assets/shared/sponsor-images/sponsor-10.png";
import sponsor11 from "@/app/_assets/shared/sponsor-images/sponsor-11.png";
import sponsor12 from "@/app/_assets/shared/sponsor-images/sponsor-12.png";
import sponsor13 from "@/app/_assets/shared/sponsor-images/sponsor-13.png";
import sponsor14 from "@/app/_assets/shared/sponsor-images/sponsor-14.png";

// Product images
import productHomePhoto from "@/app/_assets/shared/product-images/product-home-photo.png";
import shopVestImage from "@/app/_assets/shared/product-images/shop-vest.png";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type VideoItem = {
  id: string;
  src: string;
  poster: string;
  alt: string;
};

export type SponsorItem = {
  src: string;
  alt: string;
};

export type ProductCard = {
  name: string;
  originalPrice: string;
  currentPrice: string;
  image: string | StaticImageData;
  route: string;
};

// Main data type for client component
export type HomepageData = {
  hero: {
    heading: string;
    highlightWords: string[];
    subtext: string;
    ctaText: string;
    ctaLink: string;
    productImageUrl: string | null;
  };
  community: {
    heading: string;
    quote: string;
  };
  videos: VideoItem[];
  sponsors: SponsorItem[];
  products: {
    heading: string;
    description: string;
    jacketName: string;
    vestName: string;
  };
  pricing: {
    jacketOriginal: string;
    jacketCurrent: string;
    vestOriginal: string;
    vestCurrent: string;
  };
  contact: {
    heading: string;
    description: string;
    ctaText: string;
  };
};

// ============================================
// STATIC BACKUP CONTENT
// ============================================

const STATIC_CONTENT = {
  hero: {
    heading: "YOU DON'T NEED TO HEAR THE MUSIC TO FEEL IT",
    highlightWords: ["HEAR", "FEEL"], // Words styled with blue color
    subtext: "Wearable tech developed with and for the Deaf community.",
    ctaText: "LEARN MORE",
    ctaLink: "/product",
  },
  community: {
    heading: "TRANSFORMING THE WAY MUSIC IS EXPERIENCED.",
    quote: '"I feel like my soul is moving."',
  },
  products: {
    heading: "OUR PRODUCTS",
    description:
      "Experience music through touch. Our wearables transform every beat into a physical sensation, bringing you closer to the music you love.",
    jacketName: "VIBEWEAR JACKET",
    vestName: "VIBEWEAR VEST",
  },
  contact: {
    heading: "DON'T MISS A BEAT",
    description:
      "Stay connected for early access to news from the Tactus team.",
    ctaText: "STAY IN TOUCH",
  },
  pricing: {
    jacketOriginal: "$500",
    jacketCurrent: "$459",
    vestOriginal: "$500",
    vestCurrent: "$459",
  },
} as const;

const STATIC_VIDEOS: VideoItem[] = [
  {
    id: "first",
    src: "/assets/home/videos/First_Video.mp4",
    poster: firstVideoPoster.src,
    alt: "First video - Tactus experience",
  },
  {
    id: "second",
    src: "/assets/home/videos/Second_Video.MP4",
    poster: secondVideoPoster.src,
    alt: "Second video - Tactus experience",
  },
  {
    id: "dancing",
    src: "/assets/home/videos/Dancing_Testing.mp4",
    poster: dancingPoster.src,
    alt: "Dancing while testing Tactus wearable",
  },
  {
    id: "sign",
    src: "/assets/home/videos/Sign_Tactus.mp4",
    poster: signPoster.src,
    alt: "Sign language user with Tactus wearable",
  },
];

const STATIC_SPONSORS: SponsorItem[] = [
  { src: sponsor1.src, alt: "Y Combinator Startup School" },
  { src: sponsor2.src, alt: "Sherman Center" },
  { src: sponsor3.src, alt: "Idea Venture Accelerator" },
  { src: sponsor4.src, alt: "MassChallenge" },
  { src: sponsor5.src, alt: "Afya Foundation" },
  { src: sponsor6.src, alt: "Sponsor 6" },
  { src: sponsor7.src, alt: "Sponsor 7" },
  { src: sponsor8.src, alt: "Sponsor 8" },
  { src: sponsor9.src, alt: "Sponsor 9" },
  { src: sponsor10.src, alt: "Sponsor 10" },
  { src: sponsor11.src, alt: "Sponsor 11" },
  { src: sponsor12.src, alt: "Sponsor 12" },
  { src: sponsor13.src, alt: "Sponsor 13" },
  { src: sponsor14.src, alt: "Sponsor 14" },
];

// ============================================
// PRODUCT DATA (Static - routes tied to code)
// ============================================

export const HOME_PRODUCTS: readonly ProductCard[] = [
  {
    name: "VIBEWEAR JACKET",
    originalPrice: "$500",
    currentPrice: "$459",
    image: productHomePhoto,
    route: "/shop/jacket",
  },
  {
    name: "VIBEWEAR VEST",
    originalPrice: "$500",
    currentPrice: "$459",
    image: shopVestImage,
    route: "/shop/vest",
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Parse highlighted words from comma or space separated string
 */
function parseHighlightedWords(input?: string): string[] {
  if (!input) return [];
  return input
    .split(/[,\s]+/)
    .map((word) => word.trim().toUpperCase())
    .filter((word) => word.length > 0);
}

// ============================================
// MAIN DATA FETCHER
// ============================================

/**
 * Fetch homepage data from Contentful with fallback to static content
 * This is the single entry point for all homepage data
 */
export async function getHomepageData(): Promise<HomepageData> {
  const fields = await fetchHomepageFields();

  // If Contentful fails, return full static content
  if (!fields) {
    console.log("📦 Using static homepage content (fallback)");
    return {
      hero: {
        ...STATIC_CONTENT.hero,
        highlightWords: [...STATIC_CONTENT.hero.highlightWords],
        productImageUrl: null,
      },
      community: { ...STATIC_CONTENT.community },
      videos: STATIC_VIDEOS,
      sponsors: STATIC_SPONSORS,
      products: { ...STATIC_CONTENT.products },
      pricing: { ...STATIC_CONTENT.pricing },
      contact: { ...STATIC_CONTENT.contact },
    };
  }

  console.log("✅ Using Contentful homepage content");

  // Parse highlighted words
  const highlightWords = parseHighlightedWords(fields.highlightedHeroText);

  // Build videos array from Contentful
  const videos: VideoItem[] = [];
  const videoConfigs = [
    {
      id: "first",
      video: fields.firstVideo,
      thumbnail: fields.firstVideoThumbnail,
      fallback: STATIC_VIDEOS[0],
    },
    {
      id: "second",
      video: fields.secondVideo,
      thumbnail: fields.secondVideoThumbnail,
      fallback: STATIC_VIDEOS[1],
    },
    {
      id: "third",
      video: fields.thirdVideo,
      thumbnail: fields.thirdVideoThumbnail,
      fallback: STATIC_VIDEOS[2],
    },
    {
      id: "fourth",
      video: fields.fourthVideo,
      thumbnail: fields.fourthVideoThumbnail,
      fallback: STATIC_VIDEOS[3],
    },
  ];

  for (const config of videoConfigs) {
    const videoUrl = getAssetUrl(config.video);
    const thumbnailUrl = getAssetUrl(config.thumbnail);

    if (videoUrl) {
      videos.push({
        id: config.id,
        src: videoUrl,
        poster: thumbnailUrl || config.fallback?.poster || "",
        alt: getAssetAlt(config.video) || `${config.id} video - Tactus experience`,
      });
    } else if (config.fallback) {
      // Use fallback if Contentful video not available
      videos.push(config.fallback);
    }
  }

  // Build sponsors array from Contentful
  const sponsors: SponsorItem[] = [];
  if (fields.sponsorImages && Array.isArray(fields.sponsorImages)) {
    for (const sponsorAsset of fields.sponsorImages) {
      const url = getAssetUrl(sponsorAsset);
      if (url) {
        sponsors.push({
          src: url,
          alt: getAssetAlt(sponsorAsset) || "Sponsor",
        });
      }
    }
  }

  // Fall back to static sponsors if none from Contentful
  const finalSponsors = sponsors.length > 0 ? sponsors : STATIC_SPONSORS;

  return {
    hero: {
      heading: fields.heroText || STATIC_CONTENT.hero.heading,
      highlightWords:
        highlightWords.length > 0
          ? highlightWords
          : [...STATIC_CONTENT.hero.highlightWords],
      subtext: fields.heroSubtext || STATIC_CONTENT.hero.subtext,
      ctaText: fields.heroButtonText || STATIC_CONTENT.hero.ctaText,
      ctaLink: STATIC_CONTENT.hero.ctaLink, // Always use static route
      productImageUrl: getAssetUrl(fields.heroProductImage),
    },
    community: {
      heading: fields.videoSectionHeader || STATIC_CONTENT.community.heading,
      quote: fields.videoSectionQuote || STATIC_CONTENT.community.quote,
    },
    videos: videos.length > 0 ? videos : STATIC_VIDEOS,
    sponsors: finalSponsors,
    products: {
      heading: fields.productSectionHeader || STATIC_CONTENT.products.heading,
      description:
        fields.productSectionSubtext || STATIC_CONTENT.products.description,
      jacketName: fields.jacketName || STATIC_CONTENT.products.jacketName,
      vestName: fields.vestName || STATIC_CONTENT.products.vestName,
    },
    pricing: {
      jacketOriginal:
        fields.jacketFullPrice || STATIC_CONTENT.pricing.jacketOriginal,
      jacketCurrent:
        fields.jacketDiscountedPrice || STATIC_CONTENT.pricing.jacketCurrent,
      vestOriginal:
        fields.vestFullPrice || STATIC_CONTENT.pricing.vestOriginal,
      vestCurrent:
        fields.vestDiscountedPrice || STATIC_CONTENT.pricing.vestCurrent,
    },
    contact: { ...STATIC_CONTENT.contact }, // Contact rarely changes
  };
}
