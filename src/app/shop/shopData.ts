import type { ProductGalleryVariant } from "@/app/components/shop/ProductGallery";
import type { GalleryImage } from "@/app/components/shop/GalleryPlaceholder";

// Validate and retrieve environment variables
function getStripeEnvVar(key: string, productName: string): string | undefined {
  const value = process.env[key];
  if (!value) {
    console.warn(
      `Warning: ${key} is not set. Stripe checkout for ${productName} may not work.`
    );
  }
  return value;
}

export const SHOP_SIZES = ["S", "M", "L"] as const;

export type ShopSize = (typeof SHOP_SIZES)[number];

export type ShopProduct = {
  id: string;
  title: string;
  description: string;
  galleryVariant: ProductGalleryVariant;
  price: string;
  originalPrice?: string;
  priceInCents: number;
  stripePriceId?: string;
  sizes?: readonly ShopSize[];
  galleryImages?: readonly GalleryImage[];
};

export const SHOP_PRODUCTS: readonly ShopProduct[] = [
  {
    id: "codec-jacket",
    title: "TACTUS CODEC JACKET",
    description:
      "A lightweight, breathable jacket designed to bring music to motion.",
    galleryVariant: "feature",
    price: "$459",
    originalPrice: "$500",
    priceInCents: 45900,
    stripePriceId: getStripeEnvVar(
      "NEXT_PUBLIC_STRIPE_PRICE_JACKET",
      "Codec Jacket"
    ),
    sizes: SHOP_SIZES,
    galleryImages: [
      {
        src: "/assets/shop/Jacket.png",
        alt: "Close-up of the Tactus jacket on a mannequin",
        objectFit: "contain",
        priority: true,
      },
      {
        src: "/assets/shop/Jeremy-Standing-Jacket.png",
        alt: "Jeremy wearing the Tactus jacket facing forward",
        className:
          "object-cover lg:object-contain lg:scale-[1.50] lg:origin-top lg:-translate-y-[13%]",
        priority: true,
      },
      {
        src: "/assets/shop/arms_crossed_jpg.png",
        alt: "Jeremy wearing the Tactus jacket with folded arms",
        objectFit: "cover",
      },
      {
        src: "/assets/shop/Jeremy-Happy-Jacket.jpg",
        alt: "Jeremy smiling while wearing the Tactus jacket in the city",
        objectFit: "cover",
      },
    ],
  },
  {
    id: "codec-vest",
    title: "TACTUS CODEC VEST",
    description:
      "The design that started it all. The vest that can be layered for every occasion where you want to feel the music.",
    galleryVariant: "simple",
    price: "$459",
    originalPrice: "$500",
    priceInCents: 45900,
    stripePriceId: getStripeEnvVar(
      "NEXT_PUBLIC_STRIPE_PRICE_VEST",
      "Codec Vest"
    ),
    sizes: SHOP_SIZES,
    galleryImages: [
      {
        src: "/assets/shop/vest.png",
        alt: "Close-up of the Tactus vest on a mannequin",
        objectFit: "contain",
        priority: true,
      },
      {
        src: "/assets/shop/jeremy-vest.png",
        alt: "Jeremy wearing the Tactus vest",
        objectFit: "cover",
      },
      {
        src: "/assets/shop/arms_crossed_jpg.png",
        alt: "Jeremy wearing the Tactus jacket with folded arms",
        objectFit: "cover",
      },
      {
        src: "/assets/shop/Jeremy-Happy-Jacket.jpg",
        alt: "Jeremy smiling while wearing the Tactus jacket in the city",
        objectFit: "cover",
      },
    ],
  },
];
