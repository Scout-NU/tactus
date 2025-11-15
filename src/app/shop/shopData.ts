import type { ProductGalleryVariant } from "@/app/components/shop/ProductGallery";
import type { GalleryImage } from "@/app/components/shop/GalleryPlaceholder";

export const SHOP_SIZES = ["XS", "S", "M", "L", "XL"] as const;

export type ShopSize = (typeof SHOP_SIZES)[number];

export type ShopProduct = {
  id: string;
  title: string;
  description: string;
  galleryVariant: ProductGalleryVariant;
  price: string;
  originalPrice?: string;
  priceInCents: number;
  stripePriceIds?: Record<string, string>;
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
    stripePriceIds: {
      XS: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_XS,
      S: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_S,
      M: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_M,
      L: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_L,
      XL: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_XL,
    } as Record<string, string>,
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
    stripePriceIds: {
      XS: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_XS,
      S: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_S,
      M: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_M,
      L: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_L,
      XL: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_XL,
    } as Record<string, string>,
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
