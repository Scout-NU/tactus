"use client";

import { useState } from "react";
import Image from "next/image";
import { SizeSelector } from "@/app/components/shop/SizeSelector";
import { useCart } from "@/context/CartContext";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Bluetooth,
  Spool,
  HeartHandshake,
  AudioWaveform,
  X,
} from "lucide-react";
import type { JacketPageData, SpecSection } from "./jacketData";
import type { ShopSize } from "../shopData";

type JacketPageClientProps = {
  data: JacketPageData;
};

export default function JacketPageClient({ data }: JacketPageClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ShopSize>("M");
  const [activeTab, setActiveTab] = useState<"description" | "specifications">("description");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const { addToCart } = useCart();

  const toggleSpec = (specId: string) => {
    setExpandedSpec(expandedSpec === specId ? null : specId);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? data.carouselImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === data.carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    const stripePriceId = data.stripePriceIds?.[selectedSize];

    // Handle both string URLs (from Contentful) and StaticImageData (local imports)
    const imageSrc = data.carouselImages[0]?.src;
    const imageUrl = typeof imageSrc === "string" ? imageSrc : imageSrc?.src;

    addToCart({
      productId: "vibewear-jacket",
      title: data.title,
      price: data.priceInCents,
      size: selectedSize,
      image: imageUrl,
      stripePriceId,
    });

    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  return (
    <div className="bg-white font-[Stratos] font-light">
      <div className="mx-auto max-w-[1440px] px-8 pb-10 pt-24 lg:px-[120px]">
        <div className="mb-5">
          <a href="/shop" className="text-[15px] font-medium text-[#05365f] hover:underline">
            ← Back to products
          </a>
        </div>

        <div className="mb-20 flex flex-col gap-14 lg:flex-row">
          <div className="flex flex-col gap-5 lg:w-[547px]">
            <div className="relative h-[500px] overflow-hidden rounded-[5px] bg-[#f0f0f0]">
              <Image
                src={data.carouselImages[selectedImageIndex].src}
                alt={data.carouselImages[selectedImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 transition hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-[#05365f]" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 transition hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-[#05365f]" />
              </button>
            </div>

            <div className="flex gap-3">
              {data.carouselImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-[117px] w-[127px] overflow-hidden rounded-[5px] bg-[#f0f0f0] transition ${
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

          <div className="flex flex-col gap-6 lg:w-[574px]">
            <div>
              <h1 className="mb-2 text-[32px] font-semibold text-[#05365f]">{data.title}</h1>
              <div className="flex items-center gap-3">
                <span className="text-[20px] text-[#9e9e9e] line-through">{data.originalPrice}</span>
                <span className="text-[30px] font-semibold text-[#ff9475]">{data.currentPrice}</span>
              </div>
            </div>

            <p className="text-[16px] font-light leading-relaxed text-[#05365f]">
              {data.shortDescription}
            </p>

            <div className="flex flex-col gap-3">
              <p className="text-[15px] font-light text-[#05365f]">
                Product: <span className="font-bold">{data.productLabel}</span>
              </p>
              <div className="flex gap-3">
                <div className="relative h-[97px] w-[97px] rounded-[5px] border-2 border-[#f4c592] bg-[#f8eddb] p-1">
                  <Image
                    src={data.productImage}
                    alt={data.productLabel}
                    fill
                    className="rounded-[5px] object-contain"
                    sizes="97px"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[15px] font-light text-[#05365f]">
                Size: <span className="font-bold">{selectedSize}</span>
              </p>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end">
                <SizeSelector sizes={data.sizes} selected={selectedSize} onSelect={setSelectedSize} />
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="whitespace-nowrap text-[15px] text-[#05365f] underline hover:no-underline"
                >
                  View Size Chart
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="relative w-full rounded-[5px] bg-[#05365f] px-4 py-3 text-[18px] font-normal text-white transition hover:bg-[#063d6f]"
            >
              {showAddedToCart ? "Added to cart! ✓" : "Add to cart"}
            </button>
          </div>
        </div>

        <div className="mb-20 overflow-hidden rounded-[4px] border border-[#d0d0d0]">
          <div className="flex gap-2 p-5">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex-1 rounded-[5px] px-4 py-2 text-[17px] font-bold text-[#05365f] transition ${
                activeTab === "description" ? "bg-[#f4c592]" : "bg-[#f8eddb]"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`flex-1 rounded-[5px] px-4 py-2 text-[17px] font-bold text-[#05365f] transition ${
                activeTab === "specifications" ? "bg-[#f4c592]" : "bg-[#f8eddb]"
              }`}
            >
              Specifications
            </button>
          </div>

          <div className="px-10 pb-10">
            {activeTab === "description" ? (
              <div>
                <h3 className="mb-4 text-[17px] font-medium text-[#05365f]">About the product</h3>
                <p className="mb-8 text-[15px] font-light leading-relaxed text-[#05365f]">
                  {data.fullDescription}
                </p>
                <div className="mt-8 flex justify-center gap-32">
                  <div className="flex flex-col items-center gap-2">
                    <HeartHandshake className="h-8 w-8 text-[#05365f]" />
                    <p className="text-[17px] font-medium text-[#05365f]">Handcrafted</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Bluetooth className="h-8 w-8 text-[#05365f]" />
                    <p className="whitespace-nowrap text-[17px] font-medium text-[#05365f]">
                      Bluetooth connectivity
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Spool className="h-8 w-8 text-[#05365f]" />
                    <p className="whitespace-nowrap text-[17px] font-medium text-[#05365f]">
                      Premium materials
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="mb-8 text-[24px] font-semibold text-[#05365f]">
                  {data.title}
                  <br />
                  SPECIFICATIONS
                </h2>
                <div className="space-y-4">
                  {data.specifications.map((spec) => (
                    <SpecAccordion
                      key={spec.id}
                      spec={spec}
                      isExpanded={expandedSpec === spec.id}
                      onToggle={() => toggleSpec(spec.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <FeatureGrid data={data} />
      </div>

      {showSizeGuide && <SizeGuideModal data={data} onClose={() => setShowSizeGuide(false)} />}
    </div>
  );
}

function SpecAccordion({
  spec,
  isExpanded,
  onToggle,
}: {
  spec: SpecSection;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-[#cccccc]">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left text-[16px] font-semibold text-[#05365f] transition hover:bg-gray-50"
      >
        {spec.title}
      </button>
      {isExpanded && (
        <div className="space-y-3 px-6 pb-6 text-[15px] text-[#05365f]">
          {typeof spec.content === "string" ? (
            <p className="leading-relaxed">{spec.content}</p>
          ) : (
            spec.content.map((item, idx) => (
              <div key={idx} className="flex">
                <span className="w-40 font-semibold">{item.label}:</span>
                <span>{item.value}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function FeatureGrid({ data }: { data: JacketPageData }) {
  return (
    <div className="mx-auto max-w-[1140px] space-y-4 md:space-y-0">
      <div className="flex flex-col gap-4 md:hidden">
        <div className="relative h-[215px] overflow-hidden rounded-[5px]">
          <Image
            src={data.featureGrid.runningImage}
            alt="Jeremy and a woman running wearing Tactus Vibewear"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 to-transparent p-4">
            <p className="text-[18px] font-bold uppercase leading-tight text-white">
              {data.featureGrid.movementText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className="relative flex h-[187px] flex-col justify-end overflow-hidden rounded-[5px] p-4"
            style={{
              background:
                "radial-gradient(ellipse at top left, rgba(1,108,111,1) 0%, rgba(3,81,103,1) 32%, rgba(5,54,95,1) 64%)",
            }}
          >
            <AudioWaveform className="mb-2 h-6 w-6 text-white" />
            <p className="whitespace-pre-line text-[12px] font-normal leading-snug text-white">
              {data.featureGrid.feelBeatText}
            </p>
          </div>

          <div className="relative h-[187px] overflow-hidden rounded-[5px]">
            <Image
              src={data.featureGrid.batteryImage}
              alt="Battery charging"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 rounded-[5px] bg-gradient-to-b from-transparent from-55% to-[rgba(0,33,60,0.75)]" />
          </div>
        </div>
      </div>

      <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="relative h-[519px] overflow-hidden rounded-[5px] md:col-span-2 lg:col-span-2">
          <Image
            src={data.featureGrid.runningImage}
            alt="Jeremy and a woman running wearing Tactus Vibewear"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 66vw, 731px"
          />
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 to-transparent p-10">
            <p className="text-[24px] font-normal leading-snug text-white">
              {data.featureGrid.movementText}
            </p>
          </div>
        </div>

        <div
          className="relative h-[519px] overflow-hidden rounded-[5px] p-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(1,108,111,1) 0%, rgba(3,81,103,1) 50%, rgba(5,54,95,1) 100%)",
          }}
        >
          <Heart className="mb-4 h-10 w-10 text-white" />
          <p className="whitespace-pre-line text-[24px] font-normal leading-snug text-white">
            {data.featureGrid.heartText}
          </p>
        </div>

        <div
          className="relative h-[465px] overflow-hidden rounded-[5px] p-10"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(1,108,111,1) 0%, rgba(3,81,103,1) 32%, rgba(5,54,95,1) 64%)",
          }}
        >
          <AudioWaveform className="mb-4 h-10 w-10 text-white" />
          <p className="whitespace-pre-line text-[24px] font-normal leading-snug text-white">
            {data.featureGrid.feelBeatText}
          </p>
        </div>

        <div className="relative h-[465px] overflow-hidden rounded-[5px] lg:col-span-1">
          <Image
            src={data.featureGrid.armsCrossedImage}
            alt="Person wearing jacket with arms crossed"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 522px"
          />
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-10">
            <p className="whitespace-pre-line text-[24px] font-normal leading-snug text-white">
              {data.featureGrid.lightweightText}
            </p>
          </div>
        </div>

        <div className="relative h-[465px] overflow-hidden rounded-[5px]">
          <Image
            src={data.featureGrid.batteryImage}
            alt="Battery charging"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 278px"
          />
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-10">
            <p className="whitespace-pre-line text-[24px] font-normal leading-snug text-white">
              {data.featureGrid.batteryText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SizeGuideModal({ data, onClose }: { data: JacketPageData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[5px] border border-[#d0d0d0] bg-white">
        <button
          onClick={onClose}
          className="sticky right-4 top-4 float-right z-10 mr-4 mt-4 text-[#05365f] transition hover:text-[#063d6f]"
          aria-label="Close size guide"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-4 sm:p-8">
          <h2 className="mb-4 text-center text-[18px] font-bold text-[#05365f] sm:mb-6 sm:text-[20px]">
            Jacket
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-[400px] w-full border-collapse">
              <thead>
                <tr>
                  {["SIZE", "LENGTH", "CHEST WIDTH", "SHOULDER WIDTH", "BOTTOM", "SLEEVE LENGTH"].map(
                    (header) => (
                      <th
                        key={header}
                        className="border border-[#cccccc] bg-white px-2 py-2 text-center text-[12px] font-bold text-[#05365f] sm:px-4 sm:py-3 sm:text-[14px]"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {data.sizeChart.map((row) => (
                  <tr key={row.size}>
                    <td className="border border-[#cccccc] px-2 py-2 text-center text-[12px] font-bold text-[#05365f] sm:px-4 sm:py-3 sm:text-[14px]">
                      {row.size}
                    </td>
                    <td className="border border-[#cccccc] px-2 py-2 text-center text-[12px] font-normal text-[#05365f] sm:px-4 sm:py-3 sm:text-[14px]">
                      {row.length}
                    </td>
                    <td className="border border-[#cccccc] px-2 py-2 text-center text-[12px] font-normal text-[#05365f] sm:px-4 sm:py-3 sm:text-[14px]">
                      {row.chestWidth}
                    </td>
                    <td className="border border-[#cccccc] px-2 py-2 text-center text-[12px] font-normal text-[#05365f] sm:px-4 sm:py-3 sm:text-[14px]">
                      {row.shoulderWidth}
                    </td>
                    <td className="border border-[#cccccc] px-2 py-2 text-center text-[12px] font-normal text-[#05365f] sm:px-4 sm:py-3 sm:text-[14px]">
                      {row.bottom}
                    </td>
                    <td className="border border-[#cccccc] px-2 py-2 text-center text-[12px] font-normal text-[#05365f] sm:px-4 sm:py-3 sm:text-[14px]">
                      {row.sleeveLength}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-[12px] text-[#666] sm:text-[13px]">
            All measurements are in centimeters
          </p>
        </div>
      </div>
    </div>
  );
}

