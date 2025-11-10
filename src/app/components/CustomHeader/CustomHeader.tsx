"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./HeaderStyle.css";

export default function CustomHeader() {
  const [boldedPath] = useState("/");
  const pathname = usePathname();
  

  const lightBackgroundPages = ["/shop", "/about"];
  const isDarkText = lightBackgroundPages.includes(pathname);
  const textColor = isDarkText ? "#05365f" : "#FFF";

  return (
    <header className="custom-header" style={{ color: textColor }}>
      <div className="company-name">
        <Link href="/" style={{ 
          fontWeight: boldedPath === "/" ? "bold" : "normal",
          color: textColor 
        }}>
          <h1 style={{ color: textColor }}>Tactus</h1>
        </Link>
      </div>
      <div className="navigation-buttons">
        <nav className="navbar">
          <Link href="/" style={{ 
            fontWeight: boldedPath === "/" ? "bold" : "normal",
            color: textColor 
          }}>
            Product
          </Link>
          <Link
            href="/shop"
            style={{ 
              fontWeight: boldedPath === "shop" ? "bold" : "normal",
              color: textColor 
            }}
          >
            Shop
          </Link>
          <Link
            href="/about"
            style={{ 
              fontWeight: boldedPath === "about" ? "bold" : "normal",
              color: textColor 
            }}
          >
            About Us
          </Link>
          <Link
            href="/community"
            style={{ 
              fontWeight: boldedPath === "community" ? "bold" : "normal",
              color: textColor 
            }}
          >
            Community
          </Link>
        </nav>
      </div>
    </header>
  );
}