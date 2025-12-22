import type { ProductGalleryVariant } from "@/app/components/shop/ProductGallery";
import type { GalleryImage } from "@/app/components/shop/GalleryPlaceholder";
import {
  fetchShopPageFields,
  getAssetUrl,
  getAssetAlt,
} from "@/lib/contentful";

// Jacket images (static fallbacks)
import jeremyStandingJacket from "@/app/_assets/shop/jacket/Jeremy-Standing-Jacket.png";
import productHomePhoto from "@/app/_assets/shared/product-images/product-home-photo.png";
import armsCrossed from "@/app/_assets/shop/jacket/arms_crossed_jpg.png";
import runningJacket from "@/app/_assets/shop/jacket/running-jacket.jpeg";

// Vest images (static fallbacks)
import jeremyVest from "@/app/_assets/shop/vest/jeremy-vest.png";
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

// ============================================
// STATIC FALLBACK CONTENT
// ============================================

const STATIC_CONTENT = {
  heading: "Explore Our Products",
  jacket: {
    title: "TACTUS VIBEWEAR JACKET",
    description: "A lightweight, breathable jacket designed to bring music to motion.",
    price: "$459",
    originalPrice: "$500",
  },
  vest: {
    title: "TACTUS VIBEWEAR VEST",
    description: "The design that started it all. The vest that can be layered for every occasion where you want to feel the music.",
    price: "$459",
    originalPrice: "$500",
  },
} as const;

// Static gallery images (fallbacks)
const STATIC_JACKET_GALLERY: readonly GalleryImage[] = [
  {
    src: productHomePhoto,
    alt: "Close-up of the Vibewear jacket",
    objectFit: "contain",
    priority: true,
  },
  {
    src: jeremyStandingJacket,
    alt: "Jeremy wearing the Vibewear jacket",
    className: "object-cover lg:object-contain lg:scale-[1.50] lg:origin-top lg:-translate-y-[13%]",
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
];

const STATIC_VEST_GALLERY: readonly GalleryImage[] = [
  {
    src: shopVestImage,
    alt: "Close-up of the Vibewear vest",
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
    alt: "Woman wearing the Vibewear vest",
    objectFit: "cover",
  },
  {
    src: jeremyModelVest,
    alt: "Jeremy wearing the Vibewear vest",
    objectFit: "cover",
  },
];

// Static product configurations (hardcoded - not from CMS)
const STATIC_PRODUCT_CONFIGS = {
  jacket: {
    id: "vibewear-jacket",
    galleryVariant: "feature" as ProductGalleryVariant,
    priceInCents: 45900,
    stripePriceIds: {
      XS: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_XS,
      S: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_S,
      M: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_M,
      L: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_L,
      XL: process.env.NEXT_PUBLIC_STRIPE_PRICE_JACKET_XL,
    } as Record<string, string>,
  },
  vest: {
    id: "vibewear-vest",
    galleryVariant: "simple" as ProductGalleryVariant,
    priceInCents: 45900,
    stripePriceIds: {
      XS: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_XS,
      S: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_S,
      M: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_M,
      L: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_L,
      XL: process.env.NEXT_PUBLIC_STRIPE_PRICE_VEST_XL,
    } as Record<string, string>,
  },
};

export type ShopPageData = {
  heading: string;
  sizes: readonly ShopSize[];
  products: ShopProduct[];
};

// ============================================
// DATA FETCHER
// ============================================

export async function getShopPageData(): Promise<ShopPageData> {
  // Fetch from Contentful
  const fields = await fetchShopPageFields();

  // Build jacket gallery images from Contentful or fallback to static
  const jacketGalleryImages: GalleryImage[] = [];
  const jacketImageFields = [
    { asset: fields?.jacketPrimaryImage, fallback: STATIC_JACKET_GALLERY[0] },
    { asset: fields?.jacketSecondImage, fallback: STATIC_JACKET_GALLERY[1] },
    { asset: fields?.jacketThirdImage, fallback: STATIC_JACKET_GALLERY[2] },
    { asset: fields?.jacketFourthImage, fallback: STATIC_JACKET_GALLERY[3] },
  ];

  jacketImageFields.forEach(({ asset, fallback }, index) => {
    const url = getAssetUrl(asset);
    if (url) {
      jacketGalleryImages.push({
        src: url,
        alt: getAssetAlt(asset) || fallback.alt,
        objectFit: fallback.objectFit,
        priority: fallback.priority,
        className: fallback.className,
      });
    } else {
      jacketGalleryImages.push(fallback);
    }
  });

  // Build vest gallery images from Contentful or fallback to static
  const vestGalleryImages: GalleryImage[] = [];
  const vestImageFields = [
    { asset: fields?.vestPrimaryImage, fallback: STATIC_VEST_GALLERY[0] },
    { asset: fields?.vestSecondImage, fallback: STATIC_VEST_GALLERY[1] },
    { asset: fields?.vestThirdImage, fallback: STATIC_VEST_GALLERY[2] },
    { asset: fields?.vestFourthImage, fallback: STATIC_VEST_GALLERY[3] },
  ];

  vestImageFields.forEach(({ asset, fallback }, index) => {
    const url = getAssetUrl(asset);
    if (url) {
      vestGalleryImages.push({
        src: url,
        alt: getAssetAlt(asset) || fallback.alt,
        objectFit: fallback.objectFit,
        priority: fallback.priority,
        className: fallback.className,
      });
    } else {
      vestGalleryImages.push(fallback);
    }
  });

  // Build products array
  const products: ShopProduct[] = [
    {
      ...STATIC_PRODUCT_CONFIGS.jacket,
      title: fields?.jacketTitle || STATIC_CONTENT.jacket.title,
      description: fields?.jacketDescription || STATIC_CONTENT.jacket.description,
      price: fields?.jacketDiscountedPrice || STATIC_CONTENT.jacket.price,
      originalPrice: fields?.jacketFullPrice || STATIC_CONTENT.jacket.originalPrice,
      sizes: SHOP_SIZES,
      galleryImages: jacketGalleryImages,
    },
    {
      ...STATIC_PRODUCT_CONFIGS.vest,
      title: fields?.vestTitle || STATIC_CONTENT.vest.title,
      description: fields?.vestDescription || STATIC_CONTENT.vest.description,
      price: fields?.vestDiscountedPrice || STATIC_CONTENT.vest.price,
      originalPrice: fields?.vestFullPrice || STATIC_CONTENT.vest.originalPrice,
      sizes: SHOP_SIZES,
      galleryImages: vestGalleryImages,
    },
  ];

  return {
    heading: fields?.header || STATIC_CONTENT.heading,
    sizes: SHOP_SIZES,
    products,
  };
}
