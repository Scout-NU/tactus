"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  mainImage: string;
  thumbnails: string[];
}

export default function ProductGallery({
  mainImage,
  thumbnails,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={selectedImage}
          alt="Product"
          width={479}
          height={479}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {thumbnails.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(thumb)}
            className={`w-28 h-26 bg-gray-200 rounded-lg overflow-hidden transition-all hover:opacity-75 ${
              selectedImage === thumb ? "ring-2 ring-black" : ""
            }`}
          >
            <Image
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              width={110}
              height={101}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

