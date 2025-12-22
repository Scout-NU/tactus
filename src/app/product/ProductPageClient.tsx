"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FeaturePopup from "../components/FeaturePopup/FeaturePopup";
import type { ProductPageData } from "./productData";

import waveInLanding from "@/app/_assets/shared/waves/wave-in-landing.svg";
import productHomePhoto from "@/app/_assets/shared/product-images/product-home-photo.png";
import fingerBattery from "@/app/_assets/product/Finger Holding Battery_Flipped.png";

type ProductPageClientProps = {
  data: ProductPageData;
};

export default function ProductPageClient({ data }: ProductPageClientProps) {
  // Desktop: Track each popup individually (multiple can be open)
  const [openDesktopPopups, setOpenDesktopPopups] = useState<Set<string>>(new Set());
  // Mobile: Only one popup at a time
  const [openMobilePopup, setOpenMobilePopup] = useState<string | null>(null);

  const handleDesktopToggle = (featureId: string) => {
    setOpenDesktopPopups((prev) => {
      const next = new Set(prev);
      if (next.has(featureId)) {
        next.delete(featureId);
      } else {
        next.add(featureId);
      }
      return next;
    });
  };

  const handleMobileToggle = (featureId: string) => {
    setOpenMobilePopup((prev) => (prev === featureId ? null : featureId));
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(178.201deg, rgb(1, 108, 111) 3.8936%, rgb(5, 54, 95) 41.264%)",
      }}
    >
      <div className="pointer-events-none absolute bottom-[400px] left-0 z-0 hidden h-full w-full md:block">
        <Image src={waveInLanding} alt="" fill style={{ objectFit: "cover" }} />
      </div>

      <div className="relative z-[1] pt-[100px] md:pt-[100px]">
        <section className="relative flex min-h-[30vh] flex-col items-center px-5 pb-[50px] pt-[60px] text-center md:px-5 md:pb-[100px] md:pt-[60px]">
          <h1 className="mx-auto mb-5 max-w-[951px] font-heading text-[32px] font-bold uppercase leading-[110%] text-white md:mb-5 md:text-[64px] md:leading-[100%]">
            {data.hero.heading}
          </h1>
          <p className="mx-auto mb-4 max-w-[657px] px-4 font-body text-base font-normal text-white md:mb-20 md:px-0 md:text-xl">
            {data.hero.subtext}
          </p>

          <div className="relative mx-auto mb-5 w-full max-w-[1440px] min-h-[380px] md:min-h-[1000px] mb-[150px] pb-5 md:mb-0 md:min-h-[850px] md:pb-0">
            <div className="absolute left-1/2 top-0 z-[5] mb-5 flex w-full -translate-x-1/2 justify-center md:mb-0 md:w-auto md:transform-none md:relative md:left-auto">
              {data.hero.productImageUrl ? (
                <Image
                  src={data.hero.productImageUrl}
                  alt="Tactus Jacket"
                  width={537}
                  height={630}
                  priority
                  className="!w-[90%] !h-auto md:!w-[537px]"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <Image
                  src={productHomePhoto}
                  alt="Tactus Jacket"
                  width={537}
                  height={630}
                  priority
                  className="!w-[90%] !h-auto md:!w-[537px]"
                  style={{ objectFit: "contain" }}
                />
              )}
            </div>

            {/* Desktop: Multiple popups can be open */}
            <div className="hidden md:block">
              {data.features.map((feature) => (
                <FeaturePopup
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  isOpen={openDesktopPopups.has(feature.id)}
                  onToggle={() => handleDesktopToggle(feature.id)}
                  position={feature.desktopPosition}
                  dotPosition={feature.desktopDot}
                />
              ))}
            </div>

            {/* Mobile: Only one popup at a time */}
            <div className="md:hidden">
              {data.features.map((feature) => (
                <FeaturePopup
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  isOpen={openMobilePopup === feature.id}
                  onToggle={() => handleMobileToggle(feature.id)}
                  position="mobile"
                  dotPosition={feature.mobileDot}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto flex max-w-[1440px] flex-col items-center px-5 pb-[100px] pt-[50px] text-center md:items-start md:px-5 md:pb-[200px] md:pt-[100px] md:text-left">
          <h2 className="mb-6 max-w-[984px] whitespace-pre-line font-heading text-[28px] font-bold uppercase leading-[110%] text-white md:mb-6 md:ml-[98px] md:text-[64px] md:leading-[100%]">
            {data.cta.heading}
          </h2>
          <p className="mb-8 max-w-[685px] font-body text-base font-normal leading-[1.5] text-white md:mb-10 md:ml-[98px] md:text-xl md:leading-normal">
            {data.cta.description}
          </p>

          <Link
            href={data.cta.buttonLink}
            className="ml-0 flex h-12 w-[200px] items-center justify-center rounded-md border border-gray-600 bg-[#95e2e2] font-heading text-base font-normal text-[#05365f] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#88dde1] hover:shadow-[0_4px_12px_rgba(149,226,226,0.3)] md:ml-[98px] md:h-[40.069px] md:w-[224.385px] md:rounded-[6.411px] md:text-[14.194px]"
          >
            {data.cta.buttonText}
          </Link>
        </section>

        <div className="absolute bottom-[75px] right-0 z-[5] hidden md:block">
          <Image
            src={fingerBattery}
            alt="Hand holding Tactus device"
            width={403}
            height={495}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}
