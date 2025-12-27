import type { StaticImageData } from "next/image";
import { SHOP_SIZES, type ShopSize } from "../shopData";
import {
  fetchShopProductFields,
  fetchStripePriceIDs,
  getAssetUrl,
  getAssetAlt,
  richTextToPlainText,
  type ContentfulSpecifications,
  type ContentfulSizeChartRow,
} from "@/lib/contentful";

// Static fallback images
import shopVest from "@/app/_assets/shared/product-images/shop-vest.png";
import vestMain from "@/app/_assets/shop/vest/vest.png";
import slide3 from "@/app/_assets/shop/details/slide3.png";
import slide4 from "@/app/_assets/shop/details/slide4.png";
import jeremyModelRunning from "@/app/_assets/shop/jacket/jeremy-model-running.jpg";
import batterImg from "@/app/_assets/shop/details/batter.png";
import armsCrossedImg from "@/app/_assets/shop/jacket/arms_crossed_jpg.png";

// ============================================
// TYPES
// ============================================

export type CarouselImage = {
  src: StaticImageData | string;
  alt: string;
};

export type SizeChartRow = {
  size: ShopSize;
  length: string;
  chestWidth: string;
  shoulderWidth: string;
  bottom: string;
};

export type SpecSection = {
  id: string;
  title: string;
  content: { label: string; value: string }[] | string;
};

export type VestPageData = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  productLabel: string;
  originalPrice: string;
  currentPrice: string;
  priceInCents: number;
  stripePriceIds: Record<string, string>;
  sizes: readonly ShopSize[];
  carouselImages: CarouselImage[];
  productImage: StaticImageData | string;
  specifications: SpecSection[];
  sizeChart: SizeChartRow[];
  featureGrid: {
    runningImage: StaticImageData | string;
    armsCrossedImage: StaticImageData | string;
    batteryImage: StaticImageData | string;
    movementText: string;
    heartText: string;
    feelBeatText: string;
    lightweightText: string;
    batteryText: string;
  };
};

// ============================================
// STATIC FALLBACK CONTENT
// ============================================

const STATIC_CAROUSEL_IMAGES: CarouselImage[] = [
  { src: shopVest, alt: "Tactus Vibewear Vest - Front View" },
  { src: vestMain, alt: "Tactus Vibewear Vest - Product Shot" },
  { src: slide3, alt: "Tactus Vibewear Vest - Side View" },
  { src: slide4, alt: "Tactus Vibewear Vest - Back View" },
];

const STATIC_SIZE_CHART: SizeChartRow[] = [
  { size: "XS", length: "54", chestWidth: "87", shoulderWidth: "40.5", bottom: "79" },
  { size: "S", length: "60", chestWidth: "94.5", shoulderWidth: "43.5", bottom: "85" },
  { size: "M", length: "66", chestWidth: "102", shoulderWidth: "46.5", bottom: "91" },
  { size: "L", length: "72", chestWidth: "110.5", shoulderWidth: "49.5", bottom: "99.5" },
  { size: "XL", length: "78", chestWidth: "119", shoulderWidth: "52.5", bottom: "108" },
];

const STATIC_SPECIFICATIONS: SpecSection[] = [
  {
    id: "size-chart",
    title: "Size Chart",
    content: 'Our vests are available in sizes XS through XL. Please refer to the measurements below or click "View Size Chart" above for detailed sizing information.',
  },
  {
    id: "bluetooth",
    title: "Bluetooth/battery info",
    content: [
      { label: "Connectivity", value: "Bluetooth 5.0" },
      { label: "Battery Life", value: "Up to 8 hours continuous use" },
      { label: "Charging", value: "USB-C rechargeable (2 hours full charge)" },
      { label: "Range", value: "Up to 30 feet (10 meters)" },
    ],
  },
  {
    id: "materials",
    title: "Materials",
    content: [
      { label: "Outer Shell", value: "Premium breathable performance fabric" },
      { label: "Lining", value: "Soft moisture-wicking mesh" },
      { label: "Haptic System", value: "Medical-grade flexible actuators" },
      { label: "Care", value: "Hand wash only, air dry, remove electronics" },
    ],
  },
];

const STATIC_CONTENT = {
  title: "TACTUS VIBEWEAR VEST",
  shortDescription:
    "This is where innovation meets simplicity. The original haptic vest combines minimal design with advanced vibration technology, creating a wearable experience that fits any setting — from the studio to the stage. Feel the music, and never miss a beat.",
  fullDescription:
    "Each piece is designed with intention from the premium, breathable materials to the lightweight, stretchable fit that moves naturally with you. The Tactus Vibewear line combines handcrafted design with advanced haptic technology to create a responsive, wearable experience that lets you feel every beat. With seamless Bluetooth connectivity, it syncs effortlessly with your music. Innovation in one refined design.",
  productLabel: "Vibewear Vest",
  originalPrice: "$500",
  currentPrice: "$459",
  priceInCents: 45900,
  featureGrid: {
    movementText: "Built for movement\nto match your\nlifestyle",
    heartText: "Built for movement\nto match your\nlifestyle",
    feelBeatText: "Feel the beat,\nwherever,\nwhenever.",
    lightweightText: "Lightweight performance fit, made with premium materials",
    batteryText: "Rechargeable\nbattery",
  },
} as const;

// Fallback Stripe price IDs (env vars used when Contentful not available)
const FALLBACK_VEST_STRIPE_PRICE_IDS: Record<string, string> = {
  XS: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_XS || "",
  S: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_S || "",
  M: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_M || "",
  L: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_L || "",
  XL: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_XL || "",
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Transform Contentful size chart JSON to our SizeChartRow format
 * Note: Vest does not have sleeveLength field
 */
function transformSizeChart(contentfulData?: ContentfulSizeChartRow[]): SizeChartRow[] {
  if (!contentfulData || contentfulData.length === 0) {
    return STATIC_SIZE_CHART;
  }

  return contentfulData.map((row) => ({
    size: row.size as ShopSize,
    length: String(row.length),
    chestWidth: String(row.chestWidth),
    shoulderWidth: String(row.shoulderWidth),
    bottom: String(row.bottom),
  }));
}

/**
 * Transform Contentful specifications JSON to our SpecSection[] format
 */
function transformSpecifications(contentfulData?: ContentfulSpecifications): SpecSection[] {
  if (!contentfulData?.specifications) {
    return STATIC_SPECIFICATIONS;
  }

  const specs = contentfulData.specifications;
  const result: SpecSection[] = [];

  // Size chart section
  if (specs.size_chart?.description) {
    result.push({
      id: "size-chart",
      title: "Size Chart",
      content: specs.size_chart.description,
    });
  } else {
    result.push(STATIC_SPECIFICATIONS[0]);
  }

  // Bluetooth/battery info section
  if (specs.tech_info) {
    result.push({
      id: "bluetooth",
      title: "Bluetooth/battery info",
      content: [
        { label: "Connectivity", value: specs.tech_info.connectivity },
        { label: "Battery Life", value: specs.tech_info.battery_life },
        { label: "Charging", value: specs.tech_info.charging },
        { label: "Range", value: specs.tech_info.range },
      ],
    });
  } else {
    result.push(STATIC_SPECIFICATIONS[1]);
  }

  // Materials section
  if (specs.materials) {
    result.push({
      id: "materials",
      title: "Materials",
      content: [
        { label: "Outer Shell", value: specs.materials.outer_shell },
        { label: "Lining", value: specs.materials.lining },
        { label: "Haptic System", value: specs.materials.haptic_system },
        { label: "Care", value: specs.materials.care },
      ],
    });
  } else {
    result.push(STATIC_SPECIFICATIONS[2]);
  }

  return result;
}

// ============================================
// DATA FETCHER
// ============================================

export async function getVestPageData(): Promise<VestPageData> {
  // Fetch from Contentful
  const [fields, priceIds] = await Promise.all([
    fetchShopProductFields("vest"),
    fetchStripePriceIDs(),
  ]);

  // Build Stripe Price IDs with Contentful as primary, env vars as fallback
  const vestStripePriceIds: Record<string, string> = {
    XS: priceIds?.vibewearVestXs || FALLBACK_VEST_STRIPE_PRICE_IDS.XS,
    S: priceIds?.vibewearVestS || FALLBACK_VEST_STRIPE_PRICE_IDS.S,
    M: priceIds?.vibewearVestM || FALLBACK_VEST_STRIPE_PRICE_IDS.M,
    L: priceIds?.vibewearVestL || FALLBACK_VEST_STRIPE_PRICE_IDS.L,
    XL: priceIds?.vibewearVestXl || FALLBACK_VEST_STRIPE_PRICE_IDS.XL,
  };

  // If no Contentful data, return static fallbacks
  if (!fields) {
    return {
      title: STATIC_CONTENT.title,
      shortDescription: STATIC_CONTENT.shortDescription,
      fullDescription: STATIC_CONTENT.fullDescription,
      productLabel: STATIC_CONTENT.productLabel,
      originalPrice: STATIC_CONTENT.originalPrice,
      currentPrice: STATIC_CONTENT.currentPrice,
      priceInCents: STATIC_CONTENT.priceInCents,
      stripePriceIds: vestStripePriceIds,
      sizes: SHOP_SIZES,
      carouselImages: STATIC_CAROUSEL_IMAGES,
      productImage: shopVest,
      specifications: STATIC_SPECIFICATIONS,
      sizeChart: STATIC_SIZE_CHART,
      featureGrid: {
        runningImage: jeremyModelRunning,
        armsCrossedImage: armsCrossedImg,
        batteryImage: batterImg,
        movementText: STATIC_CONTENT.featureGrid.movementText,
        heartText: STATIC_CONTENT.featureGrid.heartText,
        feelBeatText: STATIC_CONTENT.featureGrid.feelBeatText,
        lightweightText: STATIC_CONTENT.featureGrid.lightweightText,
        batteryText: STATIC_CONTENT.featureGrid.batteryText,
      },
    };
  }

  // Build carousel images from Contentful
  const carouselImageFields = [
    { asset: fields.jacketPrimaryImage, fallback: STATIC_CAROUSEL_IMAGES[0] },
    { asset: fields.jacketSecondImage, fallback: STATIC_CAROUSEL_IMAGES[1] },
    { asset: fields.jacketThirdImage, fallback: STATIC_CAROUSEL_IMAGES[2] },
    { asset: fields.jacketFourthImage, fallback: STATIC_CAROUSEL_IMAGES[3] },
  ];

  const carouselImages: CarouselImage[] = carouselImageFields.map(({ asset, fallback }) => {
    const url = getAssetUrl(asset);
    return {
      src: url || fallback.src,
      alt: getAssetAlt(asset) || fallback.alt,
    };
  });

  // Get primary product image
  const productImageUrl = getAssetUrl(fields.jacketPrimaryImage);

  // Build feature grid images
  const runningImageUrl = getAssetUrl(fields.featureGridLargeImage);
  const armsCrossedImageUrl = getAssetUrl(fields.featureGridSecondImage);
  const batteryImageUrl = getAssetUrl(fields.featureGridThirdImage);

  // Parse price from Contentful (e.g., "$459" -> 45900 cents)
  const parsePriceToCents = (priceStr?: string): number => {
    if (!priceStr) return STATIC_CONTENT.priceInCents;
    const numericValue = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    return isNaN(numericValue) ? STATIC_CONTENT.priceInCents : Math.round(numericValue * 100);
  };

  return {
    title: fields.productTitle || STATIC_CONTENT.title,
    shortDescription: richTextToPlainText(fields.productDescription) || STATIC_CONTENT.shortDescription,
    fullDescription: richTextToPlainText(fields.aboutDescription) || STATIC_CONTENT.fullDescription,
    productLabel: STATIC_CONTENT.productLabel,
    originalPrice: fields.productFullPrice || STATIC_CONTENT.originalPrice,
    currentPrice: fields.productDiscountedPrice || STATIC_CONTENT.currentPrice,
    priceInCents: parsePriceToCents(fields.productDiscountedPrice),
    stripePriceIds: vestStripePriceIds,
    sizes: SHOP_SIZES,
    carouselImages,
    productImage: productImageUrl || shopVest,
    specifications: transformSpecifications(fields.specifications),
    sizeChart: transformSizeChart(fields.sizeChart),
    featureGrid: {
      runningImage: runningImageUrl || jeremyModelRunning,
      armsCrossedImage: armsCrossedImageUrl || armsCrossedImg,
      batteryImage: batteryImageUrl || batterImg,
      movementText: richTextToPlainText(fields.featureGridText1) || STATIC_CONTENT.featureGrid.movementText,
      heartText: richTextToPlainText(fields.featureGridText2) || STATIC_CONTENT.featureGrid.heartText,
      feelBeatText: richTextToPlainText(fields.featureGridText3) || STATIC_CONTENT.featureGrid.feelBeatText,
      lightweightText: richTextToPlainText(fields.featureGridText4) || STATIC_CONTENT.featureGrid.lightweightText,
      batteryText: richTextToPlainText(fields.featureGridText5) || STATIC_CONTENT.featureGrid.batteryText,
    },
  };
}
