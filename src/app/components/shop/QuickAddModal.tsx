"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { GalleryImage } from "./GalleryPlaceholder";

type QuickAddModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  priceInCents: number;
  stripePriceIds?: Record<string, string>;
  sizes: readonly string[];
  galleryImages?: readonly GalleryImage[];
};

export function QuickAddModal({
  isOpen,
  onClose,
  productId,
  title,
  description,
  price,
  originalPrice,
  priceInCents,
  stripePriceIds,
  sizes,
  galleryImages = [],
}: QuickAddModalProps) {
  const { addToCart } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Calculate default size dynamically (middle of array or first)
  const getDefaultSize = useCallback(() => {
    if (sizes.length === 0) return "M";
    return sizes[Math.floor(sizes.length / 2)];
  }, [sizes]);
  
  // State - resets to defaults
  const [selectedSize, setSelectedSize] = useState<string>(() => getDefaultSize());
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Handle close with proper cleanup
  const handleClose = useCallback(() => {
    // Reset state on close
    setSelectedSize(getDefaultSize());
    setQuantity(1);
    setCurrentImageIndex(0);
    setIsAdding(false);
    onClose();
  }, [onClose, getDefaultSize]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedSize(getDefaultSize());
      setQuantity(1);
      setCurrentImageIndex(0);
      setIsAdding(false);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, getDefaultSize]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, handleClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      firstElement?.focus();

      return () => document.removeEventListener("keydown", handleTab);
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleBuyNow = async () => {
    if (isAdding) return; // Prevent double-click
    
    setIsAdding(true);
    try {
      const image = galleryImages[0];
      // Select the correct Price ID based on the selected size
      const stripePriceId = stripePriceIds?.[selectedSize];
      
      // Debug logging
      console.log("🔍 Quick Add Modal - Add to Cart Debug:");
      console.log("  Selected Size:", selectedSize);
      console.log("  All stripePriceIds:", stripePriceIds);
      console.log("  Selected stripePriceId:", stripePriceId);
      console.log("  Product title:", title);
      
      addToCart({
        productId,
        title,
        price: priceInCents,
        size: selectedSize,
        quantity,
        image: image?.src,
        stripePriceId,
      });
      
      // Brief delay to show success state
      await new Promise(resolve => setTimeout(resolve, 300));
      onClose();
    } catch (error) {
      console.error("Error adding to cart:", error);
      setIsAdding(false);
    }
  };

  const handlePrevImage = () => {
    if (galleryImages.length === 0) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (galleryImages.length === 0) return;
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  if (!isOpen) return null;

  // Bounds check for current image
  const safeImageIndex = Math.min(currentImageIndex, galleryImages.length - 1);
  const currentImage = galleryImages[safeImageIndex] ?? galleryImages[0];
  const showNavigation = galleryImages.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative flex flex-col md:flex-row h-[90vh] md:h-[600px] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-gray-600 shadow-md transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#05365f]"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Left Side - Image Carousel */}
        <div className="relative flex w-full md:w-1/2 flex-col bg-gray-100 p-4 md:p-8">
          {/* Main Image */}
          <div className="relative mb-4 flex h-[250px] md:h-[450px] flex-1 items-center justify-center overflow-hidden">
            {currentImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt || title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <p className="text-gray-400">No image available</p>
              </div>
            )}

            {/* Navigation Arrows */}
            {showNavigation && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#05365f]"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="text-[#05365f]" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#05365f]"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="text-[#05365f]" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {galleryImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    index === currentImageIndex
                      ? "border-[#05365f]"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Product Details */}
        <div className="flex w-full md:w-1/2 flex-col overflow-y-auto p-4 md:p-8">
          {/* Product Title */}
          <h2
            id="modal-title"
            className="font-heading mb-2 md:mb-4 text-2xl md:text-3xl font-bold uppercase text-[#05365f]"
          >
            {title}
          </h2>

          {/* Description */}
          <p className="font-body mb-4 md:mb-6 text-sm leading-relaxed text-gray-600">
            {description}
          </p>

          {/* Price */}
          <div className="mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
            {originalPrice && (
              <span className="font-body text-xl md:text-2xl font-semibold text-gray-400 line-through">
                {originalPrice}
              </span>
            )}
            <span className="font-body text-2xl md:text-3xl font-semibold text-[#FF6B4A]">
              {price}
            </span>
            <span className="font-body text-xs md:text-sm text-gray-500">
              shipping not included
            </span>
          </div>

          {/* Product Label */}
          <p className="font-body mb-4 md:mb-6 text-sm text-gray-600">
            Product: {title}
          </p>

          {/* Size Selection */}
          <div className="mb-4 md:mb-6">
            <p className="font-body mb-3 text-sm font-medium text-[#05365f]">
              Size
            </p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`font-body flex h-12 w-14 sm:w-16 items-center justify-center rounded-lg border-2 text-base font-medium transition ${
                    selectedSize === size
                      ? "border-[#05365f] bg-[#05365f] text-white"
                      : "border-gray-300 text-gray-700 hover:border-[#05365f]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-4 md:mb-8">
            <p className="font-body mb-3 text-sm font-medium text-[#05365f]">
              Quantity
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 text-gray-700 transition hover:border-[#05365f] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="font-body w-16 rounded-lg border-2 border-gray-300 px-3 py-2 text-center text-base cursor-default bg-white"
              />
              <button
                onClick={incrementQuantity}
                disabled={quantity >= 99}
                className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 text-gray-700 transition hover:border-[#05365f] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            disabled={isAdding}
            className="font-body w-full rounded-lg bg-[#05365f] py-3 md:py-4 text-base md:text-lg font-semibold text-white transition hover:bg-[#042a48] focus:outline-none focus:ring-2 focus:ring-[#05365f] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

