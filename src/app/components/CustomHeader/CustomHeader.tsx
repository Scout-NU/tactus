"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./HeaderStyle.css";

export default function CustomHeader() {
  const pathname = usePathname();
  
  const lightBackgroundPages = ["/about"];
  const isDarkText = lightBackgroundPages.includes(pathname);
  const textColor = isDarkText ? "#05365f" : "#FFF";

  return (
    <header className="custom-header" style={{ color: textColor }}>
      <div className="company-name">
        <Link href="/" style={{ 
          fontWeight: pathname === "/" ? "bold" : "normal",  
          color: textColor 
        }}>
          <h1 style={{ color: textColor }}>Tactus</h1>
        </Link>
      </div>
      <div className="navigation-buttons">
        <nav className="navbar">
          <Link href="/product" style={{ 
            fontWeight: pathname === "/product" ? "bold" : "normal",  
            color: textColor 
          }}>
            Product
          </Link>
          <Link
            href="/shop"
            style={{ 
              fontWeight: pathname === "/shop" ? "bold" : "normal", 
              color: textColor 
            }}
          >
            Shop
          </Link>
          {/* <Link
            href="/about"
            style={{ 
              fontWeight: pathname === "/about" ? "bold" : "normal",  
              color: textColor 
            }}
          >
            About Us
          </Link> */}
          <Link
            href="/community"
            style={{ 
              fontWeight: pathname === "/community" ? "bold" : "normal",  
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