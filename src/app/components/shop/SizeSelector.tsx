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
              "font-body flex h-14 w-20 items-center justify-center rounded-md border border-[#cdcdcd] bg-white text-lg font-light text-[#111827] transition",
              "hover:border-[#05365f] hover:text-[#05365f] focus-visible:outline-none focus-visible:ring focus-visible:ring-[#05365f]/30",
              isSelected && "border-[#05365f] text-[#05365f] shadow-sm",
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}

