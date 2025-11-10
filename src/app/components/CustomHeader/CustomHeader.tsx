"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./HeaderStyle.css";

export default function CustomHeader() {
  const [boldedPath] = useState("/");

  // const currentPath = window.location.pathname;
  // useEffect(() => {
  //   setBoldedPath(currentPath);
  // }, [currentPath]);

  return (
    <header className="custom-header">
      <div className="company-name">
        <Link href="/" style={boldedPath === "/" ? { fontWeight: "bold" } : {}}>
          <h1>Tactus</h1>
        </Link>
      </div>
      <div className="navigation-buttons">
        <nav className="navbar">
          <Link href="/" style={boldedPath === "/" ? { fontWeight: "bold" } : {}}>
            Product
          </Link>
          <Link
            href="/shop"
            style={boldedPath === "shop" ? { fontWeight: "bold" } : {}}
          >
            Shop
          </Link>
          <Link
            href="/about"
            style={boldedPath === "about" ? { fontWeight: "bold" } : {}}
          >
            About Us
          </Link>
          <Link
            href="/community"
            style={boldedPath === "community" ? { fontWeight: "bold" } : {}}
          >
            Community
          </Link>
        </nav>
      </div>
    </header>
  );
}
