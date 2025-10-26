"use client";
import React, { useEffect, useState } from "react";
import "./HeaderStyle.css";

export default function CustomHeader() {
  const [boldedPath, setBoldedPath] = useState("/");

  // const currentPath = window.location.pathname;
  // useEffect(() => {
  //   setBoldedPath(currentPath);
  // }, [currentPath]);

  return (
    <header className="custom-header">
      <div className="company-name">
        <h1>Tactus</h1>
      </div>
      <div className="navigation-buttons">
        <nav className="navbar">
          <a href="" style={boldedPath === "/" ? { fontWeight: "bold" } : {}}>
            Product
          </a>
          <a
            href="/shop"
            style={boldedPath === "shop" ? { fontWeight: "bold" } : {}}
          >
            Shop
          </a>
          <a
            href="/about"
            style={boldedPath === "about" ? { fontWeight: "bold" } : {}}
          >
            About Us
          </a>
          <a
            href="/community"
            style={boldedPath === "community" ? { fontWeight: "bold" } : {}}
          >
            Community
          </a>
        </nav>
      </div>
    </header>
  );
}
