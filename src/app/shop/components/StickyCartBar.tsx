"use client";

import { useState } from "react";
import Image from "next/image";

interface StickyCartBarProps {
  productName: string;
  productImage: string;
  price: number;
  description: string;
}

export default function StickyCartBar({
  productName,
  productImage,
  price,
  description,
}: StickyCartBarProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-4">
        {/* Product Image */}
        <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
          <Image
            src={productImage}
            alt={productName}
            width={64}
            height={64}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-black truncate">
            {productName}
          </h3>
          <p className="text-sm font-light text-black truncate">
            {description}
          </p>
        </div>

        {/* Price */}
        <div className="text-lg font-normal text-black whitespace-nowrap">
          ${price.toFixed(2)}
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-center border border-gray-300 rounded px-6 py-2 min-w-[42px]">
          <span className="text-base font-light text-black">{quantity}</span>
        </div>

        {/* Add to Cart Button */}
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-12 py-3 rounded-lg text-base font-normal transition-colors whitespace-nowrap">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

