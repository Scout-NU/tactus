import type { ProductGalleryVariant } from "@/app/components/shop/ProductGallery";
import type { GalleryImage } from "@/app/components/shop/GalleryPlaceholder";

// Jacket images
import jeremyStandingJacket from "@/app/_assets/shop/jacket/Jeremy-Standing-Jacket.png";
import productHomePhoto from "@/app/_assets/shared/product-images/product-home-photo.png";
import armsCrossed from "@/app/_assets/shop/jacket/arms_crossed_jpg.png";
import runningJacket from "@/app/_assets/shop/jacket/running-jacket.jpeg";

// Vest images
import jeremyVest from "@/app/_assets/shop/vest/jeremy-vest.png"
import shopVestImage from "@/app/_assets/shared/product-images/shop-vest.png";
import vestModel from "@/app/_assets/shop/vest/vest-model.jpg";
import jeremyModelVest from "@/app/_assets/shop/vest/jeremy-and-model-vest.jpeg";


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
    id: "vibewear-jacket",
    title: "TACTUS VIBEWEAR JACKET",
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
        src: productHomePhoto,
        alt: "Close-up of the Vibewear jacket",
        objectFit: "contain",
        priority: true,
      },
      {
        src: jeremyStandingJacket,
        alt: "Jeremy wearing the Vibewear jacket",
        className:
          "object-cover lg:object-contain lg:scale-[1.50] lg:origin-top lg:-translate-y-[13%]",
        priority: true,
      },
      {
        src: armsCrossed,
        alt: "Jeremy wearing the Vibewear jacket with folded arms",
        objectFit: "cover",
      },
      {
        src: runningJacket,
        alt: "Jeremy and a woman running wearing Tactus Vibewear",
        objectFit: "cover",
      },
    ],
  },
  {
    id: "vibewear-vest",
    title: "TACTUS VIBEWEAR VEST",
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
        src: shopVestImage,
        alt: "Close-up of the Vibewear vest ",
        objectFit: "contain",
        priority: true,
      },
      {
        src: jeremyVest,
        alt: "Jeremy wearing the Vibewear vest",
        objectFit: "cover",
      },
      {
        src: vestModel,
        alt: " Woman wearing the Vibewear vest",
        objectFit: "cover",
      },
      {
        src: jeremyModelVest,
        alt: "Jeremy wearing the Vibewear vest",
        objectFit: "cover",
      },
    ],
  },
];
