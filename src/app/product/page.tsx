"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FeaturePopup from "../components/FeaturePopup/FeaturePopup";

export default function ProductPage() {
  // State for each feature popup
  const [isLiveSignalOpen, setIsLiveSignalOpen] = useState(false);
  const [isSeamlessOpen, setIsSeamlessOpen] = useState(false);
  const [isPremiumFabricOpen, setIsPremiumFabricOpen] = useState(false);
  const [isWirelessOpen, setIsWirelessOpen] = useState(false);
  const [isBatteryOpen, setIsBatteryOpen] = useState(false);

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: "linear-gradient(178.201deg, rgb(1, 108, 111) 3.8936%, rgb(5, 54, 95) 41.264%)"
      }}
    >
      {/* Background Wave Pattern */}
      <div className="pointer-events-none absolute left-0 bottom-[400px] z-0 h-full w-full hidden md:block">
        <Image
          src="/wave-in-landing.svg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="relative z-[1] pt-[100px] md:pt-[100px]">
        {/* Hero Section */}
        <section className="relative flex min-h-[30vh] flex-col items-center px-5 pb-[50px] pt-[60px] text-center md:px-5 md:pb-[100px] md:pt-[60px]">
          <h1 className="mx-auto mb-5 max-w-[951px] font-heading text-[32px] font-bold uppercase leading-[110%] text-white md:mb-5 md:text-[64px] md:leading-[100%]">
            IMMERSE YOURSELF IN THE MUSIC
          </h1>
          <p className="mx-auto mb-4 max-w-[657px] px-4 font-body text-base font-normal text-white md:mb-20 md:px-0 md:text-xl">
            Explore the features that make every beat come alive.
          </p>

          {/* Product Image Container with Feature Dots */}
          <div className="relative mx-auto mb-5 w-full max-w-[1440px] md:min-h-[1000px] min-h-[500px] pb-5 md:mb-0 md:min-h-[850px] md:pb-0">
            <div className="absolute left-1/2 top-0 z-[5] mb-5 flex w-full -translate-x-1/2 justify-center md:mb-0 md:w-auto md:transform-none md:relative md:left-auto">
            {/* <div className="absolute left-1/2 top-0 z-[5] mb-5 flex w-full -translate-x-1/2 justify-center md:mb-0 md:w-auto md:relative md:left-auto md:translate-x-0"> */}

            <div className="relative w-[90%] md:w-[537px]">
              <Image
                src="/product-home-photo.png"
                alt="Tactus Jacket"
                width={537}
                height={630}
                priority
                className="!w-full !h-auto"
                style={{ objectFit: "contain" }}
              />
            </div>

            <div className="hidden md:block">
              <FeaturePopup
                title="Live Signal Processing"
                description="Music is translated into vibrations which are sent to different parts of the body with low latency so you can flow in sync with the music."
                isOpen={isLiveSignalOpen}
                onToggle={() => setIsLiveSignalOpen(!isLiveSignalOpen)}
                position="top-left"
                dotPosition={{ top: "178px", left: "calc(50% - 135px)" }}
              />

              <FeaturePopup
                title="Seamless technology integration"
                description="Proprietary conductive threads are used to seamlessly integrate the technology into the garment."
                isOpen={isSeamlessOpen}
                onToggle={() => setIsSeamlessOpen(!isSeamlessOpen)}
                position="top-right"
                dotPosition={{ top: "178px", left: "calc(50% + 28px)" }}
              />

              <FeaturePopup
                title="Premium fabric material"
                description="The garment is made with stretchable, breathable, lightweight fabric to keep you comfortable without inhibiting your dance moves."
                isOpen={isPremiumFabricOpen}
                onToggle={() => setIsPremiumFabricOpen(!isPremiumFabricOpen)}
                position="left"
                dotPosition={{ top: "401px", left: "calc(50% - 190px)" }}
              />

              <FeaturePopup
                title="Completely Wireless"
                description="Simply connect to your phone or any Bluetooth device. Press play on your preferred music player or streaming service. Dance without constraints."
                isOpen={isWirelessOpen}
                onToggle={() => setIsWirelessOpen(!isWirelessOpen)}
                position="right"
                dotPosition={{ top: "400px", left: "calc(50% + 175px)" }}
              />

              <FeaturePopup
                  title="Rechargeable battery"
                  description="A removable rechargeable battery will keep you vibing for hours."
                  isOpen={isBatteryOpen}
                  onToggle={() => setIsBatteryOpen(!isBatteryOpen)}
                  position="bottom"
                  dotPosition={{ top: "572px", left: "calc(50% - 9px)" }}
              />
            </div>

            <div className="md:hidden">
              <FeaturePopup
                title="Live Signal Processing"
                description="Music is translated into vibrations which are sent to different parts of the body with low latency so you can flow in sync with the music."
                isOpen={isLiveSignalOpen}
                onToggle={() => setIsLiveSignalOpen(!isLiveSignalOpen)}
                position="top-left"
                dotPosition={{ top: "24%", left: "28%" }}
              />

              <FeaturePopup
                title="Seamless technology integration"
                description="Proprietary conductive threads are used to seamlessly integrate the technology into the garment."
                isOpen={isSeamlessOpen}
                onToggle={() => setIsSeamlessOpen(!isSeamlessOpen)}
                position="top-right"
                dotPosition={{ top: "24%", left: "55%" }}
              />

              <FeaturePopup
                title="Premium fabric material"
                description="The garment is made with stretchable, breathable, lightweight fabric to keep you comfortable without inhibiting your dance moves."
                isOpen={isPremiumFabricOpen}
                onToggle={() => setIsPremiumFabricOpen(!isPremiumFabricOpen)}
                position="left"
                dotPosition={{ top: "54%", left: "18%" }}
              />

              <FeaturePopup
                title="Completely Wireless"
                description="Simply connect to your phone or any Bluetooth device. Press play on your preferred music player or streaming service. Dance without constraints."
                isOpen={isWirelessOpen}
                onToggle={() => setIsWirelessOpen(!isWirelessOpen)}
                position="right"
                dotPosition={{ top: "54%", left: "80%" }}
              />

              <FeaturePopup
                  title="Rechargeable battery"
                  description="A removable rechargeable battery will keep you vibing for hours."
                  isOpen={isBatteryOpen}
                  onToggle={() => setIsBatteryOpen(!isBatteryOpen)}
                  position="bottom"
                  dotPosition={{ top: "75%", left: "50%" }}
              />
            </div>
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="relative mx-auto flex max-w-[1440px] flex-col items-center px-5 pb-[100px] pt-[50px] text-center md:items-start md:px-5 md:pb-[200px] md:pt-[100px] md:text-left">
          <h2 className="mb-6 max-w-[984px] font-heading text-[28px] font-bold uppercase leading-[110%] text-white md:mb-6 md:ml-[98px] md:text-[64px] md:leading-[100%]">
            FEEL EVERY BEAT. LIVE EVERY MOMENT.
          </h2>
          <p className="mb-8 max-w-[685px] font-body text-base font-normal leading-[1.5] text-white md:mb-10 md:ml-[98px] md:text-xl md:leading-normal">
            Our patented vibration technology is woven into the fabric, letting
            you stay connected to your favorite songs while you move through
            your day.
          </p>

          <Link 
            href="/shop" 
            className="ml-0 flex h-12 w-[200px] items-center justify-center rounded-md border border-gray-600 bg-[#95e2e2] font-heading text-base font-normal text-[#05365f] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#88dde1] hover:shadow-[0_4px_12px_rgba(149,226,226,0.3)] md:ml-[98px] md:h-[40.069px] md:w-[224.385px] md:rounded-[6.411px] md:text-[14.194px]"
          >
            Preorder Now
          </Link>

        </section>
         {/* Hand Holding Device Image */}
         <div 
            className="absolute right-0 bottom-[200px] z-[5] hidden md:block md:rotate-180 md:scale-y-[-1]"
            >
            <Image
              src="/holding_tactus.png"
              alt="Hand holding Tactus device"
              width={403}
              height={495}
              className="!w-[200px] !h-auto md:!w-[403px]"
              style={{ objectFit: "contain" }}
            />
          </div>
      </div>
    </div>
  );
}

