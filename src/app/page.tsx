"use client";

import Image from "next/image";
import Carousel from "./components/Carousel/Carousel";
import "./HomePage.css";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HubSpotPopup from "./components/HubSpotPopup/HubSpotPopup";
import {
  HOME_CONTENT,
  HOME_VIDEOS,
  HOME_SPONSORS,
  HOME_PRODUCTS,
  type VideoItem,
} from "./homeData";

export default function Home() {
  const router = useRouter();
  const [isHubSpotPopupOpen, setIsHubSpotPopupOpen] = useState(false);

  // Helper function to render heading with highlighted words
  const renderHeading = (
    text: string,
    highlights: readonly string[]
  ): React.ReactNode => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const isHighlight = highlights.includes(word);
      return (
        <span key={index}>
          {isHighlight ? (
            <span className="product-info-blue-text">{word}</span>
          ) : (
            word
          )}
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  return (
    <div className="home-page">
      <div className="home-page-content">
        <div className="product-overview">
          <div className="product-info">
            <div className="product-text">
              <h1 className="product-info-text">
                {renderHeading(
                  HOME_CONTENT.hero.heading,
                  HOME_CONTENT.hero.highlightWords
                )}
              </h1>
              <p className="product-description-text">
                {HOME_CONTENT.hero.subtext}
              </p>
              <button
                className="learn-more-button orange"
                style={{ zIndex: 2 }}
                onClick={() => {
                  router.push(HOME_CONTENT.hero.ctaLink);
                }}
              >
                {HOME_CONTENT.hero.ctaText}
              </button>
            </div>
          </div>
          <div className="product-image-container vest" />
          <div
            style={{
              top: "18vh",
            }}
            className="wave-pattern-orange first"
          >
            <Image
              alt="wave pattern"
              src="/wave-in-landing.svg"
              fill
              style={{
                objectFit: "cover",
                zIndex: -1,
              }}
            />
          </div>
        </div>

        <div className="community-section">
          <div className="community-content">
            <div className="community-text">
              <h1 className="community-header">
                {HOME_CONTENT.community.heading}
              </h1>
              <h2 className="community-quote">{HOME_CONTENT.community.quote}</h2>
            </div>
            <div className="carousel-content">
              <div className="people-carousel">
                <Carousel
                  items={HOME_VIDEOS.map((video) => (
                    <ClickToPlayVideo key={video.id} video={video} />
                  ))}
                  gap={25}
                />
              </div>
              <div className="sponsor-carousel items-top">
                <Carousel
                  items={HOME_SPONSORS.map((sponsor, index) => (
                    <Image
                      key={index}
                      src={sponsor.src}
                      alt={sponsor.alt}
                      width={sponsor.width}
                      height={sponsor.height}
                    />
                  ))}
                  gap={64}
                  autoScroll={true}
                  scrollSpeed={40}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            top: "150vh",
          }}
          className="wave-pattern-blue first"
        >
          <Image
            alt="wave pattern"
            src="/wave-in-community.svg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            top: "200vh",
          }}
          className="wave-pattern-blue second"
        >
          <Image
            alt="wave pattern"
            src="/wave-2-in-community.svg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="products-section-wrapper">
          <div className="products-section">
            <div className="products-section-text">
              <h1 className="products-header">
                {HOME_CONTENT.products.heading}
              </h1>
              <p className="products-description">
                {HOME_CONTENT.products.description}
              </p>
            </div>
            <div className="products-list">
              {HOME_PRODUCTS.map((product) => (
                <div key={product.name} className="product-item-container">
                  <div className="product-item">
                    <div className="product-display-container">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={224}
                        height={224}
                        className="product-image"
                      />
                    </div>
                    <div className="product-description">
                      <div className="product-properties">
                        <h2 className="product-name">{product.name}</h2>
                        <div>
                          <p
                            style={{
                              textDecoration: "line-through",
                              color: "#f06532",
                            }}
                          >
                            {product.originalPrice}
                          </p>
                          <p>{product.currentPrice}</p>
                        </div>
                      </div>
                      <button
                        className="learn-more-button small"
                        onClick={() => {
                          router.push(product.route);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <div
            className="contact-form-overview"
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <div className="contact-form-info">
              <div className="contact-form-text">
                <h1 className="contact-form-info-text">
                  {HOME_CONTENT.contact.heading}
                </h1>
                <p className="contact-form-description-text">
                  {HOME_CONTENT.contact.description}
                </p>
                <div className="contact-form-input">
                  <button
                    className="learn-more-button"
                    style={{ zIndex: 10, position: "relative" }}
                    onClick={() => setIsHubSpotPopupOpen(true)}
                  >
                    {HOME_CONTENT.contact.ctaText}
                  </button>
                </div>
              </div>
            </div>
            <div
              className="product-image-container record"
              style={{
                backgroundImage: 'url("/record.png")',
                backgroundSize: "cover",
                position: "absolute",
                right: -235,
              }}
            ></div>
          </div>
        </div>
        <div
          style={{
            top: "350vh",
          }}
          className="wave-pattern-orange second"
        >
          <Image
            alt="wave pattern"
            src="/wave-in-contact.svg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* HubSpot Form Popup */}
      <HubSpotPopup
        isOpen={isHubSpotPopupOpen}
        onClose={() => setIsHubSpotPopupOpen(false)}
      />
    </div>
  );
}

// Click-to-play video component with pause/play toggle and mobile swipe support
function ClickToPlayVideo({ video }: { video: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  // Touch event handlers to distinguish taps from swipes
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = Math.abs(touchEndX - touchStartX.current);
    const deltaY = Math.abs(touchEndY - touchStartY.current);

    // If horizontal movement is minimal, it's a tap (not a swipe)
    const isSwipe = deltaX > 30 || deltaY > 30;

    if (!isSwipe) {
      handleTogglePlay();
    }

    // Reset touch positions
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="video-container"
      onClick={handleTogglePlay}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={video.poster}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      {/* Play button overlay - shown when paused */}
      {!isPlaying && (
        <div className="play-button-overlay" aria-label={`Play ${video.alt}`}>
          <span className="play-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </span>
        </div>
      )}
      {/* Pause overlay - shown on hover when playing (desktop only) */}
      {isPlaying && (
        <div className="pause-overlay" aria-label={`Pause ${video.alt}`}>
          <span className="pause-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
}
