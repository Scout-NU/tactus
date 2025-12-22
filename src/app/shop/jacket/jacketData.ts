import type { StaticImageData } from "next/image";
import { SHOP_PRODUCTS, SHOP_SIZES, type ShopSize } from "../shopData";

import slide1 from "@/app/_assets/shop/details/slide1.png";
import productHomePhoto from "@/app/_assets/shared/product-images/product-home-photo.png";
import armsCrossedImg from "@/app/_assets/shop/jacket/arms_crossed_jpg.png";
import runningJacket from "@/app/_assets/shop/jacket/running-jacket.jpeg";
import jeremyModelRunning from "@/app/_assets/shop/jacket/jeremy-model-running.jpg";
import batterImg from "@/app/_assets/shop/details/batter.png";

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
  { src: productHomePhoto, alt: "Tactus Vibewear Jacket - Product Shot" },
  { src: slide1, alt: "Tactus Vibewear Jacket - Front View" },
  { src: armsCrossedImg, alt: "Arms crossed model wearing the Vibewear jacket" },
  { src: runningJacket, alt: "Jeremy and a woman running wearing Tactus Vibewear" },
];

const SIZE_CHART: SizeChartRow[] = [
  { size: "XS", length: "56", chestWidth: "91", shoulderWidth: "40", bottom: "80", sleeveLength: "61" },
  { size: "S", length: "62", chestWidth: "98.5", shoulderWidth: "43", bottom: "86", sleeveLength: "62.5" },
  { size: "M", length: "68", chestWidth: "106", shoulderWidth: "46", bottom: "92", sleeveLength: "64" },
  { size: "L", length: "74", chestWidth: "115", shoulderWidth: "49", bottom: "102", sleeveLength: "65.5" },
  { size: "XL", length: "80", chestWidth: "124", shoulderWidth: "52", bottom: "112", sleeveLength: "67" },
];

const SPECIFICATIONS: SpecSection[] = [
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
  featureGrid: {
    movementText: "Built for movement\nto match your\nlifestyle",
    heartText: "Built for movement\nto match your\nlifestyle",
    feelBeatText: "Feel the beat,\nwherever,\nwhenever.",
    lightweightText: "Lightweight performance fit, made with premium materials",
    batteryText: "Rechargeable\nbattery",
  },
} as const;

export async function getJacketPageData(): Promise<JacketPageData> {
  const product = SHOP_PRODUCTS.find((p) => p.id === "vibewear-jacket");

  return {
    title: STATIC_CONTENT.title,
    shortDescription: STATIC_CONTENT.shortDescription,
    fullDescription: STATIC_CONTENT.fullDescription,
    productLabel: STATIC_CONTENT.productLabel,
    originalPrice: product?.originalPrice || "$500",
    currentPrice: product?.price || "$459",
    priceInCents: product?.priceInCents || 45900,
    stripePriceIds: product?.stripePriceIds || {},
    sizes: SHOP_SIZES,
    carouselImages: CAROUSEL_IMAGES,
    productImage: productHomePhoto,
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

