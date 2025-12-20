"use client";

import React, { useRef, useEffect, useState } from "react";
import "./CarouselStyle.css";

type CarouselProps = {
  items: React.ReactNode[];
  gap?: number;
  autoScroll?: boolean;
  scrollSpeed?: number; // pixels per second
};

export default function Carousel({
  items,
  gap = 16,
  autoScroll = false,
  scrollSpeed = 30,
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // For auto-scroll, duplicate items for seamless infinite loop
  const displayItems = autoScroll ? [...items, ...items] : items;

  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;

    const container = scrollRef.current;
    let animationId: number;
    let lastTime = 0;

    const scroll = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPaused) {
        // Calculate scroll amount based on speed (pixels per second)
        const scrollAmount = (scrollSpeed * deltaTime) / 1000;
        container.scrollLeft += scrollAmount;

        // Reset scroll position when we've scrolled past the first set of items
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [autoScroll, scrollSpeed, isPaused]);

  return (
    <div
      ref={scrollRef}
      className={`carousel ${autoScroll ? "carousel-auto-scroll" : ""}`}
      style={{ gap, width: "100%" }}
      onMouseEnter={() => autoScroll && setIsPaused(true)}
      onMouseLeave={() => autoScroll && setIsPaused(false)}
    >
      {displayItems.map((item, index) => (
        <div key={index} className="carousel-item">
          {item}
        </div>
      ))}
    </div>
  );
}
