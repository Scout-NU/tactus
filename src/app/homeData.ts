// ============================================
// HOMEPAGE DATA - Centralized content structure
// ============================================
// This file contains all homepage content for easy maintenance
// and future CMS integration (Contentful, Sanity, etc.)

import type { StaticImageData } from "next/image";

// Video poster imports
import alleynaPoster from "@/app/_assets/home/videos/Alleyna_Tactus-poster.jpg";
import ashwinPoster from "@/app/_assets/home/videos/Ashwin_Tactus-poster.jpg";
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
  poster: string | StaticImageData;
  alt: string;
};

export type SponsorImage = {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
};

export type ProductCard = {
  name: string;
  originalPrice: string;
  currentPrice: string;
  image: string | StaticImageData;
  route: string;
};

// ============================================
// TEXT CONTENT
// ============================================

export const HOME_CONTENT = {
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
  },
  contact: {
    heading: "DON'T MISS A BEAT",
    description:
      "Stay connected for early access to news from the Tactus team.",
    ctaText: "STAY IN TOUCH",
  },
} as const;

// ============================================
// VIDEO DATA
// ============================================

export const HOME_VIDEOS: readonly VideoItem[] = [
  {
    id: "alleyna",
    src: "/assets/home/videos/Alleyna_Tactus.mp4",
    poster: alleynaPoster,
    alt: "Alleyna experiencing Tactus wearable",
  },
  {
    id: "ashwin",
    src: "/assets/home/videos/Ashwin_Tactus.mp4",
    poster: ashwinPoster,
    alt: "Ashwin experiencing Tactus wearable",
  },
  {
    id: "dancing",
    src: "/assets/home/videos/Dancing_Testing.mp4",
    poster: dancingPoster,
    alt: "Dancing while testing Tactus wearable",
  },
  {
    id: "sign",
    src: "/assets/home/videos/Sign_Tactus.mp4",
    poster: signPoster,
    alt: "Sign language user with Tactus wearable",
  },
];

// ============================================
// SPONSOR DATA
// ============================================

export const HOME_SPONSORS: readonly SponsorImage[] = [
  {
    src: sponsor1,
    alt: "Y Combinator Startup School",
    width: 190,
    height: 76,
  },
  {
    src: sponsor2,
    alt: "Sherman Center",
    width: 224,
    height: 42,
  },
  {
    src: sponsor3,
    alt: "Idea Venture Accelerator",
    width: 168,
    height: 76,
  },
  {
    src: sponsor4,
    alt: "MassChallenge",
    width: 92,
    height: 76,
  },
  {
    src: sponsor5,
    alt: "Afya Foundation",
    width: 167,
    height: 76,
  },
  {
    src: sponsor6,
    alt: "Sponsor 6",
    width: 150,
    height: 60,
  },
  {
    src: sponsor7,
    alt: "Sponsor 7",
    width: 150,
    height: 60,
  },
  {
    src: sponsor8,
    alt: "Sponsor 8",
    width: 150,
    height: 60,
  },
  {
    src: sponsor9,
    alt: "Sponsor 9",
    width: 150,
    height: 60,
  },
  {
    src: sponsor10,
    alt: "Sponsor 10",
    width: 150,
    height: 60,
  },
  {
    src: sponsor11,
    alt: "Sponsor 11",
    width: 150,
    height: 60,
  },
  {
    src: sponsor12,
    alt: "Sponsor 12",
    width: 150,
    height: 60,
  },
  {
    src: sponsor13,
    alt: "Sponsor 13",
    width: 150,
    height: 60,
  },
  {
    src: sponsor14,
    alt: "Sponsor 14",
    width: 150,
    height: 60,
  },
];

// ============================================
// PRODUCT DATA
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
