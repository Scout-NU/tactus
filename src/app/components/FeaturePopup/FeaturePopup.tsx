"use client";

import React from "react";

interface FeaturePopupProps {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
  position: "top-left" | "top-right" | "left" | "right" | "bottom" | "mobile";
  dotPosition: { top?: string; left?: string; right?: string; bottom?: string };
}

export default function FeaturePopup({
  title,
  description,
  isOpen,
  onToggle,
  position,
  dotPosition,
}: FeaturePopupProps) {
  // Check if this is the mobile variant
  const isMobile = position === "mobile";

  // Connection line configurations for each position
  const getLineConfig = () => {
    switch (position) {
      case "top-left":
        return {
          x1: "calc(33.333% + 122px)",
          y1: "194px",           // 544 - 350 = 194
          x2: "calc(33.333% - 3px)",
          y2: "194px",           // 477 - 350 = 127
        };
      case "top-right":
        return {
          x1: "calc(50% + 44px)",
          y1: "194px",        // 543.97 - 350 = 193.97
          x2: "calc(66.667% + 40px)",
          y2: "194px",           // 486 - 350 = 136
        };
      case "left":
        return {
          x1: "calc(33.333% + 64px)",
          y1: "418px",           // 768 - 350 = 418
          x2: "calc(25% + 75px)",
          y2: "418px",           // 768 - 350 = 418
        };
        case "right":
          return {
            x1: "calc(58.333% + 79px)",    // From dot
            y1: "417px",
            x2: "calc(100% - 438px)",      // To LEFT edge of popup (right-106 is the right edge, popup is 332px wide)
            y2: "417px",
          };
      case "bottom":
        return {
          x1: "calc(50% + 8px)",
          y1: "604px",           // 954 - 350 = 604
          x2: "calc(50% + 8px)",
          y2: "693px",           // 1043 - 350 = 693
        };
      case "mobile":
        return null;
      default:
        return null;
    }
  };

  const lineConfig = getLineConfig();

  // Position classes for desktop
  const getPopupPositionClasses = () => {
    const baseClasses = "absolute min-h-[123px] w-[332px] rounded-[11px] border border-[#88dde1] bg-gradient-to-b from-[#4daab5] to-transparent p-4 z-[9] animate-in fade-in slide-in-from-top-2 duration-300";
    const mobileClasses = "md:block";
    
    switch (position) {
      case "top-left":
        return `${baseClasses} ${mobileClasses} top-[111px] left-[146px]`;
      case "top-right":
        return `${baseClasses} ${mobileClasses} top-[119px] right-[108px]`;
      case "left":
        return `${baseClasses} ${mobileClasses} top-[386px] left-[103px]`;
      case "right":
        return `${baseClasses} ${mobileClasses} top-[398px] right-[106px]`;
      case "bottom":
        return `${baseClasses} ${mobileClasses} top-[690px] left-[calc(50%+100px)] -translate-x-1/2`;
      case "mobile":
        return "";
      default:
        return baseClasses;
    }
  };

  return (
    <>
      {/* Clickable Dot */}
      <button
        className="absolute z-10 h-[33px] w-[33px] cursor-pointer border-none bg-transparent p-0 transition-transform duration-200 hover:scale-110 md:h-[33px] md:w-[33px]"
        style={dotPosition}
        onClick={onToggle}
        aria-label={`Toggle ${title} information`}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#88dde1] shadow-[0_0_12px_rgba(136,221,225,0.6)] animate-pulse-subtle">
          <div className="h-4 w-4 rounded-full bg-[#95e2e2]" />
        </div>
      </button>

      {/* Connection Line - Only show on desktop when popup is open */}
      {isOpen && lineConfig && !isMobile && (
        <svg
          className="absolute left-0 top-0 hidden h-full w-full pointer-events-none z-[8] md:block"
        >
          <line
            x1={lineConfig.x1}
            y1={lineConfig.y1}
            x2={lineConfig.x2}
            y2={lineConfig.y2}
            stroke="#88dde1"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      )}

      {/* Popup Content - Desktop positioned, Mobile below image */}
      {isOpen && !isMobile && (
        <div className={`
          ${getPopupPositionClasses()}
          md:absolute md:bg-gradient-to-b md:from-[#4daab5] md:to-transparent
          relative mx-auto my-4 w-[calc(100%-2rem)] max-w-full
          bg-gradient-to-br from-[#d97b6a] to-[#c96b5a]
          md:my-0 md:mx-0 md:w-[332px]
        `}>
          <div className="flex flex-col gap-2 md:gap-2">
            <h3 className="m-0 font-heading text-base font-bold leading-normal text-white md:text-lg">
              {title}
            </h3>
            <p className="m-0 font-heading text-sm font-normal leading-[1.5] text-white md:text-xs md:leading-[1.4]">
              {description}
            </p>
          </div>
        </div>
      )}

      {/* Mobile Content — Popup below image */}
      {isMobile && isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 z-[100] pointer-events-none">
          <div className="mx-4 pointer-events-auto">
            <div className="relative w-full min-h-[123px] rounded-[11px] border border-[#88dde1] bg-gradient-to-b from-[#4daab5] to-transparent p-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex flex-col gap-2 md:gap-2">
                <h3 className="m-0 font-heading text-base font-bold leading-normal text-white">
                  {title}
                </h3>
                <p className="m-0 font-heading text-sm font-normal leading-[1.5] text-white">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
