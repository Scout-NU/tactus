"use client";

import { useState } from "react";

interface SizeSelectorProps {
  sizes?: string[];
  onSizeChange?: (size: string) => void;
}

export default function SizeSelector({
  sizes = ["S", "M", "L"],
  onSizeChange,
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    onSizeChange?.(size);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-black">Size</label>
      <div className="flex gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeClick(size)}
            className={`w-20 h-14 flex items-center justify-center border border-gray-300 rounded-md text-lg font-light transition-all hover:border-black ${
              selectedSize === size
                ? "bg-black text-white border-black"
                : "bg-white text-black"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

