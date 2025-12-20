// ============================================
// HOMEPAGE DATA - Centralized content structure
// ============================================
// This file contains all homepage content for easy maintenance
// and future CMS integration (Contentful, Sanity, etc.)

// ============================================
// TYPE DEFINITIONS
// ============================================

export type VideoItem = {
  id: string;
  src: string;
  poster: string;
  alt: string;
};

export type SponsorImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductCard = {
  name: string;
  originalPrice: string;
  currentPrice: string;
  image: string;
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
    src: "/Alleyna_Tactus.mp4",
    poster: "/Alleyna_Tactus-poster.jpg",
    alt: "Alleyna experiencing Tactus wearable",
  },
  {
    id: "ashwin",
    src: "/Ashwin_Tactus.mp4",
    poster: "/Ashwin_Tactus-poster.jpg",
    alt: "Ashwin experiencing Tactus wearable",
  },
  {
    id: "dancing",
    src: "/Dancing_Testing.mp4",
    poster: "/Dancing_Testing-poster.jpg",
    alt: "Dancing while testing Tactus wearable",
  },
  {
    id: "sign",
    src: "/Sign_Tactus.mp4",
    poster: "/Sign_Tactus-poster.jpg",
    alt: "Sign language user with Tactus wearable",
  },
];

// ============================================
// SPONSOR DATA
// ============================================

export const HOME_SPONSORS: readonly SponsorImage[] = [
  {
    src: "/assets/about/sponsor-1.png",
    alt: "Y Combinator Startup School",
    width: 190,
    height: 76,
  },
  {
    src: "/assets/about/sponsor-2.png",
    alt: "Sherman Center",
    width: 224,
    height: 42,
  },
  {
    src: "/assets/about/sponsor-3.png",
    alt: "Idea Venture Accelerator",
    width: 168,
    height: 76,
  },
  {
    src: "/assets/about/sponsor-4.png",
    alt: "MassChallenge",
    width: 92,
    height: 76,
  },
  {
    src: "/assets/about/sponsor-5.png",
    alt: "Afya Foundation",
    width: 167,
    height: 76,
  },
  {
    src: "/assets/about/sponsor-6.png",
    alt: "Sponsor 6",
    width: 150,
    height: 60,
  },
  {
    src: "/assets/about/sponsor-7.png",
    alt: "Sponsor 7",
    width: 150,
    height: 60,
  },
  {
    src: "/assets/about/sponsor-8.png",
    alt: "Sponsor 8",
    width: 150,
    height: 60,
  },
  {
    src: "/assets/about/sponsor-9.png",
    alt: "Sponsor 9",
    width: 150,
    height: 60,
  },
  {
    src: "/assets/about/sponsor-10.png",
    alt: "Sponsor 10",
    width: 150,
    height: 60,
  },
  {
    src: "/assets/about/sponsor-11.png",
    alt: "Sponsor 11",
    width: 150,
    height: 60,
  },
  {
    src: "/assets/about/sponsor-12.png",
    alt: "Sponsor 12",
    width: 150,
    height: 60,
  },
  {
    src: "/assets/about/sponsor-13.png",
    alt: "Sponsor 13",
    width: 150,
    height: 60,
  },
  {
    src: "/assets/about/sponsor-14.png",
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
    image: "/product-home-photo.png",
    route: "/shop/jacket",
  },
  {
    name: "VIBEWEAR VEST",
    originalPrice: "$500",
    currentPrice: "$459",
    image: "/assets/shop/shop-vest.png",
    route: "/shop/vest",
  },
];

