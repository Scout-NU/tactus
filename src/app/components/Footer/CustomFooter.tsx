"use client";

import Image from "next/image";
import React, { useState } from "react";
import HubSpotPopup from "../HubSpotPopup/HubSpotPopup";

export default function CustomFooter() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <footer className="bg-[#05365f] py-12 md:py-20 lg:py-[90px] px-4 md:px-8">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center md:items-start">
          <div className="flex flex-col items-center md:items-start gap-6 justify-self-center md:justify-self-start">
            <h3 className="text-white font-['TradeGothic_LT_Extended',sans-serif] text-3xl md:text-4xl font-normal whitespace-nowrap">
              VIBE WITH US
            </h3>
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/tactusmusic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Visit our LinkedIn page"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                >
                  <path
                    d="M32 0C33.0609 0 34.0783 0.421427 34.8284 1.17157C35.5786 1.92172 36 2.93913 36 4V32C36 33.0609 35.5786 34.0783 34.8284 34.8284C34.0783 35.5786 33.0609 36 32 36H4C2.93913 36 1.92172 35.5786 1.17157 34.8284C0.421427 34.0783 0 33.0609 0 32V4C0 2.93913 0.421427 1.92172 1.17157 1.17157C1.92172 0.421427 2.93913 0 4 0H32ZM31 31V20.4C31 18.6708 30.3131 17.0124 29.0903 15.7897C27.8676 14.5669 26.2092 13.88 24.48 13.88C22.78 13.88 20.8 14.92 19.84 16.48V14.26H14.26V31H19.84V21.14C19.84 19.6 21.08 18.34 22.62 18.34C23.3626 18.34 24.0748 18.635 24.5999 19.1601C25.125 19.6852 25.42 20.3974 25.42 21.14V31H31ZM7.76 11.12C8.65113 11.12 9.50576 10.766 10.1359 10.1359C10.766 9.50576 11.12 8.65113 11.12 7.76C11.12 5.9 9.62 4.38 7.76 4.38C6.86357 4.38 6.00385 4.73611 5.36998 5.36998C4.73611 6.00385 4.38 6.86357 4.38 7.76C4.38 9.62 5.9 11.12 7.76 11.12ZM10.54 31V14.26H5V31H10.54Z"
                    fill="white"
                  />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/tactus.music"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Visit our Instagram page"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                >
                  <path
                    d="M10.44 0H25.56C31.32 0 36 4.68 36 10.44V25.56C36 28.3289 34.9001 30.9843 32.9422 32.9422C30.9843 34.9001 28.3289 36 25.56 36H10.44C4.68 36 0 31.32 0 25.56V10.44C0 7.67114 1.09993 5.01569 3.05781 3.05781C5.01569 1.09993 7.67114 0 10.44 0ZM10.08 3.6C8.3614 3.6 6.71318 4.28271 5.49795 5.49795C4.28271 6.71318 3.6 8.3614 3.6 10.08V25.92C3.6 29.502 6.498 32.4 10.08 32.4H25.92C27.6386 32.4 29.2868 31.7173 30.5021 30.5021C31.7173 29.2868 32.4 27.6386 32.4 25.92V10.08C32.4 6.498 29.502 3.6 25.92 3.6H10.08ZM27.45 6.3C28.0467 6.3 28.619 6.53705 29.041 6.95901C29.4629 7.38097 29.7 7.95326 29.7 8.55C29.7 9.14674 29.4629 9.71903 29.041 10.141C28.619 10.5629 28.0467 10.8 27.45 10.8C26.8533 10.8 26.281 10.5629 25.859 10.141C25.437 9.71903 25.2 9.14674 25.2 8.55C25.2 7.95326 25.437 7.38097 25.859 6.95901C26.281 6.53705 26.8533 6.3 27.45 6.3ZM18 9C20.3869 9 22.6761 9.94821 24.364 11.636C26.0518 13.3239 27 15.6131 27 18C27 20.3869 26.0518 22.6761 24.364 24.364C22.6761 26.0518 20.3869 27 18 27C15.6131 27 13.3239 26.0518 11.636 24.364C9.94821 22.6761 9 20.3869 9 18C9 15.6131 9.94821 13.3239 11.636 11.636C13.3239 9.94821 15.6131 9 18 9ZM18 12.6C16.5678 12.6 15.1943 13.1689 14.1816 14.1816C13.1689 15.1943 12.6 16.5678 12.6 18C12.6 19.4322 13.1689 20.8057 14.1816 21.8184C15.1943 22.8311 16.5678 23.4 18 23.4C19.4322 23.4 20.8057 22.8311 21.8184 21.8184C22.8311 20.8057 23.4 19.4322 23.4 18C23.4 16.5678 22.8311 15.1943 21.8184 14.1816C20.8057 13.1689 19.4322 12.6 18 12.6Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>


          <div className="flex items-center justify-center">
            <Image
              alt="Tactus logo"
              src="/Tactus-footer-logo.svg"
              width={212}
              height={165}
              className="w-40 md:w-48 lg:w-[212px] h-auto"
            />
          </div>

          <nav className="justify-self-center md:justify-self-end">
            <ul className="flex flex-col items-center md:items-start text-white font-['DM_Sans',sans-serif] text-lg md:text-xl leading-8 space-y-0">
              <li>
                <a href="/product" className="underline decoration-solid hover:opacity-80 transition-opacity">
                  Product
                </a>
              </li>
              <li>
                <a href="/shop" className="underline decoration-solid hover:opacity-80 transition-opacity">
                  Shop
                </a>
              </li>
              <li>
                <a href="/community" className="underline decoration-solid hover:opacity-80 transition-opacity">
                  Community
                </a>
              </li>
              <li>
                <a href="/about" className="underline decoration-solid hover:opacity-80 transition-opacity">
                  About Us
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setIsPopupOpen(true)}
                  className="underline decoration-solid hover:opacity-80 transition-opacity cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <HubSpotPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </footer>
  );
}
