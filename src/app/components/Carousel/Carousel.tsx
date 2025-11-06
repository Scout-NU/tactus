import React from "react";
import "./CarouselStyle.css";

export default function Carousel({
  items,
  gap,
}: {
  items: React.ReactNode[];
  gap?: number;
}) {
  return (
    <div className="carousel" style={{ gap: gap ?? 16, width: "100%" }}>
      {items.map((item, index) => (
        <div key={index} className="carousel-item">
          {item}
        </div>
      ))}
    </div>
  );
}
