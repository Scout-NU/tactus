"use client";

import { Star } from "lucide-react";

interface ProductInfoProps {
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
}

export default function ProductInfo({
  name,
  description,
  price,
  rating,
  reviewCount,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl md:text-4xl font-medium text-black">{name}</h1>

      {/* Description */}
      <p className="text-sm font-light leading-relaxed text-black">
        {description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < Math.floor(rating)
                  ? "fill-black text-black"
                  : index < rating
                    ? "fill-black text-black opacity-50"
                    : "fill-none text-black"
              }`}
            />
          ))}
        </div>
        <p className="text-sm font-light text-black">
          {rating.toFixed(1)} ({reviewCount} reviews)
        </p>
      </div>

      {/* Price */}
      <div>
        <p className="text-3xl font-normal text-black">${price.toFixed(2)}</p>
        <p className="text-sm font-light text-black mt-1">
          shipping not included
        </p>
      </div>
    </div>
  );
}

