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
  galleryVariant,
  sizes,
  selectedSize,
  onSelectSize,
  galleryImages,
  sizeLabel = "Size",
  viewDetailsLabel = "View details",
  quickAddLabel = "Quick add",
  className,
}: ProductSectionProps<Size>) {
  return (
    <section className={cn("space-y-10", className)}>
      <div className="gap-6 lg:grid lg:grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)] lg:items-start">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-[#111827] sm:text-3xl lg:text-[2.5rem]">
          {title}
        </h2>
        <p className="font-body mt-4 text-base text-[#111827] lg:mt-0 lg:text-right">
          {description}
        </p>
      </div>

      <ProductGallery variant={galleryVariant} images={galleryImages} />

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[auto_auto_1fr] lg:items-center lg:gap-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
          <p className="font-body text-sm font-medium text-[#111827] lg:whitespace-nowrap">
            {sizeLabel}
          </p>
          <SizeSelector
            sizes={sizes}
            selected={selectedSize}
            onSelect={onSelectSize}
            className="lg:mt-0"
          />
        </div>

        <span className="font-body text-2xl font-normal text-[#111827] lg:justify-self-start">
          {price}
        </span>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4 lg:justify-self-end">
          <button
            type="button"
            className="font-body flex items-center justify-center rounded-lg border border-[#aeb5bd] px-10 py-3 text-base font-medium text-[#111827] transition hover:border-[#05365f]/60 hover:text-[#05365f] focus-visible:outline-none focus-visible:ring focus-visible:ring-[#05365f]/30"
          >
            {viewDetailsLabel}
          </button>
          <button
            type="button"
            className="font-body flex items-center justify-center rounded-lg bg-[#05365f] px-10 py-3 text-base font-medium text-white transition hover:bg-[#042a48] focus-visible:outline-none focus-visible:ring focus-visible:ring-[#05365f]/60"
          >
            {quickAddLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

