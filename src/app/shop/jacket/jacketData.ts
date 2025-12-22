import type { StaticImageData } from "next/image";
import { SHOP_SIZES, type ShopSize } from "../shopData";
import {
  fetchShopProductFields,
  getAssetUrl,
  getAssetAlt,
  richTextToPlainText,
  type ContentfulSpecifications,
  type ContentfulSizeChartRow,
} from "@/lib/contentful";

// Static fallback images
import slide1 from "@/app/_assets/shop/details/slide1.png";
import productHomePhoto from "@/app/_assets/shared/product-images/product-home-photo.png";
import armsCrossedImg from "@/app/_assets/shop/jacket/arms_crossed_jpg.png";
import runningJacket from "@/app/_assets/shop/jacket/running-jacket.jpeg";
import jeremyModelRunning from "@/app/_assets/shop/jacket/jeremy-model-running.jpg";
import batterImg from "@/app/_assets/shop/details/batter.png";

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
  sleeveLength: string;
};

export type SpecSection = {
  id: string;
  title: string;
  content: { label: string; value: string }[] | string;
};

export type JacketPageData = {
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
  { src: productHomePhoto, alt: "Tactus Vibewear Jacket - Product Shot" },
  { src: slide1, alt: "Tactus Vibewear Jacket - Front View" },
  { src: armsCrossedImg, alt: "Arms crossed model wearing the Vibewear jacket" },
  { src: runningJacket, alt: "Jeremy and a woman running wearing Tactus Vibewear" },
];

const STATIC_SIZE_CHART: SizeChartRow[] = [
  { size: "XS", length: "56", chestWidth: "91", shoulderWidth: "40", bottom: "80", sleeveLength: "61" },
  { size: "S", length: "62", chestWidth: "98.5", shoulderWidth: "43", bottom: "86", sleeveLength: "62.5" },
  { size: "M", length: "68", chestWidth: "106", shoulderWidth: "46", bottom: "92", sleeveLength: "64" },
  { size: "L", length: "74", chestWidth: "115", shoulderWidth: "49", bottom: "102", sleeveLength: "65.5" },
  { size: "XL", length: "80", chestWidth: "124", shoulderWidth: "52", bottom: "112", sleeveLength: "67" },
];

const STATIC_SPECIFICATIONS: SpecSection[] = [
  {
    id: "size-chart",
    title: "Size Chart",
    content: 'Our jackets are available in sizes XS through XL. Please refer to the measurements below or click "View Size Chart" above for detailed sizing information.',
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
  title: "TACTUS VIBEWEAR JACKET",
  shortDescription:
    "This premium trainer's jacket fuses style, comfort, and innovation. Crafted from performance materials and embedded with advanced haptic technology, it lets you feel music in motion — each beat translated into a tactile rhythm that moves with your body.",
  fullDescription:
    "Each piece is designed with intention from the premium, breathable materials to the lightweight, stretchable fit that moves naturally with you. The Tactus Vibewear line combines handcrafted design with advanced haptic technology to create a responsive, wearable experience that lets you feel every beat. With seamless Bluetooth connectivity, it syncs effortlessly with your music. Innovation in one refined design.",
  productLabel: "Vibewear Jacket",
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

// Stripe price IDs for jacket sizes (hardcoded - not from CMS)
const JACKET_STRIPE_PRICE_IDS: Record<string, string> = {
  XS: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_XS || "",
  S: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_S || "",
  M: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_M || "",
  L: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_L || "",
  XL: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_XL || "",
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Transform Contentful size chart JSON to our SizeChartRow format
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
    sleeveLength: String(row.sleeveLength || ""),
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

export async function getJacketPageData(): Promise<JacketPageData> {
  // Fetch from Contentful
  const fields = await fetchShopProductFields("jacket");

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
      stripePriceIds: JACKET_STRIPE_PRICE_IDS,
      sizes: SHOP_SIZES,
      carouselImages: STATIC_CAROUSEL_IMAGES,
      productImage: productHomePhoto,
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

  return {
    title: fields.productTitle || STATIC_CONTENT.title,
    shortDescription: richTextToPlainText(fields.productDescription) || STATIC_CONTENT.shortDescription,
    fullDescription: richTextToPlainText(fields.aboutDescription) || STATIC_CONTENT.fullDescription,
    productLabel: STATIC_CONTENT.productLabel,
    originalPrice: STATIC_CONTENT.originalPrice,
    currentPrice: STATIC_CONTENT.currentPrice,
    priceInCents: STATIC_CONTENT.priceInCents,
    stripePriceIds: JACKET_STRIPE_PRICE_IDS,
    sizes: SHOP_SIZES,
    carouselImages,
    productImage: productImageUrl || productHomePhoto,
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
