import type { StaticImageData } from "next/image";
import { SHOP_SIZES, type ShopSize } from "../shopData";

import shopVest from "@/app/_assets/shared/product-images/shop-vest.png";
import vestMain from "@/app/_assets/shop/vest/vest.png";
import slide3 from "@/app/_assets/shop/details/slide3.png";
import slide4 from "@/app/_assets/shop/details/slide4.png";
import jeremyModelRunning from "@/app/_assets/shop/jacket/jeremy-model-running.jpg";
import batterImg from "@/app/_assets/shop/details/batter.png";
import armsCrossedImg from "@/app/_assets/shop/jacket/arms_crossed_jpg.png";

export type CarouselImage = {
  src: StaticImageData;
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
  productImage: StaticImageData;
  specifications: SpecSection[];
  sizeChart: SizeChartRow[];
  featureGrid: {
    runningImage: StaticImageData;
    armsCrossedImage: StaticImageData;
    batteryImage: StaticImageData;
    movementText: string;
    heartText: string;
    feelBeatText: string;
    lightweightText: string;
    batteryText: string;
  };
};

const CAROUSEL_IMAGES: CarouselImage[] = [
  { src: shopVest, alt: "Tactus Vibewear Vest - Front View" },
  { src: vestMain, alt: "Tactus Vibewear Vest - Product Shot" },
  { src: slide3, alt: "Tactus Vibewear Vest - Side View" },
  { src: slide4, alt: "Tactus Vibewear Vest - Back View" },
];

const SIZE_CHART: SizeChartRow[] = [
  { size: "XS", length: "54", chestWidth: "87", shoulderWidth: "40.5", bottom: "79" },
  { size: "S", length: "60", chestWidth: "94.5", shoulderWidth: "43.5", bottom: "85" },
  { size: "M", length: "66", chestWidth: "102", shoulderWidth: "46.5", bottom: "91" },
  { size: "L", length: "72", chestWidth: "110.5", shoulderWidth: "49.5", bottom: "99.5" },
  { size: "XL", length: "78", chestWidth: "119", shoulderWidth: "52.5", bottom: "108" },
];

const SPECIFICATIONS: SpecSection[] = [
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

// Stripe price IDs for vest sizes
const VEST_STRIPE_PRICE_IDS: Record<string, string> = {
  XS: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_XS || "",
  S: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_S || "",
  M: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_M || "",
  L: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_L || "",
  XL: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_XL || "",
};

export async function getVestPageData(): Promise<VestPageData> {
  return {
    title: STATIC_CONTENT.title,
    shortDescription: STATIC_CONTENT.shortDescription,
    fullDescription: STATIC_CONTENT.fullDescription,
    productLabel: STATIC_CONTENT.productLabel,
    originalPrice: STATIC_CONTENT.originalPrice,
    currentPrice: STATIC_CONTENT.currentPrice,
    priceInCents: STATIC_CONTENT.priceInCents,
    stripePriceIds: VEST_STRIPE_PRICE_IDS,
    sizes: SHOP_SIZES,
    carouselImages: CAROUSEL_IMAGES,
    productImage: shopVest,
    specifications: SPECIFICATIONS,
    sizeChart: SIZE_CHART,
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

