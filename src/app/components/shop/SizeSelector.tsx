"use client";

import { cn } from "@/lib/utils";

type SizeSelectorProps<Size extends string> = {
  sizes: readonly Size[];
  selected?: Size;
  onSelect?: (size: Size) => void;
  className?: string;
};

export function SizeSelector<Size extends string>({
  sizes,
  selected,
  onSelect,
  className,
}: SizeSelectorProps<Size>) {
  return (
    <div className={cn("flex gap-4", className)}>
      {sizes.map((size) => {
        const isSelected = selected === size;

        return (
          <button
            key={size}
            type="button"
            aria-pressed={isSelected}
            aria-label={`Select size ${size}`}
            onClick={() => onSelect?.(size)}
            className={cn(
              "font-body flex h-[53px] w-[76px] items-center justify-center rounded-[5px] border text-[19px] font-light text-[#05365f] transition",
              "hover:border-[#f4c592] focus-visible:outline-none focus-visible:ring focus-visible:ring-[#05365f]/30",
              isSelected 
                ? "bg-[#f8eddb] border-[#f4c592]" 
                : "bg-white border-[#9e9e9e]"
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
