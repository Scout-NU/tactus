"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

import { ProductGallery, type ProductGalleryVariant } from "./ProductGallery";
import { type GalleryImage } from "./GalleryPlaceholder";
import { QuickAddModal } from "./QuickAddModal";

export type ProductSectionProps<Size extends string = string> = {
  productId: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  priceInCents: number;
  stripePriceIds?: Record<string, string>;
  galleryVariant: ProductGalleryVariant;
  sizes: readonly Size[];
  galleryImages?: readonly GalleryImage[];
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
  stripePriceIds,
  galleryVariant,
  sizes,
  galleryImages,
  viewDetailsLabel = "View details",
  quickAddLabel = "Quick Add",
  className,
  detailsPath,
}: ProductSectionProps<Size>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fallback to hard-coded paths if not provided, but prefer prop
  const resolvedDetailsPath =
    detailsPath ||
    (productId === "vibewear-jacket" ? "/shop/jacket" : "/shop/vest");

  return (
    <>
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
            {/* View Details - visible on all screen sizes */}
            <Link
              href={resolvedDetailsPath}
            className="font-body flex items-center justify-center rounded-sm bg-[#FF6B4A] px-10 py-3 text-lg font-medium text-white transition hover:bg-[#FF5A39] focus-visible:outline-none focus-visible:ring focus-visible:ring-[#FF6B4A]/60 lg:border lg:border-white lg:bg-white lg:text-[#05365f] lg:hover:bg-white/90 lg:focus-visible:ring-white/30"
          >
            {viewDetailsLabel}
            </Link>
            
            {/* Quick Add - hidden on mobile, visible on desktop */}
          <button
            type="button"
              onClick={() => setIsModalOpen(true)}
              className="font-body hidden items-center justify-center rounded-sm bg-[#FF6B4A] px-10 py-3 text-lg font-medium text-white transition hover:bg-[#FF5A39] focus-visible:outline-none focus-visible:ring focus-visible:ring-[#FF6B4A]/60 sm:flex"
          >
            {quickAddLabel}
          </button>
        </div>
      </div>
    </section>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={productId}
        title={title}
        description={description}
        price={price}
        originalPrice={originalPrice}
        priceInCents={priceInCents}
        stripePriceIds={stripePriceIds}
        sizes={sizes}
        galleryImages={galleryImages}
      />
    </>
  );
}
