import type { ProductGalleryVariant } from "@/app/components/shop/ProductGallery";
import type { GalleryImage } from "@/app/components/shop/GalleryPlaceholder";

export const SHOP_SIZES = ["S", "M", "L"] as const;

export type ShopSize = (typeof SHOP_SIZES)[number];

export type ShopProduct = {
  id: string;
  title: string;
  description: string;
  galleryVariant: ProductGalleryVariant;
  price: string;
  originalPrice?: string;
  sizes?: readonly ShopSize[];
  galleryImages?: readonly GalleryImage[];
};

export const SHOP_PRODUCTS: readonly ShopProduct[] = [
  {
    id: "codec-jacket",
    title: "TACTUS CODEC JACKET",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    galleryVariant: "feature",
    price: "$459",
    originalPrice: "$500",
    sizes: SHOP_SIZES,
    galleryImages: [
      {
        src: "/assets/shop/Jeremy-Standing-Jacket.png",
        alt: "Jeremy wearing the Tactus jacket facing forward",
        className: "object-cover lg:object-contain lg:scale-[1.50] lg:origin-top lg:-translate-y-[13%]",
        priority: true,
      },
      {
        src: "/assets/shop/Jacket.png",
        alt: "Close-up of the Tactus jacket on a mannequin",
        objectFit: "contain",
      },
      {
        src: "/assets/shop/Folded-Arms-Jacket.jpg",
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
    title: "TACTUS CODEC JACKET",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    galleryVariant: "simple",
    price: "$459",
    originalPrice: "$500",
    sizes: SHOP_SIZES,
    galleryImages: [
      {
        src: "/assets/shop/Jeremy-Standing-Jacket.png",
        alt: "Jeremy wearing the Tactus jacket facing forward",
        className: "object-cover lg:object-contain lg:scale-[1.50] lg:origin-top lg:-translate-y-[13%]",
        priority: true,
      },
      {
        src: "/assets/shop/vest.png",
        alt: "Close-up of the Tactus jacket on a mannequin",
        objectFit: "contain",
      },
      {
        src: "/assets/shop/Folded-Arms-Jacket.jpg",
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

