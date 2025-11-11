"use client";

import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

import { ProductGallery, type ProductGalleryVariant } from "./ProductGallery";
import { type GalleryImage } from "./GalleryPlaceholder";

export type ProductSectionProps<Size extends string = string> = {
  productId: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  priceInCents: number;
  stripePriceId?: string;
  galleryVariant: ProductGalleryVariant;
  sizes: readonly Size[];
  selectedSize?: Size;
  onSelectSize?: (size: Size) => void;
  galleryImages?: readonly GalleryImage[];
  sizeLabel?: string;
  viewDetailsLabel?: string;
  quickAddLabel?: string;
  className?: string;
  detailsPath?: string;
};

export function ProductSection<Size extends string = string>({
  productId,
  title,
  description,
  price,
  originalPrice,
  priceInCents,
  stripePriceId,
  galleryVariant,
  sizes,
  selectedSize: propSelectedSize,
  galleryImages,
  viewDetailsLabel = "View details",
  quickAddLabel = "Add to Cart",
  className,
  detailsPath,
}: ProductSectionProps<Size>) {
  const { addToCart } = useCart();
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);

  // Safer default size selection - use middle size or first available
  const getDefaultSize = (): Size => {
    if (sizes.length === 0) return "" as Size;
    const middleIndex = Math.floor(sizes.length / 2);
    return sizes[middleIndex];
  };

  const selectedSize = propSelectedSize || getDefaultSize();

  const handleQuickAdd = () => {
    if (!selectedSize) return;

    const firstImage = galleryImages?.[0];
    addToCart({
      productId,
      title,
      price: priceInCents,
      size: selectedSize as string,
      image: firstImage?.src,
      stripePriceId,
    });

    // Show feedback for 2 seconds
    setShowAddedFeedback(true);
    setTimeout(() => setShowAddedFeedback(false), 2000);
  };

  // Fallback to hard-coded paths if not provided, but prefer prop
  const resolvedDetailsPath =
    detailsPath ||
    (productId === "codec-jacket" ? "/shop/jacket" : "/shop/vest");

  return (
    <section className={cn("space-y-10", className)}>
      <div className="gap-6 lg:grid lg:grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)] lg:items-start">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-[2.5rem]">
          {title}
        </h2>
        <p className="font-body mt-4 text-base text-white lg:mt-0 lg:text-right">
          {description}
        </p>
      </div>

      <ProductGallery variant={galleryVariant} images={galleryImages} />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          {originalPrice && (
            <span className="font-body text-3xl font-semibold text-white line-through">
              {originalPrice}
            </span>
          )}
          <span className="font-body text-3xl font-semibold text-[#FF6B4A]">
            {price}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href={resolvedDetailsPath}
            className="font-body flex items-center justify-center rounded-lg border border-white bg-white px-10 py-3 text-lg font-medium text-[#05365f] transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring focus-visible:ring-white/30"
          >
            {viewDetailsLabel}
          </Link>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="font-body flex items-center justify-center rounded-lg bg-[#FF6B4A] px-10 py-3 text-lg font-medium text-white transition hover:bg-[#FF5A39] focus-visible:outline-none focus-visible:ring focus-visible:ring-[#FF6B4A]/60"
          >
            {showAddedFeedback ? "✓ Added to Cart!" : quickAddLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
