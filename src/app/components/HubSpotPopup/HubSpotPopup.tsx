"use client";

import React, { useEffect } from "react";
import "./HubSpotPopupStyle.css";

interface HubSpotPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HubSpotPopup({ isOpen, onClose }: HubSpotPopupProps) {
  useEffect(() => {
    if (isOpen) {
      // Load HubSpot form script when popup opens
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/48535283.js";
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup when popup closes
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[5px] w-[805px] max-w-[90vw] max-h-[90vh] overflow-y-auto px-5 md:px-[53px] pt-10 md:pt-[66px] pb-10 shadow-2xl animate-in zoom-in-95 slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 md:right-5 md:top-5 text-[28px] md:text-[32px] text-gray-600 hover:text-black transition-colors leading-none p-2 z-10"
          aria-label="Close"
        >
          ×
        </button>

        {/* Title - matching Figma design */}
        <h2 className="font-['Stratos',sans-serif] font-semibold text-[28px] md:text-[40px] leading-[1.2] text-[#05365f] mb-5 md:mb-[27px]">
          Don&apos;t miss a beat!
        </h2>

        {/* Subtitle - matching Figma design */}
        <p className="font-['Stratos',sans-serif] font-normal text-[16px] md:text-[22px] leading-[1.5] text-black mb-5 md:mb-[27px] max-w-[634px]">
          We&apos;d love to hear from you! Please fill out the form and we&apos;ll get back to you as soon as possible.
        </p>

        {/* HubSpot Form Container */}
        <div
          className="hs-form-frame hubspot-form-wrapper"
          data-region="na1"
          data-form-id="a38562e1-1406-4357-a791-8be9b0c45de6"
          data-portal-id="48535283"
        ></div>
      </div>
    </div>
  );
}

