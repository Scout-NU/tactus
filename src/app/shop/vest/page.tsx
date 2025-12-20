"use client";

import { useState } from "react";
import Image from "next/image";
import { SizeSelector } from "@/app/components/shop/SizeSelector";
import { SHOP_PRODUCTS, SHOP_SIZES, ShopSize } from "../shopData";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, ChevronRight, Heart, Bluetooth, Spool, HeartHandshake, AudioWaveform, X } from "lucide-react";

// Shop assets
import shopVest from "@/app/_assets/shared/product-images/shop-vest.png";
import vestMain from "@/app/_assets/shop/vest/vest.png";
import slide3 from "@/app/_assets/shop/details/slide3.png";
import slide4 from "@/app/_assets/shop/details/slide4.png";
import runningJpg from "@/app/_assets/shop/details/running_jpg.png";
import batterImg from "@/app/_assets/shop/details/batter.png";
import armsCrossedImg from "@/app/_assets/shop/shared-model-photos/arms_crossed_jpg.png";

// Image carousel data
const carouselImages = [
  { src: shopVest, alt: "Tactus Vibewear Vest - Front View" },
  { src: vestMain, alt: "Tactus Vibewear Vest - Product Shot" },
  { src: slide3, alt: "Tactus Vibewear Vest - Side View" },
  { src: slide4, alt: "Tactus Vibewear Vest - Back View" },
];

export default function VestProductPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ShopSize>("M");
  const [activeTab, setActiveTab] = useState<"description" | "specifications">("description");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  
  const { addToCart } = useCart();
  const product = SHOP_PRODUCTS.find(p => p.id === "vibewear-vest");

  const toggleSpec = (specName: string) => {
    setExpandedSpec(expandedSpec === specName ? null : specName);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Select the correct Price ID based on the selected size
    const stripePriceId = product.stripePriceIds?.[selectedSize];
    
    addToCart({
      productId: product.id,
      title: product.title,
      price: product.priceInCents,
      size: selectedSize,
      image: typeof carouselImages[0].src === 'string' ? carouselImages[0].src : carouselImages[0].src.src,
      stripePriceId,
    });

    // Show feedback notification
    setShowAddedToCart(true);
    setTimeout(() => {
      setShowAddedToCart(false);
    }, 2000);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-white font-[Stratos] font-light">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-[120px] pt-24 pb-10">
        {/* Back to products link */}
        <div className="mb-5">
          <a href="/shop" className="text-[#05365f] text-[15px] font-medium hover:underline">
            ← Back to products
          </a>
        </div>

        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-14 mb-20">
          {/* Image Carousel */}
          <div className="flex flex-col gap-5 lg:w-[547px]">
            {/* Main Image */}
            <div className="relative bg-[#f0f0f0] rounded-[5px] h-[500px] overflow-hidden">
              <Image
                src={carouselImages[selectedImageIndex].src}
                alt={carouselImages[selectedImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-[#05365f]" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 transition"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-[#05365f]" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3">
              {carouselImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative bg-[#f0f0f0] rounded-[5px] h-[117px] w-[127px] overflow-hidden transition ${
                    selectedImageIndex === index
                      ? "border-2 border-[#fa7a57]"
                      : "border border-[#fffaf1]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="127px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6 lg:w-[574px]">
            {/* Title and Price */}
            <div>
              <h1 className="text-[32px] font-semibold text-[#05365f] mb-2">
                TACTUS VIBEWEAR VEST
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-[20px] text-[#9e9e9e] line-through">$500</span>
                <span className="text-[30px] font-semibold text-[#ff9475]">$459</span>
              </div>
            </div>

            {/* Description */}
            <p className="hidden md:block text-[16px] font-light text-[#05365f] leading-relaxed">
            This is where innovation meets simplicity. The original haptic vest combines minimal design with advanced vibration technology, creating a wearable experience that fits any setting — from the studio to the stage. Feel the music, and never miss a beat. 
            </p>

            {/* Product Type */}
            <div className="md:flex md:flex-col md:gap-3 hidden">
              <p className="text-[15px] font-light text-[#05365f]">
                Product: <span className="font-bold">Vibewear Vest</span>
              </p>
              <div className="flex gap-3">
                <div className="relative bg-[#f8eddb] border-2 border-[#f4c592] rounded-[5px] w-[97px] h-[97px] p-1">
                  <Image
                    src={vestMain}
                    alt="Vibewear Vest"
                    fill
                    className="object-contain rounded-[5px]"
                    sizes="97px"
                  />
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="flex flex-col gap-3">
              <p className="text-[15px] font-light text-[#05365f]">
                Size: <span className="font-bold">{selectedSize}</span>
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
                <SizeSelector
                  sizes={SHOP_SIZES}
                  selected={selectedSize}
                  onSelect={setSelectedSize}
                />
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-[15px] text-[#05365f] underline hover:no-underline whitespace-nowrap"
                >
                  View Size Chart
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-[#05365f] hover:bg-[#063d6f] text-white font-normal text-[18px] py-3 px-4 rounded-[5px] transition w-full relative"
            >
              {showAddedToCart ? "Added to cart! ✓" : "Add to cart"}
            </button>
          </div>
        </div>

        {/* Description/Specifications Section */}
        <div className="border border-[#d0d0d0] rounded-[4px] mb-20 overflow-hidden md:block hidden">
          {/* Tab Navigation */}
          <div className="flex gap-2 p-5">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex-1 py-2 px-4 rounded-[5px] font-bold text-[17px] text-[#05365f] transition ${
                activeTab === "description" ? "bg-[#f4c592]" : "bg-[#f8eddb]"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`flex-1 py-2 px-4 rounded-[5px] font-bold text-[17px] text-[#05365f] transition ${
                activeTab === "specifications" ? "bg-[#f4c592]" : "bg-[#f8eddb]"
              }`}
            >
              Specifications
            </button>
          </div>

          {/* Tab Content */}
          <div className="px-10 pb-10">
            {activeTab === "description" ? (
              <div>
                <h3 className="font-medium text-[17px] text-[#05365f] mb-4">
                  About the product
                </h3>
                <p className="text-[15px] font-light text-[#05365f] leading-relaxed mb-8">
                  Each piece is designed with intention from the premium, breathable materials to the lightweight, stretchable fit that moves naturally with you. The Tactus Vibewear line combines handcrafted design with advanced haptic technology to create a responsive, wearable experience that lets you feel every beat. With seamless Bluetooth connectivity, it syncs effortlessly with your music. Innovation in one refined design.
                </p>

                {/* Feature Icons */}
                <div className="flex justify-center gap-32 mt-8">
                  <div className="flex flex-col items-center gap-2">
                    <HeartHandshake className="w-8 h-8 text-[#05365f]" />
                    <p className="text-[17px] font-medium text-[#05365f]">Handcrafted</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Bluetooth className="w-8 h-8 text-[#05365f]" />
                    <p className="text-[17px] font-medium text-[#05365f] whitespace-nowrap">Bluetooth connectivity</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Spool className="w-8 h-8 text-[#05365f]" />
                    <p className="text-[17px] font-medium text-[#05365f] whitespace-nowrap">Premium materials</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="font-semibold text-[24px] text-[#05365f] mb-8">
                  TACTUS VIBEWEAR VEST<br />SPECIFICATIONS
                </h2>
                
                <div className="space-y-4">
                  {/* Size Chart */}
                  <div className="border border-[#cccccc]">
                    <button
                      onClick={() => toggleSpec("size-chart")}
                      className="w-full text-left px-6 py-4 font-semibold text-[#05365f] text-[16px] hover:bg-gray-50 transition"
                    >
                      Size Chart
                    </button>
                    {expandedSpec === "size-chart" && (
                      <div className="px-6 pb-6">
                        <p className="text-[15px] text-[#05365f] leading-relaxed">
                          Our vests are available in sizes XS through XL. Please refer to the measurements below or click &quot;View Size Chart&quot; above for detailed sizing information.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bluetooth/battery info */}
                  <div className="border border-[#cccccc]">
                    <button
                      onClick={() => toggleSpec("bluetooth")}
                      className="w-full text-left px-6 py-4 font-semibold text-[#05365f] text-[16px] hover:bg-gray-50 transition"
                    >
                      Bluetooth/battery info
                    </button>
                    {expandedSpec === "bluetooth" && (
                      <div className="px-6 pb-6 space-y-3 text-[15px] text-[#05365f]">
                        <div className="flex">
                          <span className="font-semibold w-40">Connectivity:</span>
                          <span>Bluetooth 5.0</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-40">Battery Life:</span>
                          <span>Up to 8 hours continuous use</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-40">Charging:</span>
                          <span>USB-C rechargeable (2 hours full charge)</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-40">Range:</span>
                          <span>Up to 30 feet (10 meters)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Materials */}
                  <div className="border border-[#cccccc]">
                    <button
                      onClick={() => toggleSpec("materials")}
                      className="w-full text-left px-6 py-4 font-semibold text-[#05365f] text-[16px] hover:bg-gray-50 transition"
                    >
                      Materials
                    </button>
                    {expandedSpec === "materials" && (
                      <div className="px-6 pb-6 space-y-3 text-[15px] text-[#05365f]">
                        <div className="flex">
                          <span className="font-semibold w-40">Outer Shell:</span>
                          <span>Premium breathable performance fabric</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-40">Lining:</span>
                          <span>Soft moisture-wicking mesh</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-40">Haptic System:</span>
                          <span>Medical-grade flexible actuators</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-40">Care:</span>
                          <span>Hand wash only, air dry, remove electronics</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Grid Section */}
        <div className="max-w-[1140px] mx-auto space-y-4 md:space-y-0">
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col gap-4">
            {/* Large Image Card - Full Width */}
            <div className="relative rounded-[5px] overflow-hidden h-[215px]">
              <Image
                src={runningJpg}
                alt="Running couple by city skyline"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 z-10">
                <p className="text-white text-[18px] font-bold uppercase leading-tight">
                  Built for movement to match your lifestyle
                </p>
              </div>
            </div>

            {/* Two Cards Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Gradient Card with Waveform */}
              <div 
                className="relative rounded-[5px] overflow-hidden h-[187px] p-4 flex flex-col justify-end"
                style={{
                  background: "radial-gradient(ellipse at top left, rgba(1,108,111,1) 0%, rgba(3,81,103,1) 32%, rgba(5,54,95,1) 64%)"
                }}
              >
                <AudioWaveform className="w-6 h-6 text-white mb-2" />
                <p className="text-white text-[12px] font-normal leading-snug">
                  Feel the beat,<br />
                  wherever,<br />
                  whenever.
                </p>
              </div>

              {/* Battery Image Card */}
              <div className="relative rounded-[5px] overflow-hidden h-[187px]">
                <Image
                  src={batterImg}
                  alt="Battery charging"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-55% to-[rgba(0,33,60,0.75)] rounded-[5px]" />
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large Image Card */}
            <div className="relative rounded-[5px] overflow-hidden h-[519px] md:col-span-2 lg:col-span-2">
              <Image
                src={runningJpg}
                alt="Running couple by city skyline"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 66vw, 731px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-10 z-10">
                <p className="text-white text-[24px] font-normal leading-snug">
                  Built for movement to match your lifestyle
                </p>
              </div>
            </div>

            {/* Gradient Card with Heart */}
            <div 
              className="relative rounded-[5px] overflow-hidden h-[519px] p-10"
              style={{
                background: "radial-gradient(ellipse at center, rgba(1,108,111,1) 0%, rgba(3,81,103,1) 50%, rgba(5,54,95,1) 100%)"
              }}
            >
              <Heart className="w-10 h-10 text-white mb-4" />
              <p className="text-white text-[24px] font-normal leading-snug">
                Built for movement<br />
                to match your<br />
                lifestyle
              </p>
            </div>

            {/* Gradient Card with Waveform */}
            <div 
              className="relative rounded-[5px] overflow-hidden h-[465px] p-10"
              style={{
                background: "radial-gradient(ellipse at top left, rgba(1,108,111,1) 0%, rgba(3,81,103,1) 32%, rgba(5,54,95,1) 64%)"
              }}
            >
              <AudioWaveform className="w-10 h-10 text-white mb-4" />
              <p className="text-white text-[24px] font-normal leading-snug">
                Feel the beat,<br />
                wherever,<br />
                whenever.
              </p>
            </div>

            {/* Medium Image Card */}
            <div className="relative rounded-[5px] overflow-hidden h-[465px] lg:col-span-1">
              <Image
                src={armsCrossedImg}
                alt="Person wearing vest with arms crossed"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 522px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-10 z-10">
                <p className="text-white text-[24px] font-normal leading-snug">
                  Lightweight performance fit,<br />
                  made with premium materials
                </p>
              </div>
            </div>

            {/* Battery Image Card */}
            <div className="relative rounded-[5px] overflow-hidden h-[465px]">
              <Image
                src={batterImg}
                alt="Battery charging"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 278px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-10 z-10">
                <p className="text-white text-[24px] font-normal leading-snug">
                  Rechargeable<br />
                  battery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[5px] border border-[#d0d0d0] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="sticky top-4 float-right mr-4 mt-4 text-[#05365f] hover:text-[#063d6f] transition z-10"
              aria-label="Close size guide"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-4 sm:p-8">
              <h2 className="text-[#05365f] text-[18px] sm:text-[20px] font-bold text-center mb-4 sm:mb-6">
                Vest
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[400px]">
                  <thead>
                    <tr>
                      <th className="border border-[#cccccc] bg-white px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-bold text-[#05365f] text-center">
                        SIZE
                      </th>
                      <th className="border border-[#cccccc] bg-white px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-bold text-[#05365f] text-center">
                        LENGTH
                      </th>
                      <th className="border border-[#cccccc] bg-white px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-bold text-[#05365f] text-center">
                        CHEST WIDTH
                      </th>
                      <th className="border border-[#cccccc] bg-white px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-bold text-[#05365f] text-center">
                        SHOULDER WIDTH
                      </th>
                      <th className="border border-[#cccccc] bg-white px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-bold text-[#05365f] text-center">
                        BOTTOM
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-bold text-[#05365f] text-center">
                        XS
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        54
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        87
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        40.5
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        79
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-bold text-[#05365f] text-center">
                        S
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        60
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        94.5
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        43.5
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        85
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-bold text-[#05365f] text-center">
                        M
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        66
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        102
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        46.5
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        91
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-bold text-[#05365f] text-center">
                        L
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        72
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        110.5
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        49.5
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        99.5
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-bold text-[#05365f] text-center">
                        XL
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        78
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        119
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        52.5
                      </td>
                      <td className="border border-[#cccccc] px-2 sm:px-4 py-2 sm:py-3 text-[12px] sm:text-[14px] font-normal text-[#05365f] text-center">
                        108
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-[12px] sm:text-[13px] text-[#666] text-center mt-4">
                All measurements are in centimeters
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

