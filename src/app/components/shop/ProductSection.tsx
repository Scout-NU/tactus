import { cn } from "@/lib/utils";

import {
  ProductGallery,
  type ProductGalleryVariant,
} from "./ProductGallery";
import { type GalleryImage } from "./GalleryPlaceholder";
import { SizeSelector } from "./SizeSelector";

export type ProductSectionProps<Size extends string = string> = {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  galleryVariant: ProductGalleryVariant;
  sizes: readonly Size[];
  selectedSize?: Size;
  onSelectSize?: (size: Size) => void;
  galleryImages?: readonly GalleryImage[];
  sizeLabel?: string;
  viewDetailsLabel?: string;
  quickAddLabel?: string;
  className?: string;
};

export function ProductSection<Size extends string = string>({
  title,
  description,
  price,
  originalPrice,
  galleryVariant,
  sizes,
  selectedSize,
  onSelectSize,
  galleryImages,
  sizeLabel = "Size",
  viewDetailsLabel = "View details",
  quickAddLabel = "Add to Cart",
  className,
}: ProductSectionProps<Size>) {
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
          <button
            type="button"
            className="font-body flex items-center justify-center rounded-lg border border-white bg-white px-10 py-3 text-base font-medium text-[#05365f] transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring focus-visible:ring-white/30"
          >
            {viewDetailsLabel}
          </button>
          <button
            type="button"
            className="font-body flex items-center justify-center rounded-lg bg-[#FF6B4A] px-10 py-3 text-base font-medium text-white transition hover:bg-[#FF5A39] focus-visible:outline-none focus-visible:ring focus-visible:ring-[#FF6B4A]/60"
          >
            {quickAddLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

