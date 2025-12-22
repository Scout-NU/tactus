import {
  fetchProductPageFields,
  getAssetUrl,
} from "@/lib/contentful";

export type Feature = {
  id: string;
  title: string;
  description: string;
  desktopPosition: "top-left" | "top-right" | "left" | "right" | "bottom";
  desktopDot: { top: string; left: string };
  mobileDot: { top: string; left: string };
};

export type ProductPageData = {
  hero: {
    heading: string;
    subtext: string;
    productImageUrl: string | null;
  };
  features: Feature[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
};

// ============================================
// STATIC FALLBACK CONTENT
// ============================================

const STATIC_CONTENT = {
  hero: {
    heading: "IMMERSE YOURSELF IN THE MUSIC",
    subtext: "Explore the features that make every beat come alive.",
  },
  cta: {
    heading: "FEEL EVERY BEAT.\nLIVE EVERY MOMENT.",
    description:
      "Our patented vibration technology is woven into the fabric, letting you stay connected to your favorite songs while you move through your day.",
    buttonText: "Preorder Now",
    buttonLink: "/shop",
  },
} as const;

// Static feature positions (layout-specific, not editable in CMS)
const STATIC_FEATURE_POSITIONS = [
  {
    id: "liveSignal",
    desktopPosition: "top-left" as const,
    desktopDot: { top: "178px", left: "calc(33.333% + 106px)" },
    mobileDot: { top: "31%", left: "17%" },
  },
  {
    id: "seamless",
    desktopPosition: "top-right" as const,
    desktopDot: { top: "178px", left: "calc(50% + 28px)" },
    mobileDot: { top: "30%", left: "68%" },
  },
  {
    id: "premiumFabric",
    desktopPosition: "left" as const,
    desktopDot: { top: "401px", left: "calc(33.333% + 48px)" },
    mobileDot: { top: "60%", left: "16%" },
  },
  {
    id: "wireless",
    desktopPosition: "right" as const,
    desktopDot: { top: "400px", left: "calc(58.333% + 63px)" },
    mobileDot: { top: "55%", left: "78%" },
  },
  {
    id: "battery",
    desktopPosition: "bottom" as const,
    desktopDot: { top: "572px", left: "calc(50% - 9px)" },
    mobileDot: { top: "70%", left: "50%" },
  },
];

// Static feature content (fallbacks)
const STATIC_FEATURES = [
  {
    title: "Live Signal Processing",
    description:
      "Music is translated into vibrations which are sent to different parts of the body with low latency so you can flow in sync with the music.",
  },
  {
    title: "Seamless technology integration",
    description:
      "Proprietary conductive threads are used to seamlessly integrate the technology into the garment.",
  },
  {
    title: "Premium fabric material",
    description:
      "The garment is made with stretchable, breathable, lightweight fabric to keep you comfortable without inhibiting your dance moves.",
  },
  {
    title: "Completely Wireless",
    description:
      "Simply connect to your phone or any Bluetooth device. Press play on your preferred music player or streaming service. Dance without constraints.",
  },
  {
    title: "Rechargeable battery",
    description: "A removable rechargeable battery will keep you vibing for hours.",
  },
];

// ============================================
// DATA FETCHER
// ============================================

export async function getProductPageData(): Promise<ProductPageData> {
  // Fetch from Contentful
  const fields = await fetchProductPageFields();

  // Build features array by merging Contentful content with static positions
  const features: Feature[] = STATIC_FEATURE_POSITIONS.map((position, index) => {
    // Get Contentful popup fields based on index (1-indexed in Contentful)
    const popupNumber = index + 1;
    const contentfulHeading = fields?.[`popup${popupNumber}Heading` as keyof typeof fields] as string | undefined;
    const contentfulDescription = fields?.[`popup${popupNumber}Description` as keyof typeof fields] as string | undefined;

    return {
      ...position,
      title: contentfulHeading || STATIC_FEATURES[index].title,
      description: contentfulDescription || STATIC_FEATURES[index].description,
    };
  });

  return {
    hero: {
      heading: fields?.header || STATIC_CONTENT.hero.heading,
      subtext: fields?.subheader || STATIC_CONTENT.hero.subtext,
      productImageUrl: getAssetUrl(fields?.productImage),
    },
    features,
    cta: {
      heading: fields?.preorderSectionHeading || STATIC_CONTENT.cta.heading,
      description: fields?.preorderSectionDescription || STATIC_CONTENT.cta.description,
      buttonText: STATIC_CONTENT.cta.buttonText,
      buttonLink: STATIC_CONTENT.cta.buttonLink,
    },
  };
}

