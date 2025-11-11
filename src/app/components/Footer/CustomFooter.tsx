import Image from "next/image";
import React from "react";
import "./CustomFooterStyle.css";

export default function CustomFooter() {
  return (
    <footer>
      <div className="custom-footer">
        <div className="socials-container">
          <h3>VIBE WITH US</h3>
          <Image
            alt="linkedin and instagram"
            src="/linkedin-insta.svg"
            width={93}
            height={36}
          />
        </div>
        <div className="logo-container">
          <Image
            alt="Tactus logo"
            src="/Tactus-footer-logo.svg"
            width={212}
            height={165}
          />
        </div>
        <div className="pages-container">
          <li>
            <a>Product</a>
            <a>Shop</a>
            <a>Community</a>
            <a>About Us</a>
            <a>Contact US</a>
          </li>
        </div>
      </div>
    </footer>
  );
}
