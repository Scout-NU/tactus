import Image from "next/image";

import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  priority?: boolean;
  className?: string;
};

type GalleryPlaceholderProps = {
  aspect: string;
  className?: string;
  tone?: "default" | "muted";
  image?: GalleryImage | null;
};

export function GalleryPlaceholder({
  aspect,
  className,
  tone = "default",
  image,
}: GalleryPlaceholderProps) {
  const shouldShowGradient = !image;

  return (
    <div
      className={cn(aspect, "relative w-full overflow-hidden", className)}
      role="img"
      aria-label={image ? image.alt : "Product imagery placeholder"}
    >
      {shouldShowGradient && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            tone === "default"
              ? "from-white/60 via-white/40 to-[#efefef]"
              : "from-white/40 via-white/20 to-[#e5e7eb]",
          )}
        />
      )}

      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={image.priority}
          className={cn(
            "object-cover",
            image.objectFit === "contain" && "object-contain",
            image.className,
          )}
          style={{ objectPosition: image.objectPosition ?? "center" }}
        />
      )}
    </div>
  );
}

