import { cn } from "@/lib/utils";

import { GalleryPlaceholder, type GalleryImage } from "./GalleryPlaceholder";

export type ProductGalleryVariant = "feature" | "simple";

type ProductGalleryProps = {
  variant: ProductGalleryVariant;
  images?: readonly GalleryImage[];
  className?: string;
};

export function ProductGallery({
  variant,
  images,
  className,
}: ProductGalleryProps) {
  const baseHeight = "lg:h-[522px]";

  const sharedWrapperClasses = cn(
    "grid gap-4 lg:grid-cols-[minmax(0,_1.6fr)_minmax(0,_1fr)] lg:items-stretch",
    baseHeight,
    className
  );

  const getImage = (index: number): GalleryImage | null =>
    images?.[index] ?? null;

  if (variant === "feature") {
    return (
      <div className={sharedWrapperClasses}>
        <GalleryPlaceholder
          aspect="aspect-[4/5] lg:aspect-auto lg:h-full"
          className="rounded-[5px] bg-[#efefef]"
          image={getImage(0)}
        />
        <div className="hidden h-full flex-col gap-4 lg:flex">
          <div className="grid gap-4 sm:grid-cols-2 lg:flex lg:flex-1 lg:gap-4">
            <GalleryPlaceholder
              aspect="aspect-square lg:aspect-auto lg:h-full"
              className="rounded-[5px] bg-[#efefef] lg:flex-1"
              image={getImage(1)}
            />
            <GalleryPlaceholder
              aspect="aspect-square lg:aspect-auto lg:h-full"
              className="rounded-[5px] bg-[#efefef] lg:flex-1"
              image={getImage(2)}
            />
          </div>
          <GalleryPlaceholder
            aspect="aspect-[3/2] lg:aspect-auto lg:h-full"
            className="rounded-[5px] bg-[#efefef] lg:flex-1"
            image={getImage(3)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={sharedWrapperClasses}>
      <GalleryPlaceholder
        tone="muted"
        aspect="aspect-[4/5] lg:aspect-auto lg:h-full"
        className="rounded-[5px] bg-[#f4f5f7]"
        image={getImage(0)}
      />
      <div className="hidden h-full flex-col gap-4 lg:flex">
        <div className="grid gap-4 sm:grid-cols-2 lg:flex lg:flex-1 lg:gap-4">
          <GalleryPlaceholder
            tone="muted"
            aspect="aspect-square lg:aspect-auto lg:h-full"
            className="rounded-[5px] bg-[#f4f5f7] lg:flex-1"
            image={getImage(1)}
          />
          <GalleryPlaceholder
            tone="muted"
            aspect="aspect-square lg:aspect-auto lg:h-full"
            className="rounded-[5px] bg-[#f4f5f7] lg:flex-1"
            image={getImage(2)}
          />
        </div>
        <GalleryPlaceholder
          tone="muted"
          aspect="aspect-[3/2] lg:aspect-auto lg:h-full"
          className="rounded-[5px] bg-[#f4f5f7] lg:flex-1"
          image={getImage(3)}
        />
      </div>
    </div>
  );
}
